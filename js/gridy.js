(function(window) {

  'use strict';

  function extend(a, b) {
    for(var key in b) {
      if(b.hasOwnProperty(key) ) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function Gridy(elem, options){
    this.el = elem;
    this.options = extend({}, this.options);
    extend(this.options, options);
    this._init();
    this._initEvents();
  }

  Gridy.prototype.options = {
	};

  /* init settings */
  Gridy.prototype._init = function (){
    // main element
    this.grid = this.el.querySelector('.grid-wrap');
    // element for get width
    this.gridWidth = this.el.querySelector('.grid-sizer').offsetWidth;

    // set items per line from width
    if(this.gridWidth < 415) this.itemPerLine = 2;
    else if(this.gridWidth < 800) this.itemPerLine = 3;
    else this.itemPerLine = 4;

    this._draw();
  }

  Gridy.prototype._draw = function(){
    // items element
    this.gridItems = [].slice.call( this.grid.querySelectorAll('li:not(.grid-sizer)'));
    // items total count
    this.itemsCount = this.gridItems.length;
    // stack for set items location
    this.stacks = this._initStacks();
    // draw items grid
    this._griding();
  }

  /* init event settings */
  Gridy.prototype._initEvents = function(){
    var self = this;
		window.addEventListener('resize', function() { self._resize(); });

    // use MutationObserver for draw gridy
    var target = document.getElementById('target');
    // create an observer instance
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            self._draw();
        });
    });
    // configuration of the observer:
    var config = { childList: true };
    // pass in the target node, as well as the observer options
    observer.observe(self.grid, config);
  }

  /* stack initializing */
  Gridy.prototype._initStacks = function(){
    var a = [], b = [];
    for(var i = 0; i < this.itemPerLine; i++){
        a.push([]);
        b.push(0);
    }
    a.push(b);
    return a;
  }

  /* push li items in stacks */
  Gridy.prototype._pushItem = function(item, idx){
    //IE not working Arrow Function
    //var midx = this.stacks[this.itemPerLine].reduce((a,b,i) => a[0] > b ? [b,i] : a, [Number.MAX_VALUE,-1])[1];
    var midx = this.stacks[this.itemPerLine].reduce(function (a, b, i) { return a[0] > b ? [b, i] : a; }, [Number.MAX_VALUE, -1])[1];
    var s = this.stacks;
    var height = s[midx][s[midx].length-1] ? item.offsetHeight + s[midx][s[midx].length-1]['height'] : item.offsetHeight;
    var left = midx*(this.gridWidth/this.itemPerLine);
    var top = s[midx][s[midx].length-1] ? s[midx][s[midx].length-1]['height'] : 0;
    s[midx].push({'id':idx, 'height':height, 'left':left, 'top':top});
    this.stacks[this.itemPerLine][midx] += item.offsetHeight;
  }

  /* list up li items */
  Gridy.prototype._listing = function(){
    var items = this.gridItems;
    for(var i = 0; i < items.length; i++){
      var item = items[i];
      this._pushItem(item, i);
    }
  }

  /* draw li grid */
  Gridy.prototype._griding = function(){
    this._listing();
    var s = this.stacks;
    for(var i = 0; i < s.length - 1; i++){
      for(var j = 0; j < s[i].length; j++){
        this.gridItems[s[i][j].id].style.position = 'absolute';
        this.gridItems[s[i][j].id].style.left = s[i][j]['left']+'px';
        this.gridItems[s[i][j].id].style.top = s[i][j]['top']+'px';
        this.gridItems[s[i][j].id].style.width = 100 / this.itemPerLine + '%';
      }
    }
    //IE not working Arrow Function
    //this.grid.style.height = this.stacks[this.itemPerLine].reduce( (a,b,i) => a[0] < b ? [b,i] : a, [Number.MIN_VALUE,-1])[0]+'px';
    this.grid.style.height = this.stacks[this.itemPerLine].reduce(function (a, b, i) { return a[0] < b ? [b, i] : a; }, [Number.MIN_VALUE, -1])[0] + 'px';
  }

  /* window resize event redraw grid items */
  Gridy.prototype._resize = function(){
    var self = this;
		function delayed() {
			self._init();
			self._resizeTimeout = null;
		}
		if ( this._resizeTimeout ) {
			clearTimeout( this._resizeTimeout );
		}
		this._resizeTimeout = setTimeout( delayed, 50 );
  }

  window.Gridy = Gridy;

})(window);
