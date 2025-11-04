import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      ".env*",
      "*.log",
      "dist/**",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // 필수 규칙
      "react/no-unescaped-entities": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // 성능 최적화
      "react/display-name": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // 코드 품질
      "no-console": [
        "warn",
        {
          allow: ["warn", "error", "log"],
        },
      ],
      "no-debugger": "error",
      "prefer-const": "warn",
      "no-var": "error",
    },
  },
];

export default eslintConfig;
