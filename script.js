(function () {
  "use strict";

  document.documentElement.classList.add("js");
  var body = document.body;
  var file = location.pathname.split("/").pop().toLowerCase() || "index.html";
  var themes = {
    "index.html":"cover", "prologue.html":"prologue",
    "chapter1.html":"chapter1", "chapter2.html":"chapter2", "chapter3.html":"chapter3",
    "chapter4.html":"chapter4", "chapter5.html":"chapter5", "chapter6.html":"chapter6",
    "chapter7.html":"chapter7", "chapter8.html":"chapter8", "chapter9.html":"chapter9",
    "chapter10.html":"chapter10", "chapter11.html":"chapter11", "chapter12.html":"chapter12",
    "ending.html":"ending"
  };
  body.dataset.theme = themes[file] || "default";

  var isCover = !!document.querySelector(".cover");
  var page = document.querySelector(".prologue-page");
  var content = document.querySelector(".prologue-content");
  var letter = document.querySelector(".letter");
  var theme = body.dataset.theme;

  /* -------------------- STAR FIELD -------------------- */
  var stars = document.createElement("div");
  stars.className = "star-field";
  stars.setAttribute("aria-hidden", "true");
  for (var i = 0; i < 112; i++) {
    var star = document.createElement("i");
    star.className = "star" + (i % 17 === 0 ? " big" : "");
    star.style.setProperty("--x", Math.random() * 100 + "%");
    star.style.setProperty("--y", Math.random() * 100 + "%");
    star.style.setProperty("--s", (Math.random() * 2.8 + 1) + "px");
    star.style.setProperty("--d", (Math.random() * 4.5 + 2.5) + "s");
    star.style.setProperty("--delay", (Math.random() * -9) + "s");
    stars.appendChild(star);
  }
  body.prepend(stars);

  /* -------------------- EDGE DECORATIONS -------------------- */
  var decor = document.createElement("div");
  decor.className = "page-decor";
  decor.setAttribute("aria-hidden", "true");
  var decorSets = {
    cover:["✦","✧","⋆","♡","✦","☾","✧","⋆","♡","✦","·","✧","✦","⋆","♡","☽","✧","·","✦","♡","✧","⋆","✦","♡"],
    prologue:["♡","✦","♡","✧","⋆","♡","✦","·","♡","✧","♡","✦","♡","⋆","✧","♡"],
    chapter1:["✦","⋆","✧","·","✦","⋆","✧","✦","⋆","·","✧","✦","⋆","✧","·","✦"],
    chapter2:["♡","♡","✧","♡","✦","♡","·","♡","✧","♡","✦","♡","♡","✧","♡","✦"],
    chapter3:["✧","⋆","✦","·","⋆","✧","✦","⋆","✧","·","✦","⋆","✧","✦","·","⋆"],
    chapter4:["♡","✦","♡","∞","♡","✧","♡","✦","♡","∞","✧","♡","✦","♡","∞","✧"],
    chapter5:["☾","✦","✧","⋆","☽","✦","·","✧","☾","⋆","✦","·","✧","☽","✦","⋆"],
    chapter6:["♡","✦","♡","✧","♡","⋆","✦","♡","✦","♡","✧","⋆","♡","✦","♡","✧"],
    chapter7:["✦","·","✧","✦","·","✧","⋆","·","✦","·","⋆","✧","·","✦","⋆","·"],
    chapter8:["❦","✦","❧","⋆","❦","✧","❧","✦","❦","⋆","✧","❧","✦","❦","⋆","❧"],
    chapter9:["✦","·","⋆","☾","·","✧","⋆","·","✦","☾","✧","⋆","·","✦","☽","⋆"],
    chapter10:["✦","▣","✧","•","▣","⋆","✦","•","✧","▣","✦","•","▣","✧","•","✦"],
    chapter11:["·","✧","⋆","☾","·","✦","⋆","·","✧","☾","⋆","·","✦","·","☽","✧"],
    chapter12:["✦","♡","✧","✦","♡","✧","✦","♡","✧","✦","♡","✧","✦","♡","✧","✦","♡","✧","✦","♡"],
    ending:["✦","♡","✧","✦","♡","✧","⋆","♡","✦","♡","✧","⋆","✦","♡","✧","🎉","✦","♡","✧","🎉","♡","✦"]
  };
  var symbols = decorSets[theme] || decorSets.cover;
  var positions = [[5,7],[93,11],[4,20],[95,29],[7,39],[92,49],[4,59],[95,70],[7,82],[90,91],[2,51],[97,5],[14,14],[85,20],[11,69],[84,58],[18,94],[77,8],[26,4],[72,95],[98,38],[2,78],[55,3],[46,96]];
  symbols.forEach(function(symbol,index){
    var d=document.createElement("span");
    d.textContent=symbol; d.className="decor-item decor-"+index; d.style.setProperty("--i",index);
    var pos=positions[index%positions.length]; d.style.left=pos[0]+"%"; d.style.top=pos[1]+"%";
    d.style.setProperty("--size",(15+(index%5)*5)+"px"); decor.appendChild(d);
  });
  var targetPage=document.querySelector(".cover, .prologue-page");
  if(targetPage) targetPage.prepend(decor); else body.prepend(decor);

  /* -------------------- LARGE THEME MOTIFS -------------------- */
  var motif=document.createElement("div");
  motif.className="theme-motif";
  motif.setAttribute("aria-hidden","true");
  function add(className, styles, text){
    var el=document.createElement("span"); el.className=className; if(text) el.textContent=text;
    Object.keys(styles||{}).forEach(function(k){el.style[k]=styles[k];}); motif.appendChild(el); return el;
  }
  function orb(size,left,top){ add("motif-orb",{width:size,height:size,left:left,top:top}); }
  function line(width,left,top,rotate){ add("motif-line",{width:width,left:left,top:top,transform:"rotate("+rotate+"deg)"}); }
  function heart(left,top,size){ add("motif-heart",{left:left,top:top,fontSize:size},"♡"); }

  if(theme==="cover"){
    orb("38vw","-12vw","8%"); orb("28vw","75vw","62%");
    add("motif-moon",{left:"50%",top:"13%",transform:"translateX(-50%)"});
    add("motif-ring",{left:"50%",top:"18%",transform:"translateX(-50%) rotate(-18deg)"});
  } else if(theme==="prologue"){
    heart("4%","18%","52px"); heart("86%","45%","62px"); heart("10%","78%","42px");
    orb("26vw","78vw","72%");
  } else if(theme==="chapter1"){
    orb("32vw","-14vw","14%"); orb("24vw","82vw","58%");
    line("48vw","5%","23%",18); line("42vw","55%","39%",-24); line("46vw","18%","72%",14);
  } else if(theme==="chapter2"){
    heart("3%","17%","76px"); heart("84%","33%","66px"); heart("7%","70%","56px"); heart("87%","80%","82px");
    orb("30vw","72vw","7%");
  } else if(theme==="chapter3"){
    orb("34vw","-15vw","58%"); orb("28vw","79vw","22%");
    line("55vw","3%","30%",-14); line("48vw","48%","64%",18);
  } else if(theme==="chapter4"){
    heart("2%","23%","72px"); heart("84%","48%","80px"); heart("10%","78%","48px");
    add("motif-ring",{left:"58%",top:"7%"}); add("motif-ring",{left:"-30%",top:"55%",transform:"rotate(24deg)"});
  } else if(theme==="chapter5"){
    add("motif-moon",{left:"72%",top:"8%"}); add("motif-ring",{left:"-26%",top:"52%",transform:"rotate(15deg)"});
    line("55vw","4%","26%",-10); line("42vw","60%","70%",14);
  } else if(theme==="chapter6"){
    heart("4%","20%","80px"); heart("83%","40%","76px"); heart("8%","78%","52px");
    orb("36vw","70vw","65%");
  } else if(theme==="chapter7"){
    orb("42vw","-20vw","15%"); orb("34vw","78vw","62%");
    line("65vw","-2%","37%",-12); line("54vw","48%","82%",17);
  } else if(theme==="chapter8"){
    add("motif-ring",{left:"-20%",top:"10%",transform:"rotate(20deg)"}); add("motif-ring",{left:"70%",top:"56%",transform:"rotate(-25deg)"});
    line("45vw","5%","31%",12); line("48vw","55%","68%",-15);
    add("motif-heart",{left:"88%",top:"22%",fontSize:"58px"},"❦");
  } else if(theme==="chapter9"){
    add("motif-moon",{left:"76%",top:"10%"}); add("motif-ring",{left:"-24%",top:"52%"});
    line("55vw","3%","35%",-13); line("45vw","56%","76%",13);
  } else if(theme==="chapter10"){
    orb("34vw","-15vw","15%"); orb("25vw","82vw","60%");
    ["14%","28%","42%","56%","70%"].forEach(function(t,idx){ add("motif-line",{width:"28vw",left:(idx%2?"62%":"-4%"),top:t,transform:"rotate("+(idx%2?-8:8)+"deg)"}); });
  } else if(theme==="chapter11"){
    orb("44vw","-22vw","35%"); orb("28vw","82vw","70%");
    line("60vw","-3%","24%",-10); line("52vw","55%","76%",14);
  } else if(theme==="chapter12"){
    heart("3%","14%","82px"); heart("84%","27%","76px"); heart("7%","72%","62px"); heart("86%","78%","92px");
    add("motif-ring",{left:"50%",top:"42%",transform:"translateX(-50%)"});
    orb("28vw","-10vw","62%");
  } else if(theme==="ending"){
    add("motif-moon",{left:"50%",top:"5%",transform:"translateX(-50%)"});
    add("motif-ring",{left:"50%",top:"7%",transform:"translateX(-50%)"});
    heart("3%","18%","90px"); heart("84%","26%","92px"); heart("8%","76%","66px"); heart("86%","72%","72px");
  }
  body.prepend(motif);

  requestAnimationFrame(function(){body.classList.add("page-ready");});

  if(isCover){
    var coverOrb=document.createElement("div"); coverOrb.className="cover-orb"; coverOrb.setAttribute("aria-hidden","true");
    body.querySelector(".cover").prepend(coverOrb);
  }

  /* -------------------- BOOK UI -------------------- */
  if(page && content){
    var label=document.querySelector(".page-label");
    var chapterText=label ? label.textContent.trim() : "";
    var topbar=document.createElement("div"); topbar.className="book-topbar";
    topbar.innerHTML='<span>BOOK I</span><span>THE YEAR WE BECAME US</span><span>'+chapterText+'</span>';
    page.prepend(topbar);

    if(letter){
      letter.querySelectorAll("p").forEach(function(p,index){p.classList.add("reveal");p.style.setProperty("--reveal-delay",Math.min(index*35,280)+"ms");});
    }

    var progress=document.createElement("div"); progress.className="reading-progress"; progress.innerHTML="<span></span>"; progress.setAttribute("aria-hidden","true"); body.appendChild(progress);
    var topButton=document.createElement("button"); topButton.className="back-to-top"; topButton.type="button"; topButton.setAttribute("aria-label","Back to top"); topButton.innerHTML="↑"; body.appendChild(topButton);
    function updateProgress(){var doc=document.documentElement;var scrollable=doc.scrollHeight-doc.clientHeight;var amount=scrollable>0?(window.scrollY/scrollable)*100:0;progress.firstElementChild.style.width=amount+"%";topButton.classList.toggle("visible",window.scrollY>520);}
    window.addEventListener("scroll",updateProgress,{passive:true}); updateProgress();
    topButton.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"});});
    if(letter && "IntersectionObserver" in window){
      var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add("revealed");observer.unobserve(entry.target);}});},{rootMargin:"0px 0px -8% 0px",threshold:.01});
      letter.querySelectorAll(".reveal").forEach(function(p){observer.observe(p);});
    } else if(letter){letter.querySelectorAll(".reveal").forEach(function(p){p.classList.add("revealed");});}
    document.querySelectorAll("a[href]").forEach(function(link){var href=link.getAttribute("href");if(!href||href.charAt(0)==="#"||href.indexOf("://")!==-1)return;link.addEventListener("click",function(event){if(event.defaultPrevented)return;event.preventDefault();body.classList.add("page-leaving");setTimeout(function(){window.location.href=href;},180);});});
  }

  document.querySelectorAll(".open-button").forEach(function(link){link.addEventListener("click",function(event){var href=link.getAttribute("href");if(!href)return;event.preventDefault();body.classList.add("cover-opening");setTimeout(function(){window.location.href=href;},360);});});

  /* -------------------- ENDING CONFETTI -------------------- */
  if(theme==="ending"){
    var confetti=document.createElement("div"); confetti.className="confetti-layer"; confetti.setAttribute("aria-hidden","true");
    var colors=["#8fc8ff","#e9f5ff","#c37cff","#58e7ff","#ff83bd","#ffd45f","#ffffff"];
    for(var c=0;c<105;c++){
      var piece=document.createElement("span"); piece.className="confetti";
      piece.style.setProperty("--x",Math.random()*100+"%"); piece.style.setProperty("--w",(Math.random()*6+4)+"px"); piece.style.setProperty("--h",(Math.random()*12+6)+"px");
      piece.style.setProperty("--r",(Math.random()*180-90)+"deg"); piece.style.setProperty("--drift",(Math.random()*220-110)+"px"); piece.style.setProperty("--dur",(Math.random()*6+6)+"s"); piece.style.setProperty("--delay",(Math.random()*-12)+"s"); piece.style.setProperty("--c",colors[c%colors.length]);
      confetti.appendChild(piece);
    }
    body.appendChild(confetti);
  }

  /* -------------------- SOUNDTRACK -------------------- */
  var tracks=[
    {id:"cosmic",title:"Cosmic Love",artist:"Florence + the Machine",src:"cosmic-love.mp3"},
    {id:"exception",title:"The Only Exception",artist:"Paramore",src:"only-exception.mp3"},
    {id:"opera",title:"Opera House",artist:"Your cover",src:"opera-house.mp3"},
    {id:"video",title:"Video Games",artist:"Lana Del Rey",src:"video-games.mp3"}
  ];
  var savedTrack=localStorage.getItem("ourFirstYearTrack")||"cosmic";
  var savedTime=parseFloat(localStorage.getItem("ourFirstYearTime")||"0");
  var savedPlaying=localStorage.getItem("ourFirstYearPlaying")==="1";
  var current=tracks.find(function(t){return t.id===savedTrack;})||tracks[0];
  var music=document.createElement("aside"); music.className="music-player"; music.setAttribute("aria-label","Our soundtrack");
  music.innerHTML='<div class="music-note" aria-hidden="true">♪</div><div class="music-info"><span class="music-kicker">OUR SOUNDTRACK</span><strong class="music-title"></strong><span class="music-artist"></span></div><button class="music-prev" type="button" aria-label="Previous song">‹</button><button class="music-play" type="button" aria-label="Play soundtrack">▶</button><button class="music-next" type="button" aria-label="Next song">›</button><audio preload="metadata"></audio>';
  body.appendChild(music);
  var audio=music.querySelector("audio"),title=music.querySelector(".music-title"),artist=music.querySelector(".music-artist"),play=music.querySelector(".music-play"),prev=music.querySelector(".music-prev"),next=music.querySelector(".music-next");
  function setTrack(track,autoPlay){
    current=track; audio.src=track.src; title.textContent=track.title; artist.textContent=track.artist; localStorage.setItem("ourFirstYearTrack",track.id); audio.load();
    audio.addEventListener("loadedmetadata",function restoreOnce(){audio.removeEventListener("loadedmetadata",restoreOnce);if(track.id===savedTrack&&savedTime>0&&savedTime<audio.duration-2)audio.currentTime=savedTime;if(autoPlay)audio.play().catch(function(){});});
  }
  function setPlayingState(isPlaying){play.textContent=isPlaying?"Ⅱ":"▶";play.setAttribute("aria-label",isPlaying?"Pause soundtrack":"Play soundtrack");localStorage.setItem("ourFirstYearPlaying",isPlaying?"1":"0");}
  play.addEventListener("click",function(){if(audio.paused){audio.play().then(function(){setPlayingState(true);}).catch(function(){setPlayingState(false);});}else{audio.pause();setPlayingState(false);}});
  prev.addEventListener("click",function(){var i=tracks.findIndex(function(t){return t.id===current.id;});savedTime=0;setTrack(tracks[(i-1+tracks.length)%tracks.length],!audio.paused);});
  next.addEventListener("click",function(){var i=tracks.findIndex(function(t){return t.id===current.id;});savedTime=0;setTrack(tracks[(i+1)%tracks.length],!audio.paused);});
  audio.addEventListener("play",function(){setPlayingState(true);});
  audio.addEventListener("pause",function(){setPlayingState(false);});
  audio.addEventListener("ended",function(){var i=tracks.findIndex(function(t){return t.id===current.id;});savedTime=0;setTrack(tracks[(i+1)%tracks.length],true);});
  audio.addEventListener("timeupdate",function(){if(audio.currentTime>0)localStorage.setItem("ourFirstYearTime",String(audio.currentTime));});
  window.addEventListener("beforeunload",function(){localStorage.setItem("ourFirstYearTime",String(audio.currentTime||0));localStorage.setItem("ourFirstYearPlaying",audio.paused?"0":"1");});
  setTrack(current,false);
  if(savedPlaying){audio.addEventListener("canplay",function tryResume(){audio.removeEventListener("canplay",tryResume);audio.play().then(function(){setPlayingState(true);}).catch(function(){setPlayingState(false);});});}
})();
