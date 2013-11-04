# basic-queue

## example

```js
var Queue = require('basic-queue');
var q = new Queue(request, concurrency / numWorkers);

function request() {
    q.add();
}
```

## api

`q = Queue(callback, concurrency)`

`callback` is the function that this queue runs. Concurrency is how
many simultaneous jobs should run of that function. `callback` will receive `object` and
`callback` as arguments. If `callback` is a call with an error as a first
argument, the queue will emit an error event.

`q.add()`

Tell the queue to start a new job if it isn't over the concurrency
limit.
