(function() {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.userText = ''; //The text that was typed in the textbox.
  $scope.userReply = ''; //The message we send to the user after checking the textbox.
  $scope.textColor = ''; //The color of the message we send to the user.
  $scope.borderColor = ''; //The color of the border on the textbox.

  
  $scope.checkMuch = function () {
  	if ($scope.userText != "")
  	{
  		    var arrayOfStrings = $scope.userText.split(','); //Place each item separated by comma into an array.
  		    var fullString = ''; //The string we will use and modfiy to display a nice formatted message to the user.
  		    for (var i = 0; i < arrayOfStrings.length; i++) //"i" has to be defined with "var" using strict mode.
  		    {
  		    	arrayOfStrings[i] = arrayOfStrings[i].trim(); //Remove spaces from the left and right of each array item.
  		    }
  		    for (i = 0; i < arrayOfStrings.length; i++)
  		    {
  		    	if (arrayOfStrings[i] == "")
  		    	{
  		    		arrayOfStrings.splice(i, 1); //Delete any items with no string. i.e. ", ,"
  		    	}
  		    }
  			if (arrayOfStrings.length <= 3)
  			{
  				if(arrayOfStrings.length == 3)
  				{
  					fullString = arrayOfStrings[0] + ", " + arrayOfStrings[1] + ", and " + arrayOfStrings[2] + ".";
  					$scope.userReply = "Enjoy the " + fullString;
  				}
  				else if (arrayOfStrings.length == 2)
  				{
  					fullString = arrayOfStrings[0] + " and " + arrayOfStrings[1] + ".";
  					$scope.userReply = "Enjoy the " + fullString;
  				}
  				else
  				{
  					fullString = arrayOfStrings[0] + ".";
  					$scope.userReply = "Enjoy the " + fullString;
  				}
  				$scope.textColor = "green";
  				$scope.borderColor = "green";
  			}
  			else if (arrayOfStrings.length > 3)
  			{
  				$scope.userReply = "You have " + arrayOfStrings.length + " items! You may have no more than 3.";
  				$scope.textColor = "green";
  				$scope.borderColor = "green";
  			}
  	}
  	else
  	{
  		$scope.userReply = "Please enter some data!";
		$scope.textColor = "red";
		$scope.borderColor = "red";
  	}
    
  };
}
})();