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


      $scope.salaire = parseInt(document.getElementById('salaire').value);

    */

// Ajouter un champs "Imposition en %" en pourcentage
// qui va modifier au keyup la valeur du Salaire brut en net automatiquement

// Mettre en place un environement GULP (et ses composants) et Bower
// Créer une checkbox avec un label permettant de modifier le salaire
// en le  convertissant en Francs et d'afficher "salaire en franc" juste après l'input

// Créer un input qui permet de saisir son email et verifie si son email est en .com
// afficher un message d'erreur si l'email est invalide



// Créer un input "range" (de 1 à 10) qui augmente ou diminue l'imposition par la valeur de l'input range

// Créer un select avec les options suivante:
 /*
 - Imposition à 10%
 - Imposition à 20%
 - Imposition à 30%
 - Imposition à 50%
 - Imposition à 75%

  A chaque changement (ng-change), cela modifie le salaire et l'imposition en %

*/





/**
* Exercice 2: Avec Boostrapp Twitter et la DOC JS ;)
*/


/*
*
* + Créer un bouton par utilisateur pour pouvoir supprimer
* un utilisateur
*
* + Afficher le sexe par utilisateur: Homme ou Femme
*
* + Ajouter un Avatar (url d'image) par utilisateur lors de l'affichage des utilisateurs
et de la création d'utilisateur (ng-src). Valider par un blur que la photo soit gif
*
* + Créer une liste déroulante perùetant de trier par age avec 2 options:
    - Le plus Jeune
    - Le plus Vieux

   AU changement d'item selectionné, cela me trie le tableau du plus jeune au plus vieux OU
   		du plus vieux au plus jeune

  + Ajouter une checkbox pour voir apparaitre que les utilisateurs majeur quand elle est cochés

  + Ajouter 3 bouttons radios Paris - Lyon  - Marseille pour filtrer les utilisateurs par ville
  et un boutton "Toutes les villes" pour voir tout les utilisateurs

  + Ajouter par utilisateur un tableaux de Sports (au choix: Foot, Basket Baseball,Rugby, Handball )
    PuisCréer


  + Ajouter 10 utilisateurs dans votre liste d'utilisateurs puis
  	créer un input range (ou range slider en jquery/angular)
    pour limiter le nombre d'utilisateurs

  + Ajouter les coordonées ongitude et latitude dans un objet "coords" PAR utilisateurs
    et placer les utilisateurs sur une Google Map tuto: https://openclassrooms.com/courses/google-maps-javascript-api-v3
    ou module en AngularJS


    Bonus: Décliner le meme exercice mais en chargeant l'API de JsonPlaceholder
    sous l'url: https://jsonplaceholder.typicode.com/users
    Pour cela, voir comment utliser l'objet $http



  NB: ****Breaking News**** VOUS POUVEZ UTILISER LA LIBRAIRIES JS "LODASH" pour toutes vos traitementd e tableaux , objets...



  /*********************************************************************************************/
