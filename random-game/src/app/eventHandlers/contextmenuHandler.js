import { body } from "../data/variables.js";

// чтобы не появлялось контекстное меню при длительном таче
body.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

