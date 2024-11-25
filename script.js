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
  if (event.keyCode === 82 || event.keyCode === 80) {
    console.log(event.keyCode);
    return;
  }
  audio.currentTime = 0;

  audio.play();

  key.classList.add("playing", "sound");
}

function handleKeyUp(event) {
  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  key.classList.remove("playing", "sound");
}
