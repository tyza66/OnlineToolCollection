module.exports = function (appInfo) {
    var electron = require('electron');
    const path = require ('path');
    const Menu = electron.Menu;
    var app = electron.app
    var exePath = path.dirname(app.getPath('exe'));
    console.log("程序路径"+exePath);
    var toolist = path.join(exePath, 'toolist.txt');
    //读取list中的内容
    var fs = require('fs');
    //判断路径中文件是否存在
    if (!fs.existsSync(toolist)) {
        fs.writeFileSync(toolist, '请在toolist.txt编辑工具列表,格式为工具名{逗号}工具地址{换行}');
    }
    var data = fs.readFileSync(toolist, 'utf-8');
    //将读出的内容每行分割
    var arr = data.split('\n');
    //去除每行的空格
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim();
    }
    //去除空行
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
            result.push(arr[i]);
        }
    }
    var tools = [];
    for (var i = 0; i < result.length; i++) {
        var tool = result[i].split(',');
        var name = tool[0];
        let url = tool[1]; // 使用let关键字声明url变量
        tools.push({ label: name, click: () => { appInfo.mainWindow.loadURL(url) } });
    }
    if(tools.length==0){
        tools.push({ label: '请在同级目录下创建toolist.txt', click: () => { appInfo.mainWindow.loadURL('https://www.baidu.com/') } });
    }


    var template = [
        {
            label: '工具',
            submenu: tools
        },
        {
            label: '页面',
            submenu: [
                {
                    label: '返回上级',
                    click: () => {
                        appInfo.mainWindow.webContents.goBack();
                    }
                },
                {
                    label: '退出',
                    click: () => {
                        appInfo.app.exit();
                    }
                },
                {
                    label: '最大化', click: () => {
                        appInfo.mainWindow.maximize();
                    }
                },
                {
                    label: '最小化', click: () => {
                        appInfo.mainWindow.unmaximize();
                    }
                }
            ]
        }
    ]

    var m = Menu.buildFromTemplate(template)//按照模板构建菜单
    Menu.setApplicationMenu(m)
}