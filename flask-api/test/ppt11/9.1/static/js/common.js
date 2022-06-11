;
var common_ops = {
    buildUrl: function (path, params) {
        //假设传进来的是 params = {"test":"abc","sort":"asc"};
        //?test=abc&sort=asc
        const url = "" + path;
        let _param_url = "";
        if (params) {
            _param_url = Object.keys(params).map(function (k) {
                return [encodeURIComponent(k), encodeURIComponent(params[k])].join("=")
            }).join("&");
            _param_url = "?" + _param_url;
        }
        return url + _param_url;
    },
    alert: function (msg, callback) {
        layer.alert(msg, {
            yes: function (index) {
                if (typeof callback == "function") {
                    callback();
                }
                layer.close(index);
            }
        });
    }
};







