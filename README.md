# 🎓 Ankademin Quiz

An interactive quiz project built with vanilla JavaScript, HTML and CSS. Test your knowledge in HTML, JavaScript and web development!

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Question Categories](#question-categories)

## ✨ Features

- 🎨 **Modern UI** with gradient design and animations
- 🌓 **Dark mode** - Toggle between light and dark theme
- 📊 **Three categories** - HTML, JavaScript and Web
- ❓ **Different question types**:
  - Boolean (True/False)
  - Single choice (One correct answer)
  - Multiple choice (Multiple correct answers)
- 📈 **Progress bar** - Track your progress
- 🎯 **Result summary** - Detailed feedback after the quiz
- 📱 **Responsive design** - Works on mobile, tablet and desktop

## 📁 Project Structure

```
quiz/
├── index.html              # Main file with HTML structure
├── css/
│   └── styles.css         # All styling and animations
├── js/
│   ├── questions.js       # Questions and categories
│   ├── quizEngine.js      # Quiz logic and state management
│   ├── templates.js       # HTML rendering functions
│   └── ui.js              # UI handling and event listeners
└── README.md              # This file
```

## 🚀 Installation

1. Clone or download the project:
```bash
git clone <repository-url>
cd quiz
```

2. Open `index.html` in a web browser:
```bash
open index.html
# or
python3 -m http.server 8000
```

3. Start quizzing!

## 🎮 Usage

1. **Select category** - Click on one of the three categories (HTML, JavaScript or Web)
2. **Start quiz** - Press the "Starta quiz" button
3. **Answer questions** - Select your answer and click "Nästa"
4. **View results** - After all questions you get a detailed result summary
5. **Try again** - Choose to run the same category again or switch category

## 🛠️ Technologies

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with:
  - CSS Grid & Flexbox
  - CSS Variables (`:root`)
  - Animations and transitions
  - Gradient backgrounds
  - Dark mode support
- **JavaScript (ES6+)** - Vanilla JS with:
  - ES6 Modules
  - Arrow functions
  - Template literals
  - Array methods (map, filter, etc.)
  - Classes

### Libraries
- **Bootstrap 5.3.2** - UI components and grid
- **Bootstrap Icons** - Icons

## 📚 Question Categories

### HTML
10 questions about HTML syntax, semantic elements, attributes and structure.

### JavaScript
10 questions about JavaScript syntax, data types, operators and methods.

### Web
10 questions about web development, HTTP, APIs and frontend technologies.

## 🎨 Design Choices

- **Gradient color scheme** - Purple/pink gradient for modern look
- **Card-based layout** - Clear separation of content
- **Hover effects** - Interactive feedback on all clickable elements
- **Animations** - Smooth transitions for better UX
- **Accessibility** - Semantic HTML and keyboard navigation

## 📝 File Descriptions

### `index.html`
Contains the entire application's HTML structure with three main sections:
- Category selection
- Quiz view
- Results view

### `css/styles.css`
All styling including:
- CSS variables for colors and shadows
- Responsive design
- Dark mode styles
- Animations and transitions

### `js/questions.js`
Exports:
- `CATEGORIES` - Array with category names
- `QUESTIONS_BY_CATEGORY` - Object with all questions per category

### `js/quizEngine.js`
`QuizEngine` class that handles:
- Quiz state (current question, user's answers)
- Answer validation
- Result calculation

### `js/templates.js`
Functions for rendering HTML:
- `renderQuestionHtml()` - Renders a question
- `renderResultsHtml()` - Renders results page

### `js/ui.js`
Main file for UI logic:
- DOM manipulation
- Event listeners
- Navigation between views
- Theme toggle (dark/light mode)

## 🔄 Quiz Flow

```
Select category → Start quiz → Question 1 → ... → Question 10 → Results → Try again / Change category
```

## 🎯 Future Improvements

- [ ] Add more categories (CSS, React, Node.js, etc.)
- [ ] Save high scores in localStorage
- [ ] Add difficulty levels
- [ ] Randomize question order
- [ ] Add sound effects
- [ ] Multiplayer mode

## 👨‍💻 Developer

Developed as part of the Frontend Education at Nackademin.

## 📄 License

This project is created for educational purposes.

---

**Good luck with the quiz! 🚀**
