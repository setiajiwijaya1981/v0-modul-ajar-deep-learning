@echo off
REM Modul Ajar Platform - ZIP Creation Script for Windows
REM Script ini membuat ZIP file untuk di-upload ke Gemini AI

echo.
echo ==============================================================================
echo Creating ZIP file for Gemini AI...
echo ==============================================================================
echo.

REM Create temporary directory
if exist gemini-upload-temp (
    rmdir /s /q gemini-upload-temp
)
mkdir gemini-upload-temp

REM Copy documentation files
echo [1/6] Copying documentation...
mkdir gemini-upload-temp\docs
xcopy docs gemini-upload-temp\docs\ /E /I /Y >nul 2>&1
copy GEMINI_HANDOFF_READY.md gemini-upload-temp\ >nul 2>&1
copy README.md gemini-upload-temp\ >nul 2>&1
copy QUICK_START.md gemini-upload-temp\ >nul 2>&1
copy SETUP_GUIDE.md gemini-upload-temp\ >nul 2>&1

REM Copy source code
echo [2/6] Copying source code...
mkdir gemini-upload-temp\src
xcopy app gemini-upload-temp\src\app\ /E /I /Y >nul 2>&1
xcopy components gemini-upload-temp\src\components\ /E /I /Y >nul 2>&1
xcopy lib gemini-upload-temp\src\lib\ /E /I /Y >nul 2>&1
xcopy hooks gemini-upload-temp\src\hooks\ /E /I /Y >nul 2>&1
xcopy prisma gemini-upload-temp\src\prisma\ /E /I /Y >nul 2>&1
xcopy scripts gemini-upload-temp\src\scripts\ /E /I /Y >nul 2>&1

REM Copy configuration files
echo [3/6] Copying configuration files...
copy package.json gemini-upload-temp\ >nul 2>&1
copy tsconfig.json gemini-upload-temp\ >nul 2>&1
copy next.config.mjs gemini-upload-temp\ >nul 2>&1
copy components.json gemini-upload-temp\ >nul 2>&1
copy middleware.ts gemini-upload-temp\ >nul 2>&1

REM Copy style files
echo [4/6] Copying styles...
mkdir gemini-upload-temp\styles
xcopy styles gemini-upload-temp\styles\ /E /I /Y >nul 2>&1

REM Create manifest file
echo [5/6] Creating manifest...
(
    echo =================================================================================
    echo MODUL AJAR PLATFORM - GEMINI AI HANDOFF PACKAGE
    echo =================================================================================
    echo.
    echo CONTENTS:
    echo ---------
    echo.
    echo 1. DOCUMENTATION/
    echo    - docs/README.md                          ^> Start here!
    echo    - docs/PROJECT_HANDOFF_GUIDE.md          ^> Project overview
    echo    - docs/GEMINI_AI_CONTINUATION_PROMPT.md  ^> Development guidelines
    echo    - docs/KEY_FILES_REFERENCE.md            ^> Important files explained
    echo    - docs/GEMINI_DEVELOPMENT_CHECKLIST.md   ^> Task checklist
    echo    - docs/GEMINI_STARTER_PROMPT.md          ^> Copy-paste prompt
    echo.
    echo 2. QUICK REFERENCE/
    echo    - README.md                ^> Project overview
    echo    - GEMINI_HANDOFF_READY.md ^> This handoff package
    echo    - QUICK_START.md          ^> 5-minute setup
    echo.
    echo 3. SOURCE CODE/
    echo    - src/app/                ^> Next.js pages
    echo    - src/components/         ^> React components
    echo    - src/lib/                ^> Firebase utilities
    echo    - src/hooks/              ^> Custom hooks
    echo    - src/prisma/             ^> Database
    echo    - src/scripts/            ^> Utility scripts
    echo.
    echo 4. CONFIGURATION/
    echo    - package.json
    echo    - tsconfig.json
    echo    - next.config.mjs
    echo    - middleware.ts
    echo.
    echo =================================================================================
    echo PROJECT STATUS: 50%% COMPLETE
    echo =================================================================================
    echo.
    echo COMPLETED:
    echo [OK] Firebase integration
    echo [OK] Database layer
    echo [OK] Authentication system
    echo [OK] Module builder framework
    echo [OK] Form sections 1-2
    echo [OK] Module management
    echo [OK] API endpoints
    echo.
    echo TODO:
    echo [ ] Add form sections 3-18
    echo [ ] Export functionality
    echo [ ] Admin dashboard
    echo [ ] Sharing features
    echo.
    echo =================================================================================
    echo HOW TO USE
    echo =================================================================================
    echo.
    echo 1. Extract this ZIP
    echo 2. Read docs/README.md first
    echo 3. Copy docs/GEMINI_STARTER_PROMPT.md
    echo 4. Paste to Gemini AI: https://gemini.google.com
    echo 5. Start development!
    echo.
    echo =================================================================================
) > gemini-upload-temp\MANIFEST.txt

REM Create Gemini start file
echo [6/6] Creating Gemini start guide...
(
    echo # 🚀 START HERE - GEMINI AI HANDOFF PACKAGE
    echo.
    echo Welcome! This is a complete handoff package for Gemini AI.
    echo.
    echo ## Quick Start
    echo.
    echo 1. Read: docs/README.md
    echo 2. Read: docs/PROJECT_HANDOFF_GUIDE.md
    echo 3. Copy: docs/GEMINI_STARTER_PROMPT.md
    echo 4. Paste to: https://gemini.google.com
    echo.
    echo ## What's Inside
    echo.
    echo - Complete source code
    echo - 7 documentation files
    echo - Firebase configuration
    echo - API endpoints ready
    echo - 50%% of project complete
    echo.
    echo ## Project Status: 50%% Complete
    echo.
    echo Completed:
    echo - Firebase integration
    echo - Database layer
    echo - Auth system
    echo - Module builder framework
    echo - Form sections 1-2
    echo - Module management
    echo.
    echo TODO for Gemini:
    echo - Add form sections 3-18
    echo - Implement exports
    echo - Admin dashboard
    echo - Sharing features
    echo.
    echo ## Next Steps
    echo.
    echo 1. Extract ZIP
    echo 2. Read docs/ folder
    echo 3. Open Gemini AI
    echo 4. Paste STARTER_PROMPT
    echo 5. Start development!
    echo.
    echo Ready to go! 🚀
) > gemini-upload-temp\GEMINI_START_HERE.md

echo.
echo ✅ Creating ZIP file...

REM Use PowerShell to create ZIP (available on Windows 10+)
powershell -nologo -noprofile -command "Add-Type -A System.IO.Compression.FileSystem; [IO.Compression.ZipFile]::CreateFromDirectory('gemini-upload-temp', 'modul-ajar-platform-gemini.zip')"

if exist modul-ajar-platform-gemini.zip (
    echo ✅ ZIP FILE CREATED SUCCESSFULLY!
    echo.
    for /f %%A in ('powershell -Command "(Get-Item modul-ajar-platform-gemini.zip).Length / 1MB | [math]::Round($_,2)"') do set SIZE=%%A
    echo 📦 File: modul-ajar-platform-gemini.zip
    echo 📊 Size: %SIZE% MB
    echo.
    echo 🚀 Ready to upload to Gemini AI!
    echo.
    echo Next steps:
    echo 1. Find file: modul-ajar-platform-gemini.zip
    echo 2. Extract it
    echo 3. Read: GEMINI_START_HERE.md
    echo 4. Follow: docs/README.md
    echo.
    
    REM Ask to cleanup
    set /p cleanup="Clean up temporary files? (y/n) "
    if /i "%cleanup%"=="y" (
        rmdir /s /q gemini-upload-temp
        echo ✅ Cleaned up!
    )
    
    echo.
    echo ✨ All done! Ready for Gemini AI!
    echo.
) else (
    echo ❌ Failed to create ZIP file
    echo Make sure you have PowerShell or 7-Zip installed
)

pause
