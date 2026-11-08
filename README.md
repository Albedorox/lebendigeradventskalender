# Lebendiger Adventskalender – OnePager

Statische Webseite (eine einzige `index.html`, ohne Datenbank oder Backend) für den Lebendigen Adventskalender der Evangelischen Kirchengemeinde Seeregion Friedrichshafen.

- Ganz oben steht groß das **heutige Fenster** mit Gastgeber, Adresse und „Weg anzeigen“. Vor dem 1. Dezember zeigt die Seite den ersten Abend, nach dem 23. Dezember einen Dank.
- Darunter **„Als Nächstes“**: die drei folgenden Abende mit Gastgeber.
- Darunter **„Der Kalender“**: 23 gleich große Türchen von 1 bis 23 mit Wochentag, Gastgeber und Ort. Vergangene Tage sind abgeschwächt, heute ist golden markiert. Antippen zeigt direkt darunter Notiz und „Weg anzeigen“.
- Weitere Infos (Ablauf, selbst Gastgeber werden, alle 23 Abende, Kontakt) liegen in aufklappbaren Abschnitten. Die Texte dafür stehen direkt im HTML und können dort angepasst werden.

## Belegung pflegen (Google-Tabelle)

Die Seite liest die Belegung aus einer veröffentlichten Google-Tabelle. Pflegen geht damit ohne GitHub, auch vom Handy aus.

### Einmalig einrichten

1. In Google Drive eine neue Tabelle anlegen und `vorlage.csv` aus diesem Repo importieren (Datei → Importieren → Hochladen → „Aktuelle Tabelle ersetzen“). Alternativ die erste Zeile von Hand anlegen: `Tag`, `Gastgeber`, `Adresse`, darunter die Tage 1 bis 23.
2. Datei → Freigeben → **Im Web veröffentlichen**. Dort das richtige Tabellenblatt und als Format **Kommagetrennte Werte (.csv)** wählen, dann „Veröffentlichen“.
3. Den angezeigten Link kopieren (er endet auf `output=csv`) und in `index.html` bei `SHEET_CSV_URL = "..."` eintragen. Das ist die einzige Änderung am Code.

### Im Alltag

- Ein Abend gilt als **vergeben**, sobald in der Spalte `Gastgeber` etwas steht. Leeren Gastgeber = Abend ist wieder frei.
- Die optionale Spalte `Notiz` wird auf der Seite beim jeweiligen Abend angezeigt (z. B. „Bitte durch den Hof, Eingang links“ oder „Mit Kinderpunsch“).
- Ist keine `Adresse` eingetragen, erscheint auch kein „Weg anzeigen“-Button.
- Weitere Spalten (z. B. `Telefon`) sind erlaubt und werden **nicht** angezeigt. Gut für interne Infos.
- Änderungen erscheinen nach ein paar Minuten auf der Seite (Google aktualisiert die veröffentlichte Fassung mit kurzer Verzögerung).
- Zum Bearbeiten die Tabelle einfach mit den Personen teilen, die pflegen sollen.

Wichtig: Die veröffentlichte Tabelle kann jeder mit dem Link lesen. Darum keine privaten Daten hineinschreiben, die nicht ohnehin auf der Seite stehen sollen. Auch die Spalte `Notiz` ist öffentlich. Interne Infos gehören in ein zweites, nicht veröffentlichtes Tabellenblatt.

### Ersatzdaten

Ist `SHEET_CSV_URL` leer oder die Tabelle nicht erreichbar, nutzt die Seite die Liste `calendarData` in `index.html`. Sie kann leer bleiben oder als Notfall-Stand gepflegt werden. Die Kontakt-E-Mail für die Anfrage-Links steht in `CONTACT_EMAIL`.

## Adressen schützen (Passwort)

Die veröffentlichte Google-Tabelle ist für jeden lesbar. Damit Adressen nicht offen im Internet stehen, kann die Seite ihre Daten stattdessen über ein kleines **Google Apps Script** holen:

- Ohne Passwort zeigt die Seite Gastgeber, **Ortsteil** und Notiz.
- Mit dem Gemeinde-Passwort (z. B. aus Gemeindebrief oder Flyer) erscheint zusätzlich die genaue **Adresse** mit „Weg anzeigen“. Das Passwort merkt sich der Browser.
- Die Tabelle selbst ist dann **nicht** mehr veröffentlicht. Das Script prüft das Passwort auf Googles Servern, die Adressen kommen nie ohne Passwort zur Seite.

### Einmalig einrichten (ca. 10 Minuten, am besten am Computer)

1. **Tabelle vorbereiten:** Im ersten Tabellenblatt die Spalten `Tag`, `Gastgeber`, `Ortsteil`, `Adresse`, `Notiz` anlegen (siehe `vorlage.csv`). `Ortsteil` ist das, was alle sehen, z. B. „Fischbach, Nähe Kirche“.
2. **Script einfügen:** In der Tabelle Erweiterungen → Apps Script. Den Inhalt von `apps-script/Code.gs` aus diesem Repo hineinkopieren (vorhandenen Code ersetzen) und speichern.
3. **Passwort festlegen:** Links auf das Zahnrad (Projekteinstellungen) → ganz unten „Script-Eigenschaft hinzufügen“: Name `PASSWORT`, Wert z. B. `Adventsstern`. Groß-/Kleinschreibung spielt keine Rolle.
4. **Veröffentlichen:** Oben rechts Bereitstellen → Neue Bereitstellung → Typ „Web-App“. Ausführen als: **Ich**. Zugriff: **Jeder**. Bereitstellen, Zugriff erlauben und die angezeigte **Web-App-URL** kopieren (endet auf `/exec`).
5. **Seite umstellen:** Die URL in `index.html` bei `DATA_API_URL = "..."` eintragen (oder an Claude schicken).
6. **Alte Veröffentlichung beenden:** In der Tabelle Datei → Freigeben → Im Web veröffentlichen → **Veröffentlichung beenden**. Erst jetzt sind die Adressen wirklich nicht mehr öffentlich.

Änderungen an der Tabelle sind danach sofort auf der Seite sichtbar. Wird das Script-Code später geändert, muss unter Bereitstellen → Bereitstellungen verwalten eine neue Version bereitgestellt werden (die URL bleibt gleich).

Hinweise:
- Ein Passwort, das auf einem Flyer steht, schützt vor Suchmaschinen und Fremden, nicht vor jedem Gemeindemitglied. Das ist so gewollt.
- Nach 10 falschen Versuchen innerhalb von 10 Minuten nimmt das Script 10 Minuten lang keine Passwörter an (auch nicht das richtige). Die Seite zeigt dann „Zu viele Versuche“. So kann niemand einfach durchprobieren.
- Auch Namen sind personenbezogene Daten. Am besten holt man von allen Gastgebern eine kurze Einwilligung ein, was online stehen darf.
- Den Hinweistext, wo man das Passwort bekommt, ändert man in `index.html` bei `PASSWORD_HINT`.

## Lokal ansehen

`index.html` einfach im Browser öffnen (Doppelklick). Ein Server ist nicht nötig.

Zum Testen eines bestimmten Tages kann man vorübergehend in `index.html` die Zeile `const now = new Date();` durch z. B. `const now = new Date(2026, 11, 5);` ersetzen (Monat 11 = Dezember). Danach wieder zurückändern.

## Veröffentlichen mit GitHub Pages

1. Im Repository auf **Settings → Pages** gehen.
2. Unter **Build and deployment** bei *Source* „Deploy from a branch“ wählen.
3. Branch `main` und Ordner `/ (root)` auswählen, **Save**.
4. Nach 1–2 Minuten ist die Seite erreichbar. Eigene Adresse: **https://adventskalender.ev-fn.de** (DNS: CNAME `adventskalender` → `albedorox.github.io`, festgelegt in der Datei `CNAME`; `albedorox.github.io/lebendigeradventskalender/` leitet dorthin weiter).

Jede Änderung an `index.html` auf `main` wird automatisch neu veröffentlicht.

Falls eine Änderung nicht auf der Seite ankommt: unter **Actions** nachsehen, ob „pages build and deployment“ fehlgeschlagen ist oder hängt. Meist ist das eine Störung bei GitHub (githubstatus.com). Ein neuer Commit auf `main` startet die Veröffentlichung frisch.

Alternative: Netlify (Ordner per Drag & Drop auf app.netlify.com/drop ziehen).

## Kalender, Teilen und Wetter

- **In den Kalender:** Bei jedem vergebenen Abend lädt der Knopf einen einzelnen Termin (.ics, 18:00 bis 18:30 Uhr, Erinnerung 30 Minuten vorher). Auf dem iPhone öffnet sich direkt „Zum Kalender hinzufügen“.
- **Teilen:** Teilt Tag, Gastgeber und Ortsteil mit dem Link zur Seite, nie die genaue Adresse. Am Handy öffnet sich das Teilen-Menü, am Computer wird der Text kopiert.
- **Wetter:** Für Abende in den nächsten 16 Tagen zeigt die Seite die Vorhersage für 18 Uhr in Friedrichshafen mit passenden Tipps (Kleidung, Regen, Schnee, Glätte, Wind). Die Daten kommen von [Open-Meteo](https://open-meteo.com/) (kostenlos, ohne Anmeldung). Dabei sieht Open-Meteo die IP-Adresse der Besucher; das sollte in der Datenschutzerklärung der Gemeinde erwähnt werden. Abschalten: in `index.html` `SHOW_WEATHER = false` setzen.

## Vorschaubild beim Teilen

Wer den Link in Signal, WhatsApp & Co. teilt, sieht das Bild `og-image.jpg` (1200 × 630) mit Titel und Beschreibung aus den `og:`-Angaben im Kopf von `index.html`. Messenger merken sich die Vorschau eine Weile; nach einer Änderung kann es dauern, bis das neue Bild erscheint.

## Version und Footer

Im Footer stehen Copyright, Links zu Impressum und Datenschutz der Gemeinde-Website und eine kleine Versionsnummer. Bei größeren Änderungen in `index.html` die Zeile `Version … · Stand …` anpassen.

## Schriften

Newsreader, Inter und Caveat (Handschrift) liegen im Ordner `fonts/` (Lizenz: SIL Open Font License 1.1) und werden direkt von dieser Seite geladen. So werden beim Aufruf keine Daten an Google Fonts übertragen.
