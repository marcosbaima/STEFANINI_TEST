import 'reflect-metadata';

import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import AppError from '../../errors/AppError';

import '@shared/typeorm';
import '@shared/container';


const app = express()

app.use(cors());

const http = require('http').createServer(app)
//const io = require('socket.io')(http)


app.use(express.json());


app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: 'err.message',
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });

});

app.use('/',(req,res,next)=>{
  //res.render("index.html");
  //@ts-ignore
  res.messagesUsers = messagesUsers;

  next();

})

http.listen(3333, () => {
  console.log('o(*￣▽￣*)ブ Server started on port 3333');
});