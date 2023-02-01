"use strict";
const UsersDB = require('../models/UsersDB');
const User = require('../models/User');
const bcrypt = require('bcrypt');

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
    usersDB.login(userName, password, function(error, result){
        console.log(result);
        if(result.length == 0) {
            console.log(error);
            respond.status(401).json(error);
        }
        else {
            const hash = result[0].password;
            var flag = bcrypt.compareSync(password, hash);
            if(flag) {
                respond.json({result: "valid"});
            }
            else {
                respond.json({result: "invalid"});
            }
            respond.json(result);
        }
        console.log(userName, password);
    });
}

function addUser(request, respond){
    var password = request.body.password;
    password = bcrypt.hashSync(password, 10);
    var user = new User(null, request.body.userName, request.file.filename, request.body.userEmail, request.body.userContact, request.body.userGender, request.body.userBio, password);
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
    var user = new User(parseInt(request.params.id), request.body.userName, request.body.userPhoto, request.body.userEmail, request.body.userContact, request.body.userGender, request.body.userBio, request.body.password);
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

module.exports = {getAllUsers, getUsersAndReviews, login, addUser, updateUser, deleteUser};
