import React from "react";
import Layout from "../components/Layout/Layout";
import styled from "styled-components";

const BoxImage = styled.img`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Finish() {
  const imagePath = require("../assets/images/finish.png");
  return (
    <div>
      <Layout />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          flexDirection: "column",
        }}
      >
        <BoxImage src={imagePath} alt="finish" />
        <h3 style={{ fontSize: "40px" }}>예약 완료!</h3>
        <b>입금 하실 계좌 번호와 가격이 곧 발송 됩니다!</b>
        <b>입금이 확인 되면 예약 확정 문자가 발송됩니다.</b>
      </div>
    </div>
  );
}

export default Finish;
