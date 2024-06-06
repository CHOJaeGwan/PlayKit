import React from "react";
import styled from "styled-components";
import Box from "./Box";

const BoxLayoutWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px;
`;

function BoxLayout() {
  const boxes = ["전체 보기", "축구", "야구", "배드민턴", "농구", "테니스"];

  return (
    <BoxLayoutWrapper>
      {boxes.map((content, index) => (
        <Box key={index} index={index} content={content} />
      ))}
    </BoxLayoutWrapper>
  );
}

export default BoxLayout;
