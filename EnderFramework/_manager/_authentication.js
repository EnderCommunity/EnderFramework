/*var windowsLocalAuth = require('windows-local-auth');
windowsLocalAuth("user", "password", function(err, success){
  if(err){
    throw err;
  }
  //
});*/
/*var nodeSSPI = require('node-sspi')
var nodeSSPIObj = new nodeSSPI({
  retrieveGroups: true
});
nodeSSPIObj.authenticate(req, res, function(err){
  //res.finished || next()
});
var passport = require('passport');
var WindowsStrategy = require('passport-windowsauth');
passport.use("", function(profile, done){
  User.findOrCreate({ waId: profile.id }, function (err, user) {
    done(err, user);
  });
});
if(osInfo.platform.isWindows10){
  const {passport} = require('node-ms-passport');
  const passportAvailable = passport.passportAvailable();
  if(!passportAvailable){
    console.error("Passport is not available");
  }
}*/