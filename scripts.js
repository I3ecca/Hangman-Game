const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const apiURL = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=5&limit=20&api_key=c3847c4934574ce6cf81c45640103f2e5fab2284ab2e7badc";


let apiArr = [];
let selectedWord;

let request = new XMLHttpRequest();
request.open('GET', apiURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const wordArr = request.response;
  //   console.log(wordArr[0].word);
  //for each item in array, start at index 0, continue for the length of the array and then increment
  for (let i = 0; i < wordArr.length; i++) {
    let newWordArr = wordArr[i].word;
    console.log(newWordArr);
    apiArr.push(newWordArr);
  }

  console.log(apiArr);

  selectedWord = apiArr[Math.floor(Math.random() * apiArr.length)];

  displayWord();

}

const figureParts = document.querySelectorAll(".figure-part");
const words = apiArr;
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

  if (innerWord === selectedWord) {
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
  if (wrongLetters.length === figureParts.length) {
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
  // console.log(e.keyCode);
  // console.log(e.code);
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

  selectedWord = apiArr[Math.floor(Math.random() * apiArr.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';

  window.addEventListener('keydown', checkLetter);
});



const resetGame = function() {

}