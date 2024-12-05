import { getClientServiceInfo } from "@/actions/site/action";
import { ToastViewer } from "@/components/toast-viewer";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const data = await getClientServiceInfo();

  if (!data) return;

  return (
    <div className="p-4 flex flex-col  flex-auto">
      <ToastViewer content={(data && data?.info?.service_info) || ""} />
    </div>
  );
}
