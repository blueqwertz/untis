const { app, BrowserWindow } = require("electron")

const path = require("path")
const isDev = require("electron-is-dev")
const windowStateKeeper = require("electron-window-state")

require("@electron/remote/main").initialize()

function createWindow() {
	let mainWindowState = windowStateKeeper({
		defaultWidth: 800,
		defaultHeight: 600,
	})

	const win = new BrowserWindow({
		x: mainWindowState.x,
		y: mainWindowState.y,
		width: mainWindowState.width,
		height: mainWindowState.height,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
		},
	})

	mainWindowState.manage(win)
	win.webContents.openDevTools()

	win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`)
}

app.on("ready", createWindow)

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") {
		app.quit()
	}
})

app.on("activate", function () {
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
