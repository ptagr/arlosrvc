# Version key/value should be on his own line
VER=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g'\
  | sed 's/^ *//;s/$//')

echo $VER