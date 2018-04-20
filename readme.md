# node-envcfg
将指定位置的配置文件(key-value)注册到process.env对象内，方便使用环境变量来配置应用程序。
## 安装
```shell
$ npm install node-envcfg --save
```
## 使用

app.js
```javascript
require("node-envcfg")();
//require("node-envcfg")(require('path').join(__dirname,"./app/server/config/.env"));
```
当不给传递参数的时候，会在项目根目录下寻找`.env`文件并注册到`process.env`，如果有传递参数，则寻找的是这个参数指定的文件。

## 配置文件格式
```
# 能力文件基目录
ABILITY_PREFIX = ${projectRoot}\app\assets\dist

# 能力过滤目录
ABILITY_FOLDER = ability

# 上传文件存放文件夹
ABILITY_SCRIPT_FOLDER = ${ABILITY_FOLDER}/scripts
ABILITY_STYLE_FOLDER = ${ABILITY_FOLDER}/styles

```
- `#`用于注释对应的行;
- `${}`用于引用前面的已经有的`key`,如，上面所示`${ABILITY_FOLDER}/scripts`实际为`ability/scripts`。
- `${projectRoot}`表示项目的根目录


如果好用，可以star下 :clap: :clap: :clap:
