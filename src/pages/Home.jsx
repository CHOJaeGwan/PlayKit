import React, { useContext } from "react";
import Layout from "../components/Layout/Layout";
import BoxLayout from "../components/Box/BoxLayout";
import AddressSearch from "../components/Address/AddressSearch";
import styled from "styled-components";
import { AddressContext } from "../context/AddressContext";

const Container = styled.div`
  margin: 30px 10px;
  text-align: center;
`;
const AddressDetail = styled.input`
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
function Home() {
  const { address, setAddress, addressDetail, setAddressDetail } =
    useContext(AddressContext);

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
  };
  return (
    <div>
      <Layout />
      <Container>
        <h2 style={{ color: "#14148c", fontWeight: "900" }}>
          어디로 배달해 드릴까요?
        </h2>
        <AddressSearch onSelect={handleAddressSelect} />
      </Container>
      {address && (
        <Container style={{ textAlign: "start", fontWeight: "bolder" }}>
          <p>{address}</p>
          <AddressDetail
            type="text"
            placeholder="상세 주소를 입력해주세요"
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
          />
          <hr />
        </Container>
      )}
      <div style={{ paddingTop: "0px" }}>
        <BoxLayout />
      </div>
    </div>
  );
}

export default Home;
