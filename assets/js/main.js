var mainMenu = document.querySelector('.mainMenu');
var startBtn = document.querySelector('.startBtn');
var gameWrapper = document.querySelector('.gameWrapper');
var wordToFindDiv = document.querySelector('.wordToFindDiv');
var answersInput = document.querySelector('.answersInput');
var life9 = document.querySelectorAll('.life9');
var life8 = document.querySelectorAll('.life8');
var life7 = document.querySelector('.life7');
var life6 = document.querySelector('.life6');
var life5 = document.querySelector('.life5');
var life4 = document.querySelector('.life4');
var life3 = document.querySelector('.life3');
var life2 = document.querySelector('.life2');
var life1 = document.querySelector('.life1');
var life0 = document.querySelector('.life0');
var lifeText = document.querySelector('.lifeText');
var lettersUsed = document.querySelector('.lettersUsed');
var answerWord = document.querySelector('.answerWord');
var answerDesc = document.querySelector('.answerDesc');
var answerDiv = document.querySelector('.answerDiv');

startBtn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();
  // ourRequest.open('GET', 'http://www.filltext.com/?rows=1&pretty=true&name={firstName}');
  ourRequest.open('GET', 'https://raw.githubusercontent.com/adambom/dictionary/master/dictionary.json');
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
      startGame(ourData);
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
    
  };

  ourRequest.onerror = function() {
    console.log("Connection error");
  };

  ourRequest.send();
});

const startGame = (data) => {
  mainMenu.classList.add('hidden');
  mainMenu.classList.remove('active');
  gameWrapper.classList.add('active');
  gameWrapper.classList.remove('hidden');
  var randomNumber = Math.floor(Math.random() * Object.keys(data).length);

  wordToFind = Object.keys(data)[randomNumber];
  answerWord.innerHTML = wordToFind + ':&nbsp;';
  answerDesc.innerHTML = '&nbsp;' + data[Object.keys(data)[randomNumber]];
  wordToFind = wordToFind.toLowerCase();
  var htmlString = '';
  var life = 10;
  lifeText.textContent = life + ' mistakes and you die.'

  for (var i = 0; i < wordToFind.length; i++) {
    htmlString += '<div class="wordToFindDivText"></div>';
  }

  wordToFindDiv.innerHTML = htmlString;

  var wordToFindDivText = document.querySelectorAll('.wordToFindDivText');

  window.addEventListener('keydown', function(e) {
    if (e.keyCode === 13 && life) {
      if (answersInput.value) {
        checkIfTrue(answersInput.value.toLowerCase());
      } else {
        alert('Write a letter :o');
      }
    }

    answersInput.value = '';
  })

  const checkIfTrue = (letter) => {
    var check = 0;
    var checkVictory = 0;
    var j = 0;
    var checkIfUsed = 0;

    for (var i = 0; i < wordToFind.length; i++) {
      if (letter === wordToFind[i]) {
        wordToFindDivText[i].textContent = letter;
        wordToFindDivText[i].classList.add('rightLetter')
        check = 1
      }
    }

    for (var i = 0; i < wordToFindDivText.length; i++) {
      if (!wordToFindDivText[i].textContent) {
        checkVictory = 1;
      }
    }

    if (!checkVictory) {
      lifeText.textContent = 'You\'re saved buddy !'
      gameWon()
    }

    // var lettersUsedTab = lettersUsed.textContent.split(' ')
    while (j < lettersUsed.textContent.length) {
      if (letter === lettersUsed.textContent[j]) {
        checkIfUsed = 1;
      }
      j++;
    }

    var regExpAlphaMin = new RegExp('[a-z]')
    var regExpAlphaMaj = new RegExp('[A-Z]')

    if (!letter.match(regExpAlphaMin) && !letter.match(regExpAlphaMaj)) {
      checkIfUsed = 1;
    }

    if (!check && !checkIfUsed) {
      life--;
      lettersUsed.textContent += (letter + ' ')
      lifeText.textContent = life === 1 ? life + ' mistake and you die.' : life + ' mistakes and you die.'
      console.log(life)
      drawHangman();
      if (life < 1) {
        lifeText.textContent = 'You\'re dead buddy.'
        gameOver();
      }
    }

  }

  const drawHangman = () => {
    if (life < 10) {
      for (var i = 0; i < life9.length; i++) {
        life9[i].classList.add('colored')
      }
    }
    if (life < 9) {
      for (var i = 0; i < life8.length; i++) {
        life8[i].classList.add('colored')
      }
    }
    if (life < 8) {
      life7.classList.add('colored')
    }
    if (life < 7) {
      life6.classList.add('colored')
    }
    if (life < 6) {
      life5.classList.add('colored')
    }
    if (life < 5) {
      life4.classList.add('colored')
    }
    if (life < 4) {
      life3.classList.add('colored')
    }
    if (life < 3) {
      life2.classList.add('colored')
    }
    if (life < 2) {
      life1.classList.add('colored')
    }
    if (life < 1) {
      life0.classList.add('colored')
    }
  }

  const gameOver = () => {
    answerDiv.style.opacity = 1;
    setTimeout(function() {
      window.location.reload()
    }, 6000)
  }

  const gameWon = () => {
    answerDiv.style.opacity = 1;
    setTimeout(function() {
      window.location.reload()
    }, 6000)
  }

};





























