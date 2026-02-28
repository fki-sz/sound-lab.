/* ----------------------------------
   タイマー
---------------------------------- */

/* ----------------------------------
   シンプルタイマー
---------------------------------- */

const alarm = new Audio("sound/alarm.mp3");

let totalSeconds = 25 * 60;   // 初期25分
let timeLeft = totalSeconds;
let timerInterval = null;
let isRunning = false;

const playPauseBtn = document.getElementById("playPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const timeDisplay = document.getElementById("timeDisplay");

/* 表示更新 */
function updateDisplay(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  timeDisplay.textContent = `${m}:${s}`;
}

/* カウント処理 */
function tick() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay(timeLeft);
    return;
  }

  // ===== 0秒になったら =====
  clearInterval(timerInterval);
  isRunning = false;

  alarm.currentTime = 0;
  alarm.play();

  playPauseBtn.textContent = "▶";
}

/* スタート */
function startTimer() {
  if (isRunning) return;

  isRunning = true;
  timerInterval = setInterval(tick, 1000);
}

/* 一時停止 */
function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

/* ▶⏸ ボタン */
playPauseBtn.addEventListener("click", () => {
  if (isRunning) {
    pauseTimer();
    playPauseBtn.textContent = "▶";
  } else {
    startTimer();
    playPauseBtn.textContent = "⏸";
  }
});

/* リセット */
resetBtn.addEventListener("click", () => {
  pauseTimer();
  timeLeft = totalSeconds;
  updateDisplay(timeLeft);
  playPauseBtn.textContent = "▶";
});

/* 分・秒変更 */
const minLabel = document.getElementById("minLabel");
const secLabel = document.getElementById("secLabel");

function updateTimeFromInput() {
  totalSeconds =
    parseInt(minLabel.textContent, 10) * 60 +
    parseInt(secLabel.textContent, 10);

  timeLeft = totalSeconds;
  updateDisplay(timeLeft);
}

document.getElementById("minUp").onclick = () => {
  let m = parseInt(minLabel.textContent, 10) + 1;
  minLabel.textContent = String(m).padStart(2, "0");
  updateTimeFromInput();
};

document.getElementById("minDown").onclick = () => {
  let m = parseInt(minLabel.textContent, 10);
  if (m > 0) {
    m--;
    minLabel.textContent = String(m).padStart(2, "0");
  }
  updateTimeFromInput();
};

document.getElementById("secUp").onclick = () => {
  let s = parseInt(secLabel.textContent);
  if (s < 59)
    secLabel.textContent = String(s + 1).padStart(2, "0");
  updateTimeFromInput();
};

document.getElementById("secDown").onclick = () => {
  let s = parseInt(secLabel.textContent);
  if (s > 0)
    secLabel.textContent = String(s - 1).padStart(2, "0");
  updateTimeFromInput();
};

/* 初期表示 */
updateDisplay(timeLeft);





/* ----------------------------------
   サウンド（ループ & 長押し停止）
---------------------------------- */
const sounds = {
  sound1: new Audio("sound/rain.mp3"),
  sound2: new Audio("sound/wave.mp3"),
  sound3: new Audio("sound/waterfall.mp3"),
  sound4: new Audio("sound/fire.mp3"),
  sound5: new Audio("sound/forest.mp3"),
  sound6: new Audio("sound/ASMR.mp3"),
  sound7: new Audio("sound/wind.mp3"),
  sound8: new Audio("sound/cafe.mp3"),
  sound9: new Audio("sound/bird.mp3"),
  sound10: new Audio("sound/summerNight.mp3"),
  sound11: new Audio("sound/electronic.wav"),
  sound12: new Audio("sound/noise.mp3"),
  sound13: new Audio("sound/meditation.mp3"),
};

Object.values(sounds).forEach(a => (a.loop = true));

function setupSoundButton(btnId, soundObj) {
  let pressTimer;
  let longPress = false;
  const btn = document.getElementById(btnId);

  function updateButtonState() {
    if (!soundObj.paused) btn.classList.add("sound-active");
    else btn.classList.remove("sound-active");
 }

  btn.addEventListener("mousedown", () => {
    longPress = false;

    pressTimer = setTimeout(() => {
      longPress = true;

      // 🔥 長押し：音源停止
      soundObj.pause();
      soundObj.currentTime = 0;

      // 🔥 長押し：ハイライト解除
      btn.classList.remove("sound-active");

      // 🔥 長押し：音量バー削除（ここが今回の追加！）
      const row = document.getElementById(`row-${btnId}`);
      if (row) row.remove();

    }, 600);
  });

  btn.addEventListener("mouseup", () => clearTimeout(pressTimer));

  btn.addEventListener("click", () => {
  if (longPress) return; // ← 長押し後は通常クリック無効

  if (soundObj.paused) {
    // --- 再生 ---
    soundObj.play();
    createVolumeControl(btnId, soundObj);
  } else {
    // --- 停止（短いクリック）---
    soundObj.pause();
    soundObj.currentTime = 0;

    // 🔥 追加：バーも消す
    const row = document.getElementById(`row-${btnId}`);
    if (row) row.remove();

    // 🔥 ボタンのハイライトも消す
    btn.classList.remove("sound-active");
  }

  updateButtonState();
});

}




setupSoundButton("sound1btn", sounds.sound1);
setupSoundButton("sound2btn", sounds.sound2);
setupSoundButton("sound3btn", sounds.sound3);
setupSoundButton("sound4btn", sounds.sound4);
setupSoundButton("sound5btn", sounds.sound5);
setupSoundButton("sound6btn", sounds.sound6);
setupSoundButton("sound7btn", sounds.sound7);
setupSoundButton("sound8btn", sounds.sound8);
setupSoundButton("sound9btn", sounds.sound9);
setupSoundButton("sound10btn", sounds.sound10);
setupSoundButton("sound11btn", sounds.sound11);
setupSoundButton("sound12btn", sounds.sound12);
setupSoundButton("sound13btn", sounds.sound13);

/* ----------------------------------
   音量調整（ここが修正点！）
---------------------------------- */
const vol1 = document.getElementById("vol1");
const vol2 = document.getElementById("vol2");
const vol3 = document.getElementById("vol3");
const vol4 = document.getElementById("vol4");
const vol5 = document.getElementById("vol5");
const vol6 = document.getElementById("vol6");
const vol7 = document.getElementById("vol7");
const vol8 = document.getElementById("vol8");
const vol9 = document.getElementById("vol9");
const vol10 = document.getElementById("vol10");
const vol11 = document.getElementById("vol11");
const vol12 = document.getElementById("vol12");
const vol13= document.getElementById("vol13");


vol1.oninput = () => (sounds.sound1.volume = vol1.value);
vol2.oninput = () => (sounds.sound2.volume = vol2.value);
vol3.oninput = () => (sounds.sound3.volume = vol3.value);
vol4.oninput = () => (sounds.sound4.volume = vol4.value);
vol5.oninput = () => (sounds.sound5.volume = vol5.value);
vol6.oninput = () => (sounds.sound6.volume = vol6.value);
vol7.oninput = () => (sounds.sound7.volume = vol7.value);
vol8.oninput = () => (sounds.sound8.volume = vol8.value);
vol9.oninput = () => (sounds.sound9.volume = vol9.value);
vol10.oninput = () => (sounds.sound10.volume = vol10.value);
vol11.oninput = () => (sounds.sound11.volume = vol11.value);
vol12.oninput = () => (sounds.sound12.volume = vol12.value);
vol13.oninput = () => (sounds.sound13.volume = vol13.value);

function createVolumeControl(id, soundObj) {
  if (document.getElementById(`row-${id}`)) return;

  const btn = document.getElementById(id);
  const displayName = btn?.dataset.name || id;

  const row = document.createElement("div");
  row.className = "volume-row";
  row.id = `row-${id}`;

  row.innerHTML = `
    <span>${displayName}</span>
    <input type="range" min="0" max="1" step="0.01" value="${soundObj.volume}" class="vol-range" />
    <button class="stop-btn">×</button>
  `;

  document.getElementById("volumePanel").appendChild(row);


  // 音量変更
  row.querySelector(".vol-range").oninput = (e) => {
    soundObj.volume = e.target.value;
  };

  // ×ボタン → 停止してバー削除 + ボタンの色も戻す（完全版）
row.querySelector(".stop-btn").onclick = () => {
  // 音停止
  soundObj.pause();
  soundObj.currentTime = 0;

  // バー削除
  const rowElm = document.getElementById(`row-${id}`);
  if (rowElm) rowElm.remove();

  // ボタンのハイライト解除（id のズレを完全にケア）
  const btn = document.getElementById(id);
  if (btn) btn.classList.remove("sound-active");

  // 念のため：全 sound-btn の中から該当ボタンを探して解除
  document.querySelectorAll(".sound-btn").forEach(b => {
    if (b.id === id) b.classList.remove("sound-active");
  });
};


}



/* ----------------------------------
   ツールチップ（アイコン吹き出し）
---------------------------------- */
document.querySelectorAll(".sound-btn").forEach(btn => {
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.textContent = btn.dataset.title;
  document.body.appendChild(tooltip);

  btn.addEventListener("mouseenter", () => {
    const rect = btn.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + "px";
    tooltip.style.top = rect.top - 10 + "px";
    tooltip.classList.add("show");
  });

  btn.addEventListener("mouseleave", () => {
    tooltip.classList.remove("show");
  });
});



