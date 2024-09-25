import { atom } from "jotai";
export const selectedTradeAtom = atom("");

export const exchangesAtom = atom();

export const paybackTestAtom = atom<{
  name: string;
  leverage: number;
  seed: number;
  number: number;
  id: number;
  market_order: string;
  limit_order: string;
  payback: string;
  image: string;
  uid: number;
}>({
  name: "",
  leverage: 0,
  seed: 0,
  number: 0,
  id: 0,
  market_order: "",
  limit_order: "",
  payback: "",
  image: "",
  uid: 0,
});
