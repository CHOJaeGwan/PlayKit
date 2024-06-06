import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 레이아웃을 스타일링하는 컴포넌트
const LayoutWrapper = styled.div`
  height: 3vh; /* Viewport Height의 10% */
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: #14148c; /* 배경색을 추가하여 쉽게 확인 가능 */
  padding: 20px;
`;

// 헤더를 스타일링하는 컴포넌트
const Header = styled.h1`
  font-family: "Poppins", sans-serif; /* Google Font 적용 */
  font-weight: 600; /* 폰트 두께 */
  color: white;
`;

function Layout() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <LayoutWrapper>
      <Header onClick={handleClick}>PlayKit</Header>
    </LayoutWrapper>
  );
}

export default Layout;
