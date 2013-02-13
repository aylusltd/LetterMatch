/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//static array, extensible for localization
letters = [
    "A","B","C","D","E","F","G",
    "H","I","J","K","L","M","N",
    "O","P","Q","R","S","T","U",
    "V","W","X","Y","Z"
];
score =0;

function displayMessage(msg)
{
    $("#message").html(msg);
    if(msg == "")
    {
        $("#message").css("background-color", "");
        $("#message").css("border-width","0px");
    }
    else
    {
        
        $("#message").css("border-width","2px");
    }
    
}

function incrementPoints(pts)
{
    score=score+pts;
    $("#score").html(score);
    if(score == 1)
    {
        $("#caterpillar").css("display","block");
        $("#1").css({
            "left"              : "29.5%",
            "position"          : "absolute",
            "bottom"            : "32px",
            "z-index"           : "10",
            "-webkit-transform" : "scale(1.3, 1.3)",
            "-moz-transform"    : "scale(1.3, 1.3)",
            "-o-transform"      : "scale(1.3, 1.3)",
            //I hate Internet Explorer
            "-ms-transform"     : "scale(1.3, 1.3)"
        });
        
    }        
    else
    {
        var s=$("<div />").attr({
                "id"    : score,
                "class" : "score"
            });
        if(score % 2 == 0)
            s.addClass("even").html(score);
        else
            s.addClass("odd").html(score);
        var l = 30 + (score-1) * 4;
        var x=score - 1;
        var test=$("#"+x).offset();
        var test2 = $("#" + x).width();
        var q=test.left + test2;
        console.log(q);
        l=l+"%";
        s.css("left",l);
        l=$("<div />").addClass("feet").addClass("lft");
        s.append(l);
        var r=$("<div />").addClass("feet").addClass("rft");
        s.append(r)
        $("#caterpillar").append(s);

    }
    
    
}

function correctClick(e)
{
    incrementPoints(1);
    displayMessage("Great Job");
    $("#message").css("color","green");
    $("#message").css("background-color", "white");
    $("#message").css("border-color", "green");
    var value=$(e.target).css("background-color");
    $(e.target).css("background-color","green");
    $(e.target).css("border-style","inset");
    setTimeout(function(){
        $(e.target).css("background-color",value);
        $(e.target).css("border-style","outset");
        
        if(score<10)
        {
            displayMessage("");
            selectLetters();

        }
            
        else
        {
            $(".letter").unbind();
            displayMessage("You Win!");
        }
    },1250);

    
}

function incorrectClick(e)
{
    displayMessage("Try Again!");
    $("#message").css("color","red");
    $("#message").css("background-color", "white");
    $("#message").css("border-color", "red");
    var value=$(e.target).css("background-color");
    $(e.target).css("background-color","red");
    $(".letter").unbind();
    setTimeout(function(){
        $(e.target).css("background-color",value);
        displayMessage("");
        bindClicks();
    },750);
    
}

function profanityCheck(a,b,c)
{
    var profanity = [
        "ass",
        "bra",
        "dag",
        "wop",
        "wog",
        "cum",
        "bum",
        "fag",
        "god",
        "sex",
        "tit",
        "wtf",
        "fuk",
        "gay",
        "jap",
        "yed"];
    
    var str = a + b + c +"";
    for(i=0; i<profanity.length; i++)
    {
        if(str == profanity[i])
            return true;
    }
    return false;
}

function bindClicks()
{
    $(".Correct").click(function (e){
        correctClick(e);
    });
    $(".Incorrect").click(function (e){
        incorrectClick(e);
    });
}

function shellGame()
{
    var correct = Math.random() * 3 + 1;
    correct = Math.floor(correct);
    return correct;
}

/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
(function (window) {

	window.viewportSize = {};

	window.viewportSize.getHeight = function () {
		return getSize("Height");
	};

	window.viewportSize.getWidth = function () {
		return getSize("Width");
	};

	var getSize = function (Name) {
		var size;
		var name = Name.toLowerCase();
		var document = window.document;
		var documentElement = document.documentElement;
		if (window["inner" + Name] === undefined) {
			// IE6 & IE7 don't have window.innerWidth or innerHeight
			size = documentElement["client" + Name];
		}
		else if (window["inner" + Name] != documentElement["client" + Name]) {
			// WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy

			// Insert markup to test if a media query will match document.doumentElement["client" + Name]
			var bodyElement = document.createElement("body");
			bodyElement.id = "vpw-test-b";
			bodyElement.style.cssText = "overflow:scroll";
			var divElement = document.createElement("div");
			divElement.id = "vpw-test-d";
			divElement.style.cssText = "position:absolute;top:-1000px";
			// Getting specific on the CSS selector so it won't get overridden easily
			divElement.innerHTML = "<style>@media(" + name + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + name + ":7px!important}}</style>";
			bodyElement.appendChild(divElement);
			documentElement.insertBefore(bodyElement, document.head);

			if (divElement["offset" + Name] == 7) {
				// Media query matches document.documentElement["client" + Name]
				size = documentElement["client" + Name];
			}
			else {
				// Media query didn't match, use window["inner" + Name]
				size = window["inner" + Name];
			}
			// Cleanup
			documentElement.removeChild(bodyElement);
		}
		else {
			// Default to use window["inner" + Name]
			size = window["inner" + Name];
		}
		return size;
	};

})(this);

function sizeFonts()
{
    /*************
     *1600 x 900
     *width: 20% = 320px;
     *height: 25% = 225px;
     *aspect ratio = 1.42
     **************/
    
    
    var font, ratio;
    var h = window.viewportSize.getHeight();
    var w = window.viewportSize.getWidth();
    var scale = {
        "h":0,
        "w":0
    };
    scale.h=h/900;
    scale.w=w/1600;
    var mindim = Math.min(h, w);
    var minScale = Math.min(scale.h, scale.w);
    var landscape = h < w ? true : false;
    var bg = w+"px "+h+"px";
    $("body").css("background-size", bg);
    
    font=$("#left").height();
    
    if (landscape)
    {
        
        font = font * 0.60 + "px";
        $(".letter").css("font-size",font);
        font=$("#prompt").height();
        font = font * 0.60 + "px";
        $("#prompt").css("font-size",font);
        $("#message").css("font-size",font);
    }
    else
    {
        ratio = $("#left").width() / $$("#left").height();
        ratio = ratio / 1.42;
        font = font * 0.6 * ratio + "px";
        font=$("#prompt").height();
        font = font * ratio * 0.60 + "px";
        $("#prompt").css("font-size",font);
        $("#message").css("font-size",font);
    }
    
    $("#caterpillar").css({
        "transform"             :   "scale("+ minScale +"," + minScale + ")",
        "-ms-transform"         :   "scale("+ minScale +"," + minScale + ")", /* IE 9 */
        "-moz-transform"        :   "scale("+ minScale +"," + minScale + ")", /* Firefox */
        "-webkit-transform"     :   "scale("+ minScale +"," + minScale + ")", /* Safari and Chrome */
        "-o-transform"          :   "scale("+ minScale +"," + minScale + ")" /* Opera */
    });
    console.log("Minimum Scale = " + minScale);
    
    
    
    
    
    
    
}

function populateCells (target, nT1, nT2 )
{
    var correct = shellGame();
    $(".letter").unbind();
    
    if(correct == 1)
    {
        if(!profanityCheck(target,nT1,nT2))
        {
            $("#left").html(target).addClass("Correct").removeClass("Incorrect");
            $("#center").html(nT1).addClass("Incorrect").removeClass("Correct");
            $("#right").html(nT2).addClass("Incorrect").removeClass("Correct");
        }
        else
        {
            $("#left").html(target).addClass("Correct").removeClass("Incorrect");
            $("#right").html(nT1).addClass("Incorrect").removeClass("Correct");
            $("#center").html(nT2).addClass("Incorrect").removeClass("Correct");
        }
        
    }
    
    if(correct == 2)
    {
        if(!profanityCheck(nT1,target,nT2))
        {
            $("#center").html(target).addClass("Correct").removeClass("Incorrect");
            $("#left").html(nT1).addClass("Incorrect").removeClass("Correct");
            $("#right").html(nT2).addClass("Incorrect").removeClass("Correct");
        }
        else
        {
            $("#center").html(target).addClass("Correct").removeClass("Incorrect");
            $("#left").html(nT2).addClass("Incorrect").removeClass("Correct");
            $("#right").html(nT1).addClass("Incorrect").removeClass("Correct");
        }
    }
    
    if(correct == 3)
    {
        $("#right").html(target).addClass("Correct").removeClass("Incorrect");
        $("#center").html(nT1).addClass("Incorrect").removeClass("Correct");
        $("#left").html(nT2).addClass("Incorrect").removeClass("Correct");
    }
    bindClicks();
    sizeFonts();
}


function selectLetters()
{
    
    var l = letters.length;
    var target = Math.random() * l;
    
    target = Math.floor(target);
    var targetLetter = letters[target];
    $("#Target").html(targetLetter);
    var nonTarget1 = Math.floor(Math.random() * l);
    while (nonTarget1 == target)
    {
        nonTarget1 = Math.floor(Math.random() * l);
    }
    var nonTarget2 = Math.floor(Math.random() * l);
    while (nonTarget2 == target || nonTarget2 == nonTarget1)
    {
        nonTarget2 = Math.floor(Math.random() * l);
    }
    var nT1 = letters[nonTarget1];
    var nT2 = letters[nonTarget2];
    
    populateCells(targetLetter, nT1, nT2);
}

