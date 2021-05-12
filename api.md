#### 接口根地址
    http://api.aubrey.com/chat
#### 用户相关接口
    - 在 /users 下
##### 用户注册
- 请求URl 
    + /signUp
- 请求方式
    + POST
- 参数格式
    | 参数名称 | 参数类型 | 是否必选 | 参数说明 |
    -|-|-|-|-|-
    uName | String | 是 | 用户名 
    email|String|是|用户邮箱
    password|String|是|密码
- 相应格式
    | 数据名称 | 数据类型 | 数据说明 |
    -|-|-|-
    code | Number | 200:成功； 500:失败
    msg | String | 对code状态的详细说明

- 返回示例
    ```json
        {
            "code": 200,
            "msg": "注册成功,请登录"
        }
    ```

##### 检测用户名是否已经存在
- 请求URL
    + /findUname
- 请求方式
    + POST
- 参数格式
    | 参数名称 | 参数类型 | 是否可选 | 参数说明 |
    -|-|-|-|-|-
    uName | String | 是 | 用户名
- 响应格式
    | 数据名称 | 数据类型 | 数据说明 |
    -|-|-|-
    code | Number | 201:用户名不存在; 202:用户名已经存在; 500:失败
    msg | String | 对code状态的详细说明
- 返回示例
    ```json
        {
            "code": 201,
            "msg": "当前用户名可以使用"
        }
    ```
##### 检测邮箱是否已经被注册
- 请求URL
    + /findEmail
- 请求方式
    + POST
- 参数格式
    | 参数名称 | 参数类型 | 是否可选 | 参数说明 |
    -|-|-|-|-|-
    email | String | 是 | 邮箱
- 响应格式
    | 数据名称 | 数据类型 | 数据说明 |
    -|-|-|-
    code | Number | 201:用户名不存在; 202:用户名已经存在; 500:失败
    msg | String | 对code状态的详细说明
- 返回示例
    ```json
        {
            "code": 201,
            "msg": "当前邮箱可以使用"
        }
    ```
##### 用户名密码登录
- 请求URL
    + /login
- 请求方式
    + POST
- 参数格式
    | 参数名称 | 参数类型 | 是否可选 | 参数说明 |
    -|-|-|-|-|-
    uName | String | 是 | 用户名
    passwor | String | 是 | 密码
- 响应格式
    | 数据名称 | 数据类型 | 数据说明 |
    -|-|-|-
    code | Number | 201:用户名不存在; 203:用户名或者密码错误; 500:失败
    msg | String | 对code状态的详细说明
    info | Array | 返回用户数据
    token | String | token
- 返回示例
    ```json
        {
            "code": 200,
            "msg": "登录成功",
            "info": [
                {
                    "id": 6,
                    "uName": "lisi",
                    "email": "2930603106@qq.com",
                    "password": "123456"
                }
            ],
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo2LCJ1TmFtZSI6Imxpc2kiLCJlbWFpbCI6IjI5MzA2MDMxMDZAcXEuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYifSwiaWF0IjoxNjIwNzM4NzA0LCJleHAiOjE2MjA4MjUxMDR9.HCinnDDQfG03LBXdPxJwcnerIkdEU51_wDv3Agg4hpE"
        }
    ```
#### 好友相关接口
    - 在 /friend 下
##### 获取好友列表
- 请求URL
    + 
##### 获取好友详细信息
##### 添加好友
##### 删除好友
##### 好友信息备注
