'use strict';

window.load(function (evt) {
  var data = JSON.parse(evt.target.response);

  var searchboxList = document.querySelector('.city-options__list');
  var searchboxResult = document.querySelector('.city-options__result');
  var searchboxInput = document.querySelector('.city-searchbox input');
  var searchboxOptions = document.querySelector('.city-options');
  var searchboxPin = document.querySelector('.city-searchbox__pin');
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
  };

  var dataFiltred = function (src) {
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

      dataFiltred(searchValue).forEach(function () {
        searchboxList.appendChild(searchboxResult.cloneNode(true));
      });

      renderItem(dataFiltred(searchValue));

      searchboxOptions.classList.remove('visually-hidden');
    }
  });

  searchboxPin.addEventListener('click', function () {
    data.forEach(function () {
      searchboxList.appendChild(searchboxResult.cloneNode(true));
    });

    renderItem(data);

    searchboxOptions.classList.toggle('visually-hidden');
  });

  // SELECT DATA
  searchboxList.addEventListener('click', function (e) {
    inputInnerText(e);
  }, true);

  searchboxList.addEventListener('keydown', function (e) {
    if (window.utils.isActiavateEvent(e)) {
      inputInnerText(e);
    }
  }, true);
});
