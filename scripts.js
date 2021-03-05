const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");


const figureParts = document.querySelectorAll(".figure-part");

const words = ["nova", "fluxing", "dodo", "chicken", "beepboop", "ratatouile"];

let selectedWord = words[Math.floor(Math.random()* words.length)];

console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

//Show the hidden word
function displayWord() {
    wordEl.innerHTML = `
      ${selectedWord
        .split('')
        .map(
          letter => `
            <span class="letter">
              ${correctLetters.includes(letter) ? letter : ''}
            </span>
          `
        )
        .join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, "");

    if(innerWord === selectedWord) {
        finalMessage.innerText = "Congratulations! \n\nYou won! \n\n😃";
        popup.style.display = "flex";
        window.removeEventListener('keydown', checkLetter);
    }
  }


  //update the wrong letters
  function updateWrongLettersEl() {
    //display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    //display figure parts when wrong letters pressed
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
    
        if (index < errors) {
          part.style.display = 'block';
        } else {
          part.style.display = 'none';
        }
      });

      // Check if lost
      if(wrongLetters.length === figureParts.length){
          finalMessage.innerText = "Sorry, you lost... \n😞";
          popup.style.display = "flex";
          window.removeEventListener('keydown', checkLetter);

      }
};


  //show notification

  function showNotification() {
    notification.classList.add('show');
  
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  }

  const checkLetter = function(e) {
    console.log(e.keyCode);
    console.log(e.code);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key;
  
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
  
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
  
          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }

  }


//Keydown letter press

window.addEventListener('keydown', checkLetter);


  // Restart game event listener playagain

  playAgainBtn.addEventListener('click', () => {
    //  Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
  
    selectedWord = words[Math.floor(Math.random() * words.length)];
  
    displayWord();
  
    updateWrongLettersEl();
  
    popup.style.display = 'none';

    window.addEventListener('keydown', checkLetter);
  });

displayWord();

const resetGame = function(){
    
}