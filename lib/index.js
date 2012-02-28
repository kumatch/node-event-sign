"use strict";

var events = require('events');

exports.define = function (entries) {

    function EventTransmitter (eventEmitter) {
        this._eventEmitter = eventEmitter;
    }
    function EventReceiver (eventEmitter) {
        this._eventEmitter = eventEmitter;
    }

    entries.forEach(function (entry) {
        EventTransmitter.prototype[entry] = function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(entry);
            this._eventEmitter.emit.apply(this._eventEmitter, args);
            return this;
        };

        EventReceiver.prototype[entry] = function (handler) {
            this._eventEmitter.on(entry, handler);
            return this;
        };
    });

    function EventTransceiver() {
        var eventEmitter = new events.EventEmitter();

        this.transmitter = new EventTransmitter(eventEmitter);
        this.receiver = new EventReceiver(eventEmitter);
    }

    return EventTransceiver;
};
