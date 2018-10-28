//tests for robot
const chai = require('chai'),
    expect = chai.expect;

var Validate = require('../app.server.input.validate'),
    Arena = require('../app.server.battle-arena'),
    Robot = require('../app.server.robot');

//valid test data
var _bootAns = "5 5";
var _data = [{
    ans1: "1 2 N",
    ans2: "LMLMLMLMM",
    final: "1 3 N"
}, {
    ans1: "3 3 E",
    ans2: "MMRMMRMRRM",
    final: "5 1 E"
}];

var battleArena, activeRobot;

describe('ROBOT', function _describe() {

    //run before start of test
    before(function() {
        console.log('Testing Robot on Battle Arena');
        //Create Battle Arena object with Upper Right limit
        var _args = Validate.boot(_bootAns);
        if (_args.status == true) {
            battleArena = new Arena(_args.x, _args.y);
        }
    });

    after(function() {
        console.log('---x---');
    });

    //invalid starting position
    it('Que1: Invalid starting co-ordinates of Robot', function() {
        expect(battleArena.validate("E", "")).to.equal(false);
    });
    it('Que1: Invalid starting co-ordinates of Robot', function() {
        expect(battleArena.validate("£$", "&*")).to.equal(false);
    });
    it('Que1: Invalid starting co-ordinates of Robot', function() {
        expect(battleArena.validate(6, 6)).to.equal(false);
    });
    it('Que1: Invalid starting co-ordinates of Robot', function() {
        expect(battleArena.validate(-1, -1)).to.equal(false);
    });
    it('Que1: Valid min', function() {
        var _arena = battleArena.get();
        expect(battleArena.validate(_arena.x.min, _arena.y.min)).to.equal(true);
    });
    it('Que1: Valid max', function() {
        var _arena = battleArena.get();
        expect(battleArena.validate(_arena.x.max, _arena.y.max)).to.equal(true);
    });

    //check with the correct test input
    it('Que1: Valid test data for starting co-ordinates', function() {
        var _ans = Validate.que1(_data[0].ans1);
        expect(battleArena.validate(_ans.x, _ans.y)).to.equal(true);
    });

    //Check with all test data
    it('Que1: Run all valid test robots', function() {
        for (var i = 0; i < _data.length; i++) {
            //Create Robot with correct starting co-ordinates
            var _rbt = new Robot(Validate.que1(_data[i].ans1));
            if ((Validate.que2(_data[i].ans2)).status == true) {
                var t = _rbt.moveall(battleArena.get(), _data[i].ans2);
                expect(_rbt.get()).to.equal(_data[i].final);
            }
        }
    });
});