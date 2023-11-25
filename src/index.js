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

scoreInputFormElement.addEventListener('submit', (event) => {
    event.preventDefault()
    newScoreInput = document.getElementById('score-input').value
    localStorage.setItem(`${currentGame.id}_high_score`, newScoreInput)
    displayCurrentGame(currentGame)
})


fetch ("http://localhost:3000/games")
.then(response => response.json())
.then(games => {
    games.forEach(game => {   
    addGameContent(game)
        })
    displayCurrentGame(games[0])    
    })