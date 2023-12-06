import express from 'express';

const taskRoute = express.Router();

taskRoute.get('/get');
taskRoute.post('/post');
taskRoute.put('/update');
taskRoute.delete('/delete');

export default taskRoute;
