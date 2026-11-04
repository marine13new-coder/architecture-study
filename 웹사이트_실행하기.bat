@echo off
chcp 65001 > nul
title 건축가 계보학 아카이브 웹사이트 실행기
cd /d "%~dp0"

echo =======================================================
echo    🏛️ ARCHI-GENEALOGY : 건축가 계보 & 아카이브
echo =======================================================
echo.
echo 웹사이트를 실행 중입니다...
echo.

where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js 로컬 서버 모드로 실행합니다.
    node server.js
) else (
    echo [안내] Node.js가 감지되지 않아 기본 브라우저로 index.html을 직접 엽니다.
    start index.html
)

pause
