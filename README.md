# react-ui

A collection of components for React. Based on bootstrap.

# install
install nodejs

npm install -g grunt-cli

npm install

# build
build docs: grunt docs

build publish: grunt publish

# Components
```
Checkbox
Checkbox group
Color Picker
Datetime
Form
Form Control
Icon
Loading
Message
Mult select
Pagination
Progress
Radio group
Rating
Select
Tree
```

## 数据缓存
服务端返回统一的数据格式为：
```js
{
    "status": number, // 值为1时表示成功
    "msg": string, // 消息
    "timestamp": string, // 时间戳
    "cache": bool, // 是否使用当前缓存中的数据
    "data": object // 返回内容
}
```
当key不为空时，调用localStorage.setItem，存入数据


客户端请求发生时，先从localstorage取数据，并将key作为参数发送到服务端，服务端先检测服务端当前缓存timestamp，如果一致，返回结果为 { "cache": true, "data": null, ... }，如果不一致，返回 { "cache": false, "timestamp": new timestamp, "data": object, ... }。
