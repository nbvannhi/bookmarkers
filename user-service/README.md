# User Service

## Downloading `.env` file
Download `user-service.env` file from [here](https://drive.google.com/drive/folders/1qzkw99cqAebqCf2l7eVWQsuqJ2xvb1J?usp=share_link), rename it to `.env` and place inside `user-service/`.

## Running User Service
Change the directory to `user-service` using:
```
$ cd directory_to_user-service/
```

Install npm packages using:
```
$ npm i
```

Run the server using:
```
$ npm start
```

The terminal should show:
```
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
user-service listening on port 5000
```

## Testing User Service
### 1. With the frontend:

In another terminal, change the directory to `frontend` using:
```
$ cd directory_to_frontend/
```

Install npm packages using:
```
$ npm i
```

Run the server using:
```
$ npm start
```

Open [http://localhost:3000](http://localhost:3000) in a browser and test with the urls [\signup](http://localhost:3000\signup), [\signin](http://localhost:3000\signin)

### 2. With Postman:
Sign in to or install Postman from [here](https://www.postman.com/). Open Postman and send some HTTP requests to test the User Service APIs.

(More detailed instructions will be provided in the future)

## Credits
There is extensive code reuse in `frontend/` and `user-service/` from: <br>
> Title: MERN-authentication-authorization <br>
Author: Nikhilthadani <br>
Date: 2022 <br>
Availability: [https://github.com/Nikhilthadani/MERN-authentication-authorization](https://github.com/Nikhilthadani/MERN-authentication-authorization)
