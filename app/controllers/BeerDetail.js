var ratingStars = require('ratingStars');

var args = arguments[0] || {};

var theBeers = Alloy.Collections.beers;
theBeers.fetch();

//console.log("------------------------------");
//console.log("args.favourite", args.favourite);

// The Image

var date = new Date(args.date);

// The Details

$.BeerDetail.setTitle(args.name);

Alloy.Globals.mapLabelText($, args, true);


// Navigation Bar Button

if (OS_IOS) {
    var editButton = Ti.UI.createButton({ titleid: "detail_edit_btn" });
    $.BeerDetail.setRightNavButton(editButton);
    
    editButton.addEventListener("click", function (e) {
        args.edit = true;
        var window = Alloy.createController('addBeer', args).getView();
        window.open({
            modal:true,
            modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
            modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
        });   
    });
}



// Update Beer after edit event fired in addBeer.js

Ti.App.addEventListener("app:updateBeer", function(event) {
    theBeers.fetch();
    var updatedData = event.data;
    $.BeerDetail.setTitle(updatedData.name);
    var updatedStars = ratingStars.drawStars({
        rating: updatedData.rating,
        starHeight: 22,
        starWidth: 22
    });
    if (theStars) { $.ratingView.remove(theStars); theStars = null; };
    theStars = updatedStars;
    $.ratingView.add(theStars);
    
    Alloy.Globals.mapLabelText($, updatedData, event.shouldSetImage);
    args = updatedData;
});



// Apply Star Ratings

var theStars = ratingStars.drawStars({
    rating: args.rating,
    starHeight: 22,
    starWidth: 22
});

$.ratingView.add(theStars);


// View Image

function viewImage() {
    var beerImage = Alloy.createController("BeerImage");
    beerImage.image.image = $.image.image;
    beerImageView = beerImage.getView();
    Alloy.Globals.mainTabGroup.getActiveTab().open(beerImageView);    
}


// Share Dialog

function share() {

   var Social = require('dk.napp.social');
   
   var theImage = Alloy.Globals.getImage(args);
   console.log(theImage);
   
   if (theImage) {
       if (typeof theImage === "object") {
           theImagePath = theImage.getNativePath();
       } else {
           theImagePath = theImage;
       }
   } else {
       theImagePath = null;
   }

   Social.activityView({
        text: L("share_beer_name") + " " + args.name,
        image: theImagePath,
        removeIcons:"airdrop,print,copy,contact,camera"
   }, [
        {
            title: args.favourite ? L("detail_remove_from_favourites") : L("detail_add_to_favourites"),
            type:"hello.world",
            image:"heart.png",
            callback: function(e) {
                Ti.App.fireEvent("app:addToFavorites", {
                    args: args
                });
            }
        }
   ]);  
   //Ti.API.info("module is => " + Social);   
   //Ti.API.info("Twitter available: " + Social.isTwitterSupported());
   //Ti.API.info("Facebook available: " + Social.isFacebookSupported());   
};

function deleteBeer() {
    var yesButton = L("delete_beer_yes");
    var cancelButton = L("delete_beer_no");
    
    var deleteDialog = Ti.UI.createAlertDialog({
       id: "deleteDialog",
       title: L("delete_beer_title"),
       message: L("delete_beer_message"),
       cancel: "0",
       buttonNames: [
          cancelButton, yesButton
       ] 
    });
    deleteDialog.show();   
    
    deleteDialog.addEventListener("click", confirmDeleteBeer);
}

function confirmDeleteBeer(e) {
    if (e.index === 1) {
        var beers = Alloy.Collections.beers;
        var theBeer = beers.where({"alloy_id": args.alloy_id})[0];     
        theBeer.destroy({success: function (model, response) {
            $.BeerDetail.close();    
        }});   
    }
};

$.BeerDetail.addEventListener("close", function() {
    $.destroy();
});
