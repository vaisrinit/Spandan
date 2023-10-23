import { Express } from 'express';
import { CommonCntrl } from "../controller/commoncntrl";
import  books from './books';
import currentAffairs from './currentAffairs';
import  defence from './defence';
import  politics from './politics';
import sports from './sports';
import  users from './users';

const cmnCntrl = new CommonCntrl();
console.log('My API router is loaded');

initialize();
async function initialize() {
    cmnCntrl.checkDB();
}

export default function mountRoutes(app: Express): void {
  app.use('/books', books);
  app.use('/currentAffairs', currentAffairs);
  app.use('/defence', defence);
  app.use('/politics', politics);
  app.use('/sports', sports);
  app.use('/users', users);
}