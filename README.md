# Lebendiger Adventskalender – OnePager

Statische Webseite (eine einzige `index.html`, ohne Datenbank oder Backend) für den Lebendigen Adventskalender der Evangelischen Kirchengemeinde Seeregion Friedrichshafen.

- Zeigt oben das **heutige Türchen** (1.–23. Dezember). Außerhalb dieses Zeitraums erscheint eine **Vorschau auf den 1. Dezember**.
- Darunter das Raster aller 23 Tage: **grün = frei** (mit „Diesen Tag anfragen“-Button per E-Mail), **rot = vergeben** (mit Gastgeber und Ort). Der heutige Tag ist zusätzlich golden markiert.

## Belegung pflegen

Alle Daten stehen in `index.html` im Block `calendarData` (ganz unten im `<script>`). Um einen Tag als vergeben einzutragen, die passende Zeile ändern:

```js
{ day: 5, booked: true, host: "Familie Muster", address: "Seestraße 1, Friedrichshafen" },
```

Um einen Tag wieder freizugeben: `booked: false` und `host`/`address` leeren.

Hinweise:
- Texte immer in `"Anführungszeichen"`, Zeilen mit Komma trennen.
- Sonderzeichen wie `&` oder `"` in Namen sind unproblematisch, sie werden sicher dargestellt. Ein `"` innerhalb eines Textes muss als `\"` geschrieben werden.
- Die Kontakt-E-Mail für die Anfrage-Buttons steht in `CONTACT_EMAIL` direkt unter `calendarData`.

Bearbeiten geht direkt auf GitHub: Datei `index.html` öffnen → Stift-Symbol („Edit“) → ändern → „Commit changes“. Nach ca. 1 Minute ist die Seite aktualisiert.

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
