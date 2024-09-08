"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";

const days = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const year = useMemo(() => {
    return date.getFullYear();
  }, [date]);

  const month = useMemo(() => {
    return date.getMonth() + 1;
  }, [date]);

  const lastDate = useMemo(() => {
    return new Date(year, month, 0).getDate();
  }, [year, month]);

  const firstDay = useMemo(() => {
    return new Date(date.setDate(1)).getDay();
  }, [date]);

  const allDates = useMemo(() => {
    return Array(35)
      .fill("")
      .reduce((result, cur, i) => {
        if (result.some((v) => v > 0)) {
          if (i - firstDay + 1 > lastDate) {
            result.push(0);
          } else {
            result.push(i - firstDay + 1);
          }
        } else {
          if (i === firstDay) {
            result.push(1);
          } else {
            result.push(0);
          }
        }
        return result;
      }, []);
  }, [firstDay, lastDate]);

  const renderDate = useCallback(() => {
    return allDates.map((v, i) => {
      return (
        <span style={{ display: "flex", justifyContent: "center", alignItems: "center", color: i % 7 === 0 ? "red" : i % 7 === 6 ? "blue" : undefined }} key={`${v} ${i}`}>
          {v === 0 ? "" : v}
        </span>
      );
    });
  }, [allDates]);

  return (
    <div style={{ padding: "15px 0" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button onClick={() => setDate((prev) => new Date(new Date(prev.setDate(1)).setDate(-1)))}>
          <ChevronLeft />
        </button>
        <div>{month}월</div>
        <button onClick={() => setDate((prev) => new Date(year, month, 1))}>
          <ChevronRight />
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr", gridTemplateRows: "70px" }}>
        {days.map((v) => (
          <span style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }} key={v}>
            {v}
          </span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr", gridTemplateRows: "80px 80px 80px 80px 80px" }}>{renderDate()}</div>
    </div>
  );
};

export default Calendar;
