let inputCPF = document.getElementById('cpf');
let inputSenha = document.getElementById('senha');
let inputSenhaConf = document.getElementById('senhaConf');
let inputCEP = document.getElementById('cep');
let inputCVV = document.getElementById('codigoSeguranca');
let inputCPFtitular = document.getElementById('cpfTitular');
let inputTelefone = document.getElementById('telefone');
let inputNumero = document.getElementById('numeroCartao');
let inputEndereco = document.getElementById('endereco');
let inputBairro = document.getElementById('bairro');
let inputCidade = document.getElementById('cidade');
let complemento = document.getElementById('complemento')
let selectEstado = document.getElementById('estado')



//validar
const validar = (elemento,tamanho) => {
    if (isNaN(elemento.value)) {
        elemento.value = elemento.value.substring(0,(elemento.value.length - 1))
    }
    if (elemento.value.length >= tamanho) {
        elemento.value = elemento.value.substring(0,tamanho)
    }
}

const verificar = (elemento1,elemento2) =>{

    if (elemento1.value != elemento2.value) {
        inputSenhaConf.setAttribute('class','form-control is-invalid')
    }else{
        inputSenhaConf.setAttribute('class','form-control is-valid')
    }

}
//validando cpf
inputCPF.addEventListener('keyup',() => {
    //fazendo digitar tudo numero
    // inputCPF.setAttribute('maxlength',"11")//limita o tamanho para 11 caracteres
    validar(inputCPF,11)
})
//confirmando senha 
inputSenhaConf.addEventListener('keyup',(event) => {
verificar(inputSenhaConf,inputSenha)
} )

inputSenha.addEventListener('keyup',(event) => {
verificar(inputSenha,inputSenhaConf)
} )
//puxando CEP com uma API
inputCEP.addEventListener('keyup',(event)=>{

    let config = {
        method: "GET"
    }
    

    if (isNaN(inputCEP.value)) {
        inputCEP.value = inputCEP.value.substring(0,(inputCEP.value.length - 1))
    }
    if (inputCEP.value.length >= 8) {
        inputCEP.value = inputCEP.value.substring(0,8)

        let resposta = fetch('http://viacep.com.br/ws/'+inputCEP.value+'/json/', config)
        .then((resposta) => {
            return resposta.json();
    
        })
        .then((dados)=>{
            if(dados.erro){
                return inputCEP.setAttribute('class', 'form-control is-invalid')
            }
            inputCEP.setAttribute('class','form-control is-valid')
            inputEndereco.value = dados.logradouro
            inputBairro.value = dados.bairro
            inputCidade.value = dados.localidade
            complemento.value = dados.complemento
            selectEstado.value = dados.uf
            
            // $('#compraFinalizada').modal('show') dispara o modal so alterar o id
        })
    }
})

inputCVV.addEventListener('keyup',(event)=>{
    validar(inputCVV,3)
})

inputCPFtitular.addEventListener('keyup',()=>{
    validar(inputCPFtitular,11)
})

inputTelefone.addEventListener('keyup',()=>{
    validar(inputTelefone,10)
})

inputNumero.addEventListener('keyup',()=>{
    validar(inputNumero,16)
})