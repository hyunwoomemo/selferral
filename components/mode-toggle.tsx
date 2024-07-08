"use client";

import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import Dropdown from "./ui/dropdown";
import { useState } from "react";

const data = [{ name: "light" }, { name: "dark" }, { name: "system" }];

export function ModeToggle({ isVisible, setIsVisible }) {
  const { setTheme } = useTheme();
  const [item, setItem] = useState(data.find((v) => v.name === "system"));

  return (
    <>
      <div className="relative">
        <Button variant="ghost" className="w-10 px-0" onClick={() => setIsVisible((prev) => !prev)}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
        <div
          className={`absolute top-[100%] right-0 bg-background border border-gray-800 rounded-sm ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ${
            isVisible ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <p
            onClick={() => {
              setTheme("light");
              setIsVisible(false);
            }}
            className="p-4"
          >
            light
          </p>
          <p
            onClick={() => {
              setTheme("dark");
              setIsVisible(false);
            }}
            className="p-4"
          >
            dark
          </p>
          <p
            onClick={() => {
              setTheme("system");
              setIsVisible(false);
            }}
            className="p-4"
          >
            system
          </p>
        </div>
      </div>
    </>
  );
}
