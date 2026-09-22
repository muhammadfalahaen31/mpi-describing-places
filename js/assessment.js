/**
 * FORMAL ASSESSMENT ENGINE MODULE (25 QUESTIONS)
 * Manages 25 Multiple Choice (A-E) questions:
 * - Part A: Reading Comprehension (10 Questions: 2 Passages x 5 Qs)
 * - Part B: Grammar in Context (15 Questions)
 * Level Distribution: LOTS (40% = 10 Qs), MOTS (40% = 10 Qs), HOTS (20% = 5 Qs)
 */

const AssessmentManager = {
  currentQuestionIndex: 0,
  answers: {}, // questionId -> optionIndex
  flaggedQuestions: new Set(),

  init() {
    this.loadSavedAnswers();
    this.renderAssessmentTab();
  },

  loadSavedAnswers() {
    const student = StorageManager.getCurrentStudent();
    if (student && student.assessment?.answers) {
      this.answers = { ...student.assessment.answers };
    }
  },

  renderAssessmentTab() {
    const container = document.getElementById("assessment-tab-content");
    if (!container) return;

    const student = StorageManager.getCurrentStudent();
    if (student.assessment?.completed) {
      this.renderAlreadySubmitted(container, student);
      return;
    }

    const questions = MPI_DATA.assessment.questions;
    const currentQ = questions[this.currentQuestionIndex];
    const total = questions.length;
    const answeredCount = Object.keys(this.answers).length;
    const isFlagged = this.flaggedQuestions.has(currentQ.id);
    const selectedOpt = this.answers[currentQ.id];

    // Determine if this is a reading question
    const isReading = currentQ.part === "A";
    const readingPassage = isReading ? (currentQ.textId === "text-1" ? MPI_DATA.assessment.text1 : MPI_DATA.assessment.text2) : null;

    container.innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6 animate-fadeIn">
        <!-- Assessment Top Header -->
        <div class="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-700/60 rounded-full text-xs font-semibold tracking-wide uppercase border border-emerald-500/30">
              <span>📋</span> Formal Competency Assessment
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">Descriptive Text & Grammar Assessment</h2>
            <p class="text-emerald-100/90 text-sm max-w-xl">
              25 Questions total (Part A: 10 Reading Comprehension • Part B: 15 Grammar in Context).
            </p>
          </div>

          <!-- Quick Stats & Submit Button -->
          <div class="flex items-center gap-3 self-stretch md:self-auto justify-between md:justify-end">
            <div class="bg-black/30 backdrop-blur px-4 py-2.5 rounded-2xl border border-white/10 text-right">
              <span class="text-xs text-emerald-300 block font-medium">Answered</span>
              <span class="text-base font-bold text-white">${answeredCount} / ${total}</span>
            </div>
            <button 
              onclick="AssessmentManager.confirmSubmit()"
              class="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2">
              <span>Submit Assessment</span>
              <span>📤</span>
            </button>
          </div>
        </div>

        <!-- Main 2-Column Workspace -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <!-- Left Column: Reading Passage (if Part A) or Question Prompt -->
          <div class="lg:col-span-7 space-y-6">
            ${isReading && readingPassage ? `
              <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg uppercase">
                      Passage ${readingPassage.id === 'text-1' ? '1: School Environment' : '2: Home Environment'}
                    </span>
                    <span class="text-xs text-slate-500 font-medium">(${readingPassage.wordCount} words)</span>
                  </div>
                  <span class="text-xs text-slate-400 font-medium">${readingPassage.topic}</span>
                </div>
                
                <h3 class="text-xl font-bold text-slate-800">${readingPassage.title}</h3>
                
                <div class="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-serif bg-slate-50/70 p-5 rounded-2xl border border-slate-100 max-h-[360px] overflow-y-auto custom-scrollbar">
                  ${readingPassage.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                </div>
              </div>
            ` : `
              <div class="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-3xl p-6 sm:p-8 border border-emerald-100 space-y-3">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-200/60 text-emerald-900 text-xs font-bold rounded-lg uppercase">
                  Part B: Grammar in Everyday Environment
                </div>
                <h3 class="text-xl font-bold text-slate-800">Adjective Phrases & Simple Present Tense</h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Questions in Part B test how well you can identify and use Adjective Phrases, correct verb agreements (-s/-es), negative sentences, and clear descriptive writing.
                </p>
              </div>
            `}

            <!-- Question Card -->
            <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
              <!-- Question Header Meta -->
              <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                <div class="flex items-center gap-3">
                  <span class="w-8 h-8 rounded-xl bg-slate-900 text-white text-sm font-bold flex items-center justify-center">
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
                  onclick="AssessmentManager.toggleFlag(${currentQ.id})" 
                  class="px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${isFlagged ? 'bg-amber-100 border-amber-300 text-amber-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}">
                  <span>${isFlagged ? '🚩' : '🏳️'}</span>
                  <span>${isFlagged ? 'Flagged' : 'Flag Question'}</span>
                </button>
              </div>

              <!-- Question Text -->
              <div class="text-base sm:text-lg font-medium text-slate-800 leading-relaxed whitespace-pre-line">
                ${currentQ.question}
              </div>

              <!-- Options (A - E) -->
              <div class="space-y-2.5">
                ${currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedOpt === optIdx;
                  return `
                    <button 
                      onclick="AssessmentManager.selectAnswer(${currentQ.id}, ${optIdx})"
                      class="w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${isSelected ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-medium ring-2 ring-emerald-600/30' : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-slate-700'}">
                      <div class="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${isSelected ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-300 text-slate-500'}">
                        ${String.fromCharCode(65 + optIdx)}
                      </div>
                      <span class="text-sm sm:text-base flex-1">${opt}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- Stepper Controls -->
              <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                <button 
                  onclick="AssessmentManager.prevQuestion()" 
                  ${this.currentQuestionIndex === 0 ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="hover:bg-slate-100 text-slate-700"'}
                  class="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold flex items-center gap-1.5 transition-colors">
                  <span>←</span> Previous
                </button>

                <button 
                  onclick="AssessmentManager.nextQuestion()" 
                  ${this.currentQuestionIndex === total - 1 ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="bg-emerald-600 hover:bg-emerald-700 text-white"'}
                  class="px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2">
                  <span>Next</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Column: Question Navigator Grid (25 Items) -->
          <div class="lg:col-span-5 space-y-6">
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-5 sticky top-24">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 class="font-bold text-slate-800 text-base">Question Navigator (25 Qs)</h4>
                <span class="text-xs text-slate-500 font-medium">${answeredCount} of 25 answered</span>
              </div>

              <!-- Navigator Legend -->
              <div class="flex flex-wrap items-center gap-3 text-xs text-slate-600 pb-1">
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-emerald-600"></span> Answered</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-slate-200"></span> Unanswered</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-400"></span> Flagged</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded ring-2 ring-emerald-600 bg-white"></span> Current</span>
              </div>

              <!-- Part A Grid: Reading Comprehension (1-10) -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Part A: Reading (1 - 10)</span>
                  <span class="text-slate-400 font-normal">Text 1 (1-5) • Text 2 (6-10)</span>
                </div>
                <div class="grid grid-cols-5 gap-1.5">
                  ${questions.slice(0, 10).map((q, idx) => this.renderNavButton(q, idx)).join('')}
                </div>
              </div>

              <!-- Part B Grid: Grammar in Context (11-25) -->
              <div class="space-y-2 pt-2 border-t border-slate-100">
                <div class="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Part B: Grammar (11 - 25)</span>
                  <span class="text-slate-400 font-normal">15 Items</span>
                </div>
                <div class="grid grid-cols-5 gap-1.5">
                  ${questions.slice(10, 25).map((q, idx) => this.renderNavButton(q, idx + 10)).join('')}
                </div>
              </div>

              <!-- Level Summary Info Badge -->
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div class="font-bold text-slate-700">Difficulty Distribution:</div>
                <div class="flex justify-between">
                  <span>• LOTS (Easy): 40% (10 Qs)</span>
                  <span>• MOTS (Medium): 40% (10 Qs)</span>
                </div>
                <div>• HOTS (Higher Order): 20% (5 Qs)</div>
              </div>

              <!-- Submit Trigger Box -->
              <div class="pt-3 border-t border-slate-100">
                <button 
                  onclick="AssessmentManager.confirmSubmit()"
                  class="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2">
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

    let styleClass = "bg-slate-100 text-slate-600 hover:bg-slate-200";
    if (isFlagged) {
      styleClass = "bg-amber-400 text-amber-950 font-bold";
    } else if (isAnswered) {
      styleClass = "bg-emerald-600 text-white font-semibold";
    }

    if (isCurrent) {
      styleClass += " ring-2 ring-slate-900 ring-offset-2";
    }

    return `
      <button 
        onclick="AssessmentManager.jumpToQuestion(${globalIndex})"
        class="h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${styleClass}">
        ${q.questionNumber}
      </button>
    `;
  },

  selectAnswer(questionId, optionIndex) {
    this.answers[questionId] = optionIndex;
    SoundManager.playClick();
    
    const student = StorageManager.getCurrentStudent();
    if (!student.assessment) student.assessment = {};
    student.assessment.answers = { ...this.answers };
    StorageManager.saveCurrentStudent(student);

    this.renderAssessmentTab();
  },

  toggleFlag(questionId) {
    if (this.flaggedQuestions.has(questionId)) {
      this.flaggedQuestions.delete(questionId);
    } else {
      this.flaggedQuestions.add(questionId);
    }
    SoundManager.playClick();
    this.renderAssessmentTab();
  },

  nextQuestion() {
    if (this.currentQuestionIndex < MPI_DATA.assessment.questions.length - 1) {
      this.currentQuestionIndex++;
      SoundManager.playClick();
      this.renderAssessmentTab();
    }
  },

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      SoundManager.playClick();
      this.renderAssessmentTab();
    }
  },

  jumpToQuestion(idx) {
    this.currentQuestionIndex = idx;
    SoundManager.playClick();
    this.renderAssessmentTab();
  },

  confirmSubmit() {
    const total = MPI_DATA.assessment.questions.length;
    const answered = Object.keys(this.answers).length;
    const unanswered = total - answered;

    let message = `You have answered ${answered} of ${total} questions.`;
    if (unanswered > 0) {
      message += `\n\n⚠️ Warning: You still have ${unanswered} unanswered question(s). Unanswered questions will receive 0 points.`;
    }
    message += "\n\nAre you sure you want to submit your assessment now?";

    if (confirm(message)) {
      this.gradeAndFinalizeAssessment();
    }
  },

  gradeAndFinalizeAssessment() {
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

    const student = StorageManager.getCurrentStudent();
    student.assessment = {
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

    student.completedSections.assessment = true;

    if (!student.badges.includes("env_describer")) {
      student.badges.push("env_describer");
      App.showBadgeNotification("🌳 Environmental Describer", "Unlocked for completing the 25-Question Assessment!");
    }

    StorageManager.saveCurrentStudent(student);
    SoundManager.playCelebration();
    App.updateProgressHeader();

    alert(`Assessment successfully submitted!\nYour Score: ${totalScore}/25 (${percentage}%)\nBand: ${band}\n\nProceeding to the Reflection section.`);
    App.navigateToTab("reflection");
  },

  renderAlreadySubmitted(container, student) {
    const ast = student.assessment;
    container.innerHTML = `
      <div class="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center space-y-6 animate-scaleUp">
        <div class="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto">
          ✅
        </div>
        <div class="space-y-2">
          <span class="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">
            Assessment Completed
          </span>
          <h2 class="text-2xl font-bold text-slate-800">Formal Assessment Submitted</h2>
          <p class="text-slate-600 text-sm">
            You completed this assessment on <strong>${new Date(ast.submittedAt).toLocaleString()}</strong>.
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span class="text-xs text-slate-500 font-medium block">Reading</span>
            <span class="text-xl font-bold text-slate-800">${ast.readingScore}/10</span>
          </div>
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span class="text-xs text-slate-500 font-medium block">Grammar</span>
            <span class="text-xl font-bold text-slate-800">${ast.grammarScore}/15</span>
          </div>
          <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
            <span class="text-xs text-emerald-700 font-medium block">Total</span>
            <span class="text-xl font-bold text-emerald-800">${ast.totalScore}/25</span>
          </div>
          <div class="p-4 bg-teal-50 rounded-2xl border border-teal-100">
            <span class="text-xs text-teal-700 font-medium block">Percentage</span>
            <span class="text-xl font-bold text-teal-800">${ast.percentage}%</span>
          </div>
        </div>

        <div class="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-emerald-950 text-sm">
          <strong>Achievement Band:</strong> ${ast.band}
        </div>

        <div class="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
          <button 
            onclick="App.navigateToTab('reflection')" 
            class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all flex items-center gap-2">
            <span>Go to Reflection</span>
            <span>→</span>
          </button>
          <button 
            onclick="App.navigateToTab('results')" 
            class="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <span>View Full Scorecard & Analysis</span>
            <span>📊</span>
          </button>
        </div>
      </div>
    `;
  }
};
