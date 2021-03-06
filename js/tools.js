// koffee 0.56.0

/*
000000000   0000000    0000000   000       0000000
   000     000   000  000   000  000      000     
   000     000   000  000   000  000      0000000 
   000     000   000  000   000  000           000
   000      0000000    0000000   0000000  0000000
 */
var set;

set = require('./set');

module.exports = {
    toplevel: function(l) {
        return l.filter(function(t) {
            return t[0].length === 1;
        });
    },
    cmppath: function(a, b) {
        var al, bl, i, j, ref;
        al = a.length;
        bl = b.length;
        for (i = j = 0, ref = Math.min(al, bl); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            if (a[i] > b[i]) {
                return 1;
            }
            if (a[i] < b[i]) {
                return -1;
            }
        }
        if (al > bl) {
            return 1;
        }
        if (al < bl) {
            return -1;
        }
        return 0;
    },
    sortpath: function(l) {
        return l.sort(function(a, b) {
            return module.exports.cmppath(a[0], b[0]);
        });
    },
    objectify: function(l) {
        var j, len, o, pv;
        o = {};
        for (j = 0, len = l.length; j < len; j++) {
            pv = l[j];
            if (pv.length > 1) {
                set(o, pv[0], pv.slice(-1)[0]);
            }
        }
        return o;
    },
    listify: function(o) {
        return module.exports.toplevel(require('./collect')(o));
    }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHMuanMiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7QUFBQSxJQUFBOztBQVFBLEdBQUEsR0FBTSxPQUFBLENBQVEsT0FBUjs7QUFFTixNQUFNLENBQUMsT0FBUCxHQVdJO0lBQUEsUUFBQSxFQUFVLFNBQUMsQ0FBRDtlQUFPLENBQUMsQ0FBQyxNQUFGLENBQVMsU0FBQyxDQUFEO21CQUFPLENBQUUsQ0FBQSxDQUFBLENBQUUsQ0FBQyxNQUFMLEtBQWU7UUFBdEIsQ0FBVDtJQUFQLENBQVY7SUFjQSxPQUFBLEVBQVMsU0FBQyxDQUFELEVBQUksQ0FBSjtBQUNMLFlBQUE7UUFBQSxFQUFBLEdBQUssQ0FBQyxDQUFDO1FBQ1AsRUFBQSxHQUFLLENBQUMsQ0FBQztBQUNQLGFBQVMseUZBQVQ7WUFDSSxJQUFHLENBQUUsQ0FBQSxDQUFBLENBQUYsR0FBTyxDQUFFLENBQUEsQ0FBQSxDQUFaO0FBQW9CLHVCQUFRLEVBQTVCOztZQUNBLElBQUcsQ0FBRSxDQUFBLENBQUEsQ0FBRixHQUFPLENBQUUsQ0FBQSxDQUFBLENBQVo7QUFBb0IsdUJBQU8sQ0FBQyxFQUE1Qjs7QUFGSjtRQUdBLElBQUcsRUFBQSxHQUFLLEVBQVI7QUFBZ0IsbUJBQVEsRUFBeEI7O1FBQ0EsSUFBRyxFQUFBLEdBQUssRUFBUjtBQUFnQixtQkFBTyxDQUFDLEVBQXhCOztlQUNBO0lBUkssQ0FkVDtJQWlDQSxRQUFBLEVBQVUsU0FBQyxDQUFEO2VBQU8sQ0FBQyxDQUFDLElBQUYsQ0FBTyxTQUFDLENBQUQsRUFBRyxDQUFIO21CQUFTLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBZixDQUF1QixDQUFFLENBQUEsQ0FBQSxDQUF6QixFQUE2QixDQUFFLENBQUEsQ0FBQSxDQUEvQjtRQUFULENBQVA7SUFBUCxDQWpDVjtJQTRDQSxTQUFBLEVBQVcsU0FBQyxDQUFEO0FBQ1AsWUFBQTtRQUFBLENBQUEsR0FBSTtBQUNKLGFBQUEsbUNBQUE7O1lBQ0ksSUFBRyxFQUFFLENBQUMsTUFBSCxHQUFZLENBQWY7Z0JBQ0ksR0FBQSxDQUFJLENBQUosRUFBTyxFQUFHLENBQUEsQ0FBQSxDQUFWLEVBQWMsRUFBRyxVQUFFLENBQUEsQ0FBQSxDQUFuQixFQURKOztBQURKO2VBR0E7SUFMTyxDQTVDWDtJQTREQSxPQUFBLEVBQVMsU0FBQyxDQUFEO2VBQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFmLENBQXdCLE9BQUEsQ0FBUSxXQUFSLENBQUEsQ0FBcUIsQ0FBckIsQ0FBeEI7SUFBUCxDQTVEVCIsInNvdXJjZXNDb250ZW50IjpbIiMjI1xuMDAwMDAwMDAwICAgMDAwMDAwMCAgICAwMDAwMDAwICAgMDAwICAgICAgIDAwMDAwMDBcbiAgIDAwMCAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgIDAwMCAgICAgXG4gICAwMDAgICAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAwMDAwMDAwIFxuICAgMDAwICAgICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgICAgICAwMDBcbiAgIDAwMCAgICAgIDAwMDAwMDAgICAgMDAwMDAwMCAgIDAwMDAwMDAgIDAwMDAwMDAgXG4jIyNcblxuc2V0ID0gcmVxdWlyZSAnLi9zZXQnXG5cbm1vZHVsZS5leHBvcnRzID0gXG5cbiAgICAjIDAwMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAwMDAwMCAgIDAwMCAgICAgIDAwMDAwMDAwICAwMDAgICAwMDAgIDAwMDAwMDAwICAwMDAgICAgXG4gICAgIyAgICAwMDAgICAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAwMDAgICAgICAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwICAgIFxuICAgICMgICAgMDAwICAgICAwMDAgICAwMDAgIDAwMDAwMDAwICAgMDAwICAgICAgMDAwMDAwMCAgICAwMDAgMDAwICAgMDAwMDAwMCAgIDAwMCAgICBcbiAgICAjICAgIDAwMCAgICAgMDAwICAgMDAwICAwMDAgICAgICAgIDAwMCAgICAgIDAwMCAgICAgICAgICAwMDAgICAgIDAwMCAgICAgICAwMDAgICAgXG4gICAgIyAgICAwMDAgICAgICAwMDAwMDAwICAgMDAwICAgICAgICAwMDAwMDAwICAwMDAwMDAwMCAgICAgIDAgICAgICAwMDAwMDAwMCAgMDAwMDAwMFxuXG4gICAgIyBhY2NlcHRzIGEgbGlzdCBvZiBba2V5cGF0aCwgdmFsdWVdIHBhaXJzXG4gICAgIyByZXR1cm5zIGEgbGlzdCBvZiBba2V5cGF0aCwgdmFsdWVdIHBhaXJzIHdpdGggYSBwYXRoIGxlbmd0aCBvZiAxXG5cbiAgICB0b3BsZXZlbDogKGwpIC0+IGwuZmlsdGVyICh0KSAtPiB0WzBdLmxlbmd0aCA9PSAxXG5cblxuICAgICMgIDAwMDAwMDAgIDAwICAgICAwMCAgMDAwMDAwMDAgICAwMDAwMDAwMCAgICAwMDAwMDAwICAgMDAwMDAwMDAwICAwMDAgICAwMDBcbiAgICAjIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgICAgIDAwMCAgICAgMDAwICAgMDAwXG4gICAgIyAwMDAgICAgICAgMDAwMDAwMDAwICAwMDAwMDAwMCAgIDAwMDAwMDAwICAgMDAwMDAwMDAwICAgICAwMDAgICAgIDAwMDAwMDAwMFxuICAgICMgMDAwICAgICAgIDAwMCAwIDAwMCAgMDAwICAgICAgICAwMDAgICAgICAgIDAwMCAgIDAwMCAgICAgMDAwICAgICAwMDAgICAwMDBcbiAgICAjICAwMDAwMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAgMDAwICAgICAgICAwMDAgICAwMDAgICAgIDAwMCAgICAgMDAwICAgMDAwXG5cbiAgICAjIGFjY2VwdHMgIHR3byBrZXlwYXRoIGFycmF5c1xuICAgICMgcmV0dXJucyAgMCBpZiB0aGV5IGFyZSBlcXVhbFxuICAgICMgICAgICAgICAgMSBpZiBhIGlzIGxhcmdlciB0aGFuIGJcbiAgICAjICAgICAgICAgLTEgaWYgYSBpcyBzbWFsbGVyIHRoYW4gYlxuICAgIFxuICAgIGNtcHBhdGg6IChhLCBiKSAtPlxuICAgICAgICBhbCA9IGEubGVuZ3RoXG4gICAgICAgIGJsID0gYi5sZW5ndGhcbiAgICAgICAgZm9yIGkgaW4gWzAuLi5NYXRoLm1pbiBhbCwgYmxdXG4gICAgICAgICAgICBpZiBhW2ldID4gYltpXSB0aGVuIHJldHVybiAgMVxuICAgICAgICAgICAgaWYgYVtpXSA8IGJbaV0gdGhlbiByZXR1cm4gLTFcbiAgICAgICAgaWYgYWwgPiBibCB0aGVuIHJldHVybiAgMVxuICAgICAgICBpZiBhbCA8IGJsIHRoZW4gcmV0dXJuIC0xXG4gICAgICAgIDBcblxuICAgICMgIDAwMDAwMDAgICAwMDAwMDAwICAgMDAwMDAwMDAgICAwMDAwMDAwMDAgIDAwMDAwMDAwICAgIDAwMDAwMDAgICAwMDAwMDAwMDAgIDAwMCAgIDAwMFxuICAgICMgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgIDAwMFxuICAgICMgMDAwMDAwMCAgIDAwMCAgIDAwMCAgMDAwMDAwMCAgICAgICAwMDAgICAgIDAwMDAwMDAwICAgMDAwMDAwMDAwICAgICAwMDAgICAgIDAwMDAwMDAwMFxuICAgICMgICAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgICAgICAgMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgIDAwMFxuICAgICMgMDAwMDAwMCAgICAwMDAwMDAwICAgMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgICAgICAgMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgIDAwMFxuXG4gICAgIyBhY2NlcHRzIGEgbGlzdCBvZiBba2V5cGF0aCwgdmFsdWVdIHBhaXJzXG4gICAgIyByZXR1cm5zIGEgbGlzdCBvZiBba2V5cGF0aCwgdmFsdWVdIHBhaXJzIHdpdGgga2V5cGF0aHMgc29ydGVkIGFscGhhYmV0aWNhbGx5XG5cbiAgICBzb3J0cGF0aDogKGwpIC0+IGwuc29ydCAoYSxiKSAtPiBtb2R1bGUuZXhwb3J0cy5jbXBwYXRoIGFbMF0sIGJbMF1cblxuICAgICMgIDAwMDAwMDAgICAwMDAwMDAwICAgICAgICAgIDAwMCAgMDAwMDAwMDAgICAwMDAwMDAwICAwMDAwMDAwMDAgIDAwMCAgMDAwMDAwMDAgIDAwMCAgIDAwMFxuICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgICAgICAgIDAwMCAgMDAwICAgICAgIDAwMCAgICAgICAgICAwMDAgICAgIDAwMCAgMDAwICAgICAgICAwMDAgMDAwIFxuICAgICMgMDAwICAgMDAwICAwMDAwMDAwICAgICAgICAgIDAwMCAgMDAwMDAwMCAgIDAwMCAgICAgICAgICAwMDAgICAgIDAwMCAgMDAwMDAwICAgICAgMDAwMDAgIFxuICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgICAgICAgICAwMDAgICAgIDAwMCAgMDAwICAgICAgICAgIDAwMCAgIFxuICAgICMgIDAwMDAwMDAgICAwMDAwMDAwICAgICAwMDAwMDAwICAgMDAwMDAwMDAgICAwMDAwMDAwICAgICAwMDAgICAgIDAwMCAgMDAwICAgICAgICAgIDAwMCAgIFxuXG4gICAgIyBhY2NlcHRzIGEgbGlzdCBvZiBba2V5cGF0aCwgLi4uIHZhbHVlXSBwYWlyc1xuICAgICMgcmV0dXJucyBhbiBvYmplY3QgY29udHJ1Y3RlZCBmcm9tIHRoYXQgbGlzdFxuXG4gICAgb2JqZWN0aWZ5OiAobCkgLT5cbiAgICAgICAgbyA9IHt9XG4gICAgICAgIGZvciBwdiBpbiBsXG4gICAgICAgICAgICBpZiBwdi5sZW5ndGggPiAxXG4gICAgICAgICAgICAgICAgc2V0IG8sIHB2WzBdLCBwdlstMV1cbiAgICAgICAgb1xuXG4gICAgIyAwMDAgICAgICAwMDAgICAwMDAwMDAwICAwMDAwMDAwMDAgIDAwMCAgMDAwMDAwMDAgIDAwMCAgIDAwMFxuICAgICMgMDAwICAgICAgMDAwICAwMDAgICAgICAgICAgMDAwICAgICAwMDAgIDAwMCAgICAgICAgMDAwIDAwMCBcbiAgICAjIDAwMCAgICAgIDAwMCAgMDAwMDAwMCAgICAgIDAwMCAgICAgMDAwICAwMDAwMDAgICAgICAwMDAwMCAgXG4gICAgIyAwMDAgICAgICAwMDAgICAgICAgMDAwICAgICAwMDAgICAgIDAwMCAgMDAwICAgICAgICAgIDAwMCAgIFxuICAgICMgMDAwMDAwMCAgMDAwICAwMDAwMDAwICAgICAgMDAwICAgICAwMDAgIDAwMCAgICAgICAgICAwMDAgICBcblxuICAgICMgYWNjZXB0cyBhbiBvYmplY3Qgb1xuICAgICMgcmV0dXJucyBhIGxpc3Qgb2YgW2tleXBhdGgsIHZhbHVlXSBwYWlycyBmb3IgdG9wbGV2ZWwgdmFsdWVzIGluIG9cblxuICAgIGxpc3RpZnk6IChvKSAtPiBtb2R1bGUuZXhwb3J0cy50b3BsZXZlbCByZXF1aXJlKCcuL2NvbGxlY3QnKSBvXG4iXX0=
//# sourceURL=../coffee/tools.coffee