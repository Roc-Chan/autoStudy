function goto() {
    var li_xpath = "//ul[@class='user_courselist']/li";
    var li_els = document.evaluate(li_xpath, document, null, XPathResult.ANY_TYPE, null);
    while (li_el = li_els.iterateNext()) {
        percent_el = document.evaluate(".//span[@class='study_complete_percent']", li_el, null, XPathResult.ANY_TYPE, null).iterateNext();
        text = percent_el.textContent.trim();
        if (text != '100%') {
            a_el = document.evaluate(".//a", li_el, null, XPathResult.ANY_TYPE, null).iterateNext();
            console.log('click href')
            a_el.click();
            break;
        };
    };
};

chrome.storage.local.get('auto_play', function(result) {
    auto_play = result['auto_play'];
    console.log('auto_play: ' + auto_play);
    if (auto_play == "1") {
        goto();
    } else {
        console.log('请手动选择课程播放');
    }
});