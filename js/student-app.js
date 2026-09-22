/**
 * STUDENT MODE CONTROLLER (STUDENT-APP.JS)
 * Optimized for Mobile (HP), Tablet, and Laptop with only 2 tabs: Assessment & Reflection.
 * Features Student Login (Name + Class XI Reguler 1-10) and Real-time Firebase Cloud Sync.
 */

const StudentApp = {
  activeTab: "login", // "login", "assessment", "reflection", "result"
  currentQuestionIndex: 0,
  answers: {},
  flaggedQuestions: new Set(),
  studentData: null,

  init() {
    this.loadSession();
    this.render();
  },

  loadSession() {
    const saved = localStorage.getItem("mpi_student_session_v2");
    if (saved) {
      try {
        this.studentData = JSON.parse(saved);
        if (this.studentData.name && this.studentData.studentClass) {
          this.answers = this.studentData.assessment?.answers || {};
          if (this.studentData.reflection?.submitted) {
            this.activeTab = "result";
          } else if (this.studentData.assessment?.completed) {
            this.activeTab = "reflection";
          } else {
            this.activeTab = "assessment";
          }
        }
      } catch (e) {
        console.error("Error reading student session", e);
      }
    }
  },

  saveSession() {
    if (this.studentData) {
      localStorage.setItem("mpi_student_session_v2", JSON.stringify(this.studentData));
      FirebaseSync.saveStudentToCloud(this.studentData);
    }
  },

  render() {
    const main = document.getElementById("student-main-content");
    if (!main) return;

    this.updateHeaderUI();

    switch (this.activeTab) {
      case "login":
        this.renderLogin(main);
        break;
      case "assessment":
        this.renderAssessment(main);
        break;
      case "reflection":
        this.renderReflection(main);
        break;
      case "result":
        this.renderResult(main);
        break;
    }
  },

  updateHeaderUI() {
    const headerEl = document.getElementById("student-header-bar");
    const nameBadge = document.getElementById("student-header-name");
    const classBadge = document.getElementById("student-header-class");
    const navBar = document.getElementById("student-nav-bar");

    if (this.studentData && this.studentData.name) {
      if (headerEl) headerEl.classList.remove("hidden");
      if (nameBadge) nameBadge.textContent = this.studentData.name;
      if (classBadge) classBadge.textContent = this.studentData.studentClass || "XI Reguler";
      if (navBar) navBar.classList.remove("hidden");

      // Update Nav Buttons
      document.querySelectorAll(".student-nav-btn").forEach(btn => {
        const isTab = btn.dataset.tab === this.activeTab;
        btn.classList.toggle("bg-emerald-600", isTab);
        btn.classList.toggle("text-white", isTab);
        btn.classList.toggle("text-slate-600", !isTab);
      });
    } else {
      if (navBar) navBar.classList.add("hidden");
    }
  },

  // ==================== LOGIN VIEW ====================
  renderLogin(container) {
    const classOptions = [
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

    container.innerHTML = `
      <div class="max-w-md mx-auto my-4 sm:my-8 px-2 animate-fadeIn">
        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
          
          <!-- Logo & Header -->
          <div class="text-center space-y-2">
            <div class="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center text-3xl mx-auto shadow-lg shadow-emerald-600/30">
              🌱
            </div>
            <span class="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider inline-block">
              Student Assessment Portal
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Describing Places</h2>
            <p class="text-xs sm:text-sm text-slate-500">Environmental Awareness • XI Grade English</p>
          </div>

          <!-- Login Form -->
          <form onsubmit="StudentApp.handleLogin(event)" class="space-y-4">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-700 uppercase tracking-wider block">Nama Lengkap Siswa</label>
              <input 
                id="login-name" 
                type="text" 
                required
                placeholder="Masukkan nama lengkap kamu..."
                class="w-full px-4 py-3.5 rounded-2xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600">
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-700 uppercase tracking-wider block">Pilih Kelas</label>
              <select 
                id="login-class" 
                required
                class="w-full px-4 py-3.5 rounded-2xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white">
                <option value="">-- Pilih Kelas XI --</option>
                ${classOptions.map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>

            <div class="pt-2">
              <button 
                type="submit"
                class="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2">
                <span>Mulai Asesmen (Start Assessment)</span>
                <span>🚀</span>
              </button>
            </div>
          </form>

          <!-- Instructions -->
          <div class="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 text-xs text-emerald-950 space-y-1.5">
            <div class="font-bold flex items-center gap-1.5">
              <span>📌</span> Petunjuk Pengerjaan:
            </div>
            <ul class="space-y-1 text-slate-600 list-disc list-inside">
              <li>Asesmen terdiri dari <strong>25 Soal Pilihan Ganda (A-E)</strong>.</li>
              <li>Part A: 10 Soal Reading (2 Teks Lingkungan).</li>
              <li>Part B: 15 Soal Grammar (Adjective Phrases & Present Tense).</li>
              <li>Setelah Asesmen, lengkapi refleksi belajar singkat.</li>
              <li>Jawaban otomatis tersinkronisasi ke dashboard guru.</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  handleLogin(e) {
    e.preventDefault();
    const name = document.getElementById("login-name")?.value.trim();
    const studentClass = document.getElementById("login-class")?.value;

    if (!name || !studentClass) {
      alert("Harap masukkan nama lengkap dan pilih kelas kamu.");
      return;
    }

    this.studentData = {
      id: "std_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
      name: name,
      studentClass: studentClass,
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activeTab: "assessment",
      assessment: {
        completed: false,
        submittedAt: null,
        readingScore: 0,
        grammarScore: 0,
        totalScore: 0,
        percentage: 0,
        band: "In Progress",
        answers: {},
        questionResults: []
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

    SoundManager.playCelebration();
    this.saveSession();
    this.activeTab = "assessment";
    this.render();
  },

  switchTab(tab) {
    if (tab === "reflection" && !this.studentData.assessment?.completed) {
      alert("Harap selesaikan dan submit Asesmen (25 Soal) terlebih dahulu sebelum mengisi Refleksi.");
      return;
    }
    this.activeTab = tab;
    SoundManager.playClick();
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ==================== ASSESSMENT VIEW (25 Qs) ====================
  renderAssessment(container) {
    if (this.studentData.assessment?.completed) {
      this.renderAlreadySubmitted(container);
      return;
    }

    const questions = MPI_DATA.assessment.questions;
    const currentQ = questions[this.currentQuestionIndex];
    const total = questions.length;
    const answeredCount = Object.keys(this.answers).length;
    const isFlagged = this.flaggedQuestions.has(currentQ.id);
    const selectedOpt = this.answers[currentQ.id];

    const isReading = currentQ.part === "A";
    const readingPassage = isReading ? (currentQ.textId === "text-1" ? MPI_DATA.assessment.text1 : MPI_DATA.assessment.text2) : null;

    container.innerHTML = `
      <div class="max-w-6xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn pb-12">
        
        <!-- Mobile/Desktop Top Status Bar -->
        <div class="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-4 sm:p-6 text-white shadow-md flex items-center justify-between gap-3">
          <div class="space-y-0.5">
            <span class="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">Mode Siswa • 25 Soal</span>
            <h3 class="text-base sm:text-xl font-bold">Asesmen Kompetensi</h3>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-black/30 backdrop-blur px-3 py-1.5 rounded-xl text-center border border-white/10">
              <span class="text-[10px] text-emerald-300 block font-medium">Terjawab</span>
              <span class="text-xs sm:text-sm font-bold">${answeredCount} / ${total}</span>
            </div>
            <button 
              onclick="StudentApp.confirmSubmitAssessment()"
              class="px-3.5 sm:px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all">
              Submit Asesmen 📤
            </button>
          </div>
        </div>

        <!-- 2-Column Responsive Layout (HP stacked, Laptop side-by-side) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          
          <!-- Left Column: Passage (if Part A) or Question Prompt -->
          <div class="lg:col-span-7 space-y-4">
            ${isReading && readingPassage ? `
              <div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200/80 space-y-3">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg uppercase">
                    Passage ${readingPassage.id === 'text-1' ? '1: School Environment' : '2: Home Environment'}
                  </span>
                  <span class="text-xs text-slate-400">(${readingPassage.wordCount} words)</span>
                </div>
                <h4 class="text-base sm:text-lg font-bold text-slate-800">${readingPassage.title}</h4>
                <div class="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 font-serif bg-slate-50 p-4 rounded-xl border border-slate-100 max-h-56 sm:max-h-72 overflow-y-auto custom-scrollbar">
                  ${readingPassage.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                </div>
              </div>
            ` : `
              <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-950 font-medium">
                📘 <strong>Part B: Grammar Focus</strong> — Pilihlah opsi yang paling tepat untuk subject-verb agreement dan frasa kata sifat.
              </div>
            `}

            <!-- Question Card -->
            <div class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80 space-y-5">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <div class="flex items-center gap-2.5">
                  <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-bold flex items-center justify-center">
                    ${currentQ.questionNumber}
                  </span>
                  <div>
                    <span class="text-[11px] font-bold uppercase text-emerald-700 block">
                      ${currentQ.part === 'A' ? 'Part A: Reading Comprehension' : 'Part B: Grammar Focus'}
                    </span>
                    <span class="text-[11px] text-slate-500">${currentQ.skill} (${currentQ.difficulty})</span>
                  </div>
                </div>

                <button 
                  onclick="StudentApp.toggleFlag(${currentQ.id})" 
                  class="px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${isFlagged ? 'bg-amber-100 border-amber-300 text-amber-800' : 'border-slate-200 text-slate-600'}">
                  <span>${isFlagged ? '🚩' : '🏳️'}</span>
                  <span>${isFlagged ? 'Ragu-ragu' : 'Tandai'}</span>
                </button>
              </div>

              <!-- Question Text -->
              <div class="text-sm sm:text-base font-medium text-slate-800 leading-relaxed whitespace-pre-line">
                ${currentQ.question}
              </div>

              <!-- Options A - E -->
              <div class="space-y-2">
                ${currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedOpt === optIdx;
                  return `
                    <button 
                      onclick="StudentApp.selectAnswer(${currentQ.id}, ${optIdx})"
                      class="w-full text-left p-3 sm:p-3.5 rounded-xl border transition-all flex items-start gap-3 ${isSelected ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-medium ring-2 ring-emerald-600/30' : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-slate-700'}">
                      <div class="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${isSelected ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-300 text-slate-500'}">
                        ${String.fromCharCode(65 + optIdx)}
                      </div>
                      <span class="text-xs sm:text-sm flex-1 pt-0.5">${opt}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- Navigation Controls -->
              <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                <button 
                  onclick="StudentApp.prevQuestion()" 
                  ${this.currentQuestionIndex === 0 ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="hover:bg-slate-100 text-slate-700"'}
                  class="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold flex items-center gap-1">
                  <span>←</span> Sebelumnya
                </button>

                <button 
                  onclick="StudentApp.nextQuestion()" 
                  ${this.currentQuestionIndex === total - 1 ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="bg-emerald-600 hover:bg-emerald-700 text-white"'}
                  class="px-5 py-2 rounded-xl font-semibold text-xs shadow-md transition-all flex items-center gap-1.5">
                  <span>Selanjutnya</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Column: Question Navigator Grid -->
          <div class="lg:col-span-5 space-y-4">
            <div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200/80 space-y-4">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                <h5 class="font-bold text-slate-800 text-sm">Nomor Soal (25 Soal)</h5>
                <span class="text-xs text-slate-500">${answeredCount} terjawab</span>
              </div>

              <!-- Legend -->
              <div class="flex items-center gap-3 text-[11px] text-slate-600">
                <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded bg-emerald-600"></span> Terjawab</span>
                <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded bg-slate-200"></span> Belum</span>
                <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded bg-amber-400"></span> Ragu</span>
              </div>

              <!-- Part A: 1-10 -->
              <div class="space-y-1.5">
                <div class="text-[11px] font-bold text-slate-700">Part A: Reading (1 - 10)</div>
                <div class="grid grid-cols-5 gap-1.5">
                  ${questions.slice(0, 10).map((q, idx) => this.renderNavButton(q, idx)).join('')}
                </div>
              </div>

              <!-- Part B: 11-25 -->
              <div class="space-y-1.5 pt-2 border-t border-slate-100">
                <div class="text-[11px] font-bold text-slate-700">Part B: Grammar (11 - 25)</div>
                <div class="grid grid-cols-5 gap-1.5">
                  ${questions.slice(10, 25).map((q, idx) => this.renderNavButton(q, idx + 10)).join('')}
                </div>
              </div>

              <div class="pt-2 border-t border-slate-100">
                <button 
                  onclick="StudentApp.confirmSubmitAssessment()"
                  class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all">
                  Selesai & Submit Asesmen ✓
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderNavButton(q, globalIndex) {
    const isAnswered = this.answers[q.id] !== undefined;
    const isFlagged = this.flaggedQuestions.has(q.id);
    const isCurrent = this.currentQuestionIndex === globalIndex;

    let styleClass = "bg-slate-100 text-slate-600";
    if (isFlagged) {
      styleClass = "bg-amber-400 text-amber-950 font-bold";
    } else if (isAnswered) {
      styleClass = "bg-emerald-600 text-white font-semibold";
    }

    if (isCurrent) {
      styleClass += " ring-2 ring-slate-900 ring-offset-1";
    }

    return `
      <button 
        onclick="StudentApp.jumpToQuestion(${globalIndex})"
        class="h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${styleClass}">
        ${q.questionNumber}
      </button>
    `;
  },

  selectAnswer(qId, optIdx) {
    this.answers[qId] = optIdx;
    SoundManager.playClick();
    if (this.studentData.assessment) {
      this.studentData.assessment.answers = { ...this.answers };
      this.saveSession();
    }
    this.render();
  },

  toggleFlag(qId) {
    if (this.flaggedQuestions.has(qId)) {
      this.flaggedQuestions.delete(qId);
    } else {
      this.flaggedQuestions.add(qId);
    }
    SoundManager.playClick();
    this.render();
  },

  jumpToQuestion(idx) {
    this.currentQuestionIndex = idx;
    SoundManager.playClick();
    this.render();
  },

  nextQuestion() {
    if (this.currentQuestionIndex < MPI_DATA.assessment.questions.length - 1) {
      this.currentQuestionIndex++;
      SoundManager.playClick();
      this.render();
    }
  },

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      SoundManager.playClick();
      this.render();
    }
  },

  confirmSubmitAssessment() {
    const total = MPI_DATA.assessment.questions.length;
    const answered = Object.keys(this.answers).length;
    const unanswered = total - answered;

    let msg = `Kamu telah menjawab ${answered} dari ${total} soal.`;
    if (unanswered > 0) {
      msg += `\n\n⚠️ Perhatian: Ada ${unanswered} soal yang belum kamu jawab. Soal yang tidak dijawab akan bernilai 0 poin.`;
    }
    msg += "\n\nApakah kamu yakin ingin mengirim (submit) asesmen ini sekarang?";

    if (confirm(msg)) {
      this.gradeAssessment();
    }
  },

  gradeAssessment() {
    const questions = MPI_DATA.assessment.questions;
    let readingScore = 0;
    let grammarScore = 0;
    const questionResults = [];
    const optionLabels = ["A", "B", "C", "D", "E"];

    questions.forEach(q => {
      const studentOpt = this.answers[q.id];
      const isCorrect = studentOpt === q.answer;
      
      if (isCorrect) {
        if (q.part === "A") readingScore++;
        else grammarScore++;
      }

      questionResults.push({
        questionNumber: q.questionNumber,
        part: q.part,
        topic: q.topic,
        skill: q.skill,
        difficulty: q.difficulty,
        studentAnswer: studentOpt !== undefined ? optionLabels[studentOpt] : "None",
        correctAnswer: optionLabels[q.answer],
        isCorrect: isCorrect
      });
    });

    const totalScore = readingScore + grammarScore;
    const percentage = Math.round((totalScore / 25) * 100);

    let band = "Needs further practice";
    if (percentage >= 90) band = "Excellent mastery";
    else if (percentage >= 80) band = "Good mastery";
    else if (percentage >= 70) band = "Developing mastery";

    this.studentData.assessment = {
      completed: true,
      submittedAt: new Date().toISOString(),
      readingScore: readingScore,
      grammarScore: grammarScore,
      totalScore: totalScore,
      percentage: percentage,
      band: band,
      answers: { ...this.answers },
      questionResults: questionResults
    };

    if (!this.studentData.badges.includes("env_describer")) {
      this.studentData.badges.push("env_describer");
    }

    this.saveSession();
    SoundManager.playCelebration();

    alert(`Asesmen berhasil disubmit!\nSkor kamu: ${totalScore}/25 (${percentage}%)\n\nSilakan lanjutkan untuk mengisi Refleksi Belajar.`);
    this.activeTab = "reflection";
    this.render();
  },

  renderAlreadySubmitted(container) {
    const ast = this.studentData.assessment || {};
    container.innerHTML = `
      <div class="max-w-md mx-auto my-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 text-center space-y-5 animate-scaleUp">
        <div class="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto">
          ✅
        </div>
        <div class="space-y-1">
          <span class="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">
            Asesmen Selesai
          </span>
          <h3 class="text-xl font-bold text-slate-800">Asesmen Telah Disubmit</h3>
          <p class="text-xs text-slate-500">Skor kamu telah tersimpan dan terkirim ke Guru.</p>
        </div>

        <div class="grid grid-cols-3 gap-2 text-xs">
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span class="text-slate-400 block font-semibold">Reading</span>
            <span class="text-base font-bold text-slate-800">${ast.readingScore}/10</span>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span class="text-slate-400 block font-semibold">Grammar</span>
            <span class="text-base font-bold text-slate-800">${ast.grammarScore}/15</span>
          </div>
          <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <span class="text-emerald-700 block font-semibold">Total</span>
            <span class="text-base font-bold text-emerald-800">${ast.totalScore}/25 (${ast.percentage}%)</span>
          </div>
        </div>

        <div class="pt-2">
          <button 
            onclick="StudentApp.switchTab('reflection')"
            class="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all">
            Lanjut ke Lembar Refleksi →
          </button>
        </div>
      </div>
    `;
  },

  // ==================== REFLECTION VIEW ====================
  renderReflection(container) {
    const ref = this.studentData.reflection || {};

    if (ref.submitted) {
      this.renderResult(container);
      return;
    }

    container.innerHTML = `
      <div class="max-w-2xl mx-auto my-4 sm:my-8 px-2 space-y-6 animate-fadeIn">
        <div class="bg-gradient-to-r from-teal-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-2">
          <span class="px-3 py-1 bg-emerald-700/60 rounded-full text-xs font-semibold uppercase tracking-wider inline-block">
            Refleksi Pembelajaran Siswa
          </span>
          <h2 class="text-xl sm:text-2xl font-bold tracking-tight">Reflect On Your Learning</h2>
          <p class="text-emerald-100/90 text-xs sm:text-sm">
            Tuliskan pengalaman belajarmu dan evaluasi pemahaman materi deskripsi lingkungan.
          </p>
        </div>

        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-5">
          <div class="space-y-1.5">
            <label class="font-bold text-slate-800 text-xs sm:text-sm block">
              1. Apa yang kamu pelajari tentang mendeskripsikan lingkungan sekolah & rumah?
            </label>
            <textarea 
              id="student-ref-q1" 
              rows="3" 
              placeholder="Contoh: Saya belajar cara menggunakan frasa kata sifat dan Simple Present Tense..."
              class="w-full p-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">${ref.q1_learned || ''}</textarea>
          </div>

          <div class="space-y-1.5">
            <label class="font-bold text-slate-800 text-xs sm:text-sm block">
              2. Bagian materi mana yang paling mudah bagimu?
            </label>
            <select id="student-ref-q2" class="w-full p-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white">
              <option value="">-- Pilih Bagian --</option>
              <option value="Five Senses">Five Senses (Mengamati Indera)</option>
              <option value="Adjective Phrases">Adjective Phrases (Frasa Kata Sifat)</option>
              <option value="Simple Present">Simple Present Tense (Kalimat Rutinitas/Fakta)</option>
              <option value="Reading Comprehension">Reading Comprehension (Membaca Teks)</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="font-bold text-slate-800 text-xs sm:text-sm block">
              3. Bagian materi mana yang paling menantang bagimu?
            </label>
            <select id="student-ref-q3" class="w-full p-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white">
              <option value="">-- Pilih Bagian --</option>
              <option value="Five Senses">Five Senses (Mengamati Indera)</option>
              <option value="Adjective Phrases">Adjective Phrases (Frasa Kata Sifat)</option>
              <option value="Simple Present">Simple Present Tense (Aturan Verb -s/-es)</option>
              <option value="Reading Comprehension">Reading Comprehension (Membaca Teks)</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="font-bold text-slate-800 text-xs sm:text-sm block">
              4. "Saya percaya diri mendeskripsikan tempat dalam bahasa Inggris":
            </label>
            <div class="grid grid-cols-2 gap-2">
              ${[
                { label: "😄 Sangat Percaya Diri", val: "😄 Very confident" },
                { label: "🙂 Percaya Diri", val: "🙂 Confident" },
                { label: "😐 Masih Belajar", val: "😐 Still learning" },
                { label: "😟 Butuh Latihan Lagi", val: "😟 Need more practice" }
              ].map(opt => `
                <label class="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-400 flex items-center gap-2 cursor-pointer transition-colors text-xs font-medium">
                  <input type="radio" name="student-ref-q4" value="${opt.val}" class="text-emerald-600 focus:ring-emerald-500">
                  <span>${opt.label}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="font-bold text-slate-800 text-xs sm:text-sm block">
              5. Apa yang ingin kamu tingkatkan pada pertemuan berikutnya?
            </label>
            <textarea 
              id="student-ref-q5" 
              rows="3" 
              placeholder="Contoh: Saya ingin menghafal lebih banyak kosa kata lingkungan dan latihan menulis..."
              class="w-full p-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">${ref.q5_next_improvement || ''}</textarea>
          </div>

          <div class="pt-3 border-t border-slate-100 flex justify-end">
            <button 
              onclick="StudentApp.submitReflection()"
              class="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2">
              <span>SUBMIT REFLEKSI</span>
              <span>✓</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  submitReflection() {
    const q1 = document.getElementById("student-ref-q1")?.value || "";
    const q2 = document.getElementById("student-ref-q2")?.value || "";
    const q3 = document.getElementById("student-ref-q3")?.value || "";
    const q4 = document.querySelector('input[name="student-ref-q4"]:checked')?.value || "";
    const q5 = document.getElementById("student-ref-q5")?.value || "";

    if (!q1 || !q2 || !q3 || !q4) {
      alert("Harap lengkapi semua isian refleksi sebelum submit.");
      return;
    }

    this.studentData.reflection = {
      submitted: true,
      submittedAt: new Date().toISOString(),
      q1_learned: q1,
      q2_easiest: q2,
      q3_challenging: q3,
      q4_confidence: q4,
      q5_next_improvement: q5
    };

    if (!this.studentData.badges.includes("eco_master")) {
      this.studentData.badges.push("eco_master");
    }

    this.saveSession();
    SoundManager.playCelebration();

    alert("Refleksi berhasil disubmit! Data kamu telah tersinkronisasi ke Mode Guru.");
    this.activeTab = "result";
    this.render();
  },

  // ==================== FINAL RESULT VIEW ====================
  renderResult(container) {
    const ast = this.studentData.assessment || {};
    const ref = this.studentData.reflection || {};

    container.innerHTML = `
      <div class="max-w-2xl mx-auto my-4 sm:my-8 px-2 space-y-6 animate-fadeIn pb-12">
        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 text-center space-y-5">
          <div class="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto shadow-inner">
            🏆
          </div>

          <div class="space-y-1">
            <span class="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">
              Pembelajaran Selesai
            </span>
            <h2 class="text-2xl font-extrabold text-slate-900">SELAMAT, ${this.studentData.name.toUpperCase()}!</h2>
            <p class="text-xs sm:text-sm text-slate-500">
              Kelas: <strong>${this.studentData.studentClass}</strong> • Hasil kamu telah terkirim secara live ke Guru.
            </p>
          </div>

          <!-- Score Card -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span class="text-[10px] text-slate-400 font-bold uppercase block">Reading</span>
              <span class="text-lg sm:text-xl font-bold text-slate-800">${ast.readingScore}/10</span>
            </div>
            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span class="text-[10px] text-slate-400 font-bold uppercase block">Grammar</span>
              <span class="text-lg sm:text-xl font-bold text-slate-800">${ast.grammarScore}/15</span>
            </div>
            <div class="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <span class="text-[10px] text-emerald-800 font-bold uppercase block">Total Nilai</span>
              <span class="text-lg sm:text-xl font-black text-emerald-800">${ast.totalScore}/25</span>
            </div>
            <div class="p-3 bg-teal-50 rounded-2xl border border-teal-100">
              <span class="text-[10px] text-teal-800 font-bold uppercase block">Persentase</span>
              <span class="text-lg sm:text-xl font-black text-teal-800">${ast.percentage}%</span>
            </div>
          </div>

          <div class="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-emerald-950">
            <strong>Kategori Penguasaan:</strong> ${ast.band}
          </div>

          <!-- Question-by-Question Review -->
          <div class="text-left space-y-2 pt-2">
            <h4 class="font-bold text-slate-800 text-xs sm:text-sm">Ringkasan Jawaban Soal (25 Soal):</h4>
            <div class="max-h-56 overflow-y-auto border border-slate-200 rounded-2xl">
              <table class="w-full text-left text-xs">
                <thead class="sticky top-0 bg-slate-100 text-slate-700 font-semibold">
                  <tr>
                    <th class="py-2 px-2.5">No</th>
                    <th class="py-2 px-2.5">Fokus</th>
                    <th class="py-2 px-2.5 text-center">Jawabanmu</th>
                    <th class="py-2 px-2.5 text-center">Kunci</th>
                    <th class="py-2 px-2.5 text-center">Hasil</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 bg-white">
                  ${(ast.questionResults || []).map(r => `
                    <tr>
                      <td class="py-2 px-2.5 font-bold">${r.questionNumber}</td>
                      <td class="py-2 px-2.5 text-slate-600">${r.skill}</td>
                      <td class="py-2 px-2.5 text-center font-bold ${r.isCorrect ? 'text-emerald-700' : 'text-rose-600'}">${r.studentAnswer}</td>
                      <td class="py-2 px-2.5 text-center font-bold text-emerald-800">${r.correctAnswer}</td>
                      <td class="py-2 px-2.5 text-center font-bold ${r.isCorrect ? 'text-emerald-600' : 'text-rose-600'}">
                        ${r.isCorrect ? '✓' : '✗'}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100">
            <button 
              onclick="window.print()"
              class="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors">
              🖨️ Cetak / Simpan Nilai
            </button>
          </div>
        </div>
      </div>
    `;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  StudentApp.init();
});
