var util = require('util');
var EventEmitter = require('events').EventEmitter;

module.exports = Queue;
function Queue(callback, concurrency) {
    this.callback = callback;
    this.concurrency = concurrency || 10;
    this.add = this.add.bind(this);
    this.next = this.next.bind(this);
    this.invoke = this.invoke.bind(this);
    this.queue = [];
    this.running = 0;
}
util.inherits(Queue, EventEmitter);

Queue.prototype.add = function(item) {
    this.queue.push(item);
    if (this.running < this.concurrency) {
        this.running++;
        this.next();
    }
};

Queue.prototype.addMultiple = function(items) {
    this.queue = this.queue.concat(items);

    var space = this.concurrency - this.running,
        additional = space < this.queue.length ? space : this.queue.length;

    while(additional > 0) {
        this.running++;
        this.next();
        additional--;
    }
};

Queue.prototype.invoke = function() {
    if (this.queue.length) {
        this.callback(this.queue.shift(), this.next);
    } else {
        this.next();
    }
};

Queue.prototype.next = function(err) {
    if (err) this.emit('error', err);
    if (this.queue.length) {
        setImmediate(this.invoke);
    } else {
        this.running--;
        if (!this.running) {
            this.emit('empty');
        }
    }
};
