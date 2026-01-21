# 💰 Controle Financeiro v2.0

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Status](https://img.shields.io/badge/status-online-green)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![License](https://img.shields.io/badge/license-ISC-yellow)

**Sistema completo de gestão financeira pessoal com IA, gamificação e múltiplas contas**

---

## 🌟 Novidades da Versão 2.0

### ✨ 25+ Novas Funcionalidades

- 🔐 **Segurança Avançada**: Recuperação de senha, 2FA, foto de perfil
- 💳 **Múltiplas Contas**: Gerencie Corrente, Poupança, Cartão e mais
- 🏷️ **Tags Personalizadas**: Organize com tags coloridas
- 📎 **Comprovantes Digitais**: Anexe fotos e PDFs
- 🔔 **Lembretes Inteligentes**: Nunca esqueça uma conta
- 🤖 **IA Integrada**: Insights automáticos e previsões
- 🏆 **Gamificação**: 6 conquistas desbloqueáveis
- 🎨 **6 Temas**: Personalize a interface
- 📥 **Importar CSV**: Importe extratos em lote
- 📤 **Exportar PDF**: Gere relatórios profissionais

---

## 🚀 Início Rápido

### 1. Acessar
```
http://localhost:3000
```

### 2. Login
Use suas credenciais ou crie uma nova conta

### 3. Explorar
- Clique em "Ferramentas" para ver as novas funcionalidades
- Teste os 6 temas diferentes
- Configure suas múltiplas contas
- Defina metas e limites
- Veja insights inteligentes

---

## 📊 Funcionalidades Principais

### 🔐 Segurança & Conta
- ✅ Recuperação de senha por email
- ✅ Upload de foto de perfil (5MB máx)
- ✅ Autenticação em dois fatores (2FA)
- ✅ Sistema de tokens JWT avançado

### 💳 Gestão Financeira
- ✅ Múltiplas contas (Corrente, Poupança, Cartão, Dinheiro, Investimento)
- ✅ Transferências entre contas
- ✅ Tags personalizadas coloridas
- ✅ Anexar comprovantes (10MB máx)
- ✅ Lembretes com notificações

### 📊 Análises & Relatórios
- ✅ Insights inteligentes com IA
- ✅ Previsão de gastos (próximo mês)
- ✅ Análise de tendências (6 meses)
- ✅ Relatório anual completo
- ✅ Comparação com média nacional
- ✅ Ranking de categorias

### 🎨 Interface & UX
- ✅ 6 temas de cores (Padrão, Oceano, Floresta, Sunset, Roxo, Minimalista)
- ✅ Animações suaves e elaboradas
- ✅ Interface 100% responsiva
- ✅ Ícones Material Symbols

### 🎮 Gamificação
- ✅ 6 conquistas desbloqueáveis
- ✅ Sistema de metas com progresso visual
- ✅ Alertas de limite (75% e 90%)
- ✅ Notificações animadas

### 🔧 Automação
- ✅ Importar extrato bancário (CSV)
- ✅ Exportar relatório (PDF)
- ✅ Busca por texto completo

---

## 🛠️ Tecnologias

### Backend
- Node.js + Express
- Sequelize ORM
- MySQL
- Redis
- JWT
- Multer
- Nodemailer
- Passport

### Frontend
- HTML5 + CSS3
- JavaScript (ES6+)
- Bootstrap 5
- jQuery
- Chart.js
- jsPDF

---

## 📦 Instalação

### 1. Clonar Repositório
```bash
git clone [url-do-repositorio]
cd API_Controle_Financeiro
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie o arquivo `.env`:
```env
NODE_ENV="development"
CHAVE_JWT="sua-chave-secreta"
BASE_URL="localhost:3000"
EMAIL_HOST=""
EMAIL_USUARIO=""
EMAIL_SENHA=""
```

### 4. Configurar Banco de Dados
Edite `api/config/config.json` com suas credenciais MySQL

### 5. Criar Schema
```sql
CREATE SCHEMA `control_financeiro`;
```

### 6. Executar Migrations
```bash
npx sequelize-cli db:migrate
```

### 7. Executar Seeders
```bash
npx sequelize-cli db:seed:all
```

### 8. Criar Diretórios de Upload
```bash
mkdir uploads\perfil
mkdir uploads\comprovantes
```

### 9. Iniciar Servidor
```bash
npm run start
```

### 10. Acessar
```
http://localhost:3000
```

---

## 📚 Documentação Completa

### Para Usuários
- [INICIO_RAPIDO.md](INICIO_RAPIDO.md) - Guia de início rápido
- [VISUAL_MELHORIAS.md](VISUAL_MELHORIAS.md) - Guia visual das funcionalidades

### Para Desenvolvedores
- [MELHORIAS_IMPLEMENTADAS.md](MELHORIAS_IMPLEMENTADAS.md) - Documentação técnica completa
- [GUIA_INSTALACAO_MELHORIAS.md](GUIA_INSTALACAO_MELHORIAS.md) - Guia de instalação detalhado
- [TESTE_MELHORIAS.md](TESTE_MELHORIAS.md) - Guia de testes

### Geral
- [RESUMO_INSTALACAO.md](RESUMO_INSTALACAO.md) - Resumo executivo
- [CHANGELOG_MELHORIAS.md](CHANGELOG_MELHORIAS.md) - Histórico de mudanças
- [INDICE_DOCUMENTACAO.md](INDICE_DOCUMENTACAO.md) - Índice completo
- [CONCLUSAO.md](CONCLUSAO.md) - Conclusão do projeto

---

## 🔌 API Endpoints

### Autenticação
```
POST   /usuarios/login              # Login
POST   /usuarios                    # Criar conta
GET    /usuarios/logout             # Logout
POST   /usuarios/recuperar-senha    # Recuperar senha
```

### Perfil
```
GET    /perfil                      # Obter perfil
POST   /perfil/foto                 # Upload foto
DELETE /perfil/foto                 # Remover foto
```

### Contas
```
POST   /contas                      # Criar conta
GET    /contas                      # Listar contas
PUT    /contas/:id                  # Atualizar conta
POST   /contas/transferir           # Transferir
```

### Transações
```
POST   /receitas                    # Criar receita
GET    /receitas                    # Listar receitas
POST   /despesas                    # Criar despesa
GET    /despesas                    # Listar despesas
```

### Tags
```
POST   /tags                        # Criar tag
GET    /tags                        # Listar tags
POST   /tags/item                   # Adicionar tag
```

### Anexos
```
POST   /anexos                      # Upload comprovante
GET    /anexos/:tipo/:itemId        # Listar anexos
DELETE /anexos/:id                  # Remover anexo
```

### Lembretes
```
POST   /lembretes                   # Criar lembrete
GET    /lembretes                   # Listar lembretes
GET    /lembretes/proximos          # Próximos 7 dias
```

### Relatórios
```
GET    /relatorio                   # Listar relatórios
GET    /relatorio/:mes/:ano         # Relatório específico
```

---

## 🎨 Temas Disponíveis

1. **Padrão** - Gradient roxo/azul (#667eea → #764ba2)
2. **Oceano** - Tons de azul (#0077be → #00a8e8)
3. **Floresta** - Tons de verde (#2d6a4f → #52b788)
4. **Pôr do Sol** - Vermelho/amarelo (#ff6b6b → #feca57)
5. **Roxo Real** - Roxo vibrante (#6c5ce7 → #a29bfe)
6. **Minimalista** - Tons claros (#2c3e50 → #34495e)

**Como usar**: Ferramentas > Temas

---

## 🏆 Conquistas

1. 🏆 **Primeiro Passo** - Cadastre sua primeira receita
2. 🥈 **Controle Iniciado** - Cadastre sua primeira despesa
3. 📈 **No Azul** - Mantenha saldo positivo por 3 meses
4. 💰 **Economista** - Gaste menos que o mês anterior
5. ⭐ **Super Organizado** - Cadastre 50 transações
6. ✅ **Disciplinado** - Use o app por 30 dias seguidos

---

## 📊 Estrutura do Projeto

```
API_Controle_Financeiro/
├── api/
│   ├── config/           # Configurações
│   ├── controllers/      # Lógica de negócio
│   ├── migrations/       # Migrations do banco
│   ├── models/           # Models Sequelize
│   ├── redis/            # Configuração Redis
│   ├── routes/           # Rotas da API
│   ├── test/             # Testes
│   └── verifEmail/       # Sistema de email
├── front/
│   ├── assets/
│   │   ├── css/          # Estilos
│   │   ├── img/          # Imagens
│   │   └── js/           # Scripts
│   └── *.html            # Páginas
├── uploads/
│   ├── perfil/           # Fotos de perfil
│   └── comprovantes/     # Comprovantes
├── swagger/              # Documentação API
├── .env                  # Variáveis de ambiente
├── package.json          # Dependências
└── server.js             # Servidor principal
```

---

## 🧪 Testes

### Executar Testes
```bash
npm run test
```

### Cobertura
```bash
npm run test:coverage
```

### Ver Relatório
```
/coverage/lcov-report/index.html
```

---

## 🐛 Solução de Problemas

### Servidor não inicia
```bash
# Matar processo na porta 3000
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
Stop-Process -Id [PID] -Force

# Reiniciar
npm run start
```

### Erro de migration
```bash
# Reverter
npx sequelize-cli db:migrate:undo:all

# Executar novamente
npx sequelize-cli db:migrate
```

### Erro de upload
```bash
# Criar diretórios
mkdir uploads\perfil
mkdir uploads\comprovantes
```

---

## 📈 Performance

- Upload de foto: < 1s
- Importar CSV (100 transações): < 3s
- Gerar insights: < 2s
- Exportar PDF: < 1s
- Carregar dashboard: < 1s

---

## 🔒 Segurança

- ✅ Senhas criptografadas (bcrypt)
- ✅ Tokens JWT com expiração
- ✅ Validação de arquivos (tipo e tamanho)
- ✅ Sanitização de inputs
- ✅ Proteção CSRF
- ✅ CORS configurado
- ✅ Redis para gerenciar tokens

---

## 🌐 Navegadores Suportados

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 📱 Dispositivos Suportados

- Desktop (1920x1080+)
- Laptop (1366x768+)
- Tablet (768x1024+)
- Mobile (375x667+)

---

## 🔮 Roadmap

### v2.1 (Q2 2026)
- [ ] Calendário visual de despesas
- [ ] Gráficos mais interativos
- [ ] Notificações push (PWA)
- [ ] Modo offline

### v2.2 (Q3 2026)
- [ ] Controle financeiro familiar
- [ ] Compartilhamento de relatórios
- [ ] Integração com bancos
- [ ] App mobile nativo

### v3.0 (Q4 2026)
- [ ] IA avançada para previsões
- [ ] Reconhecimento de recibos (OCR)
- [ ] Assistente virtual
- [ ] Open Banking

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

ISC License

---

## 👨‍💻 Autor

**Bruno Rivolta**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/brunorivolta/)
[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://www.youtube.com/channel/UC6XJ3aQvFBU7gqHvebolwJQ)
[![Blogger](https://img.shields.io/badge/Blogger-%23FF5722.svg?logo=Blogger&logoColor=white)](https://devrivolta.blogspot.com/)
[![GitHub](https://img.shields.io/badge/GitHub-%23FFFFFF.svg?logo=GitHub&logoColor=black)](https://github.com/BrunoRivolta)

---

## 📊 Estatísticas

- **Versão**: 2.0.0
- **Funcionalidades**: 33+
- **Endpoints API**: 35+
- **Tabelas BD**: 12
- **Temas**: 6
- **Conquistas**: 6
- **Linhas de código**: 3.000+
- **Documentação**: 15.000+ linhas

---

## 🎉 Agradecimentos

Obrigado por usar o Controle Financeiro v2.0!

**Desenvolvido com ❤️ e muito ☕**

---

## 📞 Suporte

- **Documentação**: Veja os arquivos MD na raiz
- **Issues**: GitHub Issues
- **Email**: Consulte o perfil do autor

---

**Status**: ✅ Online  
**Servidor**: http://localhost:3000  
**Versão**: 2.0.0  
**Data**: 15 de Janeiro de 2026

---

**⭐ Se gostou, deixe uma estrela no GitHub!**
