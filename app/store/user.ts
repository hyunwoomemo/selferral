import { atom } from "jotai";

export const userAtom = atom<{ email: string; name: string; hp: string }>(null);
