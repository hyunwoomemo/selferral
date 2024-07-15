import { useEffect, useState } from "react";

export const useDisableScroll = () => {
  const [windowObj, setWindowObj] = useState<Window>();

  useEffect(() => {
    if (window !== undefined) {
      setWindowObj(window);
    }
  }, []);

  const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  // modern Chrome requires { passive: false } when adding event
  let supportsPassive = false;
  try {
    windowObj?.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassive = true;
        },
      })
    );
  } catch (e) {}

  const wheelOpt = supportsPassive ? { passive: false } : false;
  const wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

  // call this to Disable
  function disableScroll() {
    windowObj?.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    windowObj?.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    windowObj?.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    windowObj?.addEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  // call this to Enable
  function enableScroll() {
    windowObj?.removeEventListener("DOMMouseScroll", preventDefault, false);
    windowObj?.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    windowObj?.removeEventListener("touchmove", preventDefault, wheelOpt);
    windowObj?.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  return { disableScroll, enableScroll };
};
