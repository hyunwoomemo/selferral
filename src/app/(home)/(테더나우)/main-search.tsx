"use client";
import styled from "styled-components";
import Select from "react-select";
import { Input } from "@/components/common/Input";
import SelectBox from "@/components/common/SelectBox";
import { FaSearch } from "react-icons/fa";
import { styles } from "@/styles";

const options = [
  {
    icon: require("@/assets/bitget.webp"),
    value: "bitget",
    label: "Bitget",
  },
  {
    icon: require("@/assets/bybit.webp"),

    value: "bybit",
    label: "Bybit",
  },
  {
    icon: require("@/assets/bitget.webp"),

    value: "bitget",
    label: "Bitget",
  },
  {
    icon: require("@/assets/bitget.webp"),
    value: "binance",
    label: "Binance",
  },
  {
    icon: require("@/assets/okx.webp"),
    value: "okx",
    label: "OKX",
  },
  {
    icon: require("@/assets/bitget.webp"),
    value: "lbank",
    label: "LBANK",
  },
  {
    icon: require("@/assets/bitget.webp"),
    value: "tabbit",
    label: "Tabbit",
  },
];
// 비트겟 Bitget
// 바이비트 Bybit
// 바이낸스 binance
// OKX   okx
// 엘뱅크 LBANK
// 탭비트 Tabbit

const MainSearch = () => {
  return (
    <Container>
      <SelectBox options={options} />
      <InputWrapper>
        <input placeholder="UID를 입력해주세요." />
        <SearchButton>
          <FaSearch size={20} color="#fff" />
        </SearchButton>
      </InputWrapper>
    </Container>
  );
};

export default MainSearch;

const Container = styled.div`
  display: flex;
  gap: 5px;
  padding: 10px;
`;

const InputWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex: 1 1 auto;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 5px;
  justify-content: center;

  > input {
    border: none;
    flex: 1 1 auto;
    outline: none;
    font-size: 16px;
  }
`;

const SearchButton = styled.div`
  display: flex;
  /* height: 100%; */
  padding: 10px;
  /* width: 30px; */
  justify-content: center;
  align-items: center;
  background-color: ${styles.blue};
  border-radius: 5px;
`;
