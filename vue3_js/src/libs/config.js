const config = {
    resourcePath: process.env.NODE_ENV == "production" ? "https://oss.game.com/wealth" : "", //资源文件根目录
    basePath: "/Beta.ActivityH5/KLJL", // 前端上线baseurl 配置
    baseUrl: {
        dev: "/api", // 调接口
        test: "xxx",
        qa: "xxx", //QA
        pre: "xxx", // pre
        production: "xxx",
    },
};
export {
    config
}