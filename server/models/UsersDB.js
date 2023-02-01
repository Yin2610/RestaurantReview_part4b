"use strict";

var db = require("../db-connection");

class UsersDB {
  getAllUsers(callback) {
    var sql = "SELECT * FROM restaurant_review.user";
    db.query(sql, callback);
  }

  getUsersAndReviews(callback) {
    var sql =
      "SELECT u.userName, COUNT(r._id) as reviewCount FROM user as u LEFT JOIN review as r ON u._id = r.userId GROUP BY u.userName";
    db.query(sql, callback);
  }

  login(userName, password, callback) {
    var sql =
      "SELECT * FROM user WHERE userName = ? AND password = ?";
    db.query(sql, [userName, password], callback);
  }

  addUser(user, callback) {
    var sql =
      "INSERT INTO user (userName, userEmail, userPhoto, userContact, userGender, userBio, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        user.getUserName(),
        user.getUserPhoto(),
        user.getUserEmail(),
        user.getUserContact(),
        user.getUserGender(),
        user.getUserBio(),
        user.getPassword(),
      ],
      callback
    );
  }
  updateUser(user, callback) {
    var sql =
      "UPDATE user SET userName = ?, userPhoto = ?, userEmail = ?, userContact = ?, userGender = ?, userBio = ?, password = ? WHERE _id = ?";
    return db.query(
      sql,
      [
        user.getUserName(),
        user.getUserPhoto(),
        user.getUserEmail(),
        user.getUserContact(),
        user.getUserGender(),
        user.getUserBio(),
        user.getPassword(),
        user.getId(),
      ],
      callback
    );
  }
  deleteUser(userId, callback) {
    var sql = "DELETE from user WHERE _id = ?";
    return db.query(sql, [userId], callback);
  }
}

module.exports = UsersDB;
