"use strict";

var db = require('../db-connection');

class MembershipsDB {
    getAllMemberships(callback) {
        var sql = "SELECT * FROM restaurant_review.membership";
        db.query(sql, callback);
    }

    addMembership(membership, callback) {
        var sql = "INSERT INTO membership(admin, userId, groupId) VALUES (?, ?, ?)";
        db.query(sql, [membership.getAdmin(), membership.getUserId(), membership.getGroupId()], callback)
    }

    updateMembership(membership, callback) {
        var sql = "UPDATE membership SET admin = ?, userId = ?, groupId = ? WHERE _id = ?";
        db.query(sql, [membership.getAdmin(), membership.getUserId(), membership.getGroupId(), membership.getId()], callback);
    }

    deleteMembership(membershipId, callback) {
        var sql = "DELETE FROM membership WHERE _id = ?";
        db.query(sql, [membershipId], callback);
    }
}

module.exports = MembershipsDB;