@echo off
echo ========================================================
echo   Errymaple Portal: STEM & Innovation Photo Copy
echo ========================================================
echo.
echo Copying STEM & Innovation robotics photo to public\images...
echo.

if not exist "public\images" mkdir "public\images"

copy /Y "C:\Users\dell\.gemini\antigravity\brain\3cfb9d43-c526-489a-bde9-3bb619d10e26\.user_uploaded\media_1787133842847.jpg" "public\images\robotics_high.jpg"

echo.
echo STEM & Innovation robotics photo copied successfully into public\images\robotics_high.jpg!
echo.
pause
