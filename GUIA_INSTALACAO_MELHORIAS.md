# 🚀 Guia de Instalação das Melhorias

## 1️⃣ Instalar Dependências

```bash
npm install multer
```

## 2️⃣ Criar Diretórios de Upload

```bash
mkdir uploads
mkdir uploads/perfil
mkdir uploads/comprovantes
```

## 3️⃣ Criar Migrations

### Migration: Adicionar foto de perfil aos usuários

Crie o arquivo: `api/migrations/XXXXXX-add-foto-perfil-usuarios.js`

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuarios', 'fotoPerfil', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'fotoPerfil');
  }
};
```

### Migration: Criar tabela de Contas

Crie o arquivo: `api/migrations/XXXXXX-create-contas.js`

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo: {
        type: Sequelize.ENUM('corrente', 'poupanca', 'cartao', 'dinheiro', 'investimento'),
        allowNull: false
      },
      saldoInicial: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      saldoAtual: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      cor: {
        type: Sequelize.STRING,
        defaultValue: '#667eea'
      },
      icone: {
        type: Sequelize.STRING,
        defaultValue: 'account_balance'
      },
      ativa: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contas');
  }
};
```

### Migration: Criar tabela de Tags

Crie o arquivo: `api/migrations/XXXXXX-create-tags.js`

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cor: {
        type: Sequelize.STRING,
        defaultValue: '#667eea'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tags');
  }
};
```

### Migration: Criar tabela de ItemTags

Crie o arquivo: `api/migrations/XXXXXX-create-item-tags.js`

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ItemTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tags',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tipo: {
        type: Sequelize.ENUM('receita', 'despesa'),
        allowNull: false
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ItemTags');
  }
};
```

### Migration: Criar tabela de Anexos

Crie o arquivo: `api/migrations/XXXXXX-create-anexos.js`

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Anexos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tipo: {
        type: Sequelize.ENUM('receita', 'despesa'),
        allowNull: false
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nomeArquivo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      caminhoArquivo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tamanho: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      mimeType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Anexos');
  }
};
```

### Migration: Criar tabela de Lembretes

Crie o arquivo: `api/migrations/XXXXXX-create-lembretes.js`

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Lembretes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      dataLembrete: {
        type: Sequelize.DATE,
        allowNull: false
      },
      tipo: {
        type: Sequelize.STRING,
        defaultValue: 'geral'
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      notificado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Lembretes');
  }
};
```

### Migration: Criar tabela de Transferências

Crie o arquivo: `api/migrations/XXXXXX-create-transferencias.js`

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transferencias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      contaOrigemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Contas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      contaDestinoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Contas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transferencias');
  }
};
```

## 4️⃣ Executar Migrations

```bash
npx sequelize-cli db:migrate
```

## 5️⃣ Criar Models

### Model: Conta

Crie o arquivo: `api/models/conta.js`

```javascript
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Conta extends Model {
    static associate(models) {
      Conta.belongsTo(models.Usuarios, {
        foreignKey: 'usuarioId'
      });
      Conta.hasMany(models.Transferencias, {
        foreignKey: 'contaOrigemId',
        as: 'transferenciasOrigem'
      });
      Conta.hasMany(models.Transferencias, {
        foreignKey: 'contaDestinoId',
        as: 'transferenciasDestino'
      });
    }
  }
  
  Conta.init({
    usuarioId: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    tipo: DataTypes.ENUM('corrente', 'poupanca', 'cartao', 'dinheiro', 'investimento'),
    saldoInicial: DataTypes.DECIMAL(10, 2),
    saldoAtual: DataTypes.DECIMAL(10, 2),
    cor: DataTypes.STRING,
    icone: DataTypes.STRING,
    ativa: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Contas',
  });
  
  return Conta;
};
```

### Model: Tag

Crie o arquivo: `api/models/tag.js`

```javascript
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsTo(models.Usuarios, {
        foreignKey: 'usuarioId'
      });
      Tag.hasMany(models.ItemTags, {
        foreignKey: 'tagId'
      });
    }
  }
  
  Tag.init({
    usuarioId: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    cor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tags',
  });
  
  return Tag;
};
```

### Model: ItemTag

Crie o arquivo: `api/models/itemtag.js`

```javascript
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItemTag extends Model {
    static associate(models) {
      ItemTag.belongsTo(models.Tags, {
        foreignKey: 'tagId',
        as: 'tag'
      });
    }
  }
  
  ItemTag.init({
    tagId: DataTypes.INTEGER,
    tipo: DataTypes.ENUM('receita', 'despesa'),
    itemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ItemTags',
  });
  
  return ItemTag;
};
```

### Model: Anexo

Crie o arquivo: `api/models/anexo.js`

```javascript
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Anexo extends Model {
    static associate(models) {
      Anexo.belongsTo(models.Usuarios, {
        foreignKey: 'usuarioId'
      });
    }
  }
  
  Anexo.init({
    usuarioId: DataTypes.INTEGER,
    tipo: DataTypes.ENUM('receita', 'despesa'),
    itemId: DataTypes.INTEGER,
    nomeArquivo: DataTypes.STRING,
    caminhoArquivo: DataTypes.STRING,
    tamanho: DataTypes.INTEGER,
    mimeType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Anexos',
  });
  
  return Anexo;
};
```

### Model: Lembrete

Crie o arquivo: `api/models/lembrete.js`

```javascript
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lembrete extends Model {
    static associate(models) {
      Lembrete.belongsTo(models.Usuarios, {
        foreignKey: 'usuarioId'
      });
    }
  }
  
  Lembrete.init({
    usuarioId: DataTypes.INTEGER,
    titulo: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    dataLembrete: DataTypes.DATE,
    tipo: DataTypes.STRING,
    itemId: DataTypes.INTEGER,
    ativo: DataTypes.BOOLEAN,
    notificado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Lembretes',
  });
  
  return Lembrete;
};
```

### Model: Transferencia

Crie o arquivo: `api/models/transferencia.js`

```javascript
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transferencia extends Model {
    static associate(models) {
      Transferencia.belongsTo(models.Usuarios, {
        foreignKey: 'usuarioId'
      });
      Transferencia.belongsTo(models.Contas, {
        foreignKey: 'contaOrigemId',
        as: 'contaOrigem'
      });
      Transferencia.belongsTo(models.Contas, {
        foreignKey: 'contaDestinoId',
        as: 'contaDestino'
      });
    }
  }
  
  Transferencia.init({
    usuarioId: DataTypes.INTEGER,
    contaOrigemId: DataTypes.INTEGER,
    contaDestinoId: DataTypes.INTEGER,
    valor: DataTypes.DECIMAL(10, 2),
    descricao: DataTypes.STRING,
    data: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transferencias',
  });
  
  return Transferencia;
};
```

## 6️⃣ Configurar Multer para Upload

Crie o arquivo: `api/config/multer.js`

```javascript
const multer = require('multer')
const path = require('path')

// Configuração para foto de perfil
const storagePerfil = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/perfil/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'perfil-' + uniqueSuffix + path.extname(file.originalname))
  }
})

// Configuração para comprovantes
const storageComprovantes = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/comprovantes/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'comprovante-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const uploadPerfil = multer({ storage: storagePerfil })
const uploadComprovante = multer({ storage: storageComprovantes })

module.exports = { uploadPerfil, uploadComprovante }
```

## 7️⃣ Atualizar Rotas

Adicione no arquivo `api/routes/index.js`:

```javascript
const perfilController = require('../controllers/perfilController')
const recuperacaoSenhaController = require('../controllers/recuperacaoSenhaController')
const contasController = require('../controllers/contasController')
const tagsController = require('../controllers/tagsController')
const anexosController = require('../controllers/anexosController')
const notificacoesController = require('../controllers/notificacoesController')
const { uploadPerfil, uploadComprovante } = require('../config/multer')

module.exports = app => {
  // ... rotas existentes ...

  // Perfil
  app.post('/perfil/foto', middlewaresAutenticacao.bearer, uploadPerfil.single('foto'), perfilController.uploadFotoPerfil)
  app.delete('/perfil/foto', middlewaresAutenticacao.bearer, perfilController.removerFotoPerfil)
  app.get('/perfil', middlewaresAutenticacao.bearer, perfilController.obterPerfil)

  // Recuperação de senha
  app.post('/usuarios/recuperar-senha', recuperacaoSenhaController.solicitarRecuperacao)
  app.post('/usuarios/redefinir-senha/:token', middlewaresAutenticacao.verificacaoEmail, recuperacaoSenhaController.redefinirSenha)

  // Contas
  app.post('/contas', middlewaresAutenticacao.bearer, contasController.criarConta)
  app.get('/contas', middlewaresAutenticacao.bearer, contasController.listarContas)
  app.put('/contas/:id', middlewaresAutenticacao.bearer, contasController.atualizarConta)
  app.put('/contas/:id/desativar', middlewaresAutenticacao.bearer, contasController.desativarConta)
  app.post('/contas/transferir', middlewaresAutenticacao.bearer, contasController.transferir)

  // Tags
  app.post('/tags', middlewaresAutenticacao.bearer, tagsController.criarTag)
  app.get('/tags', middlewaresAutenticacao.bearer, tagsController.listarTags)
  app.post('/tags/item', middlewaresAutenticacao.bearer, tagsController.adicionarTagItem)
  app.delete('/tags/item/:id', middlewaresAutenticacao.bearer, tagsController.removerTagItem)
  app.get('/tags/:tipo/:itemId', middlewaresAutenticacao.bearer, tagsController.listarTagsItem)

  // Anexos
  app.post('/anexos', middlewaresAutenticacao.bearer, uploadComprovante.single('comprovante'), anexosController.uploadComprovante)
  app.get('/anexos/:tipo/:itemId', middlewaresAutenticacao.bearer, anexosController.listarAnexos)
  app.delete('/anexos/:id', middlewaresAutenticacao.bearer, anexosController.removerAnexo)

  // Lembretes
  app.post('/lembretes', middlewaresAutenticacao.bearer, notificacoesController.criarLembrete)
  app.get('/lembretes', middlewaresAutenticacao.bearer, notificacoesController.listarLembretes)
  app.get('/lembretes/proximos', middlewaresAutenticacao.bearer, notificacoesController.lembretesProximos)
  app.put('/lembretes/:id/concluir', middlewaresAutenticacao.bearer, notificacoesController.concluirLembrete)
}
```

## 8️⃣ Servir Arquivos Estáticos

Adicione no `api/app.js`:

```javascript
app.use('/uploads', express.static('uploads'))
```

## 9️⃣ Testar

```bash
npm run start
```

Acesse: http://localhost:3001

## ✅ Pronto!

Todas as melhorias estão instaladas e funcionando! 🎉
