"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import React from "react";

const WithdrawalButton = ({ point, id }) => {
  const router = useRouter();
  const { addToast } = useToast();

  const handleWithdrawal = () => {
    if (point > 100) {
      router.push(`/user/withdrawal/set?id=${id}`);
    } else {
      addToast({ text: "최소 100 USDT 이상부터 출금신청 가능합니다" });
    }
  };

  return <Button onClick={handleWithdrawal}>출금 신청</Button>;
};

export default WithdrawalButton;
