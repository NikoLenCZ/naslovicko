const maxWordLength = 5;
const maxTries = 6;

let word = "";
let tries = 1;
let result = allWords[(allWords.length * Math.random()) | 0].toLowerCase();

// remove accents
const removeAccent = (str) => {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
};

let noAccentResult = removeAccent(result);
let noAccentWords = allWords.map((x) => removeAccent(x));

let lettersInRow = {
  correct: [],
  present: [],
  wrong: [],
};

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    submitWord();
  } else if (event.key === "Backspace") {
    removeLetter();
  } else {
    addLetter(event.key);
  }
});

// submit writted word
const submitWord = () => {
  if (word.length !== maxWordLength) return;

  // if is real word
  if (!noAccentWords.includes(removeAccent(word))) {
    animateShakeRow(currentRow());
    return;
  }

  findLetersInTow();
  highlightLetter(currentRow());

  animateTileReveal(currentRow());

  setTimeout(() => {
    evaluated();
  }, 1500);
};

// add letter to the tile
const addLetter = (character) => {
  if (word.length >= maxWordLength) return;

  // allow only if is letter
  if (/^\p{L}$/u.test(character)) {
    word = word + character;
    word = word.toLowerCase();

    let tile = currentTile();
    tile.innerHTML = character;
    animateTileBounce(tile);
  }
};

// remove letter from the tile
const removeLetter = () => {
  if (word.length <= 0) return;

  let tile = currentTile();
  tile.innerHTML = "";
  tile.className = "tile";
  word = word.slice(0, -1);
};

// select current row
const currentRow = () => {
  return document.querySelector(`.row:nth-child(${tries})`);
};

// update tile
const currentTile = () => {
  return currentRow().querySelector(`:nth-child(${word.length})`);
};

// Evaluated function
let evaluated = () => {
  if (removeAccent(word) === removeAccent(result)) {
    animateTileDance(currentRow());
  } else if (tries >= maxTries) {
    youLoosed();
    setTimeout(() => {
      const message = document.createElement("div");
      message.textContent = `Prohrál jsi 😢. Řešení bylo: ${result.toUpperCase()}`;
      message.classList.add("result-message", "animate__animated", "animate__fadeIn");
      document.body.appendChild(message);
    }, 2000);
  } else {
    word = "";
    tries++;
  }
};

const findLetersInTow = () => {
  let present = [];
  let correct = [];
  let wrong = [];

  [...word].forEach((letter, index) => {
    letter = removeAccent(letter);

    // letter in correct place
    if (noAccentResult.charAt(index) === letter) {
      correct.push(letter);
    }
    // letter in wrong place
    else if (noAccentResult.includes(letter)) {
      present.push(letter);
    }
    // wrong letter
    else {
      wrong.push(letter);
    }
  });

  lettersInRow = {
    present,
    correct,
    wrong,
  };
};

let openDialogButton = document.getElementById("openDialog");
let myDialog = document.getElementById("dialogModal");
let closeDialog = document.getElementById("closeDialog");

// "Open dialog box" button opens the <dialog> modally
openDialogButton.addEventListener("click", function () {
  if (typeof myDialog.showModal === "function") {
    myDialog.classList.remove("animate__fadeOut");
    myDialog.classList.add("animate__fadeIn");
    myDialog.showModal();
  } else {
    console.log("The <dialog> API is not supported by this browser");
  }
});

closeDialog.addEventListener("click", function () {
  myDialog.classList.add("animate__fadeOut");
  setTimeout(() => {
    myDialog.close();
  }, 500);
});
