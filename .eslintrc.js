module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "prettier"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "ignorePatterns": ["__test__", "node_modules", "coverage"],
    "rules": {
      "prettier/prettier": [
        1,
        {
          "trailingComma": "es5",
          "singleQuote": true,
          "semi": true
        }
      ],
      "no-console": ["error", { "allow": ["warn", "error", "info"] }],
    }
};
