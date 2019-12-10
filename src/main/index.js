import { app, BrowserWindow, globalShortcut, Menu } from 'electron'

// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true })

// Install `vue-devtools`
require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer')
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => { })
    .catch(err => {
      console.log('Unable to install `vue-devtools`: \n', err)
    })
})

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    useContentSize: true,
    fullscreenable: true,
    isMenuBarAutoHide: true

  })


  mainWindow.maximize();
  mainWindow.loadURL(winURL)

  mainWindow.setMenuBarVisibility(true);


  // mainWindow.webContents.openDevTools({mode:"detach"});


  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
CreateMenu();

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

function CreateMenu() {
  const isMac = process.platform === 'darwin'

  const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    // { role: 'fileMenu' }
    {
      label: '文件',
      submenu: [
        isMac ? { role: 'close' } : { role: 'quit', label: "退出" }
      ]
    },
    // { role: 'editMenu' }
    {
      label: '编辑',
      submenu: [
        { role: 'undo', label: "撤销" },
        { role: 'redo', label: "重做" },
        { type: 'separator' },
        { role: 'cut', label: "剪切" },
        { role: 'copy', label: "复制" },
        { role: 'paste', label: "粘贴" },
        ...(isMac ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startspeaking' },
              { role: 'stopspeaking' }
            ]
          }
        ] : [
            { role: 'delete', label: "删除" },
            { type: 'separator' },
            { role: 'selectAll', label: "全选" }
          ])
      ]
    },
    // { role: 'viewMenu' }
    {
      label: '视图',
      submenu: [
        { role: 'reload', label: "刷新" },
        { role: 'forcereload', label: "强制刷新" },
        { role: 'toggledevtools', label: "调试工具" },
        { type: 'separator' },//分割线
        { role: 'resetzoom', label: "重置窗口" },
        { role: 'zoomin', label: "放大" },
        { role: 'zoomout', label: "缩小" },
        { type: 'separator' },
        { role: 'togglefullscreen', label: "全屏" }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: '窗口',
      submenu: [
        { role: 'minimize', label: "最小化" },
        { role: 'maximize', label: "最大化" },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
            { role: 'close', label: "关闭" }
          ])
      ]
    },
    {
      role: 'help',
      label: "帮助",
      submenu: [
        {
          label: '了解更多',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('http://www.zhaoxiangyang.top')
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

