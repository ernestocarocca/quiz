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
    },
    {
      id: 'html-4',
      type: 'boolean',
      text: 'En <div> är ett semantiskt HTML-element.',
      correctAnswer: false
    },
    {
      id: 'html-5',
      type: 'single',
      text: 'Vilket attribut används för att länka en CSS-fil till HTML?',
      options: ['src', 'href', 'link', 'style'],
      correctAnswer: 1
    },
    {
      id: 'html-6',
      type: 'boolean',
      text: 'HTML5 är den senaste versionen av HTML.',
      correctAnswer: true
    },
    {
      id: 'html-7',
      type: 'single',
      text: 'Vilket element används för att skapa en ordnad lista?',
      options: ['<ul>', '<ol>', '<li>', '<list>'],
      correctAnswer: 1
    },
    {
      id: 'html-8',
      type: 'multiple',
      text: 'Vilka av följande är giltiga HTML-attribut?',
      options: ['class', 'id', 'banana', 'data-value'],
      correctAnswer: [0, 1, 3]
    },
    {
      id: 'html-9',
      type: 'boolean',
      text: '<img> elementet behöver en stängningstagg.',
      correctAnswer: false
    },
    {
      id: 'html-10',
      type: 'single',
      text: 'Vilket element används för att definiera en tabell?',
      options: ['<table>', '<grid>', '<data>', '<list>'],
      correctAnswer: 0
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
    },
    {
      id: 'js-4',
      type: 'boolean',
      text: 'JavaScript är samma sak som Java.',
      correctAnswer: false
    },
    {
      id: 'js-5',
      type: 'single',
      text:
        'Vilket nyckelord används för att deklarera en konstant i JavaScript?',
      options: ['var', 'let', 'const', 'constant'],
      correctAnswer: 2
    },
    {
      id: 'js-6',
      type: 'boolean',
      text: 'En arrow function skrivs med => syntax.',
      correctAnswer: true
    },
    {
      id: 'js-7',
      type: 'single',
      text: 'Vad returnerar typeof null?',
      options: ['null', 'undefined', 'object', 'number'],
      correctAnswer: 2
    },
    {
      id: 'js-8',
      type: 'multiple',
      text: 'Vilka av följande är JavaScript datatyper?',
      options: ['string', 'boolean', 'integer', 'undefined'],
      correctAnswer: [0, 1, 3]
    },
    {
      id: 'js-9',
      type: 'boolean',
      text: '== och === gör exakt samma sak i JavaScript.',
      correctAnswer: false
    },
    {
      id: 'js-10',
      type: 'single',
      text:
        'Vilken metod används för att lägga till ett element i slutet av en array?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      correctAnswer: 0
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
    },
    {
      id: 'web-4',
      type: 'boolean',
      text: 'HTTP står för HyperText Transfer Protocol.',
      correctAnswer: true
    },
    {
      id: 'web-5',
      type: 'single',
      text: 'Vilken HTTP-metod används vanligtvis för att hämta data?',
      options: ['POST', 'GET', 'PUT', 'DELETE'],
      correctAnswer: 1
    },
    {
      id: 'web-6',
      type: 'boolean',
      text: 'HTTPS är säkrare än HTTP.',
      correctAnswer: true
    },
    {
      id: 'web-7',
      type: 'single',
      text: 'Vad betyder API?',
      options: [
        'Application Programming Interface',
        'Advanced Programming Input',
        'Automatic Protocol Integration',
        'Application Process Integration'
      ],
      correctAnswer: 0
    },
    {
      id: 'web-8',
      type: 'multiple',
      text: 'Vilka av följande är CSS-preprocessorer?',
      options: ['SASS', 'LESS', 'JSON', 'Stylus'],
      correctAnswer: [0, 1, 3]
    },
    {
      id: 'web-9',
      type: 'boolean',
      text: 'En cookie lagras på servern.',
      correctAnswer: false
    },
    {
      id: 'web-10',
      type: 'single',
      text:
        'Vilket protokoll använder webbläsare som standard för säker kommunikation?',
      options: ['FTP', 'HTTPS', 'SSH', 'SMTP'],
      correctAnswer: 1
    }
  ]
}
