@echo off
REM Script de Deploy Completo - Frontend + Backend (Windows)
REM Uso: deploy-completo.bat

echo.
echo ========================================
echo 🚀 Deploy Automático - ControleFinanceiro
echo ========================================
echo.

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js não encontrado! Instale em: https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js encontrado!
echo.

REM Menu de opções
echo 🤔 Escolha a plataforma para o backend:
echo 1) Railway (Recomendado - $5 grátis/mês)
echo 2) Render (Gratuito com limitações)  
echo 3) Já tenho a URL do backend
echo.
set /p choice="Escolha (1-3): "

if "%choice%"=="1" goto railway
if "%choice%"=="2" goto render
if "%choice%"=="3" goto manual
echo ❌ Opção inválida!
pause
exit /b 1

:railway
echo.
echo 🚂 Configurando Railway...
echo.
echo 📝 Instruções:
echo 1. Acesse: https://railway.app
echo 2. Clique em "Start a New Project"
echo 3. Escolha "Deploy from GitHub repo"
echo 4. Selecione seu repositório
echo 5. Adicione MySQL e Redis (New -^> Database)
echo 6. Copie a URL gerada
echo.
set /p BACKEND_URL="Digite a URL do backend gerada pelo Railway: "
goto update

:render
echo.
echo 🎨 Configurando Render...
echo.
echo 📝 Instruções:
echo 1. Acesse: https://render.com
echo 2. Crie um novo Web Service
echo 3. Conecte seu repositório GitHub
echo 4. Configure e faça deploy
echo 5. Copie a URL gerada
echo.
set /p BACKEND_URL="Digite a URL do backend gerada pelo Render: "
goto update

:manual
echo.
set /p BACKEND_URL="Digite a URL do backend: "
goto update

:update
REM Validar URL
if "%BACKEND_URL%"=="" (
    echo ❌ Erro: URL do backend não fornecida!
    pause
    exit /b 1
)

REM Adicionar https:// se não tiver
echo %BACKEND_URL% | findstr /i "^http" >nul
if %ERRORLEVEL% NEQ 0 (
    set BACKEND_URL=https://%BACKEND_URL%
)

echo.
echo ✅ URL do backend: %BACKEND_URL%
echo.

REM Atualizar URL da API
echo 🔧 Atualizando URL da API no frontend...
node update-api-url.js "%BACKEND_URL%"

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao atualizar URL da API!
    pause
    exit /b 1
)

echo.
echo 📤 Fazendo deploy do frontend no Firebase...
call firebase deploy --only hosting

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao fazer deploy do frontend!
    pause
    exit /b 1
)

echo.
echo ========================================
echo 🎉 Deploy Completo!
echo ========================================
echo.
echo ✅ Frontend: https://financial-control1.web.app
echo ✅ Backend: %BACKEND_URL%
echo.
echo 🧪 Teste agora:
echo 1. Acesse: https://financial-control1.web.app
echo 2. Faça login/cadastro
echo 3. Teste todas as funcionalidades
echo.
echo 📊 Monitoramento:
echo - Firebase Console: https://console.firebase.google.com/project/financial-control1
echo - Backend API Docs: %BACKEND_URL%/api/docs
echo.
echo 🎊 Parabéns! Seu sistema está 100%% online!
echo.
pause
