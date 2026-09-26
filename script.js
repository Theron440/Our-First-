(function () {
  "use strict";

  document.documentElement.classList.add("js");
  var body = document.body;
  var file = location.pathname.split("/").pop().toLowerCase() || "index.html";
  var themes = {
    "index.html": "cover",
    "prologue.html": "prologue",
    "chapter1.html": "chapter1",
    "chapter2.html": "chapter2",
    "chapter3.html": "chapter3",
    "chapter4.html": "chapter4",
    "chapter5.html": "chapter5",
    "chapter6.html": "chapter6",
    "chapter7.html": "chapter7",
    "chapter8.html": "chapter8",
    "chapter9.html": "chapter9",
    "chapter10.html": "chapter10",
    "chapter11.html": "chapter11",
    "chapter12.html": "chapter12",
    "ending.html": "ending"
  };
  body.dataset.theme = themes[file] || "default";

  var isCover = !!document.querySelector(".cover");
  var page = document.querySelector(".prologue-page");
  var content = document.querySelector(".prologue-content");
  var letter = document.querySelector(".letter");

  /* Celestial atmosphere */
  var stars = document.createElement("div");
  stars.className = "star-field";
  stars.setAttribute("aria-hidden", "true");
  for (var i = 0; i < 72; i++) {
    var star = document.createElement("i");
    star.className = "star";
    star.style.setProperty("--x", Math.random() * 100 + "%");
    star.style.setProperty("--y", Math.random() * 100 + "%");
    star.style.setProperty("--s", (Math.random() * 2.6 + 1) + "px");
    star.style.setProperty("--d", (Math.random() * 5 + 3) + "s");
    star.style.setProperty("--delay", (Math.random() * -8) + "s");
    stars.appendChild(star);
  }
  body.prepend(stars);

  var decor = document.createElement("div");
  decor.className = "page-decor";
  decor.setAttribute("aria-hidden", "true");
  var decorSets = {
    cover: ["✦", "✧", "⋆", "♡", "✦", "·", "✧", "⋆", "♡", "✦", "·", "✧", "✦", "⋆", "♡", "✧", "·", "✦"],
    prologue: ["♡", "✦", "♡", "✧", "⋆", "♡", "✦", "·", "♡", "✧"],
    chapter1: ["✦", "⋆", "✧", "·", "✦", "⋆", "✧", "✦", "⋆", "·", "✧", "✦"],
    chapter2: ["♡", "♡", "✧", "♡", "✦", "♡", "·", "♡", "✧", "♡", "✦", "♡"],
    chapter3: ["✧", "⋆", "✦", "·", "⋆", "✧", "✦", "⋆", "✧", "·", "✦", "⋆"],
    chapter4: ["♡", "✦", "♡", "∞", "♡", "✧", "♡", "✦", "♡", "∞", "✧", "♡"],
    chapter5: ["☾", "✦", "✧", "⋆", "☽", "✦", "·", "✧", "☾", "⋆", "✦", "·"],
    chapter6: ["♡", "✦", "♡", "✧", "♡", "⋆", "✦", "♡", "✦", "♡", "✧", "⋆"],
    chapter7: ["✦", "·", "✧", "✦", "·", "✧", "⋆", "·", "✦", "·", "⋆", "✧"],
    chapter8: ["❦", "✦", "❧", "⋆", "❦", "✧", "❧", "✦", "❦", "⋆", "✧", "❧"],
    chapter9: ["✦", "·", "⋆", "☾", "·", "✧", "⋆", "·", "✦", "☾", "✧", "⋆"],
    chapter10: ["✦", "▣", "✧", "•", "▣", "⋆", "✦", "•", "✧", "▣", "✦", "•"],
    chapter11: ["·", "✧", "⋆", "☾", "·", "✦", "⋆", "·", "✧", "☾", "⋆", "·"],
    chapter12: ["✦", "♡", "✧", "✦", "♡", "✧", "✦", "♡", "✧", "✦", "♡", "✧", "✦", "♡", "✧", "✦", "♡", "✧"],
    ending: ["✦", "♡", "✧", "✦", "♡", "✧", "⋆", "♡", "✦", "♡", "✧", "⋆", "✦", "♡", "✧", "🎉", "✦", "♡"]
  };
  var symbols = decorSets[body.dataset.theme] || decorSets.cover;
  var decorPositions = [
    [6,8],[92,13],[5,25],[94,34],[7,45],[91,53],[4,66],[95,76],[9,88],[87,91],[2,58],[97,6],[15,18],[84,25],[12,76],[82,66],[18,94],[76,9]
  ];
  symbols.forEach(function (symbol, index) {
    var d = document.createElement("span");
    d.textContent = symbol;
    d.className = "decor-item decor-" + index;
    d.style.setProperty("--i", index);
    var pos = decorPositions[index % decorPositions.length];
    d.style.left = pos[0] + "%";
    d.style.top = pos[1] + "%";
    d.style.setProperty("--size", (14 + (index % 4) * 4) + "px");
    decor.appendChild(d);
  });
  var targetPage = document.querySelector(".cover, .prologue-page");
  if (targetPage) targetPage.prepend(decor);
  else body.prepend(decor);

  requestAnimationFrame(function () { body.classList.add("page-ready"); });

  if (isCover) {
    var coverOrb = document.createElement("div");
    coverOrb.className = "cover-orb";
    coverOrb.setAttribute("aria-hidden", "true");
    body.querySelector(".cover").prepend(coverOrb);
  }

  if (page && content) {
    var label = document.querySelector(".page-label");
    var chapterText = label ? label.textContent.trim() : "";
    var topbar = document.createElement("div");
    topbar.className = "book-topbar";
    topbar.innerHTML = '<span>BOOK I</span><span>THE YEAR WE BECAME US</span><span>' + chapterText + '</span>';
    page.prepend(topbar);

    if (letter) {
      letter.querySelectorAll("p").forEach(function (p, index) {
        p.classList.add("reveal");
        p.style.setProperty("--reveal-delay", Math.min(index * 35, 280) + "ms");
      });
    }

    var progress = document.createElement("div");
    progress.className = "reading-progress";
    progress.innerHTML = "<span></span>";
    progress.setAttribute("aria-hidden", "true");
    body.appendChild(progress);

    var topButton = document.createElement("button");
    topButton.className = "back-to-top";
    topButton.type = "button";
    topButton.setAttribute("aria-label", "Back to top");
    topButton.innerHTML = "↑";
    body.appendChild(topButton);

    function updateProgress() {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progress.firstElementChild.style.width = amount + "%";
      topButton.classList.toggle("visible", window.scrollY > 520);
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    topButton.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

    if (letter && "IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.01 });
      letter.querySelectorAll(".reveal").forEach(function (p) { observer.observe(p); });
    } else if (letter) {
      letter.querySelectorAll(".reveal").forEach(function (p) { p.classList.add("revealed"); });
    }

    document.querySelectorAll("a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) === "#" || href.indexOf("://") !== -1) return;
      link.addEventListener("click", function (event) {
        if (event.defaultPrevented) return;
        event.preventDefault();
        body.classList.add("page-leaving");
        setTimeout(function () { window.location.href = href; }, 180);
      });
    });
  }

  document.querySelectorAll(".open-button").forEach(function (link) {
    link.addEventListener("click", function (event) {
      var href = link.getAttribute("href");
      if (!href) return;
      event.preventDefault();
      body.classList.add("cover-opening");
      setTimeout(function () { window.location.href = href; }, 360);
    });
  });

  /* Continuous soundtrack memory: song + position survive page changes. */
  var tracks = [
    { id: "cosmic", title: "Cosmic Love", artist: "Florence + the Machine", src: "cosmic-love.mp3" },
    { id: "exception", title: "The Only Exception", artist: "Paramore", src: "only-exception.mp3" },
    { id: "opera", title: "Opera House", artist: "Your cover", src: "opera-house.mp3" },
    { id: "video", title: "Video Games", artist: "Lana Del Rey", src: "video-games.mp3" }
  ];
  var savedTrack = localStorage.getItem("ourFirstYearTrack") || "cosmic";
  var savedTime = parseFloat(localStorage.getItem("ourFirstYearTime") || "0");
  var savedPlaying = localStorage.getItem("ourFirstYearPlaying") === "1";
  var current = tracks.find(function (t) { return t.id === savedTrack; }) || tracks[0];

  /* Anniversary confetti on the final page */
  if (body.dataset.theme === "ending") {
    var confetti = document.createElement("div");
    confetti.className = "confetti-layer";
    confetti.setAttribute("aria-hidden", "true");
    var confettiColors = ["#8fb9ff", "#d9e8ff", "#b98cff", "#79dcff", "#ff9fca", "#ffd36e", "#ffffff"];
    for (var c = 0; c < 55; c++) {
      var piece = document.createElement("span");
      piece.className = "confetti";
      piece.style.setProperty("--x", Math.random() * 100 + "%");
      piece.style.setProperty("--w", (Math.random() * 5 + 4) + "px");
      piece.style.setProperty("--h", (Math.random() * 9 + 5) + "px");
      piece.style.setProperty("--r", (Math.random() * 180 - 90) + "deg");
      piece.style.setProperty("--drift", (Math.random() * 160 - 80) + "px");
      piece.style.setProperty("--dur", (Math.random() * 7 + 7) + "s");
      piece.style.setProperty("--delay", (Math.random() * -12) + "s");
      piece.style.setProperty("--c", confettiColors[c % confettiColors.length]);
      confetti.appendChild(piece);
    }
    body.appendChild(confetti);
  }

  var music = document.createElement("aside");
  music.className = "music-player";
  music.setAttribute("aria-label", "Our soundtrack");
  music.innerHTML =
    '<div class="music-note" aria-hidden="true">♪</div>' +
    '<div class="music-info"><span class="music-kicker">OUR SOUNDTRACK</span><strong class="music-title"></strong><span class="music-artist"></span></div>' +
    '<button class="music-prev" type="button" aria-label="Previous song">‹</button>' +
    '<button class="music-play" type="button" aria-label="Play soundtrack">▶</button>' +
    '<button class="music-next" type="button" aria-label="Next song">›</button>' +
    '<audio preload="metadata"></audio>';
  body.appendChild(music);

  var audio = music.querySelector("audio");
  var title = music.querySelector(".music-title");
  var artist = music.querySelector(".music-artist");
  var play = music.querySelector(".music-play");
  var prev = music.querySelector(".music-prev");
  var next = music.querySelector(".music-next");

  function setTrack(track, autoPlay) {
    current = track;
    audio.src = track.src;
    title.textContent = track.title;
    artist.textContent = track.artist;
    localStorage.setItem("ourFirstYearTrack", track.id);
    audio.load();
    audio.addEventListener("loadedmetadata", function restoreOnce() {
      audio.removeEventListener("loadedmetadata", restoreOnce);
      if (track.id === savedTrack && savedTime > 0 && savedTime < audio.duration - 2) audio.currentTime = savedTime;
      if (autoPlay) audio.play().catch(function () {});
    });
  }

  function setPlayingState(isPlaying) {
    play.textContent = isPlaying ? "Ⅱ" : "▶";
    play.setAttribute("aria-label", isPlaying ? "Pause soundtrack" : "Play soundtrack");
    localStorage.setItem("ourFirstYearPlaying", isPlaying ? "1" : "0");
  }

  play.addEventListener("click", function () {
    if (audio.paused) audio.play().then(function () { setPlayingState(true); }).catch(function () { setPlayingState(false); });
    else { audio.pause(); setPlayingState(false); }
  });
  prev.addEventListener("click", function () {
    var i = tracks.findIndex(function (t) { return t.id === current.id; });
    savedTime = 0;
    setTrack(tracks[(i - 1 + tracks.length) % tracks.length], !audio.paused);
  });
  next.addEventListener("click", function () {
    var i = tracks.findIndex(function (t) { return t.id === current.id; });
    savedTime = 0;
    setTrack(tracks[(i + 1) % tracks.length], !audio.paused);
  });
  audio.addEventListener("play", function () { setPlayingState(true); });
  audio.addEventListener("pause", function () { setPlayingState(false); });
  audio.addEventListener("ended", function () {
    var i = tracks.findIndex(function (t) { return t.id === current.id; });
    savedTime = 0;
    setTrack(tracks[(i + 1) % tracks.length], true);
  });
  audio.addEventListener("timeupdate", function () {
    if (audio.currentTime > 0) localStorage.setItem("ourFirstYearTime", String(audio.currentTime));
  });
  window.addEventListener("beforeunload", function () {
    localStorage.setItem("ourFirstYearTime", String(audio.currentTime || 0));
    localStorage.setItem("ourFirstYearPlaying", audio.paused ? "0" : "1");
  });

  setTrack(current, false);
  if (savedPlaying) {
    audio.addEventListener("canplay", function tryResume() {
      audio.removeEventListener("canplay", tryResume);
      audio.play().then(function () { setPlayingState(true); }).catch(function () { setPlayingState(false); });
    });
  }
})();
