fs.readFile(path.join(startPath_, "/EnderFramework/_themes/" + theme_ + "/_style.css"), 'utf-8', (err, data) => {
  if(err){
    alert("`_style.css` has failed to load!\n\n\n" + err.message);
    window.close();
  }
  style = data.replace(new RegExp("./_fonts/", 'g'), startPath__ + "EnderFramework/_themes/" + theme_ + "/_fonts/");
  style = style.replace(new RegExp("./_icons/", 'g'), startPath__ + "EnderFramework/_themes/" + theme_ + "/_icons/");
});
fs.readFile(path.join(startPath_ + "/EnderFramework/_manager/libraries/animateCSS", "animate.min.css"), 'utf-8', (err, data) => {
  if(err){
    alert("The library, `animateCSS`, has failed to load!\n\n\n" + err.message);
    window.close();
  }
  aniamtions = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_themes/" + theme_ + "/_icons.css"), 'utf-8', (err, data) => {
  if(err){
    alert("`_icons.css` has failed to load!\n\n\n" + err.message);
    window.close();
  }
  icons = data.replace(new RegExp("./_fonts/", 'g'), startPath__ + "EnderFramework/_themes/" + theme_ + "/_fonts/");
  icons = icons.replace(new RegExp("./_icons/", 'g'), startPath__ + "EnderFramework/_themes/" + theme_ + "/_icons/");
});
fs.readFile(path.join(startPath_, "/EnderFramework/_themes/" + theme_ + "/_font.css"), 'utf-8', (err, data) => {
  if(err){
    alert("`_font.css` has failed to load!\n\n\n" + err.message);
    window.close();
  }
  font = data.replace(new RegExp("./_fonts/", 'g'), startPath__ + "EnderFramework/_themes/" + theme_ + "/_fonts/");
  font = font.replace(new RegExp("./_icons/", 'g'), startPath__ + "EnderFramework/_themes/" + theme_ + "/_icons/");
});
fs.readFile(path.join(startPath_, "/EnderFramework/_themes/" + theme_ + "/_codebox.css"), 'utf-8', (err, data) => {
  CodeMirror_CodeBox = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_themes/" + theme_ + "/_hint.css"), 'utf-8', (err, data) => {
  CodeMirror_CodeBox_Hints = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/lib/codemirror.js"), 'utf-8', (err, data) => {
  CodeMirror_CodeBox_code = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/_codebox.js"), 'utf-8', (err, data) => {
  CodeMirror_CodeBox_INSERT = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/lib/codemirror.css"), 'utf-8', (err, data) => {
  CodeMirror_CodeBox_style = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/xml/xml.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Xml = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/javascript/javascript.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_JavaScript = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/css/css.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_CSS = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/htmlmixed/htmlmixed.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_HTMLMixed = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/addon/edit/matchbrackets.js"), 'utf-8', (err, data) => {
  CodeMirror_AddOn_MatchBrackets = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/addon/edit/closetag.js"), 'utf-8', (err, data) => {
  CodeMirror_AddOn_CloseTag = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/apl/apl.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_APL = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/asn.1/asn.1.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_ASN1 = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/asterisk/asterisk.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Asterisk = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/brainfuck/brainfuck.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Brainfuck = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/clike/clike.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_CLike = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/clojure/clojure.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Clojure = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/css/css.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_CSS = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/cmake/cmake.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_CMake = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/cobol/cobol.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_COBOL = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/coffeescript/coffeescript.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_CoffeeScript = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/commonlisp/commonlisp.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_CommonLisp = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/crystal/crystal.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Crystal = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/cypher/cypher.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Cypher = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/python/python.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Python = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/d/d.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_D = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/dart/dart.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Dart = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/django/django.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Django = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/dockerfile/dockerfile.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Dockerfile = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/diff/diff.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Diff = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/dtd/dtd.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_DTD = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/dylan/dylan.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Dylan = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/ebnf/ebnf.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_EBNF = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/ecl/ecl.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_ECL = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/eiffel/eiffel.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Eiffel = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/elm/elm.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Elm = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/erlang/erlang.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Erlang = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/fcl/fcl.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_FCL = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/forth/forth.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Forth = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/fortran/fortran.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Fortran = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/mllike/mllike.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_MLLike = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/gas/gas.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Gas = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/gherkin/gherkin.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Gherkin = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/go/go.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Go = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/groovy/groovy.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Groovy = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/haml/haml.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_HAML = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/haskell/haskell.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Haskell = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/haxe/haxe.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Haxe = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/htmlembedded/htmlembedded.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_HTMLEmbedded = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/http/http.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_HTTP = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/haskell-literate/haskell-literate.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_HaskellLiterate = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/idl/idl.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_IDL = data;
});
var CodeMirror_Mode_Jinja2 = null;
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/jinja2/jinja2.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Jinja2 = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/julia/julia.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Julia = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/livescript/livescript.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_LiveScript = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/lua/lua.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Lua = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/markdown/markdown.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Markdown = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/mathematica/mathematica.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Mathematica = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/jsx/jsx.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_JSX = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/gfm/gfm.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_GFM = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/mbox/mbox.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_MBox = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/mirc/mirc.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_MIRC = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/modelica/modelica.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Modelica = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/mumps/mumps.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_MUMPS = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/mscgen/mscgen.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_MscGen = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/nginx/nginx.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_NGINX = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/ntriples/ntriples.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_NTriples = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/octave/octave.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Octave = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/oz/oz.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Oz = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/pascal/pascal.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Pascal = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/pegjs/pegjs.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_PEGJS = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/perl/perl.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Perl = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/asciiarmor/asciiarmor.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_ASCIIArmor = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/php/php.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_PHP = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/pig/pig.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Pig = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/powershell/powershell.js"), 'utf-8', (err, data) => {
  CoCodeMirror_Mode_PowerShell = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/properties/properties.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Properties = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/protobuf/protobuf.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_ProtoBuf = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/pug/pug.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Pug = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/puppet/puppet.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Puppet = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/q/q.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Q = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/r/r.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_R = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/rpm/rpm.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_RPM = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/rst/rst.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_ReStructuredText = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/ruby/ruby.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Ruby = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/sas/sas.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_SAS = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/sass/sass.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Sass = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/spreadsheet/spreadsheet.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Spreadsheet = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/scheme/scheme.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Scheme = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/shell/shell.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Shell = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/sieve/sieve.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Sieve = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/smalltalk/smalltalk.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_SmallTalk = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/slim/slim.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_SLIM = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/smarty/smarty.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Smarty = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/solr/solr.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Solr = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/soy/soy.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Soy = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/sql/sql.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_SQL = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/stylus/stylus.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Stylus = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/sparql/sparql.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_SPARQL = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/swift/swift.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Swift = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/stex/stex.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_STeX = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/tcl/tcl.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Tcl = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/textile/textile.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Textile = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/tiddlywiki/tiddlywiki.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_TiddlyWiki = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/tiki/tiki.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_TikiWiki = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/toml/toml.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_TOML = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/tornado/tornado.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Tornado = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/troff/troff.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Troff = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/ttcn/ttcn.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_TTCN = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/ttcn-cfg/ttcn-cfg.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_TTCN_CFG = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/turtle/turtle.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Turtle = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/twig/twig.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Twig = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/vb/vb.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_VBNET = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/vbscript/vbscript.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_VBScript = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/velocity/velocity.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Velocity = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/verilog/verilog.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_SystemVerilog = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/vhdl/vhdl.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_VHDL = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/vue/vue.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_VueJS = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/webidl/webidl.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_WebIDL = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/xml/xml.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_XML = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/xquery/xquery.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_XQuery = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/yacas/yacas.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Yacas = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/yaml/yaml.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_YAML = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/yaml-frontmatter/yaml-frontmatter.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_YAMLFrontMatter = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/mode/z80/z80.js"), 'utf-8', (err, data) => {
  CodeMirror_Mode_Z80 = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/addon/hint/show-hint.js"), 'utf-8', (err, data) => {
  CodeMirror_CodeBox_Hint = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/addon/hint/anyword-hint.js"), 'utf-8', (err, data) => {
  CodeMirror_CodeBox_Hint_AnyWord = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/addon/hint/css-hint.js"), 'utf-8', (err, data) => {
  CodeMirror_CodeBox_Hint_CSS = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/addon/hint/html-hint.js"), 'utf-8', (err, data) => {
  CodeMirror_CodeBox_Hint_HTML = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/addon/hint/javascript-hint.js"), 'utf-8', (err, data) => {
  CodeMirror_CodeBox_Hint_JavaScript = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/addon/hint/sql-hint.js"), 'utf-8', (err, data) => {
  CodeMirror_CodeBox_Hint_SQL = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/libraries/CodeMirror/addon/hint/xml-hint.js"), 'utf-8', (err, data) => {
  CodeMirror_CodeBox_Hint_XML = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/_customElements.js"), 'utf-8', (err, data) => {
  CustomElementsScript = data;
});
/*fs.readFile(path.join(startPath_, "/EnderFramework/_manager/_customFunctions.js"), 'utf-8', (err, data) => {
  CustomFunctionsScript = data;
});*/
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/_scroll.js"), 'utf-8', (err, data) => {
  OnScrollAnimation = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/_tooltip.js"), 'utf-8', (err, data) => {
  ToolTip = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/_media.js"), 'utf-8', (err, data) => {
  Media = data;
});
fs.readFile(path.join(startPath_, "/EnderFramework/_manager/_load.data"), 'utf-8', (err, data) => {
  filesToLoad = data;
});