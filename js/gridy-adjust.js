(function(window) {

  "use strict";

  var autoAddInterval;

  var initEvent = function(){
    // add event
    document.getElementById("addElem").addEventListener("click", function(){ add(); });
    // delete event
    document.getElementById("delElem").addEventListener("click", function(){ remove(); });
    // clear event
    document.getElementById("clearElem").addEventListener("click", function(){
      var gridy = document.getElementById("gridy");
      var lis = gridy.querySelectorAll("li:not(.grid-sizer)");
      deleteElem(lis, null, true);
    });
  };

  // stop auto add event
  var stopAdding = function(){
    clearInterval(autoAddInterval);
    autoAdding();
  };

  var autoAdding = function(){
    document.getElementById("autoAdd").addEventListener("click", function(){
      document.getElementById("addElem").setAttribute("disabled", true);
      document.getElementById("delElem").setAttribute("disabled", true);
      document.getElementById("clearElem").setAttribute("disabled", true);
      document.getElementById("autoAdd").setAttribute("disabled", true);
      var txt = document.querySelector(".todo-wrapper").innerHTML;
      txt += "<button id='stopAdd'>Stop</button>";
      document.querySelector(".todo-wrapper").innerHTML = txt;

      document.getElementById("stopAdd").addEventListener("click", function(){
        document.getElementById("addElem").removeAttribute("disabled");
        document.getElementById("delElem").removeAttribute("disabled");
        document.getElementById("clearElem").removeAttribute("disabled");
        document.getElementById("autoAdd").removeAttribute("disabled");
        stopAdding();
        var btns = document.querySelectorAll("button");
        var element = btns[btns.length-1];
        deleteElem(element);
        initEvent();
      });
      autoAddInterval = setInterval(function(){ add(); }, 500);
    });
  };

  initEvent();
  // auto add event
  autoAdding();

  var add = function(){
    var height = Math.floor((Math.random() * 30) + 10) * 10;

    var gridy = document.getElementById("gridy");
    var lis = gridy.querySelectorAll("li:not(.grid-sizer)");

    var txt = document.querySelector(".grid-wrap").innerHTML;
    txt += "<li><figure><div style='height: "+height+"px;'><p>"+(lis.length+1)+". "+height+"px</p></div></figure></li>";
    document.querySelector(".grid-wrap").innerHTML = txt;
    window.scroll(0, document.body.scrollHeight);
  };

  var remove = function(){
    var gridy = document.getElementById("gridy");
    var lis = gridy.querySelectorAll("li:not(.grid-sizer)");
    deleteElem(lis, -1);
  };

  var deleteElem = function(el, op, all){
    if(all){
      /*  IE not working forEach
        el.forEach(function(elem, idx, array){
        elem.outerHTML = "";
        elem = null;
      });*/
      for(var i = (el.length - 1); i >= 0; i--){
        el[i].outerHTML = "";
      }
    }else{
      el.length ? function(){
        var idx = op > 0 ? 0 : el.length - 1;
        var element = el[idx];
        element.outerHTML = "";
        element = null;
      }() : function(){
        el.outerHTML = "";
        el = null;
      }();
    }
    window.scroll(0, document.body.scrollHeight);
  };

})(window);
