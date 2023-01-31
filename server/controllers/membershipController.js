"use strict";

const MembershipsDB = require('../models/MembershipsDB');
const Membership = require('../models/Membership');

var membershipsDB = new MembershipsDB();

function getAllMemberships(request, respond) {
    membershipsDB.getAllMemberships(function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function addMembership(request, respond) {
    var membership = new Membership(null, request.body.admin, request.body.userId, request.body.groupId)
    membershipsDB.addMembership(membership, function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function updateMembership(request, respond) {
    var membership = new Membership(parseInt(request.params.id), request.body.admin, request.body.userId, request.body.groupId);
    membershipsDB.updateMembership(membership, function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function deleteMembership(request, respond) {
    var membershipId = request.params.id;
    membershipsDB.deleteMembership(membershipId, function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

module.exports = {getAllMemberships, addMembership, updateMembership, deleteMembership};