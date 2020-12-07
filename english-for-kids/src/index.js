import Route from './js/route.js';
import Router from './js/router.js';

(function () {
    function init() {
        var router = new Router([
            new Route('main', 'main.html', true),            
            new Route('category1', 'category1.html'),
            new Route('category2', 'category2.html'),
            new Route('category3', 'category3.html'),
            new Route('category4', 'category4.html'),
            new Route('category5', 'category5.html'),
            new Route('category6', 'category6.html'),
            new Route('category7', 'category7.html'),
            new Route('category8', 'category8.html'),
        ]);
    }
    init();
}());