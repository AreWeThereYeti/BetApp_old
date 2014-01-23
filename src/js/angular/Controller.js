

/* User controller with angularjs */
function AppCtrl($scope) {

	$scope.shortName = 'WebSqlDB';
	$scope.version = '1.0';
	$scope.displayName = 'WebSqlDB';
	$scope.maxSize = 65535;

	$scope.init = function(){
	
	  $scope.bets = [];

	
/* 		debugging function */

/*  		$scope.dropTables();  */

/* 		End of debugging functions */
		$scope.initializeDB()
		$scope.pushBetDBToObject()	
			
	}

	$scope.SaveBet = function () {

		$scope.AddValuesToDB($scope.bets)

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
			tx.executeSql( 'CREATE TABLE IF NOT EXISTS Bet(Id INTEGER PRIMARY KEY AUTOINCREMENT, _bet_description varchar, _name varchar, _timestamp int, _comments varchar)', [])
			
			},
			function error(err){alert('error on init local db ' + err)}, function success(){console.log("database created")}
		) 
	}
	
		// this is the function that puts values into the database from page #home
	$scope.AddValuesToDB = function(bet) {
/* 		$scope.start_timestamp = moment().format("HH:mm:ss DD-MM-YYYY") */

		// this is the section that actually inserts the values into the User table
		$scope.db.transaction(function(transaction) {
			transaction.executeSql('INSERT INTO Bet(_bet_description, _name) VALUES ("'+bet.bet+'", "'+bet.name+'")');	
		},function error(err){alert('error on save to local db ' + err)}, function success(){});
		return false;
	}
	
	$scope.pushBetDBToObject = function (){
		$scope.db.transaction(function (tx){
			tx.executeSql('SELECT * FROM Bet', [], function (tx, result){	 
				var dataset = result.rows; 
				for (var i = 0, item = null; i < dataset.length; i++) {
					item = dataset.item(i);
					
					$scope.$apply($scope.bets.push({
						bet: item['_bet_description'],
						name: item['_name']
						}));
					
/*
					$scope.bets.bet = item['_bet_descripton'];
					$scope.bets.name = item['_name'];	
*/	
				}
			});
		},function error(err){
			console.log(err)
		}, function success(){});
	}	
	
		/* Syncs with server */
	$scope.InsertRecordOnServerFunction = function(trips){  // Function for insert Record into SQl Server
		console.log('InsertRecordOnServerFunction')
		if($scope.isAllowedToSync == true){	
			$scope.isAllowedToSync = false;
			console.log('posting trip to:')
			console.log($scope.host + "/api/v1/trips")
			$.ajax({
				type: "POST",
				url: $scope.host + "/api/v1/trips",
				data :  {
				     access_token	: $scope.access_token, // Skal kun sættes en gang ind i databasen
				     trips			: trips,
				     device_id		: $scope.imei
				 },
							
				processdata: true,
				success: function (msg)
				{
					console.log('succes!!!!')
					//On Successfull service call
					$scope.dropAllRows(); //Uncomment this when success message is received. Make this function receive synced rows from server
					$scope.isAllowedToSync = true; 
				},
				error: function (msg) {
					window.msg = msg;
					console.log(msg);
					console.log(msg.status);
					if(!!msg.responseText && !!msg.responseText.err_ids){				
						if(JSON.parse(msg.responseText).err_ids != 0){	
							$scope.dropRowsSynced(JSON.parse(msg.responseText).err_ids)
						}
					}
	
					else if(msg.status == 401){
						$scope.resetAccessToken()
					}	
					
					else if(msg.status == 404){
						console.log("404 error ")				
					}
					$scope.isAllowedToSync = true;						
				}
			});
		}
	};
	

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
	
};
	