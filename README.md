# www

[![GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)
[![Build Status](https://travis-ci.org/mtdhb/www.svg?branch=master)](https://travis-ci.org/mtdhb/www)

https://www.mtdhb.com 网页端

> 注意：使用本项目搭网站的朋友，请自行反向代理 https://api.mtdhb.com 域名，API 不再支持跨域调用

## 开发

环境要求 Node.js 9.x

```bash
npm i
npm run dev
```

## 发布

```bash
npm run build
```

将生成的 build 目录提交到网站根目录
