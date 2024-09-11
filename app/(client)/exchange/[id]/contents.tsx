import React from "react";
import { exchangeDetailContents } from "@/exchange-detail-contents";

const Contents = ({ exchangeName }: { exchangeName: string }) => {
  const { title, description, section } = exchangeDetailContents[exchangeName.toLowerCase()];

  return (
    <div className="pt-10">
      <h1 className="text-lg md:text-2xl font-bold">{title}</h1>
      <h2 className="py-5 text-gray-600 font-bold">{description}</h2>
      {section.map((item, i) => {
        const { title, type, children } = item;
        return (
          <div key={`${title} ${i}`} className="py-5">
            <h3 className="text-gray-600  pb-3 font-bold text-lg md:text-xl">{title}</h3>
            {children.map((v, i) => {
              return <div key={i}>{v}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Contents;
