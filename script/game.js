
//מחלקה- כרטיס
var card = function (id, isopen, stepsnum, name, ename) {
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
var arrcards = [new card(1, true, 2, "תפוח", "apple"), new card(2, true, 4, "דבורה", "bee"), new card(3, true, 1, "מגפונים", "boots"),
new card(4, true, 1, "נר", "candle"), new card(5, true, 1, "סוכריה", "candy"), new card(6, true, -3, "דובדבנים", "cherry"),
new card(7, true, -2, "מסרק", "comb"), new card(8, true, 1, "ספל", "cup"), new card(9, true, -2, "ברוז", "duck"),
new card(10, true, -1, "נוצה", "feather"), new card(11, true, 4, "דגים", "fish"), new card(12, true, -4, "שושנה", "flower"),
new card(13, true, 2, "מתנה", "gift"), new card(14, true, -1, "עפיפון", "kite"), new card(15, true, -2, "מיקסר", "mixer"),
    new card(16, true, -3, "מוצץ", "pacifier"), new card(17, true, -1, "עפרון", "pencil"), new card(18, true, 2, "מספריים", "sicers"),
new card(19, true, 3, "גרביים", "socks"), new card(20, true, -3, "מטריה", "umbrella")]
//מספר הקלפים במשחק
var numC;
//מערך עזר להגרלת כרטיסים
var arr = [];
//מערך הכרטיסים שהוגרלו
var randArr = [];
//מערך לשמירת הכרטיסים בצורה מעגלית
var circleArr = [];
//מערך לשמירת הכרטיסים שלא הוגרלו
var uncircleArr = [];
var place;
var text;//תיבת טקסט למילוי שם הכרטיס
var guess;//כיתוב להקלדת מה בתמונה
var myTimer;//משתנה לפעולת הטיימר
var countCards = 0;//כמה כרטיסים פתוחים
var flagfor;
var theMusic;
var flagGame;//משחק חדש או משחק קודם
//שמירת פרטי המשחק לפעם הבאה
function saveGame() {
    localStorage.clear();
    localStorage.setItem("numC", numC);
    localStorage.setItem("randArr",randArr);
    localStorage.setItem("circleArr", JSON.stringify(circleArr));
    localStorage.setItem("uncircleArr", JSON.stringify(uncircleArr));
    localStorage.setItem("place", place);
    localStorage.setItem("countCards", countCards);
    localStorage.setItem("sum", sum);
}
//פעולה להגרלת הכרטיסים
function rand(num) {
    if (localStorage.getItem('newGame'))
        flagGame = localStorage.getItem('newGame');
    var d = document.createElement("div");
    d.classList = "play";
    document.getElementsByClassName("warp")[0].appendChild(d);
    d = document.createElement("label");
    d.innerText = "מה בתמונה?";
    document.getElementsByClassName("play")[0].appendChild(d);
    d=document.createElement("select");
    d.id = "names";
    d.size = "1";
    document.getElementsByClassName("play")[0].appendChild(d);
    d = document.createElement("button");
    d.addEventListener('click', check);
    d.innerText = "בדוק";
    document.getElementsByClassName("play")[0].appendChild(d);
    l = document.createElement("label");
    l.innerText = "תשובתך שגויה!";
    l.classList = "worng";
    countCards = 0;
    randArr = [];
    circleArr = [];
    uncircleArr = [];
    arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    theMusic = document.getElementById("audio");
    theMusic.play();
    theMusic.loop = true;
    var len = 20;
    var count = 0;
    if (flagGame=='true') {
        sum = 1;
        numC = num;
        var index = 0;
        while (count < numC) {
            place = Math.ceil(Math.random() * (len - 1));
            count++;
            randArr[index++] = arr[place];
            arr[place] = arr[len - 1];
            len = len - 1;
        }
        for (var i = 0; i < randArr.length; i++) {
            if (((numC == 4) && i != 2) || ((numC == 8) && (i == 4) && (i != 4))) {
                var cardp = document.createElement("div");
                cardp.classList = "div" + i;
                document.getElementsByClassName("warp")[0].appendChild(cardp);
            }
            var cardp = document.createElement("div");
            cardp.classList = "cards";
            cardp.setAttribute("data-id", arrcards[randArr[i]].getEname());
            document.getElementsByClassName("warp")[0].appendChild(cardp);
            cardp.setAttribute("style", "background-image:url(../pictures/" + arrcards[randArr[i]].getEname() + ".JPG)");
        }
        //בנית מערך העזר לפי הסדר המעגלי
        if (numC == 8)
            circleArr = [arrcards[randArr[0]], arrcards[randArr[1]], arrcards[randArr[2]], arrcards[randArr[4]], arrcards[randArr[7]], arrcards[randArr[6]], arrcards[randArr[5]], arrcards[randArr[3]]];
        else
        circleArr = circleArr = [arrcards[randArr[0]], arrcards[randArr[2]], arrcards[randArr[3]], arrcards[randArr[1]]];
       //בנת מערך עזר נוסף שבו כל הכרטיסים שלא הוגרלו
       var myflag;
       var myindex = 0;
       for (var i = 0; i < arrcards.length; i++) {
           myflag = true;
           for (var j = 0; j < circleArr.length; j++) {
               if (circleArr[j] == arrcards[i])
                   myflag = false;
           }
           if (myflag)
               uncircleArr[myindex++] = arrcards[i];
        }
        document.getElementsByClassName("set")[0].style.display = "none";
        myTimer = setInterval(timer, 10);
    }
    else {
        if (localStorage.getItem('numC'))
            numC = Number(localStorage.getItem('numC'));
        if (localStorage.getItem('sum'))
            sum = Number(localStorage.getItem('sum'));
        if (localStorage.getItem('countCards'))
            countCards = Number(localStorage.getItem('countCards'));
        if (countCards == numC) {
            document.location.replace("finish.html")
        }
        if (localStorage.getItem('place'))
            place = Number(localStorage.getItem('place'));
        circle = localStorage.getItem("circleArr");
        if (circle != null) {
            for (var i = 0; i < numC; i++) {
                circleArr[i] = new card(JSON.parse(circle)[i].id, JSON.parse(circle)[i].isopen, JSON.parse(circle)[i].stepsnum, JSON.parse(circle)[i].name, JSON.parse(circle)[i].ename);
            }
        }
        uncircle = localStorage.getItem("uncircleArr");
        if (uncircle != null) {
            for (var i = 0; i < numC; i++) {
                uncircleArr[i] = new card(JSON.parse(uncircle)[i].id, JSON.parse(uncircle)[i].isopen, JSON.parse(uncircle)[i].stepsnum, JSON.parse(uncircle)[i].name, JSON.parse(uncircle)[i].ename);
            }
        }
        if (localStorage.getItem('randArr')) {
            randA = localStorage.getItem('randArr');
            randArr = randA.split(",");
        }
        for (var i = 0; i < randArr.length; i++) {
            if (((numC == 4) && i != 2) || ((numC == 8) && (i == 4) && (i != 4))) {
                var cardp = document.createElement("div");
                cardp.classList = "div" + i;
                document.getElementsByClassName("warp")[0].appendChild(cardp);
            }
            var cardp = document.createElement("div");
            cardp.classList = "cards";
            cardp.setAttribute("data-id", arrcards[randArr[i]].getEname());
            cardp.style.backgroundImage = 'url("../pictures/question.JPG")';
            document.getElementsByClassName("warp")[0].appendChild(cardp);
        }
        for (var i = 0; i < circleArr.length; i++) {
            if (circleArr[i].getIsOpen() == true) {
                for (var j = 0;j < document.getElementsByClassName("cards").length; j++) {
                    if (document.getElementsByClassName("cards")[j].getAttribute("data-id") == circleArr[i].getEname()) {
                        document.getElementsByClassName("cards")[j].style.backgroundImage = 'url("../pictures/' + circleArr[i].getEname() + '.JPG")';
                    }
                }
            }
        }
        if (sum < 24) {
            document.getElementsByClassName("set")[0].style.display = "none";
            myTimer = setInterval(timer, 10);

        }
        else {
            document.getElementsByClassName("set")[0].style.display = "inline";
            document.getElementById("water").style.height = "24vw";
            if (countCards == 0)
                playC();
            else {
                for (var i = 0; i < numC; i++) {
                    opt = document.createElement("option");
                    opt.value = circleArr[i].getName();
                    opt.innerText = circleArr[i].getName();
                    document.getElementById("names").appendChild(opt);
                    if (i % 2 == 0) {
                        opt = document.createElement("option");
                        opt.value = uncircleArr[i].getName();
                        opt.innerText = uncircleArr[i].getName();
                        document.getElementById("names").appendChild(opt);
                    }

                }
                document.getElementsByClassName("play")[0].style.opacity = 1;
                for (var i = 0; i < document.getElementsByClassName("cards").length; i++) {
                    if (document.getElementsByClassName("cards")[i].getAttribute("data-id") == circleArr[place].getEname()) {
                        indexP = i;
                        document.getElementsByClassName("cards")[i].style.boxShadow = "0.5px 0.5px 3.5px 9.5px #b3ffff";
                        flagfor = true;
                    }
                }
            }
        }

    }
    
}
// מוזיקה
var theMusic, flagmus = true;
function music() {
    theMusic = document.getElementById("audio");
    if (!flagmus) {
        theMusic.play();
        theMusic.loop = true;
        flagmus = true;
    }
    else {
        theMusic.setAttribute("autoplay", "");
        theMusic.pause();
        flagmus = false;
    }
}

//תחילת משחק-הגרלת כרטיס
var indexP;//משתנה לשמירת אינדקס התמונה הנבחרת על פי סדר הדיבים
var opt;
function playC() {
    if (countCards == 0) {
        for (var i = 0; i < numC; i++) {
            opt = document.createElement("option");
            opt.value = circleArr[i].getName();
            opt.innerText = circleArr[i].getName();
            document.getElementById("names").appendChild(opt);
            if (i % 2 == 0) {
                opt = document.createElement("option");
                opt.value = uncircleArr[i].getName();
                opt.innerText = uncircleArr[i].getName();
                document.getElementById("names").appendChild(opt);
            }

        }
    }
    flagfor = false;
    place = Math.ceil(Math.random() * (numC - 1));
    if (circleArr[place].getIsOpen() == true)
        playC();
    else {
        for (var i = 0; i < document.getElementsByClassName("cards").length; i++) {
            if (document.getElementsByClassName("cards")[i].getAttribute("data-id") == circleArr[place].getEname()) {
                indexP = i;
                document.getElementsByClassName("cards")[i].style.boxShadow = "0.5px 0.5px 3.5px 9.5px #b3ffff";
            }
        }
        document.getElementsByClassName("play")[0].style.opacity = 1;
    }
}
//בודקת האם המשתמש זכר את התמונה
var l;
var myworng;
var big;
function check() {
    var selectItem = document.getElementById('names').selectedIndex;
    if (circleArr[place].getName() == document.getElementById('names').options[selectItem].value)
        cardOn();
    else {
        big = 1.2;
        document.getElementsByClassName("play")[0].appendChild(l);
        document.getElementsByClassName("worng")[0].display = "inline";
        document.getElementsByClassName("worng")[0].style.fontSize = "1.2vw";
        myworng = setInterval(bigger, 300);
    }
}
//הגדלת הכיתוב-תשובתך שגויה
function bigger() {
    if (big < 2.2) {
        document.getElementsByClassName("worng")[0].style.fontSize = big + "vw";
        big += 0.1;
    }
    else {
        document.getElementsByClassName("worng")[0].display = "none";
        document.getElementsByClassName("play")[0].removeChild(l);
        clearInterval(myworng);
    }
}
//הפיכת כרטיס 
function cardOn() {
    countCards++;
    document.getElementsByClassName("cards")[indexP].style.backgroundImage = 'url("../pictures/' + circleArr[place].getEname() + '.JPG")';
    circleArr[place].setIsOpen(true);
    document.getElementsByClassName("cards")[indexP].style.boxShadow = "";
    if (countCards == numC) {
        document.location.replace("finish.html");
    }
    else {
        search();
    }
}
//הפעולה הולכת בעקבות הצעדים של הכרטיס האחרון שנפתח
function search() {
    var steps = circleArr[place].getStepsnum();
    if (numC == 8 && ((steps < 0 && (place < 4 || place == 7)) || (steps > 0 && (place > 4 && place != 7))) || (numC == 4 && (steps > 0 && place == 2) || (steps < 0 && place!=2))) {
        steps = Math.abs(steps);
        var i = 0;
        for (i = place; i > 0 && steps > 0; i--) {
            steps--;
        }
        if (steps > 0) {
            for (i = circleArr.length; i > 0 && steps > 0; i--) {
                steps--;
            }
        }
        place = i;
    }
    else {
        steps = Math.abs(steps);
        var i = 0;
        for (i = place; i < circleArr.length-1 && steps > 0; i++) {
            steps--;
        }
        if (steps > 0) {
            for (i = 0; i < circleArr.length && steps > 0; i++) {
                steps--;
            }
            i--;
        }
        place = i;
    }
    if (countCards == numC - 1) {
        for (var i = 0; i < circleArr.length; i++) {
            if (circleArr[i].getIsOpen() == false)
                place = i;
        }
    }
    else if (circleArr[place].getIsOpen() == true && countCards != numC - 1) {
        playC();
    }
    //הדגשת הכרטיס הבא בתור
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
        document.getElementsByClassName("set")[0].style.display = "inline";
        cardOff();
        clearInterval(myTimer);
    }
}
//הפיכת כרטיסים 
function cardOff() {
    for (var i = 0; i < randArr.length; i++) {
        document.getElementsByClassName("cards")[i].style.backgroundImage = 'url("../pictures/question.JPG")';
        circleArr[i].setIsOpen(false);
    }
    playC();
}
//פעולה לפתיחת לחצני ההגדרות
function setting() {
    document.getElementsByClassName("setting")[0].style.display="block";
    mySetting = setInterval(opicit, 70);

}
var s = 0.2;//משתנה לשקיפות של סרגל כלים
//פעולה  לשקיפות של סרגל הכלים
function opicit() {
    document.getElementsByClassName("setting")[0].style.opacity = s;
    s += 0.05;
    if (s >= 1) {
        s = 0.2;
        clearInterval(mySetting);
    }
}
function closeS() {
    clearInterval(mySetting);
    s = 0.2;
    document.getElementsByClassName("setting")[0].style.opacity = s;
    document.getElementsByClassName("setting")[0].style.display="none";
}
//רענון דף המשחק
function refresh() {
    closeS();
    if (numC == 8)
        start8();
    else
        start4();
}
function stopP() {
    event.stopPropagation();
}
//משחק ברמה 1
function start4() {
    document.getElementsByClassName("warp")[0].innerHTML = "";
    document.getElementById("water").style.height = 0;
    flagGame = true;
    localStorage.setItem("newGame", true);
    closeS();
    rand(4);
}
//משחק ברמה 2
function start8() {
    document.getElementsByClassName("warp")[0].innerHTML = "";
    document.getElementById("water").style.height = 0;
    flagGame = true;
    localStorage.setItem("newGame", true);
    closeS();
    rand(8);
}
//התחלת משחק חדש
function newGame() {
    localStorage.setItem("newGame", true);
    document.location.replace("game8.html");
}
//המשך משחק קודם
function prevGame() {
    localStorage.setItem("newGame", false);
    document.location.replace("game8.html");
}
//חזרה לדף הבית
function myhome() {
    document.location.replace("HomePage.html");
}