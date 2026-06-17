// Deploy as Web App: Execute as Me, Anyone can access (no auth)
// Sheet must have a tab named "Users"

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');

    // Add header row on first use
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Usuario', 'Email', 'Contraseña (hash)']);
    }

    // SHA-256 hash of password
    var raw = Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      data.password
    );
    var hashedPassword = raw
      .map(function(b) { return ('0' + (b & 0xff).toString(16)).slice(-2); })
      .join('');

    sheet.appendRow([
      data.timestamp,
      data.usuario,
      data.email,
      hashedPassword,
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

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
