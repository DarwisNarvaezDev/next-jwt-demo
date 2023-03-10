# Simple JWT-Next.js Demo
Deveolped with Next.js, Chakra U, Knex.Js, and Postgres Sql.

# To run it
1. Deploy a postgresql instance
2. Clone this repo and navigate to the downloaded folder
3. Inside the folder, you have to create your ```.env```, with DB credentials and APP (fake) token, like so:
```
DB_BATABASE=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=127.0.0.1
DB_PORT=5432
APP_TOKEN=yourAppTokenHere
```
4. Execute the following command: ```npm i knex --save``` to install knex
5. Run the knex.js migration script with: ```knex migrate:latest``` this will make your life easier by creating all the tables we need in the db if the credentials are correctly set in the ```.env``` file. If all goes well you'll see something like this:
```
Using environment: development
Batch 1 run: 2 migrations
```
7. Run ```npm install``` to install the needed dependencies and finally 
6. By running the following command: ```npm run dev``` to deploy the next.js app in your local server. :bowtie: enjoy!

**NOTE:** The project is currently production-optimized, so you can go ahead and hit ```npm run build``` and deploy the app wherever you want.

# To test it
The app has Cypress.js coverage, [Read more](https://nextjs.org/docs/testing)

1. Install node dependencies: ```npm install```
2. Then run the **DEV** environment ```npm run dev```
3. execute the runnable inside cypress node modules pointing to **Firefox** browser: ```./node_modules/cypress/bin/cypress run --browser firefox```

Suggestion: you have to run the dev environment then, execute the test suite, you can run the environment in one terminal, and then open another to run the test OR you can leverage on [pm2](https://www.npmjs.com/package/pm2) a library that allows NPM process to run in "background" (clustered). Just run ```pm2 start "<npm script>" --name <your process name>```
