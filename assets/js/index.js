$(function(){
    files = ["2021-11","2021-10","2021-09"];
    curIndex = 0;
    // 功能初始化
    // card点击开关toggle事件
    $("body").on("click",".card",function(){
        $(".description",this).slideToggle("5000");
    });

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

    // 顶级模板内容
    // 生活:bg-danger,科技:bg-warning,经济:bg-info,旅行:bg-success
    var filename = files[curIndex];
    $.ajax({url:"./assets/data/"+filename+".json",type: "GET",dataType: "json",success:function(body){
        if(body.length > 0) {
            var item = body[0];
            // base64解码
            item.description = $.base64.atob(item.description, true);
            var html = template('tpl-main-card', item);
            // main card
            $("#main-card").html(html);
   
            if(body.length > 1) {
               item = body[1];
               // base64解码
               item.description = $.base64.atob(item.description, true);
               html = template('tpl-right12-card', item);
               $("#right12-card").html(html);
            }
   
            if(body.length > 2) {
               item = body[2];
               // base64解码
               item.description = $.base64.atob(item.description, true);
               html = template('tpl-right6-card', item);
               $("#right6-card").html(html);
            }
   
            if(body.length > 3) {
               item = body[3];
               // base64解码
               item.description = $.base64.atob(item.description, true);
               html = template('tpl-right6-card', item);
               $("#right6_1-card").html(html);
            }
   
            if(body.length > 4) {
               for(var i=4;i<body.length;i++) {
   
                  item = body[i];
                  // base64解码
                  item.description = $.base64.atob(item.description, true);
                  html = template('tpl-suggest-card', item);
                  $("#suggest").append(html);
               }
            }
         }
    }});

    
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

    function loadMoreTemplateData(itemfilename) {
        $.ajax({url:"./assets/data/"+itemfilename+".json",type: "GET",dataType: "json",success:function(body){
            if(body.length > 0) {
                body.forEach(element => {
                    // base64解码
                    element.description = $.base64.atob(element.description, true);
                    var html = template('tpl-suggest-card', element);
                    $("#suggest").append(html);
                });
            }
        }});
    }
});