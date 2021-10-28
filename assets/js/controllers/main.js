/**
 *
 */
 require.config({
   paths: {
      'jquery': 'assets/js/common/jquery.min',
      'base64': 'assets/js/common/jquery.base64',
      'service':'assets/js/services/service',
      'util':'assets/js/util/util',
      'template':'assets/js/common/template-web',
      'bootstrap':'assets/vendor/bootstrap/dist/js/bootstrap.bundle.min',
      'tiny_slider':'assets/vendor/tiny-slider/tiny-slider',
      'sticky':'assets/vendor/sticky-js/sticky.min',
      'functions':'assets/js/functions',
      'webui_popover':'assets/webui-popover/dist/jquery.webui-popover',
      'toast':'assets/js/lib/toast'
   },shim:{
      'toast':{
          deps: ['jquery'],
          exports: 'toast'
      }
   },
   waitsecond:0
});

require(['jquery','base64','service', 'util', 'template','bootstrap','tiny_slider','sticky','functions','webui_popover','toast']
, function($,base64,service,util,template,bootstrap,tiny_slider,sticky,functions,webui_popover,toast) {
   var jq = $.noConflict();
   files = ["2021-11","2021-10","2021-09"];
   curIndex = 0;
   // 功能初始化
   // card点击开关toggle事件
   $("body").on("click",".card",function(){
      $(".description",this).slideToggle("5000");
   });

   // 版权信息内容
   service.getCopyData().then(function(body){
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
               placement : 'auto',
               title : 'QQ:3571324189',
               content : '<img src="' + item.qqqrcode+'" style="width:200px;height:264px;" alt="' + item.short_company_name+'" id="met-weixin-img" class="d-block">'
         });
         $('.fa-weixin').webuiPopover(
            {
               trigger : 'hover',
               placement : 'auto',
               title : 'wx:jianyou_plus',
               content : '<img src="' + item.wxqrcode+'" style="width:200px;height:264px;" alt="' + item.short_company_name+'" id="met-weixin-img" class="d-block">'
         });
      }
   }, function(error){
      console.log(error);
   });

   // 模板内容
   //get source form html
   // 生活:bg-danger,科技:bg-warning,经济:bg-info,旅行:bg-success
   var filename = files[curIndex];
   service.loadTopTemplateData(filename).then(function(body){
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
   }, function(error){
      console.log(error);
   });

   $("#loadMore").click(function(){
      curIndex++;
      if(curIndex<files.length) {
         filename = files[curIndex];
         service.loadMoreTemplateData(filename).then(function(body){
            if(body.length > 0) {
               body.forEach(element => {
                  // base64解码
                  element.description = $.base64.atob(element.description, true);
                  var html = template('tpl-suggest-card', element);
                  $("#suggest").append(html);
               });
            }
         }, function(error){
            console.log(error);
         });
      } else {
         $('body').toast({
            position:'fixed',
            content:'已到底',
            duration:3000,
            isCenter:true,
            //background:'#4EA44E',
            animateIn:'bounceInUp-hastrans',
            animateOut:'bounceOutDown-hastrans',
         });
         $("#loadMore").slideDown('slow');
         $(".bottom-bar").html("没有了，歇会吧");
      }
   });
});