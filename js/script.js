'use strict';

// LOAD DATA
(function () {
  var CITIES_DATE = '../kladr.json';
  window.load = function (onload) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onload);
    xhr.open('GET', CITIES_DATE);
    xhr.send();
  };
})();


window.load(function (evt) {
  var data = JSON.parse(evt.target.response);

  var searchboxList = document.querySelector('.city-options__list');
  var searchboxResult = document.querySelector('.city-options__result');
  var searchboxInput = document.querySelector('.city-searchbox input');
  var searchboxOptions = document.querySelector('.city-options');
  var KEY_SPACE = 32;

  var renderItem = function (arr) {
    var cityResult = document.querySelectorAll('.city-options__result span');
    for (var i = 0; i < arr.length; i++) {
      cityResult[i].textContent = arr[i].City;
    }
  };

  var dateFiltred = function (src) {
    return data.filter(function (elm) {
      return elm.City.toLowerCase().indexOf(src.toLowerCase()) > -1;
    });
  };

  // var test = function () {
  //   searchboxList.firstChild.style.background = '#1e90ff';
  // };

  // FILTER DATA
  searchboxInput.addEventListener('keyup', function (evt) {
    var searchValue = searchboxInput.value;

    if (evt.keyCode !== KEY_SPACE) {
      while (searchboxList.lastChild) {
        searchboxList.removeChild(searchboxList.lastChild);
      }

      dateFiltred(searchValue).forEach(function () {
        searchboxList.appendChild(searchboxResult.cloneNode(true));
      });

      renderItem(dateFiltred(searchValue));

      searchboxOptions.style.display = 'block';
    }
  });

  // HIDE LIST
  document.addEventListener('click', function () {
    searchboxOptions.style.display = 'none';
  });

  // SELECT DATA
  searchboxList.addEventListener('click', function (e) {
    searchboxInput.value = e.target.innerText;
  }, true);
});
