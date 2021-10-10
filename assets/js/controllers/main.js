/**
 *
 */
 require.config({
   paths: {
      'jquery': 'assets/js/common/jquery.slim.min',
      'service':'assets/js/services/service',
      'util':'assets/js/util/util',
      'template':'assets/js/common/template-web',
      'bootstrap':'assets/vendor/bootstrap/dist/js/bootstrap.bundle.min',
      'tiny_slider':'assets/vendor/tiny-slider/tiny-slider',
      'sticky':'assets/vendor/sticky-js/sticky.min',
      'functions':'assets/js/functions',
      'webui_popover':'assets/webui-popover/dist/jquery.webui-popover'
   },
   waitsecond:0
});

require(['jquery','service', 'util', 'template','bootstrap','tiny_slider','sticky','functions','webui_popover']
, function($,service,util,template,bootstrap,tiny_slider,sticky,functions,webui_popover) {
   // 功能初始化
   // card点击开关toggle事件
   $("body").on("click",".description",function(){
      $(this).fadeToggle("slow");
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
   service.getTemplateData().then(function(body){
      if(body.length > 0) {
         var item = body[0];
         var html = template('tpl-main-card', item);
         // main card
         $("#main-card").html(html);

         if(body.length > 1) {
            item = body[1];
            html = template('tpl-right12-card', item);
            $("#right12-card").html(html);
         }

         if(body.length > 2) {
            item = body[2];
            html = template('tpl-right6-card', item);
            $("#right6-card").html(html);
         }

         if(body.length > 3) {
            item = body[3];
            html = template('tpl-right6-card', item);
            $("#right6_1-card").html(html);
         }

         if(body.length > 4) {
            for(var i=4;i<body.length;i++) {
               item = body[i];
               html = template('tpl-common-card', item);
               $(".tiny-slider-inner").html($(".tiny-slider-inner").html()+html);
            }
         }

         e.init();
      }
   }, function(error){
      console.log(error);
   });

});
