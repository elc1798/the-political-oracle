echo "{" > combined.json
command ls *.json | sed -e 's/\..*$//' | while read line; do echo "\"$line\" : `cat $line.json`," >> combined.json; done
echo "}" >> combined.json
