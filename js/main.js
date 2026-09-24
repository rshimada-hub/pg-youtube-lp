// 都道府県セレクト（存在する場合のみ）
var PREF = "北海道 青森県 岩手県 宮城県 秋田県 山形県 福島県 茨城県 栃木県 群馬県 埼玉県 千葉県 東京都 神奈川県 新潟県 富山県 石川県 福井県 山梨県 長野県 岐阜県 静岡県 愛知県 三重県 滋賀県 京都府 大阪府 兵庫県 奈良県 和歌山県 鳥取県 島根県 岡山県 広島県 山口県 徳島県 香川県 愛媛県 高知県 福岡県 佐賀県 長崎県 熊本県 大分県 宮崎県 鹿児島県 沖縄県".split(" ");
document.querySelectorAll("select.pref").forEach(function(sel){
  PREF.forEach(function(p){
    var o = document.createElement("option"); o.value = p; o.textContent = p; sel.appendChild(o);
  });
});

// 実績メダルのカウントアップ
var io = new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(!e.isIntersecting || e.target.dataset.done) return;
    e.target.dataset.done = "1";
    var el = e.target, to = parseInt(el.dataset.to,10), dur = 1300, st = null;
    requestAnimationFrame(function step(ts){
      if(!st) st = ts;
      var p = Math.min((ts-st)/dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1-p,3)));
      if(p < 1) requestAnimationFrame(step);
    });
  });
}, {threshold:.4});
document.querySelectorAll(".count").forEach(function(c){ io.observe(c); });

// スクロールで表示
var rio = new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); rio.unobserve(e.target); } });
}, {threshold:.1});
document.querySelectorAll(".rv").forEach(function(el){ rio.observe(el); });

// CTAクリック: 長距離スクロール中に表示アニメが暴れないよう、先に全要素を表示させる
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener("click", function(e){
    var t = document.querySelector(a.getAttribute("href"));
    if(!t) return;
    e.preventDefault();
    // 表示アニメーション待ちと遅延読み込みで高さが変わると着地位置がずれるので、先に確定させる
    document.querySelectorAll(".rv").forEach(function(el){ el.classList.add("on"); });
    document.querySelectorAll('img[loading="lazy"]').forEach(function(im){ im.loading = "eager"; });
    var root = document.documentElement;
    var far = Math.abs(t.getBoundingClientRect().top) > 2500;
    function jump(smooth){
      if(smooth){ t.scrollIntoView({behavior:"smooth", block:"start"}); return; }
      var prev = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      t.scrollIntoView({block:"start"});
      root.style.scrollBehavior = prev;
    }
    jump(!far);
    // 画像の読み込みでずれた分をあとから補正する（scroll-margin分のずれは正常なので除く）
    var margin = parseFloat(getComputedStyle(t).scrollMarginTop) || 0;
    [250, 700, 1400].forEach(function(ms){
      setTimeout(function(){
        var gap = t.getBoundingClientRect().top - margin;
        if(Math.abs(gap) > 8){ jump(false); }
      }, ms);
    });
    history.pushState(null, "", a.getAttribute("href"));
  });
});

// FV右下バナーを閉じる
var fc = document.getElementById("floatClose");
if(fc){ fc.addEventListener("click", function(){ document.getElementById("heroFloat").classList.add("hide"); }); }

// 平松動画：クリックでLP内インライン再生（native video）。サムネイルはposterとして表示。
(function(){
  var thumb=document.getElementById("rvPlay"), btn=document.getElementById("rvBtn"), v=document.getElementById("rvVideo");
  function play(){
    if(!v) return;
    v.setAttribute("controls","");
    thumb.classList.add("playing");
    var pr=v.play();
    if(pr && pr.catch){ pr.catch(function(){}); }
  }
  if(thumb){
    thumb.addEventListener("click", function(e){ if(e.target.tagName!=="VIDEO" || !v.hasAttribute("controls")){ play(); } });
    thumb.addEventListener("keydown", function(e){ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); play(); } });
  }
  if(btn){ btn.addEventListener("click", play); }
})();

// 申込フォームが画面に映っている間はフローティングバナーを控えめにする
var contactSec = document.getElementById("contact");
var heroFloatEl = document.getElementById("heroFloat");
if(contactSec && heroFloatEl && "IntersectionObserver" in window){
  var io2 = new IntersectionObserver(function(entries){
    heroFloatEl.classList.toggle("form-mode", entries[0].isIntersecting);
  }, {threshold:0.12});
  io2.observe(contactSec);
}

// 埋め込みフォーム(iframe)の高さ自動調整。
// 同一オリジン（本番HP＝pure-growth.co.jp配下）に設置された場合は中身の高さにフィットさせる。
// 別オリジン（GitHub Pages等でのプレビュー）ではCSSのmin-heightで表示する。
(function(){
  var f = document.getElementById("pgFormFrame");
  if(!f) return;
  function resize(){
    try {
      var d = f.contentWindow.document;
      var h = Math.max(d.body.scrollHeight, d.documentElement.scrollHeight);
      if(h && h > 200){ f.style.height = h + "px"; }
    } catch(e){ /* クロスオリジン時はmin-heightのまま */ }
  }
  f.addEventListener("load", function(){ resize(); [400,1000,2000].forEach(function(ms){ setTimeout(resize, ms); }); });
  window.addEventListener("resize", resize);
})();
