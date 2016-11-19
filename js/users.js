(function(){

    "use strict";

    angular.module('appUsers', ['rzModule', 'ngMap'])
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
              .filter('filtreSport', function(){
                return function(sportFilter, triSport){
                  var el = [];
                  if (triSport == "tous") {
                    el = sportFilter;
                  }
                  sportFilter.forEach(function(a){
                    a.sports.forEach(function(b){
                      if(b.toLowerCase() == triSport.toLowerCase()){
                        el.push(a);
                      }
                    });
                  });
                  return el;
                };
              })
              .controller('UsersCtrl', UsersCtrl);

    function UsersCtrl($scope, $filter, NgMap){
      console.log("Controlleur chargé");

      //Initialisation de variables pour le filtre
      $scope.reverse=null;
      $scope.filtre = false;
      $scope.afficheMajeur = false;
      $scope.triVille = "villes";
      $scope.triSport = "tous";
      $scope.sexe=null;
      $scope.sports=[];



      $scope.users = [
        {
          avatar: 'https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png',
          nom: 'FAUREL',
          prenom: 'Thibaut',
          age: 29,
          ville: 'Lyon',
          sexe: true,
          sports: ['Baseball','Handball'],
          coords: {
            latitude : 45.750000,
            longitude : 4.850000,
          }
        },
        {
          avatar: 'https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png',
          nom: 'OIURLKJ',
          prenom: 'Marc',
          age: 39,
          ville: 'Paris',
          sexe: true,
          sports:['Foot', 'Basket', 'Handball'],
          coords: {
            latitude : 48.866667,
            longitude : 2.333333,
          }
        },
        {
          avatar: 'http://s1.ticketm.net/tm/en-us/dam/a/464/a0f4b7ae-b7c5-458d-8336-396ce71ae464_203561_CUSTOM.jpg',
          nom: 'BIEBER',
          prenom: 'Justine',
          age: 20,
          ville: 'Lyon',
          sexe: false,
          sports:['fapping'],
          coords: {
            latitude : 45.750000,
            longitude : 4.850000,
          }
        },
        {
          avatar: 'https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png',
          nom: 'MAARDFJ',
          prenom: 'martine',
          age: 52,
          ville: 'Paris',
          sexe: false,
          sports:['Foot', 'Basket', 'Baseball'],
          coords: {
            latitude : 48.866667,
            longitude : 2.333333,
          }
        },
        {
          avatar: 'https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png',
          nom: 'OJ',
          prenom: 'Mar',
          age: 39,
          ville: 'Marseille',
          sexe: true,
          sports:['Foot', 'Basket', 'Handball'],
          coords: {
            latitude : 43.300000,
            longitude : 5.400000,
          }
        },
        {
          avatar: 'http://s1.ticketm.net/tm/en-us/dam/a/464/a0f4b7ae-b7c5-458d-8336-396ce71ae464_203561_CUSTOM.jpg',
          nom: 'BER',
          prenom: 'Jine',
          age: 20,
          ville: 'Paris',
          sexe: false,
          sports:['fapping'],
          coords: {
            latitude : 48.866667,
            longitude : 2.333333,
          }
        },
        {
          avatar: 'https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png',
          nom: 'MAAJ',
          prenom: 'mare',
          age: 52,
          ville: 'Marseille',
          sexe: false,
          sports:['Foot', 'Basket', 'Baseball'],
          coords: {
            latitude : 43.300000,
            longitude : 5.400000,
          }
        },
        {
          avatar: 'https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png',
          nom: 'OIULKJ',
          prenom: 'Arc',
          age: 39,
          ville: 'Paris',
          sexe: true,
          sports:['Foot', 'Basket', 'Handball'],
          coords: {
            latitude : 48.866667,
            longitude : 2.333333,
          }
        },
        {
          avatar: 'http://s1.ticketm.net/tm/en-us/dam/a/464/a0f4b7ae-b7c5-458d-8336-396ce71ae464_203561_CUSTOM.jpg',
          nom: 'BIEBR',
          prenom: 'Justie',
          age: 20,
          ville: 'Lyon',
          sexe: false,
          sports:['fapping'],
          coords: {
            latitude : 45.750000,
            longitude : 4.850000,
          }
        },
        {
          avatar: 'https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png',
          nom: 'MADFJ',
          prenom: 'mrtine',
          age: 52,
          ville: 'Marseille',
          sexe: false,
          sports:['Foot', 'Basket', 'Baseball'],
          coords: {
            latitude : 43.300000,
            longitude : 5.400000,
          }
        }
      ];

      var length = $scope.users.length;


      $scope.slider = {
        value: $scope.nbrAfficheUser,
        options: {
          floor: 0,
          ceil: $scope.users.length,
          onChange: function(id,value){
            $scope.nbrAfficheUser = value;
          }
        }
      };

      $scope.ajouterUser = function(){

        //récupération des checkbox sport et display array
        angular.forEach($scope.checkSport, function(value, key){
          $scope.sports.push(key);
        });
        if($scope.sports.length===0){
          $scope.sports = [""];
        }

        //injection des values
        $scope.users.push({
          avatar: $scope.avatar,
          nom: $scope.nom,
          prenom: $scope.prenom,
          age: $scope.age,
          ville: $scope.ville,
          sexe: $scope.sexe,
          sports: $scope.sports
        });

        //réinitialisation des values
        $scope.avatar = "";
        $scope.nom = "";
        $scope.prenom = "";
        $scope.age = "";
        $scope.ville = "";
        $scope.sexe = null;
        $scope.sports = "";
        $scope.checkSport= [];


        if ($scope.filtre === true) {
          $scope.typeTriAge();
        }
        length += 1;
        //augmentation du max du range slider
        $scope.maxAfficheUser = length;
        $scope.nbrAfficheUser = length;
        console.log("max :" + length);
        console.log("value :" + length);

      };

      $scope.suppUser = function(id){

        $scope.users.splice(id,1);

      };

      $scope.typeTriAge = function(){

        $scope.users = $filter('triAge')($scope.users, $scope.reverse);
        $scope.filtre = true;

      };


$scope.lat = 46.6795944656402;
$scope.lng = 2.43896484375;
$scope.zoom = 5;

      $scope.afficheCarte = function(id){
        $scope.lat = $scope.users[id].coords.latitude;
        $scope.lng = $scope.users[id].coords.longitude;
        $scope.zoom = 8;
        // $scope.users(id);
        NgMap.getMap().then(function(map) {
          console.log(map.getCenter());
          console.log('markers', map.markers);
          console.log('shapes', map.shapes);
        });
      };
    }//End controller



}());
