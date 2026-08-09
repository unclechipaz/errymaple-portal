@echo off
echo ========================================================
echo   Errymaple Portal: Classroom Excellence Photo Copy
echo ========================================================
echo.
echo Copying Classroom Excellence award photo to public\images...
echo.

if not exist "public\images" mkdir "public\images"

copy /Y "C:\Users\dell\.gemini\antigravity\brain\3cfb9d43-c526-489a-bde9-3bb619d10e26\.user_uploaded\media_1786302147445.jpg" "public\images\classrooms_high.jpg"

echo.
echo Classroom Excellence award photo copied successfully into public\images\classrooms_high.jpg!
echo.
pause
