define([
  'coreViews/componentView',
  'coreJS/adapt',
  'underscore'
], function(ComponentView, Adapt){

  class Flipcard extends ComponentView {

    events() {
      return {
        'click .flipcard__item': 'onClickFlipItem',
        'keypress .flipcard__item': 'onClickFlipItem'
      }
    }

    // this is used to set ready status for current component on postRender.
    postRender() {
      const items = this.model.get('_items');
      const $items = this.$('.flipcard__item');

      if (!Modernizr.testProp('transformStyle', 'preserve-3d')) {
        this.$('.flipcard__item-back').hide();
      }

      // Width css class for single or multiple images in flipcard.
      const className = (items.length > 1) ? 'flipcard__multiple' : 'flipcard__single';
      $items.addClass(className);

      this.$('.flipcard__widget').imageready(_.bind(function() {
        this.reRender();
        this.setReadyStatus();
      }, this));
    }

    // Used to check if the flipcard should reset on revisit
    checkIfResetOnRevisit() {
      const isResetOnRevisit = this.model.get('_isResetOnRevisit');

      // If reset is enabled set defaults
      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }

      _.each(this.model.get('_items'), function(item) {
        item._isVisited = false;
      });
    }

    // This function called on triggering of device resize and device change event of Adapt.
    // It sets the height of the flipcard component to the first image in the component.
    reRender() {
      const $firstItemImage = this.$('.flipcard__item-frontImage').eq(0);
      const $items = this.$('.flipcard__item');
      const flexBasis = $items.length >  1 ? '49%' : '100%';

      // Reset width so that dimensions can be recalculated
      $items.css({ flexBasis: flexBasis });

      const imageHeight = Math.round($firstItemImage.height());
      const itemWidth = Math.floor($items.eq(0).outerWidth());

      if (imageHeight) {
        $items.height(imageHeight);
      }

      // Responsive margin to make horizontal and vertical gutters equal
      const gutterWidth = itemWidth * 0.04;

      $items.css({
        flexBasis: itemWidth,
        marginBottom: gutterWidth
      });
    }

    // Click or Touch event handler for flip card.
    onClickFlipItem(event) {
      if (event && event.target.tagName.toLowerCase() === 'a') {
        return;
      } else {
        event && event.preventDefault();
      }

      const $selectedElement = $(event.currentTarget);
      const flipType = this.model.get('_flipType');

      if (flipType === 'allFlip') {
        this.performAllFlip($selectedElement);
      } else if (flipType === 'singleFlip') {
        this.performSingleFlip($selectedElement);
      }
    }

    // This function will be responsible to perform All flip on flipcard
    // where all cards can flip and stay in the flipped state.
    performAllFlip($selectedElement) {
      if (!Modernizr.testProp('transformStyle', 'preserve-3d')) {
        const $frontflipcard = $selectedElement.find('.flipcard__item-front');
        const $backflipcard = $selectedElement.find('.flipcard__item-back');
        const flipTime = this.model.get('_flipTime') || 'fast';
        if ($frontflipcard.is(':visible')) {
          $frontflipcard.fadeOut(flipTime, () => {
            $backflipcard.fadeIn(flipTime);
          });
        } else if ($backflipcard.is(':visible')) {
          $backflipcard.fadeOut(flipTime, () => {
            $frontflipcard.fadeIn(flipTime);
          });
        }
      } else {
        $selectedElement.toggleClass('flipcard__flip');
      }

      const flipcardElementIndex = this.$('.flipcard__item').index($selectedElement);
      this.setVisited(flipcardElementIndex);
    }

    // This function will be responsible to perform Single flip on flipcard where
    // only one card can flip and stay in the flipped state.
    performSingleFlip($selectedElement) {
      const $items = $('.flipcard__item');
      const flipcardFlip = 'flipcard__flip';
      const flipcardContainer = $selectedElement.closest('.flipcard__widget');
      if (!Modernizr.testProp('transformStyle', 'preserve-3d')) {
        const frontflipcard = $selectedElement.find('.flipcard__item-front');
        const backflipcard = $selectedElement.find('.flipcard__item-back');
        const flipTime = this.model.get('_flipTime') || 'fast';

        if (backflipcard.is(':visible')) {
          backflipcard.fadeOut(flipTime, function() {
            frontflipcard.fadeIn(flipTime);
          });
        } else {
          const visibleflipcardBack = flipcardContainer.find('.flipcard__item-back:visible');
          if (visibleflipcardBack.length > 0) {
            visibleflipcardBack.fadeOut(flipTime, function() {
              flipcardContainer.find('.flipcard__item-front:hidden').fadeIn(flipTime);
            });
          }
          frontflipcard.fadeOut(flipTime, function() {
            backflipcard.fadeIn(flipTime);
          });
        }
      } else {
        if ($selectedElement.hasClass(flipcardFlip)) {
          $selectedElement.removeClass(flipcardFlip);
        } else {
          flipcardContainer.find($items).removeClass(flipcardFlip);
          $selectedElement.addClass(flipcardFlip);
        }
      }

      const flipcardElementIndex = this.$('.flipcard__item').index($selectedElement);
      this.setVisited(flipcardElementIndex);
    }

    // This function will set the visited status for particular flipcard item.
    setVisited(index) {
      const item = this.model.get('_items')[index];
      item._isVisited = true;
      this.checkCompletionStatus();
    }

    // This function will be used to get visited states of all flipcard items.
    getVisitedItems() {
      return _.filter(this.model.get('_items'), function(item) {
        return item._isVisited;
      });
    }

    // This function will check or set the completion status of current component.
    checkCompletionStatus() {
      if (this.getVisitedItems().length === this.model.get('_items').length) {
        this.setCompletionStatus();
      }
    }
  };

  Adapt.register('flipcard', Flipcard);

  return Flipcard;

});
