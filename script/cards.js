
let flag = 1;//של האנימציה
//מחלקה- כרטיס
var card = function (id, isopen, stepsnum, name,ename) {
    this.id = id;
    this.isopen = isopen;
    this.stepsnum = stepsnum;
    this.name = name;
    this.ename = ename;
    this.getId = function () {
        return this.id;
    }
    this.getStepsnum = function () {
        return this.stepsnum;
    }
    this.getName = function () {
        return this.name;
    }
    this.getEname = function () {
        return this.ename;
    }
    this.getIsOpen = function () {
        return this.isopen;
    }
    this.setIsOpen = function (open) {
        this.isopen = open;
    }
}
//מערך של הכרטיסים
var arrcards = [new card(1, true, 2, "תפוח", "apple"), new card(2, true, 4, "דבורה", "bee"), new card(3, true, 1, "מגפונים","boots"),
    new card(4, true, 1, "נר", "candle"), new card(5, true, 1, "סוכריה", "candy"), new card(6, true, -3, "דובדבנים","cherry"),
    new card(7, true, -2, "מסרק", "comb"), new card(8, true, 1, "ספל", "cup"), new card(9, true, -2, "ברוז","duck"),
    new card(10, true, -1, "נוצה", "feather"), new card(11, true, 4, "דגים", "fish"), new card(12, true, -4, "שושנה","flower"),
    new card(13, true, 2, "מתנה", "gift"), new card(14, true, -1, "עפיפון", "kite"), new card(15, true, -2, "מיקסר","mixer"),
    new card(16, true, -3, "מוצץ", "pacifier"), new card(17, true, -1, "עפרון", "pencil"), new card(18, true, 2, "מספריים","sicers"),
    new card(19, true, 3, "גרביים", "socks"), new card(20, true, -3, "מטריה", "umbrella")]
//מספר הקלפים במשחק
var numC;
//מערך עזר להגרלת כרטיסים
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
//מערך הכרטיסים שהוגרלו
var randArr = [];
//מערך לשמירת הכרטיסים בצורה מעגלית
var circleArr = [];
var place;
var text;//תיבת טקסט למילוי שם הכרטיס
var guess;//כיתוב להקלדת מה בתמונה
var myTimer;//משתנה לפעולת הטיימר
var countCards = 0;//כמה כרטיסים פתוחים
var flagfor;
//פעולה להגרלת הכרטיסים
function rand(num) { 
    document.getElementById("audio").play();
    document.getElementById("audio").load();
    numC = num;
    var len = 20;
    var count = 0; 
    var i = 1;
    var j = 2;
    var index = 0;
    while (count < numC) {
        place =Math.ceil(Math.random() * (len-1));
        count++;
        randArr[index++] = arr[place];
        arr[place] = arr[len - 1];      
        len = len - 1;
    }
    for (var i = 0; i <randArr.length; i++) {
        if (((numC == 4) && i != 2) || ((numC == 8) && (i == 4) && (i != 4))) {
            var card = document.createElement("div");
            card.classList = "div" + i;
            document.getElementsByClassName("warp")[0].appendChild(card);
        }     
        var card = document.createElement("div");
        card.classList = "cards";
        card.setAttribute("data-id", arrcards[randArr[i]].getEname());
        document.getElementsByClassName("warp")[0].appendChild(card);
        card.setAttribute("style", "background-image:url(../pictures/" + arrcards[randArr[i]].getEname() + ".JPG)");
    }
    //בנית מערך העזר לפי הסדר המעגלי
    if (numC == 8)
        circleArr = [arrcards[randArr[0]], arrcards[randArr[1]], arrcards[randArr[2]], arrcards[randArr[4]], arrcards[randArr[7]], arrcards[randArr[6]], arrcards[randArr[5]], arrcards[randArr[3]]];
    else
        circleArr = circleArr = [arrcards[randArr[0]], arrcards[randArr[2]], arrcards[randArr[3]], arrcards[randArr[1]]];
    myTimer=setInterval(timer, 30);
}
//תחילת משחק-הגרלת כרטיס
var indexP;//משתנה לשמירת אינדקס התמונה הנבחרת על פי סדר הדיבים
function playC() {
    flagfor = false;
    place = Math.ceil(Math.random() * (numC - 1));
    if (circleArr[place].getIsOpen() == true)
        playC=y();
    else {
        for (var i = 0; !flagfor && i < document.getElementsByClassName("cards").length; i++) {
            if (document.getElementsByClassName("cards")[i].getAttribute("data-id") == circleArr[place].getEname()) {
                indexP = i;
                document.getElementsByClassName("cards")[i].style.boxShadow = "0.5px 0.5px 3.5px 9.5px #b3ffff";
                flagfor = true;
            }
        }
        document.getElementsByClassName("play")[0].style.opacity = 1;
    }
}
//בודקת האם המשתמש זכר את התמונה
function check() {
    if (circleArr[place].getName() == document.getElementsByClassName("text")[0].value)
        cardOn();
    else
        alert("false")
}
//הפיכת כרטיס 
function cardOn() {
    countCards++;   
    document.getElementsByClassName("cards")[indexP].style.backgroundImage = 'url("../pictures/'+ circleArr[place].getEname()+'.JPG")';
    circleArr[place].setIsOpen(true);
    document.getElementsByClassName("cards")[indexP].style.boxShadow = "";
    document.getElementsByClassName("text")[0].value = "";
    if (countCards == numC) {
        alert("ניצחת")
    }
    else {
    search();
    }
}
//הפעולה הולכת בעקבות הצעדים של הכרטיס האחרון שנפתח
function search() {
    var steps = circleArr[place].getStepsnum();
    var flag = false;
    flagfor = false;
    var helpArr = [];
    var indexH = 0;
    if (steps < 0) {
        steps = -steps;
        for (var i = circleArr.length - 1; i >= 0; i--) {
            helpArr[indexH++] = circleArr[i];
        }
    }
    if ((place + steps) > circleArr.length - 1)
        place = (place + steps) % circleArr.length;
    else
        place = place + steps;
    
    if (countCards == numC - 1) {
        for (var i = 0; i < circleArr.length; i++) {
            if (circleArr[i].getIsOpen() == false)
                place = i;
        }
    }
    else {
        if (circleArr[place].getIsOpen() == true && countCards != numC - 1)
            alert("מכין כרטיס חדש")
        playC();
    }
    for (var i = 0; i < document.getElementsByClassName("cards").length; i++) {
        if (document.getElementsByClassName("cards")[i].getAttribute("data-id") == circleArr[place].getEname()) {
            indexP = i;
            document.getElementsByClassName("cards")[i].style.boxShadow = "0.5px 0.5px 3.5px 9.5px #b3ffff";
            flagfor = true;
        }
    }
}
var sum = 1;//משתנה לגובה הטיימר
//פעולה להפעלת טיימר
function timer() {
    if (sum < 24) {
        document.getElementById("water").style.height = sum + "vw";
        sum += 0.05;
    }
    else {
        cardOff();
        clearInterval(myTimer);
    }
}
//הפיכת כרטיסים 
function cardOff() {
    for (var i = 0; i < randArr.length; i++) 
    {
        document.getElementsByClassName("cards")[i].style.backgroundImage = 'url("../pictures/question.JPG")';
        arrcards[randArr[i]].setIsOpen(false);
    }
    playC();
}
//פעולה לפתיחת לחצני ההגדרות
function setting() {
    document.getElementsByClassName("setting")[0].style.display = "inline";
    mySetting = setInterval(opicit, 100);

}
var s = 0.2;//משתנה לשקיפות של סרגל כלים
//פעולה  לשקיפות של סרגל הכלים
function opicit() {
    document.getElementsByClassName("setting")[0].style.opacity = s;
    s += 0.05;
    if (s >= 1) {
        clearInterval(mySetting);    
    }
}
function closeS() {
    document.getElementsByClassName("setting")[0].style.opacity = 0;
}
function refresh() {

}

