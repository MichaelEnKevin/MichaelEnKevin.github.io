$(function () {
    // 返回顶部按钮初始化
    backTotop();

    var fileParam = /[&?]file=([^&]+)/.exec(location.search);
    var filename = null;
    var idParam = /[&?]id=([^&]+)/.exec(location.search);
    var id = null;
    if (fileParam && fileParam.length > 0) {
        filename = fileParam[1];            
    }
    if (idParam && idParam.length > 0) {
        id = idParam[1];
    }

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

    // 模板内容  (生活:bg-danger,科技:bg-warning,经济:bg-info,旅行:bg-success)
    $.ajax({url:"./assets/data/"+filename+".json",type: "GET",dataType: "json",success:function(body){
        if (body) {
            var item = body[id];
            if (item) {
                var desc = item.description;
                // base64解码
                item.description = $.base64.atob(item.description, true);
                if (item.content && desc != item.content) {
                    item.content = $.base64.atob(item.content, true);
                } else {
                    delete item.content;
                }
                
                item.id = id;
                html = template('tpl-article-card', item);
                $("#article").html(html);
                $("title").html(item.title);
            }
         }
    }});
});

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