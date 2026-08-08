@echo off
echo ========================================================
echo   Errymaple Portal: Prize Giving Day Photos Copy
echo ========================================================
echo.
echo Copying Prize Giving Day photos to public\images...
echo.

if not exist "public\images" mkdir "public\images"

copy /Y "C:\Users\dell\.gemini\antigravity\brain\3cfb9d43-c526-489a-bde9-3bb619d10e26\.user_uploaded\media_1786221830331.jpg" "public\images\prizegiving_1.jpg"
copy /Y "C:\Users\dell\.gemini\antigravity\brain\3cfb9d43-c526-489a-bde9-3bb619d10e26\.user_uploaded\media_1786221830439.jpg" "public\images\prizegiving_2.jpg"
copy /Y "C:\Users\dell\.gemini\antigravity\brain\3cfb9d43-c526-489a-bde9-3bb619d10e26\.user_uploaded\media_1786221830448.jpg" "public\images\prizegiving_3.jpg"
copy /Y "C:\Users\dell\.gemini\antigravity\brain\3cfb9d43-c526-489a-bde9-3bb619d10e26\.user_uploaded\media_1786221830465.jpg" "public\images\prizegiving_4.jpg"

echo.
echo All Prize Giving photos copied successfully into public\images!
echo.
pause
