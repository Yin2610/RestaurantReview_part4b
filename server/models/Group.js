"use strict";

class Group {
    constructor(id, groupName, description, groupPhoto) {
        this.id = id;
        this.groupName = groupName;
        this.description = description;
        this.groupPhoto = groupPhoto;
    }
    
    getId() {
        return this.id;
    }

    getGroupName() {
        return this.groupName;
    }

    getDescription() {
        return this.description;
    }

    getGroupPhoto() {
        return this.groupPhoto;
    }

    setGroupName(groupName) {
        this.groupName = groupName;
    }

    setDescription(description) {
        this.description = description;
    }

    setGroupPhoto(groupPhoto) {
        this.groupPhoto = groupPhoto;
    }
}

module.exports = Group;