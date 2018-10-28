//tests for user inputs

const chai = require('chai'),
    expect = chai.expect;

var Validate = require('../app.server.input.validate');

describe('USER INPUTS', function _describe() {
    //run before start of test
    before(function() {
        console.log('Testing User inputs for different questions');
    });

    after(function() {
        console.log('---x---\n');
    });

    //fail inputs
    var f1 = "   "; //empty
    var f2 = "A B C D"; //invalid characters  
    var f3 = "-1 -1"; //as lower range is 0,0. so this is invalid  

    //Empty
    it('Boot: empty input', function() {
        expect((Validate.boot(f1)).status).to.equal(false);
    });
    it('Que1: empty input', function() {
        expect((Validate.que1(f1)).status).to.equal(false);
    });
    it('Que2: empty input', function() {
        expect((Validate.que2(f1)).status).to.equal(false);
    });

    //Invalid characters
    it('Boot: invalid characters', function() {
        expect((Validate.boot(f2)).status).to.equal(false);
    });
    it('Que1: invalid characters', function() {
        expect((Validate.que1(f2)).status).to.equal(false);
    });
    it('Que2: invalid characters', function() {
        expect((Validate.que2(f2)).status).to.equal(false);
    });

    //input for setting up upper right limits
    it('Boot: invalid limit', function() {
        expect((Validate.boot(f3)).status).to.equal(false);
    });
    //SUCCESS: set correct upper right limits
    it('Boot: valid input', function() {
        expect((Validate.boot("5 5")).status).to.equal(true);
    });


    //starting co-ordinates
    it('Que1: invalid co-ordinates', function() {
        expect((Validate.que1(f3)).status).to.equal(false);
    });

    //valid co-ordinates but invalid direction
    it('Que1: invalid direction', function() {
        expect((Validate.que1("5 5 q")).status).to.equal(false);
    });

    //valid co-ordinates but invalid direction
    it('Que1: valid input', function() {
        expect((Validate.que1("1 2 N")).status).to.equal(true);
    });


    //invalid instructions
    it('Que2: invalid input', function() {
        expect((Validate.que2("MMLR523")).status).to.equal(false);
    });

    //valid input
    it('Que2: valid input', function() {
        expect((Validate.que2("MMRRMMLRMRMLR")).status).to.equal(true);
    });

});