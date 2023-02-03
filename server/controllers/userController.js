"use strict";
const UsersDB = require('../models/UsersDB');
const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
var secret = "somesecretkey";

var usersDB = new UsersDB();

function getAllUsers(request, respond){
    usersDB.getAllUsers(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function getUsersAndReviews(request, respond) {
    usersDB.getUsersAndReviews(function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function login(request, respond) {
    var userName = request.body.userName;
    var password = request.body.password;
    usersDB.login(userName, function(error, result){
        console.log(result);
        if(result.length == 0) {
            respond.status(401).json(error);
        }
        else {
            const hash = result[0].password;
            console.log("pw", password);
            console.log("hash", hash);
            var flag = bcrypt.compareSync(password, hash);
            if(flag) {
                var token = jwt.sign(userName, secret);
                respond.json({result: token, userId: result[0]._id});
            }
            else {
                respond.json({result: false});
            }
        }
    });
}

function getUserById(request, respond) {
    var userId = request.params.id;
    console.log(userId);
    usersDB.getUserById(userId, function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result[0]);
        }
    });
} 

function addUser(request, respond){
    var password = request.body.password;
    password = bcrypt.hashSync(password, 10);
    var user = new User(null, request.body.userName, request.body.userEmail, request.file.filename, request.body.userContact, request.body.userGender, request.body.userBio, password);
    usersDB.addUser(user, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function updateUser(request, respond){
    var user = new User(parseInt(request.params.id), request.body.userName, request.body.userEmail, request.file.filename, request.body.userContact, request.body.userGender, request.body.userBio, null);
    usersDB.updateUser(user, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function deleteUser(request, respond){
    var userId = request.params.id;
    usersDB.deleteUser(userId, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

module.exports = {getAllUsers, getUsersAndReviews, login, getUserById, addUser, updateUser, deleteUser};
