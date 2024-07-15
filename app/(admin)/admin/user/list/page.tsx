import { getUsers } from "@/app/action";
import moment from "moment";

export default async function Page() {
  const users = await getUsers();

  console.log(users);

  const getUserTypeText = (type) => {
    switch (type) {
      case "UT02":
        return "관리자";
      default:
        return "일반 회원";
    }
  };

  return (
    <div className="font-bold flex-auto flex-col p-8 flex">
      <h1 className="text-3xl">유저</h1>
      <div className="flex flex-col flex-auto ">
        <div className="pt-10 md:grid md:grid-cols-5 p-2 text-center border-b-[1px]">
          <div>이메일</div>
          <div>이름</div>
          <div>휴대폰번호</div>
          <div>가입일</div>
          <div>유저 타입</div>
        </div>
        <div className=" flex-[8]">
          {users.map((user, index) => {
            const { email, name, hp, createdAt, type } = user;
            return (
              <div key={index} className=" md:grid md:grid-cols-5 p-2 py-6 hover:bg-[rgb(26,26,36)] hover:rounded-md text-center border-b-[1px] hover:border-none border-gray-900">
                <div>{email}</div>
                <div>{name}</div>
                <div>{hp}</div>
                <div>{moment(createdAt).format("YYYY-MM-DD")}</div>
                <div>{getUserTypeText(type)}</div>
              </div>
            );
          })}
        </div>
        {/* <div className="">페이지네이션</div> */}
      </div>
    </div>
  );
}
