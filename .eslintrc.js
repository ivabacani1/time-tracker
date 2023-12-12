module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:react-hooks/recommended", // Uses the recommended rules from @eslint-plugin-react-hooks
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors.
    "plugin:import/typescript", // Enables eslint-plugin-import - linting for import order
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "react"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "prettier/prettier": "off",
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["**/*.tsx"],
      rules: {
        "react/prop-types": ["off", { ignore: ["children"] }],
      },
    },
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
};
