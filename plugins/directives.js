import Vue from 'vue';
import TinyGesture from 'tinygesture';

Vue.directive("swipe", {
  bind: function(el, binding) {
    const gesture = new TinyGesture(el);
    gesture.on('swiperight', event => {
      // The gesture was a right swipe.
      console.log('swiped right');
    });
    gesture.on('swipeleft', event => {
      // The gesture was a left swipe.
      console.log('swiped left');
    });
  }
});


