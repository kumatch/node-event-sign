
Example
==========

```javascript
var EventTransceiver = require('event-transceiver');

// Define events
var CounterEvent = EventTransceiver.define(['increment', 'decrement', 'error']);

function Counter(current) {
    this._current = current || 0;
}
Counter.prototype.count = function (number) {
    var self = this;

    // event has transmitter, receiver properies
    //   and both objects have methods of the defined events.
    var event = new CounterEvent();

    process.nextTick(function () {
        if (typeof number !== 'number') {
            // equals event.emit('error', ..)
            event.transmitter.error(Error('argument is not number'));
        }

        self._current += number;

        if (number > 0) {
            // equals event.emit('increment', ..)
            event.transmitter.increment(self._current);
        } else if (number < 0) {
            // equals event.emit('decrement', ..)
            event.transmitter.decrement(self._current);
        }
    });

    return event.receiver;
};


var counter = new Counter();

counter.count(10)   // return event receiver, and add listners.
       .error( function (err) {
           throw err;
       })
       .increment( function (result) {
           console.log('Increments, and now ' + result);
       })
       .decrement( function (result) {
           console.log('Decrements, and now ' + result);
       });
```


Installation
==============

    $ npm install event-transceiver




Features
==========

EventTransceiver.define( events )
------------------------------------

Defines events.

* Arguments
  * `events` (array): event names

* Returns
  * A constructor function, and can be used to create new instances for defined events.


event.transmitter
-------------------

A wrapper of event emitting. If you define event _done_ , `event.transmitter` has _done_ method.

    event.transmitter.done(some, parameter);

And same this.

    emitter.emit('done', some, parameter);


event.receiver
-------------------

A wrapper of event listning. If you define event _done_ , `event.receiver` has _done_ method.

    event.receiver.done( function(some, parameter) { ... } );

And same this.

    emitter.on('done', function(some, parameter) { ... });

