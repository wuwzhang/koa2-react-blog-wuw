function _isEmail(str) {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str);
}

function _checkEmail(email) {
  // console.log('checkEmail', email)
  function _getEmailAddr(suffixe) {
    if (suffixe === "163.com") {
      return "mail.163.com";
    } else if (suffixe === "vip.163.com") {
      return "vip.163.com";
    } else if (suffixe === "126.com") {
      return "mail.126.com";
    } else if (
      suffixe === "qq.com" ||
      suffixe === "vip.qq.com" ||
      suffixe === "foxmail.com"
    ) {
      return "mail.qq.com";
    } else if (suffixe === "gmail.com") {
      return "mail.google.com";
    } else if (suffixe === "sohu.com") {
      return "mail.sohu.com";
    } else if (suffixe === "tom.com") {
      return "mail.tom.com";
    } else if (suffixe === "vip.sina.com") {
      return "vip.sina.com";
    } else if (suffixe === "sina.com.cn" || suffixe === "sina.com") {
      return "mail.sina.com.cn";
    } else if (suffixe === "tom.com") {
      return "mail.tom.com";
    } else if (suffixe === "yahoo.com.cn" || suffixe === "yahoo.cn") {
      return "mail.cn.yahoo.com";
    } else if (suffixe === "tom.com") {
      return "mail.tom.com";
    } else if (suffixe === "yeah.net") {
      return "www.yeah.net";
    } else if (suffixe === "21cn.com") {
      return "mail.21cn.com";
    } else if (suffixe === "hotmail.com") {
      return "www.hotmail.com";
    } else if (suffixe === "sogou.com") {
      return "mail.sogou.com";
    } else if (suffixe === "188.com") {
      return "www.188.com";
    } else if (suffixe === "139.com") {
      return "mail.10086.cn";
    } else if (suffixe === "189.cn") {
      return "webmail15.189.cn/webmail";
    } else if (suffixe === "wo.com.cn") {
      return "mail.wo.com.cn/smsmail";
    } else if (suffixe === "139.com") {
      return "mail.10086.cn";
    } else {
      return "";
    }
  }

  if (email) {
    let suffixe = email.split("@")[1],
      addr = _getEmailAddr(suffixe);

    window.location.href = "https://" + (addr ? addr : "www.baidu.com");
  }
}

function _getPageWidth() {
  let pageWidth = window.innerWidth;

  if (typeof pageWidth !== "number") {
    if (document.compatMode === "CSS1Compat") {
      pageWidth = document.documentElement.clientWidth;
    } else {
      pageWidth = document.body.clientWidth;
    }
  }

  return pageWidth;
}

function _getPageHeight() {
  let pageHeight = window.innerHeight;

  if (typeof pageHeight !== "number") {
    if (document.compatMode === "CSS1Compat") {
      pageHeight = document.documentElement.clientHeight;
    } else {
      pageHeight = document.body.clientHeight;
    }
  }

  return pageHeight;
}

function _getDocHeight() {
  let body = document.body,
    html = document.documentElement;

  let height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  return height;
}

module.exports = {
  _isEmail,
  _checkEmail,
  _getPageWidth,
  _getPageHeight,
  _getDocHeight
};
