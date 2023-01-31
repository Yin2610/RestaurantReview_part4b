"use strict";

class Membership {
    constructor(id, admin, userId, groupId) {
        this.id = id;
        this.admin = admin;
        this.userId = userId;
        this.groupId = groupId;
    }

    getId() {
        return this.id;
    }

    getAdmin() {
        return this.admin;
    }

    getUserId() {
        return this.userId;
    }

    getGroupId() {
        return this.groupId;
    }

    setAdmin(admin) {
        this.admin = admin;
    }

    setUserId(userId) {
        this.userId = userId;
    }

    setGroupId(groupId) {
        this.groupId = groupId;
    }
}

module.exports = Membership;