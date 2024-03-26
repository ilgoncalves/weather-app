[![Netlify Status](https://api.netlify.com/api/v1/badges/86fde45c-7939-4f6e-810d-6da64794b2f7/deploy-status)](https://app.netlify.com/sites/weatherleadzai/deploys)
# Weather App


## Description

  This simple weather app is a React.js web application that fetches and displays current weather data from the OpenWeatherMap API. This app was developed according to TDD principles, Clean Architecture guidelines, adherence to SOLID principles. Using SASS but no CSS frameworks, I created responsive UI from scratch that displays the current temperature, type of weather using icons, and local sunrise and sunset times for some cities.

## Code Coverage

| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](https://img.shields.io/badge/statements-95.48%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-97.82%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-97.5%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-95.2%25-brightgreen.svg?style=flat) |

## Technologies Used
  - React.js for the frontend.
  - Jest and Testing Library for unit and integration tests.
  - SASS for stylish.
  - Clean Architecture and SOLID principles to ensure a scalable, testables, maintainable, and decoupled codebase.
  - Some design patterns such as: Factory and Decorator

## Features
  - Display current temperature and weather condition icon for a specific city.
  - Show local sunrise and sunset times.
  - Temperature toggle switch between Celsius and Fahrenheit.
  - City selector to check weather in at least three different cities.

## How to install and use

  1. Clone this repository.
  2. Install the dependencies
  ```bash
    yarn install
  ```
  3. Copy .env.example content, create a .env file and paste the content.
  4. Obtain an API key from [OpenWeatherMap](https://openweathermap.org/api) and add it to your environment variables as `REACT_APP_WEATHER_API_KEY`.
  5. Start the development server.
  ```bash
    yarn start
  ```
  6. The app should now be running on http://localhost:3000.

  ### Troubleshooting

  #### Issue: Receiving a 403 Error

  If you encounter a 403 error while trying to fetch weather data, this may be due to CORS restrictions applied by the OpenWeatherMap API.

  ##### Solution: CORS Anywhere
  To circumvent this issue, the application utilizes a CORS Anywhere decorator that proxies requests through an external server to bypass CORS restrictions. However, for this solution to work during development, you need to manually enable access to the CORS Anywhere demo server.

  Please follow these steps:
  1. Visit [https://cors-anywhere.herokuapp.com/corsdemo](https://cors-anywhere.herokuapp.com/corsdemo).
  2. Click on the "Request temporary access to the demo server" button.

  This action grants your IP temporary access to the CORS Anywhere demo server, allowing your application to fetch the weather data without encountering a 403 error. Please note, this is a temporary and development-only solution.
