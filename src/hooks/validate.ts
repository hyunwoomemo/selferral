export const validate = ({ type, text }: { type: string; text: string }) => {
  if (type === "inviteCode") {
    if (text.length < 4 && text.length > 0) {
      return "최소 4자리 이상 입력해주세요";
    }
  }
};
