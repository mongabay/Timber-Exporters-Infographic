var top10Bars = new Top10Bars({
    parentId: 'chart',
});

d3.json('https://s3.amazonaws.com/mongabay-imgs/madera_sucia_vz/data/top10.json', function (error, data) {
    if (error) throw error;

    d3.csv('https://s3.amazonaws.com/mongabay-imgs/madera_sucia_vz/data/empresas.csv', function (error, data_empresas) {
        if (error) throw error;

        top10Bars.loadData(data);
        top10Bars.loadDataEmpresas(data_empresas);
        top10Bars.selectCountry('Perú');

        $("#countries li").click(function () {
            $("#countries li").removeClass("active");
            $(this).addClass("active");

            var key = $(this).text().trim();
            top10Bars.selectCountry(key);
        });
    });
});
