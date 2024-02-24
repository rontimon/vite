export function showjoke(element) {

    async function getjoke() {
        console.log('Moro täällä ollaan');
        try {
            const response = await fetch('https://api.chucknorris.io/jokes/random');
            console.log(response);
            if (!response.ok) throw new Error('Huono haku!');

            // tämäkin voi kestää
            const jokes = await response.json();
            // console.log(jokes);
            // console.log(jokes.id);


            // viedään se Divin sisään sivuille

            document.querySelector('.show_joke').innerHTML = jokes.value;

        }   catch (error) {
            // jos virhe niin jotain
            console.log(error);
        }
    }
    
    console.log(element);
    element.addEventListener('click', () => getjoke());
}
