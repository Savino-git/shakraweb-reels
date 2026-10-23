cd /home/claude/work
while ! grep -q DONE m1/rend.log; do sleep 10; done
bash rend.sh m2 8772 > m2/rend.log 2>&1
bash rend.sh m3 8773 > m3/rend.log 2>&1
