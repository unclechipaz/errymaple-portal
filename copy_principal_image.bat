@echo off
echo ========================================================
echo   Errymaple Portal: Principal Photo Copy
echo ========================================================
echo.
echo Copying Principal Mr. M. Mhuri photo to public\images...
echo.

if not exist "public\images" mkdir "public\images"

copy /Y "C:\Users\dell\.gemini\antigravity\brain\3cfb9d43-c526-489a-bde9-3bb619d10e26\.user_uploaded\media_1786306177738.jpg" "public\images\principal_high.jpg"

echo.
echo Principal photo copied successfully into public\images\principal_high.jpg!
echo.
pause
