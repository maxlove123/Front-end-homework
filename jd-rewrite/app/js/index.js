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
    var serviceTag = $('.serviceTag');
    var info = serviceTag.find('.info');
    var tagList = serviceTag.find('.tag li');

    tagList.each(function(i,tagNode){
        $(tagNode).on('mouseenter', function(){
            info.css('bottom','0px');
        });
    });
}

function serviceInfoEnt() {
    var infoNode = $('.grid_1 .serviceTag .info');
    var nav = infoNode.find('.info-tag li');
    var contentList = infoNode.find('.tc-item');

    nav.each(function(i, navNode){
        $(navNode).on('mouseenter',function(){
            $(contentList[i]).show();
            $(contentList[i]).siblings().hide();
        });       
    });

    contentList.each(function(i, contentNode){
        var secondNavList = $(contentNode).find('.second-nav li');
        var secondContentList = $(contentNode).find('.optionList li');
        secondNavList.each(function(i,secondNavNode){
            $(secondNavNode).on('mouseenter',function(){
                $(secondContentList[i]).show();
                $(secondContentList[i]).siblings().hide();                    
            });

        });
    });
}

function grid1LnavEnt(){
    var lnavContent = $('.grid_1 #lnav-content');
    $('.grid_1 .lnav li').each(function(i, navNode){
        $(navNode).on('mouseenter', function(){
            lnavContent.show();
        });
        $(navNode).on('mouseleave', function(){
            lnavContent.hide();
        });
    });
}

// function rankEnt() {
//     var tagList = document.querySelectorAll('.sale-rank .tabs li');
//     var contentList = document.querySelectorAll('.sale-rank .tab-items .slideshow');
//     for (var i = 0; i < tagList.length; i++) {
//         tagList[i].setAttribute('data-index', i);
//         tagList[i].addEventListener('mouseenter', function(event){
//             for (var j = 0; j < contentList.length; j++) {
//                 contentList[j].style.display = 'none';
//             }
//             var target = event.target;
//             var index = target.getAttribute('data-index');
//             contentList[index].style.display = 'block';
//         });
//     }
// }

function rankEnt() {
    var tagList = $('.sale-rank .tabs li');
    var contentList = $('.sale-rank .tab-items .slideshow');
    tagList.each(function(i, tagNode){
        $(tagNode).on('mouseenter', function(){
            $(contentList[i]).show();
            $(contentList[i]).siblings().hide();
        });
    });
}

function init() {
    hideTopBar();
    grid1LnavEnt();
    switchNotice();
    serviceTagEnt();
    rankEnt();
    serviceInfoEnt();
}

init();