"use strict";
/*
    This object is for Direction of the Robot
 */

//Cordinal Direction  
var Direction = {
    N: 0, // North
    E: 1, //East
    S: 2, //South
    W: 3, //West
    //return String for Direction
    toString: function(i) {
        return (i === 0 ? "N" : i === 1 ? "E" : i === 2 ? "S" : "W");
    },
    isValid: function(i) {
        if (typeof i === "number" && i >= 0 && i <= 3)
            return true;
        return false;
    }
};



module.exports = Direction;