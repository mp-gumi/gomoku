module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 12,
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "import",
    "unused-imports",
    // ...
    "react-hooks",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  rules: {
    // eslint
    "no-unused-vars": "off", // @typescript-eslint/no-unused-varsを有効化するため、オフにする。
    // react
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    // typescript-eslint
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    // import
    "import/namespace": "off",
    "import/order": [
      "error",
      {
        pathGroups: [
          {
            pattern: "~/**",
            group: "external",
            position: "after",
          },
        ],
        groups: [
          "builtin",
          "external",
          "internal",
          "unknown",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
      },
    ],
    // unused-imports
    "unused-imports/no-unused-imports-ts": "warn",
    // react-hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
