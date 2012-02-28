var EventTransceiver = require('../../');

describe('Define events', function() {
    describe('a new spec', function() {
        var Event = EventTransceiver.define(['some']);
        var e = new Event();

        it('gets object.', function() {
            e.should.a('object');
        });

        it('has transmitter.', function() {
            e.transmitter.should.a('object');
        });

        it('has receiver', function() {
            e.receiver.should.a('object');
        });
    });

    describe('"foo", "bar" events spec', function() {
        var Event = EventTransceiver.define(['foo', 'bar']);
        var e = new Event();

        describe('then transmitter', function() {
            var transmitter = e.transmitter;

            it('has foo method', function() {
                transmitter.foo.should.a('function');
            });

            it('has bar method', function() {
                transmitter.bar.should.a('function');
            });
        });

        describe('then receiver', function() {
            var receiver = e.receiver;

            it('has foo method', function() {
                receiver.foo.should.a('function');
            });

            it('has bar method', function() {
                receiver.bar.should.a('function');
            });
        });
    });
});