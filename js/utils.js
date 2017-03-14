'use strict';

(function () {
  var ENTER_KEY_CODE = 13;

  window.utils = {
    isActiavateEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
    },
  };
})();
