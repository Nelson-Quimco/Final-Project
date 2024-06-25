"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { formatDateForSQL } from "@/lib/functions/dateFormatter";

const Test = () => {
  const [temp, setTemp] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handler = (date: React.SetStateAction<Date>) => {
    const formattedDate = formatDateForSQL(date);
    console.log("Clicked date:", formattedDate);
    setSelectedDate(date);
  };

  return (
    <div>
      <Calendar onClickDay={handler} value={selectedDate} />
      <div>Selected Date: {selectedDate.toDateString()}</div>
    </div>
  );
};

export default Test;
