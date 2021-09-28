import Adapt from 'core/js/adapt';
import React from 'react';
import { compile, classes, templates, html } from 'core/js/reactHelpers';

export default function flipcard(props) {
  // const ariaLabels = Adapt.course.get('_globals')._accessibility._ariaLabels;

  const {
    _flipDirection,
    backBody,
    backTitle,
    frontImage
  } = props;

  return (
    <div 
      className='flipcard__inner component__inner' 
      role='region'
      // aria-label='{{_globals._components._flipcard.ariaRegion}}'
    >

      <templates.header {...props} />

      <div className='flipcard__widget component__widget clearfix'>

        {props._items.map(({ backBody, backTitle, frontImage }, index) => 
          
          <div 
            className={classes([
              `flipcard__item component__item item-${index}`,
              {_flipDirection}
            ])}
          >
            <div className='flipcard__item-face flipcard__item-front'>
              <img
                className='flipcard__item-frontImage'
                src={frontImage.src} 
                aria-label={frontImage.alt}>
              </img>
            </div>

          <div className='flipcard__item-face flipcard__item-back'>

            {backTitle && 
              <div 
                className='flipcard__item-back-title'
                aria-live='polite'
              >
              {html(compile(backTitle))}
              </div>
            }

            {backBody && 
              <div 
                className='flipcard__item-back-body'
                aria-live='polite'
              >
              {html(compile(backBody))}
              </div>
            }

          </div>
          </div>

        )}
      </div>

    </div>
  );
}