"use strict";

var events = require('events');

exports.define = function (entries) {

    return function DefinedEvent() {
        var self = this;
        var eventEmitter = new events.EventEmitter();

        this.transmitter = {};
        this.receiver = {};

        entries.forEach(function (entry) {
            self.transmitter[entry] = function () {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(entry);
                eventEmitter.emit.apply(eventEmitter, args);
                return this;
            };

            self.receiver[entry] = function (handler) {
                eventEmitter.on(entry, handler);
                return this;
            };
        });
    };
};
