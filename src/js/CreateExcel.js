function convertToCsv(){
    var dir = app.getPath('desktop').toString()+'/DrinkTec';
    fs.rename(dir+'/Recipe.txt', dir+'/Recipes.csv', (err) => {
        if (err) throw err;
        console.log('Rename complete!');
    });
}

function convertToTxt(){
    var iconv = require("iconv-lite");
    var dir = app.getPath('desktop').toString()+'/DrinkTec';    
    fs.createReadStream(dir+"/Recipe.txt")
        .pipe(iconv.decodeStream("UTF-8"))
        .pipe(iconv.encodeStream("UTF-16"))
        .pipe(fs.createWriteStream(dir+"/Recipe.csv"));
}

function createRecipeFile(){
    var Excel = require('exceljs');
    // A new Excel Work Book
    var workbook = new Excel.Workbook();

    // Some information about the Excel Work Book.
    workbook.creator = 'DrinkTec';
    workbook.lastModifiedBy = '';
    workbook.created = new Date(2019, 6, 19);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2020, 9, 27);
    
    // Create a sheet
    var sheet = workbook.addWorksheet('Sheet1');
    //get tea input into array
    var teaTitle = new Array();
    $('.teaN').each(function(index, item){
        teaTitle[index] = $(item).val();
        //console.log(index+" "+teaTitle[index]);
    });
    var x =1;
    for(var i=0;i<10;i++){
        if(teaTitle[i] == null){
            x += 1;
            teaTitle[i] = "drink"+x;
        }
        //console.log(teaTitle[i]);
    }
    
    // A table header
    sheet.columns = [
        { header: 'Recipe No.', key: 'recipeno' },
        { header: 'Recipe', key: 'recipe' },
        { header: 'Size', key: 'size' },
        { header: 'Temperature', key: 'temperature' },
        { header: 'Topping', key: 'topping' },
        { header: 'Ice', key: 'ice' },
        { header: 'Sugar 100%', key: 'sugar100' },
        { header: 'Sugar 70%', key: 'sugar70' },
        { header: 'Sugar 50%', key: 'sugar50' },
        { header: 'Sugar 30%', key: 'sugar30' },
        { header: 'Milk', key: 'milk' },
        { header: teaTitle[0], key: 'drink1' },
        { header: teaTitle[1], key: 'drink2' },
        { header: teaTitle[2], key: 'drink3' },
        { header: teaTitle[3], key: 'drink4' },
        { header: teaTitle[4], key: 'drink5' },
        { header: teaTitle[5], key: 'drink6' },
        { header: teaTitle[6], key: 'drink7' },
        { header: teaTitle[7], key: 'drink8' },
        { header: teaTitle[8], key: 'drink9' },
        { header: teaTitle[9], key: 'drink10' },
        { header: 'Cold Water', key: 'coldwater' },
        { header: 'Hot Water', key: 'hotwater' },
        { header: 'Supply Code', key: 'supplycode' },
        { header: 'Shake', key: 'shake' }
    ]

    //get drink input into array
    var drinkTitle = new Array();
    $('.drinkN').each(function(index, item){
        drinkTitle[index] = $(item).val();
        //console.log(index+" "+drinkTitle[index]);
    });
    
    var iceOpt = ['Normal Ice','Less Ice','Ice free','Warm','Hot'];
    var cupSize = ['Large','Regular'];
    var topping = [0,1,2];
    var j = 0;
    for(d in drinkTitle){
        for(i in iceOpt){
            for(c in cupSize){
                for(t in topping){
                    j += 1;
                    //console.log(j+" "+ iceOpt[i]+" "+drinkTitle[d]+" "+cupSize[c]+" "+topping[t]);
                    // Add rows in the above header
                    sheet.addRow({recipeno: j,
                        recipe: drinkTitle[d],
                        size: cupSize[c],
                        temperature: iceOpt[i],
                        topping: parseInt(topping[t]),
                        ice: parseInt('0'),
                        sugar100: parseInt('0'),
                        sugar70: parseInt('0'),
                        sugar50: parseInt('0'),
                        sugar30: parseInt('0'),
                        milk: parseInt('0'),
                        drink1: parseInt('0'),
                        drink2: parseInt('0'),
                        drink3: parseInt('0'),
                        drink4: parseInt('0'),
                        drink5: parseInt('0'),
                        drink6: parseInt('0'),
                        drink7: parseInt('0'),
                        drink8: parseInt('0'),
                        drink9: parseInt('0'),
                        drink10: parseInt('0'),
                        coldwater: parseInt('0'),
                        hotwater: parseInt('0'),
                        supplycode: parseInt('0'),
                        shake: parseInt('0')
                    });
                }
            }
        }
    }
            
    //Save Excel on Hard Disk
    var dir = app.getPath('desktop').toString()+'/DrinkTec';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    workbook.xlsx.writeFile(dir+"/Recipe.xlsx",{encoding:'UTF-8'}) //xlsx {encoding:'utf8'}
    .then(function() {
        // Success Message
        //convertToTxt();
        //convertToCsv();
        //alert("File Created");
    });
}

function updateRecipe(title){
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    var dir = app.getPath('desktop').toString()+'/DrinkTec';
    //workbook.csv.readFile("My First txt.csv");
    var worksheet = workbook.getWorksheet('Sheet1');
    workbook.xlsx.readFile("Recipe.xlsx") //xlsx
    //workbook.csv.readFile(dir+"/Recipe.csv")//YF Machine.xlsx
        .then(function() {
            workbook.eachSheet((sheet, id) => {
                var iceOpt = ['Normal Ice','Less Ice','Ice free','Warm','Hot'];
                sheet.eachRow((row, rowIndex) => {
                    const rowSize = sheet.rowCount;
                    const colSize = sheet.columnCount;
                    var eleid;
                    if(sheet.getRow(rowIndex).getCell(2).value == title){
                        for (var j = 3; j <= colSize; j++) {
                            //document.getElementById("data"+rowIndex+"-"+j).id;
                            if(j < 24 && j !== 4){
                                eleid = "data"+rowIndex+"-"+j;
                                if(document.getElementById(eleid).value != sheet.getRow(rowIndex).getCell(j).value){
                                    sheet.getRow(rowIndex).getCell(j).value = parseInt(document.getElementById(eleid).value);
                                    console.log(eleid+" "+sheet.getRow(rowIndex).getCell(j).value);
                                }
                            }
                            for(k in iceOpt){
                                if(row.getCell(4) == iceOpt[k]){
                                  if(document.getElementById("Supply"+iceOpt[k]).value != row.getCell(24)){
                                    sheet.getRow(rowIndex).getCell(24).value = parseInt(document.getElementById("Supply"+iceOpt[k]).value);
                                    console.log(sheet.getRow(rowIndex).getCell(24).value);
                                  }
                                //   else if(document.getElementById("Shake"+iceOpt[k]).value != row.getCell(22)){
                                //     document.getElementById("Shake"+iceOpt[k]).checked = true;
                                //   }
                                }
                            }
                        }
                        row.commit();
                        workbook.xlsx.writeFile(dir+"/Recipe.xlsx",{encoding:'UTF-8'}) //xlsx {encoding:'utf8'}
                        // workbook.csv.writeFile("Recipe.csv");
                        .then(function() {
                            // Success Message
                            //convertToTxt();
                            //convertToCsv();
                            //alert("File Created");
                        });
                    }
                });
            });
            $('.tab-pane').empty();
            //alert("File Saved");
    });
}
