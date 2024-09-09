"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useToast } from "@/hooks/useToast";

const ToastItem = ({ data }: { data: any }) => {
  const { removeToast } = useToast();
  const [view, setView] = useState(false);
  const [time, setTime] = useState(data.time / 1000);

  const timer = useRef<any>();

  useEffect(() => {
    // setTimeout(() => {
    setView(true);
    // }, 500);

    return () => {
      setView(false);
    };
  }, []);

  useEffect(() => {
    if (time !== 0) {
      // let timer = null;
      let seconds = data.time;

      if (seconds > 0) {
        timer.current = setInterval(() => {
          seconds = seconds - 1;
          setTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
      } else {
        clearInterval(timer.current);
      }
    } else {
      clearInterval(timer.current);
      removeToast(data.id);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [data, timer, time]);

  return (
    <>
      <div
        // style={{
        //   padding: 20,
        //   backgroundColor: "#fff",
        //   borderRadius: 5,
        //   width: 400,
        //   boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
        //   position: "relative",
        //   display: "flex",
        //   alignItems: "center",
        //   gap: 10,
        //   margin: 10,
        // }}
        className="p-[20px] border-gray bg-orange-400 dark:bg-gray-800 rounded-lg  w-[95%] md:w-[400px] relative flex items-center gap-[10px] m-[10px] font-bold text-white"
        onClick={() => removeToast(data.id)}
        onMouseEnter={() => {
          console.log("mmmmmm");
          clearInterval(timer.current);
        }}
        onMouseLeave={() => {
          // setInterval(timer.current);
          timer.current = setInterval(() => {
            setTime((prev) => (prev > 0 ? prev - 1 : 0));
          }, 1000);
        }}
        // className={clsx(styles.toastItem, data.type)}
        style={data.modify ? { width: view ? 400 : 100, transition: "all 0.3s" } : { scale: view ? 1 : 0, transition: "all 0.3s" }}
      >
        <div className="contents">
          {data.type !== "loading" ? (
            <span className="txt" style={{ whiteSpace: "nowrap", opacity: view ? 1 : 0, transition: "all 0.3s" }}>
              {data.contents}
            </span>
          ) : (
            // <Loader minSize={false} />
            <span>로딩..</span>
          )}
          {/* <span className="sec">{time}s</span> */}
          {/* {action && ( */}
          {data?.cta?.length > 0 &&
            data.cta.map((item, index) => {
              return (
                <>
                  <div key={index} onClick={item.action} className="link">
                    {item.label}
                  </div>
                  <div className="hr"></div>
                </>
              );
            })}
          {/* )} */}
        </div>
        {data.type !== "loading" && <button className="close">{/* <span className={icons.closeGray}></span> */}</button>}
      </div>
    </>
  );
};

export default ToastItem;
