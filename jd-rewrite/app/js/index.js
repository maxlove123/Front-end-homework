function hideTopBar() {
    var topbar = document.querySelector('.top-banner');
    var hideBtn = topbar.querySelector('#top-hide-btn');
    hideBtn.addEventListener('click', function(){
        topbar.style.opacity = '0';
        topbar.style.display = 'none';
    });   
}

function switchNotice(){
    var notice = document.querySelector('.grid_1 .notice');
    var onsalebtn = notice.querySelector('#onsalebtn');
    var announcebtn = notice.querySelector('#announcebtn');

    var monsale = notice.querySelector('#monsale');
    var mannounce = notice.querySelector('#mannounce');
    var noticebar = notice.querySelector('#noticebar');

    onsalebtn.addEventListener('mouseenter', function(){
        monsale.style.display = 'block';
        mannounce.style.display = 'none';
        noticebar.style.transform = 'translate3d(0, 0, 0)';
    });
    announcebtn.addEventListener('mouseenter', function(){
        monsale.style.display = 'none';
        mannounce.style.display = 'block';
        noticebar.style.transform = 'translate3d(50px, 0, 0)';
    });
}

function serviceTagEnt(){
    var serviceTag = document.querySelector('.serviceTag');
    var info = serviceTag.querySelector('.info');
    function _e() {
        info.style.bottom = '0px';
    }

    var tagList = serviceTag.querySelectorAll('.tag li');
    for (var i = 0; i <= 4; i++) {
        tagList[i].addEventListener('mouseenter', function(event){
            _e(event);
        });
    }
        
}

function rankEnt() {
    var tagList = document.querySelectorAll('.sale-rank .tabs li');
    var contentList = document.querySelectorAll('.sale-rank .tab-items .slideshow');
    for (var i = 0; i < tagList.length; i++) {
        tagList[i].setAttribute('data-index', i);
        tagList[i].addEventListener('mouseenter', function(event){
            for (var j = 0; j < contentList.length; j++) {
                contentList[j].style.display = 'none';
            }
            var target = event.target;
            var index = target.getAttribute('data-index');
            contentList[index].style.display = 'block';
        });
    }
}

function init() {
    hideTopBar();
    switchNotice();
    serviceTagEnt();
    rankEnt();
}
init();