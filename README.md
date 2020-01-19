# url-redirector

### Introduction

Redirect to another URL based on whether source IP comes from the mainland of china.

### Config

Config file `./config.json` :

``` json
{
  "port": 80,
  "china-mainland-ip": "https://www.baidu.com/",
  "non-china-mainland-ip": "https://www.google.com/",
  "status-code": 302
}
```

- item `port`: indicate which port to listen.
- item `china-mainland-ip`: indicate the url to jump when source IP comes from the mainland of china.
- item `not-china-mainland-ip`: indicate the url to jump when source IP does not come from the mainland of china.
- item `status-code`: indicate which HTTP status code to use, it should be `3xx`.

### China mainland IP List

China mainland IP List is updated from [here](https://raw.githubusercontent.com/17mon/china_ip_list/master/china_ip_list.txt) every 15 days.

### Thanks

Thanks @17mon for providing [china_ip_list](https://github.com/17mon/china_ip_list).

### Others

- All code files are edited by [Visual Studio Code](https://code.visualstudio.com/).
- All ".md" files are edited by [Typora](http://typora.io/).
- The style of all ".md" files is [Github Flavored Markdown](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown).
- There is a LF (Linux) at the end of each line.