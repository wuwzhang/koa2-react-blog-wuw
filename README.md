[TOC]

# 基于 React 和 Koa2 的个人博客

> 从什么都不会开始写，说实话，刚开始还是挺费劲的，写写停停也写了几个月，遇到许多大大小小的问题，感觉
> 自己成长了许多，也深深的认识到了自己的不足。虽然博客还有许多的问题，但还是想写个文章总结一下。

## 技术与环境

```
git clone https://github.com/wuwzhang/koa2-react-blog-wuw.git
cd koa2-react-blog-wuw/myBlog
npm install
npm run build
node scripts/publish.js ./server
cd ../server
npm install
npm start
```

* 前端
  * `create-react-app`
  * `redux`
  * `react-route`
  * `antd`
  * `react-intl`
  * `rc-queue-anim`
* 后端
* `koa2`
* 数据库
  * `mongodb(mongoose)`
  * `redis`

## 一些页面

### 首页

![homepage](https://ws3.sinaimg.cn/large/006tKfTcgy1fn0cwhp9q4j31kw0uvb29.jpg)

* 搜索框支持标签、分类、标题关键字搜索 ( 文章内所有所搜框都支持 )
* 可配置默认打开那一部分

### 文章归档页面

![keepOnFile-list](https://ws3.sinaimg.cn/large/006tKfTcgy1fn0d0roq6dj31kw0uyqm0.jpg)

![keepOnFile-summary](https://ws1.sinaimg.cn/large/006tKfTcgy1fn0d8w90daj31kw0uu1gk.jpg)

#### 文章显示部分

* 支持列表视图与详细视图的切换

#### 侧边栏部分

* 点击切换侧边栏，在配置页面可配置默认打开那一部分
* 默认侧边栏
* 搜索
* 按照文章年份月份归档统计显示
* 显示前十的标签云
* 归档统计显示
* 排行榜
* 显示评论排名前五和浏览排行前五的文章，可配置显示条数
* 将排行榜的数据同时存储在`redis`中，避免每次切换页面需要从`mongodb`中分组统计排行榜

### 搜索页面

![搜索页面](https://ws3.sinaimg.cn/large/006tNc79gy1fn143qo6toj31400ligut.jpg)

* 可通过点击标签、点击分类、输入框搜索至搜索页面
* 可配置每部分显示，文章条数

### 文章显示页面

![文章显示](https://ws1.sinaimg.cn/large/006tNc79gy1fn1bbi1j7sj313z0logrw.jpg)

* Markdown
  * 支持代码高亮 , 动态引入`highlight.js`
  * 支持 TOC
  * mathJax( 不知道为啥样式乱飞 )
* 文章导读条固定在顶部，显示文章阅读进度`scrollTop / (docHeight - pageHeight) * 100`
* 上一篇 / 下一篇
  ### 登录注册
  ![loginPage](https://ws1.sinaimg.cn/large/006tNc79gy1fn1bo9zei8j313z0lmq82.jpg)
  ![registPage](https://ws2.sinaimg.cn/large/006tNc79gy1fn1bvn6betj31400ljwlv.jpg)
  #### 登录
* 支持注册用户登录和`github`第三方登录
  #### 注册
* 验证账号是否存在
* 注册时在`redis`中定时临时创建用户 , 点击确认前往邮箱验证

### 文章书写页面

![articlePost](https://ws1.sinaimg.cn/large/006tNc79gy1fn1c1732jej313z0lkn7u.jpg)

* 支持开启或关闭预览
* 浏览器缓存上一次书写内容
* 支持全屏书写
* 支持书写区域字体调整
* 支持从本地获取文章
* 支持相应`Markdown`功能

### 文章、评论、消息、博客配置管理界面

![articleAdmin](https://ws3.sinaimg.cn/large/006tNc79gy1fn1c6027fjj31400ll10j.jpg)
![settingAdmin](https://ws4.sinaimg.cn/large/006tNc79gy1fn1c7rq4u1j31400ljq6g.jpg)

## 一些组件

### 页脚

![footer](https://ws1.sinaimg.cn/large/006tNc79gy1fn1cb3zvdlj31400fz784.jpg)

#### 联系我

* 邮箱验证
* 收到消息，邮箱收到消息提醒 ( 可配置是否提醒 )，管理界面消息显示

### 评论组件

![comment](https://ws1.sinaimg.cn/large/006tNc79gy1fn1cxpyiedj313o0cmq46.jpg)

* 控制登录前不能进行评论、点赞、踩、举报、点击按钮会弹出消息框提醒未登录并确认是否跳转至登录界面
* 文章管理界面可配置是否开启该篇文章评论
* 配置页面可控制评论一页显示条数，可控制有新评论、评论被举报是否发邮箱提醒确认
* 偶数次点赞为取消点赞，`mongodb`中存储点赞次数 ,`redis`中存储点赞用户信息，解决重复点赞问题
* 点击举报按钮，确认操作，`mongodb`中存储举报次数 ,`redis`中存储举报用户信息，重复点击无法取消行为
  ，`mongodb`和`redis`中信息不改变

## 其他

### 支持中英文切换

* 使用`react-intl`实现，默认使用浏览器默认语言

## 总结

* 因为是练手之作，这个博客还有许多不合理的地方，比如有些地方没必要，有些地方又不足，但还是尽力去修改
  与实现了，很多逻辑上的问题也因为自己第一次操作，没什么人讨论，只能按照自认为合理的方式去实现，也深
  深的让我认识到了写代码不是一个人的事，需要不断开阔眼见和与大家交流。
* 最后的最后，完成这样一个东西，内心还是激动的，哈哈哈哈，怎么说呢，散花完结吧！(❁´▽`❁)
