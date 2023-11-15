// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Function to fetch data from the main process
  fetchDataFromMain: async () => {
    return await ipcRenderer.invoke('fetchDataFromMain');
  },
  addUserFromRenderer: async (name, email) => {
    return await ipcRenderer.invoke('addUserFromRenderer', name, email);
  },
  deleteUser : async (id)=>{
    return await ipcRenderer.invoke('deleteUser', id);
  }
});
