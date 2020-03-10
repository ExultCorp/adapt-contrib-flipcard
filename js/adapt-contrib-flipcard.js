define([
    'coreViews/componentView',
    'coreJS/adapt',
    'underscore'
], function(ComponentView, Adapt) {

    var Flipcard = ComponentView.extend({

        events: {
            'click .flipcard-item': 'onClickFlipItem'
        },

        preRender: function() {
            this.listenTo(Adapt, 'device:resize', this.reRender, this);
            this.checkIfResetOnRevisit();

            _.each(this.model.get('_items'), function(item) {
                if (!item._flipDirection) {
                    item._flipDirection = 'horizontal';
                }
            });
        },

        // this is use to set ready status for current component on postRender.
        postRender: function() {
            var items = this.model.get('_items');
            var $items = this.$('.flipcard-item');

            _.each($items, function(el, i) {
                this.toggleCardSideVisibility($(el));
            }.bind(this));

            // Width css class for single or multiple images in flipcard.
            var className = (items.length > 1) ? 'flipcard-multiple' : 'flipcard-single';
            $items.addClass(className);

            this.$('.flipcard-widget').imageready(_.bind(function() {
                this.setItemDimensions();
                this.setReadyStatus();
            }, this));

        },

        // Used to check if the flipcard should reset on revisit
        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }

            _.each(this.model.get('_items'), function(item) {
                item._isVisited = false;
            });
        },

        // This function sets the height of the flipcard component to the first image in the component.
        setItemDimensions: function() {
            var $firstItemImage = this.$('.flipcard-item-frontImage').eq(0);

            var $items = this.$('.flipcard-item');
            var flexBasis = $items.length >  1 ? '49%' : '100%';

            // Reset width so that dimensions can be recalculated
            $items.css({ flexBasis: flexBasis });

            var imageHeight = Math.round($firstItemImage.height());
            var itemWidth = Math.floor($items.eq(0).outerWidth());

            if (imageHeight) {
                $items.height(imageHeight);
            }

            // Responsive margin to make horizontal and vertical gutters equal
            var gutterWidth = itemWidth * 0.04;

            $items.css({
                flexBasis: itemWidth,
                marginBottom: gutterWidth
            });
        },

        // This function called on triggering of device resize and device change event of Adapt.
        reRender: function() {
            this.setItemDimensions();
        },

        // Click or Touch event handler for flip card.
        onClickFlipItem: function(event) {
            if (event && event.target.tagName.toLowerCase() === 'a') {
                return;
            } else {
                event && event.preventDefault();
            }

            var $selectedElement = $(event.currentTarget);
            var flipType = this.model.get('_flipType');

            if (flipType === 'allFlip') {
                this.performAllFlip($selectedElement);
            } else if (flipType === 'singleFlip') {
                this.performSingleFlip($selectedElement);
            }

            _.defer(_.bind(function() {
                this.toggleFlipcardAccessibility($selectedElement);

                if (Adapt.config.has('_accessibility') && Adapt.config.get('_accessibility')._isActive) {
                    _.delay(function() {
                        // Allow animation to complete before focusing
                        $selectedElement.a11y_focus();
                    }, 500);
                }
            }, this));
        },

        // This function is responsible for rotating an individual item
        flipItem: function($selectedElement) {
            if ($selectedElement.hasClass('flipcard-flip')) {
                if ($selectedElement.hasClass('vertical')) {
                    $selectedElement.velocity({ rotateX: "180deg" });
                } else {
                    $selectedElement.velocity({ rotateY: "180deg" });
                }
            } else {
                if ($selectedElement.hasClass('vertical')) {
                    $selectedElement.velocity({ rotateX: 0 });
                } else {
                    $selectedElement.velocity({ rotateY: 0 });
                }
            }
        },

        // This function will be responsible to perform All flip on flipcard
        // where all cards can flip and stay in the flipped state.
        performAllFlip: function($selectedElement) {
            $selectedElement.toggleClass('flipcard-flip');
            this.flipItem($selectedElement);
            var flipcardElementIndex = this.$('.flipcard-item').index($selectedElement);
            this.setVisited(flipcardElementIndex);
        },

        toggleFlipcardAccessibility: function($selectedElement) {
            if (this.model.get('flipType') === 'allFlip') {
                this.toggleCardSideVisibility($selectedElement);
            } else {
                _.each(this.$('.flipcard-item'), function(el) {
                    this.toggleCardSideVisibility($(el));
                }.bind(this));
            }
        },

        toggleCardSideVisibility: function($selectedElement) {
            var hasBeenFlipped = $selectedElement.hasClass('flipcard-flip');
            var $front = $selectedElement.find('.flipcard-item-front');
            var $back = $selectedElement.find('.flipcard-item-back');
            var $textElements = $back.children();

            $textElements.a11y_cntrl_enabled(hasBeenFlipped);
            $front.attr('aria-hidden', hasBeenFlipped).toggleClass('a11y-ignore', hasBeenFlipped);
            $back.attr('aria-hidden', !hasBeenFlipped).toggleClass('a11y-ignore', !hasBeenFlipped);
        },

        // This function will be responsible to perform Single flip on flipcard where
        // only one card can flip and stay in the flipped state.
        performSingleFlip: function($selectedElement) {
            var $items = this.$('.flipcard-item');
            var shouldFlip = !$selectedElement.hasClass('flipcard-flip');

            _.each($items, function(item) {
                var $item = $(item);
                if ($item.hasClass('flipcard-flip')) {
                    $item.removeClass('flipcard-flip');
                    this.flipItem($item);
                }
            }.bind(this));

            if (shouldFlip) {
                $selectedElement.addClass('flipcard-flip');
                this.flipItem($selectedElement);
            }

            var index = $items.index($selectedElement);
            this.setVisited(index);
        },

        // This function will set the visited status for particular flipcard item.
        setVisited: function(index) {
            var item = this.model.get('_items')[index];
            item._isVisited = true;
            this.checkCompletionStatus();
        },

        // This function will be used to get visited states of all flipcard items.
        getVisitedItems: function() {
            return _.filter(this.model.get('_items'), function(item) {
                return item._isVisited;
            });
        },

        // This function will check or set the completion status of current component.
        checkCompletionStatus: function() {
            if (this.getVisitedItems().length === this.model.get('_items').length) {
                this.setCompletionStatus();
            }
        }
    });

    Adapt.register('flipcard', Flipcard);

    return Flipcard;

});
