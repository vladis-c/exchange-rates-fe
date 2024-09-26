# Exchange rates app

A currency converter and exchange rates app.

- Convert one currency to another with a desired amount
- See exchage rates of pupular currencies against your selected currency to convert from
- Get the link of the exchange currencies pair from your friend and access the most recent information. Example query: `?amount=100&base_currency=EUR&quote_currency=AED` will convert 100 Euros to United Arab Emirates Dirham

This is a one page web-app that can be run with any PC, Mac or mobile device browser. The website is using `VueJS 3` framework, `typescript` language and `tailwind` styles.

## Backend

You will need to run backend app locally to make the web app work.
Visit [https://github.com/vladis-c/exchange-rates-be](https://github.com/vladis-c/exchange-rates-be) to check the instructions on how to set it up on your machine

## Run the app

0. Add `.env` file:

- Add `VITE_BASE_URL` variable with the base url \(localhost and server) where the app is going to be run. For example:

```
VITE_BASE_URL='http://localhost:8000'
```

1. Clone the repository:

```bash
git clone https://github.com/vladis-c/exchange-rates-fe.git
```

2. Navigate to the project folder:

```bash
cd exchange-rates-fe
```

3. Install dependenciesL

- Install `yarn` if you do not have it on your machine:

```bash
npm i -g yarn
```

- Then install the dependencies:

```bash
yarn
```

4. Run server:

```bash
yarn dev
```

- The server will be running on [http://localhost:3000](http://localhost:3000), which you can open in your browser

## Tests

App is tested against mock endpoints that are featured in the real app. Endpoints like `/currencies`, `/rates` and `/conversions`. They can be found in `__tests__` folder in the root of the app.

0. Make sure all dependencies are installed:

```bash
yarn
```

1. Run tests:

```bash
yarn test
```

2. Run individual tests:

```bash
npx vitest -t <NAME_OF_THE_TEST>
```
