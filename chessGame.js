var chance="whiteset";
var whiteSet=["whiterook1","whiteknight1","whitebishop1","whitequeen","whiteking","whitebishop2","whiteknight2","whiterook2","whitepawn1","whitepawn2","whitepawn3","whitepawn4","whitepawn5","whitepawn6","whitepawn7","whitepawn8"];
var blackSet=["blackpawn1","blackpawn2","blackpawn3","blackpawn4","blackpawn5","blackpawn6","blackpawn7","blackpawn8","blackrook1","blackknight1","blackbishop1","blackqueen","blackking","blackbishop2","blackknight2","blackrook2"];

function allowDrop(ev) {
  ev.preventDefault();

}


function drag(ev) {
  path(ev.target);
  ev.dataTransfer.setData("text", ev.target.id);

}

function drop(ev) {

	ev.preventDefault();

	var data = ev.dataTransfer.getData("text"); //output dragged file id;
    var el = ev.target;	//output destination html object
	var source=document.getElementById(data).parentNode;
	//output source html object

	if(document.getElementById(data).className!=chance)
	{
		alert("IT IS "+chance+"\'s turn");
		return;
	}

	if(document.getElementById(data).className==ev.target.className) return;

	if(!Prompt(document.getElementById(data).parentNode.id, el.id, data)) return;

	el.appendChild(document.getElementById(data));
	var check=chance=="whiteset"?kingCheckedBy(blackSet):kingCheckedBy(whiteSet);
	if(check)
	{
		source.appendChild(document.getElementById(data));
		alert(chance+" is checked");
		return;
	}

    if (!el.classList.contains('dropzone'))
	{
       el = ev.target.parentNode;
	   if(ev.target.className=="whiteset") document.getElementById("white").appendChild(ev.target);
	   else document.getElementById("black").appendChild(ev.target);
	   ev.target.setAttribute("draggable","false");
    }

	el.appendChild(document.getElementById(data));
	check=chance=="whiteset"?kingCheckedBy(whiteSet):kingCheckedBy(blackSet);
	chance=chance=="whiteset"?"blackset":"whiteset";
	if(check) alert(chance+" is checked ");

}

function kingCheckedBy(Set)
{
		var bool;
		Set.forEach(function(set){
		path(document.getElementById(set));
		a=document.getElementsByClassName('enemy');
		for(var i=0;i<a.length;i++)
		{
			if( Set==whiteSet && a[i].children[0].id =="blackking" )
			{
				bool=true; return;
			}
			else if( Set==blackSet && a[i].children[0].id =="whiteking" )
			{
				bool=true; return;
			}
		}
		removePath();
	});
	if(bool) return true;
	else return false;
}

function kingStatus()
{

}

function Prompt( Source, Destination, Piece)
{
	if(!Number(Destination)) Destination=document.getElementById(Destination).parentNode.id;

	if(document.getElementById(Destination).classList.contains('path') || document.getElementById(Destination).classList.contains('enemy')) return true;
	else return false;

}

function path(a)
{
	x=Number(a.parentNode.id[0]);
	y=Number(a.parentNode.id[1]);
	switch(a.id)
	{
		case "whiteking":
		case "blackking":	for(var i=x-1;i<=x+1;i++)
							{
								if( i<1 || i>8 ) continue;
								for(var j=y-1;j<=y+1;j++)
								{
									if( j<1 || j>8 || (i==x && j==y)) continue;
									var ID=(i*10+j).toString();
									if(!document.getElementById(ID).hasChildNodes())
										document.getElementById(ID).classList.add("path");
									else showEnemy(a,ID);
								}
							}
							break;
		case "whitequeen":
		case "blackqueen":	plusPath(x,y,a);
							crossPath(x,y,a);
							break;
		case "whiteknight1":
		case "whiteknight2":
		case "blackknight1":
		case "blackknight2":	for(var i=x-2;i<=x+2;i++)
								{
									if( i<1 || i>8 ) continue;
									for(var j=y-2;j<=y+2;j++)
									{
										if( j<1 || j>8 || (i==x) || (j==y) || (Math.abs(i-x)==Math.abs(j-y)) ) continue;
										var ID=(i*10+j).toString();
										if(!document.getElementById(ID).hasChildNodes())
										document.getElementById(ID).classList.add("path");
										else showEnemy(a,ID);
									}
								}
								break;
		case "whitebishop1":
		case "whitebishop2":
		case "blackbishop1":
		case "blackbishop2":	crossPath(x,y,a);
								break;
		case "whiterook1":
		case "whiterook2":
		case "blackrook1":
		case "blackrook2":	plusPath(x,y,a);
							break;
		case "whitepawn1":
		case "whitepawn2":
		case "whitepawn3":
		case "whitepawn4":
		case "whitepawn5":
		case "whitepawn6":
		case "whitepawn7":
		case "whitepawn8":	if(x==2)
							{
								for(var i=3;i<=4;i++)
								{
									var ID=(i*10+y).toString();
									if(document.getElementById(ID).hasChildNodes())
									break;
									document.getElementById(ID).classList.add("path");
								}
								ID=((x+1)*10+y-1).toString();
								if(document.getElementById(ID) && document.getElementById(ID).hasChildNodes())
									showEnemy(a,ID);
								ID=((x+1)*10+y+1).toString();
								if(document.getElementById(ID) && document.getElementById(ID).hasChildNodes())
									showEnemy(a,ID);
							}
							else
							{
								var ID=((x+1)*10+y).toString();
								if(document.getElementById(ID) && !document.getElementById(ID).hasChildNodes())
									document.getElementById(ID).classList.add("path");
								ID=((x+1)*10+y-1).toString();
								if(document.getElementById(ID) && document.getElementById(ID).hasChildNodes())
									showEnemy(a,ID);
								ID=((x+1)*10+y+1).toString();
								if(document.getElementById(ID) && document.getElementById(ID).hasChildNodes())
									showEnemy(a,ID);
							}
							break;
		case "blackpawn1":
		case "blackpawn2":
		case "blackpawn3":
		case "blackpawn4":
		case "blackpawn5":
		case "blackpawn6":
		case "blackpawn7":
		case "blackpawn8":	if(x==7)
							{
								for(var i=6;i>=5;i--)
								{
									var ID=(i*10+y).toString();
									if(document.getElementById(ID).hasChildNodes())
									break;
									document.getElementById(ID).classList.add("path");
								}
								ID=((x-1)*10+y-1).toString();
								if(document.getElementById(ID) && document.getElementById(ID).hasChildNodes())
									showEnemy(a,ID);
								ID=((x-1)*10+y+1).toString();
								if(document.getElementById(ID) && document.getElementById(ID).hasChildNodes())
									showEnemy(a,ID);
							}
							else
							{
								var ID=((x-1)*10+y).toString();
								if(document.getElementById(ID) && !document.getElementById(ID).hasChildNodes())
									document.getElementById(ID).classList.add("path");
								ID=((x-1)*10+y-1).toString();
								if(document.getElementById(ID) && document.getElementById(ID).hasChildNodes())
									showEnemy(a,ID);
								ID=((x-1)*10+y+1).toString();
								if(document.getElementById(ID) && document.getElementById(ID).hasChildNodes())
									showEnemy(a,ID);
							}
							break;
	}
}

function removePath()
{
	var els = document.getElementsByClassName('path')
	  while (els[0]) {
		els[0].classList.remove('path')
	  }
	els = document.getElementsByClassName('enemy')
	  while (els[0]) {
		els[0].classList.remove('enemy')
	  }
}

function showEnemy(a,ID)
{
	if(a.className=="whiteset" && document.getElementById(ID).children[0].className=="blackset")
		document.getElementById(ID).classList.add("enemy");
	else if(a.className=="blackset" && document.getElementById(ID).children[0].className=="whiteset")
		document.getElementById(ID).classList.add("enemy");
}

function plusPath(x,y,a)
{
							for(var i=x-1;i>=1;i--)
							{
								var ID=(i*10+y).toString();
								if(document.getElementById(ID).hasChildNodes())
								{
									showEnemy(a,ID);
									break;
								}
								document.getElementById(ID).classList.add("path");
							}
							for(var i=x+1;i<=8;i++)
							{
								var ID=(i*10+y).toString();
								if(document.getElementById(ID).hasChildNodes())
								{
									showEnemy(a,ID);
									break;
								}
								document.getElementById(ID).classList.add("path");
							}
							for(var i=y-1;i>=1;i--)
							{
								var ID=(x*10+i).toString();
								if(document.getElementById(ID).hasChildNodes())
								{
									showEnemy(a,ID);
									break;
								}
								document.getElementById(ID).classList.add("path");
							}
							for(var i=y+1;i<=8;i++)
							{
								var ID=(x*10+i).toString();
								if(document.getElementById(ID).hasChildNodes())
								{
									showEnemy(a,ID);
									break;
								}
								document.getElementById(ID).classList.add("path");
							}
}

function crossPath(x,y,a)
{
							for(var i=x-1,j=y-1;i>=1&&j>=1;i--,j--)
							{
								var ID=(i*10+j).toString();
								if(document.getElementById(ID).hasChildNodes())
								{
									showEnemy(a,ID);
									break;
								}
								document.getElementById(ID).classList.add("path");
							}
							for(var i=x-1,j=y+1;i>=1&&j<=8;i--,j++)
							{
								var ID=(i*10+j).toString();
								if(document.getElementById(ID).hasChildNodes())
								{
									showEnemy(a,ID);
									break;
								}
								document.getElementById(ID).classList.add("path");
							}
							for(var i=x+1,j=y-1;i<=8&&j>=1;i++,j--)
							{
								var ID=(i*10+j).toString();
								if(document.getElementById(ID).hasChildNodes())
								{
									showEnemy(a,ID);
									break;
								}
								document.getElementById(ID).classList.add("path");
							}
							for(var i=x+1,j=y+1;i<=8&&j<=8;i++,j++)
							{
								var ID=(i*10+j).toString();
								if(document.getElementById(ID).hasChildNodes())
								{
									showEnemy(a,ID);
									break;
								}
								document.getElementById(ID).classList.add("path");
							}
}
