import axios from "axios";
import { getSession } from "@/libs/index";
import { ElMessage } from 'element-plus'
import router from "../router"; //路由
// import { useStore } from 'vuex'
// const store = useStore()
let instance = axios.create({
    timeout: 30000,
    baseURL: "",
    headers: { "client-type": "PC" }, //自定义header
});
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
//请求拦截器
instance.interceptors.request.use(
    (config) => {
        if (config.method === "formdata") {
            config.headers.post["Content-Type"] =
                "multipart/form-data;charset=utf-8";
            config.method = "post";
            let fPar = new FormData();
            for (let key in config.params) {
                fPar.append(key, config.params[key]);
            }
            config.data = fPar;
            config.params = "";
        } else if (config.method === "query") {
            config.method = "post";
            config.data = config.params;
            config.params = "";
        } else if (config.method === "post") {
            config.data = config.params;
            config.params = "";
        }
        config.headers["access-token"] = getSession("token");
        config.headers["uid"] = getSession("uid");
        config.headers["Cache-Control"] = "no-cache";
        let ency = router.currentRoute.query.ency || getSession("ency");
        if (ency) {
            config.headers["ency"] = ency;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

//响应拦截器
instance.interceptors.response.use(
    (res) => {
        if (res.status === 200) {
            //未登录code，转跳到登录
            let ency = router.currentRoute.query.ency || getSession("ency");
            if (res.data.code == 110000 && !ency) {
                router.push("/login");
                ElMessage.error(res.data.msg);
            } else if (res.data.code == 200 || res.data.code === 1020) {
                return res.data;
            } else if (res.headers["content-disposition"]) {
                return {
                    contentDisposition: res.headers["content-disposition"],
                    data: res.data,
                };
            } else {
                ElMessage.error(res.data.msg);
            }
        }
        return addErrorLog(res);
    },
    (err) => {
        // if (err && err.status === 401) { // 401 未登录 token失效
        //     store.dispatch('user/resetToken').then(() => {
        //         window.location.reload()
        //     })
        // }
        ElMessage.error("系统异常！");
        return addErrorLog(err);
    }
);
const addErrorLog = (res) => {
    console.error(res, "axios/error");
    return Promise.reject(res.data);
};
const $axios = (option) => {
    let parDef = {
        url: "",
        data: {},
        method: "post",
    };

    let par = Object.assign(parDef, option);
    return new Promise((resolve, reject) => {
        instance({
                url: par.url,
                params: par.data,
                method: par.method,
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
export default $axios;