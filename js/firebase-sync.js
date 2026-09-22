/**
 * FIREBASE REAL-TIME CLOUD SYNC MODULE
 * Synchronizes student submissions in real-time between Student Mode (HP/Tab/Laptop) and Teacher Mode.
 * Uses Firebase Realtime Cloud Endpoint with instant live listeners and offline fallback.
 */

// Firebase Cloud Realtime Project Configuration for SMA Plus PGRI Cibinong MPI
const FIREBASE_CONFIG = {
  dbUrl: "https://mpi-describing-places-default-rtdb.firebaseio.com",
  collection: "students_xi"
};

const FirebaseSync = {
  isOnline: navigator.onLine,
  listeners: [],
  pollingInterval: null,

  init() {
    window.addEventListener("online", () => { this.isOnline = true; });
    window.addEventListener("offline", () => { this.isOnline = false; });
  },

  // Generate safe sanitized key for Firebase
  sanitizeKey(str) {
    return (str || "student").replace(/[.#$\[\]\/]/g, "_");
  },

  // Save/Push student record to Firebase Cloud
  async saveStudentToCloud(studentData) {
    if (!studentData || !studentData.name) return false;

    const studentRecord = {
      ...studentData,
      lastSyncedAt: new Date().toISOString()
    };

    // 1. Always update local storage first
    StorageManager.upsertStudentRecord(studentRecord);

    // 2. Sync to Firebase Cloud Endpoint
    try {
      const studentKey = this.sanitizeKey(`${studentData.studentClass || 'XI'}_${studentData.name}`);
      const endpoint = `${FIREBASE_CONFIG.dbUrl}/${FIREBASE_CONFIG.collection}/${studentKey}.json`;

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentRecord)
      });

      if (response.ok) {
        console.log("☁️ Successfully synced to Firebase Cloud Realtime DB:", studentKey);
        this.broadcastLocalChange(studentRecord);
        return true;
      }
    } catch (err) {
      console.warn("Cloud sync deferred (running locally/offline):", err);
    }

    // Broadcast across browser tabs via BroadcastChannel if supported
    this.broadcastLocalChange(studentRecord);
    return true;
  },

  // Fetch all students from Firebase Cloud
  async fetchAllStudentsFromCloud() {
    try {
      const endpoint = `${FIREBASE_CONFIG.dbUrl}/${FIREBASE_CONFIG.collection}.json`;
      const response = await fetch(endpoint, { method: "GET" });

      if (response.ok) {
        const data = await response.json();
        if (data && typeof data === "object") {
          const cloudStudents = Object.values(data);
          if (cloudStudents.length > 0) {
            // Merge with local storage
            const localStudents = StorageManager.getAllStudents();
            const mergedMap = new Map();

            // Put local first
            localStudents.forEach(s => {
              if (s && s.id) mergedMap.set(s.id, s);
            });

            // Overwrite/Add cloud
            cloudStudents.forEach(s => {
              if (s && s.id) mergedMap.set(s.id, s);
            });

            const mergedList = Array.from(mergedMap.values());
            localStorage.setItem(STORAGE_KEYS.STUDENTS_REGISTRY, JSON.stringify(mergedList));
            return mergedList;
          }
        }
      }
    } catch (err) {
      console.warn("Could not fetch from Firebase Cloud, using local registry:", err);
    }

    return StorageManager.getAllStudents();
  },

  // Start real-time live polling / listening for Teacher Dashboard
  startLiveTeacherSync(onUpdateCallback) {
    // Initial fetch
    this.fetchAllStudentsFromCloud().then(students => {
      if (onUpdateCallback) onUpdateCallback(students);
    });

    // Listen to BroadcastChannel for instant same-browser / multi-tab updates
    if (window.BroadcastChannel) {
      const bc = new BroadcastChannel("mpi_cloud_sync_channel");
      bc.onmessage = (event) => {
        if (event.data && event.data.type === "STUDENT_SUBMITTED") {
          this.fetchAllStudentsFromCloud().then(students => {
            if (onUpdateCallback) onUpdateCallback(students);
          });
        }
      };
    }

    // Window storage listener
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEYS.STUDENTS_REGISTRY) {
        const students = StorageManager.getAllStudents();
        if (onUpdateCallback) onUpdateCallback(students);
      }
    });

    // Cloud Polling interval every 5 seconds for other devices (HP/Tab/Laptops)
    if (this.pollingInterval) clearInterval(this.pollingInterval);
    this.pollingInterval = setInterval(() => {
      this.fetchAllStudentsFromCloud().then(students => {
        if (onUpdateCallback) onUpdateCallback(students);
      });
    }, 5000);
  },

  stopLiveTeacherSync() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  },

  broadcastLocalChange(record) {
    if (window.BroadcastChannel) {
      try {
        const bc = new BroadcastChannel("mpi_cloud_sync_channel");
        bc.postMessage({ type: "STUDENT_SUBMITTED", student: record });
      } catch (e) {}
    }
  }
};

FirebaseSync.init();
