"use strict"; 

class Restaurant {
    constructor(id, restaurantName, category, description, restaurantContact, location, region, websiteLink, openingHours, menuLink, image1, image2, image3, restaurantLogo) { 
        this.id = id; 
        this.restaurantName = restaurantName; 
        this.category = category; 
        this.description = description;
        this.restaurantContact = restaurantContact; 
        this.location = location; 
        this.region = region;
        this.websiteLink = websiteLink;
        this.openingHours = openingHours;
        this.menuLink = menuLink;
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
        this.restaurantLogo = restaurantLogo;
    } 

    getId() {
        return this.id;
    }

    getRestaurantName() { 
        return this.restaurantName; 
    } 

    getCategory() { 
        return this.category; 
    } 

    getDescription() { 
        return this.description; 
    } 

    getRestaurantContact() { 
        return this.restaurantContact; 
    } 

    getLocation() { 
        return this.location; 
    } 

    getRegion() { 
        return this.region; 
    } 

    getWebsiteLink() { 
        return this.websiteLink; 
    } 

    getOpeningHours() { 
        return this.openingHours; 
    } 

    getMenuLink() { 
        return this.menuLink; 
    } 

    getImage1() { 
        return this.image1; 
    } 

    getImage2() { 
        return this.image2; 
    } 

    getImage3() { 
        return this.image3; 
    } 

    getRestaurantLogo() { 
        return this.restaurantLogo; 
    } 

    setRestaurantName(restaurantName) { 
        this.restaurantName = restaurantName; 
    } 

    setCategory(category) { 
        this.category = category; 
    } 
 
    setDescription(description) { 
        this.description = description; 
    } 

    setRestaurantContact(restaurantContact) { 
        this.restaurantContact = restaurantContact; 
    } 

    setLocation(location) { 
        this.location = location; 
    } 

    setRegion(region) { 
        this.region = region; 
    } 

    setWebsiteLink(websiteLink) { 
        this.websiteLink = websiteLink; 
    } 

    setOpeningHours(openingHours) { 
        this.openingHours = openingHours; 
    } 

    setMenuLink(menuLink) { 
        this.menuLink = menuLink; 
    } 

    setImage1(image1) { 
        this.image1 = image1; 
    } 

    setImage2(image2) { 
        this.image2 = image2; 
    } 

    setImage3(image3) { 
        this.image3 = image3; 
    } 

    setRestaurantLogo(restaurantLogo) { 
        this.restaurantLogo = restaurantLogo; 
    } 
} 

module.exports = Restaurant;