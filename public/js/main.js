'use strict'

angular.module('AppReceitas', ['ngRoute', 'toastr'])

.config(function ($routeProvider) {
  $routeProvider
  .when('/receita', {
    templateUrl: 'partials/receita_listar.html',
    controller: 'ReceitasController',
    controllerAs: 'vm'
  })
  .when('/receita/gravar/:id?', {
    templateUrl: 'partials/receita_gravar.html',
    controller: 'ReceitasController',
    controllerAs: 'vm'
  })
  .when('/receita/:id', {
    templateUrl: 'partials/receita.html',
    controller: 'ReceitasController',
    controllerAs: 'vm'
  })
  .otherwise({
    redirectTo: '/receita'
  })
})