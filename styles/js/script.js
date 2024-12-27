document.addEventListener('DOMContentLoaded', function () {
    var cloneOriginalCard = $('.card-paises').clone();

    $('.lista-paises').html('');

    $.ajax({
        method: 'GET',
        url: 'https://restcountries.com/v3.1/all'
    }).done(function (dados) {
        console.log(dados);

        for (var i = 0; i < 3; i++) {
            var aleatorios = Math.floor(Math.random() * dados.length);

            var cloneCard = cloneOriginalCard.clone();
            $('.titulo-pais', cloneCard).text(dados[aleatorios].translations.por.common);

            $('.bandeira-pais', cloneCard)
                .attr('src', dados[aleatorios].flags.png)
                .attr('alt', 'Bandeira de ' + dados[aleatorios].name.common);

                $(document).on('click', '.card-paises', function () {
                    var nomePais = $('.titulo-pais', this).text(); // Obtém o nome do país do cartão
                    window.location.href = `paises.html?pais=${encodeURIComponent(nomePais)}`; // Redireciona para paises.html com o nome do país
                });
                

            $('.lista-paises').append(cloneCard);
        }
    }).fail(function () {
        console.error('Erro ao carregar os dados da API.');
    });
});
