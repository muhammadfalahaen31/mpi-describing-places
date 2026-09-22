/**
 * EVALUATION & ANALYTICS MODULE (TEACHER MODE WITH REAL-TIME CLOUD SYNC & CLASS FILTER)
 * Manages Student Scorecard, Teacher Dashboard, Item Analysis, Class Filter (XI Reguler 1-10), and CSV Data Export.
 */

const ResultsManager = {
  activeView: "teacher", // Default to Teacher View for Mode Guru
  selectedClassFilter: "ALL",
  searchTerm: "",
  sortField: "percentage",
  sortOrder: "desc",
  selectedStudentId: null,
  isLiveSyncActive: false,

  init() {
    this.renderResultsTab();
    this.startLiveCloudSync();
  },

  startLiveCloudSync() {
    if (!this.isLiveSyncActive && typeof FirebaseSync !== 'undefined') {
      this.isLiveSyncActive = true;
      FirebaseSync.startLiveTeacherSync((updatedStudents) => {
        // Re-render table if on teacher dashboard
        if (this.activeView === "teacher") {
          const tbody = document.getElementById("teacher-student-tbody");
          if (tbody) {
            this.updateLiveStats();
          }
        }
      });
    }
  },

  switchView(mode) {
    this.activeView = mode;
    SoundManager.playClick();
    this.renderResultsTab();
  },

  handleClassFilter(cls) {
    this.selectedClassFilter = cls;
    SoundManager.playClick();
    this.renderResultsTab();
  },

  renderResultsTab() {
    const container = document.getElementById("results-tab-content");
    if (!container) return;

    container.innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6 animate-fadeIn">
        <!-- View Toggle & Header -->
        <div class="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-700/60 rounded-full text-xs font-semibold tracking-wide uppercase border border-emerald-500/30">
              <span>📊</span> Teacher Analytics & Results Center
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">Student Competency & Live Results</h2>
            <div class="flex items-center gap-2 text-xs text-emerald-300">
              <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Live Cloud Sync Active (HP / Tablet / Laptop Realtime Integration)</span>
            </div>
          </div>

          <!-- Student / Teacher Mode Switcher -->
          <div class="p-1.5 bg-black/40 backdrop-blur rounded-2xl border border-white/10 flex items-center gap-1 self-stretch md:self-auto">
            <button 
              onclick="ResultsManager.switchView('teacher')"
              class="flex-1 md:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${this.activeView === 'teacher' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'}">
              👨‍🏫 Teacher Dashboard
            </button>
            <button 
              onclick="ResultsManager.switchView('student')"
              class="flex-1 md:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${this.activeView === 'student' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'}">
              👤 Individual Preview
            </button>
          </div>
        </div>

        <!-- View Content Container -->
        <div id="results-view-area">
          ${this.activeView === 'teacher' ? this.renderTeacherDashboard() : this.renderStudentView()}
        </div>

        <!-- Student Analysis Modal Container -->
        <div id="student-modal-container"></div>
      </div>
    `;
  },

  // ==================== TEACHER DASHBOARD ====================
  renderTeacherDashboard() {
    const allStudents = StorageManager.getAllStudents();
    
    // Filter by Class if selected
    const students = this.selectedClassFilter === "ALL" 
      ? allStudents 
      : allStudents.filter(s => s.studentClass === this.selectedClassFilter);

    const completedStudents = students.filter(s => s.assessment?.completed);
    
    const totalCount = students.length;
    const completedCount = completedStudents.length;
    
    let avgScore = 0;
    let avgReading = 0;
    let avgGrammar = 0;
    let highestScore = 0;
    let lowestScore = completedCount > 0 ? 25 : 0;

    if (completedCount > 0) {
      let sumTotal = 0;
      let sumReading = 0;
      let sumGrammar = 0;

      completedStudents.forEach(s => {
        const t = s.assessment.totalScore || 0;
        const r = s.assessment.readingScore || 0;
        const g = s.assessment.grammarScore || 0;
        sumTotal += t;
        sumReading += r;
        sumGrammar += g;

        if (t > highestScore) highestScore = t;
        if (t < lowestScore) lowestScore = t;
      });

      avgScore = Math.round((sumTotal / completedCount) * 10) / 10;
      avgReading = Math.round((sumReading / completedCount) * 10) / 10;
      avgGrammar = Math.round((sumGrammar / completedCount) * 10) / 10;
    }

    const classOptions = [
      "ALL",
      "XI Reguler 1",
      "XI Reguler 2",
      "XI Reguler 3",
      "XI Reguler 4",
      "XI Reguler 5",
      "XI Reguler 6",
      "XI Reguler 7",
      "XI Reguler 8",
      "XI Reguler 9",
      "XI Reguler 10"
    ];

    return `
      <div class="space-y-6">
        
        <!-- Filter by Class Toolbar -->
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-slate-700 uppercase tracking-wider">Filter Kelas:</span>
            <div class="flex flex-wrap gap-1.5">
              ${classOptions.map(c => `
                <button 
                  onclick="ResultsManager.handleClassFilter('${c}')"
                  class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.selectedClassFilter === c ? 'bg-emerald-700 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                  ${c === 'ALL' ? 'Semua Kelas' : c}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button 
              onclick="ResultsManager.refreshCloudData()"
              class="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1">
              <span>🔄</span> Refresh Cloud
            </button>
          </div>
        </div>

        <!-- Class KPI Cards (Out of 25) -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Siswa</span>
            <span class="text-2xl font-black text-slate-800 mt-1 block">${totalCount}</span>
            <span class="text-[10px] text-emerald-700 font-semibold">${completedCount} Selesai</span>
          </div>

          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Rata-Rata Nilai</span>
            <span class="text-2xl font-black text-emerald-700 mt-1 block">${avgScore} <span class="text-xs font-normal text-slate-400">/ 25</span></span>
            <span class="text-[10px] text-slate-500">${Math.round((avgScore / 25) * 100)}% Average</span>
          </div>

          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Nilai Tertinggi</span>
            <span class="text-2xl font-black text-teal-700 mt-1 block">${highestScore} <span class="text-xs font-normal text-slate-400">/ 25</span></span>
            <span class="text-[10px] text-teal-700 font-semibold">${Math.round((highestScore / 25) * 100)}% Max</span>
          </div>

          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Nilai Terendah</span>
            <span class="text-2xl font-black text-rose-600 mt-1 block">${lowestScore} <span class="text-xs font-normal text-slate-400">/ 25</span></span>
            <span class="text-[10px] text-slate-500">${Math.round((lowestScore / 25) * 100)}% Min</span>
          </div>

          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Rata-Rata Reading</span>
            <span class="text-2xl font-black text-slate-800 mt-1 block">${avgReading} <span class="text-xs font-normal text-slate-400">/ 10</span></span>
            <span class="text-[10px] text-slate-500">${Math.round((avgReading / 10) * 100)}%</span>
          </div>

          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Rata-Rata Grammar</span>
            <span class="text-2xl font-black text-slate-800 mt-1 block">${avgGrammar} <span class="text-xs font-normal text-slate-400">/ 15</span></span>
            <span class="text-[10px] text-slate-500">${Math.round((avgGrammar / 15) * 100)}%</span>
          </div>
        </div>

        <!-- Skill Mastery & Challenging Questions -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 class="font-bold text-slate-900 text-base">Class Skill Diagnostics (${this.selectedClassFilter})</h4>
              <span class="text-xs text-slate-500">${completedCount} asesmen selesai</span>
            </div>

            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1 text-slate-700">
                  <span>Reading Comprehension (Passages 1 & 2)</span>
                  <span>${Math.round((avgReading / 10) * 100)}%</span>
                </div>
                <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div class="bg-emerald-600 h-full rounded-full transition-all duration-500" style="width: ${Math.round((avgReading / 10) * 100)}%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-xs font-semibold mb-1 text-slate-700">
                  <span>Adjective Phrases (Patterns 1, 2, & 3)</span>
                  <span>${this.calculateTopicAccuracy(completedStudents, "Adjective Phrase")}%</span>
                </div>
                <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div class="bg-teal-600 h-full rounded-full transition-all duration-500" style="width: ${this.calculateTopicAccuracy(completedStudents, "Adjective Phrase")}%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-xs font-semibold mb-1 text-slate-700">
                  <span>Simple Present Tense (Agreement & Structures)</span>
                  <span>${this.calculateTopicAccuracy(completedStudents, "Simple Present Tense")}%</span>
                </div>
                <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div class="bg-sky-600 h-full rounded-full transition-all duration-500" style="width: ${this.calculateTopicAccuracy(completedStudents, "Simple Present Tense")}%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-xs font-semibold mb-1 text-slate-700">
                  <span>HOTS Synthesis & Error Analysis</span>
                  <span>${this.calculateTopicAccuracy(completedStudents, "HOTS")}%</span>
                </div>
                <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div class="bg-indigo-600 h-full rounded-full transition-all duration-500" style="width: ${this.calculateTopicAccuracy(completedStudents, "HOTS")}%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Challenging Questions -->
          <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 class="font-bold text-slate-900 text-base">⚠️ Butir Soal Perlu Review</h4>
              <span class="text-xs text-rose-600 font-bold">Prioritas Remedial</span>
            </div>
            <div class="space-y-2.5 text-xs">
              ${this.renderTopChallengingItems(completedStudents)}
            </div>
          </div>
        </div>

        <!-- Student Results Table & Search / Sort -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-5">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h4 class="text-lg font-bold text-slate-900">Daftar Nilai Siswa (${this.selectedClassFilter})</h4>
              <p class="text-xs text-slate-500">Klik baris siswa untuk melihat lembar jawaban dan refleksinya.</p>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <button 
                onclick="StorageManager.exportClassSummaryCSV()"
                class="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm">
                <span>📥</span> Export CSV Nilai
              </button>
              <button 
                onclick="StorageManager.exportItemAnalysisCSV()"
                class="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm">
                <span>📊</span> Export Analisis Butir Soal
              </button>
              <button 
                onclick="ResultsManager.resetClassDemoData()"
                class="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs transition-colors">
                🔄 Reset Demo Data
              </button>
            </div>
          </div>

          <!-- Search Bar -->
          <div class="flex items-center gap-3">
            <div class="relative flex-1">
              <input 
                type="text" 
                placeholder="Cari nama siswa..."
                value="${this.searchTerm}"
                oninput="ResultsManager.handleSearch(this.value)"
                class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
              <span class="absolute left-3 top-3 text-slate-400 text-xs">🔍</span>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr class="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
                  <th class="py-3 px-3">No</th>
                  <th class="py-3 px-3 cursor-pointer hover:text-emerald-700" onclick="ResultsManager.handleSort('name')">Nama Siswa ⬍</th>
                  <th class="py-3 px-3">Kelas</th>
                  <th class="py-3 px-3 cursor-pointer hover:text-emerald-700 text-center" onclick="ResultsManager.handleSort('readingScore')">Reading (/10) ⬍</th>
                  <th class="py-3 px-3 cursor-pointer hover:text-emerald-700 text-center" onclick="ResultsManager.handleSort('grammarScore')">Grammar (/15) ⬍</th>
                  <th class="py-3 px-3 cursor-pointer hover:text-emerald-700 text-center" onclick="ResultsManager.handleSort('totalScore')">Total (/25) ⬍</th>
                  <th class="py-3 px-3 cursor-pointer hover:text-emerald-700 text-center" onclick="ResultsManager.handleSort('percentage')">Persen ⬍</th>
                  <th class="py-3 px-3">Kategori</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody id="teacher-student-tbody" class="divide-y divide-slate-100">
                ${this.renderStudentRows(students)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  renderStudentRows(students) {
    let filtered = students.filter(s => {
      const nameMatch = (s.name || '').toLowerCase().includes(this.searchTerm.toLowerCase());
      return nameMatch;
    });

    filtered.sort((a, b) => {
      let valA = a[this.sortField];
      let valB = b[this.sortField];

      if (this.sortField === 'name') {
        valA = (a.name || '').toLowerCase();
        valB = (b.name || '').toLowerCase();
      } else if (['readingScore', 'grammarScore', 'totalScore', 'percentage'].includes(this.sortField)) {
        valA = a.assessment?.[this.sortField] || 0;
        valB = b.assessment?.[this.sortField] || 0;
      }

      if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    if (filtered.length === 0) {
      return `<tr><td colspan="10" class="py-6 text-center text-slate-400">Belum ada data siswa untuk kelas ini.</td></tr>`;
    }

    return filtered.map((s, index) => {
      const ast = s.assessment || {};
      const isComp = ast.completed;
      return `
        <tr class="hover:bg-emerald-50/40 transition-colors cursor-pointer" onclick="ResultsManager.openStudentModal('${s.id}')">
          <td class="py-3 px-3 font-bold text-slate-700">${index + 1}</td>
          <td class="py-3 px-3 font-bold text-slate-900">${s.name || 'Anonymous Student'}</td>
          <td class="py-3 px-3 text-emerald-800 font-semibold text-xs">${s.studentClass || 'XI Reguler'}</td>
          <td class="py-3 px-3 text-center text-slate-700 font-medium">${isComp ? `${ast.readingScore}/10` : '-'}</td>
          <td class="py-3 px-3 text-center text-slate-700 font-medium">${isComp ? `${ast.grammarScore}/15` : '-'}</td>
          <td class="py-3 px-3 text-center font-bold text-emerald-800">${isComp ? `${ast.totalScore}/25` : '-'}</td>
          <td class="py-3 px-3 text-center font-extrabold ${isComp && ast.percentage >= 80 ? 'text-emerald-700' : 'text-slate-700'}">${isComp ? `${ast.percentage}%` : '-'}</td>
          <td class="py-3 px-3 text-xs text-slate-600">${isComp ? ast.band : 'Sedang Mengerjakan'}</td>
          <td class="py-3 px-3 text-center">
            <span class="px-2 py-0.5 rounded-full text-[11px] font-bold ${isComp ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
              ${isComp ? 'Selesai' : 'Aktif'}
            </span>
          </td>
          <td class="py-3 px-3 text-center">
            <button 
              onclick="event.stopPropagation(); ResultsManager.openStudentModal('${s.id}')"
              class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 text-xs font-semibold transition-colors">
              Lihat 🔍
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  calculateTopicAccuracy(completedStudents, targetTopic) {
    if (!completedStudents || completedStudents.length === 0) return 0;
    let totalQs = 0;
    let correctQs = 0;

    completedStudents.forEach(std => {
      (std.assessment?.questionResults || []).forEach(r => {
        let match = false;
        if (targetTopic === "HOTS") {
          match = r.difficulty === "HOTS";
        } else {
          match = r.topic?.toLowerCase().includes(targetTopic.toLowerCase());
        }

        if (match) {
          totalQs++;
          if (r.isCorrect) correctQs++;
        }
      });
    });

    return totalQs > 0 ? Math.round((correctQs / totalQs) * 100) : 0;
  },

  renderTopChallengingItems(completedStudents) {
    if (!completedStudents || completedStudents.length === 0) {
      return `<p class="text-slate-400">Belum ada data asesmen masuk.</p>`;
    }

    const itemAccuracy = MPI_DATA.assessment.questions.map(q => {
      let correct = 0;
      let total = 0;

      completedStudents.forEach(std => {
        const res = std.assessment?.questionResults?.find(r => r.questionNumber === q.questionNumber);
        if (res) {
          total++;
          if (res.isCorrect) correct++;
        }
      });

      const acc = total > 0 ? Math.round((correct / total) * 100) : 100;
      return { q, acc, correct, total };
    });

    itemAccuracy.sort((a, b) => a.acc - b.acc);
    const top4 = itemAccuracy.slice(0, 4);

    return top4.map(item => `
      <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
        <div class="flex justify-between items-center">
          <span class="font-bold text-slate-800">Q${item.q.questionNumber}: ${item.q.skill} (${item.q.difficulty})</span>
          <span class="px-2 py-0.5 bg-rose-100 text-rose-800 rounded-full font-black text-[10px]">${item.acc}% Akurasi</span>
        </div>
        <p class="text-[11px] text-slate-500 line-clamp-1">${item.q.question.replace(/\n/g, ' ')}</p>
      </div>
    `).join('');
  },

  handleSearch(val) {
    this.searchTerm = val;
    this.renderResultsTab();
  },

  handleSort(field) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    } else {
      this.sortField = field;
      this.sortOrder = "desc";
    }
    this.renderResultsTab();
  },

  refreshCloudData() {
    if (typeof FirebaseSync !== 'undefined') {
      FirebaseSync.fetchAllStudentsFromCloud().then(() => {
        this.renderResultsTab();
        SoundManager.playCorrect();
      });
    }
  },

  openStudentModal(studentId) {
    const students = StorageManager.getAllStudents();
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const modalContainer = document.getElementById("student-modal-container");
    if (!modalContainer) return;

    const ast = student.assessment || {};
    const ref = student.reflection || {};

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
        <div class="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div class="flex items-start justify-between border-b border-slate-100 pb-4">
            <div>
              <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Lembar Diagnostik Siswa</span>
              <h3 class="text-2xl font-bold text-slate-900">${student.name || 'Anonymous Student'}</h3>
              <p class="text-xs text-slate-500 font-medium">Kelas: <strong>${student.studentClass || 'XI Reguler'}</strong> • Tanggal: ${new Date(student.startedAt).toLocaleString()}</p>
            </div>
            <button 
              onclick="ResultsManager.closeStudentModal()"
              class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold transition-colors">
              ✕
            </button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-[10px] text-slate-400 uppercase font-semibold block">Reading</span>
              <span class="text-lg font-bold text-slate-800">${ast.readingScore || 0}/10</span>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-[10px] text-slate-400 uppercase font-semibold block">Grammar</span>
              <span class="text-lg font-bold text-slate-800">${ast.grammarScore || 0}/15</span>
            </div>
            <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <span class="text-[10px] text-emerald-800 uppercase font-semibold block">Total</span>
              <span class="text-lg font-bold text-emerald-800">${ast.totalScore || 0}/25 (${ast.percentage || 0}%)</span>
            </div>
            <div class="p-3 bg-teal-50 rounded-xl border border-teal-100">
              <span class="text-[10px] text-teal-800 uppercase font-semibold block">Kategori</span>
              <span class="text-xs font-bold text-teal-900 block mt-1">${ast.band || 'N/A'}</span>
            </div>
          </div>

          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <h5 class="font-bold text-slate-800 uppercase tracking-wider">Hasil Refleksi Belajar Siswa</h5>
            <p><strong>1. Materi yang dipelajari:</strong> ${ref.q1_learned || 'N/A'}</p>
            <p><strong>2. Bagian paling mudah:</strong> ${ref.q2_easiest || 'N/A'}</p>
            <p><strong>3. Bagian paling menantang:</strong> ${ref.q3_challenging || 'N/A'}</p>
            <p><strong>4. Tingkat kepercayaan diri:</strong> ${ref.q4_confidence || 'N/A'}</p>
            <p><strong>5. Target peningkatan:</strong> ${ref.q5_next_improvement || 'N/A'}</p>
          </div>

          <div class="space-y-3">
            <h5 class="font-bold text-slate-800 text-sm">Analisis Butir Jawaban (25 Soal)</h5>
            <div class="max-h-72 overflow-y-auto border border-slate-100 rounded-2xl">
              <table class="w-full text-left text-xs">
                <thead class="sticky top-0 bg-slate-100 text-slate-700 font-semibold">
                  <tr>
                    <th class="py-2.5 px-3">No</th>
                    <th class="py-2.5 px-3">Kategori</th>
                    <th class="py-2.5 px-3">Fokus Skill</th>
                    <th class="py-2.5 px-3">Level</th>
                    <th class="py-2.5 px-3 text-center">Jawaban</th>
                    <th class="py-2.5 px-3 text-center">Kunci</th>
                    <th class="py-2.5 px-3 text-center">Hasil</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 bg-white">
                  ${(ast.questionResults || []).map(r => `
                    <tr class="hover:bg-slate-50">
                      <td class="py-2 px-3 font-bold">${r.questionNumber}</td>
                      <td class="py-2 px-3 text-slate-600">${r.part === 'A' ? 'Reading' : 'Grammar'}</td>
                      <td class="py-2 px-3 text-slate-800">${r.skill}</td>
                      <td class="py-2 px-3 font-semibold text-slate-600">${r.difficulty}</td>
                      <td class="py-2 px-3 text-center font-bold ${r.isCorrect ? 'text-emerald-700' : 'text-rose-600'}">${r.studentAnswer}</td>
                      <td class="py-2 px-3 text-center font-bold text-emerald-800">${r.correctAnswer}</td>
                      <td class="py-2 px-3 text-center font-bold ${r.isCorrect ? 'text-emerald-600' : 'text-rose-600'}">
                        ${r.isCorrect ? '✓' : '✗'}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="flex justify-end pt-4 border-t border-slate-100">
            <button 
              onclick="ResultsManager.closeStudentModal()"
              class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold">
              Tutup Laporan
            </button>
          </div>
        </div>
      </div>
    `;
  },

  closeStudentModal() {
    const modalContainer = document.getElementById("student-modal-container");
    if (modalContainer) modalContainer.innerHTML = "";
  },

  resetClassDemoData() {
    if (confirm("Reset semua data kelas demo ke pengaturan awal?")) {
      StorageManager.resetAllClassData();
      this.renderResultsTab();
      SoundManager.playCelebration();
    }
  }
};
