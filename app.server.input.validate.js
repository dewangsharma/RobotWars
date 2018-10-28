"use strict";
/*
    Functions to validate user inputs:
    boot: upper right limit of Battle Arena.
        e.g. 5 5 (2 numbers should be seperated by space)
    
    que1: starting co-ordinates of Robot
        e.g. 1 2 N (first number, second number and third character for direction, each value should be seperated by space )

    que2: string of instructions for Robot to move or turn
        e.g. LMLR (string should contain only L (left) R(right) M(move) characters) 
 */

var Direction = require('./app.server.direction');

var isNumeric = function _isNumeric(n) {
    return (typeof n === "number" || !isNaN(n));
};

module.exports = {
    boot: function(answer) {
        if (answer.trim().length === 0)
            return { status: false };
        var _answer = answer.split(" ");
        if (_answer.length >= 2 && isNumeric(_answer[0]) === true && isNumeric(_answer[1]) === true && Number(_answer[0]) >= 0 && Number(_answer[1]) >= 0) {
            return { status: true, x: Number(_answer[0]), y: Number(_answer[1]) };
        }
        return { status: false };
    },
    que1: function(answer) {
        if (answer.trim().length === 0)
            return { status: false };

        var _answer = answer.split(" ");
        if (_answer.length >= 3 && isNumeric(_answer[0]) === true && isNumeric(_answer[1]) === true && Number(_answer[0]) >= 0 && Number(_answer[1]) >= 0) {
            _answer[2] = _answer[2].toUpperCase();
            if (!(_answer[2] === "N" || _answer[2] === "E" || _answer[2] === "S" || _answer[2] === "W"))
                return { status: false };
            return { status: true, x: Number(_answer[0]), y: Number(_answer[1]), direction: Direction[_answer[2]] };
        }
        return { status: false };
    },
    que2: function(answer) {
        if (answer.trim().length === 0)
            return { status: false };

        for (var i = 0; i < answer.length; i++) {
            if (!(answer[i].toUpperCase() === "L" || answer[i].toUpperCase() === "R" || answer[i].toUpperCase() === "M"))
                return { status: false };
        }
        return { status: true };
    }
}