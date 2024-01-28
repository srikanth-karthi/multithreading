import express from 'express';
import { Worker } from 'worker_threads';
const app = express();
const threadcount = 2;

app.get('/non-blocking', (req, res) => {
    res.send('hi it is working');
});

function createworker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./2-workers.js', {
            workerData: { thread_count: threadcount }
        });

        worker.on("message", (msg) => {
            // Use the resolve function within this scope
            resolve(msg);
        });

        worker.on("error", (err) => {
            // Use the reject function within this scope
            reject(err);
        });
    });
}

app.get('/blocking', async (req, res) => {
    const workpromise = [];

    for (let i = 0; i < threadcount; i++) {
        workpromise.push(createworker());
    }

    try {
        const threadresult = await Promise.all(workpromise);
        const total = threadresult.reduce((acc, result) => acc + result, 0);
        res.send(`result is ${total} `);
    } catch (error) {
        res.send(`Error: ${error}`);
    }
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
