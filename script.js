const word = document.getElementById('word');
const text = document.getElementById('text');
const score_el = document.getElementById('score');
const time_el = document.getElementById('time');
const endgame = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const diffucultySelect = document.getElementById('diffuculty');


const words = [
    'ayakkabı',
    'bukalemun',
    'uçak',
    'futbol',
    'kötü',
    'davranış',
    'doğal',
    'gümüşlük',
    'yarış',
    'hesap',
    'kuzey',
    'pirinç',
    'havaalanı',
    'yumurta',
    'telefon'
];

let randomWord; 

let score= 0;

let time= 10;

let difficulty='';

text.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function addWordTodDOM() {
    randomWord = getRandomWord();
    word.innerText = randomWord;
}

function updateScore() {
    score++;
    score_el.innerHTML =score;
}

function updateTime() {
    time--;
    time_el.innerHTML = time +'s';

    if(time === 0) {
        clearInterval(timeInterval);

        gameOver();
    }
}

function gameOver() {
  endgame.innerHTML = `
     <h1>Süre Doldu</h1>
     <p>Skorun: ${score} </p>
     <button onclick="location.reload()">Yeniden Başla</button>
  `;

  endgame.style.display ='flex';
}

addWordTodDOM();



text.addEventListener('input', e => {
 const insertedText = e.target.value;

 if(insertedText=== randomWord) {
     addWordTodDOM();
     updateScore();

     e.target.value='';

     if(diffucultySelect.value === 'easy') {
         time +=6;
     } else if(diffucultySelect.value ==='medium') {
         time +=4;
     }else if(diffucultySelect.value ==='hard') {
         time +=2;
     }

     updateTime();
 }
});

settingsBtn.addEventListener('click', () => 
settings.classList.toggle('hide'));


settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})