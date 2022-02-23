module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended",
        // "@vue/prettier"      注销掉这一行
    ],
    parserOptions: {
        parser: "babel-eslint"
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-unused-expressions": "off"
    }
};