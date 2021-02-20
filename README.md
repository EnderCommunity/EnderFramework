![Screenshot](repository/logo.png?raw=true "Logo")

![Downloads](https://img.shields.io/github/downloads/EnderAdel/EnderFramework/total?color=blue) ![EnderFramework Repository Size](https://img.shields.io/github/repo-size/EnderAdel/EnderFramework?label=Repository%20Size&color=blue) ![EnderFramework Top Language](https://img.shields.io/github/languages/top/EnderAdel/EnderFramework?color=blue) ![License](https://img.shields.io/github/license/EnderAdel/EnderFramework?color=blue) [![Issues](https://img.shields.io/github/issues/EnderAdel/EnderFramework?color=blue)](https://github.com/EnderAdel/EnderFramework/issues) [![Bugs](https://img.shields.io/github/issues/EnderAdel/EnderFramework/bug?label=Bugs)](https://github.com/EnderAdel/EnderFramework/issues?q=label%3A%22bug%22) [![To-Do](https://img.shields.io/github/issues/EnderAdel/EnderFramework/To-Do?label=To-Do&color=blue)](https://github.com/EnderAdel/EnderFramework/issues?q=label%3A%22To-Do%22) [![Help wanted!](https://img.shields.io/github/issues/EnderAdel/EnderFramework/help%20wanted?label=Help%20Wanted&color=red)](https://github.com/EnderAdel/EnderFramework/issues?q=label%3A%22help+wanted%22) [![EnderFramework Discord Invite](https://img.shields.io/discord/756472096099663954?color=blue&label=Discord%20Server&logo=discord&logoColor=white)](https://discord.com/invite/rWbtez6) [![Twitter](https://img.shields.io/twitter/follow/_EnderCommunity?style=social)](https://twitter.com/intent/follow?screen_name=EnderAdel) [![EnderAdel](https://img.shields.io/github/followers/adel-sbeh?label=The%20creator&style=social)](https://github.com/adel-sbeh/)


EnderFramework enables you to build cross-platform applications using JavaScript, HTML, and CSS. It is based on [Electron](https://electronjs.org). Why make a new framework out of another framework? Glad you asked! This framework will be more focused on introducing custom elements, custom designs, and custom APIs on top of the originals! And giving the user the ability to build a full-on custom app, with a fully customizable UI using CSS, in a matter of minutes.

You can find out more about this framework in [here](https://enderadel.net/EnderFramework)!

***Note: the framework is still in the very early development stages. We are open to suggestions.***

## Installation
To run EnderFramework, you need to have [NodeJS](https://nodejs.org/) and [VS Build Tools 2017](https://www.visualstudio.com/thank-you-downloading-visual-studio/?sku=BuildTools&rel=15) installed on your device. Execute `npm install` to install all the modules. And then, after the installation process is done, execute `npm start`.

You can change the start file code ([core/start.js](core/start.js)) to start any app! Look for the `ready` event in the file.
```js
app.on("ready", function() {
    for (var i = 0; i < process.argv.length; i++) {
        if (process.argv[i].includes("--start=")) {//You can change this to true!
            done = true;
            var appID = process.argv[i].replace(/\s/g, '').substring(8),
                length = appID.replace(/[^.]/g, "").length;
            /*And replace the code above with any value you want, such as:
            var appID = "com.enderadel.test",
                length = appID.replace(/[^.]/g, "").length;*/
            [...]
        } else if (process.argv[i] == "--store") {//You can change this to true!
            [...]
        } else if (process.argv[i] == "--installer") {//You can change this to true!
            [...]
        } else if (process.argv[i] == "--studio") {//You can change this to true!
            [...]
        } else if (process.argv[i] == "--settings") {//You can change this to true!
            [...]
        }
    }
    [...]
});
```

## Quick start
*Coming soon!*

## Reporting Bugs and requesting Features
You can report bugs and request new features by opening a [new issue](https://github.com/EnderAdel/EnderFramework/issues/new).

## Contributing
If you are interested in reporting/fixing issues and contributing directly to the code base, feel free to do so! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for more information!

***Note:*** *As you can see, I'm not very active on GitHub. The reason is because I'm a student. You can contact me on my email ([adel.sbeh.email@gmail.com](mailto:adel.sbeh.email@gmail.com)) regarding any concern!*

## Screenshots

![Screenshot](repository/screenshots/1.png?raw=true "A test app")
![Screenshot](repository/screenshots/2.png?raw=true "EnderInstaller")

The framework supports light mode and dark mode!
![Screenshot](repository/screenshots/3.png?raw=true "A test app - alert (Dark Mode)")
![Screenshot](repository/screenshots/4.png?raw=true "A test app - alert (Light Mode)")


## License
[Apache License, Version 2.0](LICENSE)

When using the logos of EnderFramework, or GitHub, be sure to follow the [GitHub logo guidelines](https://github.com/logos).

## More

*Follow [@_EnderCommunity](https://twitter.com/_EnderCommunity) on Twitter to keep yourself up-to-date on everything related to the framework. You can also join our [Discord server](https://discord.gg/rWbtez6).*

*EnderFramework is the property of EnderCommunity*