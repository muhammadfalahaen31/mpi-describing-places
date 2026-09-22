/**
 * STORAGE & DATA PERSISTENCE MODULE (REVISED FOR 25-QUESTION ASSESSMENT)
 * Manages local session, multi-student records, CSV export, and demo records for Teacher Dashboard.
 */

const STORAGE_KEYS = {
  CURRENT_STUDENT: "mpi_env_current_student_v2",
  STUDENTS_REGISTRY: "mpi_env_students_registry_v2",
  SETTINGS: "mpi_env_settings_v2"
};

const StorageManager = {
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.STUDENTS_REGISTRY)) {
      this.seedInitialTeacherData();
    }
  },

  getCurrentStudent() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_STUDENT);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Failed to read current student from localStorage", e);
    }
    return this.createDefaultStudent("");
  },

  saveCurrentStudent(studentData) {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_STUDENT, JSON.stringify(studentData));
      if (studentData.name && studentData.name.trim() !== "") {
        this.upsertStudentRecord(studentData);
      }
    } catch (e) {
      console.error("Failed to save current student", e);
    }
  },

  createDefaultStudent(name = "") {
    return {
      id: "std_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
      name: name,
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activeTab: "home",
      progress: 0,
      completedSections: {
        home: false,
        explore: false,
        learn: false,
        practiceL1: false,
        practiceL2: false,
        practiceL3: false,
        assessment: false,
        reflection: false
      },
      practice: {
        level1: { score: 0, total: 10, completed: false, answers: {} },
        level2: { score: 0, total: 10, completed: false, answers: {} },
        level3: { score: 0, total: 5, completed: false, answers: {} }
      },
      assessment: {
        completed: false,
        submittedAt: null,
        readingScore: 0,
        grammarScore: 0,
        totalScore: 0,
        percentage: 0,
        band: "Needs further practice",
        answers: {}, // questionId -> optionIndex
        questionResults: [] // array of { questionNumber, topic, skill, difficulty, studentAnswer, correctAnswer, isCorrect }
      },
      reflection: {
        submitted: false,
        submittedAt: null,
        q1_learned: "",
        q2_easiest: "",
        q3_challenging: "",
        q4_confidence: "",
        q5_next_improvement: ""
      },
      badges: []
    };
  },

  upsertStudentRecord(student) {
    try {
      const registry = this.getAllStudents();
      const existingIndex = registry.findIndex(s => s.id === student.id || (s.name && s.name.toLowerCase() === student.name.toLowerCase()));
      
      const record = {
        ...student,
        updatedAt: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        registry[existingIndex] = record;
      } else {
        registry.push(record);
      }
      localStorage.setItem(STORAGE_KEYS.STUDENTS_REGISTRY, JSON.stringify(registry));
    } catch (e) {
      console.error("Failed to upsert student record", e);
    }
  },

  getAllStudents() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.STUDENTS_REGISTRY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error("Failed to read students registry", e);
    }
    return [];
  },

  resetCurrentSession() {
    const student = this.createDefaultStudent("");
    this.saveCurrentStudent(student);
    return student;
  },

  resetAllClassData() {
    localStorage.removeItem(STORAGE_KEYS.STUDENTS_REGISTRY);
    this.seedInitialTeacherData();
  },

  // Export Class Summary CSV for 25-Question assessment
  exportClassSummaryCSV() {
    const students = this.getAllStudents();
    if (!students || students.length === 0) {
      alert("No student records available to export.");
      return;
    }

    const headers = [
      "No",
      "Student Name",
      "Status",
      "Reading Score (/10)",
      "Grammar Score (/15)",
      "Total Score (/25)",
      "Percentage (%)",
      "Achievement Band",
      "Confidence Level",
      "Submission Date"
    ];

    const rows = students.map((std, index) => {
      const status = std.assessment?.completed ? "Completed" : "In Progress";
      const reading = std.assessment?.completed ? std.assessment.readingScore : "-";
      const grammar = std.assessment?.completed ? std.assessment.grammarScore : "-";
      const total = std.assessment?.completed ? std.assessment.totalScore : "-";
      const percentage = std.assessment?.completed ? `${std.assessment.percentage}%` : "-";
      const band = std.assessment?.completed ? std.assessment.band : "-";
      const confidence = std.reflection?.q4_confidence || "-";
      const date = std.assessment?.submittedAt ? new Date(std.assessment.submittedAt).toLocaleDateString() : "-";

      return [
        index + 1,
        `"${(std.name || 'Anonymous').replace(/"/g, '""')}"`,
        status,
        reading,
        grammar,
        total,
        percentage,
        `"${band}"`,
        `"${confidence}"`,
        `"${date}"`
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MPI_Class_Report_25Q_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Export Item Analysis CSV for 25 questions
  exportItemAnalysisCSV() {
    const students = this.getAllStudents().filter(s => s.assessment?.completed);
    if (!students || students.length === 0) {
      alert("No completed assessments found for Item Analysis export.");
      return;
    }

    const headers = [
      "Question No",
      "Part",
      "Topic",
      "Skill",
      "Difficulty (LOTS/MOTS/HOTS)",
      "Total Answered",
      "Total Correct",
      "Total Incorrect",
      "Accuracy (%)"
    ];

    const questionStats = MPI_DATA.assessment.questions.map(q => {
      let correctCount = 0;
      let totalCount = 0;

      students.forEach(std => {
        const res = std.assessment.questionResults.find(r => r.questionNumber === q.questionNumber);
        if (res) {
          totalCount++;
          if (res.isCorrect) correctCount++;
        }
      });

      const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

      return [
        q.questionNumber,
        q.part,
        `"${q.topic}"`,
        `"${q.skill}"`,
        `"${q.difficulty}"`,
        totalCount,
        correctCount,
        totalCount - correctCount,
        `${accuracy}%`
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...questionStats].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MPI_Item_Analysis_25Q_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Seed sample realistic student records for 25 questions
  seedInitialTeacherData() {
    const sampleNames = [
      "Alya Zahra Kirana",
      "Bintang Arya Pratama",
      "Clara Stephanie Putri",
      "Dimas Farhan Ramadhan",
      "Elisa Nurul Hidayah",
      "Fajar Kurniawan",
      "Gita Maharani",
      "Hafizh Rahmatullah",
      "Intan Permata Sari",
      "Jonathan Kevin Lee"
    ];

    // Out of 25: Reading /10, Grammar /15
    const targetScores = [
      { r: 10, g: 14 }, // 24/25 (96%) - Excellent
      { r: 9,  g: 14 }, // 23/25 (92%) - Excellent
      { r: 9,  g: 12 }, // 21/25 (84%) - Good
      { r: 8,  g: 12 }, // 20/25 (80%) - Good
      { r: 8,  g: 11 }, // 19/25 (76%) - Developing
      { r: 7,  g: 11 }, // 18/25 (72%) - Developing
      { r: 6,  g: 10 }, // 16/25 (64%) - Needs practice
      { r: 9,  g: 13 }, // 22/25 (88%) - Good
      { r: 8,  g: 13 }, // 21/25 (84%) - Good
      { r: 6,  g: 9  }  // 15/25 (60%) - Needs practice
    ];

    const reflections = [
      { l: "How to use adjective phrases to describe my home garden.", e: "Five Senses", c: "Simple Present Negative Forms", cf: "😄 Very confident", imp: "Practice more sentence writing." },
      { l: "Describing school gardens with simple present verbs.", e: "Reading Comprehension", c: "Adjective Phrase Pattern 3", cf: "😄 Very confident", imp: "Learn more words about nature." },
      { l: "Combining seeing, smelling, and touching in one sentence.", e: "Five Senses", c: "Subject-Verb Agreement", cf: "🙂 Confident", imp: "Remember to add -s for singular subjects." },
      { l: "The structure of descriptive texts about home surroundings.", e: "Adjective Phrases", c: "Reading Questions", cf: "🙂 Confident", imp: "Read simple English texts more often." },
      { l: "Using 'full of' and 'famous for' correctly.", e: "Five Senses", c: "Simple Present Questions", cf: "😐 Still learning", imp: "Review the grammar rules." },
      { l: "How sensory words make school descriptions alive.", e: "Reading Comprehension", c: "Word order in adjective phrases", cf: "🙂 Confident", imp: "Do more practice quizzes." },
      { l: "Describing clean rivers and neighborhood gardens.", e: "Five Senses", c: "Error correction questions", cf: "🙂 Confident", imp: "Write a short paragraph about my house." },
      { l: "Combining sight and smell into descriptive sentences.", e: "Adjective Phrases", c: "Reading Text 2 Inference", cf: "😄 Very confident", imp: "Help my classmates practice English." },
      { l: "Difference between singular and plural verbs.", e: "Reading Comprehension", c: "Adjective Phrase Pattern 2", cf: "🙂 Confident", imp: "Review vocabulary." },
      { l: "Simple present tense rules for describing places.", e: "Five Senses", c: "Grammar questions", cf: "😐 Still learning", imp: "Retake practice Level 2." }
    ];

    const mockRegistry = sampleNames.map((name, i) => {
      const scorePair = targetScores[i];
      const ref = reflections[i];
      const rScore = scorePair.r;
      const gScore = scorePair.g;
      const totalScore = rScore + gScore;
      const percentage = Math.round((totalScore / 25) * 100);

      let band = "Needs further practice";
      if (percentage >= 90) band = "Excellent mastery";
      else if (percentage >= 80) band = "Good mastery";
      else if (percentage >= 70) band = "Developing mastery";

      const answers = {};
      const questionResults = [];

      MPI_DATA.assessment.questions.forEach((q) => {
        let isCorrect = false;
        if (q.part === "A") {
          // Reading (10 questions)
          const errorTarget = 10 - rScore;
          const shouldBeWrong = ((q.questionNumber * 7 + i * 3) % 10) < errorTarget;
          isCorrect = !shouldBeWrong;
        } else {
          // Grammar (15 questions)
          const errorTarget = 15 - gScore;
          const shouldBeWrong = ((q.questionNumber * 5 + i * 2) % 15) < errorTarget;
          isCorrect = !shouldBeWrong;
        }

        const studentAns = isCorrect ? q.answer : (q.answer + 1) % 5;
        answers[q.id] = studentAns;

        const optionLabels = ["A", "B", "C", "D", "E"];
        questionResults.push({
          questionNumber: q.questionNumber,
          part: q.part,
          topic: q.topic,
          skill: q.skill,
          difficulty: q.difficulty,
          studentAnswer: optionLabels[studentAns],
          correctAnswer: optionLabels[q.answer],
          isCorrect: isCorrect
        });
      });

      return {
        id: "mock_std_" + (i + 1),
        name: name,
        startedAt: new Date(Date.now() - (i + 1) * 3600000).toISOString(),
        updatedAt: new Date(Date.now() - i * 1800000).toISOString(),
        activeTab: "results",
        progress: 100,
        completedSections: {
          home: true,
          explore: true,
          learn: true,
          practiceL1: true,
          practiceL2: true,
          practiceL3: true,
          assessment: true,
          reflection: true
        },
        practice: {
          level1: { score: 9 + (i % 2), total: 10, completed: true, answers: {} },
          level2: { score: 8 + (i % 3), total: 10, completed: true, answers: {} },
          level3: { score: 4 + (i % 2), total: 5, completed: true, answers: {} }
        },
        assessment: {
          completed: true,
          submittedAt: new Date(Date.now() - i * 1800000).toISOString(),
          readingScore: rScore,
          grammarScore: gScore,
          totalScore: totalScore,
          percentage: percentage,
          band: band,
          answers: answers,
          questionResults: questionResults
        },
        reflection: {
          submitted: true,
          submittedAt: new Date(Date.now() - i * 1800000).toISOString(),
          q1_learned: ref.l,
          q2_easiest: ref.e,
          q3_challenging: ref.c,
          q4_confidence: ref.cf,
          q5_next_improvement: ref.imp
        },
        badges: ["eco_learner", "eco_explorer", "env_describer", "eco_master"]
      };
    });

    localStorage.setItem(STORAGE_KEYS.STUDENTS_REGISTRY, JSON.stringify(mockRegistry));
  }
};

StorageManager.init();
