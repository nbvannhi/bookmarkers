# Book Service

## Getting Started

### `.env` File

Download `book-service.env` file from [here](https://drive.google.com/drive/folders/1qzkw99cqAQebqCf2l7eVWQsuqJ2xvb1J?usp=share_link), rename it to `.env` and place it inside `book-service/`.

### Setting up the Database

1. Install MySQL. You can verify it with:
```
$ mysql -V
```

2. Create a new user with username and password as specified in `book-service.env`.

3. Connect to MySQL:
```
$ mysql -u username -p
Enter password: password
```
where `username` and `password` are specified in `book-service.env`.

4. Populate the database:
```
mysql> source directory_to_schema.sql
mysql> source directory_to_data.sql
```

### Running the Server

1. Change directory to `book-service`:
```
$ cd book-service
```

2. Install npm packages:
```
$ npm i
```

3. Run the server:
```
npm run dev
```
