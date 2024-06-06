import React, { useState } from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 16px;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const MonthYear = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  cursor: ${({ isPast }) => (isPast ? "not-allowed" : "pointer")};
  border-radius: 5px;
  color: ${({ isSunday, isPast }) =>
    isPast ? "lightgrey" : isSunday ? "red" : "inherit"};
  background-color: ${({ isPast }) => (isPast ? "#f0f0f0" : "white")};
  pointer-events: ${({ isPast }) => (isPast ? "none" : "auto")};
  ${({ isSelected }) =>
    isSelected &&
    `
    background-color: #14148c;
    color: white;
  `}
`;

const WeekDay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  font-weight: bold;
  color: ${({ isSunday }) => (isSunday ? "red" : "inherit")};
`;

const Calendar = ({ selectedDate, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const startDate = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day) => {
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    onDateChange(selected);
  };

  const today = new Date();

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < startDate; i++) {
      days.push(<Day key={`empty-${i}`} />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isPast =
        date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isSelected =
        selectedDate &&
        selectedDate.getFullYear() === currentDate.getFullYear() &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getDate() === day;
      const isSunday = date.getDay() === 0;
      days.push(
        <Day
          key={day}
          isSelected={isSelected}
          isSunday={isSunday}
          isPast={isPast}
          onClick={() => !isPast && handleDateClick(day)}
        >
          {day}
        </Day>
      );
    }
    return days;
  };

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <CalendarContainer>
      <Header>
        <Button onClick={handlePreviousMonth}>{"<"}</Button>
        <MonthYear>
          {currentDate.getFullYear()}.
          {String(currentDate.getMonth() + 1).padStart(2, "0")}
        </MonthYear>
        <Button onClick={handleNextMonth}>{">"}</Button>
      </Header>
      <DaysContainer>
        {weekDays.map((day, index) => (
          <WeekDay key={day} isSunday={index === 0}>
            {day}
          </WeekDay>
        ))}
      </DaysContainer>
      <DaysContainer>{renderDays()}</DaysContainer>
    </CalendarContainer>
  );
};

const DatePicker = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };
  return (
    <div style={{ textAlign: "center" }}>
      {" "}
      <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
      {selectedDate && (
        <p style={{ fontWeight: "bolder" }}>
          선택 날짜: {selectedDate.toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default DatePicker;
