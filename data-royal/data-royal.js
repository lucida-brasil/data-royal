var advcake_int = {
    domain: '.boticario.com.br',
    url: 'https://hitbr.acstat.com/boticario/',
    postbackUrl: 'https://api.advcakebr.com/postback/boticario',
    trackid: 'advcake_trackid',
    partner: 'utm_source',
    webmaster: 'utm_term',
    advcake_params: "advcake_params",
    sendPixel: function (url) {
        var async = true;
        var method = 'GET';
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            try {
                xhr.open(method, url, async);
            } catch (x) {
                return false;
            }
            xhr.send();
            xhr.onreadystatechange = function () {
                return 4 === xhr.readyState;
            };

        }
    },
    senderr: function (err) {
        try {
            var url = 'https://err.br.acstat.com/';
            if (err) {
                url += '?err=' + err.toString();
            }
            var async = true;
            var method = 'GET';
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                try {
                    xhr.open(method, url, async);
                } catch (x) {
                    return false;
                }
                xhr.send();
                xhr.onreadystatechange = function () {
                    return 4 === xhr.readyState;
                };
            }
        } catch (e) {
        }
    },
    getWebmasterId: function () {
        if (advcake_int.get_q('gclid') !== '') {
            return 'google';
        }
        return advcake_int.get_q(advcake_int.webmaster);
    },
    getPartner: function () {
        if (advcake_int.get_q('gclid') !== '') {
            return 'google';
        }
        return advcake_int.get_q(advcake_int.partner);
    },
    getTrackid: function () {
        var trackid = '';
        if (!advcake_int.getCookie('advcake_trackid')) {
            trackid = advcake_int.guid();
            advcake_int.setCookie(advcake_int.trackid, trackid, {
                expires: 2678400, domain: advcake_int.domain, path: "/"
            });
        } else {
            trackid = advcake_int.getCookie('advcake_trackid');
        }
        return trackid;
    },
    init: function () {
        try {
            if(advcake_int.getCookie('cake_ga')){
                if(advcake_int.getCookie('cake_ga')!==advcake_int.getCookie('_ga')){
                    advcake_int.setCookie('cake_ga_t', advcake_int.getCookie('cake_ga')+" => "+advcake_int.getCookie('_ga'), {
                        expires: 2678400,
                        domain: advcake_int.domain,
                        path: "/"
                    });
                }
            }
            advcake_int.setCookie('cake_ga', advcake_int.getCookie('_ga'), {
                expires: 2678400,
                domain: advcake_int.domain,
                path: "/"
            });
        }catch (e) {

        }
        if(advcake_int.getCookie('advcake_query')){
            advcake_int.setCookie("advcake_query", advcake_int.getCookie('advcake_query'), {
                expires: 1800, domain: advcake_int.domain, path: "/"
            });
        }
        if ((advcake_int.get_q('source') !== '' || advcake_int.get_q('utm_source') !== '' || advcake_int.get_q('gclid') !== '')) {
            var querySource = advcake_int.get_q('ranEAID')+ advcake_int.get_q('source')+advcake_int.get_q('utm_source')+advcake_int.get_q('gclid')+advcake_int.get_q('utm_medium')+advcake_int.get_q('utm_campaign')+advcake_int.get_q('utm_content')+advcake_int.get_q('utm_term');

            if(querySource===advcake_int.getCookie('advcake_query')){
                return;
            }
            if(advcake_int.getCookie('cake_popup_trigger')){
                advcake_int.setCookie('cake_popup', 'true', {
                    expires: 2678400,
                    domain: advcake_int.domain,
                    path: "/"
                });
                advcake_int.setCookie('advcake_datetime_bf', advcake_int.getCookie("advcake_datetime_bf_tmp"), {
                    expires: 2678400,
                    domain: advcake_int.domain,
                    path: "/"
                });
            }else{
                advcake_int.setCookie('cake_popup', 'false', {
                    expires: -1,
                    domain: advcake_int.domain,
                    path: "/"
                });
                advcake_int.setCookie('advcake_datetime_bf', "", {
                    expires: -1,
                    domain: advcake_int.domain,
                    path: "/"
                });
            }

            var lastEventOnSite = -1;
            if(advcake_int.getCookie('cake_lastEventOnSite')){
                lastEventOnSite = parseInt((new Date()-new Date(advcake_int.getCookie('cake_lastEventOnSite')))/1000,10);
            }
            advcake_int.setCookie('cake_lastEventOnSite_time', lastEventOnSite, {
                expires: 30*24*60*60,
                domain: advcake_int.domain,
                path: "/"
            });

            advcake_int.setCookie("advcake_query", querySource, {
                expires: 1800, domain: advcake_int.domain, path: "/"
            });
            advcake_int.setCookie("advcake_url", location.href, {
                expires: 2678400, domain: advcake_int.domain, path: "/"
            });
            if(!advcake_int.getCookie('advcake_url')){
                advcake_int.senderr('advcake_url cookie attempt 1');
                setTimeout(function(){if(!advcake_int.getCookie('advcake_url')){
                    advcake_int.senderr('advcake_url cookie attempt 2');
                }},500);
            }
            var trackid = advcake_int.guid();
            advcake_int.setCookie(advcake_int.trackid, trackid, {
                expires: 2678400, domain: advcake_int.domain, path: "/"
            });

        }
    },
    uniqid: function (pr, en) {
        pr = pr || '';
        en = en || false;
        var result;

        this.seed = function (s, w) {
            s = parseInt(s, 10).toString(16);
            return w < s.length ? s.slice(s.length - w) : (w > s.length) ? new Array(1 + (w - s.length)).join('0') + s : s;
        };

        result = pr + this.seed(parseInt(new Date().getTime() / 1000, 10), 8) + this.seed(Math.floor(Math.random() * 0x75bcd15) + 1, 5);

        if (en) result += (Math.random() * 10).toFixed(8).toString();

        return result;
    },
    get_uuai: function () {
        var user_unic_ac_id;
        if (advcake_int.getCookie('user_unic_ac_id') === undefined) {
            user_unic_ac_id = advcake_int.guid();
            advcake_int.setCookie("user_unic_ac_id", user_unic_ac_id, {
                expires: 2678400, domain: advcake_int.domain, path: "/"
            });
        } else {
            user_unic_ac_id = advcake_int.getCookie('user_unic_ac_id');
        }
        return user_unic_ac_id;
    },
    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },
    get_q: function (e) {
        var t = window.location.search;
        t = t.match(new RegExp(e + "=([^&=]+)"));
        return t ? t[1] : '';
    },
    setCookie: function (e, t, n) {
        n = n || {};
        var o = n.expires;
        if ("number" === typeof o && o) {
            var r = new Date();
            r.setTime(r.getTime() + 1e3 * o);
            o = n.expires = r;
        }
        if (o && o.toUTCString) {
            n.expires = o.toUTCString();
        }
        t = encodeURIComponent(t);
        var i = e + "=" + t;
        for (var a in n) {
            i += "; " + a;
            if (!n.hasOwnProperty(a)) {
                continue;
            }
            var c = n[a];
            if (c !== true) {
                i += "=" + c;
            }
        }
        window.document.cookie = i;
    },
    getCookie: function (e) {
        var t = window.document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([.$?*|{}()\[\]\\\/+^])/g, "\\$1") + "=([^;]*)"));
        return t ? decodeURIComponent(t[1]) : void 0;
    },
    send: function () {

        var user_unic_ac_id = advcake_int.get_uuai();
        var referrer = window.document.referrer;
        var hostname = location.href;
        var webmaster_id_ac, campaign_ac, track_data_partner, track_id;


        if (advcake_int.getWebmasterId() !== '') {
            advcake_int.setCookie('advcake_utm_content', advcake_int.getWebmasterId(), {
                expires: 2678400,
                domain: advcake_int.domain,
                path: "/"
            });
            webmaster_id_ac = advcake_int.getWebmasterId();
        } else {
            if (advcake_int.getCookie('advcake_utm_content')) {
                webmaster_id_ac = advcake_int.getCookie("advcake_utm_content");
            } else {
                webmaster_id_ac = '';
            }
        }
        if (advcake_int.getPartner() !== '') {
            advcake_int.setCookie('advcake_utm_campaign', advcake_int.getPartner(), {
                expires: 2678400,
                domain: advcake_int.domain,
                path: "/"
            });
            campaign_ac = advcake_int.getPartner();
        } else {
            if (advcake_int.getCookie('advcake_utm_campaign')) {
                campaign_ac = advcake_int.getCookie("advcake_utm_campaign");
            } else {
                campaign_ac = '';
            }
        }
        if (advcake_int.get_q(advcake_int.advcake_params) !== '') {
            advcake_int.setCookie('advcake_params', advcake_int.get_q(advcake_int.advcake_params), {
                expires: 2678400, domain: advcake_int.domain, path: "/"
            });
            track_data_partner = advcake_int.get_q(advcake_int.advcake_params);
        } else {
            if (advcake_int.getCookie(advcake_int.advcake_params) !== undefined) {
                track_data_partner = advcake_int.getCookie(advcake_int.advcake_params);
            } else {
                track_data_partner = '';
            }
        }

        track_id = advcake_int.getTrackid();

        var track_type_ac = advcake_int.get_q("utm_medium");

        var track_source_ac = '';
        if (advcake_int.get_q('utm_source') || advcake_int.get_q('gclid')) {
            track_source_ac = 'advcake';
        }

        var track_iframe_param = (window === window.top) ? 0 : 1;

        var lastEventOnSite = -1;
        if(advcake_int.getCookie('cake_lastEventOnSite')){
            lastEventOnSite = parseInt((new Date()-new Date(advcake_int.getCookie('cake_lastEventOnSite')))/1000,10);
        }

        var src = advcake_int.url +
            '?sid=' + user_unic_ac_id +
            '&letime=' + lastEventOnSite +
            '&t_tid=' + track_id +
            '&t_dp=' + track_data_partner +
            '&wid=' + webmaster_id_ac +
            '&par=' + campaign_ac +
            '&ref=' + encodeURIComponent(referrer) +
            '&t_t=' + track_type_ac +
            '&t_if=' + track_iframe_param +
            '&t_s=' + track_source_ac +
            '&ih=' + window.innerHeight +
            '&iw=' + window.innerWidth +
            '&if_p=' +
            '&s_w=' + window.screen.width +
            '&s_h=' + window.screen.height +
            '&land=' + encodeURIComponent(hostname);
        advcake_int.sendPixel(src);

    },
    sendPostback: function (objectData) {
        var async = true;
        var method = 'POST';
        var xhr = new XMLHttpRequest();

        var boundary = String(Math.random()).slice(2);
        var boundaryMiddle = '--' + boundary + '\r\n';
        var boundaryLast = '--' + boundary + '--\r\n';

        var body = ['\r\n'];
        console.log(objectData);
        for (var key in objectData) {
            if (!objectData.hasOwnProperty(key)) {
                continue;
            }
            body.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + objectData[key] + '\r\n');
        }

        body = body.join(boundaryMiddle) + boundaryLast;

        if ("withCredentials" in xhr) {
            try {
                xhr.open(method, advcake_int.postbackUrl, async);
                xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
            } catch (x) {
                return false;
            }
            xhr.send(body);
            xhr.onreadystatechange = function () {
                return 4 === xhr.readyState;
            };

        }
    },
    prepareData: function (data) {
        return JSON.stringify(data);
    },
    checkOrd: function () {

        window.advcake_order_id = window.advcake_order_id || window.ad_order;
        window.advcake_order_price = window.advcake_order_price || window.ad_amount;
        if (typeof window.advcake_order_id !== 'undefined' && window.advcake_order_id !== '') {
            advcake_int.send_ord(window.advcake_order_id, window.advcake_order_price, '', []);
        }

        window.advcake_order = function (ord_id, ord_price) {
            window.advcake_order_id = ord_id;
            window.advcake_order_price = ord_price;
            advcake_int.send_ord(ord_id, ord_price);
        };
    },
    send_ord: function (o_id, o_price, coupon, basket) {

        var trackid = advcake_int.getTrackid();

        var webmaster_id_ac = '';

        if (advcake_int.getCookie('advcake_utm_content')) {
            webmaster_id_ac = advcake_int.getCookie("advcake_utm_content");
        } else {
            webmaster_id_ac = '';
        }

        var campaign_ac = '';

        if (advcake_int.getCookie('advcake_utm_campaign')) {
            campaign_ac = advcake_int.getCookie("advcake_utm_campaign");
        } else {
            campaign_ac = '';
        }

        var orderId = o_id;
        var orderPrice = o_price || 0;
        var ordId = advcake_int.get_q('og');

        var dataAdvcake = "";
        try {
            dataAdvcake = JSON.stringify(window.advcake_data || []);
        } catch (e) {

        }

        var dataLayer = "";
        try {
            dataLayer = JSON.stringify(window.dataLayer || []);
        } catch (e) {

        }
        var cookies = "";
        try {
            cookies = window.document.cookie;
        } catch (e) {

        }

        var history = "";

        try {
            history = localStorage.cake_history;
        } catch (e) {

        }
        var postbackData = {
            id: ordId || orderId,
            price: orderPrice,
            basket: advcake_int.prepareData(basket),
            url: advcake_int.getCookie("advcake_url"),
            trackid: trackid,
            coupon: coupon,
            auto_input: advcake_int.getCookie('cake_coupon') || false,
            coupons_list: advcake_int.getCookie('cake_coupons_array') || '',
            popup: advcake_int.getCookie('cake_popup') || false,
            last_event_time: advcake_int.getCookie('cake_lastEventOnSite_time') || -1,
            datetime: (new Date()).toISOString(),
            datetime_ai: advcake_int.getCookie('advcake_datetime_ai'),
            datetime_bf: advcake_int.getCookie('advcake_datetime_bf'),
            datetime_ip: advcake_int.getCookie('advcake_datetime_ip'),
            shipping: '',
            gat: advcake_int.getCookie('cake_ga_t'),
            curga: advcake_int.getCookie('_ga'),
            partner_source: campaign_ac,
            webmaster: webmaster_id_ac,
            history: history,
            dataLayer: dataLayer,
            dataAdvcake: dataAdvcake,
            cookies: cookies
        };

        advcake_int.sendPostback(postbackData);
    }

};
advcake_int.init();

(function () {
    advcake_int.send();
    advcake_int.checkOrd();
    try {
        document.addEventListener("mousemove",function(e){

            advcake_int.setCookie('cake_lastEventOnSite', (new Date()).toISOString(), {
                expires: 30*24*60*60,
                domain: advcake_int.domain,
                path: "/"
            });
        });
        var cake_observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                for(var node of mutation.addedNodes){
                    try {
                        if(node && node.nodeName==='DIV' && node.parentNode.nodeName==='BODY'){
                            node.addEventListener('click', function () {
                                advcake_int.setCookie('cake_popup_trigger', 'true', {
                                    expires: 120,
                                    domain: advcake_int.domain,
                                    path: "/"
                                });
                                advcake_int.setCookie('advcake_datetime_bf_tmp', (new Date()).toISOString(), {
                                    expires: 2678400,
                                    domain: advcake_int.domain,
                                    path: "/"
                                });
                            });
                        }
                    }catch (e) {

                    }

                }
            });
        });
        cake_observer.observe(document, {
            childList: true,
            subtree: true
        });
    }catch (e) {

    }
})();

window.advcake_data = window.advcake_data || [];
window.advcake_data.push = function (data) {
    try {
        switch (parseInt(data.pageType, 10)) {
            case 6: //Thanks for order
                if (typeof(data.orderInfo) !== 'undefined') {
                    var orderId = data.orderInfo.id;
                    var totalPrice = data.orderInfo.totalPrice;
                    var coupon = data.orderInfo.coupon;
                    var basket = data.basketProducts;
                    advcake_int.send_ord(orderId, totalPrice, coupon, basket);
                }
                break;
            default:
                break;
        }
    } catch (e) {
    }

};
if (typeof window.advcake_data === 'object' && typeof window.advcake_data.forEach !== 'undefined') {
    window.advcake_data.forEach(function (data) {
        if (typeof data === 'object') {
            window.advcake_data.push(data);
        }
    });
}
