var Counter = require('./counter');

describe('Usage - counter', function() {

    it('count 1 then emits increment event.', function(done) {
        var counter = new Counter();

        counter.count(1)
            .error(done)
            .decrement(function () {
                done(Error('emit descrement event'));
            })
            .increment(function (result) {
                result.should.equal(1);
                done();
            });
    });

    it('count -5 then emits decrement event.', function(done) {
        var counter = new Counter(10);

        counter.count(-5)
            .error(done)
            .increment(function () {
                done(Error('emit increment event'));
            })
            .decrement(function (result) {
                result.should.equal(5);
                done();
            });
    });

    it('count 0 then dont emit event.', function(done) {
        var counter = new Counter();

        process.nextTick(done);

        counter.count(0)
            .error(done)
            .increment(function () {
                done(Error('emit increment event'));
            })
            .increment(function () {
                done(Error('emit increment event'));
            });
    });

    it('count alphabent then emits error event.', function(done) {
        var counter = new Counter();

        counter.count('sweetroll')
            .increment(function () {
                done(Error('emit increment event'));
            })
            .increment(function () {
                done(Error('emit increment event'));
            })
            .error(function (err) {
                err.should.a('object');
                err.constructor.name.should.equal('Error');
                done();
            });

    });
});