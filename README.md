# Currency Exchanger

Welcome to Currency Exchanger! This is a React application that allows users to convert currencies and view historical rates.

## Getting started

To get started with this project, clone the repository and run `npm install` to install all dependencies. Once the installation is complete, you can start the development server by running `npm start`.

## Exercise Details

The goal of this exercise was to develop a currency exchange application in Angular or React, using the provided Fixer API. The exercise included several user stories that needed to be implemented, including displaying a home page with a currency converter panel, a sticky header with navigation links, and a card grid displaying converted values for popular currencies. In addition, a details page should display for the full name of the "From" currency, a button to go back to the home page, a sticky converter panel with pre-selected currencies, an entered amount, and a chart showing historical data for the selected currencies in details page. The chart should display monthly historical rates for the past year, with months on the horizontal axis and rates on the vertical axis, and calculated based on the rate in the last day of that month.

To summarize some details about my implementation, I used a different API because the free subscription for the provided API had expired, and I used the following link instead: https://app.freecurrencyapi.com/. Additionally, I couldn't use the API's historical rate endpoint for the graph, so I created a graph with the last month's rates instead of the last year.

## Running Tests

I added 4 main components in our application - ConverterPanel, Chart, CurrencyCard & Navbar; each with its own set of tests. To run all tests, simply type the following command:

`npm run test`

This will run all test suites and display the results in your terminal.

## Requirements

In addition to the user stories, the exercise specified certain requirements for the development process, such as utilizing modularity and clean patterns, utilizing Typescript features, and including unit tests when feasible. The use of Rxjs operators was also encouraged. The exercise aimed to test the overall software architecture of the application, the structure and quality of the code, and the use of well-known patterns for JavaScript frameworks.

## Contributing

We welcome contributions to our project! If you find a bug or have an idea for a new feature, please create a new issue on our [GitHub repository](https://github.com/mycompany/currency-exchanger/issues). We also accept pull requests - just make sure to follow our coding guidelines and write tests for any new code.

Thank you for using Currency Exchanger! We hope you enjoy using the application.
