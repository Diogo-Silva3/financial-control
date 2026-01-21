#!/bin/bash

# Script de Deploy Completo - Frontend + Backend
# Uso: ./deploy-completo.sh

echo "🚀 Deploy Automático - ControleFinanceiro"
echo "=========================================="
echo ""

# Verificar se Railway CLI está instalado
if ! command -v railway &> /dev/null; then
    echo "📦 Instalando Railway CLI..."
    npm install -g @railway/cli
fi

# Verificar se Firebase CLI está instalado
if ! command -v firebase &> /dev/null; then
    echo "📦 Instalando Firebase CLI..."
    npm install -g firebase-tools
fi

echo "✅ Ferramentas instaladas!"
echo ""

# Perguntar qual plataforma usar
echo "🤔 Escolha a plataforma para o backend:"
echo "1) Railway (Recomendado - $5 grátis/mês)"
echo "2) Render (Gratuito com limitações)"
echo "3) Já tenho a URL do backend"
echo ""
read -p "Escolha (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🚂 Configurando Railway..."
        echo ""
        
        # Login no Railway
        railway login
        
        # Inicializar projeto
        railway init
        
        # Deploy
        echo ""
        echo "📤 Fazendo deploy do backend..."
        railway up
        
        # Obter URL
        echo ""
        echo "🔗 Obtendo URL do backend..."
        BACKEND_URL=$(railway domain)
        
        if [ -z "$BACKEND_URL" ]; then
            echo "⚠️  Não foi possível obter a URL automaticamente."
            read -p "Digite a URL do backend: " BACKEND_URL
        fi
        ;;
        
    2)
        echo ""
        echo "🎨 Para usar o Render:"
        echo "1. Acesse: https://render.com"
        echo "2. Crie um novo Web Service"
        echo "3. Conecte seu repositório GitHub"
        echo "4. Configure e faça deploy"
        echo ""
        read -p "Digite a URL do backend gerada pelo Render: " BACKEND_URL
        ;;
        
    3)
        echo ""
        read -p "Digite a URL do backend: " BACKEND_URL
        ;;
        
    *)
        echo "❌ Opção inválida!"
        exit 1
        ;;
esac

# Validar URL
if [ -z "$BACKEND_URL" ]; then
    echo "❌ Erro: URL do backend não fornecida!"
    exit 1
fi

# Remover http:// ou https:// se o usuário não incluiu
if [[ ! $BACKEND_URL =~ ^https?:// ]]; then
    BACKEND_URL="https://$BACKEND_URL"
fi

echo ""
echo "✅ URL do backend: $BACKEND_URL"
echo ""

# Atualizar URL da API no frontend
echo "🔧 Atualizando URL da API no frontend..."
node update-api-url.js "$BACKEND_URL"

if [ $? -ne 0 ]; then
    echo "❌ Erro ao atualizar URL da API!"
    exit 1
fi

echo ""
echo "📤 Fazendo deploy do frontend no Firebase..."
firebase deploy --only hosting

if [ $? -ne 0 ]; then
    echo "❌ Erro ao fazer deploy do frontend!"
    exit 1
fi

echo ""
echo "=========================================="
echo "🎉 Deploy Completo!"
echo "=========================================="
echo ""
echo "✅ Frontend: https://financial-control1.web.app"
echo "✅ Backend: $BACKEND_URL"
echo ""
echo "🧪 Teste agora:"
echo "1. Acesse: https://financial-control1.web.app"
echo "2. Faça login/cadastro"
echo "3. Teste todas as funcionalidades"
echo ""
echo "📊 Monitoramento:"
echo "- Firebase Console: https://console.firebase.google.com/project/financial-control1"
echo "- Backend API Docs: $BACKEND_URL/api/docs"
echo ""
echo "🎊 Parabéns! Seu sistema está 100% online!"
echo ""
