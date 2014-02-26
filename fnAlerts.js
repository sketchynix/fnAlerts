/**
 *	Alert structure
 *		type
 *		message
 */
var fnAlerts = angular.module('fnAlerts', []).factory('Alerts', function($timeout){
	var  i = 0,
		prod = {
			alerts: {},
			add: function(message, type, expires, showRemove){

				prod.alerts[i] = {
					type: type,
					message: message,
					showRemove: showRemove
				};
				var p = i;
				if(angular.isNumber(expires)){
					$timeout(function(){
						prod.remove(p);
					}, expires);
				}

				i+=1;
				return i-1;
			},
			remove: function(index){
				delete prod.alerts[index];
			},
			get: function(index){
				return prod.alerts(index);
			},
			getAll: function(){
				return prod.alerts;
			},
			removeAll: function(){
				angular.emptyObject(prod.alerts);
				i = 0;
			}
		};

	return prod;
}).directive('fnAlertsDisplay', function(Alerts, $timeout){
	return {
		restrict: 'EA',
		replace: true,
		template: '<div id="alerts_wrapper">'+
			'<ul><li ng-repeat="(indx, alert) in alerts" class="{{alert.type}}">'+
			'<p ng-bind="alert.message"></p>'+
			'<button ng-click="$parent.closeAlert(indx)" ng-hide="alert.showRemove == false">x</button>' +
			'</li></ul></div>',
		controller: function($scope, Alerts){
			$scope.alerts = Alerts.alerts;

			$scope.closeAlert = function(index){
				Alerts.remove(index);
			};

			$scope.closeAlerts = function(){
				Alerts.removeAll();
			};
		}
	}
});