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
