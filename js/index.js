//#region Variáveis
var btnGerar     = document.querySelector("#btnGerar") // Pega o botão gerar no DOM
var btnProximo   = document.querySelector("#btnProximo") // Pega o botão gerar no DOM
var btnFinalizar = document.querySelector("#btnFinalizar") // Pega o botão gerar no DOM
var divMatriz    = document.querySelector(".div-matriz") // Pega o botão gerar no DOM

var matrizPopulada // Matriz que será manipulada nos ciclos
var ciclos         // Quantidade de ciclos
var pessoas        // Total de pessoas na matriz
var linhas         // Linhas da matriz
var contagem = 0   // Contador de ciclos
var populacao = [] // Lista das pessoas e suas posições
var taxa           // Taxa de transferência

divMatriz.setAttribute('style','display:none;')
btnProximo.setAttribute('style','display:none;')
btnFinalizar.setAttribute('style','display:none;')
//#endregion Variáveis

btnGerar.addEventListener("click", function(event) { // Evento de clique no botão
    event.preventDefault() // Evita que a página recarregue

    var form = document.querySelector("#FormGerar") // Pega o formulário

    linhas         = form.linhas.value
    pessoas        = form.populacao.value
    var infectados = form.infectados.value // Primeiros com o virus
    ciclos         = form.ciclos.value
    taxa           = form.taxa.value
    contagem       = 0
    populacao      = []

    matrizVazia = criaMatriz(linhas) // Monta matriz

    matrizPopulada = inserePopulacao(matrizVazia,pessoas,infectados) // Preenche a matriz

    geraTabela(matrizPopulada) // Exibe a tabela
    geraFooterTabela()         // Exibe botões

})

btnProximo.addEventListener("click", function(event) {
    event.preventDefault() // Evita que a página recarregue

    avancaCiclo()
})

btnFinalizar.addEventListener("click", function(event){
    event.preventDefault()

    while (contagem<ciclos) {
        avancaCiclo()
    }
})

function avancaCiclo(){

    if(!atualizaContagem()){ // Faz alterações se ainda houver ciclos

        for (let i = 0; i < populacao.length; i++) { // Para cada pessoa
    
            // Pega a posição registrada
            let l = populacao[i][0]
            let c = populacao[i][1]

            matrizPopulada[l][c].ciclos = matrizPopulada[l][c].ciclos+1
    
            if(matrizPopulada[l][c].velocidade != 0 && !matrizPopulada[l][c].morta){ // Verifica se essa pessoa está em quarentena ou se movendo e se está morta
    
                let pessoa = matrizPopulada[l][c] // Pega a pessoa
                let velocidade = pessoa.velocidade // Pega sua velocidade
                let retornoPosicao // Valida se houve retorno ao tentar mover
                let posicaoalterada // Salva a última posição movida

                while(velocidade != 0){ // Até zerar a velocidade no ciclo

                    let direcao = geraAleatorio(1,4) // 1 - top 2- right 3 - bottom 4 - left
                    if(posicaoalterada){ // Se já moveu nesse while usa a posição da última movimentação
                        retornoPosicao = movimentaPessoa(pessoa,direcao,posicaoalterada[0],posicaoalterada[1])
                    }else{ // senão usa a posição na lista de pessoas
                        retornoPosicao = movimentaPessoa(pessoa,direcao,l,c)
                    }

                    if(retornoPosicao){ // Se foi possível mover

                        if(posicaoalterada){ // Se já houve movimento
                            matrizPopulada[posicaoalterada[0]][posicaoalterada[1]] = null
                        }else{
                            matrizPopulada[l][c] = null // Limpa a posição dela
                        }
    
                        // Atualiza a posição na população
                        populacao[i][0] = retornoPosicao[0]
                        populacao[i][1] = retornoPosicao[1]

                        // Registra a última posição alterada nessa pessoa
                        posicaoalterada = retornoPosicao
                    }
    
                    validaColisoes(retornoPosicao ? retornoPosicao : posicaoalterada ? posicaoalterada : [l,c])
    
                    velocidade--
                }

            }

            if(matrizPopulada[populacao[i][0]][populacao[i][1]].infectada){ // Possibilidade de morte
                if(matrizPopulada[populacao[i][0]][populacao[i][1]].idade >= 60){ // se for idoso a chance de morte é maior
                    if(geraAleatorio(0,100) <= 15){
                        matrizPopulada[populacao[i][0]][populacao[i][1]].infectada = null
                        matrizPopulada[populacao[i][0]][populacao[i][1]].morta = true
                    }
                }else{
                    if(geraAleatorio(0,100) <= 5){
                        matrizPopulada[populacao[i][0]][populacao[i][1]].infectada = null
                        matrizPopulada[populacao[i][0]][populacao[i][1]].morta = true
                    }
                }
            }

            if(matrizPopulada[populacao[i][0]][populacao[i][1]].infectada && !matrizPopulada[populacao[i][0]][populacao[i][1]].morta){ // Possibilidade de Cura
                if(matrizPopulada[populacao[i][0]][populacao[i][1]].ciclos >= 3){
                    matrizPopulada[populacao[i][0]][populacao[i][1]].infectada = null
                    matrizPopulada[populacao[i][0]][populacao[i][1]].curada = true
                }
            }

        }

        geraTabela(matrizPopulada)

    }

}

function validaColisoes(posicaoAtual){

    let l = parseInt(posicaoAtual[0],10)
    let c = parseInt(posicaoAtual[1],10)
    let pessoa = matrizPopulada[l][c]

    if(l > 0 && matrizPopulada[l-1][c]){ // Cima

        let pessoaCima = matrizPopulada[l-1][c]

        if(pessoaCima.morta){ // Se a pessoa está morta
            return
        }else if(pessoaCima.infectada && !pessoa.infectada){ // Se a pessoa está infectada e o atual não
            if(geraAleatorio(0,100) <= taxa){ // Se o número aleatório estiver dentro da % da taxa
                matrizPopulada[l][c].infectada = true
            }
        }else if(!pessoaCima.infectada && pessoa.infectada){ // Se o atual estiver infectado e a pessoa não
            if(geraAleatorio(0,100) <= taxa){ // Se o número aleatório estiver dentro da % da taxa
                matrizPopulada[l-1][c].infectada = true
            }
        }
    }

    if(c < linhas-1 && matrizPopulada[l][c+1]){ // Direita

        let pessoaDireita = matrizPopulada[l][c+1]

        if(pessoaDireita.morta){ // Se a pessoa está morta
            return
        }else if(pessoaDireita.infectada && !pessoa.infectada){ // Se a pessoa está infectada e o atual não
            if(geraAleatorio(0,100) <= taxa){ // Se o número aleatório estiver dentro da % da taxa
                matrizPopulada[l][c].infectada = true
            }
        }else if(!pessoaDireita.infectada && pessoa.infectada){ // Se o atual estiver infectado e a pessoa não
            if(geraAleatorio(0,100) <= taxa){ // Se o número aleatório estiver dentro da % da taxa
                matrizPopulada[l][c+1].infectada = true
            }
        }
    }

    if(l < linhas-1 && matrizPopulada[l+1][c]){ // Baixo

        let pessoaBaixo = matrizPopulada[l+1][c]

        if(pessoaBaixo.morta){ // Se a pessoa está morta
            return
        }else if(pessoaBaixo.infectada && !pessoa.infectada){ // Se a pessoa está infectada e o atual não
            if(geraAleatorio(0,100) <= taxa){ // Se o número aleatório estiver dentro da % da taxa
                matrizPopulada[l][c].infectada = true
            }
        }else if(!pessoaBaixo.infectada && pessoa.infectada){ // Se o atual estiver infectado e a pessoa não
            if(geraAleatorio(0,100) <= taxa){ // Se o número aleatório estiver dentro da % da taxa
                matrizPopulada[l+1][c].infectada = true
            }
        }
    }

    if(c > 0 && matrizPopulada[l][c-1]){ // Esquerda

        let pessoaEsquerda = matrizPopulada[l][c-1]

        if(pessoaEsquerda.morta){ // Se a pessoa está morta
            return
        }else if(pessoaEsquerda.infectada && !pessoa.infectada){ // Se a pessoa está infectada e o atual não
            if(geraAleatorio(0,100) <= taxa){ // Se o número aleatório estiver dentro da % da taxa
                matrizPopulada[l][c].infectada = true
            }
        }else if(!pessoaEsquerda.infectada && pessoa.infectada){ // Se o atual estiver infectado e a pessoa não
            if(geraAleatorio(0,100) <= taxa){ // Se o número aleatório estiver dentro da % da taxa
                matrizPopulada[l][c-1].infectada = true
            }
        }
    }

}

function movimentaPessoa(pessoa,direcao,linha,coluna){

    switch (parseInt(direcao,10)) {
        case 1: // Cima
            let c = parseInt(linha,10)-1
            if(linha > 0 && !matrizPopulada[c][coluna]){
                matrizPopulada[c][coluna] = pessoa
                return [c,coluna]
            }
        break
        case 2: // Direita
            let d = parseInt(coluna,10)+1
            if(coluna < (linhas-1) && !matrizPopulada[linha][d]){
                matrizPopulada[linha][d] = pessoa
                return [linha,d]
            }
        break
        case 3: // Baixo
        let b = parseInt(linha,10)+1
            if(linha < (linhas-1) && !matrizPopulada[b][coluna]){
                matrizPopulada[b][coluna] = pessoa
                return [b,coluna]
            }
        break
        case 4: // Esquerda
            let e = parseInt(coluna,10)-1
            if(coluna > 0 && !matrizPopulada[linha][e]){
                matrizPopulada[linha][e] = pessoa
                return [linha,e]
            }
        break
    }

    return false // Caso não movimente tenta novamente

}

function criaMatriz(linhas){ // Monta a matriz vazia

    var matriz = new Array()

    for (let l = 0; l < linhas; l++) {
        let col = new Array()
        for (let c = 0; c < linhas; c++) {
            col.push(null)
        }
        matriz.push(col)
    }

    return matriz
}

function criaPessoa(infectada){ // Cria as pessoa para inserir na matriz
    let pessoa = new Pessoa() // Cria o objeto
    pessoa.idade = (Math.random() * 100).toFixed(0) // Insere uma idade de 0 a 100 aleatória
    pessoa.velocidade = Math.random() > 0.5 ? (Math.random()*10).toFixed(0) : 0 // 50% parados 50% em movimento
    pessoa.infectada = infectada ? infectada : false
    pessoa.ciclos = 0

    return pessoa
}

function inserePopulacao(matriz,pessoas,infectados){ // Preenche a matriz

    let matrizInfectados = plotaInfectados(infectados,matriz)
    let matrizPopul   = plotaSaudaveis((pessoas-infectados),matrizInfectados)

    return matrizPopul
}

function plotaInfectados(infectados,matriz){ // Plota os infectados na matriz

    for (let i = 0; i < infectados; i++) {
        let plotou = false
        while (!plotou) {
            
            let linha  = geraAleatorio(0,matriz.length-1)
            let coluna = geraAleatorio(0,matriz.length-1)

            if(matriz[linha][coluna] == null){
                matriz[linha][coluna] = criaPessoa(true)
                populacao.push([linha,coluna])
                plotou = true
            }

        }
    }

    return matriz
}

function plotaSaudaveis(pessoas,matriz){ // Plota os infectados na matriz

    for (let i = 0; i < pessoas; i++) {
        let plotou = false
        while (!plotou) {
            
            let linha  = geraAleatorio(0,matriz.length-1)
            let coluna = geraAleatorio(0,matriz.length-1)

            if(matriz[linha][coluna] == null){
                matriz[linha][coluna] = criaPessoa()
                populacao.push([linha,coluna])
                plotou = true
            }

        }
    }

    return matriz
}

function geraTabela(matriz){ // Gera a matriz no HTML

    divMatriz.setAttribute('style','display:block;')

    var tabela = document.querySelector("#matriz") // Pega a tabela no HTML

    limpaTabela(tabela)

    for (let l = 0; l < matriz.length; l++) {
        
        var tabelaTr = document.createElement("tr") // Cria a linha da tabela

        for (let c = 0; c < matriz.length; c++) {

            tabelaTr.appendChild(criaPessoaTD(matriz[l][c])) // Insere a célula na linha

        }

        tabela.appendChild(tabelaTr) // Insere a linha na tabela

    }

}

function geraFooterTabela(){ // Cria botões e contador

    // Exibe os botões
    btnProximo.setAttribute('style','display:block;')
    btnFinalizar.setAttribute('style','display:block;')

    btnProximo.textContent = "Próximo Ciclo"
    btnProximo.classList.add("col-6")
    btnProximo.classList.add("btn")
    btnProximo.classList.add("btn-primary") // Classe Bootstrap

    btnFinalizar.textContent = "Finalizar Ciclo"
    btnFinalizar.classList.add("btnFinalizar")
    btnFinalizar.classList.add("col-6")
    btnFinalizar.classList.add("btn")
    btnFinalizar.classList.add("btn-success") // Classe Bootstrap

    atualizaContagem()

}

function atualizaContagem(){ // Atualiza contador no HTML

    let ultimociclo = true
    if(contagem < ciclos){

        contagem++
        var cont = document.querySelector(".contagem")
        cont.textContent = ` ${contagem}/ ${ciclos}`
        ultimociclo = false

    }

    return ultimociclo

}

function criaPessoaTD(pessoaTD){ // Cria célula com ícone

    let tabelaTd = document.createElement("td") // Cria célula

    if(pessoaTD != null){ // Se houver uma pessoa nessa célula

        let pessoa = pessoaTD

        let pessoaIcon = document.createElement("i") // Ícone da pessoa
        pessoaIcon.classList.add("fas") // Classe geral dos ícones

        if(pessoa.infectada){
            pessoaIcon.classList.add("fa-head-side-cough") // infectado
        }else if(pessoa.curada){
            pessoaIcon.classList.add("fa-head-side-mask") // Curado
        }else if(pessoa.morta){
            pessoaIcon.classList.add("fa-skull-crossbones") // Morto
        }else{
            pessoaIcon.classList.add("fa-user") // Saudável
        }

        if(pessoa.velocidade == 0){
            pessoaIcon.classList.add("home") // Quem estiver em casa
        }

        tabelaTd.setAttribute("data-toggle","tooltip")
        tabelaTd.setAttribute("data-html","true")
        tabelaTd.setAttribute('title',`Idade: ${pessoa.idade} | Velocidade: ${pessoa.velocidade}`)
        tabelaTd.appendChild(pessoaIcon) // Adiciona o ícone na célula

    }

    return tabelaTd
}

function limpaTabela(tabela){ // Limpa a tabela no HTML
    while (tabela.firstChild){
        tabela.removeChild(tabela.firstChild)
    }
}

function geraAleatorio(min, max){ // Gera um número aleatório entre 2 números
    return (Math.random() * (max - min) + min).toFixed(0)
}