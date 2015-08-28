<?php
		header('Access-Control-Allow-Origin: http://www.4clubbers.com.pl');

		//addData();
		//function addData()
		{
			if ( isset($_GET['d1']) ) 
			{
				//$temp = explode("*****", $_GET['d1']);
				$player = $_GET['d1'];//$temp[0];
				$downloads = $_GET['d2'];//$temp[1];
				
				//printf($player);
				//printf($downloads);
			
			
				require_once ('mysql_connect.php');
				
				//$result = mysql_query('insert into playlist values ('.$player.','.$downloads.')');
				
				$result = mysql_query( 'insert INTO playlist VALUES (\''.$player.'\',\''.$downloads.'\',null)');
				//$result = @mysql_query('insert into playlist values (144, 441)');
			
				printf($result);
				//printf("sdsds");
			}
		}		
		
		
		
		printf("poszlo");
		
		echo  "<script type='text/javascript'>";
		echo "window.close();";
		echo "</script>";
?>