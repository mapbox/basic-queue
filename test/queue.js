var Queue = require('../index.js');
var assert = require("assert")

describe('queue', function() {
    describe('add', function(done) {
        it('should increment running up to concurrency', function() {
            var q = new Queue(function() {}, 3);
            assert.equal(q.running, 0);
            q.add('one');
            assert.equal(q.running, 1);
            q.add('two');
            assert.equal(q.running, 2);
            q.add('three');
            assert.equal(q.running, 3);
            q.add('four');
            assert.equal(q.running, 3);
        });
    });
    describe('on empty', function() {
        it('should be invoked when queue is empty', function(done) {
            var q = new Queue(function(obj, callback) { callback() }, 3);
            q.on('empty', function() {
                assert.equal(q.running, 0);
                done();
            });
            q.add('foo');
        });
    });
    describe('on error', function() {
        it('should be invoked when task passes an err into callback', function(done) {
            var q = new Queue(function(obj, callback) { callback(new Error('dummy')) }, 3);
            q.on('error', function() {
                done();
            });
            q.add('foo');
        });
    });
});
