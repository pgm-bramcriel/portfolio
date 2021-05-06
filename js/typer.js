export const typer = () => {
    const words = ['Webdesigner.', 'Programmer.', 'UI-UX Designer.'];
    let counter = 0;
    let index = 0;
    let currentWord = '';
    let letter = '';

    function delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n * 1000);
        })
    }

    (async function type() {
        if (counter === words.length) {
            counter = 0;
        };
        currentWord = words[counter];
        letter = currentWord.slice(0, ++index);
        const typerContainer = document.querySelector('.typer');
        typerContainer.innerHTML = letter;
        if (letter.length === currentWord.length) {
            counter++;
            index = 0;
            await delay(0.5);
        };
        setTimeout(type, 200);
    }());
}