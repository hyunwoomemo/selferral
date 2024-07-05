import React from "react";

interface ISectionProps {
  pageNum: number;
  window: Window;
  pageRefs: React.MutableRefObject<HTMLDivElement[]>;
  children: any;
}

const Section = (props: ISectionProps) => {
  return (
    <div
      ref={(element) => {
        props.pageRefs.current[props.pageNum] = element!;
      }}
      className={`w-screen h-screen`}
    >
      <span>Page {props.pageNum}</span>
      <div>{props.children}</div>
    </div>
  );
};

export default Section;
