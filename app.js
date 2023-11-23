let i = 1

class Despesa {
    
    constructor (ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano 
        this.mes = mes 
        this.dia = dia 
        this.tipo = tipo 
        this.descricao = descricao 
        this.valor = valor
    }

    validarDados () {
        for(let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null ) {
                return false
            }
        }
        return true
    }
}
class Bd {
    constructor () {
        let id = localStorage.getItem('id')

        if (id == null) {
            localStorage.setItem('id',0)

        }

    }

    getProximoId () {
        let proximoId = localStorage.getItem('id')

        return (parseInt(proximoId)+1)
    }

    gravar (d) {

        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    
    }

    recuperar () {

        let lista = Array()

        let id = localStorage.getItem('id')

        for(i = 1; i <= id; i++){

            let item = JSON.parse(localStorage.getItem(i))
            item.id = i
            lista.push(item)
            
        }
        return lista
    }

    pesquisa (despesa) {

        let despesasFiltradas = this.recuperar()
        

        if (despesa.ano != '') 
        {

            despesasFiltradas = despesasFiltradas.filter(function (item) {
                return item.ano == despesa.ano 
            })

            console.log(despesasFiltradas)

        }
        
        if (despesa.mes != '') 
        {

            despesasFiltradas = despesasFiltradas.filter(function (item) {
                return item.mes == despesa.mes
            })

        }
        
        if (despesa.dia != '') 
        {

            despesasFiltradas = despesasFiltradas.filter(function (item) {
                return item.dia == despesa.dia
            })

        }

        if (despesa.tipo != '') 
        {

            despesasFiltradas = despesasFiltradas.filter(function (item) {
                return item.tipo == despesa.tipo
            })

            console.log(despesasFiltradas)

        }

        if (despesa.descricao != '') 
        {

            despesasFiltradas = despesasFiltradas.filter(function (item) {
                return item.descricao == despesa.descricao

            })
        }
        if (despesa.valor != '') 
        {
            despesasFiltradas = despesasFiltradas.filter(function (item) {
                return item.valor == despesa.valor
            })
        }

    

    return despesasFiltradas

    }    

    remover (id) {

        
        localStorage.removeItem(`${id}`)
        

    }
}

let bd = new Bd()

let registroDespesa = () => {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value,
        mes.value,
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )

    if (!despesa.validarDados()) {
        
        document.getElementById('titulo').className = 'modal-header text-danger'
        document.getElementById('exampleModalLabel').innerHTML = 'Erro na gravação'
        document.getElementById('textoModal').innerHTML = 'Existem campos obrigatórios que não foram preenchidos.'
        document.getElementById('botaoVoltar').className = 'btn btn-danger'
        document.getElementById('botaoVoltar').innerHTML = 'Voltar e corrigir'
        $('#registroGravacao').modal('show')


    } else {
    
        
        bd.gravar(despesa)

        document.getElementById('titulo').className = 'modal-header text-success'
        document.getElementById('exampleModalLabel').innerHTML = 'Sucesso na gravação'
        document.getElementById('textoModal').innerHTML = 'Despesa cadastrada com sucesso.'
        document.getElementById('botaoVoltar').className = 'btn btn-success'
        document.getElementById('botaoVoltar').innerHTML = 'Voltar'

        document.getElementById('ano').value = ''
        document.getElementById('mes').value = ''
        document.getElementById('dia').value = ''
        document.getElementById('tipo').value = ''
        document.getElementById('descricao').value = ''
        document.getElementById('valor').value = ''
        $('#registroGravacao').modal('show')


    }
    
}

function exibir (lista) {

    let listaDespesas = document.getElementById('listaTabela')
    listaDespesas.innerHTML = ''

    lista.forEach(function(d) {

        
        linha = listaDespesas.insertRow()
        linha.className = 'linha'

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        switch(d.tipo){
            case '1': 
                d.tipo = "Alimentação" 
                break
            case '2': 
                d.tipo = "Educação"
                break
            case '3': 
                d.tipo = "Lazer"
                break
            case '4': 
                d.tipo = "Saúde"
                break
            case '5': 
                d.tipo = "Transporte"
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = d.id
        btn.onclick = function() {
            bd.remover(btn.id)
            window.location.reload()

        }
        linha.insertCell(4).append(btn)
    })
    

}

let carregaListaDespesa = () => {

    let despesas = Array()

    despesas =  bd.recuperar()
    console.log(despesas)

    exibir(despesas)

}

let pesquisar = () => {

    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)


    let listaPesquisa = bd.pesquisa(despesa)

    exibir(listaPesquisa)

}

