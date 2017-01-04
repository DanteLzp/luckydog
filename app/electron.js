'use strict'

const {app, Menu, BrowserWindow, dialog} = require('electron')
const path = require('path')

let mainWindow
let config = {}

if (process.env.NODE_ENV === 'development') {
  config = require('../config')
  config.url = `http://localhost:${config.port}`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html`
}

const template = [
  {
    label: '视图',
    submenu: [
      {
        label: '重载',
        role: 'reload'
      },
      {
        label: '开发者工具',
        role: 'toggledevtools'
      },
      {
        type: 'separator'
      },
      {
        label: '实际尺寸',
        role: 'resetzoom'
      },
      {
        label: '放大',
        role: 'zoomin'
      },
      {
        label: '缩小',
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        label: '全屏',
        role: 'togglefullscreen'
      }
    ]
  },
  {
    label: '窗口',
    role: 'window',
    submenu: [
      {
        label: '最小化',
        role: 'minimize'
      },
      {
        label: '关闭',
        role: 'close'
      }
    ]
  },
  {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: '了解更多',
        // click () { require('electron').shell.openExternal('http://electron.atom.io') }
        click () {
          dialog.showMessageBox({type: 'info', message: '感谢使用！', buttons: ['确定']})
        }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  })
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  })

  mainWindow.loadURL(config.url)

  // if (process.env.NODE_ENV === 'development') {
  //   BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'))
  //
  //   let installExtension = require('electron-devtools-installer')
  //
  //   installExtension.default(installExtension.VUEJS_DEVTOOLS)
  //     .then((name) => mainWindow.webContents.openDevTools())
  //     .catch((err) => console.log('An error occurred: ', err))
  // }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  console.log('mainWindow opened')
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
