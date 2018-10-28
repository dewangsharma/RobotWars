"use strict";
/*
    Battle Arena for Robot War.
    It contains x and y min and max limits
*/

//Battle Arena
var Arena = function _Arena(x, y) {
    //limits of the battle arena on x,y co-ordinates  
    this.x = { min: 0, max: x };
    this.y = { min: 0, max: y };
};

//Get arena info
Arena.prototype.get = function _get() {
    return this;
}

//Validate x,y co-ordinates 
//x and y are starting points of Robot, so this function validates that it is in the range of Battle Arena
Arena.prototype.validate = function _validate(x, y) {
    if (typeof x != "number" || typeof y != "number")
        return false;

    if (this.x.min <= x && x <= this.x.max && this.y.min <= y && y <= this.y.max)
        return true;
    return false;
};

module.exports = Arena;