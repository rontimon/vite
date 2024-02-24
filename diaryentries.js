export async function showDiaryEntries() {
    console.log('Haetaan päiväkirjamerkinnät');
    try {
        // fetch
        const response = await fetch('diary.json');
        if (!response.ok) throw new Error('Huono haku!');
        const entries = await response.json();

        // Haetaan kortti-area, johon päiväkirjamerkinnät lisätään
        const korttiArea = document.querySelector('.kortti-area');
        korttiArea.innerHTML = ''; // Tyhjennetään mahdollinen aikaisempi sisältö

        // Loopataan kaikki merkinnät läpi ja luodaan kortit
        entries.forEach(entry => {
            // Luo uusi kortti elementti
            const card = document.createElement('div');
            card.classList.add('kortti');

            // Luo vasen puoli jossa kuva
            const cardImage = document.createElement('div');
            cardImage.classList.add('kortti-img');
            const img = document.createElement('img');
            img.src = entry.image; // Oletetaan että diary.json sisältää kuvan osoitteen
            img.alt = 'Diary entry image';
            cardImage.appendChild(img);

            // Luo oikea puoli jossa päiväkirjamerkintä
            const cardDiary = document.createElement('div');
            cardDiary.classList.add('card-diary');

            const diaryDate = document.createElement('p');
            diaryDate.textContent = `Päivämäärä: ${entry.date}`;

            const diaryDescription = document.createElement('p');
            diaryDescription.textContent = entry.description;

            const readMoreBtn = document.createElement('a');
            readMoreBtn.classList.add('btn-read-more');
            readMoreBtn.textContent = 'Lue lisää';
            // oletetaan, että on olemassa linkki, johon 'Lue lisää' -nappi vie
            readMoreBtn.href = entry.readMoreLink;

            // Lisää päivämäärän ja kuvauksen päiväkirjamerkintään
            cardDiary.appendChild(diaryDate);
            cardDiary.appendChild(diaryDescription);
            cardDiary.appendChild(readMoreBtn);

            // Lisää kuvan ja päiväkirjamerkinnän kortille
            card.appendChild(cardImage);
            card.appendChild(cardDiary);

            // Lisää kortin kortti-areaan
            korttiArea.appendChild(card);
        });
        
    } catch (error) {
        console.error('Virhe haettaessa päiväkirjamerkintöjä: ', error);
    }
}
