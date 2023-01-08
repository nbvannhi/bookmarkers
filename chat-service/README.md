## Downloading `.env` file
Download `chat-service.env` file from [here](https://drive.google.com/drive/folders/1qzkw99cqAQebqCf2l7eVWQsuqJ2xvb1J?usp=sharing), rename it to `.env` and place inside `chat-service/`.

## Running Chat Service
Change the directory to `chat-service` using:
```
$ cd directory_to_chat-service/
```

Install npm packages using:
```
$ npm i
```

Run the server using:
```
$ npm run dev
```

The terminal should show:
```
> chat-service@1.0.0 dev
> nodemon server

[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
chat-service listening on port 4200
connected to socket.io
```

## Testing Chat Service
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

Open [http://localhost:3000](http://localhost:3000) in a browser and test with the url [\chats](http://localhost:3000\chats) after signing in via the url [\signin](http://localhost:3000\signin).

### 2. With Postman:
Sign in to or install Postman from [here](https://www.postman.com/). Open Postman and send some HTTP requests to test the Chat Service APIs.

(More detailed instructions will be provided in the future)

## Credits
There is some code reuse and a lot of inspired code in `frontend/` and `chat-service/` from: <br>
> Title: mern-chat-app <br>
Author: Piyush Agarwal <br>
Date: 2021 <br>
Availability: [https://github.com/piyush-eon/mern-chat-app](https://github.com/piyush-eon/mern-chat-app)
