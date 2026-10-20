#!/bin/bash
# usage: rend.sh mX PORT
d=$1; P=$2; cd /home/claude/work/$d
bash ../assemble.sh $d; cp ../base/render.mjs ../base/shot.mjs .
python3 ../audio.py > audio.log 2>&1 || { echo AUDIOFAIL; exit 1; }
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 final_audio.wav)
N=$(python3 -c "import math;print(math.ceil($D*30))"); H=$((N/2))
PORT=$P node render.mjs 0 $H p1.mp4 > r1.log 2>&1 &
PORT=$P node render.mjs $H $N p2.mp4 > r2.log 2>&1 &
wait
printf "file p1.mp4\nfile p2.mp4\n" > cat.txt
ffmpeg -y -v error -f concat -safe 0 -i cat.txt -c copy vid.mp4
ffmpeg -y -v error -i vid.mp4 -i final_audio.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart out.mp4
echo DONE $d $N
