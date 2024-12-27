var cloneOriginalTable = $('.col-md-8').clone();
var cloneOriginalCard = $('.card-pais').clone();


//buscar o pais que esta na card da pagina index.html e apresenta os seus detalhes
$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var nomePais = urlParams.get('pais'); // Captura o parâmetro "pais" da URL

    if (nomePais) {
        $('#pais').val(nomePais); // Preenche o campo de pesquisa com o nome do país
        $('#procurar').click();   // Aciona o clique no botão de pesquisa
    }
});

//detalhes do pais mas com o butão pesquisar
$('#procurar').on('click', function () {
    var valorPesquisa = $('#pais').val();

    $('.col-md-8').empty();
    $('.card-pais').empty();

    $.ajax({
        method: 'GET',
        url: 'https://restcountries.com/v3.1/all'
    }).done(function (dados) {
        console.log(dados);

        // Filtrar o país pelo nome em português
        var resultado = dados.filter(function (pais) {
            return pais.translations.por.common === valorPesquisa;
        });

        if (resultado.length > 0) {
            for (var i = 0; i < resultado.length; i++) {
                var cloneTable = cloneOriginalTable.clone();
                var cloneCard = cloneOriginalCard.clone();

                // Preencher informações na tabela
                // $('.pais-nome', cloneTable).text(resultado[i].translations.por.common);
                $('.pais-capital', cloneTable).text(resultado[i].capital);
                $('.pais-lingua', cloneTable).text(Object.values(resultado[i].languages).join(', '));
                $('.pais-continente', cloneTable).text(resultado[i].region);
                
                //populacao com espaco entre os numeros ex: 212 559 409
                $('.pais-populacao', cloneTable).text(resultado[i].population.toLocaleString());

                //Card com nome e bandeira do pais
                $('.pais-nome', cloneCard).text(resultado[i].translations.por.common);

                $('.bandeira-pais', cloneCard)
                    .attr('src', resultado[i].flags.png)
                    .attr('alt', 'Bandeira de ' + resultado[i].translations.por.common);

                $('.col-md-8').append(cloneTable);
                $('.card-pais').append(cloneCard);
            }
        } else {
            alert('País não encontrado. Verifique se o nome está correto.');
        }
    }).fail(function () {
        alert('Erro ao pesquisar os dados do país. Tente novamente.');
    });
});
