#fnAlerts
fnAlerts is a module that allows alerts to be shown in your application.
The fnAlerts module has a service, Alerts, which holds the alerts messages and has methods to add and remove the alerts.
The directive, fn-alerts-display, is meant to be added to your primary template. It will display alerts centered in a fixed position. I have left the styling pretty bare so it can be easily modified.

##Demo
http://frozennode.com/fn-alerts.html

##Usage

Add fnAlerts as a dependency to your application

	angular.module('testApp', ['fnAlerts']);

Add the fn-alerts-display as an element or attribute in your template

	<fn-alerts-display></fn-alerts-display>

Inject the Alerts service in your controller

	App.controller('testController', function($scope, Alerts){

##Methods

**add**
The add method has 4 arguments
message (required) - string - the message to display
type (optional) - string - the css class to attach to the alert's list-item (li) container
expires (optional) - number - the number of milliseconds to show the alert. defaults to null. The item will remain until explicitly removed.
showRemove (optional) - boolean - show the remove button on the alert. Defaults to true

returns a number - This number is the index to pass into the remove method to remove the alert.

	Alerts.add('Example Alert', 'css-class', 1000, false);

**remove**
Remove an alert by index
index - number - the index returned from the add method

	Alerts.remove(2);

**removeAll**
Removes all the alerts in the service

	Alerts.removeAll()

**get**
Get an alert object by index
index - number - the alert index to retrieve

returns an alert object

	var alert = Alerts.get(1);

**getAll**
Get all of the alerts from the service

returns an object (by ref) containing all of the alerts

	Alerts.getAll()