module.exports = {
  "env": {
      "es6": true,
      "node": true,
      "browser": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
    }
  },
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "react/prop-types": 0,
    "no-console": 0,
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
        "error",
        "unix"
    ],
    "quotes": [
        "error",
        "single"
    ],
    "semi": [
        "error",
        "never"
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
        "error", "always"
    ],
    "arrow-spacing": [
        "error", { "before": true, "after": true }
    ],
    "react/prop-types": 0,
    "react-hooks/rules-of-hooks": "error"
  }
};