(function () {
    var studied = true;
    var els = document.evaluate("//ul[@class='new_demoul']/li", document, null, XPathResult.ANY_TYPE, null);
    while (el = els.iterateNext()) {
        span_el = document.evaluate(".//span", el, null, XPathResult.ANY_TYPE, null).iterateNext();
        text = span_el.textContent;
        if (RegExp('已完成').test(text) && RegExp('100').test(text) == false) {
            a_el = document.evaluate(".//a", el, null, XPathResult.ANY_TYPE, null).iterateNext();
            console.log('play last section')
            studied = false;
            a_el.click();
            setTimeout(function() {
                video = document.querySelector("video");
                var duration = video.duration;
                video.currentTime = duration - 1;
            }, 2000);
            break;
        };
    };
    if (studied == true) {
        setTimeout(function(){
            console.log("this video has studied, goto next");
            window.location.href='https://www.bjjnts.cn/userCourse';
        }, 5000);
    };
})();

times = 0;

function autoClick() {

    // 自动点击确定
    var ok_el = document.querySelector("a.layui-layer-btn0");
    if (ok_el != null) {
        console.log("click 确认");
        ok_el.click();
        times = 0;
    };

    // 自动人脸识别
    var face_el = document.querySelector("button#face_startbtn");
    // 组合条件
    if (face_el != null && face_el.offsetParent != null && RegExp('开始检测|重新验证').test(face_el.textContent)) {
        if (times < 2) {
            console.log("click face");
            face_el.click();
            times += 1;
        } else {
            chrome.storage.local.get('face_reload', function(result) {
                var face_reload = result['face_reload'];
                console.log('face_reload: ' + face_reload);
                if (face_reload == "0") {
                    console.log('等待人脸识别...');
                } else {
                    console.log('刷新绕开人脸认证');
                    location.reload();
                };
            })
        };
    };

    // 点击下一节
    if (video.currentTime == video.duration) {
        // curr_el = document.querySelector("div .course_study_sonmenu.on");
        // next_el = curr_el.nextElementSibling;
        el = el.nextElementSibling;
        if (el != null) {
            var a_el = document.evaluate(".//a", el, null, XPathResult.ANY_TYPE, null).iterateNext();
            console.log("click next section");
            a_el.click();
            times = 0;
        } else {
            console.log("goto userCourse");
            window.location.href='https://www.bjjnts.cn/userCourse';
        };
    };
};

function job() {
    jobId = setInterval(autoClick, 5000);
    console.log("job id" + " " + jobId);
};

job();