import React from "react";

const page = () => {
  return (
    <div className="whitespace-pre-wrap p-4">
      <h1 className="py-4 font-bold text-2xl">개인정보처리방침</h1>
      {`시행일: 2024년 9월 20일

셀퍼럴닷컴(이하 "회사")는 관련 법률에 따라 이용자의 개인정보를 철저히 보호하고, 이에 따른 불편 사항을 신속하게 해결하기 위해 다음과 같은 개인정보 처리방침을 마련하고 공개합니다.

1. 개인정보 수집 및 이용
회사는 서비스를 이용하는 이용자로부터 아래와 같은 개인정보를 수집하며, 만 16세 미만의 아동의 개인정보는 수집하지 않습니다.

필수 정보:

회원 가입 시: 이메일 주소, 비밀번호
거래소 UID 연동 시: 거래소명, 거래소 UID, 선물 거래 내역(일시, 거래량)
비회원 페이백 서비스 이용 시: 거래소명, 거래소 UID, 선물 거래 내역(일시, 거래량)
자동 수집 정보: IP 주소, 브라우저 유형, 사용 언어, 서비스 이용 기록(접속 시간, 페이백 신청, 출금 기록 등), 기기 정보(모델명, OS 버전), 쿠키

설문조사 및 피드백 시: 서비스 개선을 위한 추가 정보 수집

2. 개인정보 처리 및 보유 기간
이용자가 서비스를 탈퇴하거나 자격을 상실할 경우, 회사는 개인정보를 즉시 삭제합니다. 단, 아래 경우에는 정해진 기간 동안 정보를 보존할 수 있습니다.

법적 문제 해결을 위한 수사 또는 조사가 진행 중일 경우, 조사 종료 시까지 보존
채권·채무 관계가 남아있을 경우, 해당 관계가 해결될 때까지 보존
동일 이메일 재가입 방지를 위해 이메일 주소는 서비스 종료 시까지 보관
페이백 및 출금 기록은 최대 5년간 보존 (UID 등은 마스킹 처리하여 보관)
3. 개인정보 처리 목적
회원 관리: 회원가입 의사 확인, 부정 이용 방지, 고지 및 통지
사기 및 자금 손실 방지: 서비스 이용 중 사기 및 오용 방지
서비스 제공: 이용자에게 서비스 제공 및 관련 정보 제공
고객 지원: 문제 해결 및 문의 대응
보안 강화: 스팸 및 악성 소프트웨어 탐지, 보안 준수
4. 개인정보 제3자 제공
회사는 이용자의 동의가 있거나 관련 법률에 따라 필요한 경우에만 개인정보를 제3자에게 제공합니다.

5. 추가 이용 및 제공 기준
회사는 수집된 목적과 합리적으로 관련된 범위 내에서 개인정보를 이용하거나 제공할 수 있습니다. 추가 이용 시 이용자의 이익 침해 여부, 가명 처리 여부 등을 고려합니다.

6. 쿠키 사용 및 거부
회사는 맞춤형 서비스 제공을 위해 쿠키를 사용합니다. 이용자는 쿠키 설정을 변경할 수 있으나, 일부 서비스 이용이 제한될 수 있습니다.

7. 개인정보 파기
회사는 개인정보가 불필요하게 되었을 때 즉시 파기합니다. 전자 파일은 복구 불가능한 방식으로 삭제되며, 종이 문서는 분쇄 또는 소각 처리됩니다.

8. 개인정보 보호 조치
회사는 내부 관리 계획 수립, 직원 교육, 해킹 방지, 개인정보 암호화, 접근 통제 등 다양한 기술적·물리적 조치를 통해 개인정보를 보호합니다.

9. 이용자 권리
이용자는 언제든지 개인정보 열람, 정정, 삭제를 요청할 수 있습니다. 관련 문의는 아래 이메일로 접수할 수 있으며, 회사는 신속히 대응할 것입니다.

문의처: ccc_33@naver.com
10. EU 거주자에 대한 추가 규정
EU 거주자는 GDPR에 따라 개인정보 접근, 수정, 삭제, 처리 제한 등의 권리를 행사할 수 있습니다. 또한, 회사는 EU 외부로 개인정보가 전송될 경우 GDPR에 맞는 안전 조치를 취합니다.

11. 개인정보처리방침 변경
회사는 법률 또는 서비스 변경 사항을 반영하기 위해 개인정보처리방침을 수정할 수 있으며, 변경 시 최소 7일 전 공지합니다. 중요한 변경 사항이 있을 경우 최소 30일 전 고지합니다.`}
    </div>
  );
};

export default page;
