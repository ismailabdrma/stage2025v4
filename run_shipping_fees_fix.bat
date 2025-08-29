@echo off
echo ========================================
echo    STAGE2025 - Shipping Fees Fix
echo ========================================
echo.
echo This script will fix the shipping fees database issue.
echo.
echo Press any key to continue...
pause >nul

echo.
echo Running SQL script to fix shipping fees...
echo.

REM Try to run the SQL script
mysql -u root -p -e "source fix_shipping_fees_immediate.sql"

if %errorlevel% equ 0 (
    echo.
    echo ✅ Shipping fees fixed successfully!
    echo.
    echo The system should now be able to calculate shipping costs.
    echo Restart your application to see the changes.
) else (
    echo.
    echo ❌ Error running SQL script.
    echo.
    echo Please check:
    echo 1. MySQL is running
    echo 2. You have the correct password
    echo 3. The database 'stage-db' exists
    echo.
    echo You can also run the SQL manually:
    echo mysql -u root -p stage-db < fix_shipping_fees_immediate.sql
)

echo.
echo Press any key to exit...
pause >nul

