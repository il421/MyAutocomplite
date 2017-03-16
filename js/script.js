'use strict';

window.load(function (evt) {
  var data = JSON.parse(evt.target.response);

  var searchboxList = document.querySelector('.city-options__list');
  var searchboxResult = document.querySelector('.city-options__result');
  var searchboxInput = document.querySelector('.city-searchbox input');
  var searchboxOptions = document.querySelector('.city-options');
  var SPACE_KEY_CODE = 32;

  var renderItem = function (arr) {
    var cityResult = document.querySelectorAll('.city-options__result span');
    if (arr.length === 0) {
      searchboxList.textContent = 'Не найдено';
      searchboxList.style.padding = '5px';
    } else {
      for (var i = 0; i < arr.length; i++) {
        cityResult[i].textContent = arr[i].City;
        searchboxList.style.padding = '';
      }
    }
    searchboxOptions.style.display = 'block';
  };

  var dateFiltred = function (src) {
    return data.filter(function (elm) {
      return elm.City.toLowerCase().indexOf(src.toLowerCase()) > -1;
    });
  };

  var inputInnerText = function (e) {
    searchboxInput.value = e.target.innerText;
  };

  // FILTER DATA
  searchboxInput.addEventListener('keyup', function (e) {
    var searchValue = searchboxInput.value;

    if (e.keyCode !== SPACE_KEY_CODE) {
      while (searchboxList.lastChild) {
        searchboxList.removeChild(searchboxList.lastChild);
      }

      dateFiltred(searchValue).forEach(function () {
        searchboxList.appendChild(searchboxResult.cloneNode(true));
      });

      renderItem(dateFiltred(searchValue));
    }
  });

  // HIDE LIST
  document.addEventListener('click', function () {
    searchboxOptions.style.display = 'none';
  });

  // SELECT DATA
  searchboxList.addEventListener('click', function (e) {
    inputInnerText(e);
    searchboxList.firstChild.style.background = '#ffffff';
    searchboxList.firstChild.style.color = '#404040';
  }, true);

  searchboxList.addEventListener('keydown', function (e) {
    if (window.utils.isActiavateEvent(e)) {
      inputInnerText(e);
    }
  }, true);
});
