
var SlideShow = function(slideshowEle, animType, isRun) {
    
    this.index = 0;
    this.isRun = isRun !== undefined ? isRun : true;
    this.isPause = false;
    this.animType = animType;
    this.slideshowEle = slideshowEle;
    this.slidesEle = slideshowEle.querySelector('.slides');
    this.slides = this.slidesEle.children;

    this.dotsEle = slideshowEle.querySelector('.dots');
    if (!this.dotsEle) {
        this.dotsEle = document.createElement('ul');
        this.dotsEle.classList.add('dots');
        for (var i = 0; i < this.slides.length; i++) {
            this.dotsEle.append(document.createElement('li'));
        }
    }
    this.dots = this.dotsEle.children;

    this.prevBtn = slideshowEle.querySelector('.slideshow-con-prev');
    this.nextBtn = slideshowEle.querySelector('.slideshow-con-next');
    if (!this.prevBtn) {
        this.prevBtn = document.createElement('i');
    }
    if (!this.nextBtn) {
        this.nextBtn = document.createElement('i');
    }

    this.addStyle();
    this.init();
    this.setFocus(0);
    this.run();
};

SlideShow.prototype.init = function() {
    this[this.animType]();

    var _this = this;
    var slideshowEle = this.slideshowEle;
    slideshowEle.addEventListener('mouseenter', function() {
        _this.isPause = true;
    });
    slideshowEle.addEventListener('mouseleave', function() {
        _this.isPause = false;
    });

    this.prevBtn.addEventListener('click', function(){
        _this.setFocus(_this.index - 1);
    });

    this.nextBtn.addEventListener('click', function(){
        _this.setFocus();
    });

    for (var i = 0; i < this.dots.length; i++) {
        var dotEle = _this.dots[i];
        dotEle.setAttribute('data-index', i);
        dotEle.addEventListener('mouseenter', function() {
            var index = Number(this.getAttribute('data-index'));
            if (index != _this.index) {
                _this.setFocus(index);
            }
        });   
    }
};

SlideShow.prototype.run = function() {
    var _this = this;
    this.animation = setInterval(function() {
        if (_this.isRun && !_this.isPause) {
            _this.setFocus();
        }
    }, 2000);
};

SlideShow.prototype.style = {
    fadein: [
        '.fadein {animation: fadein 0.4s;}',
        '@keyframes fadein {',
            'from {opacity: 0;}',
            'to {opacity: 1;}',
        '}'
        ].join(''),
    roll: [
        '.roll{',
            'transition: 0.2s ease-out;',
            'position: relative',
        '}',
        ].join(''),
};

SlideShow.prototype.addStyle = function(){
    var style = document.createElement('style');
    style.innerHTML = this.style[this.animType];
    document.head.appendChild(style);
};

SlideShow.prototype.setFocus = function(index){
    this[this.animType].setFocus.call(this,index);
};

SlideShow.prototype.roll = function(){
    var endSlide = this.slides[0].cloneNode(true);
    // endSlide.style.background = 'green';
    this.slidesEle.append(endSlide);
    this.slidesEle.classList.add('roll');
};

SlideShow.prototype.roll.setFocus = function(slideIndex) {
    this.cleanClassTag();

    var currIndex;
    if (slideIndex !== undefined) {
        currIndex = slideIndex;
    } else {
        currIndex = this.index + 1;
    }

    var slidesLen = this.slides.length;
    var slideWidth = this.slides[0].clientWidth;
    if (currIndex === -1){
        this.slidesEle.style.transitionProperty = 'none';
        this.slidesEle.style.left = -(slidesLen - 1) * slideWidth + 'px';
        this.slidesEle.style.display = document.defaultView.getComputedStyle(this.slidesEle)['display'];
        this.slidesEle.style.transitionProperty = 'all';  
        currIndex = (slidesLen - 1) - 1;
    } else if(currIndex === slidesLen) {    
        this.slidesEle.style.transitionProperty = 'none';
        this.slidesEle.style.left = 0;
        this.slidesEle.style.display = document.defaultView.getComputedStyle(this.slidesEle)['display'];
        this.slidesEle.style.transitionProperty = 'all';
        currIndex = 1;
    }

    dotIndex = currIndex === slidesLen - 1 ? 0 : currIndex;
    this.dots[dotIndex].classList.add('focus');

    var posi = -(currIndex * slideWidth);
    this.slidesEle.style.left = posi + 'px';
    this.index = currIndex;
};

SlideShow.prototype.cleanClassTag = function() {
    var sLen = this.slides.length;
    var dLen = this.dots.length;
    for (var i = 0; i < sLen; i++) {
        var slideEle = this.slides[i];
        slideEle.style.zIndex = '0';
        slideEle.classList.remove('fadein');
    }
    for (var i = 0; i < dLen; i++) {
        var dotEle = this.dots[i];
        dotEle.classList.remove('focus');
    }
};

SlideShow.prototype.fadein = function() {
};


SlideShow.prototype.fadein.setFocus = function(slideIndex) {
    var prevIndex = this.index;
    var currIndex;
    if (slideIndex !== undefined) {
        currIndex = slideIndex;
    } else {
        currIndex = prevIndex + 1;
    }

    if (currIndex === -1) {
        currIndex = this.slides.length - 1;
    } else if (currIndex === this.slides.length) {
        currIndex = 0;
    } 

    this.cleanClassTag();
    this.slides[prevIndex].style.zIndex = '1';
    this.slides[currIndex].classList.add('fadein');
    this.slides[currIndex].style.zIndex = '2';
    this.dots[currIndex].classList.add('focus');

    this.index = currIndex;
};

var ele = document.querySelector('.grid_1 .slideshow');
var topBanner = new SlideShow(ele, 'fadein');

var ele = document.querySelector('.secondkill .slideshow');
var seckill = new SlideShow(ele, 'roll', false);

var ele = document.querySelector('.grid_2 .sale-rank .tab-item-1');
var rank = new SlideShow(ele, 'roll', false);
