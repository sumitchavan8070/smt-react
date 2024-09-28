import React from "react";

class AssetPath {
  // Use require to load local images in React Native
    static visaCard = require("../../../assets/card.png");

    static ruPayImage = require("../../../assets/RazorpayBanner.png");
    static paymentImage = require ("../../../assets/card.png"); 
    static contactImage = require ("../../../assets/contact.png");
    static aboutImage = require ("../../../assets/teamwork.png"); 
    static logoutImage = require( "../../../assets/logout.png"); 


    // --------------- png Images --------------------- 
    static cancel = require( "../../../assets/rasters/cancel.png"); 
    static success = require( "../../../assets/rasters/success.png"); 
    static wtsback = require( "../../../assets/wtsback.png"); 





    // --------------- lottie animations --------------------- 
    static confettiAnimation = require("../../../assets/lottie/confitee.json"); 
    static donationfile = require("../../../assets/lottie/donationfile.json"); 
    static girl = require("../../../assets/lottie/girl.json"); 
    static yogaboy = require("../../../assets/lottie/yogaboy.json"); 
    static group = require("../../../assets/lottie/group.json"); 
    static share = require("../../../assets/lottie/share.json"); 
    static loader = require("../../../assets/lottie/loader.json"); 
    static ins = require("../../../assets/lottie/ins.json"); 
    static ins = require("../../../assets/lottie/review.json"); 


}

export default AssetPath;
