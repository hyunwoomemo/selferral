import { styles } from "@/styles";
import React from "react";

const Divider = () => {
  return (
    <div style={{ position: "relative", margin: "30px 0px", padding: "5px 0" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: styles.gray2, height: 16 }}></div>
    </div>
  );
};

export default Divider;
