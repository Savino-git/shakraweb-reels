# Reel automatici Shakra Web — istruzioni per la sessione giornaliera

Ogni giorno: 3 reel verticali NUOVI → programmati su Metricool alle 12:30, 18:30, 21:00 (Europe/Paris) su Instagram Reel, TikTok, Facebook Reel (+ YouTube Shorts solo se risulta collegato in Metricool).
Il titolare (Mr Sawa) non deve fare niente. Se qualcosa va storto, programma comunque i video riusciti e scrivi un riepilogo chiaro di cosa manca.

## Dati fissi
- Metricool blogId: `7465102` (timezone Europe/Paris). Controlla le reti collegate con `getBrandSettings`.
- ElevenLabs: voce **Dan - Upbeat, Dynamic and Friendly** `voice_id=9F4C8ztpNUmXkdDDbz3J`, modello **`eleven_v4`**, `generations_count: 1` (una sola voce per video).
- La voce va **velocizzata in post-produzione** (rubberband ~1,2x, taglio pause): ElevenLabs genera a velocità normale.
- Repo: `Savino-git/shakraweb-reels` (pubblico). Video in `v/AAAA-MM-GG-slot-slug.mp4`, link pubblico:
  `https://raw.githubusercontent.com/Savino-git/shakraweb-reels/main/v/<file>.mp4` (Metricool lo copia sui suoi server: funziona, testato).
- WhatsApp per le CTA: **331 588 7685** (nel testo per la voce scriverlo in lettere: "tre tre uno, cinque otto otto, sette sei otto cinque").
- Logo: `kit/web/logo.png` (già ritagliato con alpha). Mai aggiungere ombre: solo il suo alone celeste originale, mai tagliato di netto.
- Domini già consentiti nella rete: storage.googleapis.com, api.elevenlabs.io, github (git). Higgsfield NON va usato.

## 1. Scegliere i 3 argomenti (varietà obbligatoria)
Leggi `registro.json` (storico di tutti i video). Per oggi scegli 3 video con:
- 3 **servizi** diversi tra loro e non usati negli ultimi 3 giorni. Servizi: siti web, e-commerce, gestionale su misura, gestionale con AI, app, SEO/farsi trovare su Google, configuratori 3D, personalizzatori prodotto, aumento conversioni, automazioni, assistente AI su WhatsApp, chatbot, software su misura, CRM, prenotazioni online, menu digitale/QR/totem per locali, domotica (app Shakra Domotic), landing page per campagne, programmi e intelligenza artificiale "a 360 gradi".
- 3 **stili** diversi: provocatorio/cattivo (frecciatine al titolare e alle sue abitudini, MAI ai dipendenti), calcoli concreti (problema → vantaggio → soluzione con numeri), prima/dopo, domanda diretta, "3 segnali che…", mito da sfatare, mini-storia di un cliente tipo.
- 3 **settori** diversi quando l'argomento lo permette: ristoranti/pizzerie, negozi, artigiani, studi professionali, palestre, hotel/B&B, officine, parrucchieri/estetiste, agenzie immobiliari, aziende di produzione, ecc.
- Mai ripetere la stessa combinazione servizio+angolo dei 30 giorni precedenti. Il gancio iniziale deve sempre essere nuovo.

## 2. Scrivere i testi (per la voce)
- 85–110 parole (≈ 28–34 s dopo la velocizzazione). Mai troppo lunghi.
- Struttura: **gancio** fortissimo nei primi 2 secondi → sviluppo con esempi/calcoli concreti → chiusura con il payoff **"Chi lavora di notte non si lamenta. Si chiama software."** (usalo spesso ma non per forza in tutti e 3) → **CTA**: "Scrivi <PAROLA> su WhatsApp al tre tre uno, cinque otto otto, sette sei otto cinque." con una parola chiave diversa per ogni video (es. ROBOT, 3D, ORDINE, SITO, APP…).
- Parla anche a chi un sito o un gestionale NON ce l'ha. Mai chiedere di mandare il link del proprio sito. Mai citare IVA. Nessun nome di clienti reali.
- Far capire che Shakra Web non è la solita agenzia: fa siti, gestionali, app, AI, automazioni — "qualsiasi cosa".
- Punteggiatura curata (virgole = pause). Opzionale: 1–2 tag audio v4 leggeri tipo [excited] all'inizio.

## 3. Voce (ElevenLabs MCP)
Per ogni testo: `creative_generate_speech` (prompt=testo, model_id=eleven_v4, voice_id sopra, generations_count=1). Fai le 3 generazioni subito, poi fai polling con `creative_get_flow_run_status` (attendi poll_after_seconds) finché completed. Scarica `content_url` con curl entro 2 ore (scade). Mai rilanciare una generazione per "riprovare" se è solo lenta: costa crediti.

## 4. Montaggio (skill motion-graphic-voce-dinamico)
Segui la skill **motion-graphic-voce-dinamico** alla lettera (audio prima, poi tempi; trascrizione whisper; effetti voce; SFX sintetizzati; musica melodica non troppo bassa; scene 3D; headline parola per parola; controllo finale).
- **VIETATO l'effetto voce "grave/epica"** (`deep` in timeline.py: pitch giù + riverbero, es. "al mese BUTTATI", "non TELEFONATE"): al titolare non piace, sembra un robot e non si capisce. Tutti gli altri effetti voce vanno benissimo e restano: radio/telefono, eco sul brand, voce acuta, reverse swell, ducking a zero.
Il codice già funzionante è in `kit/` (usato per il reel "gestionale AI"):
- `kit/cut.py` (taglio pause) → poi `rubberband=tempo=1.2` → `voice_fast.wav`
- `kit/run.mjs` (whisper con `npm pack sts-whisper-small` in `asr/`), `kit/words.py` (pulizia parole)
- `kit/timeline.py` (gruppi headline, parole chiave, scene, effetti voce, SFX) — RISCRIVILO per ogni video
- `kit/audio.py` (catena voce, effetti, SFX, musica 124 BPM, mix, loudnorm)
- `kit/web/esempio_gestionale_ai.html` = motore grafico di riferimento (sfondi, headline, sottotitolo, card, 3D three.js, logo). Copialo come `index.html` e riscrivi `SP`, `BOX`, i builder 3D `add3(...)` e `sceneDraw` per le scene del nuovo testo. Ogni video deve avere oggetti 3D e card DIVERSE (non riciclare le stesse scene del giorno prima).
- `kit/web/render.mjs` (render in 2 metà parallele), `kit/web/shot.mjs` (provini). Setup: `npm i` in web/, font e logo già in kit/web, server `python3 -m http.server 8765`.
Dati di esempio nelle card: inventati e plausibili (Rossi Srl, Mario Rossi…), mai dati veri.

## 5. Pubblicare
1. Copia gli MP4 in `v/`, commit e push su `main` (prima `git pull`). Verifica con `curl -I` che il link raw dia 200.
2. Per ogni video `createScheduledPost` su blogId 7465102, `draft: false`, `autoPublish: true`, orari di OGGI 12:30 / 18:30 / 21:00 (se un orario è già passato usa il primo slot libero ≥ 30 min da adesso).
   - providers: instagram, tiktok, facebook (+ youtube se collegato: youtubeData type "short", madeForKids false, title, isAiGeneratedContent true)
   - instagramData: `{"type":"REEL","showReelOnFeed":true,"isAiGenerated":true}`
   - tiktokData: `{"privacyOption":"PUBLIC_TO_EVERYONE","commercialContentOwnBrand":true,"isAigc":true,"title":"<titolo breve>"}`
   - facebookData: `{"type":"REEL","title":"<titolo breve>"}`
   - text = descrizione Instagram: gancio (2 righe) + 3–4 righe con emoji/punti + payoff + CTA "Scrivi \"<PAROLA>\" su WhatsApp al 331 588 7685" + **5 hashtag** pertinenti (sempre incluso #shakraweb).
3. Se Metricool dà errore di limite post (piano gratuito = 20/mese), fermati: non insistere, lascia i video nel repo e segnala nel riepilogo che serve l'upgrade del piano Metricool.

## 6. Registro e riepilogo
- Aggiungi a `registro.json` una voce per video: data, slot, servizio, stile, settore, gancio, parola CTA, file, plannerUrl. Commit + push.
- Riepilogo finale (breve, in italiano): i 3 ganci, orari, link planner, eventuali problemi.
