'use strict'

angular.module('AppReceitas')
.controller('ReceitasController', ReceitasController)

function ReceitasController($http, $routeParams, toastr, $location) {

  const vm = this

  vm.params = $routeParams


  vm.receita = {}
  vm.receitas = {}
  vm.ingrediente = {}
  vm.unidades = {}



  vm.ListarUnidades = ListarUnidades
  function ListarUnidades() {
    $http({
      method: 'GET',
      url: '/api/unidades/retrieve'
    })
    .then(function(ret){
      if(ret.status == 200) {
        vm.unidades = ret.data
      }
    })
  }

  vm.Gravar = Gravar
  function Gravar() {
    if ($routeParams.id) {
      $http({
        method: 'POST',
        url: '/api/receitas/update',
        data: vm.receita
      })
      .then(function(ret){
        if(ret.status == 200) {
          toastr.success('Gravado!')
        }
      })
    } else {
      $http({
        method: 'POST',
        url: '/api/receitas/create',
        data: vm.receita
      })
      .then(function(ret){
        if(ret.status == 200) {
          toastr.success('Gravado!')
          $location.path('/receita/gravar/'+ret.data._id)
        }
      })
    }
  }

  vm.Remover = Remover
  function Remover(id) {
    if (confirm('Atenção\n\nDeseja realmente remover essa receita?\n\nEsta operação não tem volta!')) {
      $http({
        method: 'POST',
        url: '/api/receitas/delete/' + id
      })
      .then(function(ret){
        if(ret.status == 200) {
          toastr.success('Removido!')
          vm.ListarReceitas()
        }
      })
    }
  }

  vm.AdicionarIngrediente = AdicionarIngrediente
  function AdicionarIngrediente() {
    $http({
      method: 'POST',
      url: '/api/receitas/ingredientes/add/' + $routeParams.id,
      data: vm.ingrediente
    })
    .then(function(ret){
      if(ret.status == 200) {
        toastr.success('Adicionado!')
        vm.ingrediente = {}
        vm.ListarReceita()
      }
    })
  }

  vm.RemoverIngrediente = RemoverIngrediente
  function RemoverIngrediente(ingrediente) {
    $http({
      method: 'POST',
      url: '/api/receitas/ingredientes/delete/' + $routeParams.id,
      data: ingrediente
    })
    .then(function(ret){
      if(ret.status == 200) {
        toastr.success('Removido!')
        vm.ListarReceita()
      }
    })
  }

  vm.ListarReceitas = ListarReceitas
  function ListarReceitas() {
    $http({
      method: 'GET',
      url: '/api/receitas/retrieve/'
    })
    .then(function(ret){
      vm.receitas = ret.data
    })
  }

  vm.ListarReceita = ListarReceita
  function ListarReceita() {
    if ($routeParams.id) {
      $http({
        method: 'GET',
        url: '/api/receitas/retrieve/' + $routeParams.id
      })
      .then(function(ret){
        vm.receita = ret.data
      })
    }
  }
}