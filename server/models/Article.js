"use strict";

class Article {
    constructor(id, title, body, postedTime, memberId, groupId) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.postedTime = postedTime;
        this.memberId = memberId;
        this.groupId = groupId;
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getBody() {
        return this.body;
    }
    
    getPostedTime() {
        return this.postedTime;
    }

    getMemberId() {
        return this.memberId;
    }

    getGroupId() {
        return this.groupId;
    }

    setTitle(title) {
        this.title = title;
    }
    
    setBody(body) {
        this.body = body;
    }

    setPostedTime(postedTime) {
        this.postedTime = postedTime;
    }

    setMemberId(memberId) {
        this.memberId = memberId;
    }

    setGroupId(groupId) {
        this.groupId = groupId;
    }
}

module.exports = Article;