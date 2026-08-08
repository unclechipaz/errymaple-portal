@echo off
echo ========================================================
echo   Errymaple Portal: Prize Giving Day Photos Copy
echo ========================================================
echo.
echo Copying Prize Giving Day photos to public/images...
echo.

if not exist "public\images" mkdir "public\images"

setlocal enabledelayedexpansion
set count=1
for /f "tokens=*" %%f in ('dir /b /o:d "C:\Users\dell\.gemini\antigravity\brain\tempmediaStorage\media_*.jpg"') do (
    echo Copying photo !count!: %%f
    copy /Y "C:\Users\dell\.gemini\antigravity\brain\tempmediaStorage\%%f" "public\images\prizegiving_!count!.jpg"
    set /a count+=1
)

echo.
echo All Prize Giving photos copied successfully into public/images!
echo.
pause
