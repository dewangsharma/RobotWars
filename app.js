"use strict";
/*
    This is the entry file of the application.
 */

//#region "Declarations"

var Arena = require('./app.server.battle-arena'),
    Robot = require('./app.server.robot'),
    Direction = require('./app.server.direction'),
    Validate = require('./app.server.input.validate');

//read console input
const readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

//active runtime variables
var battleArea; // battle arena live object
var activeRobot; // live object of active robot
var allRobots = []; //store detail about existing Robots

//#endregion "Declarations"

//#region "Methods"

//get very first input from user
//Set upper right limits of the Battle Arena for application
var bootQuestion = function _askQuestion() {
    rl.question("Enter limit for upper right co-ordinates. e.g. 5 5\n", (answer) => {
        if (answer.toString().toUpperCase() === "Q")
            return closeTerminal();
        var _answer = Validate.boot(answer);
        if (_answer.status === false) {
            console.log('OOPS!!!\nIt is not valid input.');
            console.log('Please give space between co-ordinates');
            return bootQuestion();
        }
        battleArea = new Arena(_answer.x, _answer.y);
        askQuestion1();
    });
};

//get first input from user
//Add new Robot with its current location(x,y) and direction
var askQuestion1 = function _askQuestion() {
    rl.question("Input-1 (Starting Co-ordinates of Robot): \n", (answer) => {
        if (answer.toString().toUpperCase() === "Q")
            return closeTerminal();

        var _answer = Validate.que1(answer);
        if (_answer.status === false) {
            console.log('OOPS!!!\nIt is not valid input.');
            return askQuestion1();
        }

        //validate position 
        if (battleArea.validate(_answer.x, _answer.y) === false) {
            console.log('OOPS!!!\nInvalid co-ordinates.');
            return askQuestion1();
        }

        //Add new Robot to battle
        var _args = { x: _answer.x, y: _answer.y, direction: _answer.direction };
        activeRobot = null;
        activeRobot = new Robot(_args);
        allRobots.push(activeRobot); //just to maintain list of robots
        askQuestion2();
    });
};

//get second input from user
//Instructions for Robot to move or change direction
var askQuestion2 = function _askQuestion() {
    rl.question("Input-2 (Instructions): \n", (answer) => {
        if (answer.toString().toUpperCase() === "Q")
            return closeTerminal();

        if ((Validate.que2(answer)).status === false) {
            console.log('OOPS!!!\nInvalid Instructions.');
            return askQuestion2();
        }
        if (activeRobot.moveall(battleArea.get(), answer) === true) {
            console.log(activeRobot.get()); //Final OUTPUT, as mentioned in the task description
            console.log('---------------------');
            console.log(' There are total ' + allRobots.length + ' Robots in the battle field');
            console.log('---------------------\n');
            askQuestion1();

        } else {
            //if move is not valid
            console.log('OOPS!!!\nInvalid Instructions.');
            return askQuestion2();
        }
    });
};

//stop/close console app
var closeTerminal = function _closeTerminal() {
    console.log('Thanks. \n See you soon...');
    rl.close();
}

//#endregion "Methods"

//start execution
bootQuestion();