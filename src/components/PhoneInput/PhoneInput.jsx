import React, { useState } from "react";
import styled from "styled-components";

const PhoneInputWrapper = styled.div`
  position: relative;
`;

const PhoneInputField = styled.input`
  background: white;
  width: 90%;
  height: 2vh;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: start;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: grey;
`;

function formatPhoneNumber(value) {
  // 숫자만 남기고 나머지 문자 제거
  const phoneNumber = value.replace(/\D/g, "");

  // 전화번호에 하이픈(-)을 추가
  const formattedPhoneNumber =
    phoneNumber.length === 0
      ? ""
      : phoneNumber.length <= 3
      ? phoneNumber
      : phoneNumber.length <= 7
      ? `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`
      : `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
          3,
          7
        )}-${phoneNumber.slice(7)}`;

  return formattedPhoneNumber;
}

function PhoneInput({ value, onChange }) {
  const [formattedValue, setFormattedValue] = useState(value);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const formattedPhoneNumber = formatPhoneNumber(inputValue);
    setFormattedValue(formattedPhoneNumber);
    onChange(formattedPhoneNumber);
  };

  return (
    <PhoneInputWrapper>
      <PhoneInputField
        type="text"
        placeholder="전화번호를 입력해주세요."
        value={formattedValue}
        onChange={handleChange}
      />
    </PhoneInputWrapper>
  );
}

export default PhoneInput;
