# Simple JWT-Next.js Demo
Deveolped with Next.js, Chakra U, Knex.Js, and Postgres Sql.

# To run it
1. Deploy a postgresql instance
2. Clone this repo and navigate to the downloaded folder
3. Inside the folder, you have to create your ```.env```, with DB credentials and APP (fake) token, like so:
```
DB_URL=http://localhost:5432
DB_BATABASE=postgres
DB_USER=postgres
DB_PASSWORD=postgres
APP_TOKEN=JwtNextDemo
```
4. Execute the following command: ```npm i knex --save``` to install knex
5. Run the knex.js migration script with: ```knex migrate:latest``` this will make your life easier by creating all the tables we need in the db if the credentials are correctly set in the .env file. If all goes well you'll see something like this:
```
Using environment: development
Batch 1 run: 2 migrations
``` 
6. By running the following command: ```npm run dev``` to deploy the next.js app in your local server. :bowtie: enjoy!
