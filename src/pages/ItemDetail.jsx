import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "../components/Calender/Calender";

const Container = styled.div`
  margin: 30px 10px;
`;
const PhoneInput = styled.input`
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

const RadioContainer = styled.div`
  display: flex;
  margin: 5px;
  flex-wrap: wrap;
  background-color: white;
  border: 3px solid #ccc;
  border-radius: 10px;
`;

const RadioLabel = styled.label`
  margin: 10px;
`;

const NextButton = styled.button`
  width: 100%;
  height: 6vh;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#14148c")};
  color: white;
  font-weight: bolder;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

function ItemDetail() {
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const location = useLocation();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [phone, setPhone] = useState("");
  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedSize(value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    const { state } = location;
    if (state && state.selectedItem) {
      setItem(state.selectedItem);
      if (state.selectedItem === "축구공") {
        setSelectedSize("1");
      }
    }
  }, [location, setSelectedSize]);

  const handleNextClick = () => {
    if (selectedSize && selectedDate) {
      navigate("/Finish", { state: { selectedSize, selectedDate } });
    }
  };

  return (
    <div>
      <Layout />
      <hr />
      <h2 style={{ textAlign: "center" }}>{item}</h2>
      <Container>
        <h3>사이즈</h3>
        {(item === "풋살화" || item === "축구화") && (
          <div>
            <RadioContainer>
              <RadioLabel>
                <input
                  type="radio"
                  value="260"
                  checked={selectedSize === "260"}
                  onChange={handleRadioChange}
                />
                260
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  value="265"
                  checked={selectedSize === "265"}
                  onChange={handleRadioChange}
                />
                265
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  value="270"
                  checked={selectedSize === "270"}
                  onChange={handleRadioChange}
                />
                270
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  value="275"
                  checked={selectedSize === "275"}
                  onChange={handleRadioChange}
                />
                275
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  value="280"
                  checked={selectedSize === "280"}
                  onChange={handleRadioChange}
                />
                280
              </RadioLabel>
            </RadioContainer>
          </div>
        )}
        {item === "장갑" && (
          <RadioContainer>
            <RadioLabel>
              <input
                type="radio"
                value="6"
                checked={selectedSize === "6"}
                onChange={handleRadioChange}
              />
              6호
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="7"
                checked={selectedSize === "7"}
                onChange={handleRadioChange}
              />
              7호
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="8"
                checked={selectedSize === "8"}
                onChange={handleRadioChange}
              />
              8호
            </RadioLabel>
          </RadioContainer>
        )}
        {item === "스타킹" && (
          <RadioContainer>
            <RadioLabel>
              <input
                type="radio"
                value="S"
                checked={selectedSize === "S"}
                onChange={handleRadioChange}
              />
              <b>S</b> (230 - 250mm)
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="M"
                checked={selectedSize === "M"}
                onChange={handleRadioChange}
              />
              <b>M</b> (250 - 270mm)
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="L"
                checked={selectedSize === "L"}
                onChange={handleRadioChange}
              />
              <b>L</b> (270 - 290mm)
            </RadioLabel>
          </RadioContainer>
        )}
        {item === "정강이 보호대" && (
          <RadioContainer>
            <RadioLabel>
              <input
                type="radio"
                value="XS"
                checked={selectedSize === "S"}
                onChange={handleRadioChange}
              />
              <b>XS</b> (120 ~ 140cm)
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="S"
                checked={selectedSize === "S"}
                onChange={handleRadioChange}
              />
              <b>S</b> (140 ~ 160cm)
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="M"
                checked={selectedSize === "M"}
                onChange={handleRadioChange}
              />
              <b>M</b> (160 ~ 175cm)
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="L"
                checked={selectedSize === "L"}
                onChange={handleRadioChange}
              />
              <b>L</b> (175 ~ 185cm)
            </RadioLabel>
          </RadioContainer>
        )}
      </Container>
      <hr />
      <Container>
        <h3>대여 날짜 예약</h3>
        <DatePicker onDateChange={handleDateChange} />
      </Container>
      <hr />
      <Container>
        <h3>전화 번호</h3>
        <PhoneInput
          type="text"
          placeholder="전화번호를 입력해주세요."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Container>
      <Container>
        <NextButton
          onClick={handleNextClick}
          disabled={!selectedSize || !selectedDate || !phone}
        >
          예약 완료
        </NextButton>
      </Container>
    </div>
  );
}

export default ItemDetail;
