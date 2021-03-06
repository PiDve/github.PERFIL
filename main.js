const { app, BrowserWindow, Menu, Tray } = require('electron');


function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });
    //diretório
    mainWindow.loadFile(__dirname + '/src/index.html');
    //
    mainWindow.on('closed', function (){
        mainWindow = null;
    });

    mainWindow.setMenu(null);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Mostrar aplicativo", click: function () {
                mainWindow.show();
            },
            label: "Fechar", click: function() {
                app.isQuitting = true;
                app.quit();
            }
        }
    ])

    const tray = new Tray(__dirname + '/imagens/dente.png');
    tray.setContextMenu(contextMenu);

    mainWindow.on('close', function(e) {
        if(!app.isQuitting) {
            e.preventDefault();
            mainWindow.hide();
        }
    })

}



app.on('ready', createWindow);