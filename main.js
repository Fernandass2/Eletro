console.log("Processo principal")
const { app, BrowserWindow, nativeTheme, Menu } = require('electron')
const path = require('node:path')

// Janela principal
const createWindow = () => {
  // Define o tema (claro ou escuro)
  nativeTheme.themeSource = 'light' // (light ou dark)
  
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // autoHideMenuBar: true,
    // minimizable: false,
    resizable: false
  })
  
  // Menu personalizado
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  win.loadFile('./src/views/index.html')
}

// Iniciar a aplicação
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Janela Sobre
function aboutWindow() {
  nativeTheme.themeSource = 'dark'

  const main = BrowserWindow.getFocusedWindow()
  let about
  
  // Estabelecer relação hierárquica entre janelas
  if (main) {
    about = new BrowserWindow({
      width: 360,
      height: 220,
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
      parent: main,
      modal: true
    })
  }
  
  about.loadFile('./src/views/sobre.html')
}

// Reduzir logs não críticos
app.commandLine.appendSwitch('log-level', '3')

// Template do menu
const template = [
  {
    label: 'Cadastro',
    submenu: [
      {
        label: 'Cadastro de Eletrodomésticos',
        click: () => openCadastroEletrodomestico()
      },
      {
        label: 'Registrar OS',
        click: () => openCadastroOS()
      },
      {
        type: 'separator'
      },
      {
        label: 'Sair',
        click: () => app.quit(),
        accelerator: 'Alt+F4'
      }
    ]
  },
  {
    label: 'Relatórios',
    submenu: [
      {
        label: 'Relatório de Eletrodomésticos'
      },
      {
        label: 'Relatório de OS Abertas'
      },
      {
        label: 'Relatório de OS Concluídas'
      }
    ]
  },
  {
    label: 'Zoom',
    submenu: [
      {
        label: 'Aplicar zoom',
        role: 'zoomIn'
      },
      {
        label: 'Reduzir',
        role: 'zoomOut'
      },
      {
        label: 'Restaurar para zoom padrão',
        role: 'resetZoom'
      }
    ]
  },
  {
    label: 'Ferramentas',
    submenu: [
      {
        label: 'Recarregar',
        role: 'reload'
      },
      {
        label: 'Ferramentas do desenvolvedor',
        role: 'toggleDevTools'
      }
    ]
  },
  {
    label: 'Ajuda',
    submenu: [
      {
        label: 'Sobre',
        click: () => aboutWindow()
      }
    ]
  }
]

// Funções de navegação
function openCadastroEletrodomestico() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    resizable: false
  })
  win.loadFile('./src/views/cadastro_eletrodomestico.html')
}

function openCadastroOS() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    resizable: false
  })
  win.loadFile('./src/views/ordem_servico.html')
}
