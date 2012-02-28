var EventTransceiver = require('../../');
var CounterEvent = EventTransceiver.define(['increment', 'decrement', 'error']);

exports = module.exports = Counter;

function Counter(current) {
    this._current = current || 0;
}

Counter.prototype.count = function (number) {
    var self = this;
    var event = new CounterEvent();

    process.nextTick(function () {
        if (typeof number !== 'number') {
            event.transmitter.error(Error('argument is not number'));
        }

        self._current += number;

        if (number > 0) {
            event.transmitter.increment(self._current);
        } else if (number < 0) {
            event.transmitter.decrement(self._current);
        }
    });

    return event.receiver;
};
