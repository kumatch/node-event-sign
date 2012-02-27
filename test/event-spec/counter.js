var EventSpec = require('../../');
var CounterEvent = EventSpec.define(['increment', 'decrement', 'error']);

exports = module.exports = Counter;

function Counter(current) {
    this._current = current || 0;
}

Counter.prototype.count = function (number) {
    var self = this;
    var event = new CounterEvent();

    process.nextTick(function () {
        if (typeof number !== 'number') {
            event.publisher.error(Error('argument is not number'));
        }

        self._current += number;

        if (number > 0) {
            event.publisher.increment(self._current);
        } else if (number < 0) {
            event.publisher.decrement(self._current);
        }
    });

    return event.subscriber;
};
