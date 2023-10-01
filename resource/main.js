// set canvas
var max_width = window.innerWidth-5;
var max_height = window.innerHeight-10;
$(document).ready(function(){
    $("#mainbody").css('width', max_width);
    $("#mainbody").css('width', max_height);
});
var canvas = document.getElementById('shallow');
canvas.setAttribute("width",max_width);
canvas.setAttribute("height",max_height);
var ctx = canvas.getContext('2d');

//draw
var color = ['#ffc0cb','#dda0dd','#9370db','#6495ed',
            '#87cefa','#ffffff','#fa8072','#a0522d',
            '#ff8c00','#008000'];
var color_weed = ["#228f69", "#43d1a0", "#14c963", 
            "#07b051", "#1ac90a", "#1dd180"];
//大气泡
var bubble = new Bubble();
var bubbles = [bubble];
for (var i = 0; i < 10; i++) {
    bubble = new Bubble();
    bubbles.push(bubble);
}
//水草
var weed = new Weed();
var weeds = [weed];
var number = 120;
if (max_width <= 500) {
    number = 30;
}
for (var i = 0; i < number; i++) {
  weed = new Weed();
  weeds.push(weed);
}
//小气泡
var blister = new Blister();
var blisters = [blister];
number = 30;
if (max_width <= 500) {
    number = 15;
}
for (var i = 0; i < number; i++) {
  blister = new Blister();
  blisters.push(blister);
}
var mouse_x = 0;
var mouse_y = 0;
Frame_loop();
$(document).ready(function(){
  $("#shallow_div").mouseenter(function(){
    $("#shallow_div").mousemove(function(event){
      mouse_x = event.offsetX;
      mouse_y = event.offsetY;
    });
  });
});