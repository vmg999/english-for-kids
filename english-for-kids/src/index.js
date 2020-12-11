import Route from './js/route.js';
import Router from './js/router.js';
import {createBurger, openburger, closeburger} from './js/burger.js';
import {insertContent} from './js/newcard.js';

(function () {
    function init() {
        var router = new Router([
            new Route('main', 'main.html', true),
            new Route('action_a', 'cards.html'),
            new Route('action_b', 'cards.html'),
            new Route('animal_a', 'cards.html'),
            new Route('animal_b', 'cards.html'),
            new Route('clothes', 'cards.html'),
            new Route('emotions', 'cards.html'),
            new Route('food', 'cards.html'),
            new Route('places', 'cards.html'),
        ]);
    }
    init();
}());


createBurger();

insertContent();
