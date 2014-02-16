/**
 *	Alert structure
 *		type
 *		message
 */
var fnAlerts = angular.module('fnAlerts', [])..service('Alerts', function($timeout){

	var  i = 0,
		service = {
			alerts: {},
			add: function(type, message, expires){
				service.alerts[i] = {
					type: type,
					message: message
				};
				var p = i;
				if(angular.isNumber(expires)){
					$timeout(function(){
						service.remove(p);
					}, expires);
				}

				i+=1;
				return i-1;
			},
			remove: function(index){
				delete service.alerts[index];
			},
			get: function(){
				return service.alerts;
			},
			removeAll: function(){
				angular.emptyObject(service.alerts);
				i = 0;
			}
		};
	return service;
}).directive('fnAlertsDisplay', function(Alerts, Auth, $timeout){
	return {
		restrict: 'EA',
		replace: true,
		template: '<div id="alerts_wrapper">'+
		'<ul><li ng-repeat="(indx, alert) in alerts" class="{{alert.type}}">'+
		'<div ng-bind="alert.message"></div>'+
		'<div><button  ng-click="$parent.closeAlert(indx)">x</button></div>' +
		'</li></ul></div>',
		controller: function($scope, Alerts, Auth){
			$scope.alerts = Alerts.alerts;

			$scope.closeAlert = function(index){
				Alerts.remove(index);
			}

			$scope.closeAlerts = function(){
				Alerts.removeAll();
			}

		}
	}
});