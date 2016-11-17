
/*

   + Ajouter le champs input text Salaire
   Si le Salaire est supérieur à 1 000 000€ et que le nom est Trump
   + Afficher "Je suis président" dans une alert boostrapp
   + Créer un boutton "Voir le détail" pour afficher le nom, le prénom et le salaire dans une div Jumbotron
   + Créer un bouton "Reformatter" qui permet au clique de formatter
    - le Nom avec la premiere lettre en majuscule
    - le Prénom avec la premiere lettre en majuscule
    et les espaces remplacés par des tirets
    - Le Salaire formatter en € avec des espaces et virgules

   + A l'évenement blur (ng-blur) si le prénom est égal au nom,
   afficher "Attention votre nom doit etre différent du prénom"

   + A l'évenement keyup (ng-keyup) du salaire, changer la couleur du champs salaire par 3 classes CSS
   avec l'instruction "ng-class"
    - salaire petit: color red
    - salaire moyen: color orange
    - salaire grand: color vert
    - salaire énorme: color gold

*/

(function(){

  "use strict";


  // permet d'initialiser une APP coté JS
  //[] me permettra d'ajouter d'autres modules en dépendance
  angular.module('myApp', ['rzModule'])
            .controller('myController', myController);
            //Permet de créer un controlleur dans une APP


    //FOnction de mon controlleur (1 controlleur = 1 fonction);
    //scope est un objet définissant la scope de mon contrôleur;

    function myController($scope){

      $scope.nom = "FAUREL";
      $scope.prenom = "Thibaut";
      $scope.salaire = 0;
      $scope.jumbo=false;
      $scope.couleurSalaire = "";
      $scope.salaireNet = 0;
      $scope.imposition = 10;
      $scope.montreNet = false;
      $scope.monnaie = "€" ;
      $scope.mail="";
      $scope.invalidMail = false;
      $scope.modelSelect = null;

      $scope.modifierPrenom = function(){
        $scope.prenom = "Donald";
      };

      $scope.afficheDetail = function(){
        $scope.jumbo = !$scope.jumbo;
      };

      $scope.formater = function(){
        $scope.nom = $scope.nom[0].toUpperCase() + $scope.nom.slice(1).toLowerCase();

        $scope.prenom = $scope.prenom[0].toUpperCase() + $scope.prenom.slice(1).toLowerCase().replace(" ", "-");

        if(isNaN($scope.salaire)){
          $scope.salaire = $scope.salaire.replace(/[fr\€\s]+/g,"");
          $scope.salaire = $scope.salaire.replace(",",".");
          $scope.salaire = parseFloat($scope.salaire);
        }

          $scope.salaire = Intl.NumberFormat().format($scope.salaire) + " " + $scope.monnaie;
      };

      $scope.changeCouleurSalaire = function(){

        var salaireNombre = 0;
        if (isNaN($scope.salaire)) {
          salaireNombre = parseFloat($scope.salaire.replace(/[fr\€\s]+/g,"").replace(",","."));
        }
        else{
          salaireNombre = $scope.salaire;
        }

        if(salaireNombre <= 1000){
            $scope.couleurSalaire = "text-danger";
        }
        else if(salaireNombre <= 10000){
          $scope.couleurSalaire = "text-warning";
        }
        else if(salaireNombre <= 100000){
          $scope.couleurSalaire = "text-success";
        }
        else if(salaireNombre > 100000){
          $scope.couleurSalaire = "text-gold";
        }
      };

      $scope.changeNetSalaire = function(){
        var salaireBrut = 0;
        if(isNaN($scope.salaire)){
          salaireBrut =
          parseFloat($scope.salaire.replace(/(Fr)|[\€\s]+/g,"").replace(",","."));
        }
        else{
          salaireBrut = $scope.salaire;
        }
          $scope.salaireNet = Intl.NumberFormat().format(salaireBrut - (salaireBrut * $scope.imposition / 100)) + " " + $scope.monnaie;
          $scope.slider.value = $scope.imposition;
      };

      $scope.changeMonnaie = function(){
        if($scope.monnaie == "Fr"){
          if(isNaN($scope.salaire)){
          $scope.salaire = parseFloat($scope.salaire.replace(/(Fr)|[\€\s]+/g,"").replace(",",".")) * 6.56;
        }
        else{
          $scope.salaire = $scope.salaire *6.56;
        }
          $scope.salaire = Intl.NumberFormat().format($scope.salaire) + " " + $scope.monnaie;
        }else{
          if(isNaN($scope.salaire)){
          $scope.salaire = parseFloat($scope.salaire.replace(/(Fr)|[\€\s]+/g,"").replace(",",".")) / 6.56;
        }
        else{
          $scope.salaire = $scope.salaire / 6.56;
        }
          $scope.salaire = Intl.NumberFormat().format($scope.salaire) + " " + $scope.monnaie;
        }
      };

      $scope.checkMail = function(){
        if((/^[\w\.\-\_]*(@)[\w\.\-\_]*(.com)$/).test($scope.mail) === false)
        {
          $scope.invalideMail = true;
        }
        else{
          console.log('boucle mail ok');
          $scope.invalideMail = false;
        }
      };

      $scope.slider = {
        value: $scope.imposition,
        options: {
          floor: 0,
          ceil: 75,
          onChange: function(id,value){
            $scope.changeNetSalaire();
            $scope.imposition = value;
          }
        }
      };

      $scope.selectImposition = function(){
        $scope.imposition = $scope.modelImposition;
        $scope.slider.value = $scope.modelImposition;
      };
    }

}());
