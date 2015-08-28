<html>
	<head>
		<title>4CDM</title>
		<style>
			body {
				color: #003366;
				background-color: #000000;
				font-weight: bold;
				font: 16px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif;
			}
			
			div {
				display: inline-block;
				background-color: white;
				border-top-left-radius: 7px;
				border-top-right-radius: 7px;
				padding-left: 6px;
				padding-right: 6px;
				padding-bottom: 16px;
			}
			
			table {
				padding: 2px;
			}
		
			table, td {
								
				
				border-spacing: 0px;
				border-collapse: collapse;
			}
		
			th {
				font-weight: bold;	
				padding: 5px;
				color: white;
				
			}
			
			tr {
				background-color: #666666;
			}
			
			td {
				background-color: #F4F4F4;
				font-weight: normal;
				padding: 18px;
				text-align: center;
			}
		
			a {
				font-weight: bold;
				text-decoration: none;
				color: #003366;
			}
			
			a:hover {
				text-decoration: underline;
				color: #F76300;
			}
		
			#line1 th {
				color: white;
				padding: 18px;
				background-color: #FD8C40;
				border-top-left-radius: 7px;
				border-top-right-radius: 7px;
				border-top: solid white 4px;
				border-bottom: solid #FFD10C 4px;
			}
			
			#tr_line2 {
				background-color: #666666; 
				color: white;
			}
		</style>
		<script type="text/javascript">
			var xmlhttp;
		
			function deleteRow(thisElement, number)
			{
				thisElement.parentNode.parentNode.remove();
				
				xmlhttp = new XMLHttpRequest();
				
				process(number);	
			}
			
			function process(number)
			{
				if (xmlhttp.readyState == 0 || xmlhttp.readyState == 4)
				{
					xmlhttp.open('GET', 'delete.php?d1=' + number);
					xmlhttp.onreadystatechange = handleResponse;
					xmlhttp.responseType = "document"
					xmlhttp.send(null);
				}
				else
				{
					setTimeout('process('+number+')', 1000);
				}	
			}
			
			function handleResponse()
			{
				if (xmlhttp.readyState == 4)
				{
					if (xmlhttp.status == 200)
					{
						xmlResponse = xmlhttp.responseXML;
						//xmlDocumentElement = xmlResponse.documentResponse;
						//message = xmlDocumentElement.firstChild.data;
						
						//alert(xmlhttp.responseXML.body.innerHTML);
						
						//alert("Status - " + xmlhttp.status + " - StatusText - " + xmlhttp.readyState);
					}
				}
				
				
			}
		</script>
	<head>
	<body>
		<center>
		<div>
		<table>
		<tr id="line1">
			<th  colspan="3">4Clubbers Download Manager</th>
		</tr>
		<tr id="line2">
			<th>ODTWARZACZE</th>
			<th>POBRANIA</th>
			<th>USUN</th>
		<tr>
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
						<td><a href='javascript:void(0);' onclick='deleteRow(this, ".$record[2].");' target='_blank'>USUN</a></td>
					</tr>";
					
				
			}
		?>	
		</table>
		</div>
		</center>
	</body>
</html>