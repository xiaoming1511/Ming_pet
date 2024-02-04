// 登录接口data类型定义
export interface loginDataTs {
    username:string,
    password:string
}
// 登录接口返回数据的类型定义
export interface loginResponseDataTs {
    code:number,
    msg:string,
    token:string,
    userInfo:any
}