"use strict";
const UsersDB = require('../models/UsersDB');
const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
var secret = "somesecretkey";
const {OAuth2Client} = require("google-auth-library");
const client = new OAuth2Client("279300080587-tto1b5n902bqem9lsg6vtqah0giqaa5a.apps.googleusercontent.com");

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
    usersDB.login(userName, function(error, result) {
        if(result.length == 0) {
            respond.status(401).json(error);
        }
        else {
            const hash = result[0].password;
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

function googleSignIn(request, respond) {
    var userEmail = request.body.userEmail;
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: request.body.credential,
            audience: "279300080587-tto1b5n902bqem9lsg6vtqah0giqaa5a.apps.googleusercontent.com",
        });
        // console.log(ticket.getPayload());
    }
    verify().catch(console.error);
    usersDB.googleSignIn(userEmail, function(error, result) {
        if(result.length == 0) {
            respond.status(401).json(error);
        }
        else {
            var token = jwt.sign(userEmail, secret);
            respond.json({result: token, userId: result._id});
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
    if(password != "") {
        password = bcrypt.hashSync(password, 10);
    }
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

module.exports = {getAllUsers, getUsersAndReviews, login, googleSignIn, getUserById, addUser, updateUser, deleteUser};
