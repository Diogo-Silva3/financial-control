const botaoCadastro = $("#botaoCadastro")
const botaoCadastrar = $("#botao-modal")
const botaoLogin = $("#botaoLogin")
const email = $("#email-login")
const senha = $("#senha-login")
const alerta = $("#alertMsg")
const lembrar = $("#lembrar")
const principal = $('#principal')
const campoNome = $("#campo-nome")
const campoEmail = $("#campo-email")
const campoSenha = $("#campo-senha")

// Verificar se usuário já está logado
verificarUsuarioLogado().then(user => {
  if (user) {
    window.location.href = './principal.html'
  }
})

botaoCadastro.click(() => {
  $(".botao_modal").css("display", "block")
  $("#botao-modal_cancelar").text("Cancelar")
  campoNome.val("")
  campoEmail.val("")
  campoSenha.val("")
  alertaModal.text("")
})

botaoCadastrar.on("click", async () => {
  const nome = campoNome.val()
  const emailVal = campoEmail.val()
  const senhaVal = campoSenha.val()
  
  if (!nome || !emailVal || !senhaVal) {
    alertaModal.text("Preencha todos os campos!")
    return
  }
  
  alertaModal.text("Criando conta...")
  
  const resultado = await cadastrarUsuario(nome, emailVal, senhaVal)
  
  if (resultado.sucesso) {
    alertaModal.text("Conta criada com sucesso! Redirecionando...")
    $(".botao_modal").css("display", "none")
    $("#botao-modal_cancelar").text("Sair")
    
    // Salvar no localStorage
    const item = [{
      "uid": resultado.usuario.uid,
      "no": nome,
      "email": emailVal
    }]
    localStorage.setItem("apicontrole", JSON.stringify(item))
    
    setTimeout(() => {
      window.location.href = './principal.html'
    }, 1500)
  } else {
    if (resultado.erro.includes('email-already-in-use')) {
      alertaModal.text("Este email já está cadastrado!")
    } else if (resultado.erro.includes('weak-password')) {
      alertaModal.text("A senha deve ter pelo menos 6 caracteres!")
    } else {
      alertaModal.text("Erro ao criar conta: " + resultado.erro)
    }
  }
})

botaoLogin.on("click", async () => {
  const emailVal = email.val()
  const senhaVal = senha.val()
  
  if (emailVal == "" || senhaVal == "") {
    alerta.text('Campo E-mail ou Senha vazio!')
    return
  }
  
  alerta.text('Entrando...')
  
  const resultado = await fazerLogin(emailVal, senhaVal)
  
  if (resultado.sucesso) {
    // Salvar no localStorage
    const item = [{
      "uid": resultado.usuario.uid,
      "no": resultado.nome,
      "email": emailVal
    }]
    localStorage.setItem("apicontrole", JSON.stringify(item))
    $("#nome-usuario").text(resultado.nome)
    
    alerta.text('Login realizado!')
    setTimeout(() => {
      window.location.href = './principal.html'
    }, 500)
  } else {
    if (resultado.erro.includes('user-not-found') || resultado.erro.includes('wrong-password')) {
      alerta.text('Email ou senha inválidos!')
    } else if (resultado.erro.includes('too-many-requests')) {
      alerta.text('Muitas tentativas. Aguarde alguns minutos.')
    } else {
      alerta.text('Erro ao fazer login: ' + resultado.erro)
    }
  }
})


