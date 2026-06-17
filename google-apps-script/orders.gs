// Deploy as Web App: Execute as Me, Anyone can access (no auth)
// Sheet must have a tab named "Orders"

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Orders');

    // Add header row on first use
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Nombre', 'Teléfono', 'Producto', 'Color',
        'Personalización', 'Cantidad', 'Método de envío', 'Dirección', 'Total'
      ]);
    }

    sheet.appendRow([
      data.timestamp,
      data.nombre,
      data.telefono,
      data.productos,
      data.colores,
      data.personalizacion || '',
      data.cantidad,
      data.metodo_envio,
      data.direccion,
      data.total,
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow CORS preflight
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
