import { contextBridge, ipcRenderer } from "electron";

// 预加载脚本
contextBridge.exposeInMainWorld("electron", {
  on: (channel, func) => ipcRenderer.on(channel, func),
});
