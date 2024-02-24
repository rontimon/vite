export function showcats(element) {

    // versio 1, haetaan kissakuvat json tiedostosta
    // muokataan index.html itetoja
    async function modifyHTMLpics() {
        console.log('Haetaan kuvat json tiedostosts');
        try {
            // fetch
            const response = await fetch('pics.json');
            if (!response.ok) throw new Error('Huono haku!');
            const images = await response.json();

            // console.log(images);
            // console.log(images[0]);
            console.log(images[1]);
            const alt = images[1].name;
            const figurecap = images[1].description;
            const imagesrc = images[1].address;
            // console.log(alt, figurecap, imagesrc);


            const kuva = document.querySelector('img');
            kuva.src = imagesrc;
            kuva.alt = alt;

            // haetaan kuvateksti html tiedostosta
            const kuvateksti = document.querySelector('figcaption');
            kuvateksti.innerText = figurecap;

        }   catch (error) {
            console.log(error);
        }
    }


    // Versio 2. jossa luodaan dom elementit itse
    async function createpics() {
        console.log('Luodaan kuvat lennossa!');
        try {
            // fetch
            const response = await fetch('pics.json');
            if (!response.ok) throw new Error('Huono haku!');
            const images = await response.json();

            // loopataan kaikki kissakuvat läpi ja generoidaan
            // jokaisesta figure, img ja figcapiton elementit
            images.forEach(element => {
                console.log(`Nimi: ${element.name}`);
                // Tänne jokaiselle itemille oma rakenne
            });

            console.log(images);

            // luodaan yksi figure
            // haetaan ensin elementti johon haluat että kuvat lisätään
            const cards = document.querySelector('#cards');
            cards.innerHTML = '';

            const alt = images[1].name;
            const figurecap = images[1].description;
            const imagesrc = images[1].address;

            // luo uusi figure elementti
            const figure = document.createElement('figure');
            cards.appendChild(figure);

            // luodaan img elementti
            const image = document.createElement('img');
            image.src = imagesrc;
            image.alt = alt;

            figure.appendChild(image);

            // luodaan elementti figcaption
            const figurecaption = document.createElement('figurecaption');
            // luodaan teksti figcaptionin sisälle
            const node = document.createTextNode(figurecap);
            // lisätään se figcaptionin lapseksi
            figurecaption.appendChild(node);
            figure.appendChild(figurecaption);
            
            
        }   catch (error) {
            console.log(error);
        }
    }
    
    // Versio 3. jossa luodaan dom elementit itse
    async function createpicsloop() {
        console.log('Luodaan kuvat!');
        try {
            // fetch
            const response = await fetch('pics.json');
            if (!response.ok) throw new Error('Huono haku!');
            const images = await response.json();


            // luodaan yksi figure elementti
            // haetaan ensin elementti johon haluat että kuvat lisätään
            const cards = document.querySelector('#cards');
            cards.innerHTML = '';


            // loopataan kaikki kissakuvat läpi ja generoidaan
            // jokaisesta figure, img ja figcapiton elementit
            images.forEach(item => {
                console.log(`Nimi: ${item.name}`);
                // Tänne jokaiselle itemille oma rakenne
            

            // luo uusi figure elementti
            const figure = document.createElement('figure');
            cards.appendChild(figure);

            // luodaan img elementti
            const image = document.createElement('img');
            image.src = item.address;
            image.alt = item.name;

            figure.appendChild(image);

            // luodaan elementti figcaption
            const figurecaption = document.createElement('figurecaption');
            // luodaan teksti figcaptionin sisälle
            const node = document.createTextNode(item.description);
            // lisätään se figcaptionin lapseksi
            figurecaption.appendChild(node);

            figure.appendChild(figurecaption);
        });
            
        }   catch (error) {
            console.log(error);
        }
    }
    console.log(element);
    // element.addEventListener('click', () => modifyHTMLpics());
    // element.addEventListener('click', () => createpics());
    element.addEventListener('click', () => createpicsloop());
    
}
    //     console.log('Moro täällä ollaan');
    //     try {
    //         const response = await fetch('https://api.chucknorris.io/jokes/random');
    //         console.log(response);
    //         if (!response.ok) throw new Error('Huono haku!');

    //         // tämäkin voi kestää
    //         const jokes = await response.json();
    //         // console.log(jokes);
    //         // console.log(jokes.id);


    //         // viedään se Divin sisään sivuille

    //         document.querySelector('.show_joke').innerHTML = jokes.value;

    //     }   catch (error) {
    //         // jos virhe niin jotain
    //         console.log(error);
    //     }
    // }
    

