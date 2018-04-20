/**
 * 根据路径来加载配置文件
 * Created by yyl on 2018/4/4.
 */
const fs = require('fs');
const _ = require('lodash');
const path = require("path");
const projectRoot = process.cwd();


/**
 * 根据指定的文件路径配置系统环境变量
 * @param filePath 相对于项目根目录的路径
 */
function config(filePath) {
    const configFile = filePath?
        fs.readFileSync(filePath) : fs.readFileSync(path.join(projectRoot,'.env'));


    if(!configFile){
        console.error("文件不存在",filePath);
        return;
    }
    console.log("configFile",configFile);

    //按照行来分割文件内容
    let configData = configFile.toString().split("\r\n");
    console.log(configData);

    let tmpMap = new Map();
    //添加项目根目录
    tmpMap.set("projectRoot", projectRoot);

    //遍历，将每一行写入为一个环境变量
    configData.forEach(d=>{
        //跳过以#开头和没有=的行
        if(!_.startsWith(d,"#") && d.includes('=')){
            //分割key value
            let kv = _.map(d.split('='), _.trim);

            tmpMap.set(kv[0], kv[1]);
            console.log(kv);

            //如果是${XXX}的形式，则表示有引用
            let start = kv[1].indexOf("${");
            let end = kv[1].indexOf("}");
            if(start !== -1 && end !==-1){
                process.env[kv[0]] =
                    kv[1].substring(0,start) +
                    tmpMap.get(kv[1].substring(start+2, end)) +
                    kv[1].substring(end+1);
            }else {
                process.env[kv[0]] = kv[1];
            }
        }
    });

    console.log("项目根路径：",projectRoot);
    console.log(process.env);
}

module.exports = config;
