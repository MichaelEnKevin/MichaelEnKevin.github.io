/**
 * Created by xudao on 16/11/14.
 */
define(['assets/js/util/fetch'], function (xhr) {
    function backPromise(res, type) {
        var method = 'json';
        switch (type){
            case 'html':
                method = 'text';
                break;
            case 'json':
                method = 'json';
                break;
            default:
                method = 'json';
                break;
        }

        return new Promise(function (resolve, reject) {
            return res.then(function (response) {
                return response[method]().then(function (json) {
                    resolve(json);
                }, function(err){
                    reject(err);
                });
            })
        });

    }

    return {
        getName: function (nickname) {
            return backPromise(
                xhr.fetch("http://www.163.com", {
                    method: 'GET'
                })
            );
        },
        getHtml: function(){
            return backPromise(
                xhr.fetch("./modal.html"),
                'html'
            );
        },
        getCopyData: function(){
            return backPromise(
                xhr.fetch("./assets/data/copy.json"),
                'json'
            );
        },
        getTemplateData: function(){
            return backPromise(
                xhr.fetch("./assets/data/data.json"),
                'json'
            );
        }
    };

});
