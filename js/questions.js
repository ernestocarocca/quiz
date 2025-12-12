export const CATEGORIES = ['html', 'javascript', 'web']

export const QUESTIONS_BY_CATEGORY = {
  html: [
    {
      id: 'html-1',
      type: 'boolean',
      text: 'HTML står för HyperText Markup Language.',
      correctAnswer: true
    },
    {
      id: 'html-2',
      type: 'single',
      text: 'Vilket HTML-element används för att skapa ett formulär?',
      options: ['<input>', '<form>', '<section>', '<label>'],
      correctAnswer: 1
    },
    {
      id: 'html-3',
      type: 'multiple',
      text: 'Vilka av följande är semantiska HTML-element?',
      options: ['<header>', '<footer>', '<banana>', '<article>'],
      correctAnswer: [0, 1, 3]
    }
  ],

  javascript: [
    {
      id: 'js-1',
      type: 'boolean',
      text: 'JavaScript kan köras i webbläsaren.',
      correctAnswer: true
    },
    {
      id: 'js-2',
      type: 'single',
      text: 'Vad betyder förkortningen DRY i programmering?',
      options: [
        'Don’t Repeat Yourself',
        'Do Run Yesterday',
        'Data Runtime Yield',
        'Dynamic Render Yield'
      ],
      correctAnswer: 0
    },
    {
      id: 'js-3',
      type: 'multiple',
      text: 'Vilka av följande är logiska operatorer i JavaScript?',
      options: ['&&', '||', '===', '++'],
      correctAnswer: [0, 1, 2]
    }
  ],

  web: [
    {
      id: 'web-1',
      type: 'boolean',
      text: 'CSS används för att styla HTML.',
      correctAnswer: true
    },
    {
      id: 'web-2',
      type: 'single',
      text: 'Vilken av dessa är INTE en webbläsare?',
      options: ['Chrome', 'Firefox', 'Safari', 'Linux'],
      correctAnswer: 3
    },
    {
      id: 'web-3',
      type: 'multiple',
      text: 'Vilka av följande är exempel på frontend-tekniker?',
      options: ['HTML', 'CSS', 'Node.js', 'JavaScript'],
      correctAnswer: [0, 1, 3]
    }
  ]
}
