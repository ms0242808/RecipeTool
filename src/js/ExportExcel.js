function exportFile(id){
    /*TableExport(document.getElementById('recipeTable'), {
      headers: true,                      // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
      footers: true,                      // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
      formats: ["xlsx", "csv", "txt"],    // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
      filename: "id",                     // (id, String), filename for the downloaded file, (default: 'id')
      bootstrap: true,                   // (Boolean), style buttons using bootstrap, (default: true)
      exportButtons: true,                // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
      position: "bottom",                 // (top, bottom), position of the caption element relative to table, (default: 'bottom')
      ignoreRows: null,                   // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
      ignoreCols: null,                   // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
      trimWhitespace: true,               // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
      RTL: false,                         // (Boolean), set direction of the worksheet to right-to-left (default: false)
      sheetname: "id"                     // (id, String), sheet name for the exported spreadsheet, (default: 'id')
    });*/
    var table = TableExport(document.getElementById(id),{
      footers: true,                      // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
      formats: ["xlsx", "csv", "txt"],    // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
      filename: "id",                     // (id, String), filename for the downloaded file, (default: 'id')
      bootstrap: true,                   // (Boolean), style buttons using bootstrap, (default: true)
      sheetname: "id"                     // (id, String), sheet name for the exported spreadsheet, (default: 'id')
    });
    //var exportData = table.getExportData();
    var exportData = table.getExportData()[id];
    console.log(exportData);
    console.log(document.getElementById(id).value);
    //table.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension);
  }