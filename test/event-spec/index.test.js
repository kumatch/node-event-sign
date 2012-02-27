var EventSpec = require('../../');

describe('node-spec', function() {
    describe('Defines new spec for event', function() {
        var Event = EventSpec.define([]);
        var e = new Event();

        it('gets event object.', function() {
            e.should.a('object');
        });

        it('has publisher.', function() {
            e.publisher.should.a('object');
        });

        it('has subscriber', function() {
            e.subscriber.should.a('object');
        });
    });

    describe('Defines "foo", "bar" event spec', function() {
        var Event = EventSpec.define(['foo', 'bar']);
        var e = new Event();

        describe('then publisher', function() {
            var publisher = e.publisher;

            it('has foo method', function() {
                publisher.foo.should.a('function');
            });

            it('has bar method', function() {
                publisher.bar.should.a('function');
            });
        });

        describe('then subscriber', function() {
            var subscriber = e.subscriber;

            it('has foo method', function() {
                subscriber.foo.should.a('function');
            });

            it('has bar method', function() {
                subscriber.bar.should.a('function');
            });
        });
    });
});