/**
 * MASTER APPLICATION CONTROLLER (APP.JS - REVISED FOR 25-QUESTION MPI)
 * Developer: Muhammad Falahaen Jiddan, M.Pd.,Gr.
 * Manages App State, Routing, Tab Navigation, Home, Explore, Learn, Reflection, and Gamification.
 */

const App = {
  activeTab: "home",
  activeLearnSubTab: "senses",
  activeExploreSense: "see",
  
  init() {
    this.bindHeaderEvents();
    this.loadInitialStudent();
    this.renderCurrentTab();
  },

  loadInitialStudent() {
    const student = StorageManager.getCurrentStudent();
    if (student.name && student.name.trim() !== "") {
      this.updateStudentNameDisplay(student.name);
    }
    this.updateProgressHeader();
  },

  bindHeaderEvents() {
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const targetTab = e.currentTarget.dataset.tab;
        if (targetTab) {
          this.navigateToTab(targetTab);
        }
      });
    });
  },

  navigateToTab(tabName) {
    this.activeTab = tabName;
    SoundManager.playClick();

    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      const isTarget = btn.dataset.tab === tabName;
      btn.classList.toggle("active-tab", isTarget);
      if (isTarget) {
        btn.classList.add("bg-emerald-600", "text-white", "shadow-sm");
        btn.classList.remove("text-slate-600", "hover:bg-slate-100");
      } else {
        btn.classList.remove("bg-emerald-600", "text-white", "shadow-sm");
        btn.classList.add("text-slate-600", "hover:bg-slate-100");
      }
    });

    const student = StorageManager.getCurrentStudent();
    student.activeTab = tabName;
    StorageManager.saveCurrentStudent(student);

    this.renderCurrentTab();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderCurrentTab() {
    const tabContainers = document.querySelectorAll(".tab-page-view");
    tabContainers.forEach(c => c.classList.add("hidden"));

    const activeContainer = document.getElementById(`tab-view-${this.activeTab}`);
    if (activeContainer) {
      activeContainer.classList.remove("hidden");
    }

    switch (this.activeTab) {
      case "home":
        this.renderHomeTab();
        break;
      case "explore":
        this.renderExploreTab();
        break;
      case "learn":
        this.renderLearnTab();
        break;
      case "practice":
        PracticeManager.init();
        break;
      case "assessment":
        AssessmentManager.init();
        break;
      case "reflection":
        this.renderReflectionTab();
        break;
      case "results":
        ResultsManager.init();
        break;
    }

    this.updateProgressHeader();
  },

  updateStudentNameDisplay(name) {
    const greetingEl = document.getElementById("header-student-name");
    if (greetingEl) {
      greetingEl.textContent = name || "Learner";
    }
  },

  updateProgressHeader() {
    const student = StorageManager.getCurrentStudent();
    let comp = 0;

    if (student.name && student.name.trim() !== "") comp += 10;
    if (student.completedSections?.explore) comp += 15;
    if (student.completedSections?.learn) comp += 20;
    if (student.completedSections?.practiceL1) comp += 10;
    if (student.completedSections?.practiceL2) comp += 10;
    if (student.completedSections?.practiceL3) comp += 10;
    if (student.completedSections?.assessment) comp += 15;
    if (student.completedSections?.reflection) comp += 10;

    if (comp > 100) comp = 100;

    student.progress = comp;
    StorageManager.saveCurrentStudent(student);

    const progressBar = document.getElementById("header-progress-bar");
    const progressText = document.getElementById("header-progress-text");

    if (progressBar) progressBar.style.width = `${comp}%`;
    if (progressText) progressText.textContent = `${comp}%`;
  },

  // ==================== HOME TAB ====================
  renderHomeTab() {
    const container = document.getElementById("home-tab-content");
    if (!container) return;

    const student = StorageManager.getCurrentStudent();

    container.innerHTML = `
      <div class="max-w-5xl mx-auto space-y-8 animate-fadeIn">
        <!-- Hero Banner -->
        <div class="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-emerald-700/30">
          <div class="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -left-12 -bottom-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 space-y-6 max-w-3xl">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold tracking-wider uppercase border border-emerald-400/30">
              <span>🌿</span> Interactive Learning Media (MPI) • XI Grade English
            </div>

            <div class="space-y-2">
              <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                DESCRIBING PLACES
              </h1>
              <p class="text-xl sm:text-2xl font-medium text-emerald-300">
                Environmental Awareness in Our Daily Lives
              </p>
            </div>

            <p class="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Learn how to describe school and home surroundings with simple, natural English using your 
              <strong>Five Senses</strong>, <strong>Adjective Phrases</strong>, and the <strong>Simple Present Tense</strong>.
            </p>

            <!-- Developer Credit Badge -->
            <div class="pt-2 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-600/40 flex items-center justify-center text-lg">
                👨‍🏫
              </div>
              <div class="text-xs">
                <span class="text-emerald-400 font-semibold block">Developed by:</span>
                <span class="text-white font-bold">${MPI_DATA.metadata.developer}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Student Registration & CTA Box -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div class="max-w-xl space-y-4">
            <div class="space-y-1">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Student Candidate Profile</label>
              <h3 class="text-xl font-bold text-slate-900">Enter Your Name to Start Learning</h3>
              <p class="text-xs text-slate-500">Your name will appear on your scorecard, badges, and diagnostic report.</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <input 
                id="home-student-name-input" 
                type="text" 
                placeholder="e.g. Alya Zahra Kirana"
                value="${student.name || ''}"
                class="flex-1 px-4 py-3.5 rounded-2xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600">
              
              <button 
                onclick="App.handleStartLearning()"
                class="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 shrink-0">
                <span>START LEARNING</span>
                <span>🚀</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 3 Core Learning Pillars -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Pillar 1: Observe -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4 hover:border-emerald-300 transition-all">
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl">
              👀
            </div>
            <div class="space-y-1.5">
              <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Step 1: Notice</span>
              <h4 class="text-lg font-bold text-slate-900">OBSERVE</h4>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Use your <strong>Five Senses</strong> (sight, sound, smell, touch, taste) to discover details about gardens, yards, and parks.
              </p>
            </div>
          </div>

          <!-- Pillar 2: Describe -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4 hover:border-teal-300 transition-all">
            <div class="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-2xl">
              ✍️
            </div>
            <div class="space-y-1.5">
              <span class="text-xs font-bold text-teal-700 uppercase tracking-wider block">Step 2: Enrich</span>
              <h4 class="text-lg font-bold text-slate-900">DESCRIBE</h4>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Use <strong>Adjective Phrases</strong> (<em>very clean, full of green trees, pleasant to visit</em>) to make descriptions clear and vivid.
              </p>
            </div>
          </div>

          <!-- Pillar 3: Build -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4 hover:border-sky-300 transition-all">
            <div class="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center text-2xl">
              🧩
            </div>
            <div class="space-y-1.5">
              <span class="text-xs font-bold text-sky-700 uppercase tracking-wider block">Step 3: Construct</span>
              <h4 class="text-lg font-bold text-slate-900">BUILD</h4>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Master <strong>Simple Present Tense</strong> sentences to describe daily conditions, facts, and eco-friendly habits.
              </p>
            </div>
          </div>
        </div>

        <!-- Pedagogical Flow Roadmap -->
        <div class="bg-gradient-to-r from-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white space-y-4">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 class="text-sm font-bold uppercase tracking-wider text-emerald-400">Learning Framework</h4>
            <span class="text-xs text-slate-400 font-medium">Senior High School Grade XI</span>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-2 text-xs font-bold pt-2">
            <span class="px-2.5 py-1 bg-emerald-800/80 rounded-lg">SEE</span> →
            <span class="px-2.5 py-1 bg-emerald-800/80 rounded-lg">THINK</span> →
            <span class="px-2.5 py-1 bg-emerald-800/80 rounded-lg">DESCRIBE</span> →
            <span class="px-2.5 py-1 bg-emerald-800/80 rounded-lg">BUILD</span> →
            <span class="px-2.5 py-1 bg-emerald-800/80 rounded-lg">COMBINE</span> →
            <span class="px-2.5 py-1 bg-emerald-800/80 rounded-lg">CREATE</span> →
            <span class="px-2.5 py-1 bg-teal-800/80 rounded-lg">ASSESS (25Q)</span> →
            <span class="px-2.5 py-1 bg-teal-800/80 rounded-lg">REFLECT</span> →
            <span class="px-2.5 py-1 bg-sky-800/80 rounded-lg">ANALYZE</span>
          </div>
        </div>
      </div>
    `;
  },

  handleStartLearning() {
    const input = document.getElementById("home-student-name-input");
    const name = input ? input.value.trim() : "";

    if (!name) {
      alert("Please enter your name to personalize your learning experience.");
      if (input) input.focus();
      return;
    }

    const student = StorageManager.getCurrentStudent();
    student.name = name;
    student.completedSections.home = true;
    StorageManager.saveCurrentStudent(student);

    this.updateStudentNameDisplay(name);
    this.updateProgressHeader();
    SoundManager.playCelebration();
    this.navigateToTab("explore");
  },

  // ==================== EXPLORE TAB ====================
  renderExploreTab() {
    const container = document.getElementById("explore-tab-content");
    if (!container) return;

    const expData = MPI_DATA.explore;
    const currentSenseData = expData.senses[this.activeExploreSense];

    container.innerHTML = `
      <div class="max-w-5xl mx-auto space-y-6 animate-fadeIn">
        <!-- Section Header -->
        <div class="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-700/60 rounded-full text-xs font-semibold tracking-wide uppercase border border-emerald-500/30">
            <span>🔍</span> Step 1: Background Activation (SEE & THINK)
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">${expData.title}</h2>
          <p class="text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            ${expData.subtitle}
          </p>
        </div>

        <!-- Interactive Hotspot Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div class="relative rounded-2xl overflow-hidden bg-slate-900 min-h-[200px] sm:min-h-[240px] p-6 sm:p-8 flex flex-col justify-end text-white border border-slate-800">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
            <div class="absolute inset-0 opacity-40 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div class="relative z-20 space-y-2">
              <span class="px-2.5 py-1 bg-emerald-500/80 text-white text-xs font-bold rounded-lg uppercase tracking-wider">
                Virtual Exploration
              </span>
              <h3 class="text-xl sm:text-2xl font-bold">School Green Sanctuary</h3>
              <p class="text-xs sm:text-sm text-emerald-200/90 max-w-xl">
                ${expData.imageDescription}
              </p>
            </div>
          </div>

          <!-- Sensory Category Selector Buttons -->
          <div class="space-y-3">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Click a sense to explore observations:
            </span>

            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              ${Object.keys(expData.senses).map(key => {
                const s = expData.senses[key];
                const isActive = this.activeExploreSense === key;
                return `
                  <button 
                    onclick="App.selectExploreSense('${key}')"
                    class="p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${isActive ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 ring-2 ring-emerald-600/30' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'}">
                    <span class="text-2xl">${s.icon}</span>
                    <span class="text-xs font-bold uppercase tracking-wider">${s.name.split(' ')[0]}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Active Sensory Details Showcase -->
          <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4 animate-fadeIn">
            <div class="flex items-center justify-between border-b border-slate-200 pb-3">
              <div class="flex items-center gap-2">
                <span class="text-2xl">${currentSenseData.icon}</span>
                <h4 class="font-bold text-slate-800 text-base sm:text-lg">${currentSenseData.name}</h4>
              </div>
              <span class="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
                ${currentSenseData.badge}
              </span>
            </div>

            <p class="text-xs sm:text-sm text-slate-600 italic">
              "${currentSenseData.description}"
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              ${currentSenseData.items.map(item => `
                <div class="p-3.5 bg-white rounded-xl border border-slate-200/80 flex items-start gap-3 shadow-xs">
                  <span class="text-emerald-600 font-bold mt-0.5">✦</span>
                  <div class="space-y-0.5">
                    <p class="text-xs sm:text-sm font-medium text-slate-800">${item.text}</p>
                    <span class="text-[10px] text-slate-400 font-semibold uppercase">${item.tag}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Quick Check Prompt -->
          <div class="p-6 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-4">
            <div class="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <span>💡</span> Quick Understanding Check
            </div>
            <p class="text-sm font-medium text-slate-800">${expData.quickCheckPrompt.question}</p>
            
            <div class="space-y-2" id="explore-prompt-options">
              ${expData.quickCheckPrompt.options.map((opt, i) => `
                <button 
                  onclick="App.checkExplorePrompt(${i})"
                  class="w-full text-left p-3 rounded-xl border border-emerald-200 bg-white hover:bg-emerald-100/50 text-slate-700 text-xs sm:text-sm transition-all">
                  ${opt}
                </button>
              `).join('')}
            </div>
            <div id="explore-prompt-feedback" class="hidden text-xs font-medium p-3 rounded-xl"></div>
          </div>

          <!-- Bottom Navigation -->
          <div class="flex justify-end pt-4 border-t border-slate-100">
            <button 
              onclick="App.finishExploreAndGoLearn()"
              class="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2">
              <span>Proceed to LEARN Section</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  selectExploreSense(senseKey) {
    this.activeExploreSense = senseKey;
    SoundManager.playClick();
    this.renderExploreTab();
  },

  checkExplorePrompt(idx) {
    const prompt = MPI_DATA.explore.quickCheckPrompt;
    const fb = document.getElementById("explore-prompt-feedback");
    if (!fb) return;

    fb.classList.remove("hidden", "bg-emerald-100", "text-emerald-900", "bg-rose-100", "text-rose-900");
    if (idx === prompt.correct) {
      fb.classList.add("bg-emerald-100", "text-emerald-900");
      fb.innerHTML = `<strong>✓ Correct!</strong> ${prompt.explanation}`;
      SoundManager.playCorrect();
    } else {
      fb.classList.add("bg-rose-100", "text-rose-900");
      fb.innerHTML = `<strong>✗ Not quite.</strong> Choose the option with positive, natural sensory details.`;
      SoundManager.playIncorrect();
    }
  },

  finishExploreAndGoLearn() {
    const student = StorageManager.getCurrentStudent();
    student.completedSections.explore = true;
    StorageManager.saveCurrentStudent(student);
    this.updateProgressHeader();
    this.navigateToTab("learn");
  },

  // ==================== LEARN TAB ====================
  renderLearnTab() {
    const container = document.getElementById("learn-tab-content");
    if (!container) return;

    container.innerHTML = `
      <div class="max-w-5xl mx-auto space-y-6 animate-fadeIn">
        <!-- Section Header -->
        <div class="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-700/60 rounded-full text-xs font-semibold tracking-wide uppercase border border-emerald-500/30">
            <span>📚</span> Step 2: Core Academic Modules
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">Grammar & Sensory Foundations</h2>
          <p class="text-emerald-100/90 text-sm max-w-2xl leading-relaxed">
            Master the three foundational building blocks for describing school and home surroundings.
          </p>
        </div>

        <!-- Learn Sub-navigation Tabs -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          <button onclick="App.selectLearnSubTab('senses')" 
            class="py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${this.activeLearnSubTab === 'senses' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
            👀 A. Five Senses
          </button>
          <button onclick="App.selectLearnSubTab('adjectives')" 
            class="py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${this.activeLearnSubTab === 'adjectives' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
            ✍️ B. Adj Phrases
          </button>
          <button onclick="App.selectLearnSubTab('present')" 
            class="py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${this.activeLearnSubTab === 'present' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
            🧩 C. Simple Present
          </button>
          <button onclick="App.selectLearnSubTab('bridge')" 
            class="py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${this.activeLearnSubTab === 'bridge' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
            🔗 How They Connect
          </button>
          <button onclick="App.selectLearnSubTab('context')" 
            class="py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${this.activeLearnSubTab === 'context' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
            🌿 Context Highlighter
          </button>
        </div>

        <!-- Sub Tab Content Card -->
        <div id="learn-subtab-container" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 min-h-[460px]">
          ${this.renderLearnSubTabContent()}
        </div>
      </div>
    `;
  },

  selectLearnSubTab(subTab) {
    this.activeLearnSubTab = subTab;
    SoundManager.playClick();
    this.renderLearnTab();
  },

  renderLearnSubTabContent() {
    switch (this.activeLearnSubTab) {
      case "senses":
        return this.renderLearnSenses();
      case "adjectives":
        return this.renderLearnAdjectives();
      case "present":
        return this.renderLearnPresent();
      case "bridge":
        return this.renderLearnBridge();
      case "context":
        return this.renderLearnContext();
    }
  },

  // Subtab 1: Five Senses
  renderLearnSenses() {
    return `
      <div class="space-y-6 animate-fadeIn">
        <div class="border-b border-slate-100 pb-4">
          <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Section A</span>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-900">Observe Before You Describe</h3>
          <p class="text-slate-600 text-sm mt-1">We use our five senses to notice clear details before writing sentences.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
            <div class="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <span>👀</span> SIGHT (See)
            </div>
            <p class="text-xs text-slate-600"><strong>Question:</strong> What can you see?</p>
            <p class="text-xs text-slate-700"><strong>Examples:</strong> tall green trees, colorful flowers, clean walking paths</p>
            <div class="p-2.5 bg-white rounded-xl border border-emerald-200 text-xs font-medium text-emerald-950">
              💬 "I can see tall green trees in the schoolyard."
            </div>
          </div>

          <div class="p-4 bg-teal-50/60 rounded-2xl border border-teal-100 space-y-2">
            <div class="flex items-center gap-2 text-teal-900 font-bold text-sm">
              <span>👂</span> SOUND (Hear)
            </div>
            <p class="text-xs text-slate-600"><strong>Question:</strong> What can you hear?</p>
            <p class="text-xs text-slate-700"><strong>Examples:</strong> birds singing, water flowing, leaves rustling</p>
            <div class="p-2.5 bg-white rounded-xl border border-teal-200 text-xs font-medium text-teal-950">
              💬 "I can hear birds singing in the morning."
            </div>
          </div>

          <div class="p-4 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-2">
            <div class="flex items-center gap-2 text-sky-900 font-bold text-sm">
              <span>👃</span> SMELL (Scent)
            </div>
            <p class="text-xs text-slate-600"><strong>Question:</strong> What can you smell?</p>
            <p class="text-xs text-slate-700"><strong>Examples:</strong> fresh air, blooming jasmine, wet soil after rain</p>
            <div class="p-2.5 bg-white rounded-xl border border-sky-200 text-xs font-medium text-sky-950">
              💬 "I can smell fresh flowers after the rain."
            </div>
          </div>

          <div class="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-2">
            <div class="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <span>✋</span> TOUCH (Feel)
            </div>
            <p class="text-xs text-slate-600"><strong>Question:</strong> What can you feel?</p>
            <p class="text-xs text-slate-700"><strong>Examples:</strong> cool breeze, soft grass, warm sunlight</p>
            <div class="p-2.5 bg-white rounded-xl border border-indigo-200 text-xs font-medium text-indigo-950">
              💬 "I can feel the cool breeze under the trees."
            </div>
          </div>

          <div class="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 space-y-2 md:col-span-2">
            <div class="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <span>👅</span> TASTE (Contextual)
            </div>
            <p class="text-xs text-slate-600"><strong>Context:</strong> Taste applies when the garden contains edible fruits or fresh vegetables.</p>
            <div class="p-2.5 bg-white rounded-xl border border-amber-200 text-xs font-medium text-amber-950">
              💬 "The ripe mangoes taste sweet and fresh."
            </div>
          </div>
        </div>

        <!-- Mini Matching Game -->
        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <h4 class="font-bold text-slate-800 text-sm">🎮 Mini Activity: Match Observation to Sense</h4>
          <p class="text-xs text-slate-600">Click the corresponding sensory button for each sentence:</p>

          <div class="space-y-2.5">
            ${MPI_DATA.learn.matchingGame.map(item => `
              <div class="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2" id="match-row-${item.id}">
                <span class="text-xs sm:text-sm text-slate-800 font-medium">"${item.observation}"</span>
                <div class="flex items-center gap-1.5 shrink-0">
                  <button onclick="App.checkSenseMatch(${item.id}, 'see')" class="px-2.5 py-1 rounded-lg border border-slate-200 text-xs hover:bg-emerald-50">👀 See</button>
                  <button onclick="App.checkSenseMatch(${item.id}, 'hear')" class="px-2.5 py-1 rounded-lg border border-slate-200 text-xs hover:bg-teal-50">👂 Hear</button>
                  <button onclick="App.checkSenseMatch(${item.id}, 'smell')" class="px-2.5 py-1 rounded-lg border border-slate-200 text-xs hover:bg-sky-50">👃 Smell</button>
                  <button onclick="App.checkSenseMatch(${item.id}, 'feel')" class="px-2.5 py-1 rounded-lg border border-slate-200 text-xs hover:bg-indigo-50">✋ Feel</button>
                  <button onclick="App.checkSenseMatch(${item.id}, 'taste')" class="px-2.5 py-1 rounded-lg border border-slate-200 text-xs hover:bg-amber-50">👅 Taste</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  checkSenseMatch(itemId, selectedSense) {
    const item = MPI_DATA.learn.matchingGame.find(x => x.id === itemId);
    const row = document.getElementById(`match-row-${itemId}`);
    if (!item || !row) return;

    if (item.correctSense === selectedSense) {
      row.classList.add("bg-emerald-50", "border-emerald-400");
      SoundManager.playCorrect();
    } else {
      row.classList.add("bg-rose-50", "border-rose-400");
      setTimeout(() => {
        row.classList.remove("bg-rose-50", "border-rose-400");
      }, 800);
      SoundManager.playIncorrect();
    }
  },

  // Subtab 2: Adjective Phrases
  renderLearnAdjectives() {
    return `
      <div class="space-y-6 animate-fadeIn">
        <div class="border-b border-slate-100 pb-4">
          <span class="text-xs font-bold text-teal-700 uppercase tracking-wider block">Section B</span>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-900">Make Your Description More Detailed</h3>
          <p class="text-slate-600 text-sm mt-1">An adjective phrase is a group of words that gives more information about a place.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3">
            <span class="px-2 py-0.5 bg-emerald-200 text-emerald-900 text-[10px] font-bold rounded uppercase">Pattern 1</span>
            <h4 class="font-bold text-slate-800 text-sm">Adverb + Adjective</h4>
            <p class="text-xs text-slate-600">The adverb describes the degree of the adjective.</p>
            <ul class="text-xs text-slate-700 space-y-1 font-mono">
              <li>• <strong>very</strong> clean</li>
              <li>• <strong>really</strong> fresh</li>
              <li>• <strong>quite</strong> peaceful</li>
              <li>• <strong>so</strong> green</li>
            </ul>
          </div>

          <div class="p-5 bg-teal-50/70 rounded-2xl border border-teal-200 space-y-3">
            <span class="px-2 py-0.5 bg-teal-200 text-teal-900 text-[10px] font-bold rounded uppercase">Pattern 2</span>
            <h4 class="font-bold text-slate-800 text-sm">Adjective + Preposition</h4>
            <p class="text-xs text-slate-600">Gives specific details using a preposition.</p>
            <ul class="text-xs text-slate-700 space-y-1 font-mono">
              <li>• <strong>full of</strong> green trees</li>
              <li>• <strong>famous for</strong> clean water</li>
              <li>• <strong>rich in</strong> plants</li>
              <li>• <strong>close to</strong> the house</li>
            </ul>
          </div>

          <div class="p-5 bg-sky-50/70 rounded-2xl border border-sky-200 space-y-3">
            <span class="px-2 py-0.5 bg-sky-200 text-sky-900 text-[10px] font-bold rounded uppercase">Pattern 3</span>
            <h4 class="font-bold text-slate-800 text-sm">Adjective + To-Infinitive</h4>
            <p class="text-xs text-slate-600">Shows purpose or action for visitors.</p>
            <ul class="text-xs text-slate-700 space-y-1 font-mono">
              <li>• <strong>easy to</strong> clean</li>
              <li>• <strong>pleasant to</strong> visit</li>
              <li>• <strong>safe to</strong> play</li>
              <li>• <strong>nice to</strong> see</li>
            </ul>
          </div>
        </div>

        <!-- Progression Ladder -->
        <div class="p-6 bg-slate-900 text-white rounded-2xl space-y-4">
          <h4 class="font-bold text-emerald-400 text-sm">📈 Description Ladder: Step-by-Step</h4>
          <p class="text-xs text-slate-300">Look at how simple words build into a rich descriptive sentence:</p>

          <div class="space-y-2 text-xs sm:text-sm">
            <div class="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-400">
              1. The school garden is clean. <span class="text-xs text-slate-500 block">(Simple adjective)</span>
            </div>
            <div class="p-3 bg-slate-800 rounded-xl border border-slate-700 text-emerald-200">
              2. The school garden is <strong>very clean</strong>. <span class="text-xs text-slate-500 block">(Pattern 1: Adverb + Adjective)</span>
            </div>
            <div class="p-3 bg-slate-800 rounded-xl border border-slate-700 text-teal-200">
              3. The school garden is <strong>very clean and peaceful</strong>. <span class="text-xs text-slate-500 block">(Two adjectives)</span>
            </div>
            <div class="p-3 bg-emerald-950 rounded-xl border border-emerald-600 text-white font-semibold">
              4. The school garden is <strong>very clean, peaceful, and full of green trees</strong>. <span class="text-xs text-emerald-400 block">(Synthesized Description)</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Subtab 3: Simple Present Tense
  renderLearnPresent() {
    return `
      <div class="space-y-6 animate-fadeIn">
        <div class="border-b border-slate-100 pb-4">
          <span class="text-xs font-bold text-sky-700 uppercase tracking-wider block">Section C</span>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-900">Build Accurate Description Sentences</h3>
          <p class="text-slate-600 text-sm mt-1">We use the Simple Present Tense to describe facts, conditions, and routines of places.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-2">
            <span class="text-xs font-bold text-emerald-800 uppercase block">1. Positive Form</span>
            <div class="text-xs font-mono bg-white p-2 rounded-lg border border-emerald-200">
              Subject + V1 / (V-s / V-es)
            </div>
            <p class="text-xs text-slate-700">• The garden <strong>has</strong> many flowers.</p>
            <p class="text-xs text-slate-700">• The tree <strong>provides</strong> shade.</p>
            <p class="text-xs text-slate-700">• Students <strong>sweep</strong> the yard.</p>
          </div>

          <div class="p-5 bg-teal-50 rounded-2xl border border-teal-100 space-y-2">
            <span class="text-xs font-bold text-teal-800 uppercase block">2. Negative Form</span>
            <div class="text-xs font-mono bg-white p-2 rounded-lg border border-teal-200">
              Subject + do / does not + V1
            </div>
            <p class="text-xs text-slate-700">• The park <strong>does not have</strong> litter.</p>
            <p class="text-xs text-slate-700">• The river <strong>does not look</strong> dirty.</p>
            <p class="text-xs text-slate-700">• Students <strong>do not throw</strong> trash.</p>
          </div>

          <div class="p-5 bg-sky-50 rounded-2xl border border-sky-100 space-y-2">
            <span class="text-xs font-bold text-sky-800 uppercase block">3. Question Form</span>
            <div class="text-xs font-mono bg-white p-2 rounded-lg border border-sky-200">
              Do / Does + Subject + V1?
            </div>
            <p class="text-xs text-slate-700">• <strong>Does</strong> the school <strong>have</strong> bins?</p>
            <p class="text-xs text-slate-700">• <strong>Does</strong> the tree <strong>grow</strong> well?</p>
            <p class="text-xs text-slate-700">• <strong>Do</strong> you <strong>water</strong> the plants?</p>
          </div>
        </div>

        <div class="p-5 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center text-xl shrink-0">
            ⚠️
          </div>
          <div class="space-y-1 text-xs sm:text-sm">
            <h4 class="font-bold text-amber-900">Key Grammar Rule: He / She / It (Singular Place) → Verb-s / Verb-es</h4>
            <p class="text-slate-700">When describing a singular place (e.g. <em>The garden, The backyard, It</em>), always add <strong>-s</strong> or <strong>-es</strong> to the verb.</p>
            <div class="pt-1 font-mono text-emerald-800 font-semibold">
              The tree provide<strong>s</strong> cool shade. (NOT: The tree provide cool shade)
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Subtab 4: Bridge
  renderLearnBridge() {
    return `
      <div class="space-y-6 animate-fadeIn">
        <div class="border-b border-slate-100 pb-4">
          <span class="text-xs font-bold text-indigo-700 uppercase tracking-wider block">Section D</span>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-900">How Do They Work Together?</h3>
          <p class="text-slate-600 text-sm mt-1">See how observation, description, and sentence building unite:</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
            <span class="text-2xl block">👀</span>
            <h4 class="font-bold text-xs uppercase text-slate-700">1. Five Senses</h4>
            <span class="text-[10px] px-2 py-0.5 bg-slate-200 rounded-full text-slate-700 font-semibold block">helps us OBSERVE</span>
            <p class="text-xs text-slate-600 italic">"green trees"</p>
          </div>

          <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
            <span class="text-2xl block">✍️</span>
            <h4 class="font-bold text-xs uppercase text-emerald-900">2. Adj Phrases</h4>
            <span class="text-[10px] px-2 py-0.5 bg-emerald-200 rounded-full text-emerald-900 font-semibold block">helps us DESCRIBE</span>
            <p class="text-xs text-emerald-800 italic font-medium">"full of green trees"</p>
          </div>

          <div class="p-4 bg-teal-50 rounded-2xl border border-teal-200 text-center space-y-2">
            <span class="text-2xl block">🧩</span>
            <h4 class="font-bold text-xs uppercase text-teal-900">3. Simple Present</h4>
            <span class="text-[10px] px-2 py-0.5 bg-teal-200 rounded-full text-teal-900 font-semibold block">helps us BUILD</span>
            <p class="text-xs text-teal-800 italic font-medium">"The garden is full of trees."</p>
          </div>

          <div class="p-4 bg-sky-50 rounded-2xl border border-sky-200 text-center space-y-2">
            <span class="text-2xl block">🌿</span>
            <h4 class="font-bold text-xs uppercase text-sky-900">4. Descriptive Text</h4>
            <span class="text-[10px] px-2 py-0.5 bg-sky-200 rounded-full text-sky-900 font-semibold block">COMBINES IDEAS</span>
            <p class="text-xs text-sky-800 italic font-medium">"The garden is clean and full of trees."</p>
          </div>
        </div>
      </div>
    `;
  },

  // Subtab 5: Context Highlighter
  renderLearnContext() {
    const ctxData = MPI_DATA.learn.grammarInContext;
    return `
      <div class="space-y-6 animate-fadeIn">
        <div class="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Section E</span>
            <h3 class="text-xl sm:text-2xl font-bold text-slate-900">Grammar in Context Highlighter</h3>
            <p class="text-slate-600 text-sm">Click the buttons or hover over the phrases to see their role in the text.</p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <button onclick="App.highlightContextToken('verb')" class="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
            🟧 Simple Present Verbs
          </button>
          <button onclick="App.highlightContextToken('adj_phrase')" class="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300">
            🟩 Adjective Phrases
          </button>
          <button onclick="App.highlightContextToken('sensory')" class="px-3 py-1.5 rounded-xl bg-sky-100 text-sky-900 border border-sky-300">
            🟦 Sensory Details
          </button>
          <button onclick="App.highlightContextToken('all')" class="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-300">
            Show All
          </button>
        </div>

        <div class="p-6 bg-slate-50 rounded-3xl border border-slate-200/80 space-y-4">
          <h4 class="font-bold text-slate-800 text-lg">${ctxData.title}</h4>
          
          <div class="text-base sm:text-lg leading-loose text-slate-700" id="annotated-passage-body">
            ${ctxData.annotatedTokens.map((t, i) => {
              let colorClass = "hover:bg-slate-200 cursor-pointer";
              if (t.type === "verb") colorClass = "bg-amber-100 text-amber-950 font-medium px-1 rounded";
              if (t.type === "adj_phrase") colorClass = "bg-emerald-100 text-emerald-950 font-medium px-1 rounded";
              if (t.type === "sensory") colorClass = "bg-sky-100 text-sky-950 font-medium px-1 rounded";

              return `
                <span 
                  onclick="App.showTokenExplanation(${i})"
                  class="token-item transition-all ${colorClass}" 
                  data-type="${t.type}">
                  ${t.word}
                </span>
              `;
            }).join(' ')}
          </div>

          <div id="token-explainer" class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-xs sm:text-sm text-slate-700">
            💡 <em>Click any highlighted phrase above to view its grammar role.</em>
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button 
            onclick="App.finishLearnAndGoPractice()"
            class="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2">
            <span>Unlock Practice Zone</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;
  },

  highlightContextToken(type) {
    const tokens = document.querySelectorAll(".token-item");
    tokens.forEach(t => {
      if (type === "all" || t.dataset.type === type) {
        t.style.opacity = "1";
      } else {
        t.style.opacity = "0.3";
      }
    });
    SoundManager.playClick();
  },

  showTokenExplanation(idx) {
    const token = MPI_DATA.learn.grammarInContext.annotatedTokens[idx];
    const box = document.getElementById("token-explainer");
    if (!token || !box) return;

    box.innerHTML = `
      <div class="flex items-start gap-2">
        <span class="text-base">🔍</span>
        <div>
          <strong class="text-emerald-900 block text-sm font-bold">"${token.word}"</strong>
          <span class="text-xs text-slate-600">${token.tag}</span>
        </div>
      </div>
    `;
    SoundManager.playClick();
  },

  finishLearnAndGoPractice() {
    const student = StorageManager.getCurrentStudent();
    student.completedSections.learn = true;

    if (!student.badges.includes("eco_learner")) {
      student.badges.push("eco_learner");
      this.showBadgeNotification("🌱 Eco Learner", "Unlocked for completing the Learn section!");
    }

    StorageManager.saveCurrentStudent(student);
    this.updateProgressHeader();
    this.navigateToTab("practice");
  },

  // ==================== REFLECTION TAB ====================
  renderReflectionTab() {
    const container = document.getElementById("reflection-tab-content");
    if (!container) return;

    const student = StorageManager.getCurrentStudent();
    const ref = student.reflection || {};

    container.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 animate-fadeIn">
        <div class="bg-gradient-to-r from-teal-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-700/60 rounded-full text-xs font-semibold tracking-wide uppercase border border-emerald-500/30">
            <span>🤔</span> Self-Reflection
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">Reflect On Your Learning</h2>
          <p class="text-emerald-100/90 text-sm leading-relaxed">
            Evaluate your learning progress, identify your strengths, and plan your next practice.
          </p>
        </div>

        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div class="space-y-2">
            <label class="font-bold text-slate-800 text-sm block">
              1. What did you learn today about describing environmental places?
            </label>
            <textarea 
              id="ref-q1" 
              rows="3" 
              placeholder="e.g. I learned how to use adjective phrases and simple present tense to describe our school garden..."
              class="w-full p-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">${ref.q1_learned || ''}</textarea>
          </div>

          <div class="space-y-2">
            <label class="font-bold text-slate-800 text-sm block">
              2. Which part was easiest for you?
            </label>
            <select id="ref-q2" class="w-full p-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
              <option value="">-- Select an option --</option>
              <option value="Five Senses" ${ref.q2_easiest === 'Five Senses' ? 'selected' : ''}>Five Senses (Observation)</option>
              <option value="Adjective Phrases" ${ref.q2_easiest === 'Adjective Phrases' ? 'selected' : ''}>Adjective Phrases (Patterns 1, 2, 3)</option>
              <option value="Simple Present" ${ref.q2_easiest === 'Simple Present' ? 'selected' : ''}>Simple Present Tense (Sentence Building)</option>
              <option value="Reading Comprehension" ${ref.q2_easiest === 'Reading Comprehension' ? 'selected' : ''}>Reading Comprehension</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="font-bold text-slate-800 text-sm block">
              3. Which part was most challenging?
            </label>
            <select id="ref-q3" class="w-full p-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
              <option value="">-- Select an option --</option>
              <option value="Five Senses" ${ref.q3_challenging === 'Five Senses' ? 'selected' : ''}>Five Senses (Observation)</option>
              <option value="Adjective Phrases" ${ref.q3_challenging === 'Adjective Phrases' ? 'selected' : ''}>Adjective Phrases (Patterns 1, 2, 3)</option>
              <option value="Simple Present" ${ref.q3_challenging === 'Simple Present' ? 'selected' : ''}>Simple Present Tense (Sentence Building)</option>
              <option value="Reading Comprehension" ${ref.q3_challenging === 'Reading Comprehension' ? 'selected' : ''}>Reading Comprehension</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="font-bold text-slate-800 text-sm block">
              4. "I can describe an environmental place using English." (Confidence Level)
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              ${[
                { label: "😄 Very confident", val: "😄 Very confident" },
                { label: "🙂 Confident", val: "🙂 Confident" },
                { label: "😐 Still learning", val: "😐 Still learning" },
                { label: "😟 Need more practice", val: "😟 Need more practice" }
              ].map(opt => `
                <label class="p-3 rounded-xl border border-slate-200 hover:border-emerald-400 flex items-center gap-2 cursor-pointer transition-colors text-xs font-medium">
                  <input type="radio" name="ref-q4" value="${opt.val}" ${ref.q4_confidence === opt.val ? 'checked' : ''} class="text-emerald-600 focus:ring-emerald-500">
                  <span>${opt.label}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <div class="space-y-2">
            <label class="font-bold text-slate-800 text-sm block">
              5. What will you improve next?
            </label>
            <textarea 
              id="ref-q5" 
              rows="3" 
              placeholder="e.g. I will practice more sentences with subject-verb agreement..."
              class="w-full p-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">${ref.q5_next_improvement || ''}</textarea>
          </div>

          <div class="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              onclick="App.submitReflection()"
              class="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2">
              <span>SUBMIT REFLECTION</span>
              <span>✓</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  submitReflection() {
    const q1 = document.getElementById("ref-q1")?.value || "";
    const q2 = document.getElementById("ref-q2")?.value || "";
    const q3 = document.getElementById("ref-q3")?.value || "";
    const q4 = document.querySelector('input[name="ref-q4"]:checked')?.value || "";
    const q5 = document.getElementById("ref-q5")?.value || "";

    if (!q1 || !q2 || !q3 || !q4) {
      alert("Please complete the reflection fields before submitting.");
      return;
    }

    const student = StorageManager.getCurrentStudent();
    student.reflection = {
      submitted: true,
      submittedAt: new Date().toISOString(),
      q1_learned: q1,
      q2_easiest: q2,
      q3_challenging: q3,
      q4_confidence: q4,
      q5_next_improvement: q5
    };

    student.completedSections.reflection = true;

    if (!student.badges.includes("eco_master")) {
      student.badges.push("eco_master");
      this.showBadgeNotification("🏆 Eco English Master", "Congratulations! You have completed the full MPI lesson!");
    }

    StorageManager.saveCurrentStudent(student);
    SoundManager.playCelebration();
    this.updateProgressHeader();
    
    this.showFinalCompletionModal();
  },

  showFinalCompletionModal() {
    const student = StorageManager.getCurrentStudent();
    const div = document.createElement("div");
    div.id = "final-completion-modal";
    div.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn";
    
    div.innerHTML = `
      <div class="bg-white rounded-3xl max-w-lg w-full p-8 text-center space-y-6 shadow-2xl border border-slate-100 animate-scaleUp">
        <div class="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-4xl mx-auto shadow-inner">
          🏆
        </div>

        <div class="space-y-2">
          <span class="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">
            Lesson Completed
          </span>
          <h2 class="text-3xl font-extrabold text-slate-900">WELL DONE, ${student.name || 'STUDENT'}!</h2>
          <p class="text-slate-600 text-sm leading-relaxed">
            You have successfully completed the <strong>Describing Places (Environmental Awareness)</strong> lesson.
          </p>
        </div>

        <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left text-xs sm:text-sm text-emerald-950 space-y-2">
          <div class="font-bold text-emerald-900 uppercase">What you can do now:</div>
          <div class="flex items-center gap-2"><span>✓</span> Observe places using your Five Senses.</div>
          <div class="flex items-center gap-2"><span>✓</span> Enrich descriptions with Adjective Phrases.</div>
          <div class="flex items-center gap-2"><span>✓</span> Apply the Simple Present Tense accurately.</div>
          <div class="flex items-center gap-2"><span>✓</span> Understand and evaluate descriptive texts.</div>
        </div>

        <p class="text-xs text-slate-500 italic">
          "Every place has a story. Use English to describe it and help others appreciate our environment."
        </p>

        <button 
          onclick="App.closeFinalModalAndGoResults()"
          class="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all">
          View Complete Scorecard & Analytics →
        </button>
      </div>
    `;

    document.body.appendChild(div);
  },

  closeFinalModalAndGoResults() {
    const modal = document.getElementById("final-completion-modal");
    if (modal) modal.remove();
    this.navigateToTab("results");
  },

  showBadgeNotification(title, message) {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-slideUp max-w-sm";
    toast.innerHTML = `
      <span class="text-2xl">🎉</span>
      <div>
        <strong class="text-emerald-400 text-xs uppercase block">${title}</strong>
        <span class="text-xs text-slate-300">${message}</span>
      </div>
    `;
    document.body.appendChild(toast);
    SoundManager.playCelebration();

    setTimeout(() => {
      toast.remove();
    }, 4500);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
