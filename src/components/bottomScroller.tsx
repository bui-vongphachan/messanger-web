"use client";

import { useEffect, useRef, useState } from "react";

const BottomScroller = (Props: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isAtBottom, setIsAtBottom] = useState(true);

  const divRef = useRef<HTMLDivElement>(null);
  const buttomRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    const div = divRef.current;

    if (!div) return;

    if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
      return setIsAtBottom(true);
    }

    setIsAtBottom(false);
  };

  useEffect(() => {
    const div = divRef.current;

    if (!div) return;

    div.addEventListener("scroll", checkScroll);

    return () => {
      div.removeEventListener("scroll", checkScroll);
    };
  }, []);

  useEffect(() => {
    const div = divRef.current;

    if (!div) return;

    if (!isAtBottom) return;

    div.scrollTop = div.scrollHeight;
  });

  return (
    <div
      ref={divRef}
      className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden py-4"
    >
      {Props.children}
      <div ref={buttomRef} id="bottom" className=" hidden">
        bottom
      </div>
    </div>
  );
};

export default BottomScroller;
