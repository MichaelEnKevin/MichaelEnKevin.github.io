$(function () {
    // 返回顶部按钮初始化
    backTotop();

    // 数据文件
    files = ["2021-11","2021-10","2021-09"];
    curIndex = 0;

    // 版权信息内容
    $.ajax({url:"./assets/data/copy.json",type: "GET",dataType: "json",success:function(body){
        if(body.length > 0) {
            var item = body[0];
            $(".company_info").html("@"+ item.copy_year + " "+ item.short_company_name);
            $(".copyright a:first").attr("href",item.qq_link);
            $(".navbar-brand img").each(function(obj,index){
                $(this).attr("src",item.logo);
            });
            $(".short_company_name").html(item.short_company_name);
            $("#homeMenu").html(item.menu[0]);
            $("title").html(item.short_company_name);
            $(".my-2 .nav .nav-item span").html(item.slogan);

            $('.fa-qq').webuiPopover(
                {
                trigger : 'hover',
                placement : 'top',
                title : 'QQ:3571324189',
                content : '<img src="' + item.qqqrcode+'" style="width:200px;height:264px;" alt="' + item.short_company_name+'" id="met-weixin-img" class="d-block">'
            });
            $('.fa-weixin').webuiPopover(
                {
                trigger : 'hover',
                placement : 'top',
                title : 'wx:jianyou_plus',
                content : '<img src="' + item.wxqrcode+'" style="width:200px;height:264px;" alt="' + item.short_company_name+'" id="met-weixin-img" class="d-block">'
            });
        }
    }});

    // 顶级模板内容  (生活:bg-danger,科技:bg-warning,经济:bg-info,旅行:bg-success)
    var filename = files[curIndex];
    $.ajax({url:"./assets/data/"+filename+".json",type: "GET",dataType: "json",success:function(body){
        if (body) {
            var keys = [];
            for (var key in body) {
                keys.push(key);
            }
            var item = body[keys[0]];
            // base64解码
            item.description = $.base64.atob(item.description, true);
            item.file = filename;
            item.id = keys[0];
            var html = template('tpl-main-card', item);
            // main card
            $("#main-card").html(html);
   
            if (keys.length > 1) {
                item = body[keys[1]];
               // base64解码
                item.description = $.base64.atob(item.description, true);
                item.file = filename;
                item.id = keys[1];
               html = template('tpl-right12-card', item);
               $("#right12-card").html(html);
            }
   
            if (keys.length > 2) {
                item = body[keys[2]];
               // base64解码
                item.description = $.base64.atob(item.description, true);
                item.file = filename;
                item.id = keys[2];
               html = template('tpl-right6-card', item);
               $("#right6-card").html(html);
            }
   
            if (keys.length > 3) {
                item = body[keys[3]];
               // base64解码
                item.description = $.base64.atob(item.description, true);
                item.file = filename;
                item.id = keys[3];
               html = template('tpl-right6-card', item);
               $("#right6_1-card").html(html);
            }
   
            if (keys.length > 4) {
                for (var i = 4; i < keys.length;i++) {
                    item = body[keys[i]];
                    item.id = keys[i];
                  // base64解码
                   item.description = $.base64.atob(item.description, true);
                   item.file = filename;
                  html = template('tpl-suggest-card', item);
                  $("#suggest").append(html);
               }
            }
         }
    }});

    // 加载更多
    $("#loadMore").click(function(){
        curIndex++;
        if(curIndex<files.length) {
            filename = files[curIndex];
            loadMoreTemplateData(filename);
        } else {
            $('#bottom-row').toast({
                position:'fixed',
                content:'已到底',
                duration:3000,
                isCenter:false,
                // background:'#4EA44E',
                animateIn:'bounceInUp-hastrans',
                animateOut:'bounceOutDown-hastrans',
            });
            $("#loadMore").slideDown('slow');
            $(".bottom-bar").html("没有了，歇会吧");
        }
    });

});

// 加载更多按钮数据处理函数
function loadMoreTemplateData(itemfilename) {
    $.ajax({
        url: "./assets/data/" + itemfilename + ".json", type: "GET", dataType: "json", success: function (body) {
            if (body) {
                var keys = [];
                for (var key in body) {
                    keys.push(key);
                }
                var item = body[keys[0]];
                keys.forEach(key => {
                    var element = body[key];
                    // base64解码
                    element.description = $.base64.atob(element.description, true);
                    element.file = itemfilename;
                    element.id = key;
                    var html = template('tpl-suggest-card', element);
                    $("#suggest").append(html);
                });
            }
        }
    });
}

// 返回顶部按钮初始化函数
function backTotop () {
    var scrollpos = window.scrollY;
    var backBtn = $('.back-top');
    if (typeof !!backBtn && (backBtn) != 'undefined' && backBtn != null) {
        var add_class_on_scroll = () => backBtn.addClass("back-top-show");
        var remove_class_on_scroll = () => backBtn.removeClass("back-top-show");

        window.addEventListener('scroll', function () {
            scrollpos = window.scrollY;
            if (scrollpos >= 800) {
                add_class_on_scroll()
            } else {
                remove_class_on_scroll()
            }
        });

        backBtn[0].addEventListener('click', () => window.scrollTo({
            top: 0,
            behavior: 'smooth',
        }));
    }
}