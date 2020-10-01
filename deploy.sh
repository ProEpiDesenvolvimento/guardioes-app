npx jetify
cd android && ./gradlew assembleRelease
cp app/build/outputs/apk/release/app-release.apk ..
cd ..