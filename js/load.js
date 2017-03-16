'use strict';

// LOAD DATA
(function () {
  var CITIES_DATE = '../kladr.json';
  var loaderRing = document.querySelector('.loader');
  var errorInformation = document.querySelector('.error');
  var errorUpdate = document.querySelector('.error__update');
  var timerLoader = function () {
    setInterval(function () {
      loaderRing.style.display = 'none';
    }, 1000);
  };

  window.load = function (onload) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', onload);
    xhr.open('GET', CITIES_DATE);

    errorUpdate.addEventListener('click', function (evt) {
      xhr.addEventListener('load', onload);
      errorInformation.style.display = 'none';
    });

    xhr.addEventListener('error', function () {
      errorInformation.style.display = 'flex';
    });

    xhr.addEventListener('timeout', function (evt) {
      timerLoader(loaderRing.style.display = 'flex');
    });
    xhr.timeout = 500;

    xhr.send();
  };
})();
