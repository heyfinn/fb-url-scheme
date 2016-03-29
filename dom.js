(function() {
  var url = window.location.href,
    host = window.location.host,
    isFb = ("www.facebook.com" === host) ? true : false,
    isFbProfile,
    isFbPage,
    isSupportedFb, //is under fb domain but not profile or page
    notValidFbWarn = "Please go to profile or page url!",
    wrongUrlWarn = "Sorry this domain is not in our service.",
    profileNode = document.querySelector("#pagelet_timeline_main_column"),
    pageNode = document.getElementById("pagelet_page_above_header");

  //initial some fb flags
  if (isFb) {
    try {
      //isFbProfile
      if (profileNode.dataset.gt) {
        isFbProfile = true;
        isFbPage = false;
        isSupportedFb = true;
        //isFbPage
      } else if (pageNode) {
        isFbProfile = false;
        isFbPage = true;
        isSupportedFb = true;
      }
      //other scenario
    } catch (e) {
      isFbProfile = false;
      isFbPage = false;
      isSupportedFb = false;
    }
  }

  function getFbId() {
    var result = '';
    if (isFbProfile) {
      result = JSON.parse(profileNode.dataset.gt).profile_owner;
      return result;
    } else if (isFbPage) {
      result = pageNode.nextSibling.getAttribute("id").replace("PageHeaderPageletController_", "");
      return result;
    } else if (isFb && !isSupportedFb) {
      result = notValidFbWarn;
      return result;
    } else {
      result = wrongUrlWarn;
      return result;
    }
  }

  //send fb id or wrongUrlWarn to popup.html
  chrome.runtime.sendMessage({
    isFb: isFb,
    isFbProfile: isFbProfile,
    isFbPage: isFbPage,
    isSupportedFb: isSupportedFb,
    result: getFbId(),
  }, function() {
    console.log('message sent!');
  });
})();
