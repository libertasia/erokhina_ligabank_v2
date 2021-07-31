import {useEffect} from 'react';

const MOUSE_DOWN = `mousedown`;

const onOverlayClick = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(MOUSE_DOWN, listener);

    return () => {
      document.removeEventListener(MOUSE_DOWN, listener);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
};

const zeroPad = (num, places) => String(num).padStart(places, `0`);

export {onOverlayClick, zeroPad};
