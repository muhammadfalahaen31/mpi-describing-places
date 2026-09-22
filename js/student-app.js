/**
 * STUDENT MODE CONTROLLER (STUDENT-APP.JS - 100% ENGLISH WITH TIMERS & LARGE READABLE UI)
 * Features:
 * - 100% English Interface
 * - Assessment Timer: 60 Minutes (with live countdown & auto-submit)
 * - Reflection Timer: 20 Minutes (with live countdown & auto-submit)
 * - Mobile-first responsive UI with large, clear typography for HP, Tablet, and Laptop
 * - Real-time Firebase Cloud Sync to Teacher Dashboard
 */

const StudentApp = {
  activeTab: "login", // "login", "assessment", "reflection", "result"
  currentQuestionIndex: 0,
  answers: {},
  flaggedQuestions: new Set(),
  studentData: null,

  // Timers (in seconds)
  assessmentSecondsLeft: 60 * 60, // 60 minutes
  reflectionSecondsLeft: 20 * 60, // 20 minutes
  timerInterval: null,

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
          
          // Restore timers if saved
          if (this.studentData.assessmentSecondsLeft !== undefined) {
            this.assessmentSecondsLeft = this.studentData.assessmentSecondsLeft;
          }
          if (this.studentData.reflectionSecondsLeft !== undefined) {
            this.reflectionSecondsLeft = this.studentData.reflectionSecondsLeft;
          }

          if (this.studentData.reflection?.submitted) {
            this.activeTab = "result";
          } else if (this.studentData.assessment?.completed) {
            this.activeTab = "reflection";
            this.startReflectionTimer();
          } else {
            this.activeTab = "assessment";
            this.startAssessmentTimer();
          }
        }
      } catch (e) {
        console.error("Error reading student session", e);
      }
    }
  },

  saveSession() {
    if (this.studentData) {
      this.studentData.assessmentSecondsLeft = this.assessmentSecondsLeft;
      this.studentData.reflectionSecondsLeft = this.reflectionSecondsLeft;
      localStorage.setItem("mpi_student_session_v2", JSON.stringify(this.studentData));
      FirebaseSync.saveStudentToCloud(this.studentData);
    }
  },

  // ==================== TIMER CONTROLS ====================
  formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  },

  startAssessmentTimer() {
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      if (this.assessmentSecondsLeft > 0) {
        this.assessmentSecondsLeft--;
        this.updateTimerDisplay("assessment-timer-display", this.assessmentSecondsLeft);
        if (this.assessmentSecondsLeft % 30 === 0) {
          this.saveSession();
        }
      } else {
        this.clearTimer();
        alert("⏱️ Assessment Time is Up! Your answers will be automatically submitted.");
        this.gradeAssessment();
      }
    }, 1000);
  },

  startReflectionTimer() {
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      if (this.reflectionSecondsLeft > 0) {
        this.reflectionSecondsLeft--;
        this.updateTimerDisplay("reflection-timer-display", this.reflectionSecondsLeft);
        if (this.reflectionSecondsLeft % 30 === 0) {
          this.saveSession();
        }
      } else {
        this.clearTimer();
        alert("⏱️ Reflection Time is Up! Your reflection will be automatically submitted.");
        this.submitReflection(true);
      }
    }, 1000);
  },

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  updateTimerDisplay(elementId, seconds) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = this.formatTime(seconds);
      if (seconds <= 300) {
        el.classList.add("text-rose-400", "animate-pulse");
      }
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
      if (classBadge) classBadge.textContent = this.studentData.studentClass || "XI Regular";
      if (navBar) navBar.classList.remove("hidden");

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

  // ==================== LOGIN VIEW (100% ENGLISH) ====================
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
      <div class="max-w-lg mx-auto my-4 sm:my-8 px-2 animate-fadeIn">
        <div class="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 space-y-7">
          
          <!-- Logo & Header -->
          <div class="text-center space-y-2.5">
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center text-3xl sm:text-4xl mx-auto shadow-lg shadow-emerald-600/30">
              🌱
            </div>
            <span class="px-3.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider inline-block">
              Student Assessment Portal
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Describing Places</h2>
            <p class="text-sm text-slate-500">Environmental Awareness • Senior High School English</p>
          </div>

          <!-- Login Form -->
          <form onsubmit="StudentApp.handleLogin(event)" class="space-y-5">
            <div class="space-y-2">
              <label class="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider block">Full Name</label>
              <input 
                id="login-name" 
                type="text" 
                required
                placeholder="Enter your full name..."
                class="w-full px-4 py-3.5 sm:py-4 rounded-2xl border border-slate-200 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs">
            </div>

            <div class="space-y-2">
              <label class="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider block">Select Class</label>
              <select 
                id="login-class" 
                required
                class="w-full px-4 py-3.5 sm:py-4 rounded-2xl border border-slate-200 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white shadow-xs">
                <option value="">-- Choose Your Class --</option>
                ${classOptions.map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>

            <div class="pt-2">
              <button 
                type="submit"
                class="w-full py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-base shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2.5">
                <span>Start Assessment</span>
                <span>🚀</span>
              </button>
            </div>
          </form>

          <!-- Instructions & Timer Info -->
          <div class="p-5 bg-emerald-50/80 rounded-2xl border border-emerald-100 text-xs sm:text-sm text-emerald-950 space-y-2">
            <div class="font-bold flex items-center gap-2 text-sm text-emerald-900">
              <span>📌</span> Assessment Guidelines & Timers:
            </div>
            <ul class="space-y-1.5 text-slate-700 list-disc list-inside">
              <li><strong>Multiple-Choice Assessment:</strong> 25 Questions (<strong>60 Minutes Timer</strong>).</li>
              <li><strong>Part A:</strong> 10 Reading Comprehension questions (2 Passages).</li>
              <li><strong>Part B:</strong> 15 Grammar in Context questions.</li>
              <li><strong>Student Reflection:</strong> 5 reflection prompts (<strong>20 Minutes Timer</strong>).</li>
              <li>Your results and answers sync directly to your Teacher in real time.</li>
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
      alert("Please enter your full name and select your class.");
      return;
    }

    this.studentData = {
      id: "std_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
      name: name,
      studentClass: studentClass,
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activeTab: "assessment",
      assessmentSecondsLeft: 60 * 60,
      reflectionSecondsLeft: 20 * 60,
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
    this.startAssessmentTimer();
    this.render();
  },

  switchTab(tab) {
    if (tab === "reflection" && !this.studentData.assessment?.completed) {
      alert("Please finish and submit the 25-Question Assessment before proceeding to Reflection.");
      return;
    }
    this.activeTab = tab;
    SoundManager.playClick();
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ==================== ASSESSMENT VIEW (25 Qs - 60 MIN TIMER) ====================
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
      <div class="max-w-6xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn pb-16">
        
        <!-- Top Status Bar with 60-Minute Countdown Timer -->
        <div class="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-4 sm:p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="space-y-1">
            <span class="text-xs font-bold text-emerald-300 uppercase tracking-wider block">Student Assessment • 25 Questions</span>
            <h3 class="text-lg sm:text-2xl font-bold">Formal Competency Test</h3>
          </div>

          <!-- Timer & Answered Count & Submit CTA -->
          <div class="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end">
            
            <!-- Live 60-Minute Timer Badge -->
            <div class="bg-black/40 backdrop-blur px-4 py-2.5 rounded-2xl border border-emerald-500/30 flex items-center gap-2 shadow-inner">
              <span class="text-lg">⏱️</span>
              <div>
                <span class="text-[10px] text-emerald-300 uppercase font-bold block">Time Left</span>
                <span id="assessment-timer-display" class="text-base sm:text-lg font-black font-mono tracking-wider text-white">
                  ${this.formatTime(this.assessmentSecondsLeft)}
                </span>
              </div>
            </div>

            <!-- Answered Badge -->
            <div class="bg-black/30 backdrop-blur px-3.5 py-2.5 rounded-2xl border border-white/10 text-center">
              <span class="text-[10px] text-emerald-300 uppercase font-bold block">Answered</span>
              <span class="text-sm sm:text-base font-bold text-white">${answeredCount} / ${total}</span>
            </div>

            <!-- Submit Button -->
            <button 
              onclick="StudentApp.confirmSubmitAssessment()"
              class="px-4 sm:px-5 py-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-400/25 transition-all flex items-center gap-1.5 shrink-0">
              <span>Submit Test</span>
              <span>📤</span>
            </button>
          </div>
        </div>

        <!-- 2-Column Responsive Workspace -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          <!-- Left Column: Reading Passage or Question Prompt -->
          <div class="lg:col-span-7 space-y-4">
            ${isReading && readingPassage ? `
              <div class="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80 space-y-3.5">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span class="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-xl uppercase">
                    Passage ${readingPassage.id === 'text-1' ? '1: School Environment' : '2: Home Environment'}
                  </span>
                  <span class="text-xs text-slate-500 font-medium">(${readingPassage.wordCount} words)</span>
                </div>
                
                <h4 class="text-lg sm:text-xl font-bold text-slate-900 leading-tight">${readingPassage.title}</h4>
                
                <!-- Large, Clear, Readable Passage Text -->
                <div class="text-sm sm:text-base text-slate-800 leading-relaxed sm:leading-loose space-y-3 font-serif bg-slate-50/80 p-5 rounded-2xl border border-slate-100 max-h-64 sm:max-h-80 overflow-y-auto custom-scrollbar">
                  ${readingPassage.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                </div>
              </div>
            ` : `
              <div class="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 text-xs sm:text-sm text-emerald-950 space-y-1">
                <strong class="font-bold flex items-center gap-1.5 text-emerald-900">
                  <span>📘</span> Part B: Grammar in Everyday Context
                </strong>
                <p class="text-slate-600">Choose the most accurate option for adjective phrases and Simple Present verb agreements.</p>
              </div>
            `}

            <!-- Question Card with Large Typography -->
            <div class="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
              
              <!-- Question Header Meta -->
              <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                <div class="flex items-center gap-3">
                  <span class="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-slate-900 text-white text-sm sm:text-base font-bold flex items-center justify-center shadow-xs">
                    ${currentQ.questionNumber}
                  </span>
                  <div>
                    <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                      ${currentQ.part === 'A' ? 'Part A: Reading Comprehension' : 'Part B: Grammar Focus'}
                    </span>
                    <span class="text-xs text-slate-500">${currentQ.skill} • Level: <strong class="text-slate-800">${currentQ.difficulty}</strong></span>
                  </div>
                </div>

                <!-- Flag Button -->
                <button 
                  onclick="StudentApp.toggleFlag(${currentQ.id})" 
                  class="px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${isFlagged ? 'bg-amber-100 border-amber-300 text-amber-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}">
                  <span>${isFlagged ? '🚩' : '🏳️'}</span>
                  <span>${isFlagged ? 'Flagged' : 'Flag Question'}</span>
                </button>
              </div>

              <!-- Question Prompt (Large & Readable) -->
              <div class="text-base sm:text-lg font-medium text-slate-900 leading-relaxed whitespace-pre-line">
                ${currentQ.question}
              </div>

              <!-- Options A - E (Generous Touch Size for Mobile/Tab/Laptop) -->
              <div class="space-y-3">
                ${currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedOpt === optIdx;
                  return `
                    <button 
                      onclick="StudentApp.selectAnswer(${currentQ.id}, ${optIdx})"
                      class="w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all flex items-start gap-3.5 ${isSelected ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-semibold ring-2 ring-emerald-600/30 shadow-xs' : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50/80 text-slate-800'}">
                      <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 mt-0.5 ${isSelected ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-300 text-slate-500'}">
                        ${String.fromCharCode(65 + optIdx)}
                      </div>
                      <span class="text-sm sm:text-base flex-1 pt-0.5">${opt}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- Navigation Controls -->
              <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                <button 
                  onclick="StudentApp.prevQuestion()" 
                  ${this.currentQuestionIndex === 0 ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="hover:bg-slate-100 text-slate-700"'}
                  class="px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors">
                  <span>←</span> Previous
                </button>

                <button 
                  onclick="StudentApp.nextQuestion()" 
                  ${this.currentQuestionIndex === total - 1 ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"'}
                  class="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5">
                  <span>Next Question</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Column: Question Navigator Grid (25 Items) -->
          <div class="lg:col-span-5 space-y-4">
            <div class="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/80 space-y-4 sticky top-20">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <h5 class="font-bold text-slate-900 text-sm sm:text-base">Question Navigator</h5>
                <span class="text-xs text-slate-500 font-medium">${answeredCount} of 25 answered</span>
              </div>

              <!-- Legend -->
              <div class="flex items-center gap-3 text-xs text-slate-600 pb-1">
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-emerald-600"></span> Answered</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-slate-200"></span> Unanswered</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-400"></span> Flagged</span>
              </div>

              <!-- Part A: 1-10 -->
              <div class="space-y-1.5">
                <div class="flex justify-between text-xs font-bold text-slate-700">
                  <span>Part A: Reading (1 - 10)</span>
                  <span class="text-slate-400 font-normal">Passages 1 & 2</span>
                </div>
                <div class="grid grid-cols-5 gap-1.5 sm:gap-2">
                  ${questions.slice(0, 10).map((q, idx) => this.renderNavButton(q, idx)).join('')}
                </div>
              </div>

              <!-- Part B: 11-25 -->
              <div class="space-y-1.5 pt-2 border-t border-slate-100">
                <div class="flex justify-between text-xs font-bold text-slate-700">
                  <span>Part B: Grammar (11 - 25)</span>
                  <span class="text-slate-400 font-normal">15 Items</span>
                </div>
                <div class="grid grid-cols-5 gap-1.5 sm:gap-2">
                  ${questions.slice(10, 25).map((q, idx) => this.renderNavButton(q, idx + 10)).join('')}
                </div>
              </div>

              <div class="pt-3 border-t border-slate-100">
                <button 
                  onclick="StudentApp.confirmSubmitAssessment()"
                  class="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2">
                  <span>Submit Final Assessment</span>
                  <span>✓</span>
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

    let styleClass = "bg-slate-100 text-slate-700 hover:bg-slate-200";
    if (isFlagged) {
      styleClass = "bg-amber-400 text-amber-950 font-bold";
    } else if (isAnswered) {
      styleClass = "bg-emerald-600 text-white font-semibold";
    }

    if (isCurrent) {
      styleClass += " ring-2 ring-slate-900 ring-offset-2 font-bold";
    }

    return `
      <button 
        onclick="StudentApp.jumpToQuestion(${globalIndex})"
        class="h-9 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center transition-all ${styleClass}">
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

    let msg = `You have answered ${answered} of ${total} questions.`;
    if (unanswered > 0) {
      msg += `\n\n⚠️ Notice: You still have ${unanswered} unanswered question(s). Unanswered questions will receive 0 points.`;
    }
    msg += "\n\nAre you sure you want to submit your assessment now?";

    if (confirm(msg)) {
      this.gradeAssessment();
    }
  },

  gradeAssessment() {
    this.clearTimer();
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

    alert(`Assessment successfully submitted!\nYour Score: ${totalScore}/25 (${percentage}%)\nBand: ${band}\n\nProceeding to the Student Reflection section.`);
    this.activeTab = "reflection";
    this.startReflectionTimer();
    this.render();
  },

  renderAlreadySubmitted(container) {
    const ast = this.studentData.assessment || {};
    container.innerHTML = `
      <div class="max-w-md mx-auto my-8 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 text-center space-y-6 animate-scaleUp">
        <div class="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto shadow-inner">
          ✅
        </div>
        <div class="space-y-1">
          <span class="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">
            Assessment Completed
          </span>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-900">Assessment Submitted</h3>
          <p class="text-xs sm:text-sm text-slate-500">Your results have been synced to your Teacher's Dashboard.</p>
        </div>

        <div class="grid grid-cols-3 gap-2.5 text-xs">
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span class="text-slate-400 block font-bold uppercase">Reading</span>
            <span class="text-base sm:text-lg font-bold text-slate-800">${ast.readingScore}/10</span>
          </div>
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span class="text-slate-400 block font-bold uppercase">Grammar</span>
            <span class="text-base sm:text-lg font-bold text-slate-800">${ast.grammarScore}/15</span>
          </div>
          <div class="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
            <span class="text-emerald-800 block font-bold uppercase">Total</span>
            <span class="text-base sm:text-lg font-black text-emerald-800">${ast.totalScore}/25 (${ast.percentage}%)</span>
          </div>
        </div>

        <div class="pt-2">
          <button 
            onclick="StudentApp.switchTab('reflection')"
            class="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all">
            Continue to Student Reflection →
          </button>
        </div>
      </div>
    `;
  },

  // ==================== REFLECTION VIEW (20 MIN TIMER - 100% ENGLISH) ====================
  renderReflection(container) {
    const ref = this.studentData.reflection || {};

    if (ref.submitted) {
      this.renderResult(container);
      return;
    }

    container.innerHTML = `
      <div class="max-w-2xl mx-auto my-4 sm:my-8 px-2 space-y-6 animate-fadeIn pb-16">
        
        <!-- Header with 20-Minute Timer -->
        <div class="bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 rounded-3xl p-5 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="space-y-1">
            <span class="px-3 py-1 bg-emerald-700/60 rounded-full text-xs font-semibold uppercase tracking-wider inline-block">
              Student Reflection
            </span>
            <h2 class="text-xl sm:text-2xl font-bold tracking-tight">Reflect On Your Learning</h2>
            <p class="text-emerald-100/90 text-xs sm:text-sm">
              Evaluate your understanding of descriptive text and set personal learning targets.
            </p>
          </div>

          <!-- Live 20-Minute Countdown Timer -->
          <div class="bg-black/40 backdrop-blur px-4 py-2.5 rounded-2xl border border-emerald-500/30 flex items-center gap-2 shadow-inner shrink-0">
            <span class="text-lg">⏱️</span>
            <div>
              <span class="text-[10px] text-emerald-300 uppercase font-bold block">Reflection Time</span>
              <span id="reflection-timer-display" class="text-base sm:text-lg font-black font-mono tracking-wider text-white">
                ${this.formatTime(this.reflectionSecondsLeft)}
              </span>
            </div>
          </div>
        </div>

        <!-- Reflection Form Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
          
          <div class="space-y-2">
            <label class="font-bold text-slate-900 text-sm sm:text-base block">
              1. What key concepts did you learn today about describing environmental places?
            </label>
            <textarea 
              id="student-ref-q1" 
              rows="3" 
              placeholder="e.g. I learned how to use adjective phrases and simple present verbs to describe school gardens..."
              class="w-full p-3.5 rounded-2xl border border-slate-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 leading-relaxed">${ref.q1_learned || ''}</textarea>
          </div>

          <div class="space-y-2">
            <label class="font-bold text-slate-900 text-sm sm:text-base block">
              2. Which part was easiest for you?
            </label>
            <select id="student-ref-q2" class="w-full p-3.5 rounded-2xl border border-slate-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white">
              <option value="">-- Select an option --</option>
              <option value="Five Senses" ${ref.q2_easiest === 'Five Senses' ? 'selected' : ''}>Five Senses (Observation)</option>
              <option value="Adjective Phrases" ${ref.q2_easiest === 'Adjective Phrases' ? 'selected' : ''}>Adjective Phrases (Patterns 1, 2, 3)</option>
              <option value="Simple Present" ${ref.q2_easiest === 'Simple Present' ? 'selected' : ''}>Simple Present Tense (Sentence Building)</option>
              <option value="Reading Comprehension" ${ref.q2_easiest === 'Reading Comprehension' ? 'selected' : ''}>Reading Comprehension</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="font-bold text-slate-900 text-sm sm:text-base block">
              3. Which part was most challenging?
            </label>
            <select id="student-ref-q3" class="w-full p-3.5 rounded-2xl border border-slate-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white">
              <option value="">-- Select an option --</option>
              <option value="Five Senses" ${ref.q3_challenging === 'Five Senses' ? 'selected' : ''}>Five Senses (Observation)</option>
              <option value="Adjective Phrases" ${ref.q3_challenging === 'Adjective Phrases' ? 'selected' : ''}>Adjective Phrases (Patterns 1, 2, 3)</option>
              <option value="Simple Present" ${ref.q3_challenging === 'Simple Present' ? 'selected' : ''}>Simple Present Tense (Verb -s/-es rules)</option>
              <option value="Reading Comprehension" ${ref.q3_challenging === 'Reading Comprehension' ? 'selected' : ''}>Reading Comprehension</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="font-bold text-slate-900 text-sm sm:text-base block">
              4. "I can describe an environmental place using English." (Confidence Level)
            </label>
            <div class="grid grid-cols-2 gap-2.5">
              ${[
                { label: "😄 Very confident", val: "😄 Very confident" },
                { label: "🙂 Confident", val: "🙂 Confident" },
                { label: "😐 Still learning", val: "😐 Still learning" },
                { label: "😟 Need more practice", val: "😟 Need more practice" }
              ].map(opt => `
                <label class="p-3 sm:p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-400 flex items-center gap-2.5 cursor-pointer transition-colors text-xs sm:text-sm font-medium">
                  <input type="radio" name="student-ref-q4" value="${opt.val}" ${ref.q4_confidence === opt.val ? 'checked' : ''} class="text-emerald-600 focus:ring-emerald-500">
                  <span>${opt.label}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <div class="space-y-2">
            <label class="font-bold text-slate-900 text-sm sm:text-base block">
              5. What will you improve next?
            </label>
            <textarea 
              id="student-ref-q5" 
              rows="3" 
              placeholder="e.g. I will practice more sentences with singular/plural verbs..."
              class="w-full p-3.5 rounded-2xl border border-slate-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 leading-relaxed">${ref.q5_next_improvement || ''}</textarea>
          </div>

          <div class="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              onclick="StudentApp.submitReflection()"
              class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2">
              <span>Submit Reflection</span>
              <span>✓</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  submitReflection(isAuto = false) {
    this.clearTimer();
    const q1 = document.getElementById("student-ref-q1")?.value || (isAuto ? "Completed" : "");
    const q2 = document.getElementById("student-ref-q2")?.value || (isAuto ? "Five Senses" : "");
    const q3 = document.getElementById("student-ref-q3")?.value || (isAuto ? "Simple Present" : "");
    const q4 = document.querySelector('input[name="student-ref-q4"]:checked')?.value || (isAuto ? "🙂 Confident" : "");
    const q5 = document.getElementById("student-ref-q5")?.value || (isAuto ? "Practice more" : "");

    if (!isAuto && (!q1 || !q2 || !q3 || !q4)) {
      alert("Please complete all reflection fields before submitting.");
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

    if (!isAuto) {
      alert("Reflection successfully submitted! Your record has been synchronized with your Teacher.");
    }
    this.activeTab = "result";
    this.render();
  },

  // ==================== FINAL SCORECARD VIEW ====================
  renderResult(container) {
    const ast = this.studentData.assessment || {};
    const ref = this.studentData.reflection || {};

    container.innerHTML = `
      <div class="max-w-2xl mx-auto my-4 sm:my-8 px-2 space-y-6 animate-fadeIn pb-16">
        <div class="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 text-center space-y-6">
          <div class="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-4xl mx-auto shadow-inner">
            🏆
          </div>

          <div class="space-y-1.5">
            <span class="px-3.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
              Lesson Completed
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">CONGRATULATIONS, ${this.studentData.name.toUpperCase()}!</h2>
            <p class="text-xs sm:text-sm text-slate-500">
              Class: <strong>${this.studentData.studentClass}</strong> • Your report has been live-synchronized to the Teacher Dashboard.
            </p>
          </div>

          <!-- Score Metrics Grid (Out of 25) -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span class="text-[11px] text-slate-400 font-bold uppercase block">Reading</span>
              <span class="text-xl sm:text-2xl font-bold text-slate-800">${ast.readingScore}/10</span>
            </div>
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span class="text-[11px] text-slate-400 font-bold uppercase block">Grammar</span>
              <span class="text-xl sm:text-2xl font-bold text-slate-800">${ast.grammarScore}/15</span>
            </div>
            <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <span class="text-[11px] text-emerald-800 font-bold uppercase block">Total Score</span>
              <span class="text-xl sm:text-2xl font-black text-emerald-800">${ast.totalScore}/25</span>
            </div>
            <div class="p-4 bg-teal-50 rounded-2xl border border-teal-100">
              <span class="text-[11px] text-teal-800 font-bold uppercase block">Percentage</span>
              <span class="text-xl sm:text-2xl font-black text-teal-800">${ast.percentage}%</span>
            </div>
          </div>

          <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-sm text-emerald-950 font-medium">
            <strong>Achievement Band:</strong> ${ast.band}
          </div>

          <!-- Question-by-Question Review -->
          <div class="text-left space-y-3 pt-2">
            <h4 class="font-bold text-slate-900 text-sm sm:text-base">Diagnostic Summary (25 Questions):</h4>
            <div class="max-h-60 overflow-y-auto border border-slate-200 rounded-2xl">
              <table class="w-full text-left text-xs sm:text-sm">
                <thead class="sticky top-0 bg-slate-100 text-slate-700 font-semibold">
                  <tr>
                    <th class="py-2.5 px-3">No</th>
                    <th class="py-2.5 px-3">Focus Skill</th>
                    <th class="py-2.5 px-3 text-center">Your Answer</th>
                    <th class="py-2.5 px-3 text-center">Key</th>
                    <th class="py-2.5 px-3 text-center">Result</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 bg-white">
                  ${(ast.questionResults || []).map(r => `
                    <tr>
                      <td class="py-2.5 px-3 font-bold text-slate-800">${r.questionNumber}</td>
                      <td class="py-2.5 px-3 text-slate-600">${r.skill}</td>
                      <td class="py-2.5 px-3 text-center font-bold ${r.isCorrect ? 'text-emerald-700' : 'text-rose-600'}">${r.studentAnswer}</td>
                      <td class="py-2.5 px-3 text-center font-bold text-emerald-800">${r.correctAnswer}</td>
                      <td class="py-2.5 px-3 text-center font-bold ${r.isCorrect ? 'text-emerald-600' : 'text-rose-600'}">
                        ${r.isCorrect ? '✓' : '✗'}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100">
            <button 
              onclick="window.print()"
              class="px-8 py-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-bold transition-colors">
              🖨️ Print / Save Scorecard
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
