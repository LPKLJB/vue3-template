import $axios from "@/axios/request";
import { config } from "@/libs/config";
/**
 *
 * @param {*} url --api路径
 * @param {*} data -- 请求参数 json对象
 * @param {*} method --请求方式：get/post/formdata
 */
export const getData = (url = "", data = {}, method = "post") => {
    url = setBaseUrl(url);
    return $axios({
        url,
        method,
        data,
    });
};

/**
 *
 * @param {*} url --api路径
 * @param {*} id  --路径参字符串，通常情况是以斜杠"/"分割的多个字符串
 *                  一个字符串时不用斜杠"/"
 *                  如："aaa" 和 "aaa/bbb/ccc"
 *
 * @param {*} data -- 请求参数 json对象
 * @param {*} method --请求方式：get/post/formdata
 */
export const requstUrl = (
    url = "",
    urlStr = "",
    data = {},
    method = "post"
) => {
    url = setBaseUrl(url);
    return $axios({
        url: `${url}/${urlStr}`,
        method,
        data,
    });
};

//处理api请求的url
const setBaseUrl = (url) => {
    let getBaseUrl;
    if (process.env.NODE_ENV === "production") {
        getBaseUrl = config.baseUrl.production;
    } else if (process.env.NODE_ENV === "test") {
        getBaseUrl = config.baseUrl.test;
    } else if (process.env.NODE_ENV === "qa") {
        getBaseUrl = config.baseUrl.qa;
    } else if (process.env.NODE_ENV === "pre") {
        getBaseUrl = config.baseUrl.pre;
    } else {
        getBaseUrl = config.baseUrl.dev;
    }
    return getBaseUrl + url;
};