"use strict";

const GroupsDB = require('../models/GroupsDB');
const Group = require('../models/Group');

var groupsDB = new GroupsDB();

function getAllGroups(request, respond) {
    groupsDB.getAllGroups(function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function getGroupMembers(request, respond) {
    groupsDB.getGroupMembers(function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function getGroupArticles(request, respond) {
    groupsDB.getGroupArticles(function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function addGroup(request, respond) {
    var group = new Group(null, request.body.groupName, request.body.description, request.body.groupPhoto);
    groupsDB.addGroup(group, function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function updateGroup(request, respond) {
    var group = new Group(parseInt(request.params.id), request.body.groupName, request.body.description, request.body.groupPhoto);
    groupsDB.updateGroup(group, function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function deleteGroup(request, respond) {
    var groupId = request.params.id;
    groupsDB.deleteGroup(groupId, function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

module.exports = {getAllGroups, getGroupMembers, getGroupArticles, addGroup, updateGroup, deleteGroup};