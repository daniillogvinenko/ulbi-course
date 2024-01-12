module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: ["plugin:react/recommended", "airbnb", "plugin:i18next/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "i18next", "react-hooks", "ulbi-tv-plugin", "unused-imports"],

    // !!!!!!!!!!!!!!!
    ignorePatterns: ["**.cy.ts", "common.ts"],
    rules: {
        quotes: "off",
        "linebreak-style": "off",
        "import/extensions": "off",
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        indent: [2, 4],
        "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".tsx"] }],
        "import/no-unresolved": "off",
        "import/prefer-default-export": "off",
        "no-unused-vars": "off",
        "react/require-default-props": "off",
        "react/react-in-jsx-scope": "off",
        // "default-param-last": "off",
        "react/jsx-props-no-spreading": "warn",
        "react/function-component-definition": "off",
        "no-shadow": "off",
        "comma-dangle": "off",
        "import/no-extraneous-dependencies": "off",
        "operator-linebreak": "off",
        "no-underscore-dangle": "off",
        "i18next/no-literal-string": [
            "error",
            {
                markupOnly: true,
                ignoreAttribute: [
                    "border",
                    "target",
                    "as",
                    "role",
                    "data-testid",
                    "to",
                    "justify",
                    "align",
                    "direction",
                    "gap",
                    "feature",
                    "color",
                    "variant",
                ],
            },
        ],
        "max-len": ["error", { ignoreComments: true, code: 120 }],
        "implicit-arrow-linebreak": "off",
        "no-console": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "error", // Checks effect dependencies
        "no-param-reassign": "off",
        "object-curly-newline": "off",
        "no-undef": "off",
        "unused-imports/no-unused-imports": "error",
        "react/no-array-index-key": "off",
        "ulbi-tv-plugin/path-checker": ["error", { alias: "@" }],
        "ulbi-tv-plugin/layer-imports": [
            "error",
            {
                alias: "@",
                ignoreImportPatterns: ["**/StoreProvider", "**/testing"],
            },
        ],
        "ulbi-tv-plugin/public-api-imports": [
            "error",
            {
                alias: "@",
                testFilesPatterns: ["**/*.test.*", "**/*.story.*", "**/StoreDecorator.tsx"],
            },
        ],
        "function-paren-newline": "off",
        "react/jsx-wrap-multilines": "off",
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ["**/src/**/*.test.{ts,tsx}"],
            rules: {
                "i18next/no-literal-string": "off",
            },
        },
    ],
};
