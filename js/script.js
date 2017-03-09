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


window.load(function (evt) {
  var data = JSON.parse(evt.target.response);

  var searchboxList = document.querySelector('.city-options__list');
  var searchboxResult = document.querySelector('.city-options__result');
  var searchboxInput = document.querySelector('.city-searchbox input');
  var searchboxOptions = document.querySelector('.city-options');

  // var renderItem = function (arr) {
  //   var cityResult = document.querySelectorAll('.city-options__result span');
  //   console.log(cityResult);
  //   for (var i = 0; i < arr.length; i++) {
  //     cityResult[i].textContent = arr[i].City;
  //   }
  // };

  // data.forEach(function () {
  //   searchboxList.appendChild(searchboxResult.cloneNode(true));
  // });

  // renderItem(data);

  searchboxInput.addEventListener('keyup', function () {
    searchboxOptions.style.display = 'block';

    for (var i = 0; i < 5000; i++) {
      var dataCity = data[i].City;
      var cityResult = document.querySelectorAll('.city-options__result span');

      if (dataCity.indexOf(searchboxInput.value) > -1) {
        searchboxList.appendChild(searchboxResult.cloneNode(cityResult[i].textContent = dataCity));
      }
    }
  });

  document.addEventListener('click', function () {
    searchboxOptions.style.display = 'none';
  });
});
