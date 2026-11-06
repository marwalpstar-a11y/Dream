@echo off
title DREAMEXCH24 - Sportswear E-Commerce & Sports Exchange Desk
color 0A
echo ==============================================================
echo       DREAMEXCH24 - Starting Local Web Server...
echo ==============================================================
echo.
echo Website will open at http://localhost:8080/
echo Press Ctrl+C in this window anytime to stop the server.
echo.

start http://localhost:8080/

php -S localhost:8080
pause
