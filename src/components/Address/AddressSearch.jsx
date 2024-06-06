// src/components/AddressSearch.js
import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

const SearchButton = styled.button`
  background: white;
  width: 100%;
  height: 5vh;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: start;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: grey;
`;

const AddressSearch = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    onSelect(fullAddress);
    setIsOpen(false);
  };

  return (
    <div>
      <SearchButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "주소 검색 닫기" : "주소 입력하기"}
      </SearchButton>
      {isOpen && (
        <div>
          <DaumPostcode onComplete={handleComplete} />
        </div>
      )}
    </div>
  );
};

export default AddressSearch;
