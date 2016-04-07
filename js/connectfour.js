
//lets initialize constant variables
red = 1
yellow = 2
full = 3
empty = 0

//lets create a 2 dimension field array for each column and row elements for the game
field =  new Array(0,0,0,0,0,0,0);
field[0] = new Array(0,0,0,0,0,0);
field[1] = new Array(0,0,0,0,0,0);
field[2] = new Array(0,0,0,0,0,0);
field[3] = new Array(0,0,0,0,0,0);
field[4] = new Array(0,0,0,0,0,0);
field[5] = new Array(0,0,0,0,0,0);
field[6] = new Array(0,0,0,0,0,0);

height =  new Array(5,5,5,5,5,5,5); 

/*
 *      function get
 *      lets get the column and row field
 */

function get(column, row)
{
  if ((column < 0) || (column > 6) || (row < 0) || (row > 5)) 
  {
    return full
  }
  else 
  {
    return (field[column][row])
  } 
}       

/*
 *      function put
 *      lets put the selected columns and the colors as well
 */
function put(column,color)
{
  if (color == red) 
    document.getElementById("results").innerHTML = document.getElementById("results").innerHTML + 
    '<div style="position:absolute; top:'+(height[column]*60+68)+'px; left:'+(column*60+3)+'px;"><img src="images/red.png" width=55 height = 55> </div>';

  if (color == yellow) 
    document.getElementById("results").innerHTML = document.getElementById("results").innerHTML + 
    '<div style="position:absolute; top:'+(height[column]*60+68)+'px; left:'+(column*60+3)+'px;"><img src="images/yellow.png" width=55 height = 55> </div>';
}

//initialize booltemp to false
var booltemp = false;

/*
 *      function insertcolumn
 *      this will check and insert the colors in the column and reinitialize the value on each column
 */
function insertcolumn(column)
{
  if (height[column] == -1) 
    alert("column full")
  else
  {
    field[column][height[column]] = red;
    height[column] = height[column] - 1;
    put(column,red);
    if (inspect(column,height[column]+1,4,red,false) == true) 
    {
      booltemp=true;
      alert("Congrats you win!");
      location.reload();
    }
    if (
      (height[0] == -1) && 
      (height[1] == -1) && 
      (height[2] == -1) && 
      (height[3] == -1) && 
      (height[4] == -1) && 
      (height[5] == -1) && 
      (height[6] == -1)) 
    {
      alert("Draw Game");
      location.reload();
    }
    if (booltemp != true) computer();         
  }
}

/*
 *      function inspect
 *      check and inspect the columns, row and match if there are any four connection in every color
 */

function inspect(x, y, quantity, color, inspect_value)
{
  var i,j,k;
  var tempvar1,tempvar2,tempvar3,tempvar4;
  var tempvar12,tempvar22,tempvar32,tempvar42;
  var color2;
  var ja=false;

  if (color == red) 
  {
    color2 = yellow
  } else 
  {
    color2 = red
  }; 

  for (k=0;k<=3;k++)
  {
    tempvar1 = 0;
    tempvar2 = 0;
    tempvar3 = 0;
    tempvar4 = 0;
    tempvar12 = 0;
    tempvar22 = 0;
    tempvar32 = 0;
    tempvar42 = 0;

    for(j=0;j<=3;j++)
    {
      if (get(x-k+j,y) == color) {tempvar1++};
      if (get(x,y-k+j) == color) {tempvar2++};
      if (get(x-k+j,y-k+j) == color) {tempvar3++};
      if (get(x+k-j,y-k+j) == color) {tempvar4++};
      if (get(x-k+j,y) == color2) {tempvar12++};
      if (get(x,y-k+j) == color2) {tempvar22++};
      if (get(x-k+j,y-k+j) == color2) {tempvar32++};
      if (get(x+k-j,y-k+j) == color2) {tempvar42++};
      if (get(x-k+j,y) == full) {tempvar12++};
      if (get(x,y-k+j) == full) {tempvar22++};
      if (get(x-k+j,y-k+j) == full) {tempvar32++};
      if (get(x+k-j,y-k+j) == full) {tempvar42++};
    }
    if ((tempvar1 >= quantity) && (tempvar12 == 0)) {ja = true} else
    if ((tempvar2 >= quantity) && (tempvar22 == 0)) {ja = true} else
    if ((tempvar3 >= quantity) && (tempvar32 == 0)) {ja = true} else
    if ((tempvar4 >= quantity) && (tempvar42 == 0)) ja = true;


    if ((ja == true) && (inspect_value == true))
    {
      tempvar12 = 0;
      tempvar22 = 0;
      tempvar32 = 0;
      tempvar42 = 0;
      field[x][y] = color;
      height[x]--;

      for(j=0;j<=3;j++)
      {
        if ((tempvar1 >= quantity) && (get(x-k+j,y) == empty) && (get(x-k+j,height[x-k+j]+1) == empty)) tempvar12++;
        if ((tempvar2 >= quantity) && (get(x,y-k+j) == empty) && (get(x,height[x]+1) == empty)) tempvar22++;
        if ((tempvar3 >= quantity) && (get(x-k+j,y-k+j) == empty) && (get(x-k+j,height[x-k+j]+1) == empty)) tempvar32++;
        if ((tempvar4 >= quantity) && (get(x+k-j,y-k+j) == empty) && (get(x+k-j,height[x+k-j]+1) == empty)) tempvar42++;
      }
      if ((tempvar12 == 1) || (tempvar22 == 1) || (tempvar32 == 1) || (tempvar42 == 1)) ja = false;
      height[x]++;
      field[x][y] = empty;
    }
  }
  return ja;
}

/*
 *      function computer
 *      initialize computers move to protect the humans from winning
 */
function computer()
{
  var x,i,j,k;
  var column;
  var counter;
  generate = new Array(0,0,0,0,0,0,0);

  generate[0] = 13+Math.random()*4;
  generate[1] = 13+Math.random()*4;
  generate[2] = 16+Math.random()*4;
  generate[3] = 16+Math.random()*4;
  generate[4] = 16+Math.random()*4;
  generate[5] = 13+Math.random()*4;
  generate[6] = 13+Math.random()*4;

  for (i=0;i<=6;i++) 
  {
    if (height[i] < 0) 
      generate[i] = generate[i]-30000;
  }
  
  for (i=0;i<=6;i++)
  {

    if (inspect(i,height[i],3,yellow,false) == true) generate[i] = generate[i] + 20000;

    if (inspect(i,height[i],3,red,false) == true) generate[i] = generate[i] + 10000;

    if (inspect(i,height[i]-1,3,red,false) == true) generate[i] = generate[i] -4000;

    if (inspect(i,height[i]-1,3,yellow,false) == true) generate[i] = generate[i] -200;

    if (inspect(i,height[i],2,red,false) == true) generate[i] = generate[i] +50+Math.random()*3;

    if ((inspect(i,height[i],2,yellow,true) == true) && (height[i] > 0))
    {
      field[i][height[i]] = yellow;
      height[i]--;
      counter = 0;
      for(j=0;j<=6;j++) if(inspect(j,height[j],3,yellow,false) == true) counter++;
      if (counter == 0) {generate[i] = generate[i] +60+Math.random()*2} else {generate[i] = generate[i] - 60}
      height[i]++;
      field[i][height[i]] = empty;
  }


    if (inspect(i,height[i]-1,2,red,false) == true) generate[i] = generate[i] -10;

    if (inspect(i,height[i]-1,2,yellow,false) == true) generate[i] = generate[i] -8;

    if (inspect(i,height[i],1,red,false) == true) generate[i] = generate[i] +5+Math.random()*2;

    if (inspect(i,height[i],1,yellow,false) == true) generate[i] = generate[i] +5+Math.random()*2;
  
    if (inspect(i,height[i]-1,1,red,false) == true) generate[i] = generate[i] -2;

    if (inspect(i,height[i]-1,1,yellow,false) == true) generate[i] = generate[i] +1;


    if ((inspect(i,height[i],2,yellow,true) == true) && (height[i] > 0)) 
    {
      field[i][height[i]] = yellow;
      height[i]--;
      for(k=0;k<=6;k++)       
        if ((inspect(k,height[k],3,yellow,false) == true) && (height[k] > 0)) 
        {
          field[k][height[k]] = red;
          height[k]--;
          for(j=0;j<=6;j++) 
            if (inspect(j,height[j],3,yellow,false) == true) generate[i] = generate[i] + 2000;
          height[k]++;
          field[k][height[k]] = empty;
        }
      height[i]++;
      field[i][height[i]] = empty;
    }

    if ((inspect(i,height[i],2,red,true) == true) && (height[i] > 0)) 
    {
      field[i][height[i]] = red;
      height[i]--;
      for(k=0;k<=6;k++)
        if ((inspect(k,height[k],3,red,false) == true) && (height[k] > 0)) 
        {
          field[k][height[k]] = yellow;
          height[k]--;
          for(j=0;j<=6;j++)
            if (inspect(j,height[j],3,red,false) == true) generate[i] = generate[i] + 1000;
          height[k]++;
          field[k][height[k]] = empty;
        }
      height[i]++;
      field[i][height[i]] = empty;
    }       


    if ((inspect(i,height[i]-1,2,red,true) == true) && (height[i] > 1))
    {
      field[i][height[i]] = red;
      height[i]--;
      for(k=0;k<=6;k++)
        if ((inspect(k,height[k]-1,3,red,false) == true) && (height[k] > 0))
        {
          field[k][height[k]] = yellow;
          height[k]--;
          for(j=0;j<=6;j++)
            if (inspect(j,height[j]-1,3,red,false) == true) generate[i] = generate[i] - 500;
          height[k]++;
          field[k][height[k]] = empty;
        }
      height[i]++;
      field[i][height[i]] = empty;
    }


  } // for

  column = 0;
  x = -10000;
  for(i=0;i<=6;i++)
  if (generate[i] > x)
  {
    x = generate[i];
    column = i;
  }

  field[column][height[column]] = yellow;
  height[column] = height[column] - 1;
  put(column,yellow);
  if (inspect(column,height[column]+1,4,yellow,false) == true) 
  {
    alert("Sorry you lost the game!");
    location.reload();
  }
  if ((height[0] == -1) && (height[1] == -1) && (height[2] == -1) && (height[3] == -1) && (height[4] == -1)  && (height[5] == -1) && (height[6] == -1)) 
  {
    alert("Draw game!");
    location.reload();
  }
}