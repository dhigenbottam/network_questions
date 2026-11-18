# Computing Quests

A collection of multiple-choice computing quizzes for students. The site is static: there is no build step, server, or external JavaScript dependency.

## Run locally

Open `index.html` in a web browser. The landing page links to each quiz.

## Add another quiz

1. Make a folder for the quiz, such as `biology/`.
2. Add an `index.html` in that folder using the quiz page structure and an embedded `quiz-questions` JSON script element.
3. Link the shared stylesheet and quiz engine with `../styles.css` and `../script.js`.
4. Add a card linking to the folder in the root `index.html`.
5. Commit the changes to the publishing branch. GitHub Pages will publish them automatically.

Question data uses objects with a `question`, four `answers`, a zero-based `correct` answer index, and an `explanation`. Keep the shared quiz engine and stylesheet in the repository root.

## Publishing

The site is configured to run from the repository root on GitHub Pages. After committing changes to the publishing branch, wait for the Pages deployment to finish and open the repository's Pages URL.
