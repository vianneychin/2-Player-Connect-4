$('.start-button').click( () =>
    $('.how-to-play-container').css("display", 'none')
    &&
    $(".enter-player-one-name").css('display', 'inline-flex')
)
$('.enter-player-one').click( () => {
    $('.enter-player-one-name').css("display", 'none')
    &&
    $('.enter-player-two-name').css('display', 'inline-flex')
})
$('.enter-player-two').click( () => {
    $('.enter-player-two-name').css("display", 'none')
    &&
    $('#connect-four-container').css('display', 'inline-flex')
})

$('.player-one-input').keyup( () => {
    const name = $('.player-one-input').val()
    $('.player-one-name').text( name )
})
$('.player-two-input').keyup( () => {
    const name = $('.player-two-input').val()
    $('.player-two-name').text( name )
})



const game = {
    currentPlayer:{},
    players:[
        {player:"yellow", color: "#bbc687"},
        {player:"blue", color: "#c1dbdc"}
    ]
}
const playerOne = game.players[0]
const playerTwo = game.players[1]
const setPlayer = () => {
    game.currentPlayer = game.players[0]
}
const switchPlayers = () =>{
    if (game.currentPlayer === playerOne) {
        game.currentPlayer = playerTwo
    } else if (game.currentPlayer === playerTwo) {
        game.currentPlayer = playerOne
    }
}

$(`.board-column`).click((e => {
    let $column = $(e.currentTarget).children()
    for (let i = $(e.currentTarget).children().length - 1; i >= 0; i--) {
            if ($(e.currentTarget).children()[i].style.backgroundColor === "") {
                $(e.currentTarget).children()[i].style.backgroundColor = game.currentPlayer.color

                // checkVertical($column)
                // checkHorizontal($columns, i)
                // checkDiagonal()
                switchPlayers()
                return
            }
        }
    }
))
setPlayer()