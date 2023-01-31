"use strict";

var db = require("../db-connection");

class GroupsDB {
    getAllGroups(callback) {
        var sql = "SELECT * FROM restaurant_review.group";
        db.query(sql, callback);
    }

    getGroupMembers(callback) {
        var sql = "SELECT g.groupName, m.admin, u.userName, u.userEmail, u.userGender FROM `group` as g INNER JOIN membership as m ON g._id = m.groupId INNER JOIN user as u ON m.userId = u._id ORDER BY g.groupName ASC";
        db.query(sql, callback);
    }

    getGroupArticles(callback) {
        var sql = "SELECT g.groupName, COUNT(a._id) as articleCount FROM article as a RIGHT JOIN `group` as g On a.groupId = g._id GROUP BY g.groupName";
        db.query(sql, callback);
    }

    addGroup(group, callback) {
        var sql = "INSERT INTO `group` (groupName, description, groupPhoto) VALUES (?, ?, ?)";
        db.query(sql, [group.getGroupName(), group.getDescription(), group.getGroupPhoto()], callback);
    }

    updateGroup(group, callback) {
        var sql = "UPDATE `group` SET groupName = ?, description = ?, groupPhoto = ? WHERE _id = ?";
        db.query(sql, [group.getGroupName(), group.getDescription(), group.getGroupPhoto(), group.getId()], callback);
    }

    deleteGroup(groupId, callback) {
        var sql = "DELETE FROM `group` WHERE _id = ?";
        db.query(sql, [groupId], callback);
    }
}

module.exports = GroupsDB;