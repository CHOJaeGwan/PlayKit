import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "../components/Calender/Calender";
import axios from "axios";
import { AddressContext } from "../context/AddressContext";
import PhoneInput from "../components/PhoneInput/PhoneInput";

const Container = styled.div`
  margin: 30px 10px;
`;

const NameInput = styled.input`
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
  const [name, setName] = useState("");
  const { address, addressDetail } = useContext(AddressContext);

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
      if (
        state.selectedItem === "축구공" ||
        state.selectedItem === "농구공" ||
        state.selectedItem === "야구공 구매" ||
        state.selectedItem === "셔틀콕 구매" ||
        state.selectedItem === "테니스공 구매"
      ) {
        setSelectedSize("1");
      }
    }
  }, [location, setSelectedSize]);

  const handleNextClick = async () => {
    const phonePattern = /^\d{3}-\d{3,4}-\d{4}$/;
    if (!phonePattern.test(phone)) {
      // 전화번호 형식이 올바르지 않을 때 알림 표시
      alert("전화번호 형식이 올바르지 않습니다.");
      return;
    }
    if (selectedSize && selectedDate && phone && name && address && item) {
      try {
        const response = await axios.post(
          "http://ec2-43-203-180-170.ap-northeast-2.compute.amazonaws.com:5001/api/send-email",
          {
            item: item,
            size: selectedSize,
            date: selectedDate,
            name: name,
            phone: phone,
            address: address,
            addressDetail: addressDetail,
          }
        );
        if (response.status === 200) {
          navigate("/Finish", {
            state: {
              selectedSize,
              selectedDate,
              phone,
              name,
              address,
              addressDetail,
            },
          });
        }
      } catch (error) {
        console.error("Error sending the email", error);
      }
    }
  };

  return (
    <div>
      <Layout />
      <hr />
      <h2 style={{ textAlign: "center" }}>{item}</h2>
      <Container>
        <h3>사이즈</h3>
        {(item === "풋살화" ||
          item === "축구화" ||
          item === "농구화" ||
          item === "배드민턴화" ||
          item === "테니스화") && (
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
        {item === "배트" && (
          <RadioContainer>
            <RadioLabel>
              <input
                type="radio"
                value="S"
                checked={selectedSize === "S"}
                onChange={handleRadioChange}
              />
              <b>S</b> (28 - 31 inch)
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="M"
                checked={selectedSize === "M"}
                onChange={handleRadioChange}
              />
              <b>M</b> (32 - 33 inch)
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="L"
                checked={selectedSize === "L"}
                onChange={handleRadioChange}
              />
              <b>L</b> (33 - 34 inch)
            </RadioLabel>
          </RadioContainer>
        )}
        {item === "글러브" && (
          <RadioContainer>
            <RadioLabel>
              <input
                type="radio"
                value="outfielder"
                checked={selectedSize === "outfielder"}
                onChange={handleRadioChange}
              />
              <b>외야수 글러브</b>
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="infielder"
                checked={selectedSize === "outfielder"}
                onChange={handleRadioChange}
              />
              <b>내야수 글러브</b>
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="pitcher"
                checked={selectedSize === "pitcher"}
                onChange={handleRadioChange}
              />
              <b>투수</b>
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="catcher"
                checked={selectedSize === "catcher"}
                onChange={handleRadioChange}
              />
              <b>포수</b>
            </RadioLabel>
          </RadioContainer>
        )}
        {item === "라켓" && (
          <RadioContainer>
            <RadioLabel>
              <input
                type="radio"
                value="G1"
                checked={selectedSize === "G1"}
                onChange={handleRadioChange}
              />
              <b>G1</b> (93mm)
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="G2"
                checked={selectedSize === "G2"}
                onChange={handleRadioChange}
              />
              <b>G2</b> (90mm)
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="G3"
                checked={selectedSize === "G3"}
                onChange={handleRadioChange}
              />
              <b>G3</b> (87mm)
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="G4"
                checked={selectedSize === "G4"}
                onChange={handleRadioChange}
              />
              <b>G4</b> (84mm)
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="G5"
                checked={selectedSize === "G5"}
                onChange={handleRadioChange}
              />
              <b>G5</b> (81mm)
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="G6"
                checked={selectedSize === "G6"}
                onChange={handleRadioChange}
              />
              <b>G6</b> (78mm)
            </RadioLabel>
          </RadioContainer>
        )}
        {item === "테니스 라켓" && (
          <RadioContainer>
            <RadioLabel>
              <input
                type="radio"
                value="mid"
                checked={selectedSize === "mid"}
                onChange={handleRadioChange}
              />
              <b>미드</b> (~94 sq.in)
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="midPlus"
                checked={selectedSize === "midPlus"}
                onChange={handleRadioChange}
              />
              <b>미드플러스</b> (95-105 sq.in)
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="mid"
                checked={selectedSize === "mid"}
                onChange={handleRadioChange}
              />
              <b>오버</b> (106~ sq.in)
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
        <h3>이름</h3>
        <NameInput
          type="text"
          placeholder="이름을 입력해주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Container>
      <hr></hr>
      <Container>
        <h3>전화 번호</h3>
        <PhoneInput
          type="text"
          placeholder="전화번호를 입력해주세요."
          value={phone}
          onChange={(e) => setPhone(e)}
        />
      </Container>
      <Container>
        <NextButton
          onClick={handleNextClick}
          disabled={
            !selectedSize || !selectedDate || !phone || !name || !address
          }
        >
          예약 완료
        </NextButton>
      </Container>
    </div>
  );
}

export default ItemDetail;
