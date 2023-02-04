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

  login(userName, callback) {
    var sql =
      "SELECT _id, password FROM user WHERE userName = ?";
    db.query(sql, [userName], callback);
  }

  googleSignIn(userEmail, callback) {
    var sql = 
    "SELECT _id, password FROM user WHERE userEmail = ?";
    db.query(sql, [userEmail], callback);
  }

  getUserById(userId, callback) {
    var sql = 
      "SELECT userName, userEmail, userPhoto, userContact, userGender, userBio FROM user WHERE _id = ?";
    db.query(sql, [userId], callback);
  }

  addUser(user, callback) {
    var sql =
      "INSERT INTO user (userName, userEmail, userPhoto, userContact, userGender, userBio, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        user.getUserName(),
        user.getUserEmail(),
        user.getUserPhoto(),
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
      "UPDATE user SET userName = ?, userPhoto = ?, userEmail = ?, userContact = ?, userGender = ?, userBio = ? WHERE _id = ?";
    return db.query(
      sql,
      [
        user.getUserName(),
        user.getUserPhoto(),
        user.getUserEmail(),
        user.getUserContact(),
        user.getUserGender(),
        user.getUserBio(),
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
