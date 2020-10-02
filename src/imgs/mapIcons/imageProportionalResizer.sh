# Para usar, instale isso: `sudo apt-get install imagemagick`
echo "pasta de input:"
read inputFolder
file
if [[ $inputFolder == "." ]]
then
	inputFolder=""
else
	inputFolder="$inputFolder/"
fi
files=$(ls $inputFolder)
echo "multiplicar tamanho da imagem por:"
read sizeMultiplier
for item in $files
do
	if [[ $item == *.png ]]
	then
		size=$(echo $sizeMultiplier $(identify -format '%w' $inputFolder$item) | awk '{printf "%.0f", $1*$2}')
		echo "converting $inputFolder$item... to $size x $size"
		convert $inputFolder$item -resize $sizex$size $inputFolder$item
	fi
done
