/*
 * adapt-contrib-flipCard
 * License - https://github.com/CrediPointSolutions/adapt-contrib-flipCard/blob/master/LICENSE
 * Maintainers - Himanshu Rajotia <himanshu.rajotia@credipoint.com>, CrediPoint Solutions <git@credipoint.com>
 */
define(function(require) {
  var ComponentView = require('coreViews/componentView');
  var Adapt = require('coreJS/adapt');

  var FlipCard = ComponentView.extend({

    events: {
      'click .flipCard-widget .flipCard-item': 'flipItem'
    },

    preRender: function() {
      this.listenTo(Adapt, 'device:resize', this.reRender, this);
      this.listenTo(Adapt, 'device:changed', this.reRender, this);
    },

    // this is use to set ready status for current component on postRender.
    postRender: function() {
      ComponentView.prototype.postRender.apply(this);
      var self = this;
      this.$('.flipCard-item-frontImage:first').load(function() {
        self.reRender();
      });
      if (!Modernizr.csstransforms3d) {
        this.$('.flipCard-item-back').hide();
      }
      this.setReadyStatus();
    },

    // This function called on triggering of device resize and device change event of Adapt.
    reRender: function() {
      var $flipCardContainer = this.$('.flipCard-item');
      var imageHeight = this.$('.flipCard-item-frontImage:first').height();
      if (imageHeight) {
        $flipCardContainer.height(imageHeight);
      }
    },

    // Click or Touch event handler for flip card.
    flipItem: function(event) {
      if (event) event.preventDefault();
      var $selectedElement = $(event.target);
      var flipType = this.model.get('_flipType');
      if (flipType === 'individualFlip') {
        this.performIndividualFlip($selectedElement);
      } else if (flipType === 'singleFlip') {
        this.performSingleFlip($selectedElement);
      }
    },

    // This function will be responsible to perform Individual flip on flipCard
    // where all cards can flip and stay in the flipped state.
    performIndividualFlip: function($selectedElement) {
      var $flipCardItem;
      if ($selectedElement.hasClass('flipCard-item')) {
        $flipCardItem = $selectedElement;
      } else {
        $flipCardItem = $selectedElement.closest('.flipCard-item');
      }

      if (!Modernizr.csstransforms3d) {
        var $frontFlipCard = $flipCardItem.find('.flipCard-item-front');
        var $backFlipCard = $flipCardItem.find('.flipCard-item-back');
        var flipTime = this.model.get('_flipTime') | 'fast';
        if ($frontFlipCard.is(':visible')) {
          $frontFlipCard.fadeOut(flipTime, function() {
            $backFlipCard.fadeIn(flipTime);
          });
        } else if ($backFlipCard.is(':visible')) {
          $backFlipCard.fadeOut(flipTime, function() {
            $frontFlipCard.fadeIn(flipTime);
          });
        }
      } else {
        $flipCardItem.toggleClass('flipCard-flip');
      }

      var flipCardElementIndex = this.$('.flipCard-item').index($flipCardItem);
      this.setVisited(flipCardElementIndex);
    },

    // This function will be responsible to perform Single flip on flipCard where
    // only one card can flip and stay in the flipped state.
    performSingleFlip: function($selectedElement) {
      var $flipCardItem;
      if ($selectedElement.hasClass('flipCard-item')) {
        $flipCardItem = $selectedElement;
      } else {
        $flipCardItem = $selectedElement.closest('.flipCard-item');
      }

      var flipCardContainer = $flipCardItem.closest('.flipCard-widget');
      if (!Modernizr.csstransforms3d) {
        var frontFlipCard = $flipCardItem.find('.flipCard-item-front');
        var backFlipCard = $flipCardItem.find('.flipCard-item-back');
        var flipTime = this.model.get('_flipTime') | 'fast';

        if (backFlipCard.is(':visible')) {
          backFlipCard.fadeOut(flipTime, function() {
            frontFlipCard.fadeIn(flipTime);
          });
        } else {
          var visibleFlipCardBack = flipCardContainer.find('.flipCard-item-back:visible');
          if (visibleFlipCardBack.length > 0) {
            visibleFlipCardBack.fadeOut(flipTime, function() {
              flipCardContainer.find('.flipCard-item-front:hidden').fadeIn(flipTime);
            });
          }
          frontFlipCard.fadeOut(flipTime, function() {
            backFlipCard.fadeIn(flipTime);
          });
        }
      } else {
        if ($flipCardItem.hasClass('flipCard-flip')) {
          $flipCardItem.removeClass('flipCard-flip');
        } else {
          flipCardContainer.find('.flipCard-item').removeClass('flipCard-flip');
          $flipCardItem.addClass('flipCard-flip');
        }
      }

      var flipCardElementIndex = this.$('.flipCard-item').index($flipCardItem);
      this.setVisited(flipCardElementIndex);
    },

    // This function will set the visited status for particular flipCard item.
    setVisited: function(index) {
      var item = this.model.get('items')[index];
      item._isVisited = true;
      this.checkCompletionStatus();
    },

    // This function will be used to get visited states of all flipCard items.
    getVisitedItems: function() {
      return _.filter(this.model.get('items'), function(item) {
        return item._isVisited;
      });
    },

    // This function will check or set the completion status of current component.
    checkCompletionStatus: function() {
      if (!this.model.get('_isComplete')) {
        if (this.getVisitedItems().length === this.model.get('items').length) {
          this.setCompletionStatus();
        }
      }
    }
  });

  Adapt.register('flipCard', FlipCard);
  return FlipCard;

});