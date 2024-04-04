let nomeHotel = "Hotel Mugiwara";
const senhaCorreta = "2678";
let quartos = new Array(20).fill(false);
var lista_hospedes = [];

function boasVindas(nome) {
    alert(`Bem-vindo ao ${nomeHotel}, ${nome}. É um imenso prazer ter você por aqui!`);
}

function erro() {
    alert("Opção inválida. Por favor, escolha uma opção válida do menu.");
}

function login() {
    var nome = prompt("Por favor, digite seu nome:");
    var senha = prompt("Por favor, digite sua senha:");

    if (senha === senhaCorreta) {
        boasVindas(nome);
        return true;
    } else {
        alert("Senha incorreta. Acesso negado.");
        return false;
    }
}

function inicio() {
    var opcao = parseInt(prompt(`Escolha uma opção:
    1. Cadastrar hóspede
    2. Fazer reserva
    3. Verificar conta
    4. Sair`));

    switch (opcao) {
        case 1:
            cadastro_hospedes();
            break;
        case 2:
            fazerReserva();
            break;
        case 3:
            verificarConta();
            break;
        case 4:
            alert(`Muito obrigado e até logo, ${nome}.`);
            return;
        default:
            erro();
            break;
    }

    inicio(); 
}

function cadastro_hospedes() {
    let valorDiaria = parseFloat(prompt("Qual o valor padrão da diária?"));
    let nomeHospede = prompt("Qual o nome do hóspede?");
    let idadehospede = prompt("Qual a sua idade?")

    if (idadehospede <= 6) {
        alert(nomeHospede + " cadastrada(o) com sucesso. " + nomeHospede + " possui gratuidade." )
    }
    else if(idadehospede >= 60) {
        alert(nomeHospede + " cadastrada(o) com sucesso. " + nomeHospede + " paga meia." )

    }
    else {
        (nomeHospede + " cadastrada(o) com sucesso.")
    }

    if (isNaN(valorDiaria) || valorDiaria <= 0) {
        alert("Valor inválido.");
        ; 
        return;
    }
}
    




function fazerReserva() {
    let valorDiaria = parseFloat(prompt("Qual o valor padrão da diária?"));

    if (isNaN(valorDiaria) || valorDiaria <= 0) {
        alert("Valor inválido.");
        fazerReserva(); 
        return;
    }

    let quantidadeDias = parseInt(prompt("Quantas diárias serão necessárias?"));

    if (isNaN(quantidadeDias) || quantidadeDias <= 0 || quantidadeDias > 30) {
        alert("Quantidade de dias inválida.");
        fazerReserva();
        return;
    }

    let total = valorDiaria * quantidadeDias;
    alert(`O valor de ${quantidadeDias} dias de hospedagem é de R$${total.toFixed(2)}`);

    let nomeHospede = prompt("Qual o nome do hóspede?");

    let numeroQuarto;
    do {
        numeroQuarto = parseInt(prompt("Qual o quarto para reserva? (1 - 20)?"));
        if (quartos[numeroQuarto - 1]) {
            alert("Quarto está ocupado. Escolha outro.");
        }
    } while (quartos[numeroQuarto - 1]);

    quartos[numeroQuarto - 1] = true;

    let confirmacao = prompt(`${nomeHospede}, você confirma a hospedagem por ${quantidadeDias} dias para o quarto ${numeroQuarto} por R$${total.toFixed(2)}? (S/N)`);

    if (confirmacao.toUpperCase() === 'S') {
        alert(`Reserva efetuada para ${nomeHospede}.`);
    } else {
        quartos[numeroQuarto - 1] = false;
        alert("Reserva cancelada.");
    }

    inicio();
}

function verificarConta() {
    alert("Verificando conta...");
    alert("Conta verificada com sucesso!");
}

function main() {
    if (login()) {
        inicio();
    }
}

main();



