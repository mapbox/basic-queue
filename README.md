# basic-queue

## example

```js
var Queue = require('./queue');
var q = new Queue(request, concurrency / numWorkers);

function request() {
    q.add();
}
```

## api

`q = Queue(callback, concurrency)`

`callback` is the function that this queue runs. Concurrency is how
many simultaneous jobs should run of that function.

`q.add()`

Tell the queue to start a new job if it isn't over the concurrency
limit.
