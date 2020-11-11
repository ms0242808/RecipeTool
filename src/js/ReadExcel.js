const { TouchBarColorPicker } = require('electron');
const { watchFile } = require('fs');
const { waitForDebugger } = require('inspector');

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function readIntoTab(title){
  var Excel = require('exceljs');
  // A new Excel Work Book
  var workbook = new Excel.Workbook();
  var tea = title;
  var worksheet = workbook.getWorksheet('Sheet1');
  var dir = app.getPath('desktop').toString()+'/DrinkTec';
  workbook.xlsx.readFile(dir+"/Recipe.xlsx")//YF Machine
  //workbook.csv.readFile("Recipe.csv")
  .then(function() { 
      
    workbook.eachSheet((sheet, id) => {
      var myTabDiv = document.getElementById("recipeTab");
    
      var ul = document.createElement('UL');
      setAttributes(ul,{
          'class':'nav nav-pills mb-3',
          'id':'pills-tab',
          'role':'tablist'
        },
      );

      var tabContent = document.createElement('DIV');
      setAttributes(tabContent,{
          'class':'tab-content',
          'id':'pills-tabContent'
        },
      );
      
      var myTableDiv = document.createElement('DIV');
      var table = document.createElement('TABLE');
        table.border = '1';
        var tableBody = document.createElement('TBODY');
        table.appendChild(tableBody);

      sheet.eachRow((row, rowIndex) => {
        const rowSize = sheet.rowCount;
        const colSize = sheet.columnCount;
        var head = new Array();
        var name;
        var ice = new Array();
        for (var j = 2; j <= rowSize; j++) {
          if(rowIndex == 2){
            //console.log(j+": "+sheet.getRow(i).getCell(2).value);
            var title =  sheet.getRow(j).getCell(2).value;
            var opt = sheet.getRow(j).getCell(4).value;
            head[j] = title;
            ice[j] = opt;
            //console.log(j+ " - "+head[j]);
            //console.log(j+ " - "+ice[j]);
          }
        }
        
        for(var n = 1; n<=head.length; n++){
          name = sheet.getRow(n).getCell(2).value
          if(ice[n] !== ice[n+1] && ice[n] != null && name == tea){
            console.log(head[n] + " - " +ice[n]);

            var tabPane = document.createElement('DIV');
            var tabBody = document.createElement('LI');
            var tr = document.createElement('A');
            
            tabBody.className = "nav-item";
            ul.appendChild(tabBody);
            if(ice[n] == "Normal Ice"){
              setAttributes(tr,{
                  'class':'nav-link active',
                  'aria-selected':'true'
                },
              );
              tabPane.setAttribute('class','tab-pane fade show active');
            }else{
              setAttributes(tr,{
                  'class':'nav-link',
                  'aria-selected':'false'
                },
              );
              tabPane.setAttribute('class','tab-pane fade');
            }
            
            var value = ice[n];
            if(typeof value ==='string'){
              value = value.replace(/\s/g,'');
            }
            setAttributes(tr,{
                'id':value,
                'role':'tab',
                'aria-controls':value,
                'href':"#pills-"+value,
                'data-toggle':'pill'
              },
            );
            tr.textContent = ice[n];
            tabBody.appendChild(tr);

            tabPane.id = "pills-"+value;
            tabPane.setAttribute('role','tabpanel');
            setAttributes(tabPane,{
                'id':"pills-"+value,
                'role':'tabpanel'
              },
            );
            //tabPane.textContent = ice[n]+" ";
            readRecipe(head[n],ice[n]);
            
            tabContent.appendChild(tabPane);
          }
          myTabDiv.appendChild(ul);
          myTabDiv.appendChild(tabContent);
        }
      });
    });
  });
}

function readIntoCard(){
  var Excel = require('exceljs');
  // A new Excel Work Book
  var workbook = new Excel.Workbook();
  var dir = app.getPath('desktop').toString()+'/DrinkTec';
  var worksheet = workbook.getWorksheet('Sheet1');
  workbook.xlsx.readFile(dir+"/Recipe.xlsx")//YF Machine
  //workbook.csv.readFile("Recipe.csv")
  .then(function() { 
    workbook.eachSheet((sheet, id) => {
      var myTableCard = document.getElementById("cardView");
      sheet.eachRow((row, rowIndex) => {
        const rowSize = sheet.rowCount;
        const colSize = sheet.columnCount;
        var head = new Array();
        if(row.values != null){
          for (var j = 2; j <= rowSize; j++) {
            if(sheet.name = "Course" && rowIndex == 2){
              //console.log(j+": "+sheet.getRow(i).getCell(2).value);
              var title =  sheet.getRow(j).getCell(2).value;
              head[j] = title;
              //console.log(j+ " - "+head[j]);
            }
          }
          for(var n = 1; n<=head.length; n++){
            if(head[n] !== head[n+1] && head[n] != null){
              var cardCol = document.createElement('DIV');
              cardCol.setAttribute('class','col-sm-3');

              var card = document.createElement('DIV');
              card.setAttribute('class','card');

              var cardBody = document.createElement('DIV');
              cardBody.setAttribute('class','card-body');

              var heading = document.createElement('H5');
              setAttributes(heading,{
                  'class':'card-title',
                  'id':head[n].replace(/\s/g,'')
                },
              );
              heading.textContent = head[n];

              var cardText = document.createElement('P');
              cardText.setAttribute('class','card-text');

              var cardBtn = document.createElement('A');
              setAttributes(cardBtn,{
                  'class':'btn btn-primary editbtn',
                  //'href':'edit.html?var='+head[n],
                  'onClick':'editRecipe('+head[n].replace(/\s/g,'')+')'
                },
              );
              cardBtn.textContent = "Edit";
              
              cardBody.appendChild(heading);
              cardBody.appendChild(cardText);
              cardBody.appendChild(cardBtn);

              card.appendChild(cardBody);

              cardCol.appendChild(card);

              myTableCard.appendChild(cardCol);
            }
          }
        }
      });
    });
  }); 
}

function readRecipe(title,ice){
  var Excel = require('exceljs');
  // A new Excel Work Book
  var workbook = new Excel.Workbook();
  var dir = app.getPath('desktop').toString()+'/DrinkTec';
  var worksheet = workbook.getWorksheet('Sheet1');
  workbook.xlsx.readFile(dir+"/Recipe.xlsx")//YF Machine
  //workbook.csv.readFile("Recipe.csv")
    .then(function() { 
      workbook.eachSheet((sheet, id) => {
        //var myTableDiv = document.getElementById("recipeTable");
        var value = ice;
        if(typeof value ==='string'){
          value = value.replace(/\s/g,'');
        }
        var myTableDiv = document.getElementById("pills-"+value);
        var table = document.createElement('TABLE');
        //table.border = '1';
        table.setAttribute('class','table table-hover table-fixed');
        
        var tableHead = document.createElement('THEAD');
        table.appendChild(tableHead);
        var tableBody = document.createElement('TBODY');
        table.appendChild(tableBody);
        var large = 0;
        var regular = 0;
        var inputValue;
        var inputType;
        sheet.eachRow((row, rowIndex) => {
          const rowSize = sheet.rowCount;
          const colSize = sheet.columnCount;

          //get title
          if(rowIndex == 1){
            var tr = document.createElement('TR');
            tableHead.appendChild(tr);
            for (var j = 3; j <= colSize; j++) {//j=2 to check recipe name
              if(j < 24 && j !== 4){//j=4 to check ice level
                var th = document.createElement('TH');
                var ip = document.createElement('input');
                th.setAttribute('scope','col');
                setAttributes(ip,{
                    'class':'data readInput',
                    'id':"data"+rowIndex+"-"+j,
                    'type':'text',
                    'value':row.getCell(j),
                    'readonly':true,
                    'style':'font-weight:bold;cursor:pointer;'
                  },
                );
                th.appendChild(ip);
                tr.appendChild(th);
              }
            }
            myTableDiv.appendChild(table);
          }

          //get value for current recipe
          if(sheet.getRow(rowIndex).getCell(2).value == title && sheet.getRow(rowIndex).getCell(4).value == ice){
            var tr = document.createElement('TR');
            tableBody.appendChild(tr);
            for (var j = 3; j <= colSize; j++) {//j=2 to check recipe name  
              if(row.getCell(j) == "Large" || row.getCell(j) == "Regular"){
                inputType = "text";
              }else{
                inputType = "number";
              }
              if(j < 24 && j !== 4){//j=4 to check ice level
                var td = document.createElement('TD');
                var ip = document.createElement('input');
                //inputValue = row.getCell(j);
                if(row.getCell(j) == "Large" || row.getCell(j) == "Regular" || j==5){
                  setAttributes(ip,{
                      'readonly':true,
                      'style':'color:black;cursor:pointer;'
                    },
                  );
                }else if(row.getCell(j) == 0){
                  ip.setAttribute('style','color:red;');
                }
                setAttributes(ip,{
                    'class':'data',
                    'id':"data"+rowIndex+"-"+j,
                    'type':inputType,//text
                    'value':row.getCell(j)
                  },
                );
                td.appendChild(ip);
                tr.appendChild(td);
              }
            }
            myTableDiv.appendChild(table);
          }
        });
      });
    });
}

function getCode(title,catg){
  var Excel = require('exceljs');
  // A new Excel Work Book
  var workbook = new Excel.Workbook();
  var dir = app.getPath('desktop').toString()+'/DrinkTec';
  var worksheet = workbook.getWorksheet('Sheet1');
  workbook.xlsx.readFile(dir+"/Recipe.xlsx")//YF Machine
  //workbook.csv.readFile("Recipe.csv")
    .then(function() { 
      workbook.eachSheet((sheet, id) => {
        var iceOpt = ['Normal Ice','Less Ice','Ice free','Warm','Hot'];
        sheet.eachRow((row, rowIndex) => {
          const rowSize = sheet.rowCount;
          const colSize = sheet.columnCount;
          if(sheet.getRow(rowIndex).getCell(2).value == title){
            for (var n = 3; n <= colSize; n++){
              for(j in iceOpt){
                if(row.getCell(4) == iceOpt[j]){
                  if(catg == "Supply"){
                    document.getElementById(catg+iceOpt[j]).value = row.getCell(24);
                  }else if(catg == "Shake"){
                    document.getElementById(catg+iceOpt[j]).checked = true;
                  }
                }
              }
            }
          }
        });
      });
    });
}
