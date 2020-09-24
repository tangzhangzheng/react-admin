const files = require.context("../../views", true, /\.js$/) // 建立上下文关系，目录，是否查找子集目录，查找参数
const components = [];
//循环文件
files.keys().map(key => {
    if (key.includes('./index') || key.includes('./login')) {
        return false;
    }
    // 分割字符串
    const spiltFilesName = key.split('.')
    //拼接path和component
    const pathName = `/index${spiltFilesName[1].toLowerCase()}`
    const component = files(key).default
    //写入对象
    const jsonObj = {}
    jsonObj.path = pathName
    jsonObj.component = component
    components.push(jsonObj)
})
export default components;