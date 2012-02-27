"use strict";

var events = require('events');

exports.define = function (entries) {

    function EventPublisher (eventEmitter) {
        this._eventEmitter = eventEmitter;
    }
    function EventSubscriber (eventEmitter) {
        this._eventEmitter = eventEmitter;
    }

    entries.forEach(function (entry) {
        EventPublisher.prototype[entry] = function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(entry);
            this._eventEmitter.emit.apply(this._eventEmitter, args);
            return this;
        };

        EventSubscriber.prototype[entry] = function (handler) {
            this._eventEmitter.on(entry, handler);
            return this;
        };
    });

    function EventSpec() {
        var eventEmitter = new events.EventEmitter();

        this.publisher = new EventPublisher(eventEmitter);
        this.subscriber = new EventSubscriber(eventEmitter);
    }

    return EventSpec;
};
