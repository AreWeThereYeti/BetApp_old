

/* User controller with angularjs */
function AppCtrl($scope, $http) {

	$scope.shortName = 'WebSqlDB';
	$scope.version = '1.0';
	$scope.displayName = 'WebSqlDB';
	$scope.maxSize = 65535;

	$scope.init = function(){
	   console.log("best er" + $scope.bets);
	   
/* 		debugging function */

/*  		$scope.dropTables();  */

/* 		End of debugging functions */
		$scope.initializeDB()
		$scope.pushBetDBToObject()	
			
	}

	$scope.SaveBet = function () {
		console.log("pushing to server");
		$scope.PushToServer($scope.bets[$scope.bets.length - 1], $http)
		console.log("scope.bets[0] er " + angular.toJson($scope.bets[$scope.bets.length - 1]))
		console.log("name er " + $scope.bets.name)
		$scope.AddValuesToDB($scope.bets)
		console.log("scope.bets er " + $scope.bets)
		$scope.chechIfBetIsSynced();

    
    // Clear input fields after push
    $scope.bet 	= "";
    $scope.name = "";
    
	};

	/* --------------  Database ---------------- */	 	
	/* 		Initialize database */
	$scope.initializeDB = function(){	 
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
				tx.executeSql( 'CREATE TABLE IF NOT EXISTS Bet(Id INTEGER PRIMARY KEY AUTOINCREMENT, _bet_description varchar, _name varchar, _timestamp int, _comments varchar, _is_synced)', []);
				
				},
				function error(err){alert('error on init local db ' + err)}, function success(){console.log("database created")}
			) 
		}
	
	
		// this is the function that puts values into the database from page #home
	$scope.AddValuesToDB = function(bet) {
		// this is the section that actually inserts the values into the User table
		$scope.db.transaction(function(transaction) {
			transaction.executeSql('INSERT INTO Bet(_bet_description, _name) VALUES ("'+bet.bet+'", "'+bet.name+'")');	
		},function error(err){alert('error on save to local db : ' + err.err)}, function success(){});
		return false;
	}
	
	$scope.pushBetDBToObject = function (){
		$scope.bets = [];
		console.log("bets er" + $scope.bets);
		$scope.db.transaction(function (tx){
			tx.executeSql('SELECT * FROM Bet', [], function (tx, result){	 
				var dataset = result.rows; 
				for (var i = 0, item = null; i < dataset.length; i++) {

					item = dataset.item(i);
					
					$scope.$apply(
						$scope.bets.push({
							bet: item['_bet_description'],
							name: item['_name']
						})
					);
				}
			});
		},function error(err){
			console.log(err)
		}, function success(){});

	}

	$scope.dropTables = function(){

		shortName = 'WebSqlDB';
		version = '1.0';
		displayName = 'WebSqlDB';
		maxSize = 65535;
	
		db = openDatabase(shortName, version, displayName, maxSize);


		db.transaction(function(tx){

			// IMPORTANT FOR DEBUGGING!!!!
			// you can uncomment these next twp lines if you want the table Trip and the table Auth to be empty each time the application runs
			tx.executeSql( 'DROP TABLE Bet');
		})
	}
	
	$scope.chechIfBetIsSynced = function (){
		console.log("Pretending to sync")
		$scope.db.transaction(function(transaction) {
			transaction.executeSql('UPDATE Bet SET _is_synced = 1)',[]); // Inserted between "set" and "_is_finished" for reference : _end_timestamp ="'+trip.end_timestamp+'", _end_location ="'+trip.end_location+'", _end_address ="'+trip.end_address+'", _end_comments ="'+trip.end_comments+'",
			},function error(err){console.log('Error setting _is_synced to 1 '); console.log(err)}, function success(){}
		);
		return false;
	}
	
			/* Add data to server, ANGULAR*/
	$scope.PushToServer = function(bet, $http){
		console.log("$scope.bets json er : " + angular.toJson($scope.bets));
		$scope.method = 'POST';
	  $scope.url = 'http://betappserver.herokuapp.com'; //Change to server address
		$http({
			method	: $scope.method, 
			url			: $scope.url + "/bets",
			data    : angular.toJson(bet),  
			})
			.success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    console.log("Success!!")
		    $scope.chechIfBetIsSynced();
		  })
		  .error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("Error")
	  });
  }	
};