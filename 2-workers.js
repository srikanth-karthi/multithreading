import {workerData,parentPort} from 'worker_threads'
var counter=0
  for(let i=0;i<20000000000/workerData.thread_count;i++) counter++;

  parentPort.postMessage(counter)