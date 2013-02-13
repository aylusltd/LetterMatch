<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Letterpillar v0.2</title>
        <script src="jquery.min.js"></script>
        <script src="lettermatch.js"></script>
        
        <link href='http://fonts.googleapis.com/css?family=Corben:400,700' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Asap:400,700' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="lettermatch.css">
    </head>
    
    <body onload="selectLetters()" onresize="sizeFonts()">
        
        <div id="prompt">Which letter matches?</div>
        <div id="Target" class ="letter"></div>
        <div id="left" class="letter"></div>
        <div id="center" class="letter"></div>
        <div id="right" class="letter"></div>
        <div id="message"></div>
        
        <div id="caterpillar" style="display: none">
            <div id="1" class="score">
                <div class="smileyface">
                    <div class="antenna lft"></div>
                    <div class="antenna rt"></div>
                    <div class="bob lft"></div>
                    <div class="bob rt"></div>
                    <p class="eyes lefteye"></p>
                    <p class="eyes righteye"></p>
                    <div class="smile">
                        <div class="corner"></div>
                        <div class="corner right"></div>
                    </div>
                </div>
            </div>
        </div>
        
    </body>
</html>
