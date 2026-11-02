# Lebendiger Adventskalender – OnePager

Statische Webseite (eine einzige `index.html`, ohne Datenbank oder Backend) für den Lebendigen Adventskalender der Evangelischen Kirchengemeinde Seeregion Friedrichshafen.

- Ganz oben steht groß das **heutige Fenster** mit Gastgeber, Adresse und „Weg anzeigen“. Vor dem 1. Dezember zeigt die Seite den ersten Abend, nach dem 23. Dezember einen Dank.
- Darunter **„Als Nächstes“**: die drei folgenden Abende mit Gastgeber.
- Darunter **„Der Kalender“**: 23 Türchen in gemischter Reihenfolge. Vergangene Türchen stehen offen, das heutige öffnet sich beim Laden. Antippen zeigt Gastgeber, Adresse und Notiz.
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

## Lokal ansehen

`index.html` einfach im Browser öffnen (Doppelklick). Ein Server ist nicht nötig.

Zum Testen eines bestimmten Tages kann man vorübergehend in `index.html` die Zeile `const now = new Date();` durch z. B. `const now = new Date(2026, 11, 5);` ersetzen (Monat 11 = Dezember). Danach wieder zurückändern.

## Veröffentlichen mit GitHub Pages

1. Im Repository auf **Settings → Pages** gehen.
2. Unter **Build and deployment** bei *Source* „Deploy from a branch“ wählen.
3. Branch `main` und Ordner `/ (root)` auswählen, **Save**.
4. Nach 1–2 Minuten ist die Seite unter `https://<github-name>.github.io/<repo-name>/` erreichbar. Die Adresse steht auch oben auf der Pages-Einstellungsseite.

Jede Änderung an `index.html` auf `main` wird automatisch neu veröffentlicht.

Alternative: Netlify (Ordner per Drag & Drop auf app.netlify.com/drop ziehen).
