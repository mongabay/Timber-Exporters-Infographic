function Top10Bars(options) {
    var self = {};

    for (var key in options) {
        self[key] = options[key];
    }

    self.parentSelect = self.parentId ? "#" + self.parentId : 'body';
    self.width = self.width ? 600 : self.width;
    self.height = self.height ? 600 : self.height;
    self.svg = null;

    self.selectedCountry = 'Perú';
    self.selectedYear = 'All';

    /* Init environment */
    self.init = function () {};

    /* Load data */
    self.loadData = function (data) {
        self.data = data;
    };

    /* Load data empresas */
    self.loadDataEmpresas = function (data) {
        $.each(data, function (index, item) {
            if (self.data.empresas[item.empresa] !== undefined) {
                self.data.empresas[item.empresa].data = item;
            } else {
                console.log(item.empresa);
            }
        });
    };

    self.myFormat = function (d) {
        var ret = ''
        var str = d.toString();
        if (d > 999999) {
            ret = str.slice(-9, -6) + "," + str.slice(-6, -3) + ',' + str.slice(-3);
        } else if (d > 999) {
            ret = str.slice(-6, -3) + ',' + str.slice(-3);
        } else {
            ret = str.slice(-3);
        }
        return ret;
    }

    /* Prerender fixed elements */
    self.prerender = function () {};

    /* Render elements*/
    self.render = function (country, year) {
        // if (year == 'todos') year = '2017'; // Temp

        var data = self.data.ranking[country][year];
        var chart = $("#chart");
        chart.html('');

        if (country == 'Perú') {
            data.forEach(function (element) {
                var item = $("<div></div>", {
                    class: 'item'
                });
                var maxWidth = chart.width() - 160 - 90 - 90;
                var barWidth = (element.fob * maxWidth) / data[0].fob;
                var metadata = self.data.empresas[element.empresa].data;

                item
                    .append(
                        $("<div></div>", {
                            class: 'wrapper clearfix'
                        })
                        .append(
                            $("<div></div>", {
                                class: 'name flex flex-items-center flex-justify-end'
                            }).text(element.empresa)
                        )
                        .append(
                            $("<div></div>", {
                                class: 'logo'
                            })
                            .append(
                                $("<img/>", {
                                    src: 'images/logos/' + metadata.logo
                                })
                            )
                        )
                        .append(
                            $("<div></div>", {
                                class: 'bar'
                            }).css('width', barWidth + 'px')
                        )
                        .append(
                            $("<div></div>", {
                                class: 'value flex flex-items-center flex-justify-start'
                            }).text('US$ ' + self.myFormat(parseInt(element.fob)))
                        )
                    );

                item
                    .mouseover(function () {
                        self.showCard(metadata, $(this));
                    })
                    .mouseout(function () {
                        self.hideCard();
                    });

                chart.append(item);
            });
        } else {
            data.forEach(function (element) {
                var item = $("<div></div>", {
                    class: 'item'
                });
                var maxWidth = chart.width() - 160 - 20 - 90;
                var barWidth = (element.fob * maxWidth) / data[0].fob;
                var metadata = self.data.empresas[element.empresa].data;

                item
                    .append(
                        $("<div></div>", {
                            class: 'wrapper clearfix'
                        })
                        .append(
                            $("<div></div>", {
                                class: 'name flex flex-items-center flex-justify-end'
                            }).text(element.empresa)
                        )
                        .append(
                            $("<div></div>", {
                                class: 'bar'
                            }).css('width', barWidth + 'px')
                        )
                        .append(
                            $("<div></div>", {
                                class: 'value flex flex-items-center flex-justify-start'
                            }).text('US$ ' + self.myFormat(parseInt(element.fob)))
                        )
                    );

                chart.append(item);
            });
        }
    };

    /* Select Country */
    self.selectCountry = function (country) {
        self.selectedCountry = country;
        $("#years").html('');
        for (var year in self.data.ranking[country]) {
            $("#years").append(
                $("<li></li>", {
                    class: 'option' + (year == 'All' ? ' active' : '')
                })
                .html('<span>' + year + '</span>')
            );
        }

        $("#years li").click(function () {
            $("#years li").removeClass("active");
            $(this).addClass("active");

            var year = $(this).text().trim();

            self.render(country, year);
        });

        self.render(country, 'All');
    };

    self.showCard = function (obj, item) {
        var offset = item.offset();
        $("#card-empresa").text(obj.empresa);
        $("#card-logo").attr('src', 'images/logos/' + obj.logo);
        $("#card-gerente").text(obj.gerente);
        if (obj.antecedentes) {
            $("#card-antecedentes").text(obj.antecedentes);
            $("#card-antecedentes").parent().show();
        } else {
            $("#card-antecedentes").parent().hide();
        }

        $("#card").css('top', offset.top + 52);
        $("#card").show();
        var ch = $("#card").height();
        if ($("#card").offset().top + $("#card").height() > $(window).height() + $(window).scrollTop() - 50) {
            $("#card").css('top', offset.top - 55 - $("#card").height());
            $("#card").addClass('card--top');
        } else {
            $("#card").removeClass('card--top');
        }
    };

    self.hideCard = function (d) {
        $("#card").hide();
    };

    self.init();
    return self;
}
