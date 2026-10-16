Motore generico (usato il 2026-10-16 per 3 reel). index.html = engine_a.html + scenes.js (SP, add3, BOX, SCN per scena) + engine_b.html (CTA WhatsApp generica, headline, sottotitolo, frame).
- words.py fix.json → words.json; tl.py (vedi esempi/) usa tlcommon.build(scenes, KW, VFX, SFX extra, parola CTA, durata, logo_i) → timeline.json; poi kit/audio.py.
- Headline: stickers disegnati prima del testo (niente parole coperte).
- Whisper: lanciare run.mjs UNA trascrizione alla volta (in parallelo va in OOM con 7 GB). La macchina ha 2 core: renderizzare un video alla volta in 2 metà.
- check.py <dir>: durate, loudness, foglio provini sulle parole chiave (+0,05 s).
