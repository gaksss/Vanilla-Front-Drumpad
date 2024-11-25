document.addEventListener("keydown", handlePlaySound);
document.addEventListener("keyup", handleKeyUp);

function handlePlaySound(event) {
  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  if (event.repeat) {
    return;
  }
  if (!key) {
    return;
  }
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing", "sound");
}

function handleKeyUp(event) {
  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  if (!key) {
    return;
  }
  key.classList.remove("playing", "sound");
}

document.addEventListener("keydown", handleRec);
let recInput = [];
let rec = false;
function handleRec(event) {
  if (event.keyCode === 82 && rec == false) {
    
    console.log("début enregistrement");
    rec = true;
    return;
  }
  if (rec == true) {
    recInput.push(event.keyCode);
  }
  if (event.keyCode === 82 && rec == true) {
    rec = false;
    recInput.pop();
    console.log("enregistrement terminé");
    console.log(recInput);
  }
  
}
