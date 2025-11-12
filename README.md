# Mini Message Board

## Features:

1. Create and read messages
2. Each message has a unique ID so you can open and read the details of a message!

## Steps:

1. Install postgresql
2. Run `psql` and `CREATE DATABASE your_database;`
3. Rename `.env.template` to `.env`
4. Fill in the fields for the `DBURL`
5. Run `npm i`
6. Run `npm run db` (THERE ARE SOME DEFAULT USERNAMES, you can go to `/db/populatedb.js` and remove them)
7. Run `npm run dev`
8. Go to https://localhost:3000
