To summarize, I completed the Currency Exchanger exercise and wanted to mention a few points. First, I used a different API because the free subscription for the provided API had expired, and I used the following link instead: https://app.freecurrencyapi.com/. Second, I couldn't use the API's historical rate endpoint for the graph, so I created a graph with the last month's rates instead of the last year.

To run the project, first clone the repository to your local machine. Then, navigate to the root directory of the project and run `npm install` to install all the required dependencies. After installation is complete, run `npm start` to start the development server.

Regarding the exercise, the goal was to develop a currency exchange application in Angular or React, using the provided Fixer API. The exercise included several user stories that needed to be implemented, such as displaying a home page with a currency converter panel, a sticky header with navigation links, and a card grid displaying converted values for popular currencies. and details page display for the full name of the "From" currency, a button to go back to the home page, a sticky converter panel with pre-selected currencies, an entered amount, and a chart showing historical data for the selected currencies in details page. The chart should display monthly historical rates for the past year, with months on the horizontal axis and rates on the vertical axis, and calculated based on the rate in the last day of that month.

In addition to the user stories, the exercise also specified certain requirements for the development process, such as utilizing modularity and clean patterns, utilizing Typescript features, and including simple unit tests when feasible. The use of Rxjs operators was also encouraged. The exercise aimed to test the overall software architecture of the application, the structure and quality of the code, and the use of well-known patterns for JavaScript frameworks.
