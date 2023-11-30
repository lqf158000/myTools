module.exports = {
  root: true,
  extends: [
    "plugin:vue/essential",
    "@vue/airbnb",
    "@vue/typescript",
    "plugin:prettier/recommended",
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".js", ".vue", ".json"],
      },
    },
    "import/extensions": [".js", ".vue", ".ts", ".json"],
  },
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-alert": "off",
    "import/extensions": ["off", "never"],
    "vue/no-mutating-props": "off",
    "vue/html-indent": [
      "error",
      2,
      {
        baseIndent: 1,
      },
    ],
    "max-len": ["error", 130],
    "vue/no-lone-template": "off",
    "vue/require-component-is": "off",
    "import/no-unresolved": "off", // 关闭导入解析错误
    "vue/component-name-in-template-casing": ["error", "PascalCase"], // 组件名总是使用PascalCase
    "new-cap": "off", // 关闭构造函数名首字母小写的限制
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      rules: {
        "@typescript-eslint/indent": ["error", 2],
        "@typescript-eslint/restrict-plus-operands": "error",
        "@typescript-eslint/no-extraneous-class": "off",
      },
    },
    {
      files: ["*.js", "*.jsx"],
      rules: {
        // 在这里为JavaScript文件指定规则
      },
    },
  ],
};
