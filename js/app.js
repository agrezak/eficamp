$(document).ready(function() {

  var LOGIN = LOGIN || {};

  LOGIN = {

    _o: {
      submit : $('#submit'),
      login : $('#login'),
      password : $('#password'),
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
        console.log('dupa!')
      } else {
        this.ajaxReq(user.login,user.password);
      }

    },

    ajaxReq: function(login, password) {

      $.ajax({
        type: "post",
        data: {
          login: login,
          password: password
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

    loginSuccess: function() {



    },

    loginError: function(message) {

      let error = "<small class='error'>"+message+"</small>";

      $('#submit').append(error);

    }

  }


  LOGIN.init();


});
