import { closeburger } from "./burger";
import cards from './cards';

let isRotate = false;

export function createCard(obj) {

    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', `card_${obj.word}`);

    let front = document.createElement('div');
    front.classList.add('front');

    const divimg = document.createElement('div');
    divimg.classList.add('cardimage');
    divimg.style.backgroundImage = `url('${obj.image}')`;

    const word = document.createElement('p');
    word.textContent = obj.word;

    const rotate = document.createElement('div');
    rotate.classList.add('rotate-btn');
    rotate.style.backgroundImage = "url('img/rotate.png')";
    rotate.addEventListener('click', (e)=>{
        rotate.classList.toggle('hide');
        e.stopPropagation();
        card.classList.toggle('rotate-card');
        isRotate = true;
    })

    front.append(divimg);
    front.append(word);
    front.append(rotate);

    const audio = document.createElement('audio');
    audio.setAttribute('src', obj.audioSrc);

    let back = document.createElement('div');
    back.classList.add('back');
    
    const backdivimg = document.createElement('div');
    backdivimg.classList.add('cardimage');
    backdivimg.style.backgroundImage = `url('${obj.image}')`;

    const backword = document.createElement('p');
    backword.textContent = obj.translation;

    back.append(backdivimg);
    back.append(backword);
    
    card.append(front);
    card.append(audio);
    card.append(back);
    

    front.addEventListener('click', ()=>{
      audio.currentTime = 0;
      audio.play();
      closeburger();
    })

    card.addEventListener('mouseleave', ()=>{
        if(isRotate){
            isRotate = false;
            card.classList.toggle('rotate-card');
            rotate.classList.toggle('hide');
        }
    })

    return card;
}

export function insertContent() {
    let content = document.getElementById('cards');
    let current_cards = cards[window.location.hash.replace('#', '')];

    if(content){
        current_cards.forEach(element => {
            let newcard = createCard(element);
            content.append(newcard);
        });
    }
    
}
