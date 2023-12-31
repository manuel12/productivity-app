![Productivity App](hero.png)

The Productivity App helps you list and track your todos completed or uncompleted as well as tracking your daily todos and any learnings made.

You can see see how many todos you've completed today, how many todos on average you've completed daily and also the percentage difference between those 2 number to know if you are ahead of your average or falling behind.

 <h2>Desktop</h2>
 <img src="https://manuel12.github.io/personal-portfolio-page/images/productivity-app/desktopImage.png" title="Productivity App Desktop" alt="Productivity App Desktop" width="650" height="357" style="display: inline"/>

  <h2>Mobile</h2>
 <img src="https://manuel12.github.io/personal-portfolio-page/images/productivity-app/mobileImage.png" title="Productivity App Mobile" alt="Productivity App Mobile" width="165" height="357"/>

## Usage

### Adding Todos

In order to add todos simply write a todo task on the input field and click Add Todo button or hit the ENTER key.

**Note:**
_todos cannot be less than 3 characters or more than 40 characters in length._

### Editing Todos

In order to edit todos simply click on a specific todo's text and the displayed text will become an input element where you can edit the todo text.

### Deleting Todos

In order to delete a todo simply clicking on the ❌ icon on the specific todo you want to delete and this will dissapear.

### Marking Todo as Complete

In order to mark a todo as complete simply click on the specific todo's ✅ icon to mark the todo as complete.

### Checking Todo Statistics

The todo statistics can be seen on top of the todo input and list (on desktop views) and beneath the todo list (on mobile views). This is so that when checking the
app on mobile the first thing the user sees is the todo input and list.

The statistics displayed are:

- Todos completed today.
- Average of todos completed daily.
- Percentage difference between the previous 2 numbers.

<br />

<br />

## Installation

For installing the Django application clone the repository and cd inside the directory

    cd productivity-app

### Installation - Front-end

For installing the front-end cd to the front-end folder

    cd front-end

And run:

    npm install

### Installation - Back-end

For installing the back-end cd to the back-end folder

    cd back-end

And run:

    npm install

## Installation - Cypress

**Note:**
_Already installed if you installed front-end. Cypress folder is located in front-end/cypress. Therefore when installing the packages of the front-end's folder package.json the cypress packages are installed too._

## Tests

| Type       | Location                                                             |
| ---------- | -------------------------------------------------------------------- |
| api        | [front-end/cypress/e2e/api](front-end/cypress/e2e/api)               |
| component  | [front-end/cypress/component/todo](front-end/cypress/component/todo) |
| functional | [front-end/cypress/e2e/todo](front-end/cypress/e2e/functional/todo)  |
| smoke      | [front-end/cypress/e2e/smoke](front-end/cypress/e2e/smoke)           |

## Running tests

### E2E tests

For opening cypress client cd to the front-end folder:

    cd front-end/

And run:

    npx cypress open

## Uses

- Bootstrap
- React
- Chart.js
- TypeScript
- Cypress
- Node
- Express

## Features

- Todo Statistics
- Todo List
- Todo Filtering by Tabs
- Todo Editing and Deletion
