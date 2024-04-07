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
    while (true) {
        var opcao = parseInt(prompt(`Menu Principal:
        1. Cadastro de Hóspedes
        2. Fazer reserva
        3. Verificar conta
        4. Sair`));

        switch (opcao) {
            case 1:
                menuCadastro();
                break;
            case 2:
                fazerReserva();
                break;
            case 3:
                verificarConta();
                break;
            case 4:
                alert(`Muito obrigado e até logo, ${nome}.`);
            default:
                erro();
                break;
        }
    }
}

function menuCadastro() {
    while (true) {
        let opcao = parseInt(prompt(`Menu de Cadastro:
        1. Cadastrar hóspede
        2. Pesquisar hóspede
        3. Listar hóspedes
        4. Voltar ao menu principal`));

        switch (opcao) {
            case 1:
                cadastrarHospede();
                break;
            case 2:
                pesquisarHospede();
                break;
            case 3:
                listarHospedes();
                break;
            case 4:
                return;
            default:
                alert("Opção inválida. Por favor, escolha uma opção válida.");
                break;
        }
    }
}

function cadastrarHospede() {
    if (lista_hospedes.length >= 15) {
        alert("Máximo de cadastros atingido.");
        return;
    }

    let nomeHospede = prompt("Qual o nome do hóspede?");
    lista_hospedes.push(nomeHospede);
    alert(`Hóspede ${nomeHospede} cadastrado(a) com sucesso!`);
}

function pesquisarHospede() {
    let nomePesquisa = prompt("Qual o nome do hóspede?");
    if (lista_hospedes.includes(nomePesquisa)) {
        alert(`Hóspede ${nomePesquisa} foi encontrado(a)!`);
    } else {
        alert(`Hóspede ${nomePesquisa} não foi encontrado(a)`);
    }
}

function listarHospedes() {
    if (lista_hospedes.length === 0) {
        alert("Não há hóspedes cadastrados.");
    } else {
        alert("Lista de hóspedes:");
        lista_hospedes.forEach((hospede, index) => {
            alert(`${index + 1}. ${hospede}`);
        });
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




