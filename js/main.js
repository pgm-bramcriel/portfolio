import {typer} from './typer.js';

const app = {
    init () {
        this.cacheElements();
        this.toTop();
        this.smoothScroll();
        this.hamburgerMenu();
        typer();
    },

    cacheElements() {
        this._topButton = document.querySelector('.to-top-button');
        this._href = document.querySelectorAll('a[href^="#"]');
        this._hamburger = document.querySelector('.nav__hamburger');
        this._navItems = document.querySelector('.nav__items');
    },

    toTop() {
        window.onscroll = () => {scrollToTop()};

        const scrollToTop = () => {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                app._topButton.classList.add('to-top--show');
            } else {
                app._topButton.classList.remove('to-top--show');
            }
        };

        this._topButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        })
    },

    smoothScroll() {
        this._href.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior:'smooth'
                })
            })
        })
    },

    hamburgerMenu() {
        this._hamburger.addEventListener('click', (e) => {
            e.preventDefault();

            this._navItems.classList.toggle('show-nav');
        })
    }
}

app.init();