
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

          setTimeout( () => {
            window.location.replace("http://google.com");
          }, 5000);
        }
      });

    },

    loginEmpty: function() {

        let empty = "<small class='info'>Wpisz swój login i hasło!</small>"

        this._o.message.append(empty);

    },

    loginSuccess: function() {



    },

    loginError: function(message) {

      let error = "<small class='error'>"+message+"</small>";

      this._o.message.append(error);

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
        });

        this._o.keyboardPassword.on('click', () => {
            this._o.password.keyboard();
        });

        this._o.destroyLogin.on('click', () => {
            let destroy = $('#login').keyboard().getkeyboard();
            destroy.destroy();
        });

        this._o.destroyPassword.on('click', () => {
            let destroy = $('#password').keyboard().getkeyboard();
            destroy.destroy();
        });

    },

}


  $(document).ready(function() {

  LOGIN.init();
  KEYBOARD.init();

  });
