// sky: #2B60D7
// deep bubble: #17293a

function set_enter_message(left, top, area) {
    var id_use = "#enter";
    // check if there is already had the message
    if ($(id_use).length > 0) {
        return;
    }
    var ele = "<p class='message' id='enter'>" +
        "You have entered " + area + " area</p>";
    $("#message_after").after(ele);
    $(id_use).css('position', 'absolute');
    $(id_use).css('left', left);
    $(id_use).css('top', top);
    $(id_use).css('color', "yellow");
    $(id_use).show(250);
    setTimeout(function(){$(id_use).hide(250);},500);
    setTimeout(function(){$(id_use).remove();},750);
}
function getRandom (n, m) {
    var num = Math.floor(Math.random() * (m - n + 1) + n)
    return num
}
function getRandom_float (n, m) {
    var num = Math.random() * (m - n + 1) + n;
    return num;
}

//背景
function draw_back() {
    ctx.fillStyle = "#17293a";
    ctx.fillRect(0,0,max_width,max_height);
}

//水草
class Weed {
    constructor() {
        this.x = getRandom(10, max_width-20);
        this.y = 0;
        this.destination_y = -getRandom(80, 130); //don't change
        this.control_x = this.x;
        this.control_y = -70;
        this.line_width = getRandom(8,12);
        this.color = color_weed[getRandom(0, color_weed.length - 1)];
        this.status_x = true; //true means control go right
        this.status_y = true; //true means control go down

    }
    draw_weed() {
        ctx.beginPath();
        ctx.lineWidth = this.line_width;
        ctx.lineCap = "round";
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.x, 0); //起始点
        ctx.quadraticCurveTo(this.control_x, this.control_y, this.x, this.destination_y);
        ctx.stroke();
    }
    move() {
        if (this.control_x >= this.x + 20) {
            this.status_x = false;
        }
        else if (this.control_x <= this.x - 20) {
            this.status_x = true;
        }
        if (this.control_y <= this.destination_y * 0.95) {
            this.status_y = false;
        }
        else if (this.control_y >= -10) {
            this.status_y = true;
        }
        
        if (this.status_x) {
            this.control_x += 0.4;
            this.destination_y += 0.0562;
        }
        else {
            this.control_x -= 0.4;
            this.destination_y -= 0.0562;
        }
        if (this.status_y) {
            this.control_y -= 0.0562;
        }
        else {
            this.control_y += 0.0562;
        }
        this.draw_weed();
    }
}

//小气泡
class Blister {
    constructor() {
        this.x = getRandom(10, max_width-10);
        this.y = max_height + 3;
        this.r = getRandom(2,6);
        this.line_width = getRandom_float(0.3, 1);
        this.speed = getRandom_float(0.5,3);
        this.opacity = getRandom_float(0.2, 0.5);
    }
    draw() {
        var strokeColor = 'rgba(255, 255, 255,' + this.opacity + ')';
        var fillColor = 'rgba(255, 255, 255,' + (this.opacity / 2) + ')';
        ctx.save();
        ctx.lineWidth = this.line_width;
        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    move() {
        //if it reaches the top
        if (this.y < -this.r) {
            this.x = getRandom(10, max_width-10);
            this.y = max_height + 3;
            this.r = getRandom(2,8);
            this.line_width = getRandom_float(0.3, 1);
            this.speed = getRandom_float(0.5,3);
            this.opacity = getRandom_float(0.2, 0.7);
        }
        this.y -= this.speed;
        this.draw();
    }
}

//大气泡
class Bubble {
    constructor() {
        this.x = Math.floor(Math.random() * max_width);
        this.y = max_height + 13;
        this.r = getRandom(13,20);
        this.color = Math.floor(Math.random()*10);
        this.speed = getRandom(2,5);
        this.status = true;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha=0.3;
        ctx.strokeStyle='rgba(0,0,0,0.5)';
        ctx.lineWidth=2;
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI,true);
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        //设置阴影
        ctx.shadowBlur=7;
        ctx.shadowColor='#fff';
        ctx.shadowOffsetX=10;
        ctx.shadowOffsetY=-6;
        ctx.fill();
        //画光圈
        ctx.beginPath();
        ctx.strokeStyle='rgba(255,255,255,0.5)';
        ctx.lineCap='round';
        ctx.lineWidth=3;
        ctx.arc(this.x,this.y,this.r/2,(Math.PI*2)/0.9,
                (Math.PI*2),true);
        ctx.stroke();
        ctx.restore();
    }
    move() {
        if (!this.status) {
            return;
        }
        //if it reaches the top
        if (this.y < -this.r) {
            this.x = getRandom(20,max_width-20);
            this.y = max_height + 13;
            this.r = getRandom(13,20);
            this.color = color[Math.floor(Math.random()*10)];
            this.speed = getRandom(2,5);
        }
        this.y -= this.speed;
        this.draw();
        // if the mouse touched the bubble
        if (this.x - this.r <= mouse_x && 
            this.x + this.r >= mouse_x &&
            this.y - this.r <= mouse_y &&
            this.y + this.r >= mouse_y) {
            this.status = false;
            bubbles.push(new Bubble());
        }
    }
}

function Frame_loop() {
    window.requestAnimationFrame(Frame_loop);
    draw_back();
    ctx.translate(0,max_height);
    for (var i = weeds.length - 1; i >= 0; i--) {
        weeds[i].move();
    }
    ctx.translate(0,-max_height);
    for (var i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].move();
    }
    for (var i = blisters.length - 1; i >= 0; i--) {
        blisters[i].move();
    }
}