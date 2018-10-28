"use strict";
/*
    //Robot Class, contains some properties and functions
*/

var Direction = require('./app.server.direction'); //use of direction

var Robot = function _Robot(args) {
    //These are mendatory fields
    if (args.hasOwnProperty('x') && typeof args.x === "number")
        this.x = Number(args.x);
    else {
        //NOTE: handle error of invalid property value
        console.log('Error: Invalid Property of X');
    }

    if (args.hasOwnProperty('y') && typeof args.y === "number")
        this.y = Number(args.y);
    else {
        //NOTE: handle error of invalid property value
        console.log('Error: Invalid Property of Y');
    }
    if (args.hasOwnProperty('direction') && Direction.isValid(Number(args.direction)))
        this.direction = args.direction;
    else {
        //NOTE: handle error of invalid property value
        console.log('Error: Invalid Property of Direction');
    }
};

//Get positions and direction
Robot.prototype.get = function() {
    return this.x + " " + this.y + " " + Direction.toString(this.direction);
};

//validate move 
//"args" contains limits (min and max) of x and y co-ordinates for battle arena
Robot.prototype.validate = function _validate(args) {
    var _x = (this.direction === Direction.E ? this.x + 1 : this.direction === Direction.W ? this.x - 1 : 0);
    var _y = (this.direction === Direction.N ? this.y + 1 : this.direction === Direction.S ? this.y - 1 : 0);
    if (args.x.min <= _x && _x <= args.x.max && args.y.min <= _y && _y <= args.y.max) {
        return true
    }
    return false;
};

//Move forward
Robot.prototype.move = function() {
    this.y = (this.direction == Direction.N ? this.y += 1 : this.direction == Direction.S ? this.y -= 1 : this.y);
    this.x = (this.direction == Direction.E ? this.x += 1 : this.direction == Direction.W ? this.x -= 1 : this.x);
};

//Change direction by 90 deg
Robot.prototype.turn = function(side) {
    this.direction = (side.toLowerCase() === 'l' ? this.direction -= 1 : this.direction += 1);
    this.direction = ((this.direction < Direction.N ? Direction.W : this.direction > Direction.W ? Direction.N : this.direction));
};

//All moveall: this allows to execute all string of instruction
Robot.prototype.moveall = function(arena, answer) {
    var currentPosition = { x: this.x, y: this.y, direction: this.direction };
    for (var i = 0; i < answer.length; i++) {
        if (answer[i].toUpperCase() === "M") {
            if (this.validate(arena) === true)
                this.move();
            else {
                //NOTE: when Robot is trying to move out of its limit
                //then invalid move can be handled here.
                console.log('Error: Move is not valid.');
                //reset to previous values
                this.x = currentPosition.x;
                this.y = currentPosition.y;
                this.direction = currentPosition.direction;
                return false;
            }
        } else {
            this.turn(answer[i]);
        }
    }
    return true;
};

module.exports = Robot;