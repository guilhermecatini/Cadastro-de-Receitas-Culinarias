'use strict'

angular.module('AppReceitas', ['ngRoute', 'toastr', 'angularUtils.directives.dirPagination'])

.filter('newlines', function(){
  return function(text) {
    //text += ''
    //return text.replace(new RegExp('\n', 'g'), '<br>')
  }
})

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