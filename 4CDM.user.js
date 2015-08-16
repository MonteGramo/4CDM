// ==UserScript==
// @name 4CDM
// @namespace ThreadFilter
// @description Hide Forum Threads - Hides threads in Vbulletin boards. 4CDM - 4C downloads manager
// @include http://www.4clubbers.com.pl/*
// @run-at document-end

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


function lookfor()
{
       var players = document.getElementsByClassName("zippyshare-player-content");
    
       //alert("Wykryto playerow w ilosci: " + players.length);
       //alert(players[0]);
       if( players.length != 0 )
       {
             for ( var i = 0; i < players.length ; i += 1)
            {
           players[i].getElementsByClassName("zippyshare-player-block-download")[0].remove();
           players[i].getElementsByClassName("zippyshare-player-limit")[0].remove();
    
           var downloads = players[i].getElementsByTagName("span")[1].innerHTML;
    
           downloads = downloads.split(":")[1];
      
           var player = players[i].getElementsByTagName("div")[0];
    
           player = player.getElementsByTagName("object")[0].innerHTML;
       //player = player.getElementsByTagName("embed")[0].innerHTML;

       //alert(player);
    
           var str = 'http://pmich.hol.es/get_data.php?d1=' + player;

           str = str.replace(/&amp/g,'^^%%^^');
           str = str.replace(/#/g,'^%^');
    
           var tab = window.open( str + '&d2=' + downloads, '_blank');
       //tab.document.body.innerHTML = "<table><tr><td>" + player + "</td><td>" + downloads + "</td>";
       //tab.document.head.innerHTML = "<title>4CDM</title>";
                
            }
           window.close();
       }
       else
       {
           var tbody = document.getElementById("threadbits_forum_139");
    
           var rows = tbody.getElementsByTagName("tr");
           
           var links = $('a[id^="thread_title_"]');
           
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

               links[i].setAttribute("target", "_blank");
               links[i].setAttribute("onclick", a1.getAttribute("href"));

           }
           
           
       }
    
}

lookfor();

var script = document.createElement('script'); 
script.type = "text/javascript"; 
script.innerHTML = (<><![CDATA[

function downloadPack()
{
    //var tbody = document.getElementById("threadbits_forum_139");
    
    //var rows = tbody.getElementsByTagName("tr");
    
    var links = $('a[id^="thread_title_"]');
    
    if ( links.length < 10 )
    {
         for (var i = 0; i < links.length ; i++)
         {
             links[i].click();
         }
    }
    else
    {
         for (var i = 0; i < 10 ; i++)
         {
             links[i].click();
         }
    }
}
]]></>).toString();
document.getElementsByTagName('head')[0].appendChild(script);
    
function buttondiv()
{
        var div = document.createElement("div");
        div.setAttribute("style", "width: 100px; height: 50px; position: fixed; background-color: #F4F4F4; text-align: center; display: table;");   
    div.setAttribute("class", "navbar");
        var a = document.createElement("a");
    a.setAttribute("style", "font-weight: bold; font: bold 16px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif; margin-top: 50%; height: 100px; display: table-cell; vertical-align: middle;");
        a.innerHTML = "POBIERZ 10";
        a.setAttribute("href" , "javascript:downloadPack();");
    
        div.appendChild(a);
    
        document.body.insertBefore(div,document.body.firstChild);
}


buttondiv();