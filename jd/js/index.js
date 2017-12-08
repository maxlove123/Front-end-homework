var SlideShow = function() {
    this.imgQueue = document.querySelectorAll('.tbanner li');
    this.pointQueue = document.querySelectorAll('.indexbox .index');
    this.isRun = true;
    this.length = this.imgQueue.length;
    this.index = 0;
};

SlideShow.prototype.clean = function() {
    for (var i = 0; i < this.length; i++) {
        var node = this.imgQueue[i];
        node.style.zIndex = '0';
        node.classList.remove('fadein');
        this.pointQueue[i].style.background = 'white';
    }
};

SlideShow.prototype.setFocusTag = function(node) {
    node.classList.add('fadein');
    node.style.zIndex = '2';
};

SlideShow.prototype.setLastFocusTag = function(node) {
    node.style.zIndex = '1';
};

SlideShow.prototype.setPointFocusTag = function(node) {
    node.style.background = '#f10215';
};

SlideShow.prototype.setFocus = function(index) {
    this.clean();
    this.setLastFocusTag(this.imgQueue[this.index]);

    if (index) {
        this.index = index;
    } else if (this.index >= this.length - 1) {
        this.index = 0;
    } else {
        this.index++;
    }
    this.setFocusTag(this.imgQueue[this.index]);
    this.setPointFocusTag(this.pointQueue[this.index]);
};

SlideShow.prototype.init = function() {

    var style = document.createElement('style');
    style.innerHTML = [
        '.fadein {animation: fadein 2s;}',
        '@keyframes fadein {',
        'from {opacity: 0;}',
        'to {opacity: 1;}',
        '}'
    ].join('');
    document.head.appendChild(style);

    this.imgQueue[0].style.zIndex = '2';
    this.pointQueue[0].style.background = '#f10215';
    var that = this;
    var box = document.querySelector('.tbanner');
    box.addEventListener('mouseover', function() {
        that.isRun = false;
    });
    box.addEventListener('mouseout', function() {
        that.isRun = true;
    });

    for (var j = 0; j < this.length; j++) {
        var pointNode = this.pointQueue[j];
        pointNode.addEventListener('mouseover', function() {
            var index = this.getAttribute('data-order');
            that.setFocus(index);
        });
    }
};

SlideShow.prototype.run = function() {
    this.init();
    var that = this;
    this.animation = setInterval(function() {
        if (that.isRun) {
            that.setFocus();
        }

    }, 3000);
};

var seckillTimer = function() {
    var hourNode = document.getElementById('timerhour');
    var minuteNode = document.getElementById('timerminute');
    var secondNode = document.getElementById('timerseconde');
    setInterval(function() {
        var date = new Date;
        hourNode.innerText = date.getHours();
        minuteNode.innerText = date.getMinutes();
        secondNode.innerText = date.getSeconds();
    }, 1000);
};

var init = function() {
    var s = new SlideShow();
    s.run();

    seckillTimer();
    var noticeBar = document.getElementById('noticebar');
    var monsale = document.getElementById('monsale');
    var mannounce = document.getElementById('mannounce');
    document.getElementById('onsalebtn').addEventListener('mouseover', function() {
        monsale.style.display = 'block';
        mannounce.style.display = 'none';
        noticeBar.style.transform = 'translateX(0)';
    });

    document.getElementById('announcebtn').addEventListener('mouseover', function() {
        mannounce.style.display = 'block';
        monsale.style.display = 'none';
        noticeBar.style.transform = 'translateX(52px)';
        // noticeBar.style.transform = 'translateX(0)';
    });
};

init();