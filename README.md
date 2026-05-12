# 📖 EZREAD

<br />

## 🗂️ 프로젝트 소개

**EZREAD**는 복잡하고 긴 텍스트를 AI가 요약하고, 쉬운 말로 바꿔주는 웹 서비스입니다.

글을 읽고 이해하는 데 어려움을 겪는 분들도 정보에 쉽게 접근할 수 있도록,  
누구나 부담 없이 텍스트를 읽고 이해할 수 있는 환경을 만드는 것을 목표로 합니다.

<br />

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 📝 텍스트 요약 | 긴 글을 AI가 핵심만 추려 요약 |
| 🔤 쉽게 읽기 | 어려운 표현을 쉬운 말로 변환 |
| 🔐 회원 인증 | 로그인 / 회원가입 기반 개인화 서비스 |
| 📊 사용 기록 | 요약 히스토리 조회 및 관리 |

<br />

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| **Framework** | React 18 |
| **Build Tool** | Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **HTTP Client** | Axios |
| **배포 (예정)** | Vercel |

<br />

## 📸 스크린샷

<div align="center">

#### 🖥️ 메인 화면
<img width="610" height="368" alt="image" src="https://github.com/user-attachments/assets/610754b1-3ebd-4de8-8922-8941008e4719" />


#### 💡 텍스트 요약
<img width="518" height="449" alt="image" src="https://github.com/user-attachments/assets/c04bfd97-e456-4f98-a210-d57461a0aca1" />


#### 📋 사용 기록
<img width="620" height="440" alt="image" src="https://github.com/user-attachments/assets/eb06b28c-ecfe-4aaa-bad4-fbd977db0d41" />

</div>

<br />

## 🔌 API 명세

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|-----------|------|------|
| `POST` | `/auth/signup` | 회원가입 | ❌ |
| `POST` | `/auth/login` | 로그인 | ❌ |
| `POST` | `/usage-logs` | 파일 업로드 및 변환 (`multipart/form-data`) | ✅ |
| `GET` | `/usage-logs` | 사용 기록 목록 조회 | ✅ |
| `GET` | `/usage-logs/{id}` | 사용 기록 상세 조회 | ✅ |
| `DELETE` | `/usage-logs/{id}` | 사용 기록 삭제 | ✅ |

> ✅ 인증 필요 엔드포인트는 요청 헤더에 `Authorization: Bearer {access_token}` 포함
