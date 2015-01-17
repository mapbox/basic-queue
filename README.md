# basic-queue

Provides super-simple handling of repeated asynchronous commands.

## api

`var q = Queue(worker, concurrency)`

- `worker` is a function that this queue runs. `worker` will receive a callback function as the second argument. The first argument is specified when you call `q.add()` (see below).

- `concurrency` is how many simultaneous instances of the worker are allowed to run.

`q.add(object)`

Tell the queue to start a new `worker` when there is room to do so. The
object passed to `.add` is the first argument passed to the `worker` function.

## events

`error`

When `worker` errors, pass an object to the callback function. This will cause
the queue to emit an error event.

`empty`

Indicates that there is no work left in the queue.

## example

```js
var request = require('request');
var Queue = require('basic-queue');
var q = new Queue(scrape, 2);

function scrape(url, callback) {
    request(url, function(err, resp) {
        if (err) return callback(err);
        console.log(resp.body);
        callback();
    }
}

q.on('error', function(err) {
    console.error(err);
});

q.on('empty', function() {
    console.log('All done!');
})

q.add('https://www.somewhere.com');
q.add('https://www.someplace.com');
q.add('https://www.something.com');
q.add('https://www.someother.com');
```
