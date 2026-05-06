# 🚀 create-react-shadcn-app

React + shadcn/ui 애플리케이션을 빠르게 생성하는 CLI 도구

## 📦 사용 가능한 템플릿

| 템플릿 | 설명 | 주요 기술 | 사용 시기 |
|--------|------|-----------|-----------|
| `react-vite` | 빠른 개발을 위한 Vite + TanStack Router | React 19, Vite, TanStack Router, Tailwind CSS v4 | SPA, 빠른 개발, 타입 안전한 라우팅 |
| `nextjs-app-router` | 현대적인 App Router + 서버 컴포넌트 | Next.js 15, App Router, 서버 컴포넌트 | SSR, 최신 Next.js 기능, SEO 중요 |
| `nextjs-pages-router` | 전통적인 Pages Router | Next.js 15, Pages Router | 기존 프로젝트 호환, 안정성 우선 |
| `electron-vite-react` | 데스크탑 앱 (Electron + Vite) | Electron 42, electron-builder, electron-updater | 크로스 플랫폼 데스크탑 앱, 자동 업데이트 |
| `expo-react-native` | 모바일 앱 (Expo + React Native) | Expo SDK 54, Expo Router, NativeWind, Tailwind 3.4 | iOS/Android/Web 동시 지원 모바일 앱 |
| `expo-webview` | Next.js 웹앱 호스팅용 모바일 셸 | Expo + react-native-webview + 타입드 postMessage 브리지 + shadcn 네이티브 fallback UI | 웹앱을 그대로 모바일에 감싸기, 푸시/생체인증 등 네이티브 기능만 추가 |

**공통 기술 스택**: TypeScript, Tailwind CSS v4, shadcn/ui, Jotai, TanStack Query

## 🚀 빠른 시작

### npx 사용 (권장)

```bash
# React + Vite 프로젝트 생성
npx create-react-shadcn-app react-vite <project-name>

# Next.js App Router 프로젝트 생성
npx create-react-shadcn-app nextjs-app-router <project-name>

# Next.js Pages Router 프로젝트 생성
npx create-react-shadcn-app nextjs-pages-router <project-name>

# Electron 데스크탑 앱 프로젝트 생성
npx create-react-shadcn-app electron-vite-react <project-name>

# Expo (React Native) 모바일 앱 프로젝트 생성
npx create-react-shadcn-app expo-react-native <project-name>

# Expo WebView 셸 (Next.js 호스팅용) 프로젝트 생성
npx create-react-shadcn-app expo-webview <project-name>
```

### 전역 설치 후 사용

```bash
# 전역 설치
npm install -g create-react-shadcn-app

# 프로젝트 생성
create-react-shadcn-app react-vite <project-name>
create-react-shadcn-app nextjs-app-router <project-name>
create-react-shadcn-app nextjs-pages-router <project-name>
create-react-shadcn-app electron-vite-react <project-name>
create-react-shadcn-app expo-react-native <project-name>
create-react-shadcn-app expo-webview <project-name>
```

## 🛠️ 공통 기능

모든 템플릿에 포함된 기능:

- ✅ **TypeScript** 타입 안전성
- ✅ **Tailwind CSS v4** 현대적인 스타일링
- ✅ **shadcn/ui** Tailwind 기반의 UI 컴포넌트
- ✅ **Jotai** 원자적 상태 관리
- ✅ **TanStack Query** 서버 상태 관리
- ✅ **ESLint** 코드 품질 관리
- ✅ **도메인 기반 폴더 구조**
- ✅ **현대적인 개발 도구**

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

## 🎯 각 템플릿 사용 시기

### React + Vite
- **적합한 용도**: SPA, 클라이언트 사이드 애플리케이션, 빠른 프로토타이핑
- **장점**: 빠른 개발, 간단한 배포, 완전한 클라이언트 사이드 제어
- **사용 사례**: 대시보드, 관리자 패널, 인터랙티브 웹 앱

### Next.js App Router
- **적합한 용도**: 풀스택 애플리케이션, SEO가 중요한 사이트, 현대적인 React 패턴
- **장점**: 서버 컴포넌트, 스트리밍, 내장 최적화, SEO 친화적
- **사용 사례**: 마케팅 사이트, 이커머스, 블로그, 복잡한 웹 애플리케이션

### Next.js Pages Router
- **적합한 용도**: 기존 Next.js 프로젝트, 점진적 마이그레이션, 특정 요구사항
- **장점**: 성숙한 생태계, 잘 문서화됨, 안정적인 API
- **사용 사례**: 레거시 프로젝트, 특정 라우팅 요구사항, 점진적 도입

### Electron + Vite + React
- **적합한 용도**: 크로스 플랫폼 데스크탑 앱 (Windows, macOS, Linux)
- **장점**: 안전한 IPC 패턴 (`contextBridge`), `electron-builder` 패키징, `electron-updater` 통합 자동 업데이트, Vite HMR
- **사용 사례**: 내부 도구, 오프라인 우선 앱, 시스템 리소스 접근이 필요한 데스크탑 앱
- **주의**: 배포 전 `electron-builder.yml`과 `dev-app-update.yml`의 `owner`/`repo`를 실제 GitHub 저장소로 교체하고, macOS 배포 시 코드 사이닝/notarization 설정 필요

### Expo (React Native)
- **적합한 용도**: iOS/Android 네이티브 모바일 앱 (Web 동시 지원), 공식 React Native 권장 경로
- **장점**: Expo Router 파일 기반 라우팅, NativeWind로 Tailwind 스타일링, EAS Build로 클라우드 빌드 가능, OTA 업데이트
- **사용 사례**: 신규 모바일 앱, 빠른 프로토타이핑, iOS/Android/Web 단일 코드베이스
- **주의**: 다른 템플릿은 Tailwind 4를 쓰지만 이 템플릿은 NativeWind 호환성 때문에 Tailwind 3.4 사용. 시뮬레이터 (Xcode/Android Studio) 또는 Expo Go 앱 필요

### Expo WebView Shell
- **적합한 용도**: 이미 만들어진 웹앱 (Next.js 등)을 모바일 앱으로 빠르게 감싸기, 푸시/생체인증/딥링크 같은 네이티브 기능만 얇은 셸로 추가
- **구성**: `react-native-webview`로 웹앱 호스팅 + 타입드 `postMessage` 브리지 (`lib/bridge.ts`) + shadcn-style 네이티브 fallback (오프라인/에러/재시도 화면)
- **사용 사례**: 본체는 웹, 모바일은 thin wrapper. 점진적 네이티브화 (네이티브 화면을 하나씩 추가)
- **postMessage 브리지**: Web→Native = `window.ReactNativeWebView.postMessage(JSON.stringify(...))`. Native→Web = `webViewRef.current.injectJavaScript(...)` + `window.dispatchEvent(new MessageEvent('native-message', { data }))`
- **주의**: `app.json`의 `extra.webUrl` 값을 실제 배포된 웹앱 URL로 교체. 개발 중에는 `http://localhost:3000` (iOS 시뮬레이터에서 호스트 머신으로 접근 가능)

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

### Electron + Vite + React
- **빌드**: `npm run build` → `out/` 폴더
- **패키징**: `npm run package` (현재 OS), `npm run package:mac|win|linux`
- **배포**: GitHub Releases (default), S3, generic HTTP 서버 등 (`electron-builder.yml`의 `publish` 블록)
- **자동 업데이트**: `electron-updater` 사용. 배포 채널 설정 후 앱 내 "Check for updates" 버튼이 작동

### Expo (React Native)
- **개발**: `npm run ios` / `npm run android` / `npm run web` (Expo dev server)
- **빌드/배포**: [EAS Build](https://docs.expo.dev/build/introduction/) 권장. `npx eas build --platform ios|android` 또는 둘 다
- **OTA 업데이트**: [EAS Update](https://docs.expo.dev/eas-update/introduction/) — 앱스토어 재제출 없이 JS 번들 업데이트

## 🤝 기여하기

1. 저장소 포크
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 열기
