export default function setGameButton() {
    let button = document.getElementById('checkbox');
    button.addEventListener('click', (e)=>{
        if(e.path[0].checked) {
            startGame();
        } else {
            stopGame();
        }
    })
}

function startGame() {
    console.log('game')
}

function stopGame() {
    console.log('stop');
}