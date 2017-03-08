'use strict';

(function () {
  var CITIES_DATE = '../kladr.json';
  window.load = function (onload) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onload);
    xhr.open('GET', CITIES_DATE);
    xhr.send();
  };
})();

// (function () {
//   var searchboxInput = document.querySelector('.city-searchbox input');
//   var searchboxOptions = document.querySelector('.city-options');
//
//   searchboxInput.addEventListener('keydown', function (evt) {
//     searchboxOptions.style.display = 'block';
//     console.log(evt.key);
//   });
//
//   document.addEventListener('click', function () {
//     searchboxOptions.style.display = 'none';
//   });
// })();

window.load(function (evt) {
  var data = JSON.parse(evt.target.response);

  var searchboxList = document.querySelector('.city-options__list');
  var searchboxResult = document.querySelector('.city-options__result');
  var searchboxInput = document.querySelector('.city-searchbox input');
  var searchboxOptions = document.querySelector('.city-options');

  var renderItem = function (arr) {
    var cityResult = document.querySelectorAll('.city-options__result span');
    for (var i = 0; i < arr.length; i++) {
      cityResult[i].textContent = arr[i].City;
    }
  };

  data.forEach(function () {
    searchboxList.appendChild(searchboxResult.cloneNode(true));
  });

  searchboxInput.addEventListener('keydown', function () {
    searchboxOptions.style.display = 'block';

    renderItem(data);
  });

  document.addEventListener('click', function () {
    searchboxOptions.style.display = 'none';
  });
});
