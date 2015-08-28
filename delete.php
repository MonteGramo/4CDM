<?php
	if ( isset($_GET['d1']) ) 
	{

		$number = $_GET['d1'];
	
		require_once ('mysql_connect.php');
				
		$result = mysql_query("DELETE FROM playlist WHERE id=".$number."");
	
		if ($result == "1")
		{
			printf("USNIETO");	
		}
		else
		{
			printf("ERROR - ". $result);
		}	
}
	
		
?>