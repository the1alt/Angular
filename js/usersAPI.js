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

    function UsersCtrl($scope, $filter, NgMap, $http){
      console.log("Controlleur chargé");

      // //Initialisation de variables pour le filtre
      // $scope.reverse=null;
      // $scope.filtre = false;
      // $scope.afficheMajeur = false;
      // $scope.triVille = "villes";
      // $scope.triSport = "tous";
      // $scope.sexe=null;
      // $scope.sports=[];


    $http({method: 'GET', url: 'https://jsonplaceholder.typicode.com/users'})
      .success(function(data) {
    $scope.users = data;
  }).error (function (data) {
    $scope.users = data || 'Request failed';
  });


//
//       $scope.slider = {
//         value: $scope.users.length,
//         options: {
//           floor: 0,
//           ceil: $scope.users.length,
//           onChange: function(id,value){
//             $scope.nbrAfficheUser = value;
//           }
//         }
//       };
//
//       $scope.ajouterUser = function(){
//
//         //récupération des checkbox sport et display array
//         angular.forEach($scope.checkSport, function(value, key){
//           $scope.sports.push(key);
//         });
//         if($scope.sports.length===0){
//           $scope.sports = [""];
//         }
//
//         //injection des values
//         $scope.users.push({
//           avatar: $scope.avatar,
//           nom: $scope.nom,
//           prenom: $scope.prenom,
//           age: $scope.age,
//           ville: $scope.ville,
//           sexe: $scope.sexe,
//           sports: $scope.sports
//         });
//
//         //réinitialisation des values
//         $scope.avatar = "";
//         $scope.nom = "";
//         $scope.prenom = "";
//         $scope.age = "";
//         $scope.ville = "";
//         $scope.sexe = null;
//         $scope.sports = "";
//         $scope.checkSport= [];
//
//
//         if ($scope.filtre === true) {
//           $scope.typeTriAge();
//         }
//         length += 1;
//         //augmentation du max du range slider
//         $scope.slider.options.ceil += 1;
//         if($scope.slider.value == $scope.slider.options.ceil){
//           $scope.slider.value += 1;
//         }
//       };
//
      $scope.suppUser = function(id){

        $scope.users.splice(id,1);

      };
//
//       $scope.typeTriAge = function(){
//
//         $scope.users = $filter('triAge')($scope.users, $scope.reverse);
//         $scope.filtre = true;
//
//       };
//
//
      $scope.lat = 46.6795944656402;
      $scope.lng = 2.43896484375;
      $scope.zoom = 5;

      $scope.afficheCarte = function(id){
        console.log(id);
        $scope.lat = parseInt($scope.users[id].address.geo.lat);
        $scope.lng = parseInt($scope.users[id].address.geo.lng);
        console.log($scope.lat);
        console.log($scope.lng);
        $scope.zoom = 8;
        // $scope.users(id);
        NgMap.getMap().then(function(map) {
          console.log(map.getCenter());
          console.log('markers', map.markers);
          console.log('shapes', map.shapes);
        });
      };
    }//End controller
//
//

}());
