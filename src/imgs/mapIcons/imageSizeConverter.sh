# Para usar, instale isso: `sudo apt-get install imagemagick`
files=$(ls .)
for item in $files
do
	if [[ $item == *.png ]]
	then
		echo "converting $item... to 70x70"
		convert $item -resize 70x70 $item
	fi
done
