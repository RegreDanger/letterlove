const buttons = document.querySelector('.reset');
$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");

  envelope.click(function () {
    open();
  });
  btn_open.click(function () {
    open();
  });
  btn_reset.click(function () {
    close();
  });

  function open() {
    if (envelope.hasClass("closed")) {
      envelope.removeClass("closed").addClass("open");
    } else {
      envelope.removeClass("close").addClass("open");
    }
	if ($("#pagegame").length === 0) { // Comprueba si el botón ya fue agregado
      $(".reset").children().eq(2).before('<button id="pagegame">Avanzar<3</button>');
      // Agregar el evento al botón recién añadido
      $("#pagegame").click(function () {
        redirect();
      });
    }
  }

  function redirect() {
    window.location.href = 'question.html';
  }

  function close() {
    envelope.addClass("close").removeClass("open");
  }
});


