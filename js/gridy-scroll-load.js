(function(window) {

  'use strict';

  var add = function(){
    var height = Math.floor((Math.random() * 30) + 10) * 10;

    var gridy = document.getElementById('gridy');
    var lis = gridy.querySelectorAll('li:not(.grid-sizer)');

    var txt = document.querySelector('.grid-wrap').innerHTML;
    txt += "<li><figure><div style='height: "+height+"px;'><p>"+(lis.length+1)+". "+height+"px</p></div></figure></li>";
    document.querySelector('.grid-wrap').innerHTML = txt;
  }

  function init(){
    addComponents();
  }

  init();

  function addComponents(){
    for(var i = 0; i < 10; i++) add();
    console.log('add component complete');
  }

  window.addEventListener('scroll', function(){
    // console.log(window.innerHeight); // window의 크기
    // console.log(window.outerHeight); // window의 크기 + a?
    // console.log(document.body.clientHeight); // body의 총 Height (스크롤 모두 내렸을 때)
    // console.log(document.documentElement.scrollTop); // 현재 윈도우의 Top height
    // console.log(window.pageYOffset); // 현재 윈도우의 Top height
    var ih = window.innerHeight;
    var pyo = window.pageYOffset;
    var ch = document.body.clientHeight;
    var offset = 50;
    if(ih + pyo > ch - offset){
      // add more component;
      console.log('currentHeight > scrollHeight - offset');
      console.log((ih + pyo) + ' > ' + (ch - offset));
      addComponents();
    }
  });



})(window);
