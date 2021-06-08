import {typer} from './typer.js';

const app = {
    init () {
        this.cacheElements();
        this.toTop();
        typer();
    },

    cacheElements() {
        this._topButton = document.querySelector('.to-top-button');
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
    }
}

app.init();