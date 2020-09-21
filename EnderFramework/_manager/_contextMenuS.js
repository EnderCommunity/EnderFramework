var menus = {};
const changeContextMenuData = data_ => {
  const parseContent = (data) => {
    var result = {};
    for(var v in data){
      if(data[v].type == "function"){
        /*
              if(data[v].functionName != undefined){
          result[v] = {
            title: data[v].title,
            function: data[v].functionName
          };
        }else if(data[v].function != undefined){
          result[v] = {
            title: data[v].title,
            function: "(" + data[v].function.toString() + ")"
          };
        }
  
        */
        result[v] = {
          title: data[v].title,
          function: data[v].functionName
        };
        if(data[v].disabled == true)
          result[v].disable = true;
      }else if(data[v].type == "link"){
        result[v] = {
          title: data[v].title,
          link: data[v].link
        };
        if(data[v].disabled == true)
          result[v].disable = true;
      }else if(data[v].type == "divider"){
        if(v > 0){
          result[v - 1].space = true;
        }
      }else if(data[v].type == "dropdown"){
        result[v] = {
          title: data[v].title,
          dropdown: parseContent(data[v].content)
        };
        if(data[v].disabled == true)
          result[v].disable = true;
      }else if(data[v].type == "action"){
        //Copy, paste, cut, delete, open devtools, close devtools, toggle devtools
        result[v] = {
          title: data[v].title,
          function: "EnderFramework_ContextMenuActions." + data[v].actionName
        };
        if(data[v].disabled == true)
          result[v].disable = true;
      }
      //result[v] = data[v];
    }
    return result;
  }
  return parseContent(data_);
}, checkContextMenuID = id => {
  return (typeof menus[id] != "undefined");
}, saveContextMenu = (id, c) => {
  menus[id] = changeContextMenuData(c);
}, showAContextMenu = (id, p) => {
  showContextMenu(menus[id], p);
}, hideAllContextMenus = () => {
  //
};