const boxes = document.querySelectorAll(".box")
const statusText = document.querySelector("#statusText")
const restartBtn = document.querySelector("#restartBtn")
const winCombinations = Array(
    [0, 1, 2],
    [3, 5, 6],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
)

let options = ["", "", "", "", "", "", "", "", ""]
let currentPlayer = "X"
let running = false

startGame()

function startGame(){
    boxes.forEach(box => box.addEventListener("click", boxClicked))
    statusText.textContent = `Vez de ${currentPlayer}`
    running = true
}

function boxClicked(event){
    let boxIndex = event.target.id //Get the ID of selected box

    if(options[boxIndex] != "" || !running){ //Checks if the box is empty and if game is running
        return
    }
    updateBox(this, boxIndex)
    checkWinner()
}

function updateBox(box, index){
    options[index] = currentPlayer
    box.textContent = currentPlayer
}

function changePlayer(){
    if(currentPlayer == "X"){
        currentPlayer = "O"
    }else{
        currentPlayer = "X"
    }
    statusText.textContent = `Vez de ${currentPlayer}`
}

function checkWinner(){
    let roundWon = false

    for(let i = 0; i < winCombinations.length; i++){
        let condition = winCombinations[i]
        let boxA = options[condition[0]]
        let boxB = options[condition[1]]
        let boxC = options[condition[2]]

        if(boxA == "" || boxB == "" || boxC == ""){
            continue
        }
        if(boxA == boxB && boxB == boxC){
            roundWon = true
            break
        }
    }

    if(roundWon == true){
        statusText.textContent = `${currentPlayer} Venceu o Jogo!`
        running = false
    }else if(!options.includes("")){ //if options doesnt include any spaces its a draw
        statusText.textContent =  "Empate!"
        running = false
    }else{
        changePlayer()
    }

}

function restartGame(){
    currentPlayer = "X"
    options = ["", "", "", "", "", "", "", "", ""]
    statusText.textContent = `Vez de ${currentPlayer}`
    boxes.forEach(box => box.textContent = "")
    running = true
}