# 🚀 React + shadcn/ui 보일러플레이트 모음

개인 사용을 위한 React + shadcn/ui 보일러플레이트 모음

## 📦 사용 가능한 템플릿

### 1. 🔥 React + Vite
**위치**: `packages/react-vite/`

빠른 개발을 위한 Vite와 타입 안전한 라우팅을 위한 TanStack Router가 포함된 현대적인 React 보일러플레이트입니다.

**기술 스택**:
- React 18 + TypeScript
- Vite (빌드 도구)
- TanStack Router (타입 안전한 라우팅)
- Tailwind CSS v4
- shadcn/ui 컴포넌트
- Jotai (상태 관리)
- TanStack Query (서버 상태)

### 2. ⚡ Next.js App Router
**위치**: `packages/nextjs-app-router/`

서버 컴포넌트와 스트리밍을 지원하는 현대적인 App Router를 사용한 Next.js 보일러플레이트입니다.

**기술 스택**:
- Next.js 15 + App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui 컴포넌트
- Jotai (상태 관리)
- TanStack Query (서버 상태)

### 3. 📄 Next.js Pages Router
**위치**: `packages/nextjs-pages-router/`

전통적인 Pages Router를 사용한 Next.js 보일러플레이트입니다. 기존 프로젝트나 특정 요구사항이 있는 경우에 적합합니다.

**기술 스택**:
- Next.js 15 + Pages Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui 컴포넌트
- Jotai (상태 관리)
- TanStack Query (서버 상태)

## 🚀 빠른 시작

### 생성 스크립트 사용

```bash
# 이 저장소 클론
git clone <repository-url>
cd react-shadcn-boilerplates

# 원하는 템플릿으로 새 프로젝트 생성
node scripts/create-project.js react-vite my-app
node scripts/create-project.js nextjs-app-router my-app
node scripts/create-project.js nextjs-pages-router my-app
```

### 수동 설정

```bash
# 템플릿을 수동으로 복사
cp -r packages/react-vite my-new-project
cd my-new-project
npm install
npm run dev
```

## 🛠️ 공통 기능

모든 보일러플레이트에 포함된 기능:

- ✅ **TypeScript** 타입 안전성
- ✅ **Tailwind CSS v4** 현대적인 스타일링
- ✅ **shadcn/ui** Tailwind 기반의 UI 컴포넌트
- ✅ **Jotai** 원자적 상태 관리
- ✅ **TanStack Query** 서버 상태 관리
- ✅ **ESLint** 코드 품질 관리
- ✅ **도메인 기반 폴더 구조**

## 📁 프로젝트 구조

각 템플릿은 일관된 도메인 기반 구조를 따릅니다:

```
src/
├── components/             # 공유/공통 컴포넌트
│   └── ui/                # shadcn/ui 컴포넌트
├── domains/               # 도메인 기반 구성
│   ├── user/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   ├── product/
│   └── order/
├── hooks/                 # 공유 훅
├── lib/                   # 유틸리티 및 설정
└── ...                    # 프레임워크별 파일
```

## 🔧 커스터마이징

### 컴포넌트 추가

모든 템플릿은 shadcn/ui를 사용합니다. 새 컴포넌트 추가:

```bash
npx shadcn@latest add [컴포넌트명]
```

### 상태 관리

- **클라이언트 상태**: Jotai atoms 사용
- **서버 상태**: TanStack Query 사용
- **폼 상태**: react-hook-form (필요시 추가)

### 스타일링

- `globals.css`에서 Tailwind CSS 커스터마이징
- shadcn/ui 테마 변수 수정
- `components/ui/`에 커스텀 컴포넌트 추가

## 📝 스크립트

각 템플릿에 포함된 공통 스크립트:

```bash
npm run dev      # 개발 서버 시작
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
npm run preview  # 프로덕션 빌드 미리보기 (Vite만)
npm run start    # 프로덕션 서버 시작 (Next.js만)
```

## 🚀 배포

### React + Vite
- **권장**: Vercel, Netlify, GitHub Pages
- **빌드**: `npm run build` → `dist/` 폴더

### Next.js (App Router & Pages Router)
- **권장**: Vercel (제로 설정)
- **대안**: Netlify, AWS, Docker
- **빌드**: `npm run build` → `.next/` 폴더
