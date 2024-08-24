$(document).ready(function() {
        if (window.matchMedia("(max-width: 767px)").matches) {
			jQuery('.zero-plastic-sec .image').insertAfter('.zero-plastic-sec .inner .contnet h2');
			jQuery('.optimized-for-freshness-sec .inner .image').insertAfter('.optimized-for-freshness-sec h2');
			jQuery('.teaches-healthy-habits-sec .inner .image').insertAfter('.teaches-healthy-habits-sec h2');
        }
    });