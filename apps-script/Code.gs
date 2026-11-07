/**
 * Lebendiger Adventskalender – Datenquelle mit Adressschutz
 *
 * Liest das erste Tabellenblatt (Spalten: Tag, Gastgeber, Ortsteil, Adresse, Notiz)
 * und gibt es als JSON an die Webseite.
 *  - Ohne Passwort: alles AUSSER der Spalte "Adresse".
 *  - Mit richtigem Passwort (?pw=...): zusätzlich die Adressen.
 *
 * Einrichtung siehe README, Abschnitt "Adressen schützen".
 * Das Passwort steht NICHT hier im Code, sondern unter
 * Projekteinstellungen → Script-Eigenschaften → PASSWORT.
 */

const MAX_FAILS = 10;          // so viele falsche Versuche ...
const LOCK_SECONDS = 600;      // ... innerhalb von 10 Minuten, danach 10 Minuten Sperre

function doGet(e) {
  const pw = String((e && e.parameter && e.parameter.pw) || "").trim();
  const expected = String(PropertiesService.getScriptProperties().getProperty("PASSWORT") || "").trim();

  let unlocked = false;
  let wrongPassword = false;
  let locked = false;

  if (pw) {
    const cache = CacheService.getScriptCache();
    const fails = Number(cache.get("fails") || 0);
    if (fails >= MAX_FAILS) {
      // Gesperrt: kein Passwort wird geprüft, auch nicht das richtige.
      // Die Sperre läuft LOCK_SECONDS nach dem letzten Fehlversuch ab.
      locked = true;
      Utilities.sleep(800);
    } else if (expected && pw.toLowerCase() === expected.toLowerCase()) {
      unlocked = true;
    } else {
      wrongPassword = true;
      cache.put("fails", String(fails + 1), LOCK_SECONDS);
      locked = fails + 1 >= MAX_FAILS;
      Utilities.sleep(800); // bremst Durchprobieren
    }
  }

  return json({ ok: true, unlocked: unlocked, wrongPassword: wrongPassword, locked: locked, days: readDays(unlocked) });
}

function readDays(withAddress) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const rows = sheet.getDataRange().getDisplayValues();
  const header = rows[0].map(function (h) { return String(h).trim().toLowerCase(); });
  const col = function (name) { return header.indexOf(name); };
  const iDay = col("tag"), iHost = col("gastgeber"), iArea = col("ortsteil"), iAddr = col("adresse"), iNote = col("notiz");
  const cell = function (r, i) { return i >= 0 ? String(r[i] || "").trim() : ""; };

  const days = [];
  rows.slice(1).forEach(function (r) {
    const day = parseInt(r[iDay], 10);
    if (!(day >= 1 && day <= 23)) return;
    const entry = { day: day, host: cell(r, iHost), area: cell(r, iArea), note: cell(r, iNote) };
    if (withAddress) entry.address = cell(r, iAddr);
    days.push(entry);
  });
  return days;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
