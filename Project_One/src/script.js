$(window).on("load",function() {
  $('#exampleModalCenters').modal();
  $(".loader-wrapper").fadeOut("slow");
})
const cross_class = 'X'
const circle_class = 'O'
let circleTurn
var count = 0;
var roundReset = false;
var crossCount = 0;
var circleCount = 0;
var roundCount = 1;
var drawCount = 0;
var currentstatus = ''
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


const allBoxes = document.querySelectorAll('.box');
// Fetch each box from board and add function to each box which executes only when they're clicked.
allBoxes.forEach(item => {
  item.addEventListener('click', handleclick, {once:true})
});
//main fuction containing all inner functions which needs to be executed while the cell has been clicked
function handleclick(e) {
  document.querySelectorAll('.bottomrestart')[0].style.display = "none";
  cell = e.target;
  const currentClass = circleTurn ? circle_class : cross_class;
  //function to add cross / circle to the cell which has been clicked
  placeElements(cell,currentClass,circleTurn)
  //function to check win
  checkforWin(cell,currentClass)
  //function to check draw
  checkforDraw(cell,currentClass)
  // function to swap turns at the end.
  swapturns(currentClass)
}
function placeElements(cell,currentClass) {
  count = count + 1;
  // the class containing image gets added to the clicked cell
  cell.classList.add(currentClass)
  var activePlayer = (currentClass === cross_class) ? 1 : 0
  $('.scoreCount')[0].classList.remove('btn-brown')
  $('.scoreCount')[1].classList.remove('btn-brown')
  $('.scoreCount')[activePlayer].classList.add('btn-brown')
  cell.classList.add('disabled')
}

// function to swap the current class
function swapturns(currentClass) {
  circleTurn = !circleTurn;
}

// check for winner
function checkforWin(cell,currentClass) {
  WINNING_COMBINATIONS.forEach(item => {
    if (allBoxes[item[0]].getAttribute('class') === allBoxes[item[1]].getAttribute('class') && allBoxes[item[2]].getAttribute('class') === allBoxes[item[1]].getAttribute('class') && allBoxes[item[0]].classList.contains(currentClass)) {
      if (count === 9) {
        count = 10;
      }
      if (currentClass === cross_class) {
        crossCount = crossCount + 1;
        document.querySelectorAll('.one')[0].innerText = crossCount;
      }
      else if (currentClass === circle_class) {
        circleCount = circleCount + 1;
        document.querySelectorAll('.two')[0].innerText = circleCount;
      }
      // Adding colors to the matching cells
      // console.log(currentClass + " Wins!");
      allBoxes[item[0]].style.backgroundColor = "#7E370C";
      allBoxes[item[1]].style.backgroundColor = "#7E370C";
      allBoxes[item[2]].style.backgroundColor = "#7E370C";
      document.querySelectorAll('.modalheading')[0].innerText = crossCount + " - " + circleCount;
      roundCompleted(currentClass);
    }
  });

}

// check for draw
function checkforDraw(cell,currentClass) {
  if (count === 9) {
    // console.log("draw");
    drawCount = drawCount + 1;
    document.querySelectorAll('.modalheading')[0].innerText = crossCount + " - " + circleCount;
    roundCompleted(currentClass);
  }

}

// function that gets executed post completion of a round
function roundCompleted(currentClass) {
  roundCount = roundCount + 1;
  if (currentClass === cross_class) {
    // console.log("issue");
    swapturns(currentClass)
  }
  // document.querySelectorAll('.restartbtn')[0].style.visibility = 'visible';
  document.querySelectorAll('.restartbtn')[0].innerText = "Next Round!"
  allBoxes.forEach(item => {
    item.removeEventListener('click', handleclick);
    item.classList.add('disabled')
  });
  $('#exampleModalCenter').modal();
  document.querySelectorAll('.board')[0].style.opacity = 0.5;
  document.querySelectorAll('.bottomrestart')[0].style.display = "inline-block";
  document.querySelectorAll('.bottomrestart')[0].style.opacity = 1;
  // console.log(roundCount,typeof($('.one')[0].innerText),typeof($('.two')[0].innerText)); parseInt
  // console.log(crossCount,circleCount);
  if (crossCount === 2 || circleCount === 2) {
    console.log(currentClass + " wins");
    currentstatus = "Player " + currentClass + " Wins!"
    restartGame(currentstatus)
  }
  // else if (circleCount === 2) {
  //   console.log(currentClass , "yo");
  //   console.log(circleCount + " O wins");
  // }
  else if (roundCount === 4) {
    if (crossCount === circleCount) {
      console.log("draw ", drawCount);
      currentstatus = "It's a Draw!"
      restartGame(currentstatus)
    }
    else {
      var winner_atlast = (crossCount > circleCount) ? "X" : "O";
      console.log(winner_atlast);
      currentstatus = winner_atlast + " Wins!"
      restartGame(currentstatus)
    }
  }
  function restartGame(status) {
    $('#exampleModalCenter').modal();
    document.querySelectorAll('.modalheading')[0].innerText = status;
    document.querySelectorAll('.rounds')[0].innerText = "Game Over!";
    document.querySelectorAll('.bottomrestart')[0].innerText = "Play again!";
    document.querySelectorAll('.restartbtn')[0].innerText = "Play again!";
    document.querySelectorAll('.restartbtn')[0].addEventListener('click',reload);
    document.querySelectorAll('.bottomrestart')[0].addEventListener('click',reload);
    function reload() {
      window.location.reload();
    }
  }

}


// on clicking restart button, resetfun is called where the board get backs to initial state.
document.querySelectorAll('.bottomrestart')[0].addEventListener('click',resetfun)
document.querySelectorAll('.restartbtn')[0].addEventListener('click',resetfun)
function resetfun() {
  allBoxes.forEach((items) => {
    items.classList.remove(cross_class)
    items.classList.remove(circle_class)
    items.classList.remove('disabled')
    items.style.backgroundColor   = ''
    count = 0
    items.addEventListener('click', handleclick, {once:true})

  });
  document.querySelectorAll('.zero')[0].innerText = roundCount;
  document.querySelectorAll('.bottomrestart')[0].style.display = "none";
  document.querySelectorAll('.board')[0].style.opacity = 1;
  $('.scoreCount')[0].classList.add('btn-brown')
  $('.scoreCount')[1].classList.remove('btn-brown')
  // $('.scoreCount')[0].style.backgroundColor = "#28a745";
  // $('.scoreCount')[1].style.backgroundColor = "";
}
