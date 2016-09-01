
"use strict";

var LOGIN = LOGIN || {};

LOGIN = {

  _o: {
    submit : $('#submit'),
    login : $('#login'),
    password : $('#password'),
    message : $('.message-container'),
    balance : $('#balance'),
    funds : $('#funds'),
    payments : $('#payments'),
    baseURL : "https://efigence-camp.herokuapp.com/api/"
  },

  // Init
  init: function() {
    this.bindEvents();
  },

  // Bind events to desired element
  bindEvents: function() {

    this._o.submit.on('click touch', (event) => {
      event.preventDefault();
      this.checkLogin();
    });

  },

  /**
   * [checkLogin]
   * @ create and pass object
   */
  checkLogin: function() {

    let user = {
      method : "post",
      url : this._o.baseURL + "login",
      login : this._o.login.val(),
      password : this._o.password.val(),
      error : this.postError,
      success : this.postSuccess
    };

    if(user.login.length < 1 || user.password.length < 1) {
      this.loginEmpty();
    } else {
      this.ajaxReq(user);
    }

  },

  /**
   * [postError]
   * @param  {[json]} response [get JSON from API, parse it]
   * invoke loginError with parsed message
   */
  postError: function(response) {

    let jsonResponse = JSON.parse(response.responseText),
    errorMessage = jsonResponse.message;

    LOGIN.loginError(errorMessage);

  },

  /**
   * [postSuccess]
   * invoke loginSuccess and change window.location
   */
  postSuccess: function() {

    LOGIN.loginSuccess();

    setTimeout( () => {
      window.location.replace("http://google.com");
    }, 5000);
  },


  /**
   * [loginEmpty]
   * invoked when login inputs are empty
   */
  loginEmpty: function() {

    this.clearMessage();

    let text = '';

    let checkValue = () => {

      let login = this._o.login.val().length,
      password = this._o.password.val().length;

      if( login < 1 && password < 1 ) {
        text = 'Podaj swój login i hasło';
      } else if( login < 1 && !password < 1 ) {
        text = 'Podaj swój login!';
      } else {
        text = 'Podaj swoje hasło!';
      }

    };

    checkValue();

    let empty = "<small class='info'>" + text + "</small>";

    this._o.message.append(empty);

  },

  /**
   * [loginSuccess]
   * if login === success, invoke this function [timer + message]
   */
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

  /**
   * [loginError]
   * @param  {[string]} message
   * Show error message
   */
  loginError: function(message) {

    this.clearMessage();

    let error = "<small class='error'>"+message+"</small>";

    this._o.message.append(error);

  },

  /**
   * [clearMessage]
   * Clear message = only one message of any type [info/error/success] can be shown
   */
  clearMessage: function() {

    this._o.message.find('small').remove();

  },

  thousandSeperator: function(numb) {

    return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  },

  getError: function() {
    console.log('Error, bad URL or something went wrong!');
  },

  getSuccess: (response) => {

    let _ = LOGIN,
        currency = " PLN";

    let content = response.content[0],
        balance = _.thousandSeperator(content.balance),
        funds = _.thousandSeperator(content.funds),
        payments = _.thousandSeperator(content.payments);

    LOGIN._o.balance.text(balance + currency);
    LOGIN._o.funds.text(funds + currency);
    LOGIN._o.payments.text(payments + currency);


  },

  loadData: function() {

    let getInfo = {
      method : "get",
      url : this._o.baseURL + "data/summary",
      login : '',
      password : '',
      error : this.getError,
      success : this.getSuccess
    };

    this.ajaxReq(getInfo);

  },

  /**
   * [ajaxReq]
   * @param  {[object]} obj [object that defines function behauviour]
   * pass object data, invoke desired error/success function
   */
  ajaxReq: function(obj) {
    obj = obj || {};
    $.ajax({
      type: obj.method,
      data: {
        login: obj.login,
        password: obj.password
      },
      url: obj.url,

      error: (response) => {
        obj.error(response);
      },

      success: (response) => {
        obj.success(response);
      }

    });

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

};


$(document).ready(function() {

  LOGIN.init();
  LOGIN.loadData();
  KEYBOARD.init();

});
