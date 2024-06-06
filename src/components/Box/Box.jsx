import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
  padding-top: 45%;
  margin: 5px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const BoxContent = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  text-align: center;
`;

const BoxImage = styled.img`
  width: 50%;
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AllText = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 4rem;
  position: absolute;
  top: 20%;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Box({ index, content }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/items`, { state: { category: content } });
  };
  let imagePath;
  try {
    if (index === 1) {
      imagePath = require("../../assets/images/soccer.png");
    } else if (index === 2) {
      imagePath = require("../../assets/images/baseball.png");
    } else if (index === 3) {
      imagePath = require("../../assets/images/badminton.png");
    } else if (index === 4) {
      imagePath = require("../../assets/images/basketball.png");
    } else if (index === 5) {
      imagePath = require("../../assets/images/tennis.png");
    }
  } catch (error) {
    console.error("Image not found:", error);
  }

  return (
    <BoxWrapper onClick={handleClick}>
      <BoxContent>{content}</BoxContent>
      {index === 0 ? (
        <AllText>ALL</AllText>
      ) : (
        imagePath && <BoxImage src={imagePath} alt={content} />
      )}
    </BoxWrapper>
  );
}

export default Box;
