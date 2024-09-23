"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "./ui/button";

const days = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = ({ dates, setDates, setIsVisibleDate }) => {
  const [date, setDate] = useState(dates[0] || new Date());

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

  const isIncludesDate = useCallback(
    (target) => {
      if (target === 0) return;
      const newDate = new Date(date.getFullYear(), date.getMonth(), target);

      if (dates.length === 2) {
        return dates[0] <= newDate && dates[1] >= newDate;
      } else {
        return dates[0] && isSameDate(dates[0], newDate);
      }
    },
    [dates, date]
  );

  const isSameDate = (a, b) => {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  };

  const renderDate = useCallback(() => {
    return allDates.map((v, i) => {
      return (
        <span
          onClick={() => handleClickDate(v)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: i % 7 === 0 ? "red" : i % 7 === 6 ? "blue" : undefined,
            // background: isIncludesDate(v) ? "orange" : undefined,
          }}
          className={isIncludesDate(v) ? "bg-orange-100" : undefined}
          key={`${v} ${i}`}
        >
          {v === 0 ? "" : v}
        </span>
      );
    });
  }, [allDates, dates]);

  const handleClickDate = (data) => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), data);

    setDates((prev) => {
      if (prev.length === 0) {
        return [newDate];
      } else if (prev.length === 1) {
        if (prev[0] > newDate) {
          return [newDate];
        } else {
          return [...prev, newDate];
        }
      } else {
        return [newDate];
      }
    });
  };

  return (
    <div style={{ padding: "15px 0", position: "absolute", width: "100%", background: "white", zIndex: 9999 }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, padding: "0 30px" }}>
        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <button onClick={() => setDate((prev) => new Date(new Date(prev.setDate(1)).setDate(-1)))}>
            <ChevronLeft />
          </button>
          <div>{month}월</div>
          <button onClick={() => setDate((prev) => new Date(year, month, 1))}>
            <ChevronRight />
          </button>
        </div>
        <div style={{ flex: 1 }}>
          <Button onClick={() => setIsVisibleDate(false)} style={{ display: "flex", justifyContent: "flex-end", marginLeft: "auto" }}>
            적용
          </Button>
        </div>
      </div>
      <div style={{ paddingTop: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr", gridTemplateRows: "70px" }}>
          {days.map((v) => (
            <span style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }} key={v}>
              {v}
            </span>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr", gridTemplateRows: "80px 80px 80px 80px 80px" }}>{renderDate()}</div>
      </div>
    </div>
  );
};

export default Calendar;
