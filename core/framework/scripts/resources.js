fs.readFile(path.join(manifest.paths.core, "framework", "themes", manifest.content.theme, "main.css"), 'utf-8', (err, data) => {
  if(err){
    alert("`main.css` has failed to load!\n" + err.message);
    window.close();
  }
  resources.css.main = data.replace(new RegExp("./fonts/", 'g'), path.join(manifest.paths.core, "framework", "themes", manifest.content.theme, "fonts").replace(/\\/g, "/") + "/");
  resources.css.main = resources.css.main.replace(new RegExp("./icons/", 'g'), path.join(manifest.paths.core, "framework", "themes", manifest.content.theme, "icons").replace(/\\/g, "/") + "/");
});
fs.readFile(path.join(manifest.paths.core, "framework", "themes", manifest.content.theme, "font.css"), 'utf-8', (err, data) => {
  if(err){
    alert("`font.css` has failed to load!\n" + err.message);
    window.close();
  }
  resources.css.font = data.replace(new RegExp("./fonts/", 'g'), path.join(manifest.paths.core, "framework", "themes", manifest.content.theme, "fonts").replace(/\\/g, "/") + "/");
  resources.css.font = resources.css.font.replace(new RegExp("./icons/", 'g'), path.join(manifest.paths.core, "framework", "themes", manifest.content.theme, "icons").replace(/\\/g, "/") + "/");
});
fs.readFile(path.join(manifest.paths.core, "framework", "themes", manifest.content.theme, "icons.css"), 'utf-8', (err, data) => {
  if(err){
    alert("`icons.css` has failed to load!\n" + err.message);
    window.close();
  }
  resources.css.icons = data.replace(new RegExp("./fonts/", 'g'), path.join(manifest.paths.core, "framework", "themes", manifest.content.theme, "fonts").replace(/\\/g, "/") + "/");
  resources.css.icons = resources.css.icons.replace(new RegExp("./icons/", 'g'), path.join(manifest.paths.core, "framework", "themes", manifest.content.theme, "icons").replace(/\\/g, "/") + "/");
});
fs.readFile(path.join(manifest.paths.core, "framework", "scripts", "content", "customElements.js"), 'utf-8', (err, data) => {
  if(err){
    alert("`customElements.css` has failed to load!\n" + err.message);
    window.close();
  }
  resources.js.customElements = data;
});
fs.readFile(path.join(manifest.paths.core, "framework", "scripts", "content", "modifications.js"), 'utf-8', (err, data) => {
  if(err){
    alert("`modifications.css` has failed to load!\n" + err.message);
    window.close();
  }
  resources.js.modifications = data;
});
fs.readFile(path.join(manifest.paths.core, "libraries", "animateCSS", "animate.min.css"), 'utf-8', (err, data) => {
  if(err){
    alert("Failed to load a file!\n" + err.message);
    window.close();
  }
  resources.css.animations = data;
});
/*
fs.readFile(path.join(manifest.paths.core, "framework", "themes", manifest.content.theme, "file.css"), 'utf-8', (err, data) => {
  if(err){
    alert("`file.css` has failed to load!\n" + err.message);
    window.close();
  }
  resources.css.file = data.replace(new RegExp("./fonts/", 'g'), path.join(manifest.paths.core, "framework", "themes", manifest.content.theme, "fonts").replace(/\\/g, "/") + "/");
  resources.css.file = resources.css.file.replace(new RegExp("./icons/", 'g'), path.join(manifest.paths.core, "framework", "themes", manifest.content.theme, "icons").replace(/\\/g, "/") + "/");
});
*/