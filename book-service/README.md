# Book Service

## `.env` File

Download `book-service.env` file from [here](https://drive.google.com/drive/folders/1qzkw99cqAQebqCf2l7eVWQsuqJ2xvb1J?usp=share_link), rename it to `.env` and place it inside `book-service/`.

## Setting up MySQL

Install MySQL. You can verify it using:
```
$ mysql -V
```

Create a new user with username and password as specified in `book-service.env`.

Connect to MySQL using:
```
$ mysql -u username -p
Enter password: password
```
where `username` and `password` are specified in `book-service.env`.

Populate the database using:
```
mysql> source directory_to_schema.sql
mysql> source directory_to_data.sql
```

## Running Book Service

Change directory to `book-service/` using:
```
$ cd directory_to_book-service/
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
book-service listening on port 8000
```
