# url-redirector

[English](./README.md)

### 简介

根据访问 IP 是否来自中国大陆，重定向到不同的 URL 。

### 配置

配置文件 `./config.json` ：

``` json
{
  "port": 80,
  "china-mainland-ip": "https://www.baidu.com",
  "non-china-mainland-ip": "https://www.google.com",
  "status-code": 302
}
```

- 配置项 `port`: 监听端口。
- 配置项 `china-mainland-ip`: 访问 IP 来自中国大陆，跳转到这里。
- 配置项 `not-china-mainland-ip`: 访问 IP 来自中国大陆以外的地区，跳转到这里。
- 配置项 `status-code`: HTTP 状态码，应当为 `3xx` 。
- 请注意：URL 不要以 `/` 结尾。

### 运行

#### 常规方式

``` bash
$ git clone https://github.com/zzc-tongji/url-redirector.git
$ cd url-redirector
$ npm install
$ npm start
```

#### Docker 方式

``` bash
$ docker pull sulfonamide/url-redirector
$ docker run --restart=always -d --name [container name] -v [host: path to config.json]:/usr/src/app/config.json -p [host: listening port]:[docker: listening port defined by config.json] sulfonamide/url-redirector
```

#### NGINX 反向代理

如果使用 NGINX，请将下列内容添加至 NGINX 配置文件，以便 `url-redirector` 获取真实的访问 IP 。

```
proxy_set_header    Host               $host;
proxy_set_header    X-Real-IP          $remote_addr;
proxy_set_header    X-Forwarded-For    $proxy_add_x_forwarded_for;
```

### 中国大陆 IP 列表

中国大陆 IP 列表，每15天从[这里](https://raw.githubusercontent.com/17mon/china_ip_list/master/china_ip_list.txt)更新一次。

### 致谢

感谢 [17mon](https://github.com/17mon) 提供 [china_ip_list](https://github.com/17mon/china_ip_list) 。

###  其他

- 所以代码文件是用 [Visual Studio Code](https://code.visualstudio.com/) 编写的。
- 所有".md"文件是用 [Typora](http://typora.io/) 编写的。
- 所有".md"文件的风格是 [Github Flavored Markdown](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) 。
- 各行以LF（Linux）结尾。