import { atom } from "jotai";
import React from "react";

export const modalAtom = atom({ visible: false, contents: null, title: "" });
