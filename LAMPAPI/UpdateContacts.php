<?php

	$inData = getRequestInfo();

	$phoneNumber = $inData["phoneNumber"];
	$emailAddress = $inData["emailAddress"];
	$newFirst = $inData["newFirstName"];
	$newLast = $inData["newLastName"];
	$contactId = $inData["contactId"];


	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
		if ($conn->connect_error)
		{
			returnWithError( $conn->connect_error );
		}
		else
		{
			$stmt = $conn->prepare("UPDATE Contacts SET FirstName = ?, LastName=?, Phone= ?, Email= ? WHERE ID= ?");
			$stmt->bind_param("ssssi", $newFirst, $newLast, $phoneNumber, $emailAddress, $contactId);
			$stmt->execute();

			$stmt->close();
			$conn->close();
			returnWithError($contactId, $newFirst, $newLast);
		}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithInfo( $id, $first, $last )
	{
		$retValue = '{"contactId":' . $id . ',"firstName":"' . $first . '","lastName":"' . $last . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithError( $err )
	{
		$retValue = '{"contactId":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}


?>
