const gameListElement = document.getElementsByClassName("game-list")[0]
const gameImageElement = document.getElementById('detail-image')
const gameNameElement = document.getElementById('detail-title')
const gameHighScoreElement = document.getElementById('detail-high-score')
const scoreInputFormElement = document.getElementById('high-score-form')
let currentGame 


function addGameContent(game){
    const listDisplayManufacturer = game.manufacturer_name
    const listDisplayName = game.name
    const newGameElement = document.createElement('h5')
    newGameElement.textContent = `${listDisplayName} (${listDisplayManufacturer})`
    gameListElement.appendChild(newGameElement)

    localStorage.setItem(`${game.id}_high_score`,`${game.high_score}`)
    newGameElement.addEventListener('click', (event) => 
    displayCurrentGame(game)
    )
}

function displayCurrentGame(game){
    gameNameElement.textContent = game.name
    gameImageElement.src = game.image
    currentGame = game
    gameHighScoreElement.textContent = localStorage.getItem(`${currentGame.id}_high_score`)
}

function patchHighScore(newScoreInput){
    const data = {"high_score" : newScoreInput}
    fetch (`http://localhost:3000/games/${currentGame.id}`,{
        "method" : "PATCH",
        "headers" : {
            "Content-Type" : "application/json"
        },
        "body" : JSON.stringify(data)
    })
}

scoreInputFormElement.addEventListener('submit', (event) => {
    event.preventDefault()
    newScoreInput = document.getElementById('score-input').value

    if (Number(newScoreInput) > Number(gameHighScoreElement.textContent)){
        localStorage.setItem(`${currentGame.id}_high_score`, newScoreInput)
        displayCurrentGame(currentGame)
        patchHighScore(newScoreInput)

    } else { 
        window.alert("Hold Up! - That's not a new high score. Let's not update that.");
    }
})


fetch ("http://localhost:3000/games")
.then(response => response.json())
.then(games => {
    games.forEach(game => {   
    addGameContent(game)
        })
    displayCurrentGame(games[0])    
    })