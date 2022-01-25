# Build Week Scaffolding

First READ these instructions to get an overview of what's involved in scaffolding an Express + PostgreSQL app that deploys to Heroku.

Then watch [this video tutorial](https://bloomtech-1.wistia.com/medias/2625bl7sei) for a detailed demonstration of setting up a project, using a Windows dev machine. Other operating systems will require some adjustments.

**There will have been updates to this repo since the video tutorial was created, so make sure to read these instructions before watching.**

## The Stack and Tools

1. Web server: [Node & Express](https://expressjs.com/)
2. Development database: [PostgreSQL 14](https://www.postgresql.org/download/)
3. Dev database Graphical-User Interface tool: [pgAdmin 4](https://www.pgadmin.org/download/)
4. Dev database Command-Line Interface tool: [psql](https://www.postgresql.org/docs/14/app-psql.html)

**Note:** **pgAdmin 4** and **psql** should be bundled with the PostgreSQL installer, but they might not be the latest versions.

5. Production cloud service: [Heroku](https://id.heroku.com/login)
6. Prod database: [Heroku Postgres Addon](https://devcenter.heroku.com/articles/heroku-postgresql)
7. Prod Command-Line Interface tool: [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## Important Differences between SQLite and Postgres

The SQLite database is a file embedded inside the project. PostgreSQL on the other hand is a full-blown server, separate from the Express server.

This means Postgres and its tooling must be installed on the development machine prior to scaffolding an Express + Postgres app.

Another difference is that executing migrations for the first time will not make the database pop into existance as was the case with SQLite. You must use the pgAdmin 4 GUI to create the development database by hand. Once the database exists and shows up in pgAdmin 4 you can connect to it using Knex and migrate it.

In production, we create the database by installing the Postgres Addon from the dashboard of our app on the Heroku website. You can connect pgAdmin 4 to the production db following [these instructions](https://stackoverflow.com/a/63046594/3895791).

## Installation of PostgreSQL on the Development Machine

Install [Postgres](https://www.postgresql.org/download/) on your computer, taking into account that getting psql and pgAdmin 4 up and running might require a bit of research and effort.

1. Leave the default options during the Postgres installation wizard (components, location, port number).
2. You will be asked to create a password for the superadmin "postgres" db user. Enter a simple string using only letters (e.g. "password").
3. No need to execute the "Stack Builder" at the end of the installation. You can safely uncheck that and exit the wizard.
4. The first time you open pgAdmin 4 you will be asked to create another password, this time a master password to be able to use pgAdmin.

## Starting a New Project

- Create a new repository using this template, and clone it to your local.
- Create a `.env` file and follow the instructions inside `knexfile.js`.
- Fix the scripts inside `package.json` to use your Heroku app.

## Scripts

- **start** Runs the app with Node.
- **server** Runs the app with Nodemon.
- **migrate:dev** Migrates the local development db to the latest.
- **rollback:dev** Rolls back migrations in the local dev db.
- **seed:dev** Truncates all tables in the local dev db.
- **deploy** Deploys the main branch to Heroku. Must login to the Heroku CLI and add Heroku as a remote.
- **test** Runs tests.

**The following scripts NEED TO BE EDITED before using: replace `YOUR_HEROKU_APP_NAME`**

- **migrate:prod** Migrates the Heroku database to the latest.
- **rollback:prod** Rolls back migrations in the Heroku database.
- **databaseh** Interacts with the Heroku database from the command line using psql.
- **seed:prod** Runs all seeds in the Heroku database.

## Tips

- Figure out deployment before writing any additional code.

- If you need to make changes to a migration file that has already been released to Heroku, follow this sequence:

  1. Roll back migrations in the Heroku database
  2. Deploy the latest code to Heroku
  3. Migrate the Heroku database to the latest

- If your frontend devs are clear on the shape of the data they need, you can quickly build provisional endpoints that return mock data. They shouldn't have to wait for you to build the entire backend.

- Keep your endpoints super lean: the bulk of the code belongs inside models and other middlewares.

- Validating and sanitizing client data using a library is much less work than doing it manually.

- Revealing crash messages to clients is a security risk, but during development it's helpful if your frontend devs are able to tell you what crashed exactly.

- PostgreSQL comes with [fantastic built-in functions](https://hashrocket.com/blog/posts/faster-json-generation-with-postgresql) for hammering rows into whatever JSON shape.

- If you want to edit a migration that has already been released but don't want to lose all the data, make a new migration instead. This is a more realistic flow for production apps: prod databases are never migrated down. We can migrate Heroku down freely only because there's no valuable data from customers in it. In this sense, Heroku is acting more like a staging environment than production.

- If your fronted devs are interested in running the API locally, help them set up PostgreSQL & pgAdmin on their machines, and teach them how to run migrations in their local. This empowers them to (1) help you troubleshoot bugs, (2) obtain the latest code by simply doing a `git pull` and (3) work with their own data, without it being wiped every time you roll back the Heroku db. Collaboration is more fun and direct, and you don't need to deploy as often.

## Video Demonstration

The following demo explains how to set up a project using PostgreSQL and Heroku.

[![Setting up PostgreSQL for Build Week](https://tk-assets.lambdaschool.com/e43c6d1e-5ae8-4142-937b-b865d71925fb_unit-4-build-week-project-scaffolding.png)](https://bloomtech-1.wistia.com/medias/2625bl7sei)
