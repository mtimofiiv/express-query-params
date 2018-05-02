module.exports = {
  "extends": ["airbnb-base"],
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "global-require": ["off"],
    "comma-dangle": ["error", "never"],
    "semi": ["error", "never"],
    "no-plusplus": ["off"],
    "arrow-parens": ["off"],
    "no-restricted-syntax": ["off"],
    "no-console": ["off"],
    "no-continue": ["off"],
    "import/no-unresolved": [2, {}],
    "import/prefer-default-export": ["off"],
    "class-methods-use-this": ["off"],
    "array-bracket-spacing": ["error", "always", { "objectsInArrays": false }],
    "curly": [ "error", "multi" ],
    "function-paren-newline": [ "error", "multiline" ],
    "import/no-dynamic-require": ["off"],
    "no-restricted-globals": ["off"]
  }
}
