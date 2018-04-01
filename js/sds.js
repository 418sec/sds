(function() {
  /*
   0000000  0000000     0000000
  000       000   000  000     
  0000000   000   000  0000000 
       000  000   000       000
  0000000   0000000    0000000 
  */
  /*
   0000000   00000000    0000000    0000000
  000   000  000   000  000        000     
  000000000  0000000    000  0000  0000000 
  000   000  000   000  000   000       000
  000   000  000   000   0000000   0000000 
  */
  /*
   0000000   000   000  000000000
  000   000  000   000     000   
  000   000  000   000     000   
  000   000  000   000     000   
   0000000    0000000      000   
  */
  /*
  000       0000000    0000000   0000000  
  000      000   000  000   000  000   000
  000      000   000  000000000  000   000
  000      000   000  000   000  000   000
  0000000   0000000   000   000  0000000  
  */
  /*
  00000000  00000000   00000000    0000000   00000000 
  000       000   000  000   000  000   000  000   000
  0000000   0000000    0000000    000   000  0000000  
  000       000   000  000   000  000   000  000   000
  00000000  000   000  000   000   0000000   000   000
  */
  /*
  00000000  000   000  000000000  000   000   0000000   00     00  00000000
  000        000 000      000     0000  000  000   000  000   000  000     
  0000000     00000       000     000 0 000  000000000  000000000  0000000 
  000        000 000      000     000  0000  000   000  000 0 000  000     
  00000000  000   000     000     000   000  000   000  000   000  00000000
  */
  /*
   0000000  00000000   0000000   00000000    0000000  000   000
  000       000       000   000  000   000  000       000   000
  0000000   0000000   000000000  0000000    000       000000000
       000  000       000   000  000   000  000       000   000
  0000000   00000000  000   000  000   000   0000000  000   000
  */
  /*
  000      000   0000000  000000000
  000      000  000          000   
  000      000  0000000      000   
  000      000       000     000   
  0000000  000  0000000      000   
  */
  /*
   0000000  00000000  000000000
  000       000          000   
  0000000   0000000      000   
       000  000          000   
  0000000   00000000     000   
  */
  var _, args, argsFile, atomic, colors, data, error, extname, file, find, fs, get, i, j, k, karg, l, len, len1, len2, log, noon, o, out, outext, p, path, ref, ref1, ref2, ref3, result, s, set, slash, v,
    indexOf = [].indexOf;

  colors = require('colors');

  noon = require('noon');

  slash = require('path');

  fs = require('fs');

  atomic = require('write-file-atomic');

  _ = require('lodash');

  karg = require('karg');

  find = require('./find');

  log = console.log;

  args = karg(`sds\n    file        . ? the file to search in           . *   . = package.json\n    key         . ? key to search            \n    value       . ? value to search\n    path        . ? path to search           \n    format      . ? result format\n    set         . ? set values \n    save        . ? write result back to input file . - S . = false \n    output      . ? the file to write or stdout     . - F     \n    json        . ? parse as json                         . = false\n    noon        . ? parse as noon                         . = false\n    cson        . - C                                     . = false\n    yaml                                                  . = false\n    object                                                . = false\n    result                                                . = false\n    colors      . ? output with ansi colors               . = false\n    \nformat\n    @k  key\n    @v  value\n    @o  object\n    @p  path\n        \nshortcuts \n    -o  for @o\n    -r  for @v and no leading empty line\n\nversion     ${(require(`${__dirname}/../package.json`).version)}`);

  error = function(msg) {
    log(("\n" + msg + "\n").red);
    return process.exit();
  };

  if (args.file == null) {
    if (fs.existsSync('./package.json')) {
      args.file = './package.json';
    } else if (fs.existsSync('./package.noon')) {
      args.file = './package.noon';
    } else {
      error('no input file provided!');
    }
  } else if (!fs.existsSync(args.file)) {
    argsFile = args.file;
    if ((args.value == null) && (args.key == null) && (args.path == null)) {
      ref = ['./package.json', './package.noon'];
      for (i = 0, len = ref.length; i < len; i++) {
        file = ref[i];
        if (fs.existsSync(file)) {
          args.result = true;
          args.path = argsFile;
          args.file = file;
          break;
        }
      }
    }
    if (argsFile === args.file) {
      error(`can't find file: ${args.file.yellow.bold}`);
    }
  }

  extname = args.json ? '.json' : args.cson ? '.cson' : args.noon ? '.noon' : args.yaml ? '.yaml' : slash.extname(args.file);

  if (indexOf.call(noon.extnames, extname) < 0) {
    error(`unknown file type: ${extname.yellow.bold}. use --json --cson --noon or --yaml to force parsing.`);
  }

  outext = extname;

  if (ref1 = args.output, indexOf.call(noon.extnames, ref1) >= 0) {
    outext = args.output;
    delete args.output;
  }

  data = noon.load(args.file, extname);

  if (!((ref2 = data.constructor.name) === 'Array' || ref2 === 'Object')) {
    error(`no structure in file: ${args.file.yellow.bold}`);
  }

  /*
   0000000   0000000   000       0000000   00000000    0000000
  000       000   000  000      000   000  000   000  000     
  000       000   000  000      000   000  0000000    0000000 
  000       000   000  000      000   000  000   000       000
   0000000   0000000   0000000   0000000   000   000  0000000 
  */
  if (args.colors) {
    colors = {
      key: colors.gray,
      null: colors.bold.blue,
      string: colors.yellow.bold,
      value: colors.bold.white,
      url: colors.yellow,
      true: colors.blue.bold,
      false: colors.gray.dim,
      path: colors.green,
      value: colors.white,
      semver: colors.red,
      number: colors.magenta,
      visited: colors.red
    };
  } else {
    colors = false;
  }

  if ((args.output != null) || args.save) {
    colors = false;
  }

  out = function(s) {
    var err, outfile, ref3;
    outfile = (ref3 = args.output) != null ? ref3 : (args.save ? args.file : void 0);
    if (outfile != null) {
      fs.ensureDirSync(slash.dirname(outfile));
      try {
        return atomic(outfile, s, function(err) {
          if (err) {
            return error(`can't write ${outfile.bold.yellow}: ${err}`);
          } else {
            return log(`wrote ${outfile.bold.white}`.gray);
          }
        });
      } catch (error1) {
        err = error1;
        return error(`can't write ${outfile.bold.yellow}: ${err}`);
      }
    } else {
      return log(s);
    }
  };

  if (args.set != null) {
    set = require('./set');
    ref3 = noon.parse(args.set);
    for (p in ref3) {
      v = ref3[p];
      set(data, p, v);
    }
    out(noon.stringify(data, {
      colors: colors,
      ext: outext
    }));
  } else if ((args.key == null) && (args.value == null) && (args.path == null)) {
    s = noon.stringify(data, {
      colors: colors,
      ext: outext
    });
    out('\n' + s + '\n');
  } else {
    get = require('./get');
    if (!args.result) {
      log('');
    }
    result = (args.path != null) && (args.value != null) ? find.pathValue(data, args.path, args.value) : args.path != null ? find.path(data, args.path) : (args.key != null) && (args.value != null) ? find.keyValue(data, args.key, args.value) : args.key != null ? find.key(data, args.key) : find.value(data, args.value);
    if (args.object || args.result || args.format) {
      for (j = 0, len1 = result.length; j < len1; j++) {
        path = result[j];
        p = slash.join('.');
        k = _.last(path);
        v = get(data, path);
        if (args.object) {
          path.pop();
          s = noon.stringify(get(data, path), {
            colors: colors
          });
        } else if (args.result) {
          s = noon.stringify(v, {
            colors: colors
          });
        } else if (args.format) {
          s = args.format;
          s = s.replace('@k', colors.key(k));
          s = s.replace('@p', colors.path(p));
          s = s.replace('@v', noon.stringify(v, {
            colors: colors
          }));
          if (args.format.indexOf('@o') >= 0) {
            path.pop();
            o = noon.stringify(get(data, path), {
              colors: true
            });
            s = s.replace('@o', o);
          }
        } else {
          o = {};
          o[p] = v;
          s = noon.stringify(o, {
            colors: colors
          });
        }
        out(s);
      }
    } else {
      o = {};
      for (l = 0, len2 = result.length; l < len2; l++) {
        path = result[l];
        o[slash.join('.')] = get(data, path);
      }
      s = noon.stringify(o, {
        colors: colors
      });
      out(s);
    }
    if (!args.result) {
      out('');
    }
  }

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2RzLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWUvc2RzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFBLENBQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxFQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQTtJQUFBOztFQVFBLE1BQUEsR0FBUyxPQUFBLENBQVEsUUFBUjs7RUFDVCxJQUFBLEdBQVMsT0FBQSxDQUFRLE1BQVI7O0VBQ1QsS0FBQSxHQUFTLE9BQUEsQ0FBUSxNQUFSOztFQUNULEVBQUEsR0FBUyxPQUFBLENBQVEsSUFBUjs7RUFDVCxNQUFBLEdBQVMsT0FBQSxDQUFRLG1CQUFSOztFQUNULENBQUEsR0FBUyxPQUFBLENBQVEsUUFBUjs7RUFDVCxJQUFBLEdBQVMsT0FBQSxDQUFRLE1BQVI7O0VBQ1QsSUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSOztFQUNULEdBQUEsR0FBUyxPQUFPLENBQUM7O0VBVWpCLElBQUEsR0FBTyxJQUFBLENBQUssQ0FBQSx1aUNBQUEsQ0FBQSxDQTRCQyxDQUFDLE9BQUEsQ0FBUSxDQUFBLENBQUEsQ0FBRyxTQUFILENBQWEsZ0JBQWIsQ0FBUixDQUF1QyxDQUFDLE9BQXpDLENBNUJELENBQUEsQ0FBTDs7RUF1Q1AsS0FBQSxHQUFRLFFBQUEsQ0FBQyxHQUFELENBQUE7SUFDSixHQUFBLENBQUksQ0FBQyxJQUFBLEdBQUssR0FBTCxHQUFTLElBQVYsQ0FBZSxDQUFDLEdBQXBCO1dBQ0EsT0FBTyxDQUFDLElBQVIsQ0FBQTtFQUZJOztFQUlSLElBQU8saUJBQVA7SUFDSSxJQUFHLEVBQUUsQ0FBQyxVQUFILENBQWMsZ0JBQWQsQ0FBSDtNQUNJLElBQUksQ0FBQyxJQUFMLEdBQVksaUJBRGhCO0tBQUEsTUFFSyxJQUFHLEVBQUUsQ0FBQyxVQUFILENBQWMsZ0JBQWQsQ0FBSDtNQUNELElBQUksQ0FBQyxJQUFMLEdBQVksaUJBRFg7S0FBQSxNQUFBO01BR0QsS0FBQSxDQUFNLHlCQUFOLEVBSEM7S0FIVDtHQUFBLE1BT0ssSUFBRyxDQUFJLEVBQUUsQ0FBQyxVQUFILENBQWMsSUFBSSxDQUFDLElBQW5CLENBQVA7SUFDRCxRQUFBLEdBQVcsSUFBSSxDQUFDO0lBQ2hCLElBQUksb0JBQUQsSUFBa0Isa0JBQWxCLElBQWlDLG1CQUFwQztBQUNJO01BQUEsS0FBQSxxQ0FBQTs7UUFDSSxJQUFHLEVBQUUsQ0FBQyxVQUFILENBQWMsSUFBZCxDQUFIO1VBQ0ksSUFBSSxDQUFDLE1BQUwsR0FBYztVQUNkLElBQUksQ0FBQyxJQUFMLEdBQWM7VUFDZCxJQUFJLENBQUMsSUFBTCxHQUFjO0FBQ2QsZ0JBSko7O01BREosQ0FESjs7SUFPQSxJQUFHLFFBQUEsS0FBWSxJQUFJLENBQUMsSUFBcEI7TUFDSSxLQUFBLENBQU0sQ0FBQSxpQkFBQSxDQUFBLENBQW9CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQXJDLENBQUEsQ0FBTixFQURKO0tBVEM7OztFQW9CTCxPQUFBLEdBQ1ksSUFBSSxDQUFDLElBQWIsR0FBdUIsT0FBdkIsR0FDUSxJQUFJLENBQUMsSUFBUixHQUFrQixPQUFsQixHQUNHLElBQUksQ0FBQyxJQUFSLEdBQWtCLE9BQWxCLEdBQ0csSUFBSSxDQUFDLElBQVIsR0FBa0IsT0FBbEIsR0FFRCxLQUFLLENBQUMsT0FBTixDQUFjLElBQUksQ0FBQyxJQUFuQjs7RUFFUixJQUFHLGFBQWUsSUFBSSxDQUFDLFFBQXBCLEVBQUEsT0FBQSxLQUFIO0lBQ0ksS0FBQSxDQUFNLENBQUEsbUJBQUEsQ0FBQSxDQUFzQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQXJDLENBQTBDLHNEQUExQyxDQUFOLEVBREo7OztFQUdBLE1BQUEsR0FBUzs7RUFDVCxXQUFHLElBQUksQ0FBQyxNQUFMLEVBQUEsYUFBZSxJQUFJLENBQUMsUUFBcEIsRUFBQSxJQUFBLE1BQUg7SUFDSSxNQUFBLEdBQVMsSUFBSSxDQUFDO0lBQ2QsT0FBTyxJQUFJLENBQUMsT0FGaEI7OztFQVlBLElBQUEsR0FBTyxJQUFJLENBQUMsSUFBTCxDQUFVLElBQUksQ0FBQyxJQUFmLEVBQXFCLE9BQXJCOztFQUVQLElBQUcsQ0FBSSxTQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBakIsS0FBMEIsT0FBMUIsSUFBQSxJQUFBLEtBQW1DLFFBQXBDLENBQVA7SUFDSSxLQUFBLENBQU0sQ0FBQSxzQkFBQSxDQUFBLENBQXlCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQTFDLENBQUEsQ0FBTixFQURKO0dBMUhBOzs7Ozs7Ozs7RUFxSUEsSUFBRyxJQUFJLENBQUMsTUFBUjtJQUNJLE1BQUEsR0FDSTtNQUFBLEdBQUEsRUFBUyxNQUFNLENBQUMsSUFBaEI7TUFDQSxJQUFBLEVBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQURyQjtNQUVBLE1BQUEsRUFBUyxNQUFNLENBQUMsTUFBTSxDQUFDLElBRnZCO01BR0EsS0FBQSxFQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FIckI7TUFJQSxHQUFBLEVBQVMsTUFBTSxDQUFDLE1BSmhCO01BS0EsSUFBQSxFQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFMckI7TUFNQSxLQUFBLEVBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQU5yQjtNQU9BLElBQUEsRUFBUyxNQUFNLENBQUMsS0FQaEI7TUFRQSxLQUFBLEVBQVMsTUFBTSxDQUFDLEtBUmhCO01BU0EsTUFBQSxFQUFTLE1BQU0sQ0FBQyxHQVRoQjtNQVVBLE1BQUEsRUFBUyxNQUFNLENBQUMsT0FWaEI7TUFXQSxPQUFBLEVBQVMsTUFBTSxDQUFDO0lBWGhCLEVBRlI7R0FBQSxNQUFBO0lBZUksTUFBQSxHQUFTLE1BZmI7OztFQXlCQSxJQUFrQixxQkFBQSxJQUFnQixJQUFJLENBQUMsSUFBdkM7SUFBQSxNQUFBLEdBQVMsTUFBVDs7O0VBRUEsR0FBQSxHQUFNLFFBQUEsQ0FBQyxDQUFELENBQUE7QUFDRixRQUFBLEdBQUEsRUFBQSxPQUFBLEVBQUE7SUFBQSxPQUFBLHlDQUF3QixDQUFjLElBQUksQ0FBQyxJQUFsQixHQUFBLElBQUksQ0FBQyxJQUFMLEdBQUEsTUFBRDtJQUN4QixJQUFHLGVBQUg7TUFDSSxFQUFFLENBQUMsYUFBSCxDQUFpQixLQUFLLENBQUMsT0FBTixDQUFjLE9BQWQsQ0FBakI7QUFDQTtlQUNJLE1BQUEsQ0FBTyxPQUFQLEVBQWdCLENBQWhCLEVBQW1CLFFBQUEsQ0FBQyxHQUFELENBQUE7VUFDZixJQUFHLEdBQUg7bUJBQ0ksS0FBQSxDQUFNLENBQUEsWUFBQSxDQUFBLENBQWUsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUE1QixDQUFtQyxFQUFuQyxDQUFBLENBQXVDLEdBQXZDLENBQUEsQ0FBTixFQURKO1dBQUEsTUFBQTttQkFHSSxHQUFBLENBQUksQ0FBQSxNQUFBLENBQUEsQ0FBUyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQXRCLENBQUEsQ0FBNkIsQ0FBQyxJQUFsQyxFQUhKOztRQURlLENBQW5CLEVBREo7T0FBQSxjQUFBO1FBTU07ZUFDRixLQUFBLENBQU0sQ0FBQSxZQUFBLENBQUEsQ0FBZSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQTVCLENBQW1DLEVBQW5DLENBQUEsQ0FBdUMsR0FBdkMsQ0FBQSxDQUFOLEVBUEo7T0FGSjtLQUFBLE1BQUE7YUFXSSxHQUFBLENBQUksQ0FBSixFQVhKOztFQUZFOztFQWVOLElBQUcsZ0JBQUg7SUFVSSxHQUFBLEdBQU0sT0FBQSxDQUFRLE9BQVI7QUFFTjtJQUFBLEtBQUEsU0FBQTs7TUFDSSxHQUFBLENBQUksSUFBSixFQUFVLENBQVYsRUFBYSxDQUFiO0lBREo7SUFHQSxHQUFBLENBQUksSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFmLEVBQXFCO01BQUEsTUFBQSxFQUFRLE1BQVI7TUFBZ0IsR0FBQSxFQUFLO0lBQXJCLENBQXJCLENBQUosRUFmSjtHQUFBLE1BaUJLLElBQU8sa0JBQUosSUFBc0Isb0JBQXRCLElBQTBDLG1CQUE3QztJQVVELENBQUEsR0FBSSxJQUFJLENBQUMsU0FBTCxDQUFlLElBQWYsRUFBcUI7TUFBQSxNQUFBLEVBQVEsTUFBUjtNQUFnQixHQUFBLEVBQUs7SUFBckIsQ0FBckI7SUFDSixHQUFBLENBQUksSUFBQSxHQUFLLENBQUwsR0FBTyxJQUFYLEVBWEM7R0FBQSxNQUFBO0lBdUJELEdBQUEsR0FBTSxPQUFBLENBQVEsT0FBUjtJQUVOLElBQUcsQ0FBSSxJQUFJLENBQUMsTUFBWjtNQUNJLEdBQUEsQ0FBSSxFQUFKLEVBREo7O0lBR0EsTUFBQSxHQUNPLG1CQUFBLElBQWUsb0JBQWxCLEdBQ0ksSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFmLEVBQXFCLElBQUksQ0FBQyxJQUExQixFQUFnQyxJQUFJLENBQUMsS0FBckMsQ0FESixHQUVRLGlCQUFILEdBQ0QsSUFBSSxDQUFDLElBQUwsQ0FBVSxJQUFWLEVBQWdCLElBQUksQ0FBQyxJQUFyQixDQURDLEdBRUcsa0JBQUEsSUFBYyxvQkFBakIsR0FDRCxJQUFJLENBQUMsUUFBTCxDQUFjLElBQWQsRUFBb0IsSUFBSSxDQUFDLEdBQXpCLEVBQThCLElBQUksQ0FBQyxLQUFuQyxDQURDLEdBRUcsZ0JBQUgsR0FDRCxJQUFJLENBQUMsR0FBTCxDQUFTLElBQVQsRUFBZSxJQUFJLENBQUMsR0FBcEIsQ0FEQyxHQUdELElBQUksQ0FBQyxLQUFMLENBQVcsSUFBWCxFQUFpQixJQUFJLENBQUMsS0FBdEI7SUFFUixJQUFHLElBQUksQ0FBQyxNQUFMLElBQWUsSUFBSSxDQUFDLE1BQXBCLElBQThCLElBQUksQ0FBQyxNQUF0QztNQUNJLEtBQUEsMENBQUE7O1FBQ0ksQ0FBQSxHQUFJLEtBQUssQ0FBQyxJQUFOLENBQVcsR0FBWDtRQUNKLENBQUEsR0FBSSxDQUFDLENBQUMsSUFBRixDQUFPLElBQVA7UUFDSixDQUFBLEdBQUksR0FBQSxDQUFJLElBQUosRUFBVSxJQUFWO1FBRUosSUFBRyxJQUFJLENBQUMsTUFBUjtVQUNJLElBQUksQ0FBQyxHQUFMLENBQUE7VUFDQSxDQUFBLEdBQUksSUFBSSxDQUFDLFNBQUwsQ0FBZSxHQUFBLENBQUksSUFBSixFQUFVLElBQVYsQ0FBZixFQUFnQztZQUFBLE1BQUEsRUFBUTtVQUFSLENBQWhDLEVBRlI7U0FBQSxNQUdLLElBQUcsSUFBSSxDQUFDLE1BQVI7VUFDRCxDQUFBLEdBQUksSUFBSSxDQUFDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCO1lBQUEsTUFBQSxFQUFRO1VBQVIsQ0FBbEIsRUFESDtTQUFBLE1BRUEsSUFBRyxJQUFJLENBQUMsTUFBUjtVQUNELENBQUEsR0FBSSxJQUFJLENBQUM7VUFDVCxDQUFBLEdBQUksQ0FBQyxDQUFDLE9BQUYsQ0FBVSxJQUFWLEVBQWdCLE1BQU0sQ0FBQyxHQUFQLENBQVcsQ0FBWCxDQUFoQjtVQUNKLENBQUEsR0FBSSxDQUFDLENBQUMsT0FBRixDQUFVLElBQVYsRUFBZ0IsTUFBTSxDQUFDLElBQVAsQ0FBWSxDQUFaLENBQWhCO1VBQ0osQ0FBQSxHQUFJLENBQUMsQ0FBQyxPQUFGLENBQVUsSUFBVixFQUFnQixJQUFJLENBQUMsU0FBTCxDQUFlLENBQWYsRUFBa0I7WUFBQSxNQUFBLEVBQVE7VUFBUixDQUFsQixDQUFoQjtVQUNKLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLElBQXBCLENBQUEsSUFBNkIsQ0FBaEM7WUFDSSxJQUFJLENBQUMsR0FBTCxDQUFBO1lBQ0EsQ0FBQSxHQUFJLElBQUksQ0FBQyxTQUFMLENBQWUsR0FBQSxDQUFJLElBQUosRUFBVSxJQUFWLENBQWYsRUFDQTtjQUFBLE1BQUEsRUFBUTtZQUFSLENBREE7WUFFSixDQUFBLEdBQUksQ0FBQyxDQUFDLE9BQUYsQ0FBVSxJQUFWLEVBQWdCLENBQWhCLEVBSlI7V0FMQztTQUFBLE1BQUE7VUFXRCxDQUFBLEdBQUksQ0FBQTtVQUNKLENBQUUsQ0FBQSxDQUFBLENBQUYsR0FBTztVQUNQLENBQUEsR0FBSSxJQUFJLENBQUMsU0FBTCxDQUFlLENBQWYsRUFBa0I7WUFBQSxNQUFBLEVBQVE7VUFBUixDQUFsQixFQWJIOztRQWNMLEdBQUEsQ0FBSSxDQUFKO01BeEJKLENBREo7S0FBQSxNQUFBO01BMkJJLENBQUEsR0FBSSxDQUFBO01BQ0osS0FBQSwwQ0FBQTs7UUFDSSxDQUFFLENBQUEsS0FBSyxDQUFDLElBQU4sQ0FBVyxHQUFYLENBQUEsQ0FBRixHQUFxQixHQUFBLENBQUksSUFBSixFQUFVLElBQVY7TUFEekI7TUFFQSxDQUFBLEdBQUksSUFBSSxDQUFDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCO1FBQUEsTUFBQSxFQUFRO01BQVIsQ0FBbEI7TUFDSixHQUFBLENBQUksQ0FBSixFQS9CSjs7SUFpQ0EsSUFBRyxDQUFJLElBQUksQ0FBQyxNQUFaO01BQ0ksR0FBQSxDQUFJLEVBQUosRUFESjtLQXpFQzs7QUFoTUwiLCJzb3VyY2VzQ29udGVudCI6WyIjIyNcbiAwMDAwMDAwICAwMDAwMDAwICAgICAwMDAwMDAwXG4wMDAgICAgICAgMDAwICAgMDAwICAwMDAgICAgIFxuMDAwMDAwMCAgIDAwMCAgIDAwMCAgMDAwMDAwMCBcbiAgICAgMDAwICAwMDAgICAwMDAgICAgICAgMDAwXG4wMDAwMDAwICAgMDAwMDAwMCAgICAwMDAwMDAwIFxuIyMjXG5cbmNvbG9ycyA9IHJlcXVpcmUgJ2NvbG9ycydcbm5vb24gICA9IHJlcXVpcmUgJ25vb24nXG5zbGFzaCAgPSByZXF1aXJlICdwYXRoJ1xuZnMgICAgID0gcmVxdWlyZSAnZnMnXG5hdG9taWMgPSByZXF1aXJlICd3cml0ZS1maWxlLWF0b21pYydcbl8gICAgICA9IHJlcXVpcmUgJ2xvZGFzaCdcbmthcmcgICA9IHJlcXVpcmUgJ2thcmcnXG5maW5kICAgPSByZXF1aXJlICcuL2ZpbmQnXG5sb2cgICAgPSBjb25zb2xlLmxvZ1xuXG4jIyNcbiAwMDAwMDAwICAgMDAwMDAwMDAgICAgMDAwMDAwMCAgICAwMDAwMDAwXG4wMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgICAwMDAgICAgIFxuMDAwMDAwMDAwICAwMDAwMDAwICAgIDAwMCAgMDAwMCAgMDAwMDAwMCBcbjAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgICAgICAgMDAwXG4wMDAgICAwMDAgIDAwMCAgIDAwMCAgIDAwMDAwMDAgICAwMDAwMDAwIFxuIyMjXG5cbmFyZ3MgPSBrYXJnIFwiXCJcIlxuc2RzXG4gICAgZmlsZSAgICAgICAgLiA/IHRoZSBmaWxlIHRvIHNlYXJjaCBpbiAgICAgICAgICAgLiAqICAgLiA9IHBhY2thZ2UuanNvblxuICAgIGtleSAgICAgICAgIC4gPyBrZXkgdG8gc2VhcmNoICAgICAgICAgICAgXG4gICAgdmFsdWUgICAgICAgLiA/IHZhbHVlIHRvIHNlYXJjaFxuICAgIHBhdGggICAgICAgIC4gPyBwYXRoIHRvIHNlYXJjaCAgICAgICAgICAgXG4gICAgZm9ybWF0ICAgICAgLiA/IHJlc3VsdCBmb3JtYXRcbiAgICBzZXQgICAgICAgICAuID8gc2V0IHZhbHVlcyBcbiAgICBzYXZlICAgICAgICAuID8gd3JpdGUgcmVzdWx0IGJhY2sgdG8gaW5wdXQgZmlsZSAuIC0gUyAuID0gZmFsc2UgXG4gICAgb3V0cHV0ICAgICAgLiA/IHRoZSBmaWxlIHRvIHdyaXRlIG9yIHN0ZG91dCAgICAgLiAtIEYgICAgIFxuICAgIGpzb24gICAgICAgIC4gPyBwYXJzZSBhcyBqc29uICAgICAgICAgICAgICAgICAgICAgICAgIC4gPSBmYWxzZVxuICAgIG5vb24gICAgICAgIC4gPyBwYXJzZSBhcyBub29uICAgICAgICAgICAgICAgICAgICAgICAgIC4gPSBmYWxzZVxuICAgIGNzb24gICAgICAgIC4gLSBDICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4gPSBmYWxzZVxuICAgIHlhbWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4gPSBmYWxzZVxuICAgIG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4gPSBmYWxzZVxuICAgIHJlc3VsdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4gPSBmYWxzZVxuICAgIGNvbG9ycyAgICAgIC4gPyBvdXRwdXQgd2l0aCBhbnNpIGNvbG9ycyAgICAgICAgICAgICAgIC4gPSBmYWxzZVxuICAgIFxuZm9ybWF0XG4gICAgQGsgIGtleVxuICAgIEB2ICB2YWx1ZVxuICAgIEBvICBvYmplY3RcbiAgICBAcCAgcGF0aFxuICAgICAgICBcbnNob3J0Y3V0cyBcbiAgICAtbyAgZm9yIEBvXG4gICAgLXIgIGZvciBAdiBhbmQgbm8gbGVhZGluZyBlbXB0eSBsaW5lXG5cbnZlcnNpb24gICAgICN7cmVxdWlyZShcIiN7X19kaXJuYW1lfS8uLi9wYWNrYWdlLmpzb25cIikudmVyc2lvbn1cblwiXCJcIlxuXG4jIyNcbjAwMDAwMDAwICAwMDAwMDAwMCAgIDAwMDAwMDAwICAgIDAwMDAwMDAgICAwMDAwMDAwMCBcbjAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDBcbjAwMDAwMDAgICAwMDAwMDAwICAgIDAwMDAwMDAgICAgMDAwICAgMDAwICAwMDAwMDAwICBcbjAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDBcbjAwMDAwMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDBcbiMjI1xuXG5lcnJvciA9IChtc2cpIC0+XG4gICAgbG9nIChcIlxcblwiK21zZytcIlxcblwiKS5yZWRcbiAgICBwcm9jZXNzLmV4aXQoKVxuXG5pZiBub3QgYXJncy5maWxlP1xuICAgIGlmIGZzLmV4aXN0c1N5bmMgJy4vcGFja2FnZS5qc29uJ1xuICAgICAgICBhcmdzLmZpbGUgPSAnLi9wYWNrYWdlLmpzb24nXG4gICAgZWxzZSBpZiBmcy5leGlzdHNTeW5jICcuL3BhY2thZ2Uubm9vbidcbiAgICAgICAgYXJncy5maWxlID0gJy4vcGFja2FnZS5ub29uJ1xuICAgIGVsc2VcbiAgICAgICAgZXJyb3IgJ25vIGlucHV0IGZpbGUgcHJvdmlkZWQhJ1xuZWxzZSBpZiBub3QgZnMuZXhpc3RzU3luYyBhcmdzLmZpbGVcbiAgICBhcmdzRmlsZSA9IGFyZ3MuZmlsZVxuICAgIGlmICFhcmdzLnZhbHVlPyBhbmQgIWFyZ3Mua2V5PyBhbmQgIWFyZ3MucGF0aD8gICAgXG4gICAgICAgIGZvciBmaWxlIGluIFsnLi9wYWNrYWdlLmpzb24nLCAnLi9wYWNrYWdlLm5vb24nXVxuICAgICAgICAgICAgaWYgZnMuZXhpc3RzU3luYyBmaWxlXG4gICAgICAgICAgICAgICAgYXJncy5yZXN1bHQgPSB0cnVlXG4gICAgICAgICAgICAgICAgYXJncy5wYXRoICAgPSBhcmdzRmlsZVxuICAgICAgICAgICAgICAgIGFyZ3MuZmlsZSAgID0gZmlsZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgaWYgYXJnc0ZpbGUgPT0gYXJncy5maWxlXG4gICAgICAgIGVycm9yIFwiY2FuJ3QgZmluZCBmaWxlOiAje2FyZ3MuZmlsZS55ZWxsb3cuYm9sZH1cIlxuXG4jIyNcbjAwMDAwMDAwICAwMDAgICAwMDAgIDAwMDAwMDAwMCAgMDAwICAgMDAwICAgMDAwMDAwMCAgIDAwICAgICAwMCAgMDAwMDAwMDBcbjAwMCAgICAgICAgMDAwIDAwMCAgICAgIDAwMCAgICAgMDAwMCAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICBcbjAwMDAwMDAgICAgIDAwMDAwICAgICAgIDAwMCAgICAgMDAwIDAgMDAwICAwMDAwMDAwMDAgIDAwMDAwMDAwMCAgMDAwMDAwMCBcbjAwMCAgICAgICAgMDAwIDAwMCAgICAgIDAwMCAgICAgMDAwICAwMDAwICAwMDAgICAwMDAgIDAwMCAwIDAwMCAgMDAwICAgICBcbjAwMDAwMDAwICAwMDAgICAwMDAgICAgIDAwMCAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMDBcbiMjI1xuXG5leHRuYW1lID0gICAgIFxuICAgIGlmICAgICAgYXJncy5qc29uIHRoZW4gJy5qc29uJ1xuICAgIGVsc2UgaWYgYXJncy5jc29uIHRoZW4gJy5jc29uJ1xuICAgIGVsc2UgaWYgYXJncy5ub29uIHRoZW4gJy5ub29uJ1xuICAgIGVsc2UgaWYgYXJncy55YW1sIHRoZW4gJy55YW1sJ1xuICAgIGVsc2VcbiAgICAgICAgc2xhc2guZXh0bmFtZSBhcmdzLmZpbGVcbiAgICBcbmlmIGV4dG5hbWUgbm90IGluIG5vb24uZXh0bmFtZXNcbiAgICBlcnJvciBcInVua25vd24gZmlsZSB0eXBlOiAje2V4dG5hbWUueWVsbG93LmJvbGR9LiB1c2UgLS1qc29uIC0tY3NvbiAtLW5vb24gb3IgLS15YW1sIHRvIGZvcmNlIHBhcnNpbmcuXCJcblxub3V0ZXh0ID0gZXh0bmFtZVxuaWYgYXJncy5vdXRwdXQgaW4gbm9vbi5leHRuYW1lc1xuICAgIG91dGV4dCA9IGFyZ3Mub3V0cHV0XG4gICAgZGVsZXRlIGFyZ3Mub3V0cHV0XG5cbiMjI1xuMDAwICAgICAgIDAwMDAwMDAgICAgMDAwMDAwMCAgIDAwMDAwMDAgIFxuMDAwICAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMFxuMDAwICAgICAgMDAwICAgMDAwICAwMDAwMDAwMDAgIDAwMCAgIDAwMFxuMDAwICAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMFxuMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgIDAwMDAwMDAgIFxuIyMjXG5cbmRhdGEgPSBub29uLmxvYWQgYXJncy5maWxlLCBleHRuYW1lXG5cbmlmIG5vdCAoZGF0YS5jb25zdHJ1Y3Rvci5uYW1lIGluIFsnQXJyYXknLCAnT2JqZWN0J10pXG4gICAgZXJyb3IgXCJubyBzdHJ1Y3R1cmUgaW4gZmlsZTogI3thcmdzLmZpbGUueWVsbG93LmJvbGR9XCJcblxuIyMjXG4gMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAgICAgICAgMDAwMDAwMCAgIDAwMDAwMDAwICAgIDAwMDAwMDBcbjAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgICAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgIFxuMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgMDAwICAgMDAwICAwMDAwMDAwICAgIDAwMDAwMDAgXG4wMDAgICAgICAgMDAwICAgMDAwICAwMDAgICAgICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgICAgICAwMDBcbiAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAwMDAwICAgMDAwICAgMDAwICAwMDAwMDAwIFxuIyMjXG4gICAgXG5pZiBhcmdzLmNvbG9yc1xuICAgIGNvbG9ycyA9IFxuICAgICAgICBrZXk6ICAgICBjb2xvcnMuZ3JheVxuICAgICAgICBudWxsOiAgICBjb2xvcnMuYm9sZC5ibHVlXG4gICAgICAgIHN0cmluZzogIGNvbG9ycy55ZWxsb3cuYm9sZFxuICAgICAgICB2YWx1ZTogICBjb2xvcnMuYm9sZC53aGl0ZVxuICAgICAgICB1cmw6ICAgICBjb2xvcnMueWVsbG93XG4gICAgICAgIHRydWU6ICAgIGNvbG9ycy5ibHVlLmJvbGRcbiAgICAgICAgZmFsc2U6ICAgY29sb3JzLmdyYXkuZGltXG4gICAgICAgIHBhdGg6ICAgIGNvbG9ycy5ncmVlblxuICAgICAgICB2YWx1ZTogICBjb2xvcnMud2hpdGVcbiAgICAgICAgc2VtdmVyOiAgY29sb3JzLnJlZFxuICAgICAgICBudW1iZXI6ICBjb2xvcnMubWFnZW50YVxuICAgICAgICB2aXNpdGVkOiBjb2xvcnMucmVkXG5lbHNlXG4gICAgY29sb3JzID0gZmFsc2VcblxuIyMjXG4gMDAwMDAwMCAgIDAwMCAgIDAwMCAgMDAwMDAwMDAwXG4wMDAgICAwMDAgIDAwMCAgIDAwMCAgICAgMDAwICAgXG4wMDAgICAwMDAgIDAwMCAgIDAwMCAgICAgMDAwICAgXG4wMDAgICAwMDAgIDAwMCAgIDAwMCAgICAgMDAwICAgXG4gMDAwMDAwMCAgICAwMDAwMDAwICAgICAgMDAwICAgXG4jIyNcblxuY29sb3JzID0gZmFsc2UgaWYgYXJncy5vdXRwdXQ/IG9yIGFyZ3Muc2F2ZVxuXG5vdXQgPSAocykgLT5cbiAgICBvdXRmaWxlID0gYXJncy5vdXRwdXQgPyAoYXJncy5maWxlIGlmIGFyZ3Muc2F2ZSlcbiAgICBpZiBvdXRmaWxlP1xuICAgICAgICBmcy5lbnN1cmVEaXJTeW5jIHNsYXNoLmRpcm5hbWUgb3V0ZmlsZVxuICAgICAgICB0cnlcbiAgICAgICAgICAgIGF0b21pYyBvdXRmaWxlLCBzLCAoZXJyKSAtPlxuICAgICAgICAgICAgICAgIGlmIGVyclxuICAgICAgICAgICAgICAgICAgICBlcnJvciBcImNhbid0IHdyaXRlICN7b3V0ZmlsZS5ib2xkLnllbGxvd306ICN7ZXJyfVwiXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBsb2cgXCJ3cm90ZSAje291dGZpbGUuYm9sZC53aGl0ZX1cIi5ncmF5XG4gICAgICAgIGNhdGNoIGVyclxuICAgICAgICAgICAgZXJyb3IgXCJjYW4ndCB3cml0ZSAje291dGZpbGUuYm9sZC55ZWxsb3d9OiAje2Vycn1cIlxuICAgIGVsc2VcbiAgICAgICAgbG9nIHNcblxuaWYgYXJncy5zZXQ/XG4gICAgXG4gICAgIyMjXG4gICAgIDAwMDAwMDAgIDAwMDAwMDAwICAwMDAwMDAwMDBcbiAgICAwMDAgICAgICAgMDAwICAgICAgICAgIDAwMCAgIFxuICAgIDAwMDAwMDAgICAwMDAwMDAwICAgICAgMDAwICAgXG4gICAgICAgICAwMDAgIDAwMCAgICAgICAgICAwMDAgICBcbiAgICAwMDAwMDAwICAgMDAwMDAwMDAgICAgIDAwMCAgIFxuICAgICMjI1xuICAgIFxuICAgIHNldCA9IHJlcXVpcmUgJy4vc2V0J1xuICAgIFxuICAgIGZvciBwLHYgb2Ygbm9vbi5wYXJzZSBhcmdzLnNldFxuICAgICAgICBzZXQgZGF0YSwgcCwgdlxuICAgICAgICBcbiAgICBvdXQgbm9vbi5zdHJpbmdpZnkgZGF0YSwgY29sb3JzOiBjb2xvcnMsIGV4dDogb3V0ZXh0XG4gICAgICAgIFxuZWxzZSBpZiBub3QgYXJncy5rZXk/IGFuZCBub3QgYXJncy52YWx1ZT8gYW5kIG5vdCBhcmdzLnBhdGg/XG5cbiAgICAjIyNcbiAgICAwMDAgICAgICAwMDAgICAwMDAwMDAwICAwMDAwMDAwMDBcbiAgICAwMDAgICAgICAwMDAgIDAwMCAgICAgICAgICAwMDAgICBcbiAgICAwMDAgICAgICAwMDAgIDAwMDAwMDAgICAgICAwMDAgICBcbiAgICAwMDAgICAgICAwMDAgICAgICAgMDAwICAgICAwMDAgICBcbiAgICAwMDAwMDAwICAwMDAgIDAwMDAwMDAgICAgICAwMDAgICBcbiAgICAjIyNcbiAgICBcbiAgICBzID0gbm9vbi5zdHJpbmdpZnkgZGF0YSwgY29sb3JzOiBjb2xvcnMsIGV4dDogb3V0ZXh0XG4gICAgb3V0ICdcXG4nK3MrJ1xcbidcbiAgICBcbmVsc2UgICAgICBcbiAgICBcbiAgICAjIyNcbiAgICAgMDAwMDAwMCAgMDAwMDAwMDAgICAwMDAwMDAwICAgMDAwMDAwMDAgICAgMDAwMDAwMCAgMDAwICAgMDAwXG4gICAgMDAwICAgICAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMFxuICAgIDAwMDAwMDAgICAwMDAwMDAwICAgMDAwMDAwMDAwICAwMDAwMDAwICAgIDAwMCAgICAgICAwMDAwMDAwMDBcbiAgICAgICAgIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwICAgMDAwXG4gICAgMDAwMDAwMCAgIDAwMDAwMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgIDAwMDAwMDAgIDAwMCAgIDAwMFxuICAgICMjI1xuICAgICAgXG4gICAgZ2V0ID0gcmVxdWlyZSAnLi9nZXQnXG4gICAgICBcbiAgICBpZiBub3QgYXJncy5yZXN1bHRcbiAgICAgICAgbG9nICcnXG4gICAgICAgIFxuICAgIHJlc3VsdCA9IFxuICAgICAgICBpZiBhcmdzLnBhdGg/IGFuZCBhcmdzLnZhbHVlP1xuICAgICAgICAgICAgZmluZC5wYXRoVmFsdWUgZGF0YSwgYXJncy5wYXRoLCBhcmdzLnZhbHVlXG4gICAgICAgIGVsc2UgaWYgYXJncy5wYXRoP1xuICAgICAgICAgICAgZmluZC5wYXRoIGRhdGEsIGFyZ3MucGF0aFxuICAgICAgICBlbHNlIGlmIGFyZ3Mua2V5PyBhbmQgYXJncy52YWx1ZT9cbiAgICAgICAgICAgIGZpbmQua2V5VmFsdWUgZGF0YSwgYXJncy5rZXksIGFyZ3MudmFsdWVcbiAgICAgICAgZWxzZSBpZiBhcmdzLmtleT9cbiAgICAgICAgICAgIGZpbmQua2V5IGRhdGEsIGFyZ3Mua2V5XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGZpbmQudmFsdWUgZGF0YSwgYXJncy52YWx1ZVxuICAgICAgICAgICAgICAgICAgICBcbiAgICBpZiBhcmdzLm9iamVjdCBvciBhcmdzLnJlc3VsdCBvciBhcmdzLmZvcm1hdFxuICAgICAgICBmb3IgcGF0aCBpbiByZXN1bHRcbiAgICAgICAgICAgIHAgPSBzbGFzaC5qb2luICcuJ1xuICAgICAgICAgICAgayA9IF8ubGFzdCBwYXRoXG4gICAgICAgICAgICB2ID0gZ2V0IGRhdGEsIHBhdGhcblxuICAgICAgICAgICAgaWYgYXJncy5vYmplY3RcbiAgICAgICAgICAgICAgICBwYXRoLnBvcCgpXG4gICAgICAgICAgICAgICAgcyA9IG5vb24uc3RyaW5naWZ5IGdldChkYXRhLCBwYXRoKSwgY29sb3JzOiBjb2xvcnNcbiAgICAgICAgICAgIGVsc2UgaWYgYXJncy5yZXN1bHRcbiAgICAgICAgICAgICAgICBzID0gbm9vbi5zdHJpbmdpZnkgdiwgY29sb3JzOiBjb2xvcnNcbiAgICAgICAgICAgIGVsc2UgaWYgYXJncy5mb3JtYXRcbiAgICAgICAgICAgICAgICBzID0gYXJncy5mb3JtYXRcbiAgICAgICAgICAgICAgICBzID0gcy5yZXBsYWNlICdAaycsIGNvbG9ycy5rZXkga1xuICAgICAgICAgICAgICAgIHMgPSBzLnJlcGxhY2UgJ0BwJywgY29sb3JzLnBhdGggcFxuICAgICAgICAgICAgICAgIHMgPSBzLnJlcGxhY2UgJ0B2Jywgbm9vbi5zdHJpbmdpZnkgdiwgY29sb3JzOiBjb2xvcnNcbiAgICAgICAgICAgICAgICBpZiBhcmdzLmZvcm1hdC5pbmRleE9mKCdAbycpID49IDBcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5wb3AoKVxuICAgICAgICAgICAgICAgICAgICBvID0gbm9vbi5zdHJpbmdpZnkgZ2V0KGRhdGEsIHBhdGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JzOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHMgPSBzLnJlcGxhY2UgJ0BvJywgb1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIG8gPSB7fVxuICAgICAgICAgICAgICAgIG9bcF0gPSB2XG4gICAgICAgICAgICAgICAgcyA9IG5vb24uc3RyaW5naWZ5IG8sIGNvbG9yczogY29sb3JzXG4gICAgICAgICAgICBvdXQgc1xuICAgIGVsc2VcbiAgICAgICAgbyA9IHt9XG4gICAgICAgIGZvciBwYXRoIGluIHJlc3VsdFxuICAgICAgICAgICAgb1tzbGFzaC5qb2luKCcuJyldID0gZ2V0IGRhdGEsIHBhdGhcbiAgICAgICAgcyA9IG5vb24uc3RyaW5naWZ5IG8sIGNvbG9yczogY29sb3JzXG4gICAgICAgIG91dCBzXG4gICAgICAgIFxuICAgIGlmIG5vdCBhcmdzLnJlc3VsdFxuICAgICAgICBvdXQgJydcbiJdfQ==
//# sourceURL=C:/Users/kodi/s/sds/coffee/sds.coffee