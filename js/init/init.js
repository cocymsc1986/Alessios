//conditionizr.config({
//    assets: '/conditionizr/',
//    tests: {
//        'chrome': ['style', 'script', 'class'],
//        'firefox': ['style', 'script', 'class'],
//        'ie8': ['style', 'script', 'class'],
//        'ie9': ['style', 'script', 'class'],
//        'ie10': ['style', 'script', 'class'],
//        'ie10touch': ['style', 'script', 'class'],
//        'ie11': ['style', 'script', 'class'],
//        'ios': ['style', 'script', 'class'],
//        'retina': ['style', 'script', 'class'],
//        'safari': ['style', 'script', 'class']
//    }
//});

$(document).ready(function() {
    if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        if($('#skrollr-body').length > 0) {
            var s = skrollr.init({
                forceHeight: false
            })
        }
    }
});