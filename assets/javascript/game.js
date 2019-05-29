/*Global variable to keep Win count after reset*/
var wins = 0; 
var audioElement = document.createElement("audio");

/*Function to delineate first play versus subsequent play*/
function playAgain(wins) {
    audioElement.pause();
    audioElement.currentTime=0;
    playGame(wins);
}  
    
/* Main game function */    
function playGame (wins) {
var wordList= ["cheers", "friends", "seinfeld", "frasier", "the simpsons", "pulp fiction", "silence of the lambs", "the matrix","fargo","toy story", "smells like teen spirit","i will always love you", "wanna be", "no diggity", "baby one more time" ];
var categories =["tv show", "tv show", "tv show", "tv show", "tv show","movie","movie", "movie", "movie", "movie", "song", "song", "song", "song", "song"];
var hints = ["nooorm!", "how youuu doin", "kramer!", "lilith", "doh!","tarintino", "hannibal", "neo", "north dakota", "woody", "grunge", "whitney", "spice", "blackstreet", "brittany"]
var allowedKeys= ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var wordLetters = [];
var userSolution = [];
var guessCount = 10;
var guessedLetters = [];
var capsOn = null;
var correctGuess = false;


 /* Function to pick random word from array */
function randWord () {
    return  wordList[Math.floor(Math.random() * wordList.length)];    
}   
/* Set/Reset game text to begnnning values */
   
document.getElementById('guessesLeft').innerHTML="Guesses left: " + guessCount;
document.getElementById("winsText").innerHTML="You have won " + wins + " times";
document.getElementById("wordText").innerHTML="";
document.getElementById("guessAlert").innerHTML="Press any key to start";
document.getElementById("guessText").innerHTML="";
document.getElementById("wordHint").innerHTML="";

/* call random word function */
var word =randWord();
var key = wordList.indexOf(word);

document.getElementById("wordCat").innerHTML=categories[key].toUpperCase();

console.log(categories[key]);    
/*Function to pull partial correct guess from array into a string. Output from the array included the comma seperator */    
function updateWord (userSolution) {
    var wordString = "";
    
    for (k=0; k < userSolution.length; k++) {
        wordString+= (userSolution[k] + "&nbsp");
        }
        document.getElementById("wordText").innerHTML=wordString;
        return wordString;
        console.log("This is the string from the function" + wordString);
}       
/*Output underscores and spaces in word to web page */
   
for (i = 0; i < word.length; i++) {
wordLetters.push(word[i]);
    if (word[i] === " ") {
        userSolution.push(" ");
        document.getElementById("wordText").innerHTML=document.getElementById("wordText").innerHTML + "&nbsp";
        }  
    else {
        document.getElementById("wordText").innerHTML=document.getElementById("wordText").innerHTML + "_ ";
    userSolution.push("_");
    }
}
console.log(wordLetters);
                   
/*Function to capture user key presses */ 

/* Check to see if CapsLock is pressed */
document.onkeydown = function(event) {
    if (event.getModifierState("CapsLock")) {
    
        document.getElementById("guessAlert").innerHTML="Caps lock detected. Please try again";
     
    }

}
document.onkeyup = function(event) {
    console.log(event.key);
    if (allowedKeys.indexOf(event.key) === -1) {
        document.getElementById("guessAlert").innerHTML="Only letters allowed. Please try again";
    } else if (event.getModifierState("CapsLock"))  {
        document.getElementById("guessAlert").innerHTML="Caps lock off. Please try again";
    }

    else {
    var userGuess = event.key;
    var solved = false;
    var wordString=updateWord(userSolution);
   
    
    console.log("This was the user guess " + userGuess);
/* store user guess and determine if already guessed */
/* if indexOf is -1 the word is not in the guessed letters array*/
if (guessedLetters.indexOf(userGuess) === -1){
    /*push letter into array for storing guessed letters*/
    guessedLetters.push(userGuess);
    /* add letter guessed to screen */
    document.getElementById("guessText").innerHTML+=userGuess + "&nbsp";
  /*loop through the word and check for mataches*/  
  for (j=0; j < word.length; j++) {
   
     /*check to see if letter matches */    
    if (wordLetters[j] === userGuess) {  
        userSolution[j] = userGuess;
        updateWord (userSolution);
       
        correctGuess = true;
            
    }
   
  }     
    /* output array as string so we can compare - outputting array includes commas which made it difficult to compare*/
    /*initialize the word each pass so it includes recent guesses*/
    
    var wordString = updateWord (userSolution);         
    if (correctGuess) {
        document.getElementById("guessAlert").innerHTML="You guessed a letter!";
        if (userSolution.indexOf("_") !== -1) {
            document.getElementById("guessAlert").innerHTML+= "&nbsp" + "Guess Again";
            correctGuess=false;
        console.log("You found a letter");
        console.log(userSolution);
        } else {
            console.log(userSolution);
            console.log(wordString);
            document.getElementById("guessAlert").innerHTML="You won! Restarting game...";
            
            audioElement.setAttribute("src", "http://toponehitwonders.com/audio/1993/tag-team-Whoomp-There-It-Is).mp3");
            audioElement.play();
            wins++;
            document.getElementById("winsText").innerHTML="You have won " + wins + " times";
            console.log("You win");
            /*pause briefly before restarting*/
            setTimeout(playAgain, 5000, wins);
        }
    } 
    else {
        guessCount--;
        document.getElementById('guessesLeft').innerHTML="Guesses left: " + guessCount;
        document.getElementById("guessAlert").innerHTML="Incorrect guess. Please try again!";
        console.log("Incorrect guess");
        console.log(userSolution);
        if (guessCount<5) {
            document.getElementById("wordHint").innerHTML="Hint: " + hints[key].toUpperCase();
        }
    }
    if (guessCount === 0) {
        document.getElementById("guessAlert").innerHTML="You lose!! Restarting game...";
        audioElement.setAttribute("src", "http://www.wavsource.com/snds_2018-06-03_5106726768923853/tv/misc/weakest_link.wav");
            audioElement.play();
        
        
       /* playGame(wins); */
        setTimeout(playAgain, 2000, wins);
        
    }
    
} else {
    document.getElementById("guessAlert").innerHTML="Letter already guessed. Please try again!";
}
}    
        
return wins; 
}     
} 
   
playGame(wins);