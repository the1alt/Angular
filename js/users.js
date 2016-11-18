(function(){

    "use strict";

    angular.module('appUsers', [])
              .filter('triAge', function(){
                return function(ageFilter, reverse){
                    ageFilter.sort(function (a, b) {
                      if(a.age > b.age){
                        return 1;
                      }else if(a.age < b.age){
                        return -1;
                      }else{
                        return 0;
                      }
                    });
                    if(reverse === true){
                      ageFilter = ageFilter.reverse();
                    }
                    return ageFilter;
                };
              })
              .filter('triMajeur', function(){
                return function(ageFilter, afficheMajeur){
                  var el = [];
                  ageFilter.forEach(function(a){
                    if(afficheMajeur === true){
                      if(a.age >= 18){
                        el.push(a);
                      }
                    }
                    else{
                      el = ageFilter;
                    }
                  });
                  return el;
                };
              })
              .filter('filtreVille', function(){
                return function(villeFilter, triVille){
                  var el = [];
                  if (triVille == "villes"){
                    el = villeFilter;
                  }else{
                    villeFilter.forEach(function(a){
                      if(a.ville.toLowerCase() == triVille.toLowerCase()){
                        el.push(a);
                      }
                    });
                  }

                  return el;
                };
              })
              .controller('UsersCtrl', UsersCtrl);

    function UsersCtrl($scope, $filter){
      console.log("Controlleur chargé");

      //Initialisation de variables pour le filtre
      $scope.reverse=null;
      $scope.filtre = false;
      $scope.afficheMajeur = false;
      $scope.triVille = "villes";

      $scope.users = [
        {
          avatar: 'https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png',
          nom: 'FAUREL',
          prenom: 'Thibaut',
          age: 29,
          ville: 'Lyon',
          sexe: true,
          sports:['Baseball','Handball']
        },
        {
          avatar: 'https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png',
          nom: 'OIURLKJ',
          prenom: 'Marc',
          age: 39,
          ville: 'Paris',
          sexe: true,
          sports:['Foot', 'Basket', 'Handball']
        },
        {
          avatar: 'http://s1.ticketm.net/tm/en-us/dam/a/464/a0f4b7ae-b7c5-458d-8336-396ce71ae464_203561_CUSTOM.jpg',
          nom: 'BIEBER',
          prenom: 'Justine',
          age: 20,
          ville: 'New-york',
          sexe: false,
          sports:['fapping']
        },
        {
          avatar: 'https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png',
          nom: 'MAARDFJ',
          prenom: 'martine',
          age: 52,
          ville: 'Madrid',
          sexe: false,
          sports:['Foot', 'Basket', 'Baseball']
        },
      ];

      $scope.ajouterUser = function(){
        console.log("Ajouter user");
        $scope.users.push({
          avatar: $scope.avatar,
          nom: $scope.nom,
          prenom: $scope.prenom,
          age: $scope.age,
          ville: $scope.ville,
          sexe: $scope.sexe,
        });
        $scope.avatar = "";
        $scope.nom = "";
        $scope.prenom = "";
        $scope.age = "";
        $scope.ville = "";
        $scope.sexe = "";

        if ($scope.filtre === true) {
          $scope.typeTriAge();
        }


      };

      $scope.suppUser = function(id){

        $scope.users.splice(id,1);

      };

      $scope.typeTriAge = function(){

        $scope.users = $filter('triAge')($scope.users, $scope.reverse);
        $scope.filtre = true;


      };

    }//End controller



}());
