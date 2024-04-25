@echo off

echo Waking up Docker daemon and Docker Desktop...
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
timeout /t 10 > nul

REM Check if the Docker Compose database is already running
docker-compose ps -q db > nul
if %errorlevel% equ 0 (
    echo Stopping and removing existing Docker Compose database...
    docker-compose -f "docker-compose-DB.yml" down
)

REM Start the Docker Compose database
docker-compose -f "docker-compose-DB.yml" up -d db

REM Wait for the database to start
echo Waiting for the database to start...
:loop

REM run the init script
cd ./server
npm run init