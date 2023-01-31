"use strict"; 

class User {
    constructor(id, userName, userEmail, userPhoto, userContact, userGender, userBio, password) { 
        this.id = id; 
        this.userName = userName; 
        this.userEmail = userEmail; 
        this.userPhoto = userPhoto;
        this.userContact = userContact; 
        this.userGender = userGender; 
        this.userBio = userBio;
        this.password = password;
    } 

    getId() {
        return this.id;
    }

    getUserName() { 
        return this.userName; 
    } 

    getUserEmail() { 
        return this.userEmail; 
    } 

    getUserPhoto() { 
        return this.userPhoto; 
    } 

    getUserContact() { 
        return this.userContact; 
    } 

    getUserGender() { 
        return this.userGender; 
    } 

    getUserBio() { 
        return this.userBio; 
    } 

    getPassword() { 
        return this.password; 
    } 

    setUserName(userName) { 
        this.userName = userName; 
    } 

    setUserEmail(userEmail) { 
        this.userEmail = userEmail; 
    } 
 
    setUserPhoto(userPhoto) { 
        this.userPhoto = userPhoto; 
    } 

    setUserContact(userContact) { 
        this.userContact = userContact; 
    } 

    setUserGender(userGender) { 
        this.userGender = userGender; 
    } 

    setUserBio(userBio) { 
        this.userBio = userBio; 
    } 

    setPassword(password) { 
        this.password = password; 
    } 
} 

module.exports = User;