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
, function($,service,util,template,bootstrap,tns,sticky,functions,webui_popover) {
   $('.fa-qq').webuiPopover(
      {
         trigger : 'hover',
         placement : 'auto',
         title : 'QQ:3571324189',
         content : '<img src="assets/images/jyqq.jpg" style="width:200px;height:264px;" alt="简优软件" id="met-weixin-img" class="d-block">'
   });
   $('.fa-weixin').webuiPopover(
      {
         trigger : 'hover',
         placement : 'auto',
         title : 'wx:jianyou_plus',
         content : '<img src="assets/images/jywx.jpg" style="width:200px;height:264px;" alt="简优软件" id="met-weixin-img" class="d-block">'
   });

   service.getCopyData().then(function(body){
      if(body.length > 0) {
         var item = body[0];
         console.log(item);
         $(".company_info").html("@"+ item.copy_year + " "+ item.short_company_name);
         $(".copyright a:first").attr("href",item.qq_link);
         $(".navbar-brand img").each(function(obj,index){
            $(this).attr("src",item.logo);
         });
         $(".short_company_name").html(item.short_company_name);
         $("#homeMenu").html(item.menu[0]);
      }
   }, function(error){
      console.log(error);
   });

   //get source form html
   service.getTemplateData().then(function(body){
      if(body.length > 0) {
         var item = body[0];
         console.log(item);
         var html = template('tpl-main-card', item);
         // main card
         $("#main-card").html(html);

         var html = template('tpl-right12-card', item);
         $("#right12-card").html(html);

         var html = template('tpl-right6-card', item);
         $("#right6-card").html(html);

         var html = template('tpl-right6-card', item);
         $("#right6_1-card").html(html);

         var html = template('tpl-common-card', item);
         $(".tiny-slider-inner").html(html+html+html+html+html+html);

         e.init();
      }
   }, function(error){
      console.log(error);
   });

});
