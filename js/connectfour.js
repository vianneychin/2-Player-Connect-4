const CLICK_start_to_continue =
 $('.start-button').click( () =>
    $('.how-to-play-container').css("display", 'none')
    &&
    $(".enter-player-one-name").css('display', 'inline-flex')
)
const CLICK_enter_to_continue_for_player_one =
 $('.enter-player-one').click( () => {
    $('.enter-player-one-name').css("display", 'none')
    &&
    $('.enter-player-two-name').css('display', 'inline-flex')
})
const CLICK_enter_to_continue_for_player_two =
 $('.enter-player-two').click( () => {
    $('.enter-player-two-name').css("display", 'none')
    &&
    $('#connect-four-container').css('display', 'inline-flex')
})
const KEYPRESS_enter_to_continue_for_player_one =
 $('.player-one-input').on('keypress', (event => {
    const key = event.which
    if(key == 13) {
        $('.enter-player-one').click()
    }
}))
const KEYPRESS_enter_to_continue_for_player_two =
 $('.player-two-input').on('keypress', (event => {
    const key = event.which
    if(key == 13) {
        $('.enter-player-two').click()
    }
}))
const DISPLAY_player_one_name = 
 $('.player-one-input').keyup( () => {
    const name = $('.player-one-input').val()
    $('.player-one-name').text(name)
})
const DISPLAY_player_two_name = 
$('.player-two-input').keyup( () => {
    const name = $('.player-two-input').val()
    $('.player-two-name').text(name)
})
const game = {
    currentPlayer:{},
    players:[
        {player:"one", color: "rgb(187, 198, 135)"},
        {player:"two", color: "rgb(193, 219, 220)"}
    ]
}
const   playerArray = []
const      $columns = $(`.board-column`)
const     setPlayer = () => game.currentPlayer = game.players[0]
                        $('.border-one').css("border", "solid 10px #bbc687")
const   checkWinner = () => {
    $('.winner-declaration').css('display', 'inline')
    $('#connect-four-game-board').css('pointer-events', 'none')
}
const switchPlayers = () =>{
    const playerOne = game.players[0]
    const playerTwo = game.players[1]
    if (game.currentPlayer === playerOne) {
        game.currentPlayer = playerTwo,
        $('.border-two').css("border", "")
        $('.border-one').css("border", "solid 10px #bbc687")
    } else if (game.currentPlayer === playerTwo) {
        game.currentPlayer = playerOne
        $('.border-one').css("border", "")
        $('.border-two').css("border", "solid 10px #c1dbdc")
    }
}
const checkVertical = (arrayOfColumn) => { 
    for (let i = 0; i < 3; i++) {
        if ((arrayOfColumn[i]).style.backgroundColor === game.currentPlayer.color &&
            (arrayOfColumn[i + 1]).style.backgroundColor === game.currentPlayer.color &&
            (arrayOfColumn[i + 2]).style.backgroundColor === game.currentPlayer.color &&
            (arrayOfColumn[i + 3]).style.backgroundColor === game.currentPlayer.color) {
                checkWinner()
        }
    }
}
$columns.click((e => {
    let $column = $(e.currentTarget).children()
    for (let i = $(e.currentTarget).children().length - 1; i >= 0; i--) {
            if ($(e.currentTarget).children()[i].style.backgroundColor === "") {
                $(e.currentTarget).children()[i].style.backgroundColor = game.currentPlayer.color

                checkVertical($column)
                // checkHorizontal($columns, i)
                // checkDiagonal()
                switchPlayers()
                return
            }
        }
    }
))
setPlayer()