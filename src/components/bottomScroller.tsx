"use client";

import { useEffect, useRef, useState } from "react";

const BottomScroller = (props: {
  children: React.ReactNode;
  className?: string;
  resetDependancy?: any;
  onTopReached?: () => void;
}) => {
  const { onTopReached } = props;

  const [isAtBottom, setIsAtBottom] = useState(true);

  const divRef = useRef<HTMLDivElement>(null);
  const buttomRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                   make the scroll follows the bottom of the list unless the user is scrolling up                   */
  /* ------------------------------------------------------------------------------------------------------------------ */

  // const checkScroll = () => {
  //   const div = divRef.current;

  //   if (!div) return;

  //   if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
  //     return setIsAtBottom(true);
  //   }

  //   setIsAtBottom(false);
  // };

  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                        for tracking the scroll movement and calling function when users did                        */
  /* ------------------------------------------------------------------------------------------------------------------ */

  // useEffect(() => {
  //   const div = divRef.current;

  //   if (!div) return;

  //   div.addEventListener("scroll", checkScroll);

  //   return () => {
  //     div.removeEventListener("scroll", checkScroll);
  //   };
  // }, []);

  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                        for making the scroll go to the bottom when the component is mounted                        */
  /* ------------------------------------------------------------------------------------------------------------------ */

  // useEffect(() => {
  //   const div = divRef.current;

  //   if (!div) return;

  //   if (!isAtBottom) return;

  //   div.scrollTop = div.scrollHeight;
  // });

  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                           for reposition the scroll to the bottom when dependacy changes                           */
  /* ------------------------------------------------------------------------------------------------------------------ */

  useEffect(() => {
    if (!props.resetDependancy) return;

    setIsAtBottom(true);
  }, [props.resetDependancy]);

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
