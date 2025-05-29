import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // plugins: ["unused-imports", "no-relative-import-paths"],
    plugins: {
      "unused-imports": "unused-imports",
      "no-relative-import-paths": "no-relative-import-paths",
    },
    rules: {
      "react/no-unescaped-entities": "off",

      // TypeScript
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-types": "off",

      // no-relative-import-paths
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        { allowSameFolder: false, prefix: "@", rootDir: "src" },
      ],

      "@stylistic/js/max-len": [
        "error",
        {
          code: 100,
          comments: 150,
          ignoreComments: true,
          // ignoreTrailingComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      "@stylistic/js/comma-dangle": ["error", "always-multiline"],
    },
  },
];

export default eslintConfig;
