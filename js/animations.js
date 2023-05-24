// bounce animation - new letter
const animateTileBounce = (tile) => {
  tile.classList.add("is-filled", "animate__animated", "animate__bounceIn");
};

// rotate tile, if word exist
const animateTileReveal = (row) => {
  row.querySelectorAll(".tile").forEach((tile, index) => {
    tile.classList.remove("animate__bounceIn", "animate__flipInY");

    setTimeout(() => {
      tile.style.visibility = "visible";
      tile.classList.add("animate__flipInY", `animate__delay-${index}s`);
    }, 0);

    // const lastTile = row.querySelectorAll('.tile').lastChild;
    // console.log(lastTile);
    // lastTile.addEventListener('animationend', () => {
    //   evaluated();
    // });
  });
};

// shake all row animate - submit non-exist word
function animateShakeRow(row) {
  row.classList.remove("animate__shakeX");

  setTimeout(() => {
    row.classList.add("is-filled", "animate__animated", "animate__shakeX");
  }, 0);
}

// Dance if you win
const animateTileDance = (row) => {
  row.querySelectorAll(".tile").forEach((tile, index) => {
    tile.innerHTML = result.charAt(index);
    tile.classList.remove("animate__bounceIn", "animate__flipInY", "animate__bounce");
    setTimeout(() => {
      tile.classList.add("animate__bounce", `animate__delay-${index}s`);
      setTimeout(() => {
        animItem.play();
      }, (index + 1) * 1000); // zpoždění pro spuštění animace `animItem`
    }, 0);
  });
};

// Lottie files animation - confetti
const play = document.getElementById("play");
const svgContainer = document.querySelector(".svg");
const animItem = bodymovin.loadAnimation({
  container: svgContainer,
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "https://assets9.lottiefiles.com/packages/lf20_obhph3sh.json",
});

// if you loosed it
const youLoosed = () => {
  let board = document.querySelector(".board");
  board.classList.add("animate__animated", "animate__hinge");
};

// hightlight letters
const highlightLetter = (row) => {
  let presentLetters = [];
  row.querySelectorAll(".tile").forEach((tile, index) => {
    tile.style.visibility = "hidden";

    let letter = removeAccent(word.charAt(index));
    let colorClass = "wrong";

    // if letter is present and correct, only show correct
    // only show each present letter once
    if (noAccentResult.includes(letter)) {
      if (!lettersInRow.correct.includes(letter) && !presentLetters.includes(letter)) {
        colorClass = "present";
        presentLetters.push(letter);
      }
    }

    // letter is in correct place
    if (noAccentResult.charAt(index) === letter) {
      colorClass = "correct";
    }
    tile.classList.add(colorClass);
  });

  // keyboard row in footer
  document.querySelectorAll(".keyboard .tile").forEach((tile) => {
    let colorClass = "";

    if (lettersInRow.wrong.includes(tile.id)) colorClass = "wrong";
    if (lettersInRow.present.includes(tile.id)) colorClass = "present";
    if (lettersInRow.correct.includes(tile.id)) colorClass = "correct";

    // const wrongTile = lettersInRow.wrong.includes(tile.id) ? colorClass = 'wrong' : null;
    // const presentTile = lettersInRow.present.includes(tile.id) ? colorClass = 'present' : null;
    // const correctTile = lettersInRow.correct.includes(tile.id) ? colorClass = 'correct' : null;

    if (colorClass) tile.classList.add(colorClass);
  });
};
