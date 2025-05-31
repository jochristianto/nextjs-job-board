import { FlatCompat } from "@eslint/eslintrc";
import stylistic from "@stylistic/eslint-plugin";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import noUnusedImports from "eslint-plugin-unused-imports";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // plugins: ["unused-imports", "no-relative-import-paths"],
    plugins: {
      "unused-imports": noUnusedImports,
      "no-relative-import-paths": noRelativeImportPaths,
      "@stylistic": stylistic
    },
    rules: {
      "react/no-unescaped-entities": "off",

      // TypeScript
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-types": "off",

      // Unused imports
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_"
        }
      ],

      // no-relative-import-paths
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        { allowSameFolder: false, prefix: "@", rootDir: "./" }
      ],

      "@stylistic/max-len": [
        "error",
        {
          code: 100,
          comments: 100,
          ignoreComments: true,
          // ignoreTrailingComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true
        }
      ],
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always"
        }
      ]
    }
  }
];

export default eslintConfig;
