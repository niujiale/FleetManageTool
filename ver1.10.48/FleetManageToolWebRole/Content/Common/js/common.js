$(document).ready(function () {
    HrefFlag = 0;
    WaitHrefUrl = "";
    /*
    var clientwidth = document.body.clientWidth;
    var left_distance = (clientwidth - 1047) / 2;
    document.getElementById("body_position").style.left = left_distance + "px";
    */
    var x = document.getElementById("u_right").scrollHeight;
    if (x != 0) {
        document.getElementById("u_left").style.height = x + "px";
        document.getElementById("u_right").style.height = x + "px";
    }
    
    
    hrefDashaboard();
    hrefVehicles();
    hrefGeoFence();
    hrefReports();
    hrefSetting();
    hreflogout();

    $(window).bind("beforeunload", function () {
        if (HrefFlag > 0) {
            return LanguageScript.common_DiaConEdit;
        }
    });
});

$.ajaxSetup({
    statusCode: {
        499: function (data) {
            window.location.reload();
        },
        599: function (data) {
            alert(LanguageScript.page_common_Role_Change);
            window.location.href = "/";
        }
        ,699: function (data) {
            alert(LanguageScript.page_common_tenant_inactive);
            window.location.href = "/";
        },
        799: function (data) {
            alert(LanguageScript.page_common_tenant_deleted);
            window.location.href = "/";
        }
    }
});

//取得当前URL上的参数
function getUrlParam(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var url = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (url != null) {
            return unescape(decodeURI(url[2]));
        } else {
            return null; //返回参数值
        }
}
// 判断数组中重复数据
function getRepeat(arr) {

    var arrSort = arr.sort();
    var returnVal = -1;
    $.each(arrSort, function (index, val) {

        if (index == arrSort.length) {

            return false;
        }
        //fengpan 20140708
        if ((arrSort[index] == arrSort[index + 1]) && "" != arrSort[index]) {

            returnVal = $.inArray(arrSort[index], arr);
            // 退出each循环
            return false;
        }
    });

    return returnVal;
}

// 左侧5个迁移
function hreflogout() {
    $("#title_logout").unbind();
    $("#title_logout").click(function () {
        WaitHrefUrl = localhostUrl() + "/Account/Logout";
        if (1 <= HrefFlag) {
            user_dialog_href();
            return;
        }
        trans();

        location.href = WaitHrefUrl ;
    });
}
function hrefDashaboard() {
    $("#left_dashboard").unbind();
    $("#left_dashboard").click(function () {
        WaitHrefUrl = localhostUrl() + "/Dashboard/Home";
        if (1 <= HrefFlag) {
            user_dialog_href();
            return;
        }
        trans();
        
        location.href = WaitHrefUrl;
    });
}
function hrefVehicles() {
    $("#left_Vehicles").unbind();
    $("#left_Vehicles").click(function () {
        WaitHrefUrl = localhostUrl() + "/Vehicles/Index?tabNum=0";
        if (1 <= HrefFlag) {
            user_dialog_href();
            return;
        }
        trans();
        
        location.href = WaitHrefUrl;
    });
}
function hrefGeoFence() {
    $("#left_GeoFence").unbind();
    $("#left_GeoFence").click(function () {
        WaitHrefUrl = localhostUrl() + "/GeoFence/Landing";
        if (1 <= HrefFlag) {
            user_dialog_href();
            return;
        }
        trans();
        
        location.href = WaitHrefUrl;
    });
}
function hrefReports() {
    $("#left_Reports").unbind();
    $("#left_Reports").click(function () {
        WaitHrefUrl = localhostUrl() + "/Export/ReportIndex";
        if (1 <= HrefFlag) {
            user_dialog_href();
            return;
        }
        trans();
        
        location.href = WaitHrefUrl;
    });
}
function hrefSetting() {
    $("#left_settings").unbind();
    $("#left_settings").click(function () {
        WaitHrefUrl = localhostUrl() + "/Setting/Tenant";
        if (1 <= HrefFlag) {
            user_dialog_href();
            return;
        }
        trans();
        
        location.href = WaitHrefUrl;
    });
}

localhostUrl = function () {
    var companyID = GetCompanyID();
    var NowUrl = "http://" + window.location.host + "/" + companyID;
    return NowUrl;
}

function SetLeftBarHeight(height) {
    if (height != 0) {
        document.getElementById("u_left").style.height = height + "px";
        document.getElementById("u_right").style.height = height + "px";
    }
    
}


function ChangeLocationTime() {
    var myDate = new Date();
    $("#title_update_time")[0].innerHTML = myDate.format("yyyy-MM-dd hh:mm")
}
function ChangeLeft(id) {
    $("#common_setting_cover").hide();
    $("#common_report_cover").hide();
    $("#common_geofence_cover").hide();
    $("#common_vehicle_cover").hide();
    //$("#common_dashboard_cover").hide();
    switch (id) {
        case "common_setting_cover":
            $("#common_setting_cover").show();
            break;
        case "common_report_cover":
            $("#common_report_cover").show();
            break;
        case "common_geofence_cover":
            $("#common_geofence_cover").show();
            break;
        case "common_vehicle_cover":
            $("#common_vehicle_cover").show();
            break;
        //20140304caoyandong
        //case "common_dashboard_cover":
        //    $("#common_dashboard_cover").show();
        //    break;
        default:
            break;
    }
}

function SetBtnToneDown(tonedownID) {
    if ("string" == typeof (tonedownID)) {                               //String Type
        $("#" + tonedownID).unbind();
        $("#" + tonedownID).css("cursor", "default");
        $("#" + tonedownID).css("background-color", "rgb(177, 172, 172)");
    } else if (true == tonedownID instanceof Array) {                     //Array 数组类型
        for (var i = 0; i < tonedownID.length; i++) {
            $("#" + tonedownID[i]).unbind();
            $("#" + tonedownID[i]).css("cursor", "default");
            $("#" + tonedownID[i]).css("background-color", "rgb(177, 172, 172)");
        }
    }
}
function SetBtnToneUp(tonedownID) {
    if ("string" == typeof (tonedownID)) {                               //String Type
        $("#" + tonedownID).css("cursor", "pointer");
        $("#" + tonedownID).css("background-color", "#FFF");
    } else if (true == tonedownID instanceof Array) {                     //Array 数组类型
        for (var i = 0; i < tonedownID.length; i++) {
            $("#" + tonedownID[i]).css("cursor", "default");
            $("#" + tonedownID[i]).css("background-color", "rgb(177, 172, 172)");
        }
    }
}

//判断是否为IE8
var JudgeIE8 = function () {
    var flag = 0;
    if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
        flag = 1;
    }
    return flag;
}

//dialog 迁移提示
//wenti
function user_dialog_href() {

    var text = LanguageScript.common_DiaConEdit;

    //20140308caoyandong-jquery
    $(".user_error")[0].innerHTML = '<p style="font-family:Microsoft YaHei;font-size:11pt;text-align:center;">' + text + '</p>';
    $(function () {
        $(".user_error").dialog({
            resizable: false,
            height: 140,
            width: 280,
            modal: true,
            position: ['center', 250],
            buttons: {
                "确定": function () {
                    $("#dialog").remove();
                    HrefFlag = 0;
                    location.href = WaitHrefUrl;
                    $(this).dialog("close");
                },
                取消: function () {
                    $(this).dialog("close");
                    ClearSession();
                }
            }
        });
    });
    //$("#common_user_back").unbind();
    //$("#common_user_sure").unbind();
    //$("#common_user_back").click(function () {
    //    $("#common_dialog_background").remove();
    //    $("#common_dialog").remove();
    //});
    //$("#common_user_sure").click(function () {
    //    $("#common_dialog_background").remove();
    //    $("#common_dialog").remove();
        //location.href = WaitHrefUrl;
    //});
}

//chenyangwen 2014/3/1
function showtitle(obj) {
    var id = obj.id;
    var obj = document.getElementById(id);
    if (undefined != obj.childNodes[obj.selectedIndex]) {
        var title = obj.childNodes[obj.selectedIndex].text;
        obj.title = title;
    } else {
        obj.title = "";
    }
}

//字符串转换为Unicode
function unicode(s) {
    var len = s.length;
    var rs = "";
    for (var i = 0; i < len; i++) {
        var k = s.substring(i, i + 1);
        rs += (i == 0 ? "" : "%") + s.charCodeAt(i);
    }
    return rs;
}

//Unicode转换为字符串
function runicode(s) {
    var k = s.split("%");
    var rs = "";
    for (i = 0; i < k.length; i++) {
        rs += String.fromCharCode(k[i]);
    }
    return rs;
}
//chenyangwen 2014/3/1
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "D+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "H+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

var parseLocalDate = function (date) {
    var tempDate = new Date(parseInt(alertHoldjson[i].testDate.replace("/Date(", "").replace(")/", ""), 10));
    var timezoneOffset = new Date().getTimezoneOffset() / 60 * -1;
    tempDate.setHours(tempDate.getHours() + timezoneOffset);
    return tempDate;
}
//chenyangwen 20140408
//时间转换
var transTime = function (time) {
    if (time != null) {
        var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
        return date
    }
    return "";
}

var formatSeconds = function (value) {
var theTime = Number(value);
        var theTime1 = 0;
        var theTime2 = 0;
        //alert(theTime);
        if(theTime > 60) {
        	theTime1 = Number(theTime/60);
        	theTime = Number(theTime%60);
        	//alert(theTime1+"-"+theTime);
        	if(theTime1 > 60) {
        		theTime2 = Number(theTime1/60);
        		theTime1 = Number(theTime%60);
        	}
        }
        var result = "" + theTime + LanguageScript.common_Second;
        if(theTime1 > 0) {
            result = "" + parseInt(theTime1) + LanguageScript.common_Minute + result;
        }
        if(theTime2 > 0) {
            result = "" + parseInt(theTime2) + LanguageScript.common_Hour + result;
        }
        return result;
}


//mabiao 20140404
//trip location 写入DB
//url:对应url
//tripGUID:trip对应的GUID
//flag: 0为离开地点、1为到达地点
function LocationWriteToDB(url, tripGUID, flag, address) {
    return;
    var CompanyID = GetCompanyID();
    if (0 == flag) {
        var flagTime = "start";
    } else if (1 == flag) {
        var flagTime = "end";
    }
    
    $.ajax({
        type: "POST",
        url: "/" + CompanyID + url,
        data: { tripGUID: tripGUID, flag: flagTime, address: address },
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        success: function (msg) {
        },
        error: function () {
        }
    });
}


//Distance  By Coordinates
//mabiao 
//20140408
//进行经纬度转换为距离的计算

function Rad(d) {
    return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}
//计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
function GetDistance(lat1, lng1, lat2, lng2) {

    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10; //输出为米
    s=s.toFixed(0);
    return s;
}

//根据围栏半径选择合适的地图半径比例
function getZoomByRadius(radius) {

    var zoomByRadiusTable = [
        { r: 0, zoom: 18 },
        { r: 200, zoom: 17 },
        { r: 400, zoom: 16 },
        { r: 800, zoom: 15 },
        { r: 1500, zoom: 14 },
        { r: 3000, zoom: 13 },
        { r: 6000, zoom: 12 },
        { r: 12000, zoom: 11 },
        { r: 24000, zoom: 10 },
        { r: 48000, zoom: 9 },
        { r: 96000, zoom: 8 },
        { r: 192000, zoom: 7 },
        { r: 384000, zoom: 6 },
        { r: 768000, zoom: 5 },
        { r: 1536000, zoom: 4 },
        { r: 1000000000, zoom: 3 }
    ];

    var zoom = 14;

    for (var i = 0; i < zoomByRadiusTable.length; i++) {
        if (radius >= zoomByRadiusTable[i].r && radius < zoomByRadiusTable[i + 1].r) {
            zoom = zoomByRadiusTable[i].zoom;
        }
    }

    return zoom;
}

//如果地址字符串中包含“路”，“街”，两个字；那么返回的缩放级别为16(道路级比例)，
//如果地址字符串中包含“区”字；那么返回的缩放级别为14(区级别)，
//否则返回11(市级比例)
function getZoomlvlByAddress(address1, address2) {
    var zoom = 11;

    if ((address1) && (address1.indexOf("路") >= 0 || address1.indexOf("街") >= 0)) {
        zoom = 16;
    } else if ((address2) && (address2.indexOf("路") >= 0 || address2.indexOf("街") >= 0)) {
        zoom = 16;
    } else if ((address1) && (address1.indexOf("区") >= 0)) {
        zoom = 14;
    } else if ((address2) && (address2.indexOf("区") >= 0)) {
        zoom = 14;
    } else if ((address1) && (address1.indexOf("省") >= 0)) {
        zoom = 7;
    } else if ((address2) && (address2.indexOf("省") >= 0)) {
        zoom = 7;
    } else if ((address1) && (address1.indexOf("国") >= 0)) {
        zoom = 4;
    } else if ((address2) && (address2.indexOf("国") >= 0)) {
        zoom = 4;
    }
    else {
        zoom = 11;
    }
    return zoom;
}

//给普通地点添加marker
function addMarkerForCommonAddress(BMapObj, lng, lat) {
    var marker = new BMap.Marker(new BMap.Point(lng, lat));  // 创建标注
    BMapObj.get_mapObj().addOverlay(marker);
    return marker;
}
//组名合并
function mergeGroupforReport() {
    var firstRow = $(".vehicles_groupName");
    var groupsCnts = new Array();
    var groupCnt = 0;
    var j = 0;
    var cnt = 1;
    for (var i = 0; i < firstRow.length - 1; i++) {
        if (firstRow[i].innerHTML == firstRow[i + 1].innerHTML) {
            cnt++;
            continue;
        }
        else {
            groupCnt++;
            groupsCnts[j] = cnt;
            cnt = 1;
            j++;
        }
    }
    groupsCnts[j] = cnt;
    var removeNum = 1;
    for (var i = 0; i < groupsCnts.length; i++) {
        $("#" + $(".vehicles_groupName")[i].id).attr("rowspan", groupsCnts[i]);
        $("#" + $(".vehicles_groupName")[i].id).css("border-right", "1px solid #ddd");
        for (var j = 1; j < groupsCnts[i]; j++) {
            firstRow[removeNum + j - 1].parentNode.removeChild(firstRow[removeNum + j - 1]);
            //firstRow[removeNum+j-1].remove();
        }
        removeNum += groupsCnts[i];
    }
}


//清空session
function ClearSession() {
    var CompanyID = GetCompanyID();
    $.ajax({
        type: "POST",
        url: "/" + CompanyID + "/Dashboard/CleanSearchPara",
        contentType: "application/x-www-form-urlencoded",
        success: function (msg) {
        },
        error: function () {
        }
    });
}


var baiduLocationForTrip = function (adr) {
    var adrArray = adr.split(",");
    var area = "";
    var flag = adr.indexOf("*");
    for (var i = 0; i < adrArray.length; i++) {
        if (0 == i && adrArray.length == 1) {
            return adr;
        }
        if (0 != i) {
            area += adrArray[i];
        }
    }
    if (flag == 0) {
        area = "*" + area;
    }
    return area;
}

function CheckDatepicker(datepicker) {
    var check = false;
    var temp = new Date(datepicker);
    if (
        ((temp.getFullYear() % 4 == 0 && temp.getFullYear() % 100 != 0))
        || temp.getFullYear() % 400 == 0
        )
    {
        if ((temp.getMonth() + 1) == 2)
        {
            if (temp.getDate() > 29 || temp.getDate() < 1)
            {
                    check = false;
        			return check;
            }
            else {
                check = true;
            }
        } else
        {
            if (temp.getDate() > 28 || temp.getDate() < 1)
            {
                    check = false;
        			return check;
            }
            else {
                check = true;
            }
        }
    }

    if ((temp.getMonth() + 1) == 1 ||
        (temp.getMonth() + 1) == 3 ||
        (temp.getMonth() + 1) == 5 ||
        (temp.getMonth() + 1) == 7 ||
        (temp.getMonth() + 1) == 8 ||
        (temp.getMonth() + 1) == 10 ||
        (temp.getMonth() + 1) == 12
        )
    {
        if (temp.getDate() > 31 || temp.getDate() < 1) {
                check = false;
        		return check;
            }
            else {
                check = true;
                }
    } else
    {
        if (temp.getDate() > 30 || temp.getDate() < 1)
        {
                check = false;
        		return check;
        } else
        {
                check = true;
        }
    }
    if ((temp.getMonth() + 1) > 12 || (temp.getMonth() + 1) < 1)
    {
        check = false;
        return check;
    }
    return check;
}
function datepickerforTip(text) {
    $(".datepickerTip").html('<p style="font-family:Microsoft YaHei;font-size:11pt;text-align:center;">' + text + '</p>');
    $("#datepickerTip").dialog({
        height: 140,
        resizable: false,
        autoOpen: false,
        width: 280,
        modal: true,
        position: ['center', 250],
        draggabled: true,
        buttons: {
            "确定": function () {
                $("#datepickerTip").dialog("close");
            }
        }
    });
}
function StartDateCheck(startdate, enddate) {
    var today = new Date();
    var endday = new Date();
    var tempmonth = "";
    var tempday = "";
    if ((today.getMonth() + 1) < 10) {
        tempmonth = "/0" + (today.getMonth() + 1);
    } else {
        tempmonth = "/" + (today.getMonth() + 1);
    }
    if (endday.getDate() < 10) {
        tempday = "/0" + endday.getDate();
    } else {
        tempday = "/" + endday.getDate();
    }
    var endday = endday.getFullYear() + tempmonth + tempday;
    if (Date.parse(startdate) > Date.parse(enddate)) {
        return 0;
    } else if (Date.parse(enddate) > Date.parse(endday)) {
        return 1;
    } else {
        return 2;
    }

}
