import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { Global } from '@emotion/core';
import { usePageLoadingContext } from '@redwoodjs/router';

interface NProgressContainerProps {
  /**
   * Refers to a color found in the theme eg. 'primary', 'secondary',
   * or any valid css color eg. "#fff"
   */
  color: string;
  /** Display a spinner with the loading bar */
  withSpinner?: boolean;
  /** nprogress [configuration object](https://github.com/rstacruz/nprogress#configuration) */
  options?: NProgress.NProgressOptions;
}

/**
 * Theme aware drop in NProgress component.
 */
const NProgressContainer = ({
  color,
  withSpinner,
  options,
}: NProgressContainerProps) => {
  // configure nprogress with the passed in options on mount and updates
  useEffect(() => {
    if (options) {
      NProgress.configure(options);
    }
  }, [options]);

  // obtain page loading state from router
  const { loading } = usePageLoadingContext();

  // Start or end NProgress depending on loading state
  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }

    return () => {
      NProgress.done();
    };
  }, [loading]);

  return (
    <Global
      styles={theme => {
        // tries to find a corresponding color in the theme but falls back
        // to whatever color is supplied
        const themeColor: string = theme?.colors?.[color] || color;

        return {
          '#nprogress': {
            pointerEvents: 'none',
          },
          '#nprogress .bar': {
            background: themeColor,
            position: 'fixed',
            zIndex: 1031,
            top: 0,
            left: 0,
            width: '100%',
            height: '2px',
          },
          '#nprogress .peg': {
            display: 'block',
            position: 'absolute',
            right: '0px',
            width: '100px',
            height: '100%',
            boxShadow: `0 0 10px ${themeColor}, 0 0 5px ${themeColor}`,
            opacity: 1,
            transform: 'rotate(3deg) translate(0px, -4px)',
          },
          '#nprogress .spinner': {
            display: withSpinner ? 'block' : 'none',
            position: 'fixed',
            zIndex: 1031,
            top: '15px',
            right: '15px',
          },
          '#nprogress .spinner-icon': {
            width: '18px',
            height: '18px',
            boxSizing: 'border-box',

            border: 'solid 2px transparent',
            borderTopColor: themeColor,
            borderLeftColor: themeColor,
            borderRadius: '50%',

            animation: 'nprogress-spinner 400ms linear infinite',
          },
          '.nprogress-custom-parent': {
            overflow: 'hidden',
            position: 'relative',
          },

          '.nprogress-custom-parent #nprogress .spinner': {
            position: 'absolute',
          },

          '.nprogress-custom-parent #nprogress .bar': {
            position: 'absolute',
          },

          '@keyframes nprogress-spinner': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
        };
      }}
    />
  );
};

NProgressContainer.defaultProps = {
  color: 'primary',
};

export default NProgressContainer;
