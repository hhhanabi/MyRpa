import { app, BrowserWindow,ipcMain } from 'electron'

// 等待Electron应用就绪后创建BrowserWindow窗口
app.whenReady().then(async () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 600,
        frame: false,
        // 配置窗口的WebPreferences选项，用于控制渲染进程的行为
        webPreferences: {
            nodeIntegration: true, // 启用Node.js集成
            contextIsolation: false, // 禁用上下文隔离
            webSecurity: false, // 禁用web安全策略
        }
    })
    // win.webContents.openDevTools()
    ipcMain.on('min', () => win.minimize());
    ipcMain.on('max', () => {
        if (win.isMaximized()) {
            win.restore();
        } else {
            win.maximize()
        }

    });
    ipcMain.on('close', () => win.close());
    ipcMain.on('refresh', () => win.reload());
    // 根据命令行参数加载URL或本地文件
    if (process.argv[2]) {
        win.loadURL(process.argv[2])
    } else {
        win.loadFile('index.html')
    }
})