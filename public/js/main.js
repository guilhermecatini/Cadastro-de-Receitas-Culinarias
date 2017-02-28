'use strict'

angular.module('AppReceitas', ['ngRoute', 'toastr', 'angularUtils.directives.dirPagination'])

  .filter('newlines', function () {
    return function (text) {
      //text += ''
      //return text.replace(new RegExp('\n', 'g'), '<br>')
    }
  })

  .factory('ControleDeLogin', function ($location, $q) {
    return {
      request: function (config) {
        const login = localStorage.getItem('login')
        console.log(login)
        if (!login) {
          $location.path('/login')
        }
        return config
      },
      responseError: function (error) {
        return $q.reject(error)
      }
    }
  })

  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('ControleDeLogin')
    $routeProvider
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
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