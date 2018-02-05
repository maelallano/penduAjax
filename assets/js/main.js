var mainMenu = document.querySelector('.mainMenu');
var startBtn = document.querySelector('.startBtn');
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

startBtn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();
  // ourRequest.open('GET', 'http://www.filltext.com/?rows=1&pretty=true&name={firstName}');
  ourRequest.open('GET', 'https://github.com/maelallano/penduAjax/blob/master/data.txt');
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

  wordToFind = data[0].name.toLowerCase();
  var htmlString = '';
  var life = 10;
  lifeText.textContent = life + ' mistakes and you die.'

  console.log(wordToFind)

  for (var i = 0; i < wordToFind.length; i++) {
    htmlString += '<div class="wordToFindDivText"></div>';
  }

  wordToFindDiv.innerHTML = htmlString;

  var wordToFindDivText = document.querySelectorAll('.wordToFindDivText');

  window.addEventListener('keydown', function(e) {
    if (e.keyCode === 13 && life) {
      if (answersInput.value) {
        checkIfTrue(answersInput.value);
      } else {
        alert('Écris une lettre :o');
      }
    }

    answersInput.value = '';
  })

  const checkIfTrue = (letter) => {
    var check = 0;
    var checkVictory = 0;

    for (var i = 0; i < wordToFind.length; i++) {
      if (letter === wordToFind[i]) {
        wordToFindDivText[i].textContent = letter;
        wordToFindDivText[i].classList.add('rightLetter')
        check = 1;
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

    if (!check) {
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
    setTimeout(function() {
      window.location.reload()
    }, 2000)
  }

  const gameWon = () => {
    setTimeout(function() {
      window.location.reload()
    }, 2000)
  }

};





























