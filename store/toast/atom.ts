import { atom } from "jotai";

export const toastAtom = atom<Array<{ id: number; contents: string }>>([]);
toastAtom.debugLabel = "toast";
