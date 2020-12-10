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


let burger_status=0;
let burgerIsSet=0;
let burger;
let burgermenu;

createBurger();

function createBurger(){
    burger=document.getElementById('burg');
    burgermenu=document.getElementById('burger-menu');
    burger.addEventListener('click', (e)=>{
        if(burger_status == 0){
            openburger();
        }else if(burger_status == 1){
            closeburger();
        }
        
    })
    burgerIsSet=1;
  }
  
  function openburger(){
    burger_status=1;
    burgermenu.classList.remove('burg-slide-def');
    burgermenu.classList.add('burg-slide-in');
    burger.classList.add('burger-rotate');
  }
  
  function closeburger(){
    burger_status=0;
    burgermenu.classList.remove('burg-slide-in');
    burgermenu.classList.add('burg-slide-out');
    burger.classList.add('burger-rotate-back');

    setTimeout(()=>{
        burger.classList.remove('burger-rotate');
        burger.classList.remove('burger-rotate-back');
  
        burgermenu.classList.remove('burg-slide-in');
        burgermenu.classList.remove('burg-slide-out');
        burgermenu.classList.add('burg-slide-def');
    },400);
  }