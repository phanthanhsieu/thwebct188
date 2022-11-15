// Bai 1
function doSearch() {
    var frm = document.forms["frm-search"];
    if(frm.words.value.length>0){
        frm.submit();
        return true;
    }
    return false;
}

function checkKeySearch(event){
    let key = event.which;
    if(key==13){
        doSearch();
    }
}

function showSearch(){
    var url = new URL(window.location);
    var ws = url.searchParams.get("words");
    document.getElementById('searchDetails').innerHTML="<h1>Từ khóa cần tìm: </h1>"+"<b>"+ws+"</b>";
}



// Bai 2
// Trang dang nhap
function loginValidation(frm){
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(emailReg.test(frm.email.value)==false){
        alert('Vui lòng nhập lại email!');
        frm.email.focus();
        return false;
    } else if(frm.pass.value.length<8){
        alert('Mật khẩu phải từ 8 ký tự!');
        frm.pass.focus();
        return false;
    } else {
        alert('Bạn đăng nhập thành công!');
        return true;
    }
}

// Trang dang ky
function registerValidation(frm) {
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(emailReg.test(frm.email.value)==false){
        alert('Vui lòng nhập lại email!');
        frm.email.focus();
        return false;
    } else if(frm.pass.value.length<8){
        alert('Mật khẩu phải từ 8 ký tự!');
        frm.pass.focus();
        return false;
    } else if(frm.pass1.value.length<8){
        alert('Mật khẩu phải từ 8 ký tự!');
        frm.pass1.focus();
        return false;
    } else {
        alert('Bạn đăng ký thành công!');
        return true;
    }
}

// Trang lien he
function contactValidation(frm){
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(frm.user.value.length<4){
        alert('Vui lòng nhập lại tên từ 4 ký tự!');
        frm.user.focus();
        return false;
    } else if(emailReg.test(frm.email.value)==false){
        alert('Vui lòng nhập lại email!');
        frm.email.focus();
        return false;
    } else if(frm.content.value.length<10){
        alert('Nội dung từ 10 ký tự!')
        frm.content.focus();
        return false;
    } else {
        alert('Góp ý thành công!');
        return true;
    }
}

// Bai 3
var itemList={
    "sp001":{ "name":"Sữa Chua Vị Kiwi", 
    "price":21000, 
    "photo":"images/sanpham/kiwi.jpg"}, 
    "sp002":{ "name":"Sữa Chua Vị Xoài", 
    "price":22000, 
    "photo":"images/sanpham/mango.jpg"}, 
    "sp003":{ "name":"Sữa Chua Vị Dưa lưới", 
    "price":23000, 
    "photo":"images/sanpham/cantaloupe.jpg"}, 
    "sp004":{ "name":"Sữa Chua Vị Mâm Xôi", 
    "price":24000, 
    "photo":"images/sanpham/blackberry.jpg"}, 
    "sp005":{ "name":"Sữa Chua Vị Dâu Tây", 
    "price":25000, 
    "photo":"images/sanpham/strawberry.jpg"}, 
    "sp006":{ "name":"Sữa Chua Vị Việt Quất", 
    "price":26000, 
    "photo":"images/sanpham/blueberry.jpg"}, 
    "sp007":{ "name":"Sữa Chua Vị Bưởi", 
    "price":27000, 
    "photo":"images/sanpham/grapes.jpg"}, 
    "sp008":{ "name":"Sữa Chua Vị Táo Xanh", 
    "price":28000, 
    "photo":"images/sanpham/green-apple.jpg"}, 
    "sp009":{ "name":"Sữa Chua Vị Dứa", 
    "price":29000, 
    "photo":"images/sanpham/pineapple.jpg"} 
    }; 


// Add cart
function addCart(code) {
    var number = parseInt(document.getElementById(code).value);
    var name = itemList[code].name;
    if(number==0){
        return;
    }
    if(typeof localStorage[code]==="undefined") {
        window.localStorage.setItem(code,number);
    } else {
        var current=parseInt(window.localStorage.getItem(code));
        if(current+number>100){
            window.localStorage.setItem(code,100);
            alert("Mỗi mặt hàng chỉ có thể đặt 100 sản phẩm cho mỗi đơn hàng. Bạn đã đặt 100 sản phẩm của "+name+"này.");
            return;
        } else {
            window.localStorage.setItem(code,current+number);
        }
    }
    alert("Đã cập nhật sản phẩm "+name+" với số lượng "+
    number+" vào giỏ hàng. Số lượng sản phẩm "+name+" đã đặt là "+
    parseInt(window.localStorage.getItem(code))+".");
}


// Bai 4
function openCart(){
    window.location.href="donhang.html";
}

// Hàm trả về tỷ lệ giảm giá đơn hàng khi đặt hàng
function getDiscountRate(){
    var d = new Date();
    var weekday = d.getDay();
    var totalMins = d.getHours()*60 + d.getMinutes();
    if(weekday>=1 && weekday<=3 && ((totalMins>=420 && totalMins<=660)||
    (totalMins>=7800 && totalMins<=1020))){
        return 0.1;
    }
    return 0;
}

function showCart(){
    var formatter = new Intl.NumberFormat('vi-VN',{style: 'currency',currency: 'VND'});
    var container = document.getElementById('cartDetail').getElementsByTagName('tbody')[0];
    container.innerHTML = "";
    var sum = 0;
    var totalPreTax = 0;
    var discountRate = getDiscountRate();
    var taxRate = 0.1;
    var discount = 0;
    var tax = 0;
    for(var i=0;i<window.localStorage.length;i++){
        if(typeof itemList[localStorage.key(i)]==="undefined"){
            continue;
        }
        var tr = document.createElement("tr");
        var photoCell = document.createElement("td");
        var nameCell = document.createElement("td");
        var priceCell = document.createElement("td");
        var numberCell = document.createElement("td");
        var sumCell = document.createElement("td");
        var removeCell = document.createElement("td");
        var removeLink = document.createElement("a");

        var item = itemList[localStorage.key(i)];
        var number = localStorage.getItem(localStorage.key(i));

        photoCell.style.textAlign = "center";
        photoCell.innerHTML = "<img src='"+item.photo+"' class='round-figure' width='100px'>";

        nameCell.innerHTML = item.name;
        priceCell.innerHTML = formatter.format(item.price);
        priceCell.style.textAlign = "right";

        numberCell.innerHTML = number;
        numberCell.style.textAlign="right";

        sum = number*item.price;
        sumCell.innerHTML = formatter.format(sum);
        sumCell.style.textAlign = "right";

        removeLink.innerHTML = "<i class='fa-solid fa-trash icon-pink'></i>";

        removeLink.setAttribute("href","#");
        removeLink.setAttribute("data-code", localStorage.key(i));
        removeLink.onclick = function() {
            removeCart(this.dataset.code);
        };
        removeCell.style.textAlign = "center";
        removeCell.appendChild(removeLink);

        tr.appendChild(photoCell);
        tr.appendChild(nameCell);
        tr.appendChild(numberCell)
        tr.appendChild(priceCell);
        tr.appendChild(sumCell);
        tr.appendChild(removeCell);
        container.appendChild(tr);

        totalPreTax+=sum;
        var discount = totalPreTax*discountRate;
        var tax = (totalPreTax-discount)*taxRate;
        document.getElementById("bill_pre_tax_total").innerHTML = formatter.format(totalPreTax);
        document.getElementById("bill_discount").innerHTML = discountRate +
        " x A = " + formatter.format(discount);
        document.getElementById("bill_tax").innerHTML = formatter.format(tax);
        document.getElementById("bill_total").innerHTML = formatter.format(totalPreTax-discount+tax);
    }
}

function removeCart(code){
    if(window.localStorage[code]!=="undefined"){
        window.localStorage.removeItem(code);
        document.getElementById("cartDetail").getElementsByTagName('tbody')[0].innerHTML="";
        showCart();
    }
}

// Lab 4 Jquery
var d = new Date();
var ads = "Khách hàng có ngày sinh trong tháng " + d.getMonth() + 
" sẽ được tặng 2 phần sữa chua dâu cho đơn hàng đầu tiên trong tháng.";
$(document).ready(function(){
    $("footer").append("<div id='adscontainer'><span id='adstext'><h2>"+ads+"</h2></span></div>"); 
})

function showAds(){
    var wm = ($(window).width()-$("main").width())/2;
    if(wm>=200){
        adsVerEffect();
    } else {
        adsHorEffect();
    }
}



function adsVerEffect() {
    $("#adscontainer").addClass("adsvercontainer container");
    $("#adscontainer").css("width",($(window).width()-$("main").width())/2);

    $("#adstext").addClass("adsvertext adstext");
    $("#adstext").css("top", $("adscontainer").height());
    $("#adstext").animate({
        top: '-=' + ($("#adscontainer").height()+$("#adstext").height())
    }, 30000, function(){
        adsVerEffect();
    });
}

function adsHorEffect() {
    $("#adscontainer").addClass("adshorcontainer container");
    $("#adscontainer").css("left", $("main").position().left);
    $("#adscontainer").css("width", $("main").width());

    $("#adstext").addClass("adshortext adstext");
    $('#adstext').css("left", $("adscontainer").width());
    $('#adstext').animate({
        left: '-=' + ($('#adscontainer').width()+$('#adstext').width())
    }, 30000, function(){
        adsHorEffect();
    });
}