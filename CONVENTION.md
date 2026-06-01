# Frontend Convention

## 1. Directory Structure

프로젝트의 기본 디렉토리 구조는 아래와 같습니다.

```text
src
├── assets       # 이미지, 폰트 등 정적 리소스
├── components   # UI 컴포넌트
├── constants    # 상수
├── hooks        # 커스텀 훅
├── apis         # API 타입 및 엔드포인트 정의
├── services     # API 호출 로직
├── utils        # 유틸리티 함수
└── types        # 전역 타입 정의 (.d.ts)
```

### Test Structure

테스트 파일은 대상 파일과 동일한 디렉토리 내 `__tests__` 폴더에 위치합니다.

```text
components
├── __tests__
│   └── index.test.tsx
└── index.tsx
```

원칙:

* 테스트 파일은 테스트 대상과 최대한 가까운 위치에 둡니다.
* 테스트 파일명은 `*.test.ts(x)` 형식을 사용합니다.

---

## 2. Server Component First

### 2.1 기본 원칙

모든 컴포넌트는 기본적으로 **Server Component**로 작성합니다.

Client Component는 반드시 필요한 경우에만 사용합니다.

### 2.2 Client Component 사용 기준

다음과 같은 브라우저 전용 기능이 필요한 경우에만 Client Component로 분리합니다.

* 상태 관리 (`useState`, `useReducer`, `useEffect`)
* 이벤트 핸들러 (`onClick`, `onChange` 등)
* 브라우저 API 접근 (`window`, `localStorage`, `navigator` 등)

### 2.3 Client Component 선언

Client Component는 파일 최상단에 `"use client"`를 선언합니다.

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

### 2.4 권장 사항

* 가능한 한 Server Component를 유지합니다.
* Client Component는 필요한 영역만 최소 범위로 분리합니다.
* 불필요한 `"use client"` 사용을 지양합니다.

---

## 3. Component Architecture

### 3.1 Common Component 분리 기준

컴포넌트가 **2개 이상의 서로 다른 파일에서 재사용될 경우** 공통 컴포넌트로 분리합니다.

```text
src
└── components
    └── common
```

원칙:

* 실제 재사용이 발생했을 때 분리합니다.
* "나중에 사용할 수도 있음" 수준의 추상화는 지양합니다.
* 과도한 공통화보다 현재 구조의 명확성을 우선합니다.

### 3.2 파일 분리 기준

하나의 파일이 약 **250줄 이상**이 되는 경우 분리 가능성을 검토합니다.

검토 대상:

* 하위 컴포넌트
* 커스텀 훅 (`hooks/`)
* 유틸리티 함수 (`utils/`)

예시:

```text
FeaturePage
├── index.tsx
├── hooks
│   └── useFeature.ts
├── utils
│   └── formatter.ts
└── components
    └── FeatureItem.tsx
```

### 3.3 파일 분리 목적

파일 분리는 단순히 파일 수를 늘리기 위함이 아닙니다.

목적은 다음과 같습니다.

* 가독성 향상
* 유지보수성 개선
* 책임 분리 명확화

---

## 4. Import Order

Import는 아래 순서를 기준으로 작성합니다.

### 4.1 기본 순서

1. React / Next.js
2. 외부 라이브러리
3. 절대 경로(import alias)
4. 상대 경로
5. 스타일 파일

```tsx
import { Suspense } from "react";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

import { Button } from "@/components/common/Button";
import { API_ENDPOINTS } from "@/constants/api";
import { useUser } from "@/hooks/useUser";

import UserCard from "./UserCard";
import { formatDate } from "./utils";

import "./style.css";
```

### 4.2 그룹 간 공백

Import 그룹 사이에는 한 줄을 띄웁니다.

```tsx
import Link from "next/link";

import clsx from "clsx";

import { Button } from "@/components/common/Button";

import UserCard from "./UserCard";
```

### 4.3 정렬 기준

같은 그룹 내에서는 알파벳 순으로 정렬합니다.

```tsx
import clsx from "clsx";
import dayjs from "dayjs";
import { z } from "zod";
```

```tsx
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import { UserCard } from "@/components/UserCard";
```

### 4.4 Import Alias 사용

상위 디렉토리 이동을 위한 상대 경로 사용을 지양합니다.

권장:

```tsx
import { Button } from "@/components/common/Button";
import { useUser } from "@/hooks/useUser";
```

비권장:

```tsx
import { Button } from "../../../components/common/Button";
import { useUser } from "../../../../hooks/useUser";
```

### 4.5 사용하지 않는 Import 금지

사용하지 않는 Import는 즉시 제거합니다.

```tsx
// ❌
import { useMemo } from "react";

// useMemo 사용 안 함
```
