import express from 'express';
import { Worker } from 'worker_threads';
const app = express();

app.get('/non-blocking', (req, res) => {
    res.send('hi it is working')
});
app.get('/blocking', (req, res) => {
  const work=new Worker ("./worker.js");
  work.on("message", (msg) => {
  res.send(`result is ${msg} `)
  })
  work.on("error", (err) => {
    res.send(`err is ${err} `)
    })
});
app.listen(3000,()=>
{
    console.log('listening on port 3000');
});