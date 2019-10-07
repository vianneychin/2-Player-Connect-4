const CLICK_start_to_continue = $('.start-button').click(
  () =>
    $('.how-to-play-container').css('display', 'none') &&
    $('.enter-player-one-name').css('display', 'inline-flex')
)
const CLICK_enter_to_continue_for_player_one = $('.enter-player-one').click(
  () => {
    $('.enter-player-one-name').css('display', 'none') &&
      $('.enter-player-two-name').css('display', 'inline-flex')
  }
)
const CLICK_enter_to_continue_for_player_two = $('.enter-player-two').click(
  () => {
    $('.enter-player-two-name').css('display', 'none') &&
      $('#connect-four-container').css('display', 'inline-flex')
  }
)
const KEYPRESS_enter_to_continue_for_player_one = $('.player-one-input').on(
  'keypress',
  event => {
    if (event.which == 13) {
      $('.enter-player-one').click()
    }
  }
)
const KEYPRESS_enter_to_continue_for_player_two = $('.player-two-input').on(
  'keypress',
  event => {
    if (event.which == 13) {
      $('.enter-player-two').click()
    }
  }
)
const DISPLAY_player_one_name = $('.player-one-input').keyup(() => {
  let name = $('.player-one-input').val()
  playerNames.push(name)
  Name = playerNames.pop()
  $('.player-one-name').text(name)
  $('.player-one-input').on('keypress', event => {
    if (event.which == 13) {
      playerNames.push(Name)
    }
  })
  $('.enter-player-one').click(() => {
    playerNames.push(Name)
  })
})
const DISPLAY_player_two_name = $('.player-two-input').keyup(() => {
  let name = $('.player-two-input').val()
  playerNames.push(name)
  Name = playerNames.pop()
  $('.player-two-name').text(name)
  $('.player-two-input').on('keypress', event => {
    if (event.which == 13) {
      playerNames.push(Name)
    }
  })
  $('.enter-player-two').click(() => {
    playerNames.push(Name)
  })
})
const game = {
  currentPlayer: {},
  players: [
    { player: 'one', color: 'rgb(187, 198, 135)' },
    { player: 'two', color: 'rgb(193, 219, 220)' }
  ]
}
const playerNames = []
const $columns = $(`.board-column`)

const setPlayer = () => (game.currentPlayer = game.players[0])
setPlayer()
const defaultPlayer = () => $('.border-one').css('border', 'solid 10px #c1dbdc')
defaultPlayer()

const checkWinner = () => {
  const array = [...new Set(playerNames)]
  if (game.currentPlayer === game.players[0]) {
    $('.winner').text(`${array[0]} WINS!!!`)
  } else {
    $('.winner').text(`${array[1]} WINS!!!`)
  }
  $('.winner-declaration').css('display', 'inline')
  $('#connect-four-game-board').css('pointer-events', 'none')
}
const switchPlayers = () => {
  const playerOne = game.players[0]
  const playerTwo = game.players[1]
  if (game.currentPlayer === playerOne) {
    game.currentPlayer = playerTwo
  } else if (game.currentPlayer === playerTwo) {
    game.currentPlayer = playerOne
  }
}
const checkVertical = count => {
  for (let i = 0; i < 3; i++) {
    if (
      count[i].style.backgroundColor === game.currentPlayer.color &&
      count[i + 1].style.backgroundColor === game.currentPlayer.color &&
      count[i + 2].style.backgroundColor === game.currentPlayer.color &&
      count[i + 3].style.backgroundColor === game.currentPlayer.color
    ) {
      checkWinner()
    }
  }
}
const checkHorizontal = (columns, index) => {
  for (let i = 0; i < 5; i++) {
    if (
      $(columns[i]).children()[index].style.backgroundColor ===
        game.currentPlayer.color &&
      $(columns[i + 1]).children()[index].style.backgroundColor ===
        game.currentPlayer.color &&
      $(columns[i + 2]).children()[index].style.backgroundColor ===
        game.currentPlayer.color &&
      $(columns[i + 3]).children()[index].style.backgroundColor ===
        game.currentPlayer.color
    ) {
      checkWinner()
    }
  }
}
const checkDiagonal = () => {
  let colorCount = 0
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      let colorCount = 0
      if (
        $columns[col].children[row].style.backgroundColor ===
        game.currentPlayer.color
      ) {
        if (col < 4) {
          for (let num = 0; num < 4; num++) {
            if (
              $columns[col + num].children[row + num].style.backgroundColor ===
              game.currentPlayer.color
            ) {
              colorCount++
            }
          }
        }
        if (col >= 3 && colorCount != 4) {
          colorCount = 0
          for (let num = 0; num < 4; num++) {
            if (
              $columns[col - num].children[row + num].style.backgroundColor ===
              game.currentPlayer.color
            ) {
              colorCount++
            }
          }
        }
        if (colorCount === 4) {
          colorCount = 1
          colorCount = 0
          checkWinner()
        }
      }
    }
    if (colorCount === 1) {
    }
  }
}
const GAME_START = $columns.click(e => {
  const $column = $(e.currentTarget).children()
  for (let i = $(e.currentTarget).children().length - 1; i >= 0; i--) {
    if ($(e.currentTarget).children()[i].style.backgroundColor === '') {
      $(e.currentTarget).children()[i].style.backgroundColor =
        game.currentPlayer.color
      checkVertical($column)
      checkHorizontal($columns, i)
      checkDiagonal()
      switchPlayers()
      return
    }
  }
})
const SWITCH_DEFAULT_OFF = $columns.click(() => {
  if (game.currentPlayer === game.players[1]) {
    $('.border-two').css('border', 'solid 10px #bbc687')
    $('.border-one').css('border', '')
  } else if (game.currentPlayer === game.players[0]) {
    $('.border-two').css('border', '')
    $('.border-one').css('border', 'solid 10px #c1dbdc')
  }
})
const home_button_reload = $('.home-button').click(() => {
  location.reload()
})
const play_again_button_reload = $('.play-again-button').click(() => {
  location.reload()
})
$('.corner-buttons').click(() => {
  location.reload()
})
