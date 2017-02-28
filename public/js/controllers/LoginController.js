'use strict'

angular.module('AppReceitas')
  .controller('LoginController', LoginController)

function LoginController(toastr, $location) {

  const vm = this

  vm.user = {}

  vm.Login = Login
  function Login() {
    if (vm.user.login == 'fatima' && vm.user.password == 'frizzi05') {
      localStorage.setItem('login', true)
      toastr.success('Logado! Redirecionando...')
      $location.path('/receita')
    } else {
      localStorage.clear()
      toastr.error('Usuário ou senha inválida')
    }
  }
}