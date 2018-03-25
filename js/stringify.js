(function() {
  /*
   0000000  000000000  00000000   000  000   000   0000000   000  00000000  000   000
  000          000     000   000  000  0000  000  000        000  000        000 000 
  0000000      000     0000000    000  000 0 000  000  0000  000  000000      00000  
       000     000     000   000  000  000  0000  000   000  000  000          000   
  0000000      000     000   000  000  000   000   0000000   000  000          000   
  */
  var _, defaults, stringify;

  _ = require('lodash');

  defaults = {
    ext: '.noon',
    indent: '    '
  };

  stringify = function(data, options = {}) {
    var opt;
    opt = _.assign(_.clone(defaults), options);
    switch (opt.ext) {
      case '.json':
        return JSON.stringify(data, null, opt.indent);
      case '.cson':
        return require('cson').stringify(data, null, opt.indent);
      case '.noon':
        return require('noon').stringify(data, opt);
      case '.plist':
        return require('simple-plist').stringify(data);
      case '.yml':
      case '.yaml':
        return require('js-yaml').dump(data);
    }
  };

  module.exports = stringify;

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5naWZ5LmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWUvc3RyaW5naWZ5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUFBOzs7Ozs7O0FBQUEsTUFBQSxDQUFBLEVBQUEsUUFBQSxFQUFBOztFQVFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7RUFFSixRQUFBLEdBQ0k7SUFBQSxHQUFBLEVBQUssT0FBTDtJQUNBLE1BQUEsRUFBUTtFQURSOztFQUdKLFNBQUEsR0FBWSxRQUFBLENBQUMsSUFBRCxFQUFPLFVBQVEsQ0FBQSxDQUFmLENBQUE7QUFDUixRQUFBO0lBQUEsR0FBQSxHQUFNLENBQUMsQ0FBQyxNQUFGLENBQVMsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxRQUFSLENBQVQsRUFBNEIsT0FBNUI7QUFDTixZQUFPLEdBQUcsQ0FBQyxHQUFYO0FBQUEsV0FDUyxPQURUO2VBQ3VCLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBZixFQUFxQixJQUFyQixFQUEyQixHQUFHLENBQUMsTUFBL0I7QUFEdkIsV0FFUyxPQUZUO2VBRXVCLE9BQUEsQ0FBUSxNQUFSLENBQWUsQ0FBQyxTQUFoQixDQUEwQixJQUExQixFQUFnQyxJQUFoQyxFQUFzQyxHQUFHLENBQUMsTUFBMUM7QUFGdkIsV0FHUyxPQUhUO2VBR3VCLE9BQUEsQ0FBUSxNQUFSLENBQWUsQ0FBQyxTQUFoQixDQUEwQixJQUExQixFQUFnQyxHQUFoQztBQUh2QixXQUlTLFFBSlQ7ZUFJdUIsT0FBQSxDQUFRLGNBQVIsQ0FBdUIsQ0FBQyxTQUF4QixDQUFrQyxJQUFsQztBQUp2QixXQUtTLE1BTFQ7QUFBQSxXQUtpQixPQUxqQjtlQUs4QixPQUFBLENBQVEsU0FBUixDQUFrQixDQUFDLElBQW5CLENBQXdCLElBQXhCO0FBTDlCO0VBRlE7O0VBU1osTUFBTSxDQUFDLE9BQVAsR0FBaUI7QUF2QmpCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4gMDAwMDAwMCAgMDAwMDAwMDAwICAwMDAwMDAwMCAgIDAwMCAgMDAwICAgMDAwICAgMDAwMDAwMCAgIDAwMCAgMDAwMDAwMDAgIDAwMCAgIDAwMFxuMDAwICAgICAgICAgIDAwMCAgICAgMDAwICAgMDAwICAwMDAgIDAwMDAgIDAwMCAgMDAwICAgICAgICAwMDAgIDAwMCAgICAgICAgMDAwIDAwMCBcbjAwMDAwMDAgICAgICAwMDAgICAgIDAwMDAwMDAgICAgMDAwICAwMDAgMCAwMDAgIDAwMCAgMDAwMCAgMDAwICAwMDAwMDAgICAgICAwMDAwMCAgXG4gICAgIDAwMCAgICAgMDAwICAgICAwMDAgICAwMDAgIDAwMCAgMDAwICAwMDAwICAwMDAgICAwMDAgIDAwMCAgMDAwICAgICAgICAgIDAwMCAgIFxuMDAwMDAwMCAgICAgIDAwMCAgICAgMDAwICAgMDAwICAwMDAgIDAwMCAgIDAwMCAgIDAwMDAwMDAgICAwMDAgIDAwMCAgICAgICAgICAwMDAgICBcbiMjI1xuXG5fID0gcmVxdWlyZSAnbG9kYXNoJ1xuXG5kZWZhdWx0cyA9IFxuICAgIGV4dDogJy5ub29uJ1xuICAgIGluZGVudDogJyAgICAnXG5cbnN0cmluZ2lmeSA9IChkYXRhLCBvcHRpb25zPXt9KSAtPlxuICAgIG9wdCA9IF8uYXNzaWduIF8uY2xvbmUoZGVmYXVsdHMpLCBvcHRpb25zXG4gICAgc3dpdGNoIG9wdC5leHRcbiAgICAgICAgd2hlbiAnLmpzb24nICB0aGVuIEpTT04uc3RyaW5naWZ5IGRhdGEsIG51bGwsIG9wdC5pbmRlbnRcbiAgICAgICAgd2hlbiAnLmNzb24nICB0aGVuIHJlcXVpcmUoJ2Nzb24nKS5zdHJpbmdpZnkgZGF0YSwgbnVsbCwgb3B0LmluZGVudFxuICAgICAgICB3aGVuICcubm9vbicgIHRoZW4gcmVxdWlyZSgnbm9vbicpLnN0cmluZ2lmeSBkYXRhLCBvcHRcbiAgICAgICAgd2hlbiAnLnBsaXN0JyB0aGVuIHJlcXVpcmUoJ3NpbXBsZS1wbGlzdCcpLnN0cmluZ2lmeSBkYXRhXG4gICAgICAgIHdoZW4gJy55bWwnLCAnLnlhbWwnIHRoZW4gcmVxdWlyZSgnanMteWFtbCcpLmR1bXAgZGF0YVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmluZ2lmeVxuIl19
//# sourceURL=C:/Users/kodi/s/sds/coffee/stringify.coffee