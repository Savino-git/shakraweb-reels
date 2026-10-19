Motore generico (usato il 2026-10-16 per 3 reel). index.html = engine_a.html + scenes.js (SP, add3, BOX, SCN per scena) + engine_b.html (CTA WhatsApp generica, headline, sottotitolo, frame).
- words.py fix.json → words.json; tl.py (vedi esempi/) usa tlcommon.build(scenes, KW, VFX, SFX extra, parola CTA, durata, logo_i) → timeline.json; poi kit/audio.py.
- Headline: stickers disegnati prima del testo (niente parole coperte).
- Whisper: lanciare run.mjs UNA trascrizione alla volta (in parallelo va in OOM con 7 GB). La macchina ha 2 core: renderizzare un video alla volta in 2 metà.
- check.py <dir>: durate, loudness, foglio provini sulle parole chiave (+0,05 s).
- 2026-10-18: phone.py (refine(W): tempi del numero WhatsApp dall'energia audio, anche quando whisper lo unisce in un token) e runw.mjs (trascrizione a finestre se whisper salta un tratto: node runw.mjs '[[s,e,keep0,keep1],...]'). Esempi in esempi/2026-10-18/. Nota: nel concatenare i render, non usare `pgrep -f "rend.sh mX"` dentro bash -c (matcha sé stesso).
- 2026-10-19: tlcommon accetta 'parola|' in words.json per forzare uno stacco di gruppo headline (il '|' viene tolto). esempi/2026-10-19/prep.py (words + fix + numero) e phone2.py: se phone.refine trova solo 2 blocchi, divide il primo nel punto di minima energia (331|588). YouTube risulta collegato in Metricool: i post includono youtube short.
