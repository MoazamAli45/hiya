
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.0dcdca72d0556b3b2393.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/6797.latest.en.ad0ee70b06bc9854ca6b.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/5817.latest.en.5b8f3a488f62c86e1062.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/5816.latest.en.62966691cce79d1ce69d.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.0f5116d8816b8302bd5f.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/648.latest.en.f31f31ea19195adc3da4.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/Information.latest.en.8401fbcfef97931e0815.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/6797.latest.en.4d537816ff9556bf1225.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.8bb004feb2aa35e02d5d.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/9119.latest.en.74b405ae67e1ff3740d9.css"];
      var fontPreconnectUrls = ["https://fonts.shopifycdn.com"];
      var fontPrefetchUrls = ["https://fonts.shopifycdn.com/avenir_next/avenirnext_n4.7fd0287595be20cd5a683102bf49d073b6abf144.woff2?h1=aGl5YWhlYWx0aC5jb20&hmac=e2b83891ade9b19dad0f9b72b68f666ce503c1355407d90966e4454020a45102","https://fonts.shopifycdn.com/avenir_next/avenirnext_n7.8cfc646eab1e39e2d81a26284624600ccae49d55.woff2?h1=aGl5YWhlYWx0aC5jb20&hmac=b5a6b294145cd99160068a8e0677ed8c2a66fb8295e4abeda1a722444c1f2574"];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0255/3249/8001/files/Hiya-Health-Logo_x320.png?v=1704802430"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        })();
      }

      function onLoaded() {
        preconnectAssets();
        prefetchAssets();
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  