## json-server  ----  模拟后端接口（<https://github.com/typicode/json-server> ）

```shell
#cmd全局安装json-server
cnpm install json-server -g
# 建立一个文件夹xxx,建立文件data.json----------文件夹和文件都是自己定义的在文件夹中,打开终端
输入 json-server data.json --watch     # watch命令可以帮你监测一个命令的运行结果,省得你一遍遍的手动运行
# 在data.json文件中写
{
  "list": []
}
# 用数组接收
# 小程序是需要https协议的，在开发者工具里面把下图的勾掉（不效验合法域名）
```

![QQ图片20190722162537](C:\Users\Dell\Desktop\小程序 - 萌宠交易平台\json-server  ----  模拟后端接口\QQ图片20190722162537.png)