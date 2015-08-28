// ==UserScript==
// @name 4CDM
// @namespace ThreadFilter
// @description Hide Forum Threads - Hides threads in Vbulletin boards. 4CDM - 4C downloads manager
// @include http://www.4clubbers.com.pl/*
// @run-at document-end
// @require http://code.jquery.com/jquery-latest.js

// ==/UserScript==

//*************global variables
var splitCh = String.fromCharCode(255);
var filterseperator= ",";

unsafeWindow._blockThread =
function(threadid)
{
window.setTimeout(SetKillFile, 0, threadid);
}

function updateKillFile(list)
{
data = list.join(splitCh);
window.setTimeout(GM_setValue, 0, "ThreadBlockerFilterFile", escape(data));
GM_setValue("ThreadBlockerFilterFile", escape(data));
}

//adds a Thread to the Killfile
function SetKillFile(killspec)
{
//get thread element for immediate removal
var row = document.getElementById("td_threadtitle_"+killspec)
row.parentNode.parentNode.removeChild(row.parentNode);
var splitCh = String.fromCharCode(255);
var data = "";
var list = new Array();
data = unescape(GM_getValue("ThreadBlockerFilterFile", "-----"));
list = data.split(splitCh);
list.push(killspec);
updateKillFile(list);
}

function addThreadIgnoreLink (thisElement)
{
// Adding the Ignore-Link
threadid = threadid.substring(15);
var link = document.createElement('a');
link.setAttribute('href', 'javascript:_blockThread("'+threadid+'")');
link.setAttribute('style', 'float:right;font-size:xx-small;');
link.setAttribute('class', 'ignoreLink');
link.innerHTML = "Ignore";
thisElement.childNodes[1].appendChild(link);
}

function filterThreads()
{
allElements = document.evaluate(
'//*[@title]',
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);

for (var i = 0; i < allElements.snapshotLength; i++) {
thisElement = allElements.snapshotItem(i);
if (thisElement.nodeName.toUpperCase() == 'TD')
{
for( var x = 0; x < thisElement.attributes.length; x++ )
{
if( thisElement.attributes[x].nodeName.toLowerCase() == 'title' )
{
threadid = thisElement.getAttribute('id');
if(threadid != null)
{
addThreadIgnoreLink(thisElement);

//Filtering Threads
var data = unescape(GM_getValue("ThreadBlockerFilterFile", "-----"));
var list = data.split(splitCh);
for (var j=0; j<list.length; j++) {
//var tid = threadid.substring(13);
if (list[j] == threadid && list[j] != "" && threadid != "")
{
node = thisElement.parentNode;
if (node.parentNode != null)
{
node.parentNode.removeChild(node);
//alert('Thread deleted' + node.innerHTML);

}
}
}
}
}
}
}
}
}

/*
function search()
	{
		var forum = document.getElementById("threadbits_forum_139");
		
		var threads = forum.getElementsByTagName("tr");
		
		alert("Wykryto watkow w ilosci: " + threads.length);
	
        for (var i = thread.length; i >= 0; );
        {
		var tr = threads[i];
		
		//var tempNameLink = tr.getElementsByTagName("td")[2]; 
		//var temp = tempNameLink.getElementsByTagName("div")[0];
		//var tempLikes = temp.getElementsByTagName("div")[0];
		//var tempIgnore = temp.getElementsByTagName("a")[0];
		
		//alert(tempNameLink.getAttribute("title") + " - " + tempLikes.innerHTML);
        alert(i);
        }
	}*/
	


filterThreads();
//search();

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

init();

function init()
{
	createDownloadButton();
	createTestButton();
	
	var page = $('link[rel="canonical"]').attr("href");		// aktualny link strony
	
	console.log("Aktualny link strony: " + page)
	
	if ( page.indexOf("http://www.4clubbers.com.pl/electro-electro-house") > -1 )
	{
		lookForThreads();	
		// Modyfikuje linki tematow do otwierania na 
		// nowych kartach i automatycznego ukrywania po kliku
	}
	else
	{
		lookForPlayers(document);	
		// jesli otwarty temat szuka odtwarzaczy i wysyla na serwer
	}
}

function lookForThreads()
{
	var tbody = document.getElementById("threadbits_forum_139");
    
	var rows = tbody.getElementsByTagName("tr");
	
	var threadLinks = $('a[id^="thread_title_"]');
	
	for (var i = 0; i < rows.length ; i++)
	{
		
		var td = rows[i].getElementsByTagName("td")[2];
				
		var div1 = td.getElementsByTagName("div")[0];
		var a1 = div1.getElementsByTagName("a")[0];                                
		
		//alert(links[4].attr();
		/*
		var div2 = td.getElementsByTagName("div")[2]; 
		var a2 = div2.getElementsByTagName("a")[0];
		*/
	
		threadLinks[i].setAttribute("target", "_blank");
		threadLinks[i].setAttribute("onclick", a1.getAttribute("href"));
	}
}

function lookForPlayers(page)
{
       var players = page.getElementsByClassName("zippyshare-player-content");
    
       console.log("Wykryto odtwarzaczy: " + players.length);

       if ( players.length != 0 )
       {
            for ( var i = 0; i < players.length ; i += 1 )
            {
				players[i].getElementsByClassName("zippyshare-player-block-download")[0].remove();
				players[i].getElementsByClassName("zippyshare-player-limit")[0].remove();
			
				var downloads = players[i].getElementsByTagName("span")[1].innerHTML;
			
				downloads = downloads.split(":")[1];		
				downloads = downloads.replace("<b>","");
				downloads = downloads.replace("</b>","");	// ILOSC POBRAN
			
				var player = players[i].getElementsByTagName("div")[0];		
			
				player = player.getElementsByTagName("object")[0].innerHTML; // ODTWARZACZ

				sendDataToServer(player, downloads);	// wyslij do pmich.hol.es
            }
			//window.close();
	   }
    
}

function sendDataToServer(player, downloads)
{
	player = player.replace(/&amp/g,'^^%%^^');
	player = player.replace(/#/g,'^%^');
	
	// przez &amp i # noramlnie nie wysyla
	
	var server = 'http://pmich.hol.es/get_data.php';		
	
	var filledServerLink = server + '?d1=' + player + '&d2=' + downloads;
	
	//console.log("filledServerLink: " + filledServerLink);
	
	var xmlHttpServer = new XMLHttpRequest();
	xmlHttpServer.open('GET', filledServerLink , true);
	xmlHttpServer.send(null);      
	
	console.log("-----------------------------------------------");
} 

function createDownloadButton()
{
    var div = document.createElement("div");
    div.setAttribute("style", "width: 100px; height: 50px; position: fixed; background-color: #F4F4F4; text-align: center; display: table;");   
    div.setAttribute("class", "navbar");
    var a = document.createElement("a");
    a.setAttribute("style", "font-weight: bold; font: bold 16px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif; margin-top: 50%; height: 100px; display: table-cell; vertical-align: middle;");
    a.innerHTML = "POBIERZ 10";
    a.setAttribute("href" , "javascript:void(0);");
	a.setAttribute("class", "downloadButton");
	
    div.appendChild(a);
    
    document.body.insertBefore(div,document.body.firstChild);
			
	var link = $( '.downloadButton' );
    link.on("click", function(){ downloadPack(10); });
}

function createTestButton()
{
	var div = document.createElement("div");
    div.setAttribute("style", "width: 100px; height: 50px; position: fixed; background-color: #F4F4F4; text-align: center; display: table; margin-top: 100px;");   
    div.setAttribute("class", "navbar");
    var a = document.createElement("a");
    a.setAttribute("style", "font-weight: bold; font: bold 16px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif; margin-top: 50%; height: 100px; display: table-cell; vertical-align: middle;");
    a.innerHTML = "TESTUJ";
    a.setAttribute("href" , "javascript:void(0);");
	a.setAttribute("class", "testButton");
    
    div.appendChild(a);
    
    document.body.insertBefore(div,document.body.firstChild);	
	 
	var link = $( '.testButton');
    link.on("click", function(){ downloadPack(1); });
}


function downloadPack(numberOfThreads)
{   
	var threadLinks = $('a[id^="thread_title_"]');
	
	console.log("Wykryto watki: " + threadLinks.length)
	
	if (threadLinks.length < numberOfThreads)
    {
        for (var i = 0; i < threadLinks.length ; i++)
        {
			processSingleThread(threadLinks[i]);
			
			//////////////////////////////////////////////////////////////////////////
			
			threadLinks[i].setAttribute("href", "javascript:void(0)");	
			threadLinks[i].click();
		
			console.log("Usunieto watek. Pozostalo " + (--threadLinks.length));
			
			//////////////////////////////////////////////////////////////////////////
			//DO POPRAWKI
            
            //Sleep(3000);
		}
    }
	else if (threadLinks.length == 0)
	{
		alert("Brak tematow");
	}
    else 
    {
        for (var i = 0; i < numberOfThreads ; i++)
        {
			processSingleThread(threadLinks[i]);
			
			//////////////////////////////////////////////////////////////////////////
			
			threadLinks[i].setAttribute("href", "javascript:void(0)");	
			threadLinks[i].click();
		
			console.log("Usunieto watek. Pozostalo " + (--threadLinks.length));
			
			//////////////////////////////////////////////////////////////////////////
			//DO POPRAWKI
            
            //Sleep(3000);
        }
    }	
}
/*
function deleteRow()
{
	var threadLinks = $('a[id^="thread_title_"]');
	
	if(threadLinks.length > 0)
	{
		threadLinks[0].setAttribute("href", "javascript:void(0)");
		threadLinks[0].click();
		
		console.log("Usunieto watek. Pozostalo " + (--threadLinks.length));
	}
}
*/
// DO POPRWAKI - Potwierdzanie ze dobrze wyslalo i dopiero usuwa

function processSingleThread(threadLink)
{	
    var xmlHttpSite = new XMLHttpRequest();
    
	if (xmlHttpSite.readyState == 0 || xmlHttpSite.readyState == 4)
	{
		console.log("threadLink: " + threadLink);
		
		xmlHttpSite.open('GET', threadLink);
        xmlHttpSite.onreadystatechange = function(){ handleResponse( xmlHttpSite ); };
		xmlHttpSite.responseType = "document";
		xmlHttpSite.send(null);	
	}
	else
    {
		setTimeout(function(){ processSingleThread(threadLink); }, 1000);
	}	
}

function handleResponse(xmlHttpSite)
{
	if (xmlHttpSite.readyState == 4)
	{
		if (xmlHttpSite.status == 200)
		{
			console.log("Respond statusText: " + xmlHttpSite.statusText);
			
			xmlResponse = xmlHttpSite.responseXML;
			
			lookForPlayers(xmlResponse);
		}
	}	
	
}
/*
var script = document.createElement('script'); 
script.type = "text/javascript"; 
script.innerHTML = (<><![CDATA[
]]></>).toString();
document.getElementsByTagName('head')[0].appendChild(script);*/