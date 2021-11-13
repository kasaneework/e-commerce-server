# ****FYI*****
This project not done 100% yet. but you can run it and play with it.

1.open e-commerce and e-commerce-server on vscode

2.open terminal both of them and run command => npm install

3.e-commerce run command => ng s -o

4.turn on mysql on local

5.e-commerce-server set config app->config

6.e-commerce-server set server.js =>> see //-- RUN BD Migration

6.1. 
// ####### 1.
//--comment out and run at first time to init DB and Table after that comment it all again

6.2.
// ####### 2.
//-- comment all no 1. and comment out no 2.

7.e-commerce-server run command => npm run dev

8.Front-end:: localhost:4200 and localhost:4200/admin

9.Back-end:: localhost:5000

10.Create first admin:: localhost:5000/api/auth/signup

11.post man

{
"firstname": "",
"lastname": "",
"phone": "",
"username": "",
"email": "email",
"password": "",
"roles":["admin"]
}

# e-commerce-server

The default Node.js app that will be pushed into the Swisscom Application Cloud if no source code is provided.

Based on [Express](http://expressjs.com/).

## Run locally

1. Install [Node.js and npm](https://nodejs.org/)
1. Run `npm install`
1. Run `npm run dev`
1. Visit [http://localhost:5000](http://localhost:5000)
