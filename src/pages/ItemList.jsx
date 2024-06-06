import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 30px 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  color: #333;
  font-weight: bolder;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const NextButton = styled.button`
  width: 100%;
  height: 6vh;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #14148c;
  color: white;
  font-weight: bolder;
`;

const Listbox = styled.ul`
  width: 95%;
  padding: 8px;
  list-style: none;
  background: #ffffff;
  border: 1px solid #c4c4c4;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  margin-top: 9px;
`;

const ListItem = styled.li`
  border: none;
  background-color: #ffffff;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  padding: 7px 10px;
  margin: 5px 7px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Item = styled.div`
  padding: 15px;
  border: ${(props) =>
    props.selected ? "3px solid #000069;" : "1px solid #ccc;"};
  border-radius: 7px;
  margin-bottom: 10px;
  background-color: "white"; /* 선택한 아이템 배경색 변경 */
  color: "#333"; /* 선택한 아이템 글자색 변경 */
  text-align: start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemListWrapper = styled.div`
  margin: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const items = {
  "전체 보기": [
    { name: "축구공", price: "3,000원" },
    { name: "축구화", price: "5,000원" },
    { name: "풋살화", price: "5,000원" },
    { name: "장갑", price: "2,000원" },
    { name: "스타킹", price: "1,000원" },
    { name: "정강이 보호대", price: "2,000원" },
    { name: "배트", price: "3,000원" },
    { name: "글러브", price: "1,000원" },
    { name: "야구공 구매", price: "개당 2,000원" },
    { name: "배드민턴화", price: "3,000원" },
    { name: "셔틀콕 구매", price: "개당 1,000원" },
    { name: "라켓", price: "5,000원" },
    { name: "농구화", price: "5,000원" },
    { name: "농구공", price: "2,000원" },
    { name: "테니스화", price: "5,000원" },
    { name: "테니스 공 구매", price: "개당 1,500원" },
    { name: "테니스 라켓", price: "5,000원" },
  ],
  축구: [
    { name: "축구공", price: "3,000원" },
    { name: "축구화", price: "5,000원" },
    { name: "풋살화", price: "5,000원" },
    { name: "장갑", price: "2,000원" },
    { name: "스타킹", price: "1,000원" },
    { name: "정강이 보호대", price: "2,000원" },
  ],
  야구: [
    { name: "배트", price: "3,000원" },
    { name: "글러브", price: "1,000원" },
    { name: "야구공 구매", price: "개당 2,000원" },
  ],
  배드민턴: [
    { name: "배드민턴화", price: "3,000원" },
    { name: "셔틀콕 구매", price: "개당 1,000원" },
    { name: "라켓", price: "5,000원" },
  ],
  농구: [
    { name: "농구화", price: "5,000원" },
    { name: "농구공", price: "2,000원" },
  ],
  테니스: [
    { name: "테니스화", price: "5,000원" },
    { name: "테니스공 구매", price: "개당 1,500원" },
    { name: "테니스 라켓", price: "5,000원" },
  ],
};

function ItemList() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [category, setCategory] = useState("전체 보기");
  const [showNextButton, setShowNextButton] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (item) => {
    setCategory(item);
    setIsOpen(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowNextButton(true);
    setIsOpen(false);
  };

  const handleNextClick = () => {
    navigate("/item-detail", { state: { selectedItem } });
  };

  useEffect(() => {
    const { state } = location;
    if (state && state.category) {
      setCategory(state.category);
    }
  }, [location]);

  return (
    <div>
      <Layout />
      <hr></hr>
      <div style={{ textAlign: "center" }}>
        <Container>
          <Button onClick={handleButtonClick}>{category || "전체 보기"}</Button>
          {isOpen && (
            <Listbox>
              <ListItem onClick={() => handleCategoryClick("전체 보기")}>
                전체 보기
              </ListItem>
              <ListItem onClick={() => handleCategoryClick("축구")}>
                축구
              </ListItem>
              <ListItem onClick={() => handleCategoryClick("야구")}>
                야구
              </ListItem>
              <ListItem onClick={() => handleCategoryClick("배드민턴")}>
                배드민턴
              </ListItem>
              <ListItem onClick={() => handleCategoryClick("농구")}>
                농구
              </ListItem>
              <ListItem onClick={() => handleCategoryClick("테니스")}>
                테니스
              </ListItem>
            </Listbox>
          )}
        </Container>
        <hr></hr>
        <div style={{ color: "#646EFF	", fontWeight: "700" }}>
          필요한 용품을 선택해주세요!
        </div>
        <ItemListWrapper>
          {items[category].map((item, index) => (
            <Item
              key={index}
              selected={selectedItem === item.name}
              onClick={() => handleItemClick(item.name)}
            >
              <b>{item.name}</b> ({item.price})
            </Item>
          ))}
        </ItemListWrapper>
      </div>
      {showNextButton && (
        <Container>
          <NextButton onClick={handleNextClick}>다음으로</NextButton>
        </Container>
      )}
    </div>
  );
}

export default ItemList;
