/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************************************************************!*\
  !*** ./wp-content/themes/twentytwentythree-child/js/src/frontend_script.js ***!
  \*****************************************************************************/
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var useLS = false;
var videos = _toConsumableArray(document.querySelectorAll('.overlay'));
var container = document.querySelector('.wp-block-create-block-tmy-sequence.sequence');
var playing = 0;
var siteBlocks = document.body;
var alreadyPlayed = localStorage.getItem('sahara_sequence');
var alreadyPlayedTimeStamp = useLS ? Number(alreadyPlayed) : Date.now() - 80000;
container.addEventListener('click', function (e) {
  siteBlocks.classList.remove('loading');
  if (e.shiftKey) {
    videos[playing].pause();
    if (videos[playing + 1]) {
      videos[playing + 1].classList.remove('hidden');
      videos[playing + 1].play();
    }
  } else {
    container.classList.add('hidden');
  }
  if (useLS) {
    localStorage.setItem('sahara_sequence', Date.now());
  }
});
if (videos[0]) {
  if (!alreadyPlayedTimeStamp || alreadyPlayedTimeStamp + 60000 < Date.now()) {
    videos[0].onloadeddata = function () {
      siteBlocks.classList.remove('loading');
      if (videos[0]) {
        videos[0].addEventListener("pause", function () {
          playing++;
          videos[0].pause();
          videos[0].classList.add('hidden');
          if (videos[1]) {
            console.log('First paused, play second');
            videos[1].classList.remove('hidden');
            videos[1].play();
          }
        });
      }
      if (videos[1]) {
        videos[1].addEventListener("pause", function () {
          playing++;
          videos[1].classList.add('hidden');
          if (videos[2]) {
            console.log('Second paused, play last');
            videos[2].classList.remove('hidden');
            videos[2].play();
          }
        });
      }
      if (videos[2]) {
        videos[2].addEventListener("pause", function () {
          playing++;
          console.log('All videos played, hide container');
          videos[1].classList.add('hidden');
          videos[2].classList.add('hidden');
          if (useLS) {
            localStorage.setItem('sahara_sequence', Date.now());
          }
        });
      }
    };
  } else {
    siteBlocks.classList.remove('loading');
    videos[0].classList.add('hidden');
    container.classList.add('hidden');
  }
}
;
/******/ })()
;