document.addEventListener("keydown", handlePlaySound);
document.addEventListener("keyup", handleKeyUp);

function handlePlaySound(event) {
  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`); // permets d'animer les touches
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`); // permets d'appeler l'audio
  if (event.repeat) {
    // empèche le son de se jouer plusieurs fois sans relacher
    return;
  }
  if (!key) {
    //limite les touches a celles déclarés dans l'index
    return;
  }
  if (event.keyCode == 80 || event.keyCode == 82) {
    return;
  }
  audio.currentTime = 0; //mets le son a 0 afin de le lancer sans latence
  audio.play(); // lance l'audio
  key.classList.add("playing", "sound"); // ajoute la classe CSS pour animer
}

// FONCTION HANDLE KEYUP qui permets d'enlever la classe css quand la touche est relevée
function handleKeyUp(event) {
  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  if (!key) {
    return;
  }
  key.classList.remove("playing", "sound");
}

// FONCTION QUI PERMETS D'ENREGISTRER LES TOUCHES
document.addEventListener("keydown", handleRec);

let recInput = []; // Stocke les keyCode
let recTiming = []; // Stocke les délais
let rec = false; // Indique si on enregistre ou non
let isPlaying = false; // Indique si la relecture est en cours
let start = 0; // Temps de départ de l'enregistrement
let loopInterval = null; // Intervalle pour la boucle

function handleRec(event) {
  if (event.keyCode === 82 && !rec) {
    // Début de l'enregistrement
    const record = document.querySelector("#record");
    record.classList.add("toggle");
    recInput = [];
    recTiming = [];
    console.log("Début enregistrement");
    rec = true;
    start = Date.now();
    return;
  }
  if (rec && event.keyCode !== 82) {
    // Enregistre la touche
    recInput.push(event.keyCode);
    const delay = Date.now() - start; // Temps écoulé depuis le début
    recTiming.push(delay); // Enregistre le délai
  }
  if (event.keyCode === 82 && rec) {
    // Fin de l'enregistrement
    rec = false;
    const record = document.querySelector("#record");
    record.classList.remove("toggle");
    console.log("Enregistrement terminé");
    return;
  }
  if (event.keyCode === 80) {
    // Commence ou arrête la lecture en boucle
    togglePlay();
    const play = document.querySelector("#play");
    play.classList.toggle("toggle");
  }
}

function simulateKey() {
  // Rejoue les frappes enregistrées
  recInput.forEach((input, index) => {
    setTimeout(() => {
      const newEventKeyDown = new KeyboardEvent("keydown", {keyCode:input})
      document.dispatchEvent(newEventKeyDown);
      setTimeout(() => {
        const newEventKeyUp = new KeyboardEvent("keyup", {keyCode:input})
      document.dispatchEvent(newEventKeyUp);
      }, 300);
    }, recTiming[index]); // Utilise le délai correspondant
  });

  
}



function togglePlay() {
  if (isPlaying) {
    // Si la lecture est en cours, on l'arrête
    console.log("Arrêt de la boucle");
    isPlaying = false;
    clearInterval(loopInterval); // Arrête l'intervalle de boucle
  } else {
    // Si la lecture n'est pas en cours, on la démarre
    console.log("Début de la boucle");
    isPlaying = true;
    playInLoop();
  }
}

function playInLoop() {
  if (!isPlaying) return;

  // Lance une lecture complète
  simulateKey();

  // Planifie la prochaine lecture après le dernier délai
  const totalDuration = recTiming[recTiming.length - 1] || 0;
  loopInterval = setTimeout(playInLoop, totalDuration); // Boucle après la durée totale
}
