import { userAtom } from "@/app/store/user";
import { useAtomValue } from "jotai";

export const useUser = () => {
  const user = useAtomValue(userAtom);

  return {
    isLogin: user && Object.keys(user).length > 0,
    info: user,
  };
};
