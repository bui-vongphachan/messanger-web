"use client";

import { useEffect, useRef } from "react";

const BottomScroller = (props: {
  children: React.ReactNode;
  className?: string;
  resetDependancy?: any;
  onTopReached?: () => void;
}) => {
  const { onTopReached } = props;

  const divRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                      for triggering an event when the user reaches the top of the list                     */
  /* ------------------------------------------------------------------------------------------------------------------ */

  useEffect(() => {
    if (!onTopReached) return;

    if (!topRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          if (onTopReached) onTopReached();
        }
      },
      { threshold: 1 }
    );

    observer.observe(topRef.current);

    return () => {
      observer.disconnect();
    };
  }, [onTopReached]);

  return (
    <div
      id="bottom-scroller"
      ref={divRef}
      className="flex flex-col-reverse overflow-y-auto overflow-x-hidden py-4"
    >
      {props.children}
      <div ref={topRef} id="top" className=" relative">
        <div className=" absolute w-full h-[2 00px] bg-red-500" />
      </div>
    </div>
  );
};

export default BottomScroller;
