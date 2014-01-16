

/* User controller with angularjs */
function AppCtrl($scope) {

	$scope.shortName = 'WebSqlDB';
	$scope.version = '1.0';
	$scope.displayName = 'WebSqlDB';
	$scope.maxSize = 65535;

	$scope.init = function(){
	
	
/* 		debugging function */

/* 		$scope.dropTables(); */

/* 		End of debugging functions */
		$scope.initializeDB()		
		
	}

	console.log($scope.bets)

  $scope.bets = [
    {'bet': 'Jeg er hurtigere',
     'name': 'Jonas'},
    {'bet': 'Jeg er hurtigere. Jeg er hurtigere.',
     'name': 'Søren'}
  ];


	$scope.SaveBet = function () {

    $scope.bets.push({
        bet: $scope.bets.bet,
        name: $scope.bets.name
    });
    
    console.log($scope.bets)

    // Clear input fields after push
    $scope.bet = "";
    $scope.name = "";

		};

	/* --------------  Database ---------------- */	 	
/* 		Initialize database */
	$scope.initializeDB = function(){
	
			// initial variables
	 
		// This alert is used to make sure the application is loaded correctly
		// you can comment this out once you have the application working
		console.log("DEBUGGING: we are in the InitializeDB function");
		
		if (!window.openDatabase) {
			// not all mobile devices support databases  if it does not, the following alert will display
			// indicating the device will not be albe to run this application
			alert('Databases are not supported in this browser.');
			return;
		}
	 
		// this line tries to open the database base locally on the device
		// if it does not exist, it will create it and return a database object stored in variable db
		if(!$scope.db){
			$scope.db = openDatabase($scope.shortName, $scope.version, $scope.displayName, $scope.maxSize);
		}	
		// this line will try to create the table User in the database justcreated/openned
		$scope.db.transaction(function(tx){
			 
			// this line actually creates the table User if it does not exist and sets up the three columns and their types
			// note the UserId column is an auto incrementing column which is useful if you want to pull back distinct rows
			// easily from the table.
			tx.executeSql( 'CREATE TABLE IF NOT EXISTS Bet(Id INTEGER PRIMARY KEY AUTOINCREMENT, _bet_description varchar, _name varchar, _timestamp int, _comments varchar, _is_finished bool)', [])},
			function error(err){alert('error on init local db ' + err)}, function success(){console.log("database created")}
		) 
	}
	
	
};
