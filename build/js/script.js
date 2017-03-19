'use strict';

window.load(function (evt) {
  var SPACE_KEY_CODE = 32;

  var data = JSON.parse(evt.target.response);

  var searchboxList = document.querySelector('.city-options__list');
  var searchboxResult = document.querySelector('.city-options__result');
  var searchboxInput = document.querySelector('.city-searchbox input');
  var searchboxOptions = document.querySelector('.city-options');
  var searchboxPin = document.querySelector('.city-searchbox__pin');

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
      searchboxList.firstChild.style.backgroundColor = '#1e90ff';
      searchboxList.firstChild.style.color = '#ffffff';
    }
  };

  var dataFiltred = function (src) {
    return data.filter(function (elm) {
      return elm.City.toLowerCase().indexOf(src.toLowerCase()) > -1;
    });
  };

  var inputInnerText = function (e) {
    searchboxInput.value = e.target.innerText;
    searchboxOptions.classList.add('visually-hidden');
  };

  var fillList = function () {
    var searchValue = searchboxInput.value;
    while (searchboxList.lastChild) {
      searchboxList.removeChild(searchboxList.lastChild);
    }

    dataFiltred(searchValue).forEach(function () {
      searchboxList.appendChild(searchboxResult.cloneNode(true));
    });

    renderItem(dataFiltred(searchValue));
  };

  // FILTER DATA
  searchboxInput.addEventListener('keyup', function (e) {
    if (e.keyCode !== SPACE_KEY_CODE) {
      fillList();
      searchboxOptions.classList.remove('visually-hidden');
    }
  });

  searchboxPin.addEventListener('click', function () {
    fillList();
    searchboxOptions.classList.toggle('visually-hidden');
  });

  // SELECT DATA
  searchboxList.addEventListener('click', inputInnerText, true);

  searchboxList.addEventListener('keydown', function (e) {
    if (window.utils.isActiavateEvent(e)) {
      inputInnerText(e);
    }
  }, true);
});
