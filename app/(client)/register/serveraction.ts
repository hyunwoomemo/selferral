"use server";

import { revalidatePath } from "next/cache";
import React from "react";

const serveraction = (prevState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  const hp = formData.get("hp");

  const bname = formData.get("insert");

  if (bname === "insert") {
    if (!email && !password && !name && !hp) {
    } else {
      revalidatePath("/register");
      return { message: "Field can not be empty" };
    }
  }

  return null;
};

export default serveraction;
