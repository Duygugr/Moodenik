let selectedMood = "";
let selectedLang = "";
let songs = [];


const moodBtn = document.querySelectorAll(".mood-btn");
const langBtn = document.querySelectorAll(".lang-btn");
const songList = document.querySelector("#song-list")


runEvents();

function runEvents(){
    
    moodBtn.forEach(btn =>{
        btn.addEventListener("click",moodButtons)
    });

    langBtn.forEach(btn => btn.addEventListener("click", langButtons))

}

function moodButtons(event){
    const btn = event.currentTarget;
    const moodvalue = btn.dataset.mood.trim();

    moodBtn.forEach(b=>b.classList.remove("active"))

    btn.classList.add("active");
   

    selectedMood = moodvalue;

    check();

}

function langButtons(event){
   const btn = event.currentTarget;
   const langValue = btn.dataset.lang.trim();

   langBtn.forEach(b=> b.classList.remove("active"))

   btn.classList.add("active");

   selectedLang = langValue;

   check();

}



fetch("songs.json")
    .then(res => res.json())
    .then ( data => songs = data ); 

function check(){
    if(selectedMood && selectedLang){
        getSongs(selectedMood,selectedLang)
    }
}


function getSongs(mood, lang) {
    let filtered = [];

    if(lang === "mix") {
        
        filtered = songs.filter(song => song.mood === mood);
        filtered.sort(() => Math.random() - 0.5);
    } else {
        
        filtered = songs.filter(song => song.mood === mood && song.lang === lang);
    }


    songList.innerHTML = filtered.map(song => SpotifyId(song.id)).join("");
}




function SpotifyId (id){
    return `
    <iframe style='border-radius:12px' src ="https://open.spotify.com/embed/track/${id}" width="70% "height="152 "frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
}
    


