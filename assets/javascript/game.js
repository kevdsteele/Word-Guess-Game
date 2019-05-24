

/* Global variable to keep Win count after reset */
var wins = 0; 

/*Function to delineate first play versus subsequent play*/
function playAgain(wins) {
    
    playGame(wins);
}  
    
/* Main game function */    
function playGame (wins) {

var wordList= ["sheldon", "leonard", "howard", "raj", "penny", "amy", "bernadette", "stewart", "bazinga", "comic book", "science", "comic con"];
var wordLetters = [];
var userSolution = [];
var guessCount = 10;
var guessedLetters = [];
var leftToGuess=0;  
var correctGuess = false;
var wordString1 = "";

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


/* call random word function */
var word =randWord();
    
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
document.onkeyup = function(event) {
    var userGuess = event.key;
    var solved = false;
    var wordString=updateWord(userSolution);
   
    
    console.log("This was the user guess " + userGuess);

/* store user guess and determine if already guessed */

/* if indexOf is -1 the word is not in the guessed letters array*/

if (guessedLetters.indexOf(userGuess) === -1){
    /*push letter into array*/
    guessedLetters.push(userGuess);
    /* add letter guessed letters */
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
            wins++;
            document.getElementById("winsText").innerHTML="You have won " + wins + " times";
            console.log("You win");
            /*pause briefly before restarting*/
            setTimeout(playAgain, 1000, wins);
        }
    } 
    else {
        guessCount--;
        document.getElementById('guessesLeft').innerHTML="Guesses left: " + guessCount;
        document.getElementById("guessAlert").innerHTML="Incorrect guess. Please try again!";
        console.log("Incorrect guess");
        console.log(userSolution);
    }

    if (guessCount === 0) {
        document.getElementById("guessAlert").innerHTML="You lose!! Restarting game...";
       
       /* playGame(wins); */
        setTimeout(playAgain, 1000, wins);
        
    }
    
} else {
    document.getElementById("guessAlert").innerHTML="Letter already guessed. Please try again!";
}


}    
        
return wins;       
}    

playGame(wins);


