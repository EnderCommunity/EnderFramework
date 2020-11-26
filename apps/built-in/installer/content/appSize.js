var totalSize = 0;
const getDirSize = function(path){
  fs.readdir(path, function (err, files){
    if(err){
      //Error
    }
    files.forEach(function(file){
      var v = fs.lstatSync(path + file);
      if(v.isFile()){
        //console.log(v.size);
        totalSize += v.size;
        document.getElementById("_install").setAttribute("tooltip-content", (totalSize/(1e+6)).toFixed(2) + " MB");
      }else{
        getDirSize(path + file + "\\");
      }
    });
  });
};