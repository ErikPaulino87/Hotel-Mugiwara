let nomeHotel = "Villa Serenity Fernandes";
const senhaCorreta = "2678";
let quartos = new Array(20).fill(false);
var lista_hospedes = [];
var isLoggedIn = false;
var valorDiaria;

function boasVindas(nome) {
    alert(`Bem-vindo ao ${nomeHotel}, ${nome}. É um imenso prazer ter você por aqui!`);
}

function erro() {
    alert("Opção inválida. Por favor, escolha uma opção válida do menu.");
    inicio();
}

var nome = prompt("Por favor, digite seu nome:");

function login() {
    if (isLoggedIn) return true;

    var senha = prompt("Por favor, digite sua senha:");

    if (senha === senhaCorreta) {
        isLoggedIn = true;
        boasVindas(nome);
        return true;
    } else {
        alert("Senha incorreta. Acesso negado.");
        return false;
    }
}

function inicio() {
    var opcao;
    if (login()) {
        opcao = parseInt(prompt(`Menu Principal:
            1. Cadastro de Hóspedes
            2. Fazer reserva
            3. Eventos
            4. Manutenção de Ar-Condicionado
            5. Menu de castro
            6. Sair`));

        switch (opcao) {
            case 1:
                valorDiaria = parseFloat(prompt("Qual o valor padrão da diária?"));
                cadastrarHospedes();
                break;
            case 2:
                fazerReserva();
                break;
            case 3:
                organizarEvento();
                break;
            case 4:
                manutencaoArCondicionado();
                break;
            case 5:
                menuCadastro();
                break;
            case 6:
                sair();
                break;
            default:
                erro();
                break;
        }
    } else {
        return;
    }
}

function cadastrarHospedes() {
    let gratuidades = 0;
    let meias = 0;
    let total = 0;

    while (true) {
        let nomeHospede = prompt("Qual o nome do hóspede? (Digite 'PARE' para encerrar)");
        if (nomeHospede.toUpperCase() === 'PARE') {
            break;
        }

        let idadeHospede = parseInt(prompt("Qual a idade do hóspede?"));
        if (idadeHospede < 6) {
            alert(`${nomeHospede} possui gratuidade`);
            gratuidades++;
        } else if (idadeHospede > 60) {
            alert(`${nomeHospede} paga meia`);
            meias++;
            total += valorDiaria / 2;
        } else {
            total += valorDiaria;
        }

        lista_hospedes.push({ nome: nomeHospede, idade: idadeHospede });
        alert(`${nomeHospede} cadastrado(a) com sucesso.`);
    }

    alert(`${nome}, o valor total das hospedagens é: R$${total.toFixed(2)}; ${gratuidades} gratuidade(s); ${meias} meia(s)`);
    inicio()
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
                inicio();
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

function abastecerCarro() {
    let precoAlcoolWayne = parseFloat(prompt("Qual o valor do álcool no posto Wayne Oil?"));
    let precoGasolinaWayne = parseFloat(prompt("Qual o valor da gasolina no posto Wayne Oil?"));
    let precoAlcoolStark = parseFloat(prompt("Qual o valor do álcool no posto Stark Petrol?"));
    let precoGasolinaStark = parseFloat(prompt("Qual o valor da gasolina no posto Stark Petrol?"));

    let litrosTanque = 42;

    let valorAlcoolWayne = precoAlcoolWayne * litrosTanque;
    let valorGasolinaWayne = precoGasolinaWayne * litrosTanque;
    let valorAlcoolStark = precoAlcoolStark * litrosTanque;
    let valorGasolinaStark = precoGasolinaStark * litrosTanque;

    let custoAlcoolWayne = valorAlcoolWayne;
    let custoGasolinaWayne = valorGasolinaWayne;
    let custoAlcoolStark = valorAlcoolStark;
    let custoGasolinaStark = valorGasolinaStark;

    if (precoAlcoolWayne * 0.7 < precoGasolinaWayne) {
        custoAlcoolWayne *= 0.7;
    }

    if (precoAlcoolStark * 0.7 < precoGasolinaStark) {
        custoAlcoolStark *= 0.7;
    }

    let maisBarato;
    let posto;

    if (custoAlcoolWayne < custoGasolinaWayne) {
        maisBarato = "álcool";
        posto = "Wayne Oil";
    } else {
        maisBarato = "gasolina";
        posto = "Wayne Oil";
    }

    if (custoAlcoolStark < custoGasolinaStark) {
        maisBarato = "álcool";
        posto = "Stark Petrol";
    } else {
        maisBarato = "gasolina";
        posto = "Stark Petrol";
    }

    alert(`${nome}, é mais barato abastecer com ${maisBarato} no posto ${posto}.`);

    inicio();
}

function main() {
    if (login()) {
        inicio();
    }
}

function sair() {
    var confirma = confirm('Você deseja sair?');

    if (confirma) {
        alert(nome + ', foi um prazer ter você por aqui!');
        window.close();
    } else {
        inicio();
    }
}

function organizarEvento() {
    let nomeHotel = "Villa Serenity Fernandes";

    function verificarCapacidade(convidados) {
        if (convidados <= 0 || convidados > 350) {
            alert("Número de convidados inválido.");
        } else if (convidados <= 150) {
            alert("Use o auditório Laranja");
            let cadeirasAdicionais = Math.min(70, 150 - convidados);
            alert(`Inclua mais ${cadeirasAdicionais} cadeiras`);
            alert("Agora vamos ver a agenda do evento.");
        } else {
            alert("Use o auditório Colorado");
            alert("Agora vamos ver a agenda do evento.");
        }
    }

    function verificarDisponibilidade(dia, hora) {
        const diasSemana = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];
        const horarioMinimo = 7;
        const horarioMaximoSemana = 23;
        const horarioMaximoFimSemana = 15;

        dia = dia.toLowerCase();

        if (!diasSemana.includes(dia)) {
            alert("Dia da semana inválido.");
            return;
        }

        if ((dia === "sabado" || dia === "domingo") && (hora < horarioMinimo || hora >= horarioMaximoFimSemana)) {
            alert("Auditório indisponível.");
        } else if ((hora < horarioMinimo || hora >= horarioMaximoSemana)) {
            alert("Auditório indisponível.");
        } else {
            let empresa = prompt("Qual o nome da empresa?");
            alert(`Auditório reservado para ${empresa}: ${dia} às ${hora}hs`);
        }
    }

    function calcularGarcons(convidados, horas) {
        const convidadosPorGarcom = 12;
        let garcons = Math.ceil(convidados / convidadosPorGarcom);
        garcons += Math.ceil(horas / 2);
        return garcons;
    }

    function calcularCustoGarcons(garcons) {
        const custoPorHora = 10.50;
        return garcons * custoPorHora;
    }

    function calcularConsumo(convidados) {
        const cafePorConvidado = 0.2;
        const aguaPorConvidado = 0.5;
        const salgadosPorConvidado = 7;

        let cafe = convidados * cafePorConvidado;
        let agua = convidados * aguaPorConvidado;
        let salgados = convidados * salgadosPorConvidado;

        return {
            cafe: cafe,
            agua: agua,
            salgados: salgados
        };
    }

    function calcularCustoBuffet(consumo) {
        const custoCafeLitro = 0.80;
        const custoAguaLitro = 0.40;
        const custoSalgadoCento = 34;

        let custoCafe = consumo.cafe * custoCafeLitro;
        let custoAgua = consumo.agua * custoAguaLitro;
        let custoSalgados = consumo.salgados / 100 * custoSalgadoCento;

        return custoCafe + custoAgua + custoSalgados;
    }

    let convidados = parseInt(prompt("Qual o número de convidados para o seu evento?"));
    verificarCapacidade(convidados);

    let diaEvento = prompt("Qual o dia do seu evento?");
    let horaEvento = parseInt(prompt("Qual a hora do seu evento?"));
    verificarDisponibilidade(diaEvento, horaEvento);

    let duracaoEvento = parseInt(prompt("Qual a duração do evento em horas?"));
    let garconsNecessarios = calcularGarcons(convidados, duracaoEvento);
    alert(`São necessários ${garconsNecessarios} garçons.`);
    alert(`Custo: R$${calcularCustoGarcons(garconsNecessarios).toFixed(2)}`);
    alert("Agora vamos calcular o custo do buffet do hotel para o evento.");

    let consumo = calcularConsumo(convidados);
    alert(`O evento precisará de ${consumo.cafe.toFixed(2)} litros de café, ${consumo.agua.toFixed(2)} litros de água, ${consumo.salgados} salgados.`);

    let custoBuffet = calcularCustoBuffet(consumo);
    let valorTotal = custoBuffet + calcularCustoGarcons(garconsNecessarios);
    alert(`Custo do buffet: R$${custoBuffet.toFixed(2)}`);

    let confirmacao = prompt(`Evento no Auditório Colorado.
    Nome da Empresa: ${nomeHotel}.
    Data: ${diaEvento} às ${horaEvento}h.
    Duração do evento: ${duracaoEvento}h.
    Quantidade de garçons: ${garconsNecessarios}.
    Quantidade de Convidados: ${convidados}

    Custo do garçons: R$${calcularCustoGarcons(garconsNecessarios).toFixed(2)}
    Custo do Buffet: R$${custoBuffet.toFixed(2)}

    Valor total do Evento: R$${valorTotal.toFixed(2)}

    Gostaria de efetuar a reserva? (S/N)`);

    if (confirmacao.toUpperCase() === 'S') {
        alert(`${nomeHotel}, reserva efetuada com sucesso.`);
    } else {
        alert("Reserva não efetuada.");
    }
    inicio();
}

function manutencaoArCondicionado() {
    let valorServico = parseFloat(prompt("Qual o valor do serviço por aparelho?"));
    let quantidadeAparelhos = parseInt(prompt("Quantos aparelhos serão submetidos à manutenção?"));
    let percentualDesconto = parseFloat(prompt("Qual o percentual de desconto (0 se não houver)?"));
    let quantidadeMinimaDesconto = parseInt(prompt("Quantidade mínima de aparelhos para obter desconto?"));

    let total = valorServico * quantidadeAparelhos;
    let valorFinal = total;

    if (quantidadeAparelhos >= quantidadeMinimaDesconto) {
        let desconto = (percentualDesconto / 100) * total;
        valorFinal -= desconto;
    }

    alert(`O serviço de manutenção custará R$ ${valorFinal.toFixed(2)}`);
    inicio();
}





main();




