source ./scripts/version.sh

echo Building version \"$VER\"

docker build -t arlosrvc:$VER .

echo Tagging latest...

docker tag -f arlosrvc:$VER arlosrvc:latest

echo DONE
