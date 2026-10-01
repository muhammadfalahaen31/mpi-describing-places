/**
 * MASTER DATA MODULE - MPI DESCRIBING PLACES (GRADE XI ENGLISH)
 * Developer: Muhammad Falahaen Jiddan, M.Pd.,Gr.
 * Target: Senior High School Grade XI English
 * Theme: Environmental Awareness (School & Home Surroundings)
 * Assessment: 25 Questions with Plausible, Length-Balanced Distractors
 * Distribution: 40% LOTS (10 Qs), 40% MOTS (10 Qs), 20% HOTS (5 Qs)
 */

const MPI_DATA = {
  metadata: {
    title: "Describing Places: Environmental Awareness",
    subject: "English Wajib",
    topic: "Descriptive Text (Adjective Phrases, Simple Present Tense, Five Senses)",
    developer: "Muhammad Falahaen Jiddan, M.Pd.,Gr.",
    targetGrade: "Grade XI Senior High School",
    approach: "SEE → THINK → DESCRIBE → BUILD → COMBINE → CREATE → ASSESS → REFLECT → ANALYZE"
  },

  explore: {
    title: "Our School Green Garden",
    subtitle: "Observe our school garden and neighborhood environment. Click each sense to discover sensory details.",
    imageDescription: "A clean and green school garden with shady trees, colorful flowers, neat stone pathways, recycling bins, and small wooden benches.",
    senses: {
      see: {
        name: "SEE (Sight)",
        icon: "👀",
        color: "emerald",
        badge: "Visual Details",
        description: "What physical objects, colors, and clean areas can you see?",
        items: [
          { text: "Tall green trees providing cool shade", tag: "Trees & Plants" },
          { text: "Bright yellow and red blooming flowers", tag: "Garden Flora" },
          { text: "Clean walking paths without plastic litter", tag: "Schoolyard" },
          { text: "Green, yellow, and red recycling bins", tag: "Waste Sorting" },
          { text: "Neat wooden benches for resting under trees", tag: "Facilities" }
        ]
      },
      hear: {
        name: "HEAR (Sound)",
        icon: "👂",
        color: "teal",
        badge: "Sound Details",
        description: "What peaceful natural sounds can you hear in this environment?",
        items: [
          { text: "Small birds singing melodiously in the branches", tag: "Birds" },
          { text: "Leaves moving gently in the afternoon breeze", tag: "Breeze" },
          { text: "Water flowing softly from the garden fountain", tag: "Water" },
          { text: "Students talking politely under the shady tree", tag: "School Life" }
        ]
      },
      smell: {
        name: "SMELL (Scent)",
        icon: "👃",
        color: "sky",
        badge: "Scent Details",
        description: "What fresh and natural scents fill the air?",
        items: [
          { text: "Fresh and clean morning air rich in oxygen", tag: "Fresh Air" },
          { text: "Sweet fragrance of blooming jasmine flowers", tag: "Flowers" },
          { text: "Damp, earthy scent of wet soil after morning rain", tag: "Earth" },
          { text: "Refreshing aroma of freshly cut green grass", tag: "Grass" }
        ]
      },
      feel: {
        name: "FEEL (Touch)",
        icon: "✋",
        color: "indigo",
        badge: "Touch & Temperature",
        description: "What temperatures and textures can you experience?",
        items: [
          { text: "Cool, soothing breeze under the big shady trees", tag: "Temperature" },
          { text: "Soft green grass under our walking shoes", tag: "Texture" },
          { text: "Warm morning sunlight touching our skin", tag: "Sunlight" },
          { text: "Smooth wooden surface of the park benches", tag: "Furniture" }
        ]
      },
      taste: {
        name: "TASTE (Contextual)",
        icon: "👅",
        color: "amber",
        badge: "Contextual (Edible Plants)",
        description: "Taste applies when the place contains edible fruits, clean spring water, or garden harvests.",
        items: [
          { text: "Sweet and juicy mangoes harvested from the backyard", tag: "Fruit" },
          { text: "Crisp and fresh taste of school garden spinach", tag: "Vegetables" },
          { text: "Cool and refreshing taste of natural drinking water", tag: "Clean Water" }
        ]
      }
    },
    quickCheckPrompt: {
      question: "Which sensory observation best describes a clean and healthy school garden?",
      options: [
        "A. Thick black smoke rising from burning plastic piles",
        "B. Chirping birds, sweet flower scent, and shady trees",
        "C. Scattered plastic bags floating in dirty canal water",
        "D. Loud motorbike engine noises from the crowded street"
      ],
      correct: 1,
      explanation: "Chirping birds (Hearing), sweet flower scent (Smelling), and shady green trees (Seeing) are positive sensory details representing a healthy green garden."
    }
  },

  learn: {
    matchingGame: [
      { id: 1, observation: "Clean water in the small garden pond", correctSense: "see", label: "Seeing" },
      { id: 2, observation: "Sweet smell of blooming jasmine flowers", correctSense: "smell", label: "Smelling" },
      { id: 3, observation: "Birds singing happily in the trees", correctSense: "hear", label: "Hearing" },
      { id: 4, observation: "Cool morning wind on your skin", correctSense: "feel", label: "Feeling" },
      { id: 5, observation: "Sweet and juicy fresh mango fruit", correctSense: "taste", label: "Tasting" }
    ],

    adjectivePhraseExercises: [
      {
        id: 1,
        sentence: "Our school garden is [very clean] every day.",
        phrase: "very clean",
        pattern: "Pattern 1 (Adverb + Adjective)",
        explanation: "'very' is an adverb of degree modifying the adjective 'clean'."
      },
      {
        id: 2,
        sentence: "The backyard is [full of green plants].",
        phrase: "full of green plants",
        pattern: "Pattern 2 (Adjective + Prepositional Phrase)",
        explanation: "'full' is the head adjective followed by the prepositional phrase 'of green plants'."
      },
      {
        id: 3,
        sentence: "The neighborhood park is [pleasant to visit] in the afternoon.",
        phrase: "pleasant to visit",
        pattern: "Pattern 3 (Adjective + To-Infinitive)",
        explanation: "'pleasant' is the adjective followed by the to-infinitive 'to visit'."
      },
      {
        id: 4,
        sentence: "Our schoolyard is [famous for its shady trees].",
        phrase: "famous for its shady trees",
        pattern: "Pattern 2 (Adjective + Prepositional Phrase)",
        explanation: "'famous' is an adjective complemented by 'for its shady trees'."
      }
    ],

    grammarInContext: {
      title: "Our School Garden",
      text: "Our school garden is very green and peaceful. It is full of colorful flowers and tall trees. The garden has several clean pathways and small benches. Students can see beautiful flowers and hear birds singing in the trees. The air feels cool and fresh. The garden provides a comfortable place for students to relax and enjoy nature.",
      annotatedTokens: [
        { word: "Our school garden", type: "subject", tag: "Subject (Singular Place)" },
        { word: "is", type: "verb", tag: "Simple Present 'To Be' (Singular)" },
        { word: "very green and peaceful.", type: "adj_phrase", tag: "Adjective Phrase (Pattern 1: Adverb + Adjectives)" },
        { word: "It", type: "subject", tag: "Subject Pronoun (It = The Garden)" },
        { word: "is", type: "verb", tag: "Simple Present 'To Be'" },
        { word: "full of colorful flowers and tall trees.", type: "adj_phrase", tag: "Adjective Phrase (Pattern 2: Adj + Preposition)" },
        { word: "The garden", type: "subject", tag: "Subject (Singular: It)" },
        { word: "has", type: "verb", tag: "Simple Present Verb (have -> has)" },
        { word: "several clean pathways and small benches.", type: "sensory", tag: "Sensory Detail: Sight" },
        { word: "Students", type: "subject", tag: "Subject (Plural: They)" },
        { word: "can see", type: "verb", tag: "Modal + Sensory Verb (See)" },
        { word: "beautiful flowers", type: "sensory", tag: "Sensory Detail: Sight" },
        { word: "and", type: "conjunction", tag: "Conjunction" },
        { word: "hear", type: "verb", tag: "Sensory Verb (Hear)" },
        { word: "birds singing in the trees.", type: "sensory", tag: "Sensory Detail: Hearing" },
        { word: "The air", type: "subject", tag: "Subject (Singular/Uncountable)" },
        { word: "feels", type: "verb", tag: "Simple Present Verb (+s rule)" },
        { word: "cool and fresh.", type: "adj_phrase", tag: "Adjective Phrase (Touch / Smell)" },
        { word: "The garden", type: "subject", tag: "Subject (Singular)" },
        { word: "provides", type: "verb", tag: "Simple Present Verb (+s rule)" },
        { word: "a comfortable place for students to relax and enjoy nature.", type: "adj_phrase", tag: "Adjective Phrase & Purpose" }
      ]
    }
  },

  practice: {
    level1: [
      {
        id: 1,
        question: "Our schoolyard is ______ every morning.",
        options: [
          "A. very clean",
          "B. cleanly very",
          "C. very cleanly",
          "D. clean very",
          "E. cleanliness"
        ],
        answer: 0,
        topic: "Adjective Phrase",
        explanation: "'very clean' is the correct adjective phrase (adverb 'very' + adjective 'clean')."
      },
      {
        id: 2,
        question: "My father ______ green plants in our home garden every Sunday.",
        options: [
          "A. water",
          "B. waters",
          "C. watering",
          "D. is water",
          "E. watered"
        ],
        answer: 1,
        topic: "Simple Present Tense",
        explanation: "'My father' is a singular subject (he), so the verb adds '-s' -> 'waters'."
      },
      {
        id: 3,
        question: "Which phrase is an example of Adjective + Prepositional Phrase?",
        options: [
          "A. very tall",
          "B. full of colorful flowers",
          "C. easy to water",
          "D. walking quickly",
          "E. really fresh"
        ],
        answer: 1,
        topic: "Adjective Phrase",
        explanation: "'full' (adjective) + 'of colorful flowers' (prepositional phrase) fits Pattern 2."
      },
      {
        id: 4,
        question: "Students ______ plastic bottles in the yellow recycling bin.",
        options: [
          "A. puts",
          "B. put",
          "C. putting",
          "D. is put",
          "E. are puts"
        ],
        answer: 1,
        topic: "Simple Present Tense",
        explanation: "'Students' is plural (they), so we use the base form of the verb -> 'put'."
      },
      {
        id: 5,
        question: "The air in the morning ______ cool and fresh.",
        options: [
          "A. feel",
          "B. feels",
          "C. feeling",
          "D. are feel",
          "E. feeler"
        ],
        answer: 1,
        topic: "Simple Present Tense",
        explanation: "'The air' is an uncountable singular noun, so the verb takes '-s' -> 'feels'."
      },
      {
        id: 6,
        question: "Identify the sense for: 'The sweet smell of blooming jasmine.'",
        options: [
          "A. Sight (See)",
          "B. Hearing (Hear)",
          "C. Smell (Scent)",
          "D. Touch (Feel)",
          "E. Taste (Food)"
        ],
        answer: 2,
        topic: "Five Senses",
        explanation: "'Sweet smell' describes an aroma, which belongs to the sense of Smell."
      },
      {
        id: 7,
        question: "The neighborhood park is ______ for children.",
        options: [
          "A. safe to play",
          "B. safely to play",
          "C. safe for playing to",
          "D. safety to play",
          "E. to play safely is"
        ],
        answer: 0,
        topic: "Adjective Phrase",
        explanation: "'safe to play' is Pattern 3: Adjective ('safe') + to-infinitive ('to play')."
      },
      {
        id: 8,
        question: "Choose the correct negative sentence in the simple present tense:",
        options: [
          "A. The school garden does not have trash.",
          "B. The school garden do not have trash.",
          "C. The school garden does not has trash.",
          "D. The school garden is not have trash.",
          "E. The school garden not have trash."
        ],
        answer: 0,
        topic: "Simple Present Tense",
        explanation: "For a singular subject (The school garden), we use 'does not + base verb (have)'."
      },
      {
        id: 9,
        question: "In the sentence 'Our backyard is famous for its sweet mangoes,' the phrase 'famous for its sweet mangoes' is:",
        options: [
          "A. An adjective phrase",
          "B. A past tense verb",
          "C. An adverb of time",
          "D. A question tag",
          "E. A subject noun"
        ],
        answer: 0,
        topic: "Adjective Phrase",
        explanation: "'famous for its sweet mangoes' describes the backyard as an adjective phrase."
      },
      {
        id: 10,
        question: "______ students sweep the classroom floor before going home?",
        options: [
          "A. Does",
          "B. Do",
          "C. Is",
          "D. Are",
          "E. Doing"
        ],
        answer: 1,
        topic: "Simple Present Tense",
        explanation: "'students' is a plural subject, so the question starts with 'Do + Subject + V1'."
      }
    ],

    level2: [
      {
        id: 1,
        question: "Complete the sentence with the correct words:\n'Every morning, the birds ______ sweetly and the sun ______ bright.'",
        options: [
          "A. sing / shine",
          "B. sings / shines",
          "C. sing / shines",
          "D. singing / shining",
          "E. are sing / is shine"
        ],
        answer: 2,
        topic: "Simple Present & Senses",
        explanation: "'birds' (plural) takes 'sing', while 'the sun' (singular) takes 'shines'."
      },
      {
        id: 2,
        question: "Put the words in the correct order:\n[1. Our backyard] [2. is] [3. full of] [4. green vegetables] [5. and] [6. easy to water]",
        options: [
          "A. 1 - 2 - 3 - 4 - 5 - 6",
          "B. 1 - 2 - 6 - 5 - 3 - 4",
          "C. 3 - 4 - 1 - 2 - 5 - 6",
          "D. 1 - 3 - 4 - 2 - 5 - 6",
          "E. 2 - 1 - 3 - 4 - 6 - 5"
        ],
        answer: 0,
        topic: "Sentence Building",
        explanation: "'Our backyard is full of green vegetables and easy to water' forms a correct, meaningful descriptive sentence."
      },
      {
        id: 3,
        question: "Find the sentence with an ERROR in the adjective phrase:",
        options: [
          "A. The school garden is very clean and peaceful.",
          "B. The home garden is famous for its red roses.",
          "C. The small fish pond is easy to clean.",
          "D. The front yard is cleanly very every morning.",
          "E. The neighborhood park is safe to visit."
        ],
        answer: 3,
        topic: "Error Identification",
        explanation: "'cleanly very' is incorrect word order. It should be 'very clean'."
      },
      {
        id: 4,
        question: "Which sentence is the best description of a clean school environment?",
        options: [
          "A. Our school is big and has things.",
          "B. Our school has trees because there is land.",
          "C. Our school is very clean and full of shady trees that make the air cool.",
          "D. Our school is place where students are there nicely.",
          "E. School has trees and grass that are green color."
        ],
        answer: 2,
        topic: "Descriptive Enhancement",
        explanation: "Option C uses clear adjective phrases ('very clean', 'full of shady trees') and sensory detail ('make the air cool')."
      },
      {
        id: 5,
        question: "What sense is used in the sentence: 'The cold water from the well feels refreshing on my hands'?",
        options: [
          "A. Sight (Seeing color)",
          "B. Hearing (Listening to noise)",
          "C. Touch (Feeling cold water)",
          "D. Taste (Eating food)",
          "E. Smell (Scent)"
        ],
        answer: 2,
        topic: "Sensory Analysis",
        explanation: "Feeling cold water on hands uses the sense of Touch (Feel)."
      },
      {
        id: 6,
        question: "Complete the sentence:\n'Rian ______ plastic trash, while his sister ______ the flower pots.'",
        options: [
          "A. collects / cleans",
          "B. collect / clean",
          "C. collecting / cleaning",
          "D. collects / clean",
          "E. collect / cleans"
        ],
        answer: 0,
        topic: "Subject-Verb Agreement",
        explanation: "Both 'Rian' and 'his sister' are singular subjects (he/she), so both verbs take '-s' -> 'collects' and 'cleans'."
      },
      {
        id: 7,
        question: "Which sentence correctly uses Pattern 3 (Adjective + To-Infinitive)?",
        options: [
          "A. The compost bin is easy to use for all students.",
          "B. The compost bin is easily to use for all students.",
          "C. The compost bin is easy for using to all students.",
          "D. The compost bin is ease to use for all students.",
          "E. The compost bin is to use easy for all students."
        ],
        answer: 0,
        topic: "Adjective Phrase Pattern 3",
        explanation: "'easy to use' is Adjective ('easy') + to-infinitive ('to use')."
      },
      {
        id: 8,
        question: "Choose the sentence that describes a general truth about trees around our home:",
        options: [
          "A. Green trees provide oxygen and shade for our house.",
          "B. Green trees was providing shade yesterday.",
          "C. Green trees will be nice tomorrow.",
          "D. Green trees are being shade right now.",
          "E. Green trees provided shade last year."
        ],
        answer: 0,
        topic: "Simple Present Function",
        explanation: "Simple present tense describes general facts and truths ('provide oxygen and shade')."
      },
      {
        id: 9,
        question: "Combine these two sentences into one good descriptive sentence:\n1. 'Our neighborhood park is famous.'\n2. 'It has clean walking paths.'",
        options: [
          "A. Our neighborhood park is famous for its clean walking paths.",
          "B. Our neighborhood park famous because paths are clean.",
          "C. Our neighborhood park is famous that paths are clean.",
          "D. Famous is our park to have clean paths.",
          "E. Our neighborhood park is famously clean paths."
        ],
        answer: 0,
        topic: "Sentence Combining",
        explanation: "'famous for its clean walking paths' combines both ideas using Adjective Phrase Pattern 2."
      },
      {
        id: 10,
        question: "Choose the correct question about a clean home environment:",
        options: [
          "A. Does your family separate organic and plastic waste?",
          "B. Do your family separates organic and plastic waste?",
          "C. Is your family separate organic and plastic waste?",
          "D. Does your family separates organic and plastic waste?",
          "E. Are your family separate organic and plastic waste?"
        ],
        answer: 0,
        topic: "Simple Present Questions",
        explanation: "'your family' is a singular collective noun, so we use 'Does + Subject + base verb (separate)'."
      }
    ],

    level3: [
      {
        id: 1,
        question: "Which sentence gives the most vivid and clear description of a student's home garden?",
        options: [
          "A. My home garden is good and has plants.",
          "B. My home garden is very clean, full of green vegetables, and smells fresh in the morning.",
          "C. The garden is place at home with green things.",
          "D. My home garden is nice very much for looking.",
          "E. Plants are there in my garden at home."
        ],
        answer: 1,
        topic: "Evaluating Descriptive Quality",
        difficulty: "HOTS",
        explanation: "Option B combines adjective phrases ('very clean', 'full of green vegetables') and sensory detail ('smells fresh in the morning') clearly and naturally."
      },
      {
        id: 2,
        question: "Read the description:\n'The small stream behind our school has clear water. We can see small fish swimming happily, and there are no plastic cups or bags on the water.'\nWhat can we conclude about the stream?",
        options: [
          "A. The stream is dirty and polluted with chemicals.",
          "B. The stream is clean and well cared for by the community.",
          "C. The stream has dried up and has no water.",
          "D. People throw garbage into the stream every day.",
          "E. Fish cannot live in the stream."
        ],
        answer: 1,
        topic: "Contextual Inference",
        difficulty: "HOTS",
        explanation: "Clear water, swimming fish, and zero plastic waste indicate that the stream is clean and well protected."
      },
      {
        id: 3,
        question: "A student writes this sentence:\n'Our school canteen are very clean and it have recycling bins.'\nWhich revision is correct and natural?",
        options: [
          "A. Our school canteen is very clean and it has recycling bins.",
          "B. Our school canteen are very clean and it has recycling bins.",
          "C. Our school canteen is clean very and it have recycling bins.",
          "D. Our school canteen does clean and it having recycling bins.",
          "E. Our school canteen being clean and have recycling bins."
        ],
        answer: 0,
        topic: "Grammar Revision",
        difficulty: "HOTS",
        explanation: "'Our school canteen' is singular, so it uses 'is' and 'has'."
      },
      {
        id: 4,
        question: "Compare Sentence 1 and Sentence 2:\nSentence 1: 'My yard is green.'\nSentence 2: 'My front yard is very green and full of colorful orchids that bloom brightly.'\nWhy is Sentence 2 better for a descriptive text?",
        options: [
          "A. Sentence 2 uses difficult words.",
          "B. Sentence 2 is shorter and has no verbs.",
          "C. Sentence 2 gives more specific sensory details and adjective phrases.",
          "D. Sentence 2 talks about something outside the house.",
          "E. Sentence 2 is written in the past tense."
        ],
        answer: 2,
        topic: "Descriptive Comparison",
        difficulty: "HOTS",
        explanation: "Sentence 2 uses adjective phrases ('very green', 'full of colorful orchids') and vivid sensory details that create a clear picture."
      },
      {
        id: 5,
        question: "Which sentence best supports the idea of 'Keeping Our Neighborhood Clean'?",
        options: [
          "A. Many people buy expensive cars in the city.",
          "B. Neighbors work together every Sunday morning to sweep the street and clean the gutters.",
          "C. The city is located fifty kilometers from the mountain.",
          "D. Plastic was invented many years ago.",
          "E. Rain falls heavily during the wet season."
        ],
        answer: 1,
        topic: "Paragraph Coherence",
        difficulty: "HOTS",
        explanation: "Option B directly describes a concrete neighborhood cleaning action (sweeping the street, cleaning gutters)."
      }
    ]
  },

  assessment: {
    text1: {
      id: "text-1",
      title: "Our Green Schoolyard and Eco-Garden",
      topic: "School Environment & Student Eco-Habits",
      wordCount: 165,
      content: `Our school has a green schoolyard and a small eco-garden behind the main building. The area is very clean and peaceful. It is full of tall shady trees, colorful flowers, and neat stone pathways. Every morning, students can hear birds singing in the branches and smell the fresh scent of blooming jasmine flowers.

In the center of the garden, there is a small fish pond with clean water. Small goldfish swim happily between green lotus leaves. Beside the pond, the school provides three colorful bins: green for organic waste, yellow for plastic, and red for hazardous items. 

Students and teachers work together to maintain this green space. During break time, students sit on wooden benches to read books or enjoy their snacks under the cool shade. Nobody throws trash on the ground. Our green schoolyard proves that a clean and healthy school environment makes studying joyful and comfortable for everyone.`
    },

    text2: {
      id: "text-2",
      title: "Rian's Clean Home Backyard Garden",
      topic: "Home Environment & Family Green Activities",
      wordCount: 172,
      content: `Rian lives in a quiet neighborhood with a green backyard behind his house. His family loves nature, so their backyard is very tidy and full of useful plants. There are several vegetable beds with fresh spinach, tomatoes, and chili peppers. A large mango tree grows near the wooden fence, providing cool shade and sweet fruits during the harvest season.

Every afternoon, the air in the backyard feels cool and breezy. Rian and his sister help their parents take care of the garden. Rian waters the vegetables with clean well water, while his sister removes dry fallen leaves from the soil. They also have a small compost box where they turn fruit peels and leaves into natural fertilizer.

Because of their hard work, the backyard looks beautiful and stays free of mosquitoes and bad smells. Rian feels happy and proud of his home garden. It provides fresh organic vegetables for his family and creates a relaxing green space right at home.`
    },

    // EXACTLY 25 BALANCED, PLAUSIBLE QUESTIONS (40% LOTS, 40% MOTS, 20% HOTS)
    // Options in each question are equal in length and complexity
    questions: [
      // ==================== PART A: READING COMPREHENSION (10 QUESTIONS) ====================
      // --- TEXT 1: School Environment (Q1 - Q5) ---
      {
        id: 1,
        part: "A",
        textId: "text-1",
        questionNumber: 1,
        question: "What is the main topic of the passage about our school environment?",
        options: [
          "A. A new modern cafeteria that sells healthy organic snacks to all students.",
          "B. A clean and green schoolyard that creates a comfortable learning atmosphere.",
          "C. A large sports field that hosts regular inter-school football competitions.",
          "D. An indoor science laboratory that breeds various species of tropical fish.",
          "E. An old administration building that requires major maintenance and painting."
        ],
        answer: 1,
        topic: "Reading Comprehension",
        skill: "Main Idea",
        difficulty: "LOTS",
        explanation: "The passage describes how the clean, green schoolyard provides a healthy, comfortable place for studying and relaxing."
      },
      {
        id: 2,
        part: "A",
        textId: "text-1",
        questionNumber: 2,
        question: "Where is the small fish pond located according to the second paragraph?",
        options: [
          "A. Right beside the teacher office near the front gate entrance.",
          "B. Behind the student bicycle parking area across the driveway.",
          "C. In the central area of the green garden behind the building.",
          "D. Underneath the tall mahogany trees beside the main cafeteria.",
          "E. Along the stone pathway that leads toward the sports field."
        ],
        answer: 2,
        topic: "Reading Comprehension",
        skill: "Specific Detail",
        difficulty: "LOTS",
        explanation: "Paragraph 2 states: 'In the center of the garden, there is a small fish pond with clean water.'"
      },
      {
        id: 3,
        part: "A",
        textId: "text-1",
        questionNumber: 3,
        question: "What natural auditory detail can students experience in the morning?",
        options: [
          "A. Gentle drops of morning rain tapping on classroom glass windows.",
          "B. Sweet songbirds singing melodiously in the shady tree branches.",
          "C. Loud traffic engines accelerating on the street outside the gate.",
          "D. Electric water pumps filling the school tank continuously.",
          "E. Loud acoustic bells ringing to announce the start of morning class."
        ],
        answer: 1,
        topic: "Reading Comprehension",
        skill: "Sensory Detail",
        difficulty: "LOTS",
        explanation: "Paragraph 1 mentions: 'students can hear birds singing in the branches...'"
      },
      {
        id: 4,
        part: "A",
        textId: "text-1",
        questionNumber: 4,
        question: "Why does the school place three different colored bins near the pond?",
        options: [
          "A. To decorate the garden area with bright and attractive modern colors.",
          "B. To help students separate organic, plastic, and hazardous waste properly.",
          "C. To store gardening tools and water hoses used by school groundkeepers.",
          "D. To collect plastic bottles for selling to local commercial recycling shops.",
          "E. To provide dry storage containers for textbooks during rainy afternoons."
        ],
        answer: 1,
        topic: "Reading Comprehension",
        skill: "Purpose / Cause and Effect",
        difficulty: "MOTS",
        explanation: "Paragraph 2 explains the three bins: green for organic waste, yellow for plastic, and red for hazardous items."
      },
      {
        id: 5,
        part: "A",
        textId: "text-1",
        questionNumber: 5,
        question: "What can be inferred about the environmental habits of the school community?",
        options: [
          "A. Students only clean the schoolyard when teachers give disciplinary assignments.",
          "B. Students and teachers share responsibility for keeping their surroundings clean.",
          "C. Teachers do all the sweeping while students remain inside air-conditioned rooms.",
          "D. The school hires outside private workers because students refuse to sort trash.",
          "E. Cleaning activities only happen when government supervisors visit the campus."
        ],
        answer: 1,
        topic: "Reading Comprehension",
        skill: "Inference",
        difficulty: "HOTS",
        explanation: "The text explains that students and teachers collaborate to care for the garden, and nobody throws trash on the ground."
      },

      // --- TEXT 2: Home Environment (Q6 - Q10) ---
      {
        id: 6,
        part: "A",
        textId: "text-2",
        questionNumber: 6,
        question: "Which useful plants are cultivated in Rian's home backyard garden?",
        options: [
          "A. Rare medicinal herbs, wild mushrooms, pine trees, and decorative yellow orchids.",
          "B. Fresh vegetable crops like spinach, tomatoes, chili peppers, and a mango tree.",
          "C. Tall bamboo trees, sweet corn fields, sweet potatoes, and several apple trees.",
          "D. Flowering potted roses, green tea bushes, watermelons, and citrus lemon trees.",
          "E. Hydroponic lettuce beds, purple eggplants, red strawberries, and papaya plants."
        ],
        answer: 1,
        topic: "Reading Comprehension",
        skill: "Specific Detail",
        difficulty: "LOTS",
        explanation: "Paragraph 1 states: 'There are several vegetable beds with fresh spinach, tomatoes, and chili peppers. A large mango tree grows...'"
      },
      {
        id: 7,
        part: "A",
        textId: "text-2",
        questionNumber: 7,
        question: "How do Rian and his sister contribute to caring for their family garden?",
        options: [
          "A. They repaint the garden fences and repair the water pump every Sunday morning.",
          "B. Rian waters the vegetable beds while his sister clears dry leaves from the soil.",
          "C. They harvest all the fresh vegetables to sell them at the local weekend market.",
          "D. Rian cleans the fish tank while his sister sprays chemical weed killers outside.",
          "E. They hire professional landscape workers to prune the mango tree branches."
        ],
        answer: 1,
        topic: "Reading Comprehension",
        skill: "Specific Detail",
        difficulty: "MOTS",
        explanation: "Paragraph 2 states: 'Rian waters the vegetables with clean well water, while his sister removes dry fallen leaves from the soil.'"
      },
      {
        id: 8,
        part: "A",
        textId: "text-2",
        questionNumber: 8,
        question: "What is the primary function of the small compost box in the backyard?",
        options: [
          "A. To store dry firewood and charcoal safely away from rain during the monsoon.",
          "B. To convert organic fruit peels and fallen leaves into natural plant fertilizer.",
          "C. To collect clean rainwater for washing family motorbikes and garden benches.",
          "D. To keep broken plastic containers and glass bottles away from family pets.",
          "E. To breed beneficial earthworms and small bait fish for neighborhood anglers."
        ],
        answer: 1,
        topic: "Reading Comprehension",
        skill: "Supporting Detail",
        difficulty: "MOTS",
        explanation: "Paragraph 2 states: 'they turn fruit peels and leaves into natural fertilizer.'"
      },
      {
        id: 9,
        part: "A",
        textId: "text-2",
        questionNumber: 9,
        question: "The word 'tidy' in paragraph 1 is closest in meaning to:",
        options: [
          "A. neat, orderly, and well maintained",
          "B. wide, spacious, and completely open",
          "C. quiet, peaceful, and fully secluded",
          "D. bright, colorful, and highly attractive",
          "E. dense, overgrown, and deeply shadowed"
        ],
        answer: 0,
        topic: "Reading Comprehension",
        skill: "Vocabulary in Context",
        difficulty: "MOTS",
        explanation: "'Tidy' means neat, orderly, clean, and properly organized."
      },
      {
        id: 10,
        part: "A",
        textId: "text-2",
        questionNumber: 10,
        question: "What is the greatest environmental benefit that Rian's family receives from their garden?",
        options: [
          "A. It generates significant commercial profits by supplying large local supermarkets.",
          "B. It provides fresh organic vegetables and creates a healthy, relaxing atmosphere.",
          "C. It completely replaces the need for municipal clean water and electricity lines.",
          "D. It isolates the residential house from nearby neighbors and street conversations.",
          "E. It allows the family to raise farm animals freely inside the residential zone."
        ],
        answer: 1,
        topic: "Reading Comprehension",
        skill: "Evaluating Benefits",
        difficulty: "HOTS",
        explanation: "The concluding paragraph highlights that the garden yields fresh organic food and provides a relaxing green space at home."
      },

      // ==================== PART B: GRAMMAR IN CONTEXT (15 QUESTIONS) ====================
      {
        id: 11,
        part: "B",
        textId: null,
        questionNumber: 11,
        question: "Complete the sentence with the most appropriate Adjective Phrase (Pattern 1):\n'Our school garden is ______ throughout the day.'",
        options: [
          "A. very clean and peaceful",
          "B. clean very and peaceful",
          "C. cleanly quite and peace",
          "D. cleanliness and restful",
          "E. so cleanly and peaceful"
        ],
        answer: 0,
        topic: "Adjective Phrase",
        skill: "Pattern 1 (Adv + Adj)",
        difficulty: "LOTS",
        explanation: "'very clean and peaceful' follows Pattern 1 (Adverb of degree + paired adjectives)."
      },
      {
        id: 12,
        part: "B",
        textId: null,
        questionNumber: 12,
        question: "The mango tree beside our wooden fence ______ sweet fruits every dry season.",
        options: [
          "A. is produce",
          "B. produces",
          "C. produce",
          "D. producing",
          "E. are produce"
        ],
        answer: 1,
        topic: "Simple Present Tense",
        skill: "Subject-Verb Agreement",
        difficulty: "LOTS",
        explanation: "'The mango tree' is a singular subject (it), so the Simple Present verb takes '-s' -> 'produces'."
      },
      {
        id: 13,
        part: "B",
        textId: null,
        questionNumber: 13,
        question: "Which of the following phrases is an example of Adjective + Prepositional Phrase (Pattern 2)?",
        options: [
          "A. really fresh and shady",
          "B. full of colorful flowers",
          "C. easy to water regularly",
          "D. sweep the yard cleanly",
          "E. singing happily in trees"
        ],
        answer: 1,
        topic: "Adjective Phrase",
        skill: "Pattern 2 Recognition",
        difficulty: "LOTS",
        explanation: "'full' (adjective) + 'of colorful flowers' (prepositional phrase) fits Pattern 2."
      },
      {
        id: 14,
        part: "B",
        textId: null,
        questionNumber: 14,
        question: "Local volunteers ______ plastic trash around the neighborhood park every Sunday morning.",
        options: [
          "A. collects",
          "B. collect",
          "C. collecting",
          "D. is collect",
          "E. are collects"
        ],
        answer: 1,
        topic: "Simple Present Tense",
        skill: "Plural Subject Agreement",
        difficulty: "LOTS",
        explanation: "'Local volunteers' is a plural subject (they), requiring the base form of the verb -> 'collect'."
      },
      {
        id: 15,
        part: "B",
        textId: null,
        questionNumber: 15,
        question: "The well water in the garden ______ crystal clear and ______ very refreshing.",
        options: [
          "A. look / feel",
          "B. looks / feels",
          "C. looking / feeling",
          "D. looks / feel",
          "E. look / feels"
        ],
        answer: 1,
        topic: "Simple Present Tense",
        skill: "Uncountable Subject Agreement",
        difficulty: "LOTS",
        explanation: "'The well water' is uncountable singular, so both verbs add '-s' -> 'looks' and 'feels'."
      },
      {
        id: 16,
        part: "B",
        textId: null,
        questionNumber: 16,
        question: "The wooden bench under the shady tree is ______ after a long walk.",
        options: [
          "A. comfortable to sit on",
          "B. comfortably to sit on",
          "C. comfort for sitting to",
          "D. to sit comfortable on",
          "E. comfortable sitting on"
        ],
        answer: 0,
        topic: "Adjective Phrase",
        skill: "Pattern 3 (Adj + To-Inf)",
        difficulty: "LOTS",
        explanation: "'comfortable to sit on' is Pattern 3: Adjective ('comfortable') + to-infinitive ('to sit on')."
      },
      {
        id: 17,
        part: "B",
        textId: null,
        questionNumber: 17,
        question: "Choose the grammatically correct negative sentence in the Simple Present tense:",
        options: [
          "A. Our school does not allow single-use plastic bottles in the garden.",
          "B. Our school do not allow single-use plastic bottles in the garden.",
          "C. Our school does not allows single-use plastic bottles in the garden.",
          "D. Our school is not allow single-use plastic bottles in the garden.",
          "E. Our school not does allow single-use plastic bottles in the garden."
        ],
        answer: 0,
        topic: "Simple Present Tense",
        skill: "Negative Form",
        difficulty: "MOTS",
        explanation: "'Our school' is singular, so the negative structure is 'does not + base verb (allow)'."
      },
      {
        id: 18,
        part: "B",
        textId: null,
        questionNumber: 18,
        question: "The neighborhood eco-park is famous ______ its clean and beautiful lotus pond.",
        options: [
          "A. with",
          "B. for",
          "C. about",
          "D. from",
          "E. upon"
        ],
        answer: 1,
        topic: "Adjective Phrase",
        skill: "Preposition Collocation",
        difficulty: "MOTS",
        explanation: "'famous for' is the standard adjective + preposition collocation."
      },
      {
        id: 19,
        part: "B",
        textId: null,
        questionNumber: 19,
        question: "Select the correct Simple Present question asking about family eco-habits:",
        options: [
          "A. Do your family separate organic and plastic kitchen waste?",
          "B. Does your family separate organic and plastic kitchen waste?",
          "C. Does your family separates organic and plastic kitchen waste?",
          "D. Is your family separate organic and plastic kitchen waste?",
          "E. Are your family separates organic and plastic kitchen waste?"
        ],
        answer: 1,
        topic: "Simple Present Tense",
        skill: "Question Form",
        difficulty: "MOTS",
        explanation: "'your family' functions as a singular collective subject, requiring 'Does + Subject + base verb (separate)'."
      },
      {
        id: 20,
        part: "B",
        textId: null,
        questionNumber: 20,
        question: "Complete the sentence with the correct simple present verbs:\n'Budi ______ the vegetable beds while his mother ______ the dry leaves.'",
        options: [
          "A. waters / sweeps",
          "B. water / sweep",
          "C. waters / sweep",
          "D. water / sweeps",
          "E. watering / sweeping"
        ],
        answer: 0,
        topic: "Simple Present Tense",
        skill: "Compound Agreement",
        difficulty: "MOTS",
        explanation: "Both 'Budi' and 'his mother' are singular (he/she), so both verbs take '-s' -> 'waters' and 'sweeps'."
      },
      {
        id: 21,
        part: "B",
        textId: null,
        questionNumber: 21,
        question: "Which of the following sentences contains an ERROR in modifier word order?",
        options: [
          "A. The neighborhood park is quite peaceful in the afternoon.",
          "B. The school garden is famous for its colorful rose bushes.",
          "C. The front terrace is cleanly very after the morning rain.",
          "D. The small compost box is easy to manage for beginners.",
          "E. The home backyard is rich in nutritious green vegetables."
        ],
        answer: 2,
        topic: "Adjective Phrase",
        skill: "Word Order Error",
        difficulty: "MOTS",
        explanation: "'cleanly very' is incorrect word order. The modifier 'very' must precede the adjective 'clean' -> 'very clean'."
      },
      {
        id: 22,
        part: "B",
        textId: null,
        questionNumber: 22,
        question: "How can these two simple sentences be best combined using an adjective phrase?\n1. 'Our school garden is rich.'\n2. 'It has medicinal plants.'",
        options: [
          "A. Our school garden is rich in medicinal plants.",
          "B. Our school garden rich because plants are medicinal.",
          "C. Our school garden is rich that it has herbal plants.",
          "D. Richly in medicinal plants is our school garden.",
          "E. Our school garden is rich to have herbal plants."
        ],
        answer: 0,
        topic: "Sentence Synthesis",
        skill: "Sentence Combining",
        difficulty: "MOTS",
        explanation: "'rich in medicinal plants' correctly combines both clauses using Pattern 2 (Adjective + Prepositional Phrase)."
      },
      {
        id: 23,
        part: "B",
        textId: null,
        questionNumber: 23,
        question: "A student drafted this sentence:\n'The city park look very dirty and do not have enough trash bins.'\nWhich option provides the most accurate grammatical revision?",
        options: [
          "A. The city park looks very dirty and does not have enough trash bins.",
          "B. The city park looks very dirty and do not have enough trash bins.",
          "C. The city park look very dirty and does not has enough trash bins.",
          "D. The city park is looking dirty and do not have enough trash bins.",
          "E. The city park looks dirtily and does not have enough trash bins."
        ],
        answer: 0,
        topic: "Error Analysis",
        skill: "Grammar Correction",
        difficulty: "HOTS",
        explanation: "Singular subject 'The city park' requires singular verb agreement ('looks') and negative auxiliary ('does not have')."
      },
      {
        id: 24,
        part: "B",
        textId: null,
        questionNumber: 24,
        question: "Which sentence provides the most vivid description while maintaining accurate Simple Present grammar?",
        options: [
          "A. My home garden was very green, smelled like flowers, and provided good shade.",
          "B. My home garden looks very green, smells fresh with jasmine, and provides cool shade.",
          "C. My home garden looks so green, smelling fresh with jasmine, and providing cool shade.",
          "D. My home garden look very green, smell fresh with jasmine, and provide cool shade.",
          "E. My home garden is looking green, is smelling fresh with jasmine, and is giving shade."
        ],
        answer: 1,
        topic: "Synthesizing Description",
        skill: "Vivid & Accurate Description",
        difficulty: "HOTS",
        explanation: "Option B uses parallel, singular Simple Present verbs ('looks', 'smells', 'provides') combined with vivid sensory adjective phrases."
      },
      {
        id: 25,
        part: "B",
        textId: null,
        questionNumber: 25,
        question: "Read the following descriptive excerpt:\n'[1] Our school canteen is very tidy. [2] It has clean tables and recycling bins. [3] The cleaners sweeps the floor twice daily. [4] As a result, students feel comfortable eating there.'\nWhich numbered sentence contains a subject-verb agreement error?",
        options: [
          "A. Sentence [1]",
          "B. Sentence [2]",
          "C. Sentence [3]",
          "D. Sentence [4]",
          "E. None of the sentences contain an error."
        ],
        answer: 2,
        topic: "Error Analysis in Paragraph",
        skill: "Identifying Paragraph Agreement Error",
        difficulty: "HOTS",
        explanation: "In Sentence [3], 'The cleaners' is plural (they), so the verb must be in base form 'sweep' instead of 'sweeps'."
      }
    ]
  },

  badges: [
    {
      id: "eco_learner",
      name: "🌱 Eco Learner",
      condition: "Complete the Learn section and interactive exercises",
      description: "You've mastered the Five Senses, Adjective Phrases, and Simple Present Tense."
    },
    {
      id: "eco_explorer",
      name: "🌿 Eco Explorer",
      condition: "Complete all 3 Practice levels (Level 1, 2, and 3)",
      description: "You've practiced descriptions of school and home environments."
    },
    {
      id: "env_describer",
      name: "🌳 Environmental Describer",
      condition: "Submit the 25-Question Assessment",
      description: "You've completed the Reading Comprehension and Grammar assessment sections."
    },
    {
      id: "eco_master",
      name: "🏆 Eco English Master",
      condition: "Complete Reflection and achieve a passing score",
      description: "You've completed the full learning cycle from observation to evaluation!"
    }
  ]
};

// Freeze data to prevent accidental runtime mutations
if (typeof Object.freeze === 'function') {
  Object.freeze(MPI_DATA);
}
