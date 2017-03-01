angular.module('app')
.controller('WeekThreeController', ['$scope', '$http', function($scope, $http) {
  
// funkcja importujaca API z pixabay i krora umozliwia wyszukiwanie zdjec na 
  $scope.searchPicture = function () {
      // searchPicture uzywam do zbindowania ng-click do rozpoczecia funkcji i lacze to z przyciskiem ktory rozpoczyna funkcjie 
      var picture = $scope.searchPictureByTag;
      // searchPictureByTag uzyam do zbindowania input fildu w polu wyszukiwania 
      var API_KEY = '4438609-0ca4e01fa6ed311f79c113532' ;
      var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(picture);

      $http.get(URL)
        .then(function(response) {
        $scope.myPhones = response.data;
        

        
        });
  };
   
}]);