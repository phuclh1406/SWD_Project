// import * as controllers from '../controllers';
// import express from 'express';
const controllers = require('../controllers');
const express = require('express');

const router = express.Router();

router.post('/register', controllers.register);

module.exports = router;
