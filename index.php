<html>
	<head>
		<title>4CDM</title>
		<style>
			table, td ,tr {
				border: solid black 1px;
				padding: 4px;
				margin: 2px;
				border-spacing: 0px;
				border-collapse: collapse;
			}
		
			td {
				text-align: center;
		
			}
		
		
		
		</style>
	<head>
	<body>
		<center>
		<table>
			<th><b>ODTWARZACZE</b></th>
			<th><b>POBRANIA</b></th>
			<th><b>USUN</b></th>
		<?php
			require_once ('mysql_connect.php');
			
			$data = mysql_query("Select * from playlist");
			
			while ($record = mysql_fetch_array($data))
			{
				$patterns = array();
				$patterns[0] = '^^%%^^';
				$patterns[1] = '^%^';
				
				$replacements = array();
				$replacements[0] = '&amp';
				$replacements[1] = '#';
			
				//echo preg_replace( $patterns, $replacements, $record[0]);
				
				
				$tmp0 = str_replace($patterns,$replacements, $record[0]);
				
				echo "
					<tr>
						<td>".$tmp0."</td>
						<td>".$record[1]."</td>		
						<td><a href='delete.php?d1=".$record[2]."' onclick='this.parentNode.parentNode.remove()' target='_blank'>USUN</a></td>
					</tr>";
					
				
			}
		?>	
		</table>
		</center>
	</body>
</html>
