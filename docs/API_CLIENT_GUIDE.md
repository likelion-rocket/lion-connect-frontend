# API 클라이언트 사용 가이드

## 기본 원칙

- **Access Token 관리**: apiClient에서 자동 처리 (Authorization 헤더 자동 추가)
- **401 에러 처리**: apiClient에서 자동 처리 (토큰 만료 시 자동 갱신 및 재시도)
- **개발자는**: GET, POST, PUT, PATCH, DELETE 메서드만 사용하면 됨.

## 자동으로 처리되는 부분

| 처리 항목              | 설명                             |
| ---------------------- | -------------------------------- |
| **Authorization 헤더** | accessToken 자동 추가            |
| **401 에러 처리**      | 토큰 만료 시 자동 갱신 후 재시도 |
| **중복 리프레시 방지** | 동시 요청 시 첫 번째만 리프레시  |
| **타임아웃**           | 30초 초과 시 자동 취소           |
| **쿠키 포함**          | credentials: "include" 자동 설정 |
| **Content-Type**       | application/json 자동 설정       |
| **204 응답 처리**      | 응답 본문 없을 때 자동 처리      |

## 1. GET 요청

```typescript
import { get } from "@/lib/apiClient";

// 기본 사용
const users = await get<User[]>("/api/users");

// 쿼리 파라미터 추가
const users = await get<User[]>("/api/users?page=1&limit=10");
```

## 2. POST 요청

```typescript
import { post } from "@/lib/apiClient";

// 데이터 전송
const newUser = await post<User>("/api/users", {
  name: "John",
  email: "john@example.com",
});

// 응답이 없는 경우 (204 No Content)
await post("/api/notify", { message: "Hello" });
```

## 3. PUT 요청 (전체 수정)

```typescript
import { put } from "@/lib/apiClient";

const updated = await put<User>("/api/users/1", {
  name: "Jane",
  email: "jane@example.com",
  phone: "010-1234-5678",
});
```

## 4. PATCH 요청 (부분 수정)

```typescript
import { patch } from "@/lib/apiClient";

// 특정 필드만 수정
const updated = await patch<User>("/api/users/1", {
  name: "Jane", // 이 필드만 수정
});
```

## 5. DELETE 요청

```typescript
import { del } from "@/lib/apiClient";

// 삭제 요청
await del("/api/users/1");

// 응답 타입 지정 가능
const result = await del<{ success: boolean }>("/api/users/1");
```

## 6. 실제 사용 예시

```typescript
import { post, get, patch, del } from "@/lib/apiClient";

// 프로필 조회
const profile = await get<User>("/api/user/profile");

// 게시글 작성
const post = await post<Post>("/api/posts", {
  title: "제목",
  content: "내용",
});

// 프로필 수정
const updated = await patch<User>("/api/user/profile", {
  phone: "010-1234-5678",
});

// 댓글 삭제
await del(`/api/posts/1/comments/5`);
```

## 7. 에러 처리

```typescript
import { post } from "@/lib/apiClient";
import { ApiError } from "@/lib/apiClient";

try {
  const data = await post("/api/users", userData);
} catch (error) {
  if (error instanceof ApiError) {
    if (error.statusCode === 409) {
      // 이미 존재하는 이메일
    } else if (error.statusCode === 400) {
      // 잘못된 요청
    }
    console.error(error.message); // 사용자 친화적 메시지
  }
}
```

## 타입 안정성

```typescript
// 응답 타입 명시
interface User {
  id: number;
  name: string;
  email: string;
}

// 타입 안정성 확보
const user = await get<User>("/api/users/1");
console.log(user.name); // ✅ TypeScript 자동완성 지원

// 복잡한 응답 타입
interface ListResponse<T> {
  data: T[];
  total: number;
  page: number;
}

const response = await get<ListResponse<User>>("/api/users");
response.data.forEach((user) => console.log(user.name));
```

## 요약

```
개발자: GET/POST/PUT/PATCH/DELETE 메서드만 사용
apiClient: 나머지는 다 자동 처리
  ├─ Authorization 헤더 자동 추가
  ├─ 401 에러 시 자동 갱신 후 재시도
  ├─ 에러 분류 및 처리
  └─ 타임아웃 및 네트워크 에러 처리
```
