(function(){

    "use strict";

    angular.module('appUsers', ['rzModule', 'ngMap'])
              .filter('triPosition', function(){
                return function(users, affichePosition){
                  var el = [];
                  if (users) {
                    users.forEach(function(a){
                      if (affichePosition === "Nord") {
                        if(a.address.geo.lat > 0){
                            console.log("nord");
                            el.push(a);
                        }
                      }
                      else if(affichePosition === "Sud"){
                        if(a.address.geo.lat < 0){
                            el.push(a);
                        }
                      }
                      else{
                        el = users;
                      }
                    });
                    return el;
                  }
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

      //Initialisation de variables pour le filtre
      // $scope.reverse=null;
      // $scope.filtre = false;
      // $scope.afficheMajeur = false;
      // $scope.triVille = "villes";
      // $scope.triSport = "tous";
      // $scope.sexe=null;
      // $scope.sports=[];
      NgMap.getMap().then(function(map) {
        console.log('map', map);
        $scope.map = map;
      });

      $scope.affichePosition = "tous";
      $scope.showMap = false;

      $scope.mapShow = function(){
        $scope.showMap = !$scope.showMap;

        if($scope.showMap === true){
          angular.element(document.querySelector('.map')).removeClass("mapClose").addClass('mapOpen');
        }else{
          angular.element(document.querySelector('.map')).removeClass('mapOpen').addClass('mapClose');
        }
      };

      $http.get("https://jsonplaceholder.typicode.com/users").
      success(function(data) {
      	$scope.users = data;
        $scope.users.forEach(function(a){
          a.position = [a.address.geo.lat,a.address.geo.lng];
        });
      }).

      error(function(data) {
      	document.getElementById("erreur").innerHTML = "Erreur lors de l'appel du json";
      });


      $scope.lat = 0;
      $scope.lng = 2.43896484375;
      $scope.zoom = 1;

      $scope.afficheCarte = function(id){
        $scope.lat = $scope.users[id].address.geo.lat;
        $scope.lng = $scope.users[id].address.geo.lng;
        // $scope.users(id);
        NgMap.getMap().then(function(map) {
          console.log(map.getCenter());
          console.log('markers', map.markers);
          console.log('shapes', map.shapes);
        });
      };

      $scope.showDetail = function(e, user) {
        console.log(e, user);
        $scope.user = user;
        $scope.map.showInfoWindow('foo-iw', user.id);
      };



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
//       $scope.suppUser = function(id){
//
//         $scope.users.splice(id,1);
//
//       };
//
//       $scope.typeTriAge = function(){
//
//         $scope.users = $filter('triAge')($scope.users, $scope.reverse);
//         $scope.filtre = true;
//
//       };
//
//

    }//End controller



}());
