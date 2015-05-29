/*
 * adapt-contrib-flipCard
 * License - https://github.com/ExultCorp/adapt-contrib-flipCard/blob/master/LICENSE
 * Maintainers - Himanshu Rajotia <himanshu.rajotia@exultcorp.com>
 */
define(function(require) {
  var ComponentView = require("coreViews/componentView");
  var Adapt = require("coreJS/adapt");

  var FlipCard = ComponentView.extend({

    events: {
      "click .flipCard-item": "onClickFlipItem"
    },

    preRender: function() {
      this.listenTo(Adapt, "device:resize", this.reRender, this);
    },

    // this is use to set ready status for current component on postRender.
    postRender: function() {
      if (!Modernizr.csstransforms3d) {
        this.$(".flipCard-item-back").hide();
      }

      this.$('.flipCard-widget').imageready(_.bind(function() {
          this.setReadyStatus();
          this.reRender();
      }, this));
    },

    // This function called on triggering of device resize and device change event of Adapt.
    reRender: function() {
      var imageHeight = this.$(".flipCard-item-frontImage").eq(0).height();
      if (imageHeight) {
        this.$(".flipCard-item").height(imageHeight);
      }
    },

    // Click or Touch event handler for flip card.
    onClickFlipItem: function(event) {
      if(event && event.preventDefault) event.preventDefault();

      var $selectedElement = $(event.currentTarget);
      var flipType = this.model.get("_flipType");
      if (flipType === "allFlip") {
        this.performAllFlip($selectedElement);
      } else if (flipType === "singleFlip") {
        this.performSingleFlip($selectedElement);
      }
    },

    // This function will be responsible to perform All flip on flipCard
    // where all cards can flip and stay in the flipped state.
    performAllFlip: function($selectedElement) {
      if (!Modernizr.csstransforms3d) {
        var $frontFlipCard = $selectedElement.find(".flipCard-item-front");
        var $backFlipCard = $selectedElement.find(".flipCard-item-back");
        var flipTime = this.model.get("_flipTime") || "fast";
        if ($frontFlipCard.is(":visible")) {
          $frontFlipCard.fadeOut(flipTime, function() {
            $backFlipCard.fadeIn(flipTime);
          });
        } else if ($backFlipCard.is(":visible")) {
          $backFlipCard.fadeOut(flipTime, function() {
            $frontFlipCard.fadeIn(flipTime);
          });
        }
      } else {
        $selectedElement.toggleClass("flipCard-flip");
      }

      var flipCardElementIndex = this.$(".flipCard-item").index($selectedElement);
      this.setVisited(flipCardElementIndex);
    },

    // This function will be responsible to perform Single flip on flipCard where
    // only one card can flip and stay in the flipped state.
    performSingleFlip: function($selectedElement) {
      var flipCardContainer = $selectedElement.closest(".flipCard-widget");
      if (!Modernizr.csstransforms3d) {
        var frontFlipCard = $selectedElement.find(".flipCard-item-front");
        var backFlipCard = $selectedElement.find(".flipCard-item-back");
        var flipTime = this.model.get("_flipTime") || "fast";

        if (backFlipCard.is(":visible")) {
          backFlipCard.fadeOut(flipTime, function() {
            frontFlipCard.fadeIn(flipTime);
          });
        } else {
          var visibleFlipCardBack = flipCardContainer.find(".flipCard-item-back:visible");
          if (visibleFlipCardBack.length > 0) {
            visibleFlipCardBack.fadeOut(flipTime, function() {
              flipCardContainer.find(".flipCard-item-front:hidden").fadeIn(flipTime);
            });
          }
          frontFlipCard.fadeOut(flipTime, function() {
            backFlipCard.fadeIn(flipTime);
          });
        }
      } else {
        if ($selectedElement.hasClass("flipCard-flip")) {
          $selectedElement.removeClass("flipCard-flip");
        } else {
          flipCardContainer.find(".flipCard-item").removeClass("flipCard-flip");
          $selectedElement.addClass("flipCard-flip");
        }
      }

      var flipCardElementIndex = this.$(".flipCard-item").index($selectedElement);
      this.setVisited(flipCardElementIndex);
    },

    // This function will set the visited status for particular flipCard item.
    setVisited: function(index) {
      var item = this.model.get("_items")[index];
      item._isVisited = true;
      this.checkCompletionStatus();
    },

    // This function will be used to get visited states of all flipCard items.
    getVisitedItems: function() {
      return _.filter(this.model.get("_items"), function(item) {
        return item._isVisited;
      });
    },

    // This function will check or set the completion status of current component.
    checkCompletionStatus: function() {
      if (!this.model.get("_isComplete")) {
        if (this.getVisitedItems().length === this.model.get("_items").length) {
          this.setCompletionStatus();
        }
      }
    }
  });

  Adapt.register("flipCard", FlipCard);

  return FlipCard;

});
