# Lion Connect Frontend

## 개발 컨벤션

### Git 컨벤션

#### Commit Message

```
feat: 로그인 구현
```

#### 이슈 타이틀

```
[feat] 로그인 구현
```

#### PR 타이틀

```
[feat/#27] 로그인 페이지 구현
```

#### 브랜치명

```
feat/#23
```

### 코드 컨벤션

#### 파일명

- 컴포넌트: PascalCase (예: `UserProfile.tsx`)
- 페이지: kebab-case (예: `user-profile/page.tsx`)
- 유틸리티: camelCase (예: `formatDate.ts`)

#### 컴포넌트 작성 규칙

- 함수 선언문 사용
- 기본 export 사용

```typescript
function Component() {
  return <div>Component</div>;
}

export default Component;
```

### 폴더 배치 규칙

**공통 컴포넌트** (`/components`)

- 프로젝트 전역에서 재사용

**개별 컴포넌트**

- app폴더 내부 components 생성하여 내부에 컴포넌트 생성
- 파일명: app/(auth)/components/Login.tsx

**커스텀 훅** (`/hooks`)

- 전역 재사용 로직만 배치
- 파일명: `use[이름].ts`

**상태 관리** (`/store`)

- 전역 상태만 배치
- 파일명: `use[Store이름].ts`

**페이지별 컴포넌트**

- 특정 페이지 전용은 `/app/[route]/_components`
