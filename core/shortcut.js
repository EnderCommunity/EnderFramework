createDesktopShortcut = require('create-desktop-shortcuts');
module.exports = {
    create: function (args) {
        createDesktopShortcut({
            onlyCurrentOS: true,
            verbose: true,
            windows: {
                filePath: process.execPath,
                outputPath: args.outputDir,
                name: args.name,
                description: args.description,
                icon: args.icon,
                arguments: args.arguments,
                windowMode: 'normal',
                comment: 'EnderFramework app'
            }
        });
    }
};