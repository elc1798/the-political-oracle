echo "{" > combined
command ls *.json | sed -e 's/\..*$//' | while read line; do echo "\"$line\" : `cat $line.json`," >> combined; done
echo "}" >> combined
mv combined combined.json
