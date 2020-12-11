import { closeburger } from "./burger";
import cards from './cards';

export function createCard(obj) {
    let card = document.createElement('div');
    card.classList.add('setcard');
    card.setAttribute('id', `card_${obj.word}`);

    const divimg = document.createElement('div');
    divimg.classList.add('cardimg')
    const img = document.createElement('img');
    img.setAttribute('src', obj.image);
    img.classList.add('setimg');

    const word = document.createElement('p');
    word.textContent = obj.word;

    const audio = document.createElement('audio');
    audio.setAttribute('src', obj.audioSrc);

    const rotate = document.createElement('div');
    rotate.classList.add('rotate');
    rotate.addEventListener('click', ()=>{
        card.classList.toggle('rotate-card');
    })
    
    divimg.append(img);
    card.append(divimg);
    card.append(word);
    card.append(audio);
    card.append(rotate);

    card.addEventListener('click', ()=>{
      audio.currentTime = 0;
      audio.play();
      closeburger();
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
