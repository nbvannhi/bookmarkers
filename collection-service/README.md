# Collection Service

## `.env` File

Download `collection-service.env` file from [here](https://drive.google.com/drive/folders/1qzkw99cqAQebqCf2l7eVWQsuqJ2xvb1J?usp=share_link), rename it to `.env` and place it inside `collection-service/`.

## Setting up MySQL

Install MySQL. You can verify it using:
```
$ mysql -V
```

Create a new user with username and password as specified in `collection-service.env`.

Connect to MySQL using:
```
$ mysql -u username -p
Enter password: password
```
where `username` and `password` are specified in `collection-service.env`.

Populate the database using:
```
mysql> source directory_to_schema.sql
```
This only populates the schema into the database. Collection entries should be manually populated by testing the frontend.

## Running Collection Service

Change directory to `collection-service/` using:
```
$ cd directory_to_collection-service/
```

Install npm packages using:
```
$ npm i
```

Run the server using:
```
$ npm run dev
```

The terminal should show something like this:
```
[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
collection-service listening on port 8080
```
