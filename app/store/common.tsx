import { atom } from "jotai";

export const wideAtom = atom(true);

export const bottomSheetAtom = atom<{ isVisible: boolean; contents?: any }>({
  isVisible: false,
  contents: null,
});
