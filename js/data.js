/**
 * MASTER DATA MODULE - MPI DESCRIBING PLACES (REVISED FOR GRADE XI)
 * Developer: Muhammad Falahaen Jiddan, M.Pd.,Gr.
 * Target: Senior High School Grade XI English
 * Theme: Environmental Awareness (School & Home Surroundings)
 * Vocabulary: Simple, clear, and student-friendly
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
    subtitle: "Look at our school garden and neighborhood environment. Click each sense to discover simple observations.",
    imageDescription: "A clean and green school garden with shady trees, colorful flowers, neat stone pathways, recycling bins, and small wooden benches.",
    senses: {
      see: {
        name: "SEE (Sight)",
        icon: "👀",
        color: "emerald",
        badge: "Visual Details",
        description: "What objects, colors, and clean areas can you see?",
        items: [
          { text: "Tall green trees with shady leaves", tag: "Trees & Plants" },
          { text: "Bright yellow and red flowers", tag: "Garden Flora" },
          { text: "Clean walking paths without plastic trash", tag: "Schoolyard" },
          { text: "Green and yellow recycling bins", tag: "Waste Sorting" },
          { text: "Small wooden benches for resting", tag: "Facilities" }
        ]
      },
      hear: {
        name: "HEAR (Sound)",
        icon: "👂",
        color: "teal",
        badge: "Sound Details",
        description: "What peaceful natural sounds can you hear?",
        items: [
          { text: "Small birds singing in the morning", tag: "Birds" },
          { text: "Leaves moving gently in the wind", tag: "Breeze" },
          { text: "Water flowing from the small garden fountain", tag: "Water" },
          { text: "Students talking politely under the tree", tag: "School Life" }
        ]
      },
      smell: {
        name: "SMELL (Scent)",
        icon: "👃",
        color: "sky",
        badge: "Scent Details",
        description: "What fresh and natural scents are in the air?",
        items: [
          { text: "Fresh and clean morning air", tag: "Fresh Air" },
          { text: "Sweet smell of jasmine flowers", tag: "Flowers" },
          { text: "Wet soil after the morning rain", tag: "Earth" },
          { text: "Fresh aroma of green grass", tag: "Grass" }
        ]
      },
      feel: {
        name: "FEEL (Touch)",
        icon: "✋",
        color: "indigo",
        badge: "Touch & Temperature",
        description: "What temperatures and textures can you feel?",
        items: [
          { text: "Cool breeze under the big trees", tag: "Temperature" },
          { text: "Soft green grass under our shoes", tag: "Texture" },
          { text: "Warm morning sunshine on our skin", tag: "Sunlight" },
          { text: "Smooth wooden surface of the bench", tag: "Furniture" }
        ]
      },
      taste: {
        name: "TASTE (Contextual)",
        icon: "👅",
        color: "amber",
        badge: "Contextual (Edible Plants)",
        description: "Taste applies when the place has edible fruits, clean water, or garden vegetables.",
        items: [
          { text: "Sweet taste of ripe mangoes from the backyard tree", tag: "Fruit" },
          { text: "Crisp and fresh taste of school garden spinach", tag: "Vegetables" },
          { text: "Cool and refreshing taste of clean drinking water", tag: "Clean Water" }
        ]
      }
    },
    quickCheckPrompt: {
      question: "Which sensory observation best describes a clean and healthy school garden?",
      options: [
        "A. Thick black smoke from burning trash",
        "B. Chirping birds, sweet flower scent, and shady green trees",
        "C. Dirty plastic bags scattered on the ground",
        "D. Loud motorbike noise from the street"
      ],
      correct: 1,
      explanation: "Chirping birds (Hearing), sweet flower scent (Smelling), and shady green trees (Seeing) are positive sensory details of a healthy green garden."
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
        explanation: "'very' is an adverb of degree and 'clean' is an adjective."
      },
      {
        id: 2,
        sentence: "The backyard is [full of green plants].",
        phrase: "full of green plants",
        pattern: "Pattern 2 (Adjective + Prepositional Phrase)",
        explanation: "'full' is an adjective followed by the prepositional phrase 'of green plants'."
      },
      {
        id: 3,
        sentence: "The neighborhood park is [pleasant to visit] in the afternoon.",
        phrase: "pleasant to visit",
        pattern: "Pattern 3 (Adjective + To-Infinitive)",
        explanation: "'pleasant' is an adjective followed by 'to visit' (to-infinitive)."
      },
      {
        id: 4,
        sentence: "Our schoolyard is [famous for its shady trees].",
        phrase: "famous for its shady trees",
        pattern: "Pattern 2 (Adjective + Prepositional Phrase)",
        explanation: "'famous' is an adjective followed by 'for its shady trees'."
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
          "C. easy to clean",
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

    // EXACTLY 25 QUESTIONS:
    // Part A: Reading Comprehension (10 Qs) -> Text 1 (Q1-5), Text 2 (Q6-10)
    // Part B: Grammar in Context (15 Qs) -> Adjective Phrases & Simple Present (Q11-25)
    // Level Distribution: LOTS = 10 Qs (40%), MOTS = 10 Qs (40%), HOTS = 5 Qs (20%)
    questions: [
      // ==================== PART A: READING COMPREHENSION (10 QUESTIONS) ====================
      // --- TEXT 1 (Q1 - Q5) ---
      {
        id: 1,
        part: "A",
        textId: "text-1",
        questionNumber: 1,
        question: "What is the text mainly about?",
        options: [
          "A. The history of building a school library",
          "B. A clean and green schoolyard that creates a comfortable learning environment",
          "C. How to sell goldfish to local pet shops",
          "D. The difficult tests given by high school teachers",
          "E. The traffic noise in front of the school gate"
        ],
        answer: 1,
        topic: "Reading Comprehension",
        skill: "Main Idea",
        difficulty: "LOTS",
        explanation: "The text describes the green schoolyard, its clean conditions, and its positive impact on students."
      },
      {
        id: 2,
        part: "A",
        textId: "text-1",
        questionNumber: 2,
        question: "Where is the small fish pond located?",
        options: [
          "A. Outside the main school gate",
          "B. Inside the teachers' office",
          "C. In the center of the school garden",
          "D. On the roof of the classroom building",
          "E. Under the parking lot"
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
        question: "What sensory detail can students hear in the morning?",
        options: [
          "A. Loud truck sirens from the road",
          "B. Birds singing in the tree branches",
          "C. Heavy factory machines operating",
          "D. Thunderstorms and lightning strikes",
          "E. Shouting from outside the school"
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
        question: "Why does the school provide three colored bins in the garden?",
        options: [
          "A. To paint the benches with different colors",
          "B. To help students separate organic, plastic, and hazardous waste",
          "C. To feed the goldfish in the pond",
          "D. To store school books during the rainy season",
          "E. To catch wild birds in the trees"
        ],
        answer: 1,
        topic: "Reading Comprehension",
        skill: "Cause and Effect / Purpose",
        difficulty: "MOTS",
        explanation: "Paragraph 2 explains the three bins: green for organic, yellow for plastic, and red for hazardous waste."
      },
      {
        id: 5,
        part: "A",
        textId: "text-1",
        questionNumber: 5,
        question: "What can we conclude about the students' environmental habits at this school?",
        options: [
          "A. Students regularly litter under the trees.",
          "B. Students care about cleanliness and actively maintain their green schoolyard.",
          "C. Students avoid visiting the garden during break time.",
          "D. Students do not know how to sort plastic waste.",
          "E. Students prefer studying in a dirty room."
        ],
        answer: 1,
        topic: "Reading Comprehension",
        skill: "Inference",
        difficulty: "HOTS",
        explanation: "The text explains that nobody litters, and students and teachers work together to maintain the clean space."
      },

      // --- TEXT 2 (Q6 - Q10) ---
      {
        id: 6,
        part: "A",
        textId: "text-2",
        questionNumber: 6,
        question: "What does Rian's family grow in their home backyard?",
        options: [
          "A. Only tall pine trees for sale",
          "B. Vegetables like spinach, tomatoes, chili peppers, and a mango tree",
          "C. Dangerous wild grass and weeds",
          "D. Industrial plastic plants",
          "E. Rice fields on the roof"
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
        question: "What does Rian do to help take care of the garden in the afternoon?",
        options: [
          "A. He cuts down all the vegetable plants.",
          "B. He waters the vegetables with clean well water.",
          "C. He throws plastic wrappers under the tree.",
          "D. He plays loud music in the garden.",
          "E. He sells the soil to his neighbors."
        ],
        answer: 1,
        topic: "Reading Comprehension",
        skill: "Specific Detail",
        difficulty: "MOTS",
        explanation: "Paragraph 2 states: 'Rian waters the vegetables with clean well water...'"
      },
      {
        id: 8,
        part: "A",
        textId: "text-2",
        questionNumber: 8,
        question: "In paragraph 2, what do Rian and his family use the compost box for?",
        options: [
          "A. To burn plastic bottles safely",
          "B. To turn fruit peels and fallen leaves into natural fertilizer",
          "C. To keep pet fish and turtles",
          "D. To store dry clothes during the rain",
          "E. To collect rainwater for washing motorbikes"
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
          "A. neat and well organized",
          "B. very dirty and messy",
          "C. dangerous and dark",
          "D. dry and empty",
          "E. hot and crowded"
        ],
        answer: 0,
        topic: "Reading Comprehension",
        skill: "Vocabulary in Context",
        difficulty: "MOTS",
        explanation: "'Tidy' means neat, clean, and well arranged."
      },
      {
        id: 10,
        part: "A",
        textId: "text-2",
        questionNumber: 10,
        question: "What is the main benefit of having a clean home garden for Rian's family?",
        options: [
          "A. It makes the house noisy and crowded.",
          "B. It provides fresh organic vegetables and a healthy, relaxing green space.",
          "C. It invites mosquitoes and bad odors into the house.",
          "D. It prevents the family from spending time outdoors.",
          "E. It replaces all the furniture inside the living room."
        ],
        answer: 1,
        topic: "Reading Comprehension",
        skill: "Evaluating Benefits",
        difficulty: "HOTS",
        explanation: "The final paragraph emphasizes that the garden provides fresh vegetables and a relaxing green home space."
      },

      // ==================== PART B: GRAMMAR IN CONTEXT (15 QUESTIONS: Q11 - Q25) ====================
      {
        id: 11,
        part: "B",
        textId: null,
        questionNumber: 11,
        question: "Complete the sentence with the correct Adjective Phrase:\n'Our school garden is ______ every afternoon.'",
        options: [
          "A. very clean and comfortable",
          "B. cleanly very and comfort",
          "C. very cleanly and comfortable",
          "D. clean very and comfortably",
          "E. cleanliness and comfort"
        ],
        answer: 0,
        topic: "Adjective Phrase",
        skill: "Pattern 1 (Adv + Adj)",
        difficulty: "LOTS",
        explanation: "'very clean and comfortable' is an accurate adjective phrase (Adverb + Adjectives)."
      },
      {
        id: 12,
        part: "B",
        textId: null,
        questionNumber: 12,
        question: "The mango tree in our backyard ______ sweet fruits every year.",
        options: [
          "A. produce",
          "B. produces",
          "C. producing",
          "D. are produce",
          "E. product"
        ],
        answer: 1,
        topic: "Simple Present Tense",
        skill: "Subject-Verb Agreement",
        difficulty: "LOTS",
        explanation: "'The mango tree' is a singular subject (it), so the verb takes '-s' -> 'produces'."
      },
      {
        id: 13,
        part: "B",
        textId: null,
        questionNumber: 13,
        question: "Which of the following phrases is an Adjective + Prepositional Phrase (Pattern 2)?",
        options: [
          "A. very green",
          "B. full of colorful flowers",
          "C. easy to water",
          "D. sweep quickly",
          "E. singing sweetly"
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
        question: "Local volunteers ______ plastic trash around the neighborhood park every Sunday.",
        options: [
          "A. collects",
          "B. collect",
          "C. collecting",
          "D. is collect",
          "E. collector"
        ],
        answer: 1,
        topic: "Simple Present Tense",
        skill: "Plural Subject Agreement",
        difficulty: "LOTS",
        explanation: "'Local volunteers' is a plural subject (they), which takes the base verb 'collect'."
      },
      {
        id: 15,
        part: "B",
        textId: null,
        questionNumber: 15,
        question: "The water in the small river ______ clear and ______ fresh.",
        options: [
          "A. look / feel",
          "B. looks / feels",
          "C. looking / feeling",
          "D. look / feels",
          "E. looks / feel"
        ],
        answer: 1,
        topic: "Simple Present Tense",
        skill: "Uncountable Subject Agreement",
        difficulty: "LOTS",
        explanation: "'The water' is uncountable singular, so both verbs add '-s' -> 'looks' and 'feels'."
      },
      {
        id: 16,
        part: "B",
        textId: null,
        questionNumber: 16,
        question: "The wooden bench under the tree is ______ for resting.",
        options: [
          "A. comfortable to use",
          "B. comfortably to use",
          "C. comfort to using",
          "D. comfortable for use to",
          "E. to use comfortable is"
        ],
        answer: 0,
        topic: "Adjective Phrase",
        skill: "Pattern 3 (Adj + To-Inf)",
        difficulty: "LOTS",
        explanation: "'comfortable to use' is Pattern 3: Adjective ('comfortable') + to-infinitive ('to use')."
      },
      {
        id: 17,
        part: "B",
        textId: null,
        questionNumber: 17,
        question: "Choose the correct negative sentence in the Simple Present tense:",
        options: [
          "A. Our school does not allow plastic waste in the garden.",
          "B. Our school do not allow plastic waste in the garden.",
          "C. Our school does not allows plastic waste in the garden.",
          "D. Our school is not allow plastic waste in the garden.",
          "E. Our school not allow plastic waste in the garden."
        ],
        answer: 0,
        topic: "Simple Present Tense",
        skill: "Negative Form",
        difficulty: "MOTS",
        explanation: "'Our school' (singular) takes 'does not + base verb (allow)'."
      },
      {
        id: 18,
        part: "B",
        textId: null,
        questionNumber: 18,
        question: "Complete the sentence with the correct preposition:\n'The city park is famous ______ its clean lotus pond.'",
        options: [
          "A. with",
          "B. for",
          "C. in",
          "D. at",
          "E. to"
        ],
        answer: 1,
        topic: "Adjective Phrase",
        skill: "Preposition Collocation",
        difficulty: "MOTS",
        explanation: "'famous for' is the correct standard adjective + preposition phrase."
      },
      {
        id: 19,
        part: "B",
        textId: null,
        questionNumber: 19,
        question: "______ your family clean the house yard every weekend?",
        options: [
          "A. Do",
          "B. Does",
          "C. Is",
          "D. Are",
          "E. Doing"
        ],
        answer: 1,
        topic: "Simple Present Tense",
        skill: "Question Form",
        difficulty: "MOTS",
        explanation: "'your family' is singular, so the question begins with 'Does + Subject + V1'."
      },
      {
        id: 20,
        part: "B",
        textId: null,
        questionNumber: 20,
        question: "Complete the sentence with the correct simple present verbs:\n'Budi ______ the flowers while his mother ______ the dry leaves.'",
        options: [
          "A. waters / sweeps",
          "B. water / sweep",
          "C. watering / sweeping",
          "D. waters / sweep",
          "E. water / sweeps"
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
        question: "Which sentence has an ERROR in word order?",
        options: [
          "A. The home garden is very clean and green.",
          "B. The schoolyard is full of shady trees.",
          "C. The front porch is cleanly very in the morning.",
          "D. The flower pot is easy to move.",
          "E. The backyard is famous for its sweet fruits."
        ],
        answer: 2,
        topic: "Adjective Phrase",
        skill: "Word Order Error",
        difficulty: "MOTS",
        explanation: "'cleanly very' is incorrect. The adverb 'very' must come before the adjective 'clean' -> 'very clean'."
      },
      {
        id: 22,
        part: "B",
        textId: null,
        questionNumber: 22,
        question: "How can these two simple sentences be best combined?\n1. 'Our school garden is rich.'\n2. 'It has medicinal plants.'",
        options: [
          "A. Our school garden is rich in medicinal plants.",
          "B. Our school garden rich because plants are medicinal.",
          "C. Our school garden is rich that medicinal plants.",
          "D. Rich is our school garden to have plants.",
          "E. Our school garden is richly medicinal plants."
        ],
        answer: 0,
        topic: "Sentence Synthesis",
        skill: "Sentence Combining",
        difficulty: "MOTS",
        explanation: "'rich in medicinal plants' correctly combines both sentences using Adjective Phrase Pattern 2."
      },
      {
        id: 23,
        part: "B",
        textId: null,
        questionNumber: 23,
        question: "A student wrote:\n'The city park look very dirty and do not have enough trash bins.'\nWhich revision fixes all grammatical errors?",
        options: [
          "A. The city park looks very dirty and does not have enough trash bins.",
          "B. The city park looks very dirty and do not have enough trash bins.",
          "C. The city park look very dirty and does not has enough trash bins.",
          "D. The city park is look dirty and does not have trash bins.",
          "E. The city park looks dirtily and do not have trash bins."
        ],
        answer: 0,
        topic: "Error Analysis",
        skill: "Grammar Correction",
        difficulty: "HOTS",
        explanation: "'The city park' is singular, so it requires 'looks' and 'does not have'."
      },
      {
        id: 24,
        part: "B",
        textId: null,
        questionNumber: 24,
        question: "Which of the following sentences best describes a home garden using both sensory details and correct Simple Present tense?",
        options: [
          "A. My home garden was very green yesterday morning.",
          "B. My home garden looks very green, smells fresh with jasmine flowers, and provides a peaceful place to relax.",
          "C. My home garden looking green and smelling good always.",
          "D. My home garden look green and have many flower.",
          "E. My home garden are green and students like it."
        ],
        answer: 1,
        topic: "Synthesizing Description",
        skill: "Vivid & Accurate Description",
        difficulty: "HOTS",
        explanation: "Option B combines sensory verbs (looks, smells), adjective phrases (very green, fresh), and correct singular agreement (looks, smells, provides)."
      },
      {
        id: 25,
        part: "B",
        textId: null,
        questionNumber: 25,
        question: "Read the excerpt:\n'[1] Our school canteen is very clean. [2] It has neat tables and recycling bins. [3] The cleaners sweeps the floor twice a day. [4] As a result, students feel comfortable eating there.'\nWhich sentence contains a grammatical error in subject-verb agreement?",
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
        explanation: "In Sentence [3], 'The cleaners' is plural (they), so the verb should be 'sweep' instead of 'sweeps'."
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
