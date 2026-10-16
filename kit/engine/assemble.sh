#!/bin/bash
d=$1; cd /home/claude/work/$d
cat ../engine_a.html scenes.js ../engine_b.html > index.html
ln -sfn ../base/node_modules node_modules; ln -sfn ../base/fonts fonts; cp ../base/logo.png .; cp ../base/render.mjs ../base/shot.mjs .
