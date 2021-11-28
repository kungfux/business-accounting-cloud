const { Menu } = require('electron')

class MainMenu {
    getMenu() {
        const template = [
            {
                label: 'Файл',
                submenu: [
                    {
                        label: 'Выход',
                        role: 'quit'
                    }
                ]
            },
            {
                label: 'Вид',
                submenu: [
                    {
                        label: 'Обновить',
                        role: 'reload'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Увеличить',
                        role: 'zoomIn'
                    },
                    {
                        label: 'Уменьшить',
                        role: 'zoomOut'
                    },
                    {
                        label: 'Консоль',
                        role: 'toggleDevTools',
                        visible: false,
                        acceleratorWorksWhenHidden: true
                    }
                ]
            },
            {
                label: 'Справка',
                submenu: [
                    {
                        label: 'О программе',
                        role: 'about'
                    }
                ]
            }
        ]

        return Menu.buildFromTemplate(template)
    }
}

module.exports = { MainMenu }
