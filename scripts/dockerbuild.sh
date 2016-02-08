source ./scripts/version.sh

echo Building version \"$VER\"

docker build -t arlosvc:$VER .

echo Tagging latest...

docker tag -f arlosvc:$VER arlosvc:latest

echo DONE
