
var LOGIN = LOGIN || {};

LOGIN = {

  _o: {
    submit : $('#submit'),
    login : $('#login'),
    password : $('#password'),
    message: $('.message-container')
  },

  init: function() {
    this.bindEvents();
  },

  bindEvents: function() {

    this._o.submit.on('click touch', (event) => {
      event.preventDefault();
      this.checkLogin();
    });

  },

  checkLogin: function() {

    let user = {
      login: this._o.login.val(),
      password: this._o.password.val()
    }

    if(user.login.length < 1 || user.password.length < 1) {
      this.loginEmpty();
    } else {
      this.ajaxReq(user);
    }

  },

  ajaxReq: function(user) {

    $.ajax({
      type: "post",
      data: {
        login: user.login,
        password: user.password
      },
      url: "https://efigence-camp.herokuapp.com/api/login",

      error: (response) => {
        let jsonResponse = JSON.parse(response.responseText),
        errorMessage = jsonResponse.message;

        this.loginError(errorMessage);
      },

      success: (response) => {

        this.loginSuccess();

        setTimeout( () => {
          window.location.replace("http://google.com");
        }, 5000);
      }
    });

  },

  loginEmpty: function() {

    this.clearMessage();

    let text = '';

    let checkValue = () => {

      let login = this._o.login.val().length,
      password = this._o.password.val().length;

      if( login < 1 && password < 1 ) {
        text = 'Podaj swój login i hasło'
      } else if( login < 1 && !password < 1 ) {
        text = 'Podaj swój login!'
      } else {
        text = 'Podaj swoje hasło!'
      };

    };

    checkValue();

    let empty = "<small class='info'>" + text + "</small>";

    this._o.message.append(empty);

  },

  loginSuccess: function() {

    this.clearMessage();

    let timeLeft = "<span id='time-left'> 5 </span>",
    success = "<small class='success'>Za" + timeLeft + "sekund zostaniesz automatycznie przeniesiony do strony banku</small>";


    let time = 5;
    let countdown = setInterval( () => {
      let timer = $('#time-left');
      time--;
      timer.text(" " + time + " ");
      if(time <= 0) {
        clearInterval(countdown);
      }
    }, 1000);

    this._o.message.append(success);

  },

  loginError: function(message) {

    this.clearMessage();

    let error = "<small class='error'>"+message+"</small>";

    this._o.message.append(error);

  },

  clearMessage: function() {

    this._o.message.find('small').remove();

  }

};

var KEYBOARD = KEYBOARD || {};

KEYBOARD = {

  _o: {
    login: $('#login'),
    password: $('#password'),
    keyboardLogin: $('#keyboard-login'),
    keyboardPassword: $('#keyboard-password'),
    destroyLogin: $('#destroy-login'),
    destroyPassword: $('#destroy-password')
  },

  init: function() {
    this.bindEvents();
  },

  bindEvents: function() {

    this._o.keyboardLogin.on('click', () => {
      this._o.login.keyboard();
      this._o.destroyLogin.removeClass('hide');
    });

    this._o.keyboardPassword.on('click', () => {
      this._o.password.keyboard();
      this._o.destroyPassword.removeClass('hide');
    });

    this._o.destroyLogin.on('click', () => {
      let destroy = $('#login').keyboard().getkeyboard();
      destroy.destroy();
      this._o.destroyLogin.addClass('hide');
    });

    this._o.destroyPassword.on('click', () => {
      let destroy = $('#password').keyboard().getkeyboard();
      this._o.destroyPassword.addClass('hide');
      destroy.destroy();
    });

  },

}


$(document).ready(function() {

  LOGIN.init();
  KEYBOARD.init();

});
