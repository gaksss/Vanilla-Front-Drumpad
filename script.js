const inputs = document.querySelector("body");

inputs.addEventListener("keydown", handlePlaySound);

function handlePlaySound(event) {
  let key = document.querySelector('.key[data-key="' + event.keyCode + '"]');
  let audio = document.querySelector('audio[data-key="' + event.keyCode + '"]');

  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing", "sound");
  setTimeout(() => {
    key.classList.remove("playing", "sound");
  }, 300);
}
