//For jekyll serving 
//Change  curly braces  with [[ and ]] for jekyll serve
/*     angular.module("currenctConverterApp",[], function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }); */

angular.module("currenctConverterApp",[]);

(function(){
    var countryCodesApi= 'http://www.apilayer.net/api/list?access_key=47c56403b9a2101159bbeffbba4072e3&format=1'
    var currencyRatesApi = 'http://apilayer.net/api/live?access_key=47c56403b9a2101159bbeffbba4072e3'
    var ratingFrom = null;
    var ratingTo = null;

    //This is the currency controller
    var currencyController = function($scope,$http) {
        $scope.currencyData =[]
        
        //Get Country Codes
        $http({
            method: 'GET',
            url: countryCodesApi
          }).then(function successCallback(response) {
                var countryCodes = response.data.currencies;
                $scope.currencyData.codes = countryCodes;
                $scope.fromCountry = "USD"
                $scope.toCountry= "TRY"

                //Get rates based on USD
                $http({
                    method: 'GET',
                    url: currencyRatesApi
                }).then(function successCallback(response) {
                        var currencyRates = response.data.quotes;
                        console.log(currencyRates);
                        $scope.currencyData.rates = currencyRates;
                        ratingFrom = 'USD' + $scope.fromCountry;
                        ratingTo = 'USD' + $scope.toCountry
                        $scope.result = $scope.currencyData.rates[ratingTo]
                    }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
        });



       $scope.onCountryUpdate=function() {
            console.log("From counry",$scope.fromCountry)
            console.log("To counry",$scope.toCountry)
            ratingFrom = 'USD' + $scope.fromCountry;
            ratingTo = 'USD' + $scope.toCountry;
            console.log("ratingFrom",$scope.currencyData.rates[ratingFrom])
            console.log("ratingTo",$scope.currencyData.rates[ratingTo])
            console.log("Result",$scope.currencyData.rates[ratingTo]/$scope.currencyData.rates[ratingFrom])
            console.log("Quantity",$scope.quantity)
            $scope.result = $scope.quantity * ($scope.currencyData.rates[ratingTo]/$scope.currencyData.rates[ratingFrom])
       }

       $scope.changeConversionDirection = function(){
            var temp = $scope.fromCountry;
            $scope.fromCountry = $scope.toCountry
            $scope.toCountry = temp
            ratingFrom = 'USD' + $scope.fromCountry;
            ratingTo = 'USD' + $scope.toCountry
            console.log("From counry",$scope.fromCountry)
            console.log("To counry",$scope.toCountry)
            console.log("ratingFrom",$scope.currencyData.rates[ratingFrom])
            console.log("ratingTo",$scope.currencyData.rates[ratingTo])
            $scope.result = $scope.quantity * ($scope.currencyData.rates[ratingTo]/$scope.currencyData.rates[ratingFrom])
       }

    }

     //Register contorller to the module
     angular.module("currenctConverterApp").controller("currencyController", currencyController);
})();

