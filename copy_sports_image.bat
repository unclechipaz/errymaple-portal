@echo off
echo ========================================================
echo   Errymaple Portal: Sports Academy Photo Copy
echo ========================================================
echo.
echo Copying Sports Academy team photo to public\images...
echo.

if not exist "public\images" mkdir "public\images"

copy /Y "C:\Users\dell\.gemini\antigravity\brain\3cfb9d43-c526-489a-bde9-3bb619d10e26\.user_uploaded\media_1786300902586.jpg" "public\images\sports_high.jpg"

echo.
echo Sports Academy team photo copied successfully into public\images\sports_high.jpg!
echo.
pause
