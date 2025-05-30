# React shadcn/ui Boilerplates

개인 사용을 위한 React + shadcn/ui 보일러플레이트 모음

## 구조

```
react-shadcn-boilerplates/
├── packages/
│   ├── react-vite/           # React + Vite + shadcn/ui 보일러플레이트
│   ├── nextjs-app-router/    # Next.js App Router + shadcn/ui 보일러플레이트
│   └── nextjs-pages-router/  # Next.js Pages Router + shadcn/ui 보일러플레이트
├── scripts/
│   └── create-project.js     # 프로젝트 생성 스크립트
└── package.json
```

## 사용법

### 1. npm 스크립트 사용

```bash
# React + Vite 프로젝트 생성
npm run create:react my-app

# Next.js App Router 프로젝트 생성
npm run create:next-app my-dashboard

# Next.js Pages Router 프로젝트 생성
npm run create:next-pages my-blog
```

### 2. 명령어로 직접 실행

```bash
node scripts/create-project.js <template> <project-name> [target-dir]
```

**예시:**
```bash
node scripts/create-project.js react-vite my-app
node scripts/create-project.js nextjs-app-router my-dashboard ./projects
```

## 템플릿

- `react-vite` - React + Vite + shadcn/ui
- `nextjs-app-router` - Next.js App Router + shadcn/ui
- `nextjs-pages-router` - Next.js Pages Router + shadcn/ui

## 자동 설정

프로젝트 생성 시 자동으로:

- 파일 복사 (불필요한 파일 제외)
- package.json 업데이트 (프로젝트명, 버전 등)
- README.md 생성
- Git 저장소 초기화 및 초기 커밋
- 의존성 설치 (yarn 우선, 없으면 npm)

**참고:** degit 사용 시에는 자동 설정이 되지 않으므로 수동으로 설정해야 합니다.

## 요구사항

- Node.js 18+
- yarn 또는 npm
