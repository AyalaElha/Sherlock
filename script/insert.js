var cnt=0 ;
var mycard;
//אנימציה של קלפים
function f() {
    if (cnt >= 70) {
        clearInterval(mycard);
    }
    im = document.createElement("img");
    im.number = Math.ceil(Math.random() * 19);
    im.src = '../pictures/' + arrcards[im.number].getEname() + '.JPG';
    cnt = cnt+1;
    im.id = cnt;
    im.classList = "cardA";
    im.draggable = false;
    im.style.position = "absolute";
    im.style.top = Math.ceil(Math.random() * 60) + 'vh';
    im.style.left = Math.ceil(Math.random() * 80) + 'vw';
    rot = Math.ceil(Math.random() * 180);
    zero = Math.floor(Math.random() * 2);
    if (zero)
        rot = 'rotate(' + rot + 'deg)';
    else
        rot = 'rotate(' + -rot + 'deg)';
    im.style.transform = rot;
    document.getElementById('warpi').appendChild(im);
}
//אופציות למשחק קודם/חדש-כפתורים
function startGame() {
    document.getElementsByClassName("inst")[0].style.display = "none";
    document.getElementsByClassName("choose")[0].style.top = "30vw";
    document.getElementsByClassName("choose")[0].style.display = "inline";
}
//לדף ההוראות
function toinst() {
    document.getElementsByClassName("choose")[0].style.display = "none";
    document.getElementsByClassName("inst")[0].style.display = "inline";
    document.getElementsByClassName("home")[0].style.display = "none";
    document.getElementsByClassName("warpi")[0].style.display = "inline";
    mycard=setInterval(f, 100);
}
//חזרה לדף הבית
function tohome() {
    document.location.replace("HomePage.html");
}