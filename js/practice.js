/**
 * PRACTICE ENGINE MODULE
 * Handles Level 1 (Controlled), Level 2 (Guided), and Level 3 (Higher-Order) practice sets.
 */

const PracticeManager = {
  currentLevel: 1,
  currentIndex: 0,
  userSelections: {},
  submittedStates: {},

  init() {
    this.renderPracticeTab();
  },

  selectLevel(lvl) {
    this.currentLevel = lvl;
    this.currentIndex = 0;
    this.renderLevelContent();
  },

  getQuestionsForLevel(lvl) {
    if (lvl === 1) return MPI_DATA.practice.level1;
    if (lvl === 2) return MPI_DATA.practice.level2;
    if (lvl === 3) return MPI_DATA.practice.level3;
    return [];
  },

  renderPracticeTab() {
    const container = document.getElementById("practice-tab-content");
    if (!container) return;

    const student = StorageManager.getCurrentStudent();
    const l1Comp = student.practice?.level1?.completed;
    const l2Comp = student.practice?.level2?.completed;
    const l3Comp = student.practice?.level3?.completed;

    container.innerHTML = `
      <div class="max-w-5xl mx-auto space-y-6 animate-fadeIn">
        <!-- Section Header -->
        <div class="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-700/60 rounded-full text-xs font-semibold tracking-wide uppercase border border-emerald-500/30">
              <span>🎯</span> Interactive Practice Zone
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">Sharpen Your Environmental Description Skills</h2>
            <p class="text-emerald-100/90 text-sm sm:text-base max-w-2xl">
              Progress through three structured levels from controlled recognition to higher-order critical evaluation.
            </p>
          </div>
          <div class="flex items-center gap-2 bg-emerald-950/50 backdrop-blur px-4 py-3 rounded-2xl border border-emerald-600/30 self-stretch md:self-auto justify-between md:justify-start">
            <span class="text-xs text-emerald-300 font-medium">Practice Progress</span>
            <span class="text-base font-bold text-white">${this.calculateOverallPracticeProgress()}%</span>
          </div>
        </div>

        <!-- Level Selector Tabs -->
        <div class="grid grid-cols-3 gap-3 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          <button onclick="PracticeManager.selectLevel(1)" 
            class="flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-semibold text-sm transition-all duration-200 ${this.currentLevel === 1 ? 'bg-white text-emerald-700 shadow-md border border-emerald-100' : 'text-slate-600 hover:text-slate-900'}">
            <span>🌱</span>
            <span class="hidden sm:inline">Level 1:</span> Controlled
            ${l1Comp ? '<span class="text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full font-bold">✓</span>' : ''}
          </button>
          <button onclick="PracticeManager.selectLevel(2)" 
            class="flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-semibold text-sm transition-all duration-200 ${this.currentLevel === 2 ? 'bg-white text-emerald-700 shadow-md border border-emerald-100' : 'text-slate-600 hover:text-slate-900'}">
            <span>🌿</span>
            <span class="hidden sm:inline">Level 2:</span> Guided
            ${l2Comp ? '<span class="text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full font-bold">✓</span>' : ''}
          </button>
          <button onclick="PracticeManager.selectLevel(3)" 
            class="flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-semibold text-sm transition-all duration-200 ${this.currentLevel === 3 ? 'bg-white text-emerald-700 shadow-md border border-emerald-100' : 'text-slate-600 hover:text-slate-900'}">
            <span>🌳</span>
            <span class="hidden sm:inline">Level 3:</span> HOTS
            ${l3Comp ? '<span class="text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full font-bold">✓</span>' : ''}
          </button>
        </div>

        <!-- Active Level Content Card -->
        <div id="practice-card-area" class="min-h-[480px]"></div>
      </div>
    `;

    this.renderLevelContent();
  },

  calculateOverallPracticeProgress() {
    const student = StorageManager.getCurrentStudent();
    let comp = 0;
    if (student.practice?.level1?.completed) comp += 33;
    if (student.practice?.level2?.completed) comp += 33;
    if (student.practice?.level3?.completed) comp += 34;
    return comp;
  },

  renderLevelContent() {
    const cardArea = document.getElementById("practice-card-area");
    if (!cardArea) return;

    const questions = this.getQuestionsForLevel(this.currentLevel);
    const total = questions.length;
    const currentQ = questions[this.currentIndex];
    const qKey = `lvl${this.currentLevel}_q${currentQ.id}`;
    const selectedOption = this.userSelections[qKey];
    const isSubmitted = this.submittedStates[qKey];

    // Check if level is completed and student wants to view summary
    const student = StorageManager.getCurrentStudent();
    const lvlKey = `level${this.currentLevel}`;
    const isLvlDone = student.practice?.[lvlKey]?.completed;

    if (this.currentIndex >= total) {
      this.renderLevelSummary(cardArea);
      return;
    }

    cardArea.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <!-- Question Meta & Stepper -->
        <div class="flex items-center justify-between border-b border-slate-100 pb-4">
          <div class="flex items-center gap-3">
            <span class="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg uppercase tracking-wider">
              Level ${this.currentLevel} • Question ${this.currentIndex + 1} of ${total}
            </span>
            <span class="text-xs text-slate-500 font-medium hidden sm:inline-block">
              Topic: <strong class="text-slate-700">${currentQ.topic || 'Grammar in Context'}</strong>
            </span>
          </div>
          
          <div class="flex items-center gap-1">
            ${questions.map((_, i) => {
              const itemKey = `lvl${this.currentLevel}_q${questions[i].id}`;
              const answered = this.submittedStates[itemKey];
              let statusClass = "bg-slate-200 text-slate-500";
              if (answered) {
                const correct = this.userSelections[itemKey] === questions[i].answer;
                statusClass = correct ? "bg-emerald-600 text-white" : "bg-rose-500 text-white";
              } else if (i === this.currentIndex) {
                statusClass = "ring-2 ring-emerald-600 bg-emerald-50 text-emerald-700 font-bold";
              }
              return `
                <button onclick="PracticeManager.jumpToQuestion(${i})" class="w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${statusClass}">
                  ${i + 1}
                </button>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Question Prompt -->
        <div class="space-y-3">
          <h3 class="text-base sm:text-lg font-medium text-slate-800 leading-relaxed whitespace-pre-line">
            ${currentQ.question}
          </h3>
        </div>

        <!-- Multiple Choice Options -->
        <div class="space-y-2.5">
          ${currentQ.options.map((opt, optIndex) => {
            const isSelected = selectedOption === optIndex;
            let optionStyles = "border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-slate-700";
            let indicator = `<div class="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-xs text-slate-400 font-semibold">${String.fromCharCode(65 + optIndex)}</div>`;

            if (isSubmitted) {
              if (optIndex === currentQ.answer) {
                optionStyles = "border-emerald-500 bg-emerald-50 text-emerald-950 font-medium ring-1 ring-emerald-500";
                indicator = `<div class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</div>`;
              } else if (isSelected && optIndex !== currentQ.answer) {
                optionStyles = "border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400";
                indicator = `<div class="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">✗</div>`;
              } else {
                optionStyles = "border-slate-200 opacity-60 text-slate-500";
              }
            } else if (isSelected) {
              optionStyles = "border-emerald-600 bg-emerald-50/70 text-emerald-950 font-medium ring-2 ring-emerald-600/30";
              indicator = `<div class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">${String.fromCharCode(65 + optIndex)}</div>`;
            }

            return `
              <button 
                onclick="PracticeManager.selectOption(${optIndex})" 
                ${isSubmitted ? 'disabled' : ''}
                class="w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${optionStyles}">
                ${indicator}
                <span class="text-sm sm:text-base flex-1 pt-0.5">${opt}</span>
              </button>
            `;
          }).join("")}
        </div>

        <!-- Immediate Feedback Card -->
        ${isSubmitted ? `
          <div class="p-4 sm:p-5 rounded-2xl border animate-slideUp ${selectedOption === currentQ.answer ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950' : 'bg-amber-50/90 border-amber-300 text-amber-950'}">
            <div class="flex items-start gap-3">
              <span class="text-xl">${selectedOption === currentQ.answer ? '🎉' : '💡'}</span>
              <div class="space-y-1">
                <p class="font-bold text-sm sm:text-base">
                  ${selectedOption === currentQ.answer ? 'Excellent! Your answer is correct.' : 'Not quite. Look at the sentence structure carefully.'}
                </p>
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  ${currentQ.explanation}
                </p>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Bottom Action Bar -->
        <div class="flex items-center justify-between pt-4 border-t border-slate-100">
          <button 
            onclick="PracticeManager.prevQuestion()" 
            ${this.currentIndex === 0 ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="hover:bg-slate-100 text-slate-700"'}
            class="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold flex items-center gap-1.5 transition-colors">
            <span>←</span> Previous
          </button>

          <div class="flex items-center gap-2">
            ${!isSubmitted ? `
              <button 
                onclick="PracticeManager.submitCurrentAnswer()"
                ${selectedOption === undefined ? 'disabled class="opacity-50 cursor-not-allowed bg-emerald-600/60 text-white"' : 'class="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"'}
                class="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2">
                <span>Check Answer</span>
              </button>
            ` : `
              <button 
                onclick="PracticeManager.nextQuestion()" 
                class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2">
                <span>${this.currentIndex === total - 1 ? 'View Level Summary' : 'Next Question'}</span>
                <span>→</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  },

  selectOption(optIdx) {
    const questions = this.getQuestionsForLevel(this.currentLevel);
    const currentQ = questions[this.currentIndex];
    const qKey = `lvl${this.currentLevel}_q${currentQ.id}`;
    
    if (this.submittedStates[qKey]) return;
    this.userSelections[qKey] = optIdx;
    SoundManager.playClick();
    this.renderLevelContent();
  },

  submitCurrentAnswer() {
    const questions = this.getQuestionsForLevel(this.currentLevel);
    const currentQ = questions[this.currentIndex];
    const qKey = `lvl${this.currentLevel}_q${currentQ.id}`;
    const selected = this.userSelections[qKey];

    if (selected === undefined) return;

    this.submittedStates[qKey] = true;

    if (selected === currentQ.answer) {
      SoundManager.playCorrect();
    } else {
      SoundManager.playIncorrect();
    }

    // Check if level has finished all questions
    this.checkAndSaveLevelProgress();
    this.renderLevelContent();
  },

  nextQuestion() {
    const questions = this.getQuestionsForLevel(this.currentLevel);
    if (this.currentIndex < questions.length - 1) {
      this.currentIndex++;
      SoundManager.playClick();
      this.renderLevelContent();
    } else {
      this.currentIndex = questions.length; // triggers summary
      SoundManager.playCelebration();
      this.renderLevelContent();
    }
  },

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      SoundManager.playClick();
      this.renderLevelContent();
    }
  },

  jumpToQuestion(idx) {
    this.currentIndex = idx;
    SoundManager.playClick();
    this.renderLevelContent();
  },

  checkAndSaveLevelProgress() {
    const questions = this.getQuestionsForLevel(this.currentLevel);
    let correctCount = 0;
    let answeredCount = 0;

    questions.forEach(q => {
      const qKey = `lvl${this.currentLevel}_q${q.id}`;
      if (this.submittedStates[qKey]) {
        answeredCount++;
        if (this.userSelections[qKey] === q.answer) {
          correctCount++;
        }
      }
    });

    const isLevelFinished = answeredCount === questions.length;
    const student = StorageManager.getCurrentStudent();
    const lvlKey = `level${this.currentLevel}`;
    const compSectionKey = `practiceL${this.currentLevel}`;

    student.practice[lvlKey] = {
      score: correctCount,
      total: questions.length,
      completed: isLevelFinished,
      answers: { ...this.userSelections }
    };
    student.completedSections[compSectionKey] = isLevelFinished;

    // Check if all 3 practice levels completed to grant badge
    if (
      student.practice.level1.completed &&
      student.practice.level2.completed &&
      student.practice.level3.completed
    ) {
      if (!student.badges.includes("eco_explorer")) {
        student.badges.push("eco_explorer");
        App.showBadgeNotification("🌿 Eco Explorer", "Unlocked for completing all 3 Practice levels!");
      }
    }

    StorageManager.saveCurrentStudent(student);
    App.updateProgressHeader();
  },

  renderLevelSummary(cardArea) {
    const questions = this.getQuestionsForLevel(this.currentLevel);
    let correctCount = 0;

    questions.forEach(q => {
      const qKey = `lvl${this.currentLevel}_q${q.id}`;
      if (this.userSelections[qKey] === q.answer) {
        correctCount++;
      }
    });

    const total = questions.length;
    const incorrectCount = total - correctCount;
    const pct = Math.round((correctCount / total) * 100);

    let advice = "";
    if (pct >= 80) {
      advice = "Outstanding performance! You have demonstrated strong mastery of environmental descriptive structures.";
    } else if (pct >= 60) {
      advice = "Good effort! Review the explanations above to strengthen your subject-verb agreement and adjective phrases.";
    } else {
      advice = "Keep practicing! Revisit the LEARN section to review pattern structures before moving forward.";
    }

    cardArea.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 text-center space-y-6 animate-scaleUp">
        <div class="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto shadow-inner">
          ${pct >= 70 ? '🎉' : '🌱'}
        </div>

        <div class="space-y-2">
          <span class="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
            Level ${this.currentLevel} Completed
          </span>
          <h3 class="text-2xl font-bold text-slate-800">Practice Level ${this.currentLevel} Result</h3>
          <p class="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">${advice}</p>
        </div>

        <div class="grid grid-cols-3 gap-3 max-w-md mx-auto">
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span class="text-xs text-slate-500 font-medium block">Score</span>
            <span class="text-2xl font-black text-slate-800">${correctCount}/${total}</span>
          </div>
          <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
            <span class="text-xs text-emerald-700 font-medium block">Correct</span>
            <span class="text-2xl font-black text-emerald-700">✓ ${correctCount}</span>
          </div>
          <div class="p-4 bg-rose-50 rounded-2xl border border-rose-100">
            <span class="text-xs text-rose-700 font-medium block">Incorrect</span>
            <span class="text-2xl font-black text-rose-700">✗ ${incorrectCount}</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
          <button 
            onclick="PracticeManager.retryLevel(${this.currentLevel})"
            class="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <span>🔄</span> Retry Level ${this.currentLevel}
          </button>
          
          ${this.currentLevel < 3 ? `
            <button 
              onclick="PracticeManager.selectLevel(${this.currentLevel + 1})"
              class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2">
              <span>Next Level (${this.currentLevel + 1})</span>
              <span>→</span>
            </button>
          ` : `
            <button 
              onclick="App.navigateToTab('assessment')"
              class="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-lg shadow-emerald-700/25 transition-all flex items-center gap-2">
              <span>Proceed to Assessment (35 Questions)</span>
              <span>🚀</span>
            </button>
          `}
        </div>
      </div>
    `;
  },

  retryLevel(lvl) {
    const questions = this.getQuestionsForLevel(lvl);
    questions.forEach(q => {
      const qKey = `lvl${lvl}_q${q.id}`;
      delete this.userSelections[qKey];
      delete this.submittedStates[qKey];
    });
    this.selectLevel(lvl);
  }
};
