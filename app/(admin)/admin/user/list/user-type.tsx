"use client";

import { useRouter } from "next/navigation";

export default function UserType({ children, id }) {
  const router = useRouter();

  return (
    <div className="cursor-pointer" onClick={() => router.push(`/admin/user/permission?id=${id}`)}>
      {children}
    </div>
  );
}
