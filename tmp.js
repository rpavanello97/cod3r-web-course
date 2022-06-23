tw.local.flgSucesso = false;
try {
    (function () {

        /**
         * Função retornar a string repetida @count vezes.
         */
        String.prototype.repeat = function (count) {
            'use strict';
            if (this == null) {
                throw new TypeError('can\'t convert ' + this + ' to object');
            }
            var str = '' + this;
            count = +count;
            if (count != count) {
                count = 0;
            }
            if (count < 0) {
                throw new RangeError('repeat count must be non-negative');
            }
            if (count == Infinity) {
                throw new RangeError('repeat count must be less than infinity');
            }
            count = Math.floor(count);
            if (str.length == 0 || count == 0) {
                return '';
            }
            if (str.length * count >= 1 << 28) {
                throw new RangeError('repeat count must not overflow maximum string size');
            }
            var rpt = '';
            for (var i = 0; i < count; i++) {
                rpt += str;
            }
            return rpt;
        }

        /**
         * Função para preencher com @padString a esquerda.
         *
         * @targetLength, tamanho que se deseja alcançar.
         * @padString, string para preenchimento.
         */
        String.prototype.padStart = function padStart(targetLength, padString) {
            targetLength = targetLength >> 0;
            padString = String(padString || ' ');
            if (this.length > targetLength) {
                return String(this);
            } else {
                targetLength = targetLength - this.length;
                if (targetLength > padString.length) {
                    padString += padString.repeat(targetLength / padString.length);
                }
                return padString.slice(0, targetLength) + String(this);
            }
        };

        /**
         * Função para preencher com @padString a direita.
         *
         * @targetLength, tamanho que se deseja alcançar.
         * @padString, string para preenchimento.
         */
        String.prototype.padEnd = function padEnd(targetLength, padString) {
            targetLength = targetLength >> 0;
            padString = String(padString || ' ');
            if (this.length > targetLength) {
                return String(this);
            } else {
                targetLength = targetLength - this.length;
                if (targetLength > padString.length) {
                    padString += padString.repeat(targetLength / padString.length);
                }
                return String(this) + padString.slice(0, targetLength);
            }
        };

        /**
         * Função para aplicar máscaras em strings.
         * @pattern, string contendo a máscara que deverá ser aplicada. O método substituirá cada # com o caracter da sequência. Qualquer outro caracter será mantido.
         * @fillDirection, l, left, r ou right representando a direção que será usado o @fillWith caso falte caracteres para preencher a máscara.
         * @fillWith, string a ser para cada caracter faltante ao preencher a máscara.
         *
         * Usage:
         * "123".maskIt("##-##")				=> 12-3
         * "123".maskIt("##-##", "left", "0")	=> 01-23
         * "123".maskIt("##-##", "l", "0")		=> 01-23
         * "123".maskIt("##-##", "right", "0")	=> 12-30
         * "123".maskIt("##-##", "r", "0")		=> 12-30
         * "abc".maskIt("##-##", "l", "x")		=> xa-bc
         * "abc".maskIt("##-##", "l", "xy")		=> xya-bc
         */
        String.prototype.maskIt = function (pattern, fillDirection, fillWith) {
            var j = 0;
            var t = this;
            var r = pattern;
            if (fillDirection != null) {

                var fullLength = (pattern.match(/#/g) || []).length;
                if (t.length < fullLength) {
                    if (fillDirection.toUpperCase().match(/R(IGHT)?$/g)) {
                        t = t.padEnd(fullLength, fillWith);
                    } else if (fillDirection.toUpperCase().match(/L(EFT)?$/g)) {
                        t = t.padStart(fullLength, fillWith);
                    }
                }
            }
            for (var i = 0; i < pattern.length; i++) {
                r = r.replace(/#/, (t[j] == null ? "" : t[j]));
                j++;
            }
            return r;
        };

        /**
         * Função para formatar strings. Equivalente ao format do C#.
         *
         * Usage:
         * "Um {0} jamais será {1}. argumentos: {0} e {1}".format("tapita", "ticaracatica")			=> "Um tapita jamais será ticaracatica. argumentos: tapita e ticaracatica"
         * "Um {0} jamais será {1}. argumentos: {0}, {1} e {2}".format("tapita", "ticaracatica")	=> "Um tapita jamais será ticaracatica. argumentos: tapita, ticaracatica e {2}"
         */
        String.prototype.format = function () {
            var s = this,
            i = arguments.length;
            while (i--) {
                s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
            }
            return s;
        };

        /**
         * Função para capitalizar, ou seja, deixar maiúscula a primeira letra de cada palavra em uma string.
         *
         * Usage:
         * "rUa AVENIDA teste".capitalize()		=> "Rua Avenida Teste"
         * "".capitalize() -> ""
         */
        String.prototype.capitalize = function () {
            if (this != "") {
                var lower = this.toLowerCase();
                return lower.replace(/(^| )(\w)/g, function (x) {
                    return x.toUpperCase();
                });
            } else {
                return "";
            }
        };

        /**
         * Função para capitalizar, ou seja, deixar maiúscula, a primeira letra da string.
         *
         * Usage:
         * "rUa AVENIDA teste".capitalize()		=> "Rua avenida teste"
         * "".capitalize() -> ""
         */
        String.prototype.capitalizeFisrtLetter = function () {
            if (this != "") {
                var lower = this.toLowerCase();
                return lower.charAt(0).toUpperCase() + lower.slice(1);
            } else {
                return "";
            }
        };

        /**
         * Função para retirar espacos no comeco e final de strings.
         *
         * Usage:
         * "  rUa AVENIDA teste ".trim()		=> "rUa AVENIDA teste"
         * "".trim() -> ""
         */
        String.prototype.trim = function () {
            if (this != "") {
                var x = this;
                return x.replace(/^\s+|\s+$/gm, '');
            } else {
                return "";
            }
        };

        /**
         * Função para trazer somente digitos de uma sting
         *
         * Usage:
         * "081.123-123".onlyNumbers()		=> "081123123"
         */
        String.prototype.onlyNumbers = function () {
            if (this != "") {
                return this.replace(/\D/g, "");
            } else {
                return "";
            }
        };

        /**
         * Função para trazer somente letras de uma sting
         *
         * Usage:
         * "08aa1.123-123".onlyAlphabet()		=> "aa"
         */
        String.prototype.onlyAlphabet = function () {
            var aux = this;
            if (this != "") {
                return aux.replace(/[^A-z]/g, "");
            } else {
                return "";
            }
        };

        /**
         * Formata o número string em valor monetário.
         *
         * Usage:
         * "123456789.33".currencyFormat()	=> "123.456.789,33"
         */
        String.prototype.currencyFormat = function () {
            var numberString = this;

            var n = Number(numberString);

            if (isNaN(n)) {
                n = 0;
            }

            var newNumber = n.toFixed(2);

            var numberString = newNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

            var lastIndex = numberString.lastIndexOf(".");
            return numberString.slice(0, lastIndex) + numberString.slice(lastIndex).replace(".", ",");
        };

        /**
         * Formata o número string com um número de casas decimais.
         *
         * Usage:
         * "123456789.333".decimalPlaces(4)	=> "123456789,3330"
         */
        String.prototype.decimalPlaces = function (decimalPlaces) {
            var numberString = this;

            var n = Number(numberString);
            if (isNaN(n)) {
                n = 0;
            }

            var newNumber = n.toFixed(decimalPlaces);

            var numberString = newNumber.toString();

            var lastIndex = numberString.lastIndexOf(".");
            return numberString.slice(0, lastIndex) + numberString.slice(lastIndex).replace(".", ",");
        };

        /**
         * Verifica se a string contem outra string.
         *
         * Usage:
         * "Por dia de atraso".contains("atraso")	=> true
         * "Por dia de atraso".contains("documento")	=> false
         */
        String.prototype.contains = function (search) {
            if (search == null) {
                return false;
            }

            return this.indexOf(search) != -1;
        };

        /**
         * Formata o número NUMBER em valor monetário.
         *
         * Usage:
         * 123456789.3333.currencyFormat()	=> "123.456.789,33"
         */
        Number.prototype.currencyFormat = function () {
            var newNumber = this.toFixed(2);

            var numberString = newNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

            var lastIndex = numberString.lastIndexOf(".");
            return numberString.slice(0, lastIndex) + numberString.slice(lastIndex).replace(".", ",");
        };

        /**
         * Formata o número NUMBER com um número de casas decimais.
         *
         * Usage:
         * 123456789.333.decimalPlaces(4)	=> "123456789,3330"
         */
        Number.prototype.decimalPlaces = function (decimalPlaces) {
            var newNumber = this.toFixed(decimalPlaces);

            var numberString = newNumber.toString();

            var lastIndex = numberString.lastIndexOf(".");
            return numberString.slice(0, lastIndex) + numberString.slice(lastIndex).replace(".", ",");
        };

        /**
         *	returns:
         *  0        ->  0
         * -0        -> -0
         *  0.2      ->  0
         * -0.2      -> -0
         *  0.7      ->  0
         * -0.7      -> -0
         *  Infinity ->  Infinity
         * -Infinity -> -Infinity
         *  NaN      ->  NaN
         *  null     ->  0
         */
        Number.prototype.trunc = function () {
            var v = this;
            v = +v;
            if (!isFinite(v))
                return v;

            return (v - v % 1) || (v < 0 ? -0 : v === 0 ? v : 0);
        };
    })();
	
    /*
     * Termo NADP
     */
    tw.local.termoNadp = {};
    debugger;

    /*
     * Id do documento
     */
    if (tw.local.autoInfracao.demonstrativo != null
         && tw.local.autoInfracao.demonstrativo.tipoDemonstrativo != null
         && tw.local.autoInfracao.demonstrativo.tipoDemonstrativo.value != null
         && tw.local.autoInfracao.demonstrativo.tipoDemonstrativo.value != "") {
        if (tw.local.autoInfracao.demonstrativo.tipoDemonstrativo.value == "0") { // Data conhecida
            tw.local.idDocumento = tw.env.IEPDF_documentid_nadp_dtconhecida_ICMS_ITCMD;
        } else if (tw.local.autoInfracao.demonstrativo.tipoDemonstrativo.value == "1") { // Periodo
            tw.local.idDocumento = tw.env.IEPDF_documentid_nadp_periodo_ICMS;
        } else if (tw.local.autoInfracao.demonstrativo.tipoDemonstrativo.value == "2") { // Multa formal
            tw.local.idDocumento = tw.env.IEPDF_documentid_nadp_multa_ICMS;
        }
    }

    /*
     * Tipo de imposto (ICMS ou ITCMD)
     */
    tw.local.termoNadp.textoITCMD = false;
    tw.local.termoNadp.codigoCadastroEpaf = tw.local.autoInfracao.dadosBasicosAutuacao.numProtocoloInicial;

    var tipoAutuacao = "";
    var nomeImpostoCompleto = "";    
    if (tw.local.autoInfracao.dadosBasicosAutuacao != null
         && tw.local.autoInfracao.dadosBasicosAutuacao.tipoAutuacao != null
         && tw.local.autoInfracao.dadosBasicosAutuacao.tipoAutuacao.value != null
         && tw.local.autoInfracao.dadosBasicosAutuacao.tipoAutuacao.value != "") {
        if (tw.local.autoInfracao.dadosBasicosAutuacao.tipoAutuacao.value == "1") {
            tipoAutuacao = tw.env.IEPDF_tipo_autuacao_ICMS;
            nomeImpostoCompleto = tw.env.IEPDF_tipo_autuacao_ICMS + " - Auditoria";
        } else if (tw.local.autoInfracao.dadosBasicosAutuacao.tipoAutuacao.value == "2") {
            tipoAutuacao = tw.env.IEPDF_tipo_autuacao_ITCMD;
            tw.local.termoNadp.textoITCMD = true;
            nomeImpostoCompleto = tw.env.IEPDF_tipo_autuacao_ITCMD;
        } else if (tw.local.autoInfracao.dadosBasicosAutuacao.tipoAutuacao.value == "3") {
            tipoAutuacao = tw.env.IEPDF_tipo_autuacao_ICMS;
            nomeImpostoCompleto = tw.env.IEPDF_tipo_autuacao_ICMS + " - Auditoria";
        }
    }

    /**
     * Rodape
     */
    var formatoRodape = "{\\rtf1\\ansi\\deff0\\deftab480  {\\colortbl \\red000\\green000\\blue000; \\red255\\green255\\blue255; \\red000\\green000\\blue000; \\red255\\green255\\blue255; }  \\f0\\fs20\\cb3\\cf2 \\highlight1\\cf0 {0}\\u170? DRR \\u8211? {1}. {2} {3}, {4} - {5}\\par {1}/PR - CEP: {6} - Tel.:({7}) {8}} ";
    var formatoRodapeComplemento = "{\\rtf1\\ansi\\deff0\\deftab480  {\\colortbl \\red000\\green000\\blue000; \\red255\\green255\\blue255; \\red000\\green000\\blue000; \\red255\\green255\\blue255; }  \\f0\\fs20\\cb3\\cf2 \\highlight1\\cf0 {0}\\u170? DRR \\u8211? {1}. {2} {3}, {4}, {9} - {5}\\par {1}/PR - CEP: {6} - Tel.:({7}) {8}} ";

    tw.local.termoNadp.rodape = "";
    // 01. drr
    tw.local.termoNadp.drr = "";
    if (tw.local.delegacia != null) {
        if (tw.local.delegacia.complemento != null && tw.local.delegacia.complemento.trim() != "") {
            tw.local.termoNadp.rodape = formatoRodapeComplemento.format(
                    tw.local.delegacia.codigoDelegacia == null ? "" : tw.local.delegacia.codigoDelegacia.toString(),
                    tw.local.delegacia.cidade == null ? "" : tw.local.delegacia.cidade.trim().capitalize(),
                    tw.local.delegacia.tipoLogradouro == null ? "" : tw.local.delegacia.tipoLogradouro.trim().capitalize(),
                    tw.local.delegacia.nomeLogradouro == null ? "" : tw.local.delegacia.nomeLogradouro.trim().capitalize(),
                    tw.local.delegacia.numeroLogradouro == null ? "" : tw.local.delegacia.numeroLogradouro.onlyNumbers(),
                    tw.local.delegacia.bairro == null ? "" : tw.local.delegacia.bairro.trim().capitalize(),
                    tw.local.delegacia.cep == null ? "" : tw.local.delegacia.cep.onlyNumbers().maskIt("##.###-###"),
                    tw.local.delegacia.ddd == null ? "" : tw.local.delegacia.ddd.onlyNumbers().maskIt("##"),
                    tw.local.delegacia.telefone == null ? "" : tw.local.delegacia.telefone.onlyNumbers().maskIt("####-####"),
                    tw.local.delegacia.complemento == null ? "" : tw.local.delegacia.complemento.trim().capitalize());
        } else {
            tw.local.termoNadp.rodape = formatoRodape.format(
                    tw.local.delegacia.codigoDelegacia == null ? "" : tw.local.delegacia.codigoDelegacia.toString(),
                    tw.local.delegacia.cidade == null ? "" : tw.local.delegacia.cidade.trim().capitalize(),
                    tw.local.delegacia.tipoLogradouro == null ? "" : tw.local.delegacia.tipoLogradouro.trim().capitalize(),
                    tw.local.delegacia.nomeLogradouro == null ? "" : tw.local.delegacia.nomeLogradouro.trim().capitalize(),
                    tw.local.delegacia.numeroLogradouro == null ? "" : tw.local.delegacia.numeroLogradouro.onlyNumbers(),
                    tw.local.delegacia.bairro == null ? "" : tw.local.delegacia.bairro.trim().capitalize(),
                    tw.local.delegacia.cep == null ? "" : tw.local.delegacia.cep.onlyNumbers().maskIt("##.###-###"),
                    tw.local.delegacia.ddd == null ? "" : tw.local.delegacia.ddd.onlyNumbers().maskIt("##"),
                    tw.local.delegacia.telefone == null ? "" : tw.local.delegacia.telefone.onlyNumbers().maskIt("####-####"));
        }

        tw.local.termoNadp.drr = tw.local.delegacia.codigoDelegacia == null ? "" : tw.local.delegacia.codigoDelegacia.toString().maskIt("##", "left", "0");
    }

    /**
     * se a NADP veio de uma lavratura
     * OU
     * se é para refazer a NADP sem ter passado pela comissão na
     */
    tw.local.termoNadp.tituloCabecalho = "NOTIFICAÇÃO PARA APRESENTAÇÃO DE DEFESA PRÉVIA (NADP)";
    if (tw.local.flgOrigemLavratura == true
         || tw.local.flgPermiteRetificacao == true) {
        tw.local.termoNadp.tituloCabecalho = "NOTIFICAÇÃO PARA APRESENTAÇÃO DE DEFESA PRÉVIA (NADP) - RETIFICADORA";
    }

    tw.local.termoNadp.eprotocolo = "";
    tw.local.termoNadp.numeroCabecalho = "";
    if (tw.local.autoInfracao.defesaPrevia != null
         && tw.local.autoInfracao.defesaPrevia.codDefesaPrevia != null
         && tw.local.autoInfracao.defesaPrevia.codDefesaPrevia != 0) {

        var eProtocolo = tw.local.autoInfracao.defesaPrevia.codProtocoloNadp.toString();

        // 03. eProtocolo
        //tw.local.termoNadp.eprotocolo = eProtocolo.maskIt("##.###.###-#", "left", "0");
        tw.local.termoNadp.eprotocolo = eProtocolo.maskIt("##.#######-#", "left", "0");
        // 02. numero
        tw.local.termoNadp.numeroCabecalho = eProtocolo.maskIt("##.#######-#", "left", "0");
    }

    // 05. Ordem de servico
    tw.local.termoNadp.osf = "";
    if (tw.local.autoInfracao.dadosBasicosAutuacao != null
         && tw.local.autoInfracao.dadosBasicosAutuacao.ordemServico != null
         && tw.local.autoInfracao.dadosBasicosAutuacao.ordemServico.value != null
         && tw.local.autoInfracao.dadosBasicosAutuacao.ordemServico.value != "") {

        var ordemServico = tw.local.autoInfracao.dadosBasicosAutuacao.ordemServico.value.onlyNumbers();

        tw.local.termoNadp.osf = ordemServico.maskIt("##/####/######", "left", "0");
    }

    tw.local.termoNadp.localLavratura = "";
    tw.local.termoNadp.codigoLavratura = "";
    if (tw.local.autoInfracao.dadosBasicosAutuacao != null
         && tw.local.autoInfracao.dadosBasicosAutuacao.localLavratura != null) {
        // 06. local
        tw.local.termoNadp.localLavratura = tw.local.autoInfracao.dadosBasicosAutuacao.localLavratura.name == null ? "" : tw.local.autoInfracao.dadosBasicosAutuacao.localLavratura.name.trim().capitalize();
        // 04. codigo da emissao
        tw.local.termoNadp.codigoLavratura = tw.local.autoInfracao.dadosBasicosAutuacao.localLavratura.value == null ? "" : tw.local.autoInfracao.dadosBasicosAutuacao.localLavratura.value.trim().onlyNumbers().maskIt("####-#", "left", "0");
    }

    // 07. data da emissao

    tw.local.termoNadp.dataEprotocolo = new Date();

    /*
     * Secao 08. Sujeitos Passivos
     */
    tw.local.termoNadp.sujeitoPassivo = [];
    if (tw.local.autoInfracao.sujeitoPassivo != null
         && tw.local.autoInfracao.sujeitoPassivo.length > 0) {
        for (var i = 0; i < tw.local.autoInfracao.sujeitoPassivo.length; i++) {
            var sp = tw.local.autoInfracao.sujeitoPassivo[i];
            var index = tw.local.termoNadp.sujeitoPassivo.length;

            tw.local.termoNadp.sujeitoPassivo[index] = {};
            tw.local.termoNadp.sujeitoPassivo[index].numeroSujeitoPassivo = (index + 1);
            tw.local.termoNadp.sujeitoPassivo[index].nome = sp.nomeRazaoSocial == null ? "" : sp.nomeRazaoSocial.trim().capitalize();

            tw.local.termoNadp.sujeitoPassivo[index].codigoSrp = "";
            if (sp.stsSRP != null && sp.stsSRP != "") {
                tw.local.termoNadp.sujeitoPassivo[index].codigoSrp = sp.stsSRP.trim().onlyNumbers().maskIt("#.####.###", "left", "0");
            }

            tw.local.termoNadp.sujeitoPassivo[index].inscricaoEstadual = "";
            if (sp.inscricaoEstadual != null && sp.inscricaoEstadual != "" && sp.inscricaoEstadual != "0") {
                tw.local.termoNadp.sujeitoPassivo[index].inscricaoEstadual = sp.inscricaoEstadual.trim().onlyNumbers().maskIt("########-##", "left", "0");
            }

            tw.local.termoNadp.sujeitoPassivo[index].situacaoCadastralAtual = "";
            if (sp.stsCadastralAtual != null) {
                tw.local.termoNadp.sujeitoPassivo[index].situacaoCadastralAtual = sp.stsCadastralAtual.name == null ? "" : sp.stsCadastralAtual.name.trim().capitalize();
            }

            tw.local.termoNadp.sujeitoPassivo[index].textoExcluido = "";
            tw.local.termoNadp.sujeitoPassivo[index].cpfCnpj = "";
            if (sp.cnpj != null) {
                var cpfCnpjString = sp.cnpj.onlyNumbers();

                tw.local.termoNadp.sujeitoPassivo[index].cpfCnpj = cpfCnpjString.length <= 11 ? cpfCnpjString.maskIt("###.###.###-##", "left", "0") : cpfCnpjString.maskIt("##.###.###/####-##", "left", "0");
            }

            tw.local.termoNadp.sujeitoPassivo[index].regraPagamentoAtual = "";
            if (sp.regimePagamentoAtual != null) {
                tw.local.termoNadp.sujeitoPassivo[index].regraPagamentoAtual = sp.regimePagamentoAtual.name == null ? "" : sp.regimePagamentoAtual.name.trim().capitalize();
            }

            /*
             * Endereco
             */
            tw.local.termoNadp.sujeitoPassivo[index].ruaENumero = "";
            tw.local.termoNadp.sujeitoPassivo[index].bairro = "";
            tw.local.termoNadp.sujeitoPassivo[index].cep = "";
            tw.local.termoNadp.sujeitoPassivo[index].municipio = "";
            tw.local.termoNadp.sujeitoPassivo[index].uf = "";
            if (sp.endereco != null) {
                tw.local.termoNadp.sujeitoPassivo[index].bairro = sp.endereco.bairro == null ? "" : sp.endereco.bairro.trim().capitalize();
                tw.local.termoNadp.sujeitoPassivo[index].cep = sp.endereco.cep == null ? "" : sp.endereco.cep.onlyNumbers().maskIt("##.###-###", "left", "0");
                tw.local.termoNadp.sujeitoPassivo[index].municipio = sp.endereco == null ? "" : sp.endereco.cidade.trim().capitalize();
                tw.local.termoNadp.sujeitoPassivo[index].uf = sp.endereco.estado == null ? "" : sp.endereco.estado;

                var logradouro = sp.endereco.logradouro == null ? "" : sp.endereco.logradouro.trim().capitalize();
                var numero = sp.endereco.numero == null ? "" : sp.endereco.numero;
                var complemento = sp.endereco.complemento == null ? "" : sp.endereco.complemento.trim().capitalize();

                var enderecoSemNumeroFormat = "{0}";
                var enderecoFormat = "{0}, {1}";
                var enderecoComplementoFormat = "{0}, {1}, {2}";
                var enderecoComplementoSemNumeroFormat = "{0}, {1}";

                if (complemento != null && complemento != "") {
                    if (numero != null && numero != "") {
                        tw.local.termoNadp.sujeitoPassivo[index].ruaENumero = enderecoComplementoFormat.format(logradouro, numero, complemento);
                    } else {
                        tw.local.termoNadp.sujeitoPassivo[index].ruaENumero = enderecoComplementoSemNumeroFormat.format(logradouro, complemento);
                    }
                } else {
                    if (numero != null && numero != "") {
                        tw.local.termoNadp.sujeitoPassivo[index].ruaENumero = enderecoFormat.format(logradouro, numero);
                    } else {
                        tw.local.termoNadp.sujeitoPassivo[index].ruaENumero = enderecoSemNumeroFormat.format(logradouro);
                    }
                }
            }
        }
    }

    /*
     * Secao 16. Autuantes
     */
    tw.local.termoNadp.auditorFiscal = [];
    if (tw.local.autoInfracao.autuantePrincipal != null) {
        var autuante = tw.local.autoInfracao.autuantePrincipal;
        var cpfString = autuante.cpf == null ? "" : autuante.cpf.onlyNumbers();
        var index = tw.local.termoNadp.auditorFiscal.length;

        tw.local.termoNadp.auditorFiscal[index] = {};
        tw.local.termoNadp.auditorFiscal[index].cpf = cpfString.maskIt("###.###.###-##", "left", "0");
        tw.local.termoNadp.auditorFiscal[index].nome = autuante.nomeCompleto == null ? "" : autuante.nomeCompleto;
        tw.local.termoNadp.auditorFiscal[index].classe = "";
    }
    if (tw.local.autoInfracao.autuantes != null
         && tw.local.autoInfracao.autuantes.length > 0) {
        for (var i = 0; i < tw.local.autoInfracao.autuantes.length; i++) {
            var autuante = tw.local.autoInfracao.autuantes[i];
            var cpfString = autuante.cpf == null ? "" : autuante.cpf.onlyNumbers();
            var index = tw.local.termoNadp.auditorFiscal.length;

            tw.local.termoNadp.auditorFiscal[index] = {};
            tw.local.termoNadp.auditorFiscal[index].cpf = cpfString.maskIt("###.###.###-##", "left", "0");
            tw.local.termoNadp.auditorFiscal[index].nome = autuante.nomeCompleto == null ? "" : autuante.nomeCompleto;
            tw.local.termoNadp.auditorFiscal[index].classe = "";
        }
    }
    // Secao 9. Descricao da Irregularidade Detectada
    tw.local.termoNadp.descricaoInfracaoAveriguada = "";
    if (tw.local.autoInfracao.penalidade != null) {
        //var penalidadeFormat = "{\\rtf1\\ansi\\deff0\\deftab480  {\\colortbl \\red000\\green000\\blue000; \\red255\\green255\\blue255; \\red000\\green000\\blue000; \\red255\\green255\\blue255; }  \\f0\\fs20\\cb3\\cf2 \\highlight1\\cf0 {0}}";
        var penalidadeFormat  =   "{0}<br><br>{1}";
         
        tw.local.termoNadp.descricaoInfracaoAveriguada  =  penalidadeFormat.format(
                (tw.local.autoInfracao.penalidade.textoUnicidade  !=  null  &&  tw.local.autoInfracao.penalidade.textoUnicidade.descricaoTextoUnicidade.trim()  !=  null  ?  tw.local.autoInfracao.penalidade.textoUnicidade.descricaoTextoUnicidade.trim().replace(/<font face="Arial Black">/g, '<font face="Times New Roman">').replace(/<font face="Courier New">/g, '<font face="Times New Roman">')  :   ""),
                (tw.local.autoInfracao.penalidade.descInfracao  !=  null  ?  tw.local.autoInfracao.penalidade.descInfracao.trim().replace(/<font face="Arial Black">/g, '<font face="Times New Roman">').replace(/<font face="Courier New">/g, '<font face="Times New Roman">')  :   ""));
        //tw.local.termoNadp.descricaoInfracaoAveriguada = tw.local.autoInfracao.defesaPrevia.descNotificacaoDefesaPrevia == null ? "" : penalidadeFormat.format(tw.local.autoInfracao.defesaPrevia.descNotificacaoDefesaPrevia);
    }

    /*
     * Nome do imposto para as secoes futuras
     */
    tw.local.termoNadp.nomeImposto = tipoAutuacao == null ? "" : tipoAutuacao;
	
    /**
     * Penalidade
     */
    // 15. penalidade
    tw.local.termoNadp.penalidade = "";
    tw.local.termoNadp.intimacaoPagamento = "";
    tw.local.termoNadp.baseLegal = "";
    if (tw.local.penalidadeProcesso != null) {
        // ICMS - Auditoria - Lei n. 18.573/2015, artigo 33, § 1º, inciso IV, alínea a
        var penalidadeArtigoFormat = "{2} - Lei {0}, artigo {1}, § único";
        var penalidadeParagrafoFormat = "{3} - Lei {0}, artigo {1}, § {2}";
        var penalidadeIncisoFormat = "{4} - Lei {0}, artigo {1}, § {2}, inciso {3}";
        var penalidadeAlineaFormat = "{5} - Lei {0}, artigo {1}, § {2}, inciso {3}, alínea {4}";

        var penalidadeLeiArtigoFormat = "{2} - Lei {0}, artigo {1}";
        var penalidadeSemParagrafoItcmd = "{3} - Lei {0}, artigo {1}, inciso {2}"; //Lei n. 18.573/2015, art. 43, inc. I


        //ITCMD
        if (tw.local.penalidadeProcesso.descricaoLei.onlyNumbers() == "89271988") {

            tw.local.termoNadp.penalidade = penalidadeLeiArtigoFormat.format(
                    tw.local.penalidadeProcesso.descricaoLei,
                    tw.local.penalidadeProcesso.descricaoArtigo,
                    tipoAutuacao);
        } else if (tw.local.penalidadeProcesso.descricaoLei.onlyNumbers() == "185732015"
             && tw.local.penalidadeProcesso.descricaoArtigo.onlyNumbers() == "43") {

            tw.local.termoNadp.penalidade = penalidadeSemParagrafoItcmd.format(
                    tw.local.penalidadeProcesso.descricaoLei,
                    tw.local.penalidadeProcesso.descricaoArtigo,
                    tw.local.penalidadeProcesso.descricaoInciso,
                    tipoAutuacao);
        }
        // tem lei, artigo, paragrafo, inciso e alinea
        else if (tw.local.penalidadeProcesso.descricaoAlinea != null && tw.local.penalidadeProcesso.descricaoAlinea.trim() != ""
             && tw.local.penalidadeProcesso.descricaoInciso != null && tw.local.penalidadeProcesso.descricaoInciso.trim() != ""
             && tw.local.penalidadeProcesso.descricaoParagrafo != null && tw.local.penalidadeProcesso.descricaoParagrafo.trim() != "") {

            tw.local.termoNadp.penalidade = penalidadeAlineaFormat.format(
                    tw.local.penalidadeProcesso.descricaoLei,
                    tw.local.penalidadeProcesso.descricaoArtigo,
                    tw.local.penalidadeProcesso.descricaoParagrafo,
                    tw.local.penalidadeProcesso.descricaoInciso,
                    tw.local.penalidadeProcesso.descricaoAlinea,
                    nomeImpostoCompleto);

            // tem lei, artigo, paragrafo e inciso
        } else if (tw.local.penalidadeProcesso.descricaoParagrafo != null && tw.local.penalidadeProcesso.descricaoParagrafo.trim() != ""
             && tw.local.penalidadeProcesso.descricaoInciso != null && tw.local.penalidadeProcesso.descricaoInciso.trim() != ""
             && (tw.local.penalidadeProcesso.descricaoAlinea == null || tw.local.penalidadeProcesso.descricaoAlinea.trim() == "")) {

            tw.local.termoNadp.penalidade = penalidadeIncisoFormat.format(
                    tw.local.penalidadeProcesso.descricaoLei,
                    tw.local.penalidadeProcesso.descricaoArtigo,
                    tw.local.penalidadeProcesso.descricaoParagrafo,
                    tw.local.penalidadeProcesso.descricaoInciso,
                    nomeImpostoCompleto);

            // tem lei, artigo e paragrafo
        } else if (tw.local.penalidadeProcesso.descricaoParagrafo != null && tw.local.penalidadeProcesso.descricaoParagrafo.trim() != ""
             && (tw.local.penalidadeProcesso.descricaoInciso == null || tw.local.penalidadeProcesso.descricaoInciso.trim() == "")
             && (tw.local.penalidadeProcesso.descricaoAlinea == null || tw.local.penalidadeProcesso.descricaoAlinea.trim() == "")) {

            tw.local.termoNadp.penalidade = penalidadeParagrafoFormat.format(
                    tw.local.penalidadeProcesso.descricaoLei,
                    tw.local.penalidadeProcesso.descricaoArtigo,
                    tw.local.penalidadeProcesso.descricaoParagrafo,
                    nomeImpostoCompleto);
            // tem lei, artigo, paragrafo unico
        } else if ((tw.local.penalidadeProcesso.descricaoParagrafo == null || tw.local.penalidadeProcesso.descricaoParagrafo.trim() == "")
             && (tw.local.penalidadeProcesso.descricaoInciso == null || tw.local.penalidadeProcesso.descricaoInciso.trim() == "")
             && (tw.local.penalidadeProcesso.descricaoAlinea == null || tw.local.penalidadeProcesso.descricaoAlinea.trim() == "")) {

            tw.local.termoNadp.penalidade = penalidadeArtigoFormat.format(
                    tw.local.penalidadeProcesso.descricaoLei,
                    tw.local.penalidadeProcesso.descricaoArtigo,
                    nomeImpostoCompleto);
        }

        /*
         * 17. intimacao para apresentacao de defesa previa
         * 05. acrescimos legais
         */
        if (tw.local.termoNadp.nomeImposto == tw.env.IEPDF_tipo_autuacao_ICMS) {
            // 17. intimacao para apresentacao de defesa previa
            tw.local.termoNadp.intimacaoPagamento = tw.env.IEPDF_nadp_int_pag_ICMS;
            // 05. acrescimos legais
            tw.local.termoNadp.baseLegal = tw.env.IEPDF_base_legal_ICMS;
        } else if (tw.local.termoNadp.nomeImposto == tw.env.IEPDF_tipo_autuacao_ITCMD) {
            if (tw.local.penalidadeProcesso.descricaoLei.onlyNumbers() == "185732015") { // 18.573/2015
                // 17. intimacao para apresentacao de defesa previa
                tw.local.termoNadp.intimacaoPagamento = tw.env.IEPDF_nadp_int_pag_ITCMD_2015;
                // 05. acrescimos legais
                tw.local.termoNadp.baseLegal = tw.env.IEPDF_base_legal_ITCMD_2015;
            } else {
                // 17. intimacao para apresentacao de defesa previa
                tw.local.termoNadp.intimacaoPagamento = tw.env.IEPDF_nadp_int_pag_ITCMD_1988;
                // 05. acrescimos legais
                tw.local.termoNadp.baseLegal = tw.env.IEPDF_base_legal_ITCMD_1988;
            }
        }
    }

    // 14.
    if (tipoAutuacao == "ICMS") {
    	tw.local.termoNadp.infringencia = tw.local.termoNadp.penalidade.slice(17);
    } else if (tipoAutuacao == "ITCMD"){
    	tw.local.termoNadp.infringencia = tw.local.termoNadp.penalidade.slice(8);
    }    
    
    if (tw.local.autoInfracao != null
         && tw.local.autoInfracao.penalidade != null
         && tw.local.autoInfracao.penalidade.complementoInfringencia != null
         && tw.local.autoInfracao.penalidade.complementoInfringencia.trim() != "") {
        tw.local.termoNadp.infringencia += "<br><br>" + tw.local.autoInfracao.penalidade.complementoInfringencia.trim().replace(/<font face="Arial Black">/g, '<font face="Times New Roman">').replace(/<font face="Courier New">/g, '<font face="Times New Roman">');
    }

    // Numero do demonstrativo
    tw.local.termoNadp.numeroImposto = "";
    tw.local.termoNadp.demonstrativoAtualizacaoMonetariaJuros = "";
    if (tw.local.autoInfracao.demonstrativo != null) {

        // var demonstrativoNumber = 0;
        // if (tw.local.autoInfracao.demonstrativo.codDemonstrativo != null) {
        // 	demonstrativoNumber = tw.local.autoInfracao.demonstrativo.codDemonstrativo.trunc();
        // }
        // var demonstrativoNumber = Math.trunc(tw.local.autoInfracao.demonstrativo.codDemonstrativo == null ? 0 : tw.local.autoInfracao.demonstrativo.codDemonstrativo);

        tw.local.termoNadp.numeroImposto = tw.local.autoInfracao.demonstrativo.numDemonstrativo == null ? "" : tw.local.autoInfracao.demonstrativo.numDemonstrativo.toString();
        tw.local.termoNadp.demonstrativoAtualizacaoMonetariaJuros = tw.local.autoInfracao.demonstrativo.numDemonstrativo == null ? "" : tw.local.autoInfracao.demonstrativo.numDemonstrativo.toString();
    }

    /*
     * Notificados
     */
    tw.local.termoNadp.notificado = [];
    if (tw.local.autoInfracao.sujeitoPassivo != null
         && tw.local.autoInfracao.sujeitoPassivo.length > 0) {
        for (var i = 0; i < tw.local.autoInfracao.sujeitoPassivo.length; i++) {
            var index = tw.local.termoNadp.notificado.length;

            tw.local.termoNadp.notificado[index] = {};
            tw.local.termoNadp.notificado[index].ordemNotificado = (i + 1);
        }
    }

    /*
     * Abaixo serão campos do calculo do demonstrativo
     */
    if (tw.local.idDocumento == tw.env.IEPDF_documentid_nadp_dtconhecida_ICMS_ITCMD
         || tw.local.idDocumento == tw.env.IEPDF_documentid_nadp_periodo_ICMS) {
        if (tw.local.calcularSaidaDemonstrativoDetalhado != null) {
            /*
             * Secao 11. Valor atulizado ate a data da emissao da NADP
             */
            tw.local.termoNadp.imposto = tw.local.calcularSaidaDemonstrativoDetalhado.valorTotalImposto == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorTotalImposto.currencyFormat();
            tw.local.termoNadp.juros = tw.local.calcularSaidaDemonstrativoDetalhado.valorJurosImposto == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorJurosImposto.currencyFormat();
            tw.local.termoNadp.multa = tw.local.calcularSaidaDemonstrativoDetalhado.valorMulta == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorMulta.currencyFormat();
            tw.local.termoNadp.total = tw.local.calcularSaidaDemonstrativoDetalhado.valorTotal == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorTotal.currencyFormat();
            /**
             * Secao 09. Quadro Resumo
             */
            tw.local.termoNadp.baseValorOriginalBaseCalculoMulta = tw.local.calcularSaidaDemonstrativoDetalhado.valorTotalBaseMulta == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorTotalBaseMulta.currencyFormat();
            tw.local.termoNadp.baseValorCorrecaoBaseCalculo = tw.local.calcularSaidaDemonstrativoDetalhado.valorTotalCorrecaoBaseMulta == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorTotalCorrecaoBaseMulta.currencyFormat();
            tw.local.termoNadp.baseValorTotal = tw.local.calcularSaidaDemonstrativoDetalhado.valorTotalBaseCalculoMulta == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorTotalBaseCalculoMulta.currencyFormat();

            tw.local.termoNadp.valorOriginalImpostoCreditoTributario = tw.local.calcularSaidaDemonstrativoDetalhado.valorTotalImposto == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorTotalImposto.currencyFormat();
            tw.local.termoNadp.valorJurosImpostoCreditoTributario = tw.local.calcularSaidaDemonstrativoDetalhado.valorJurosImposto == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorJurosImposto.currencyFormat();
            tw.local.termoNadp.valorMultaCreditoTributario = tw.local.calcularSaidaDemonstrativoDetalhado.valorMulta == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorMulta.currencyFormat();
            tw.local.termoNadp.valorTotalCreditoTributario = tw.local.calcularSaidaDemonstrativoDetalhado.valorTotal == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorTotal.currencyFormat();

            var penalidadeNumber = 0;
            if (tw.local.calcularSaidaDemonstrativoDetalhado.penalidade != null) {
                penalidadeNumber = tw.local.calcularSaidaDemonstrativoDetalhado.penalidade;
            }
            // demonstrativo detalhado
            tw.local.termoNadp.baseCalculoMultaPorcentagem = penalidadeNumber.toString().replace(".", ","); // 999, aqui nao precisa aparecer minimo ou maximo
            // var penalidadeNumber = Math.trunc(tw.local.calcularSaidaDemonstrativoDetalhado.penalidade == null ? 0 : tw.local.calcularSaidaDemonstrativoDetalhado.penalidade);

            tw.local.termoNadp.creditoTributarioExigivelMulta = "";

            if (tw.local.calcularSaidaDemonstrativoDetalhado.flagValorMinimo && !tw.local.calcularSaidaDemonstrativoDetalhado.flagValorMaximo) { // se atingiu valor minimo
                // quadro de resumo e campo 11. de valores
                // formato (99%), string mínima caso atingir minima, string máxima caso atingir maxima

                tw.local.termoNadp.creditoTributarioExigivelMulta = tw.env.IEPDF_multa_minima;
            } else if (tw.local.calcularSaidaDemonstrativoDetalhado.flagValorMaximo && !tw.local.calcularSaidaDemonstrativoDetalhado.flagValorMinimo) { // se atingiu valor maximo
                // quadro de resumo e campo 11. de valores
                // formato (99%), string mínima caso atingir minima, string máxima caso atingir maxima
                tw.local.termoNadp.creditoTributarioExigivelMulta = tw.env.IEPDF_multa_maxima;
            } else {            	            	
                tw.local.termoNadp.creditoTributarioExigivelMulta = penalidadeNumber.toString();
                if (tw.local.termoNadp.creditoTributarioExigivelMulta.length == 3) {
                	tw.local.termoNadp.creditoTributarioExigivelMulta = penalidadeNumber.toString().maskIt("(###%)");
                } else {
                	tw.local.termoNadp.creditoTributarioExigivelMulta = penalidadeNumber.toString().maskIt("(##%)");
                }                
            }

            // 10. valor original do imposto
            tw.local.termoNadp.valorOriginalImposto = tw.local.calcularSaidaDemonstrativoDetalhado.valorTotalImposto == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorTotalImposto.currencyFormat();
            // 12. base de calculo atualizada
            tw.local.termoNadp.baseCalculoAtualMulta = tw.local.calcularSaidaDemonstrativoDetalhado.valorTotalBaseCalculoMulta == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorTotalBaseCalculoMulta.currencyFormat();

            // somente informar esse quando for data conhecida com uma unica data
            tw.local.termoNadp.dataImposto = null;
            // somente informar esse quando for data conhecida com uma unica data ou quando for periodo
            tw.local.termoNadp.termoInicialCalculoJuros = null;
            if (tw.local.idDocumento == tw.env.IEPDF_documentid_nadp_dtconhecida_ICMS_ITCMD) {
                if (tw.local.calcularSaidaDemonstrativoDetalhado.dataInicialCalculoJuros != null) {
                    tw.local.calcularSaidaDemonstrativoDetalhado.dataInicialCalculoJuros == null ? null : tw.local.calcularSaidaDemonstrativoDetalhado.dataInicialCalculoJuros;

                    tw.local.termoNadp.dataImposto = tw.local.calcularSaidaDemonstrativoDetalhado.dataInicialCalculoJuros;
                    tw.local.termoNadp.termoInicialCalculoJuros = tw.local.calcularSaidaDemonstrativoDetalhado.dataInicialCalculoJuros;
                }
                // if (tw.local.autoInfracao.demonstrativo != null
                // 	&& tw.local.autoInfracao.demonstrativo.demonstrativoData != null
                // 	&& tw.local.autoInfracao.demonstrativo.demonstrativoData.length > 0) {
                // 	if (tw.local.autoInfracao.demonstrativo.demonstrativoData.length == 1) {
                // 		tw.local.termoNadp.dataImposto = tw.local.calcularSaidaDemonstrativoDetalhado.dataInicialCalculoJuros == null ? null : tw.local.calcularSaidaDemonstrativoDetalhado.dataInicialCalculoJuros;
                // 		tw.local.termoNadp.termoInicialCalculoJuros = tw.local.calcularSaidaDemonstrativoDetalhado.dataInicialCalculoJuros == null ? null : tw.local.calcularSaidaDemonstrativoDetalhado.dataInicialCalculoJuros;
                // 	}
                // }
            } else if (tw.local.idDocumento == tw.env.IEPDF_documentid_nadp_periodo_ICMS) {
                tw.local.termoNadp.termoInicialCalculoJuros = tw.local.calcularSaidaDemonstrativoDetalhado.dataInicialCalculoJuros == null ? null : tw.local.calcularSaidaDemonstrativoDetalhado.dataInicialCalculoJuros;
                // 		tw.local.termoNadp.termoInicialCalculoJuros = tw.local.calcularSaidaDemonstrativoDetalhado.dataInicialCalculoJuros == null ? null : tw.local.calcularSaidaDemonstrativoDetalhado.dataInicialCalculoJuros;
                // if (tw.local.autoInfracao.demonstrativo != null
                // 	&& tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo != null) {

                // 	tw.local.termoNadp.termoInicialCalculoJuros = tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaInicioDeterminacao == null ? null : tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaInicioDeterminacao;
                // }
            }

            /**
             * Demonstrativo
             */
            // Periodo
            tw.local.termoNadp.dataInicialDemonstrativo = null;
            tw.local.termoNadp.dataFinalDemonstrativo = null;
            if (tw.local.idDocumento == tw.env.IEPDF_documentid_nadp_periodo_ICMS) {
                if (tw.local.autoInfracao.demonstrativo != null
                     && tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo != null) {
                    
                    /** Correção do BUG JSDBRAMS-1274 - Solicitação do cliente **/
                    //					tw.local.termoNadp.dataInicialDemonstrativo = tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaInicioDeterminacao == null ? null : tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaInicioDeterminacao;
                    //					tw.local.termoNadp.dataFinalDemonstrativo = tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaFimDeterminacao == null ? null : tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaFimDeterminacao;

                    if (tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaInicioDeterminacao != null) {
                        tw.local.termoNadp.dataInicialDemonstrativo = tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaInicioDeterminacao;
                    } else {
                        tw.local.termoNadp.dataInicialDemonstrativo = tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaInicioCorrecao;
                    }

                    if (tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaFimDeterminacao != null) {
                        tw.local.termoNadp.dataFinalDemonstrativo = tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaFimDeterminacao;
                    } else {
                        tw.local.termoNadp.dataFinalDemonstrativo = tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaFimCorrecao;
                    }
                }
            }

            /**
             * Posicoes detalhadas
             */
            tw.local.termoNadp.itemCalculo = [];
            if (tw.local.calcularSaidaDemonstrativoDetalhado.demonstrativoDetalhado != null
                 && tw.local.calcularSaidaDemonstrativoDetalhado.demonstrativoDetalhado.length > 0) {

                for (var i = 0; i < tw.local.calcularSaidaDemonstrativoDetalhado.demonstrativoDetalhado.length; i++) {
                    var element = tw.local.calcularSaidaDemonstrativoDetalhado.demonstrativoDetalhado[i];
                    var index = tw.local.termoNadp.itemCalculo.length;

                    tw.local.termoNadp.itemCalculo[index] = {};
                    tw.local.termoNadp.itemCalculo[index].numeroItem = (index + 1);
                    // valores comuns
                    tw.local.termoNadp.itemCalculo[index].valorOriginalBaseCalculoMulta = element.valorOriginalBaseMulta == null ? "0".currencyFormat() : element.valorOriginalBaseMulta.currencyFormat();
                    tw.local.termoNadp.itemCalculo[index].valorOriginalIcms = element.valorOriginalImposto == null ? "0".currencyFormat() : element.valorOriginalImposto.currencyFormat();
                    tw.local.termoNadp.itemCalculo[index].correcaoBaseCalculo = element.valorMultaCorrecaoMonetaria == null ? "0".currencyFormat() : element.valorMultaCorrecaoMonetaria.currencyFormat();
                    tw.local.termoNadp.itemCalculo[index].jurosIcms = element.valorJurosImposto == null ? "0".currencyFormat() : element.valorJurosImposto.currencyFormat();
                    tw.local.termoNadp.itemCalculo[index].valorMulta = element.valorMulta == null ? "0".currencyFormat() : element.valorMulta.currencyFormat();
                    // indices comuns
                    tw.local.termoNadp.itemCalculo[index].indiceCorrecaoBaseCalculo = element.indiceMultaCorrecaoMonetaria == null ? "0".decimalPlaces(4) : element.indiceMultaCorrecaoMonetaria.decimalPlaces(4);
                    tw.local.termoNadp.itemCalculo[index].indiceJuros = element.indiceJuros == null ? "0".decimalPlaces(4) : element.indiceJuros.decimalPlaces(4);

                    if (tw.local.idDocumento == tw.env.IEPDF_documentid_nadp_dtconhecida_ICMS_ITCMD) {
                        // datas
                        if (tw.local.autoInfracao.demonstrativo != null
                             && tw.local.autoInfracao.demonstrativo.demonstrativoData != null
                             && tw.local.autoInfracao.demonstrativo.demonstrativoData.length > 0
                             && tw.local.autoInfracao.demonstrativo.demonstrativoData[i] != null) {

                            // data do imposto
                            tw.local.termoNadp.itemCalculo[index].dataBaseJuros = tw.local.autoInfracao.demonstrativo.demonstrativoData[i].dtaDeterminacao == null ? null : tw.local.autoInfracao.demonstrativo.demonstrativoData[i].dtaDeterminacao;
                            // data do imposto
                            tw.local.termoNadp.itemCalculo[index].dataInicialIcms = tw.local.autoInfracao.demonstrativo.demonstrativoData[i].dtaDeterminacao == null ? null : tw.local.autoInfracao.demonstrativo.demonstrativoData[i].dtaDeterminacao;
                            // data da multa
                            tw.local.termoNadp.itemCalculo[index].dataInicialMulta = tw.local.autoInfracao.demonstrativo.demonstrativoData[i].dtaCorrecao == null ? null : tw.local.autoInfracao.demonstrativo.demonstrativoData[i].dtaCorrecao;
                        }
                        // data da nadp, ou seja, data atual
                        tw.local.termoNadp.itemCalculo[index].dataFinalMulta = new Date(); // Data da Nadp

                        // FCAs
                        tw.local.termoNadp.itemCalculo[index].fcaFinal = element.FCAFinal == null ? "0".decimalPlaces(4) : element.FCAFinal.decimalPlaces(4);
                        tw.local.termoNadp.itemCalculo[index].fcaInicial = element.FCAInicial == null ? "0".decimalPlaces(4) : element.FCAInicial.decimalPlaces(4);

                    } else if (tw.local.idDocumento == tw.env.IEPDF_documentid_nadp_periodo_ICMS) {
                        // datas
                        if (tw.local.autoInfracao.demonstrativo != null
                             && tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo != null) {
                            // data final do periodo da base de calculo da multa
                            tw.local.termoNadp.itemCalculo[index].dataFinalMulta = tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaFimCorrecao == null ? null : tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaFimCorrecao;
                            // data inicial do periodo do imposto
                            tw.local.termoNadp.itemCalculo[index].dataInicialIcms = tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaInicioDeterminacao == null ? null : tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaInicioDeterminacao;
                            // data inicial do periodo da base de calculo da multa
                            tw.local.termoNadp.itemCalculo[index].dataInicialMulta = tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaInicioCorrecao == null ? null : tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaInicioCorrecao;
                        }
                        // data do meio do periodo
                        tw.local.termoNadp.itemCalculo[index].dataBaseJuros = tw.local.calcularSaidaDemonstrativoDetalhado.dataInicialCalculoJuros == null ? null : tw.local.calcularSaidaDemonstrativoDetalhado.dataInicialCalculoJuros;

                        // FCAs
                        tw.local.termoNadp.itemCalculo[index].fcaFinal = "0".decimalPlaces(4);
                        tw.local.termoNadp.itemCalculo[index].fcaInicial = "0".decimalPlaces(4);
                    }
                }
            }

            /**
             * Selic
             */
            if (tw.local.calcularSaidaDemonstrativoDetalhado.taxaJurosImposto == null) {
                tw.local.calcularSaidaDemonstrativoDetalhado.taxaJurosImposto = [];
            }

            // remover todas as taxas juros nulas
            var taxas = tw.local.calcularSaidaDemonstrativoDetalhado.taxaJurosImposto;
            taxas.filter(taxa => taxa.taxaJurosSELIC == null && taxa.dataBaseJuros == null).forEach(taxaNula => taxas.splice(taxas.findIndex(taxa => taxaNula.taxaJurosSELIC == taxa.taxaJurosSELIC && taxaNula.dataBaseJuros == taxa.dataBaseJuros), 1));

            if (taxas == null) {
                tw.local.calcularSaidaDemonstrativoDetalhado.taxaJurosImposto = [];
            } else {
                tw.local.calcularSaidaDemonstrativoDetalhado.taxaJurosImposto = taxas;
            }

            // se tamanho par, resultado da divisao inteira
            var half = 0;
            if ((tw.local.calcularSaidaDemonstrativoDetalhado.taxaJurosImposto.length % 2) == 0) {
                half = tw.local.calcularSaidaDemonstrativoDetalhado.taxaJurosImposto.length / 2;
            } else { // cc, teto da divisao
                half = Math.ceil(tw.local.calcularSaidaDemonstrativoDetalhado.taxaJurosImposto.length / 2);
            }

            tw.local.termoNadp.listaSelic1 = [];
            for (var i = 0; i < half; i++) {
                var element = tw.local.calcularSaidaDemonstrativoDetalhado.taxaJurosImposto[i];

                var indexSelix1 = tw.local.termoNadp.listaSelic1.length;
                tw.local.termoNadp.listaSelic1[indexSelix1] = {};
                tw.local.termoNadp.listaSelic1[indexSelix1].taxa = element.taxaJurosSELIC == null ? "0".decimalPlaces(2) : element.taxaJurosSELIC.decimalPlaces(2);
                tw.local.termoNadp.listaSelic1[indexSelix1].dataTaxa = element.dataBaseJuros == null ? null : element.dataBaseJuros;
            }

            tw.local.termoNadp.listaSelic2 = [];
            for (var i = half; i < tw.local.calcularSaidaDemonstrativoDetalhado.taxaJurosImposto.length; i++) {
                var element = tw.local.calcularSaidaDemonstrativoDetalhado.taxaJurosImposto[i];

                var indexSelix2 = tw.local.termoNadp.listaSelic2.length;
                tw.local.termoNadp.listaSelic2[indexSelix2] = {};
                tw.local.termoNadp.listaSelic2[indexSelix2].taxa = element.taxaJurosSELIC == null ? "0".decimalPlaces(2) : element.taxaJurosSELIC.decimalPlaces(2);
                tw.local.termoNadp.listaSelic2[indexSelix2].dataTaxa = element.dataBaseJuros == null ? null : element.dataBaseJuros;
            }

            // se o total de itens for impar, adicionar um elemento vazio, apenas para estetica
            if (((tw.local.calcularSaidaDemonstrativoDetalhado.taxaJurosImposto.length % 2) != 0)
                 || (tw.local.calcularSaidaDemonstrativoDetalhado.taxaJurosImposto.length == 0)) {
                // Adicionar a taxa do mes atual
                var indexSelix2 = tw.local.termoNadp.listaSelic2.length;
                tw.local.termoNadp.listaSelic2[indexSelix2] = {};
                tw.local.termoNadp.listaSelic2[indexSelix2].taxa = "";
                tw.local.termoNadp.listaSelic2[indexSelix2].dataTaxa = null;
            }

            /**
             * Juros
             */
            tw.local.termoNadp.itemIndiceJuros = [];
            if (tw.local.calcularSaidaDemonstrativoDetalhado.indiceJurosImposto != null
                 && tw.local.calcularSaidaDemonstrativoDetalhado.indiceJurosImposto.length > 0) {
                for (var i = 0; i < tw.local.calcularSaidaDemonstrativoDetalhado.indiceJurosImposto.length; i++) {
                    var element = tw.local.calcularSaidaDemonstrativoDetalhado.indiceJurosImposto[i];

                    var indexJuros = tw.local.termoNadp.itemIndiceJuros.length;
                    tw.local.termoNadp.itemIndiceJuros[indexJuros] = {};
                    tw.local.termoNadp.itemIndiceJuros[indexJuros].numeroItem = (indexJuros + 1);
                    tw.local.termoNadp.itemIndiceJuros[indexJuros].referenciaInicial = element.dataReferenciaInicial == null ? null : element.dataReferenciaInicial;
                    tw.local.termoNadp.itemIndiceJuros[indexJuros].referenciaFinal = element.dataReferenciaFinal == null ? null : element.dataReferenciaFinal;
                    tw.local.termoNadp.itemIndiceJuros[indexJuros].somaTaxas = element.totalTaxas == null ? "0".decimalPlaces(2) : element.totalTaxas.decimalPlaces(2);
                    tw.local.termoNadp.itemIndiceJuros[indexJuros].indice = element.indice == null ? "0".decimalPlaces(4) : element.indice.decimalPlaces(4);
                }
            }

            /**
             * Indice de correcao medio
             */
            // Periodo
            if (tw.local.idDocumento == tw.env.IEPDF_documentid_nadp_periodo_ICMS) {

                tw.local.termoNadp.parametrosObtencaoIndice = {};
                tw.local.termoNadp.parametrosObtencaoIndice.indiceCorrecaoMedio = "";
                tw.local.termoNadp.parametrosObtencaoIndice.somatorioDias = "";
                tw.local.termoNadp.parametrosObtencaoIndice.somatorioFatores = "";

                if (tw.local.calcularSaidaDemonstrativoDetalhado.totalCorrecaoMedio != null) {
                    tw.local.termoNadp.parametrosObtencaoIndice.indiceCorrecaoMedio = tw.local.calcularSaidaDemonstrativoDetalhado.totalCorrecaoMedio.indiceCorrecaoMedio == null ? "0".decimalPlaces(4) : tw.local.calcularSaidaDemonstrativoDetalhado.totalCorrecaoMedio.indiceCorrecaoMedio.decimalPlaces(4);
                    if (tw.local.calcularSaidaDemonstrativoDetalhado.totalCorrecaoMedio.indiceCorrecaoMedio < 0) {
                        tw.local.termoNadp.parametrosObtencaoIndice.indiceCorrecaoMedio = "0".decimalPlaces(4);
                    }
                    tw.local.termoNadp.parametrosObtencaoIndice.somatorioDias = tw.local.calcularSaidaDemonstrativoDetalhado.totalCorrecaoMedio.totalDias == null ? "0" : tw.local.calcularSaidaDemonstrativoDetalhado.totalCorrecaoMedio.totalDias.toString();
                    tw.local.termoNadp.parametrosObtencaoIndice.somatorioFatores = tw.local.calcularSaidaDemonstrativoDetalhado.totalCorrecaoMedio.totalCorrecaoParcial == null ? "0".decimalPlaces(4) : tw.local.calcularSaidaDemonstrativoDetalhado.totalCorrecaoMedio.totalCorrecaoParcial.decimalPlaces(4);
                }

                tw.local.termoNadp.dadosObtencaoIndice = [];
                if (tw.local.calcularSaidaDemonstrativoDetalhado.indiceCorrecaoMedio != null
                     && tw.local.calcularSaidaDemonstrativoDetalhado.indiceCorrecaoMedio.length > 0) {

                    for (var i = 0; i < tw.local.calcularSaidaDemonstrativoDetalhado.indiceCorrecaoMedio.length; i++) {
                        var element = tw.local.calcularSaidaDemonstrativoDetalhado.indiceCorrecaoMedio[i];

                        var indexObtencao = tw.local.termoNadp.dadosObtencaoIndice.length;
                        tw.local.termoNadp.dadosObtencaoIndice[indexObtencao] = {};
                        tw.local.termoNadp.dadosObtencaoIndice[indexObtencao].mesPeriodo = element.dataPeriodo == null ? null : element.dataPeriodo;
                        tw.local.termoNadp.dadosObtencaoIndice[indexObtencao].fcaMesLavratura = element.FCAInicial == null ? "0".decimalPlaces(4) : element.FCAInicial.decimalPlaces(4);
                        tw.local.termoNadp.dadosObtencaoIndice[indexObtencao].fcaMesPeriodo = element.FCAFinal == null ? "0".decimalPlaces(4) : element.FCAFinal.decimalPlaces(4);
                        tw.local.termoNadp.dadosObtencaoIndice[indexObtencao].variacaoFcaRelativaPeriodo = element.varicacaoRelativa == null ? "0".decimalPlaces(4) : element.varicacaoRelativa.decimalPlaces(4);
                        tw.local.termoNadp.dadosObtencaoIndice[indexObtencao].fatorCorrecaoParcialPeriodo = element.fatorCorrecaoParcial == null ? "0".decimalPlaces(4) : element.fatorCorrecaoParcial.decimalPlaces(4);

                        var numeroDiasMes = 0;
                        if (element.numeroDiasMes != null) {
                            numeroDiasMes = element.numeroDiasMes.trunc();
                        }
                        // var numeroDiasMes = Math.trunc(element.numeroDiasMes == null ? 0 : element.numeroDiasMes);

                        tw.local.termoNadp.dadosObtencaoIndice[indexObtencao].numeroDiasMesPeriodo = numeroDiasMes.toString();
                    }
                }
            }
        }
    } else if (tw.local.idDocumento == tw.env.IEPDF_documentid_nadp_multa_ICMS) {
        if (tw.local.calcularSaidaDemonstrativoDetalhado != null) {
            /*
             * Secao 11. Valor atulizado ate a data da emissao da NADP
             */
            tw.local.termoNadp.imposto = "0".currencyFormat();
            tw.local.termoNadp.juros = "0".currencyFormat();
            tw.local.termoNadp.multa = tw.local.calcularSaidaDemonstrativoDetalhado.valorMulta == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorMulta.currencyFormat();
            tw.local.termoNadp.total = tw.local.calcularSaidaDemonstrativoDetalhado.valorTotal == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorTotal.currencyFormat();
            /**
             * Secao 09. Quadro Resumo
             */
            tw.local.termoNadp.baseValorOriginalBaseCalculoMulta = "0".currencyFormat();
            tw.local.termoNadp.baseValorCorrecaoBaseCalculo = "0".currencyFormat();
            tw.local.termoNadp.baseValorTotal = "0".currencyFormat();

            tw.local.termoNadp.valorOriginalImpostoCreditoTributario = "0".currencyFormat();
            tw.local.termoNadp.valorJurosImpostoCreditoTributario = "0".currencyFormat();
            tw.local.termoNadp.valorMultaCreditoTributario = tw.local.calcularSaidaDemonstrativoDetalhado.valorMulta == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorMulta.currencyFormat();
            tw.local.termoNadp.valorTotalCreditoTributario = tw.local.calcularSaidaDemonstrativoDetalhado.valorTotal == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorTotal.currencyFormat();

            // quadro de resumo e campo 11. de valores
            tw.local.termoNadp.creditoTributarioExigivelMulta = ""; // só aparece mínima e se caso atingir minima, pois o multa formal nao tem porcentagem
            if (tw.local.calcularSaidaDemonstrativoDetalhado.flagValorMinimo && !tw.local.calcularSaidaDemonstrativoDetalhado.flagValorMaximo) { // se atingiu valor minimo
                tw.local.termoNadp.creditoTributarioExigivelMulta = tw.env.IEPDF_multa_minima;
            } else if (tw.local.calcularSaidaDemonstrativoDetalhado.flagValorMaximo && !tw.local.calcularSaidaDemonstrativoDetalhado.flagValorMinimo) { // se atingiu valor maximo
                tw.local.termoNadp.creditoTributarioExigivelMulta = tw.env.IEPDF_multa_maxima;
            }
            // demonstrativo detalhado
            tw.local.termoNadp.baseCalculoMultaPorcentagem = ""; // aqui nao precisa aparecer, pois o multa formal nao tem porcentagem

            // 10. valor original do imposto
            tw.local.termoNadp.valorOriginalImposto = null;
            // 12. base de calculo atualizada
            tw.local.termoNadp.baseCalculoAtualMulta = null;
            // 13. termo inicial para calculo de juros do impsto
            tw.local.termoNadp.termoInicialCalculoJuros = null;

            tw.local.termoNadp.dataImposto = null;

            // Multa
            
            var spaceFormat = " {0}";
            var numberFormat = "###";

            var penalidadeNumber = 0;
            if (tw.local.calcularSaidaDemonstrativoDetalhado.penalidade != null) {
                penalidadeNumber = tw.local.calcularSaidaDemonstrativoDetalhado.penalidade.trunc();
            }
            // var penalidadeNumber = Math.trunc(tw.local.calcularSaidaDemonstrativoDetalhado.penalidade == null ? 0 : tw.local.calcularSaidaDemonstrativoDetalhado.penalidade);

            // <quantidadeUPF> UPF/PR<referencia><fatorMultiplicador>. Valor de 1 UPF/PR na data da emissao da NADP: <valorUPF>
            tw.local.termoNadp.quantidadeUPF = numberFormat.maskIt(penalidadeNumber.toString());
            tw.local.termoNadp.valorUPF = tw.local.calcularSaidaDemonstrativoDetalhado.valorUnidadeUPF == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorUnidadeUPF.currencyFormat();
            // referencia e fator multiplicador sao coexistentes e precisam de um espaco no comeco.
            tw.local.termoNadp.fatorMultiplicador = "";
            tw.local.termoNadp.referencia = "";

            if (tw.local.calcularSaidaDemonstrativoDetalhado.referencia != null
                 && tw.local.calcularSaidaDemonstrativoDetalhado.referencia.trim().onlyAlphabet() != "") {

                var fatorMultiplicadorNumber = 0;
                if (tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.fatorMultiplicador != null) {
                    fatorMultiplicadorNumber = tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.fatorMultiplicador
                }
                // var fatorMultiplicadorNumber = Math.trunc(tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.fatorMultiplicador);
                // tw.local.termoNadp.fatorMultiplicador = spaceFormat.format(numberFormat.maskIt(fatorMultiplicadorNumber.toString()));
                if (tw.local.calcularSaidaDemonstrativoDetalhado.referencia.trim().toLowerCase().contains("documento")) {
                    tw.local.termoNadp.fatorMultiplicador = ". Quantidade de documentos fiscais: {0}".format(numberFormat.maskIt(fatorMultiplicadorNumber.toString()));
                } else if (tw.local.calcularSaidaDemonstrativoDetalhado.referencia.trim().toLowerCase().contains("período")) {
                    tw.local.termoNadp.fatorMultiplicador = ". Quantidade de períodos de apuração do imposto: {0}".format(numberFormat.maskIt(fatorMultiplicadorNumber.toString()));
                } else if (tw.local.calcularSaidaDemonstrativoDetalhado.referencia.trim().toLowerCase().contains("dia de atraso")) {
                    tw.local.termoNadp.fatorMultiplicador = ". Quantidade de dias de atraso: {0}".format(numberFormat.maskIt(fatorMultiplicadorNumber.toString()));
                } else if (tw.local.calcularSaidaDemonstrativoDetalhado.referencia.trim().toLowerCase().contains("item descumprido")) {
                    tw.local.termoNadp.fatorMultiplicador = ". Quantidade de itens descumpridos: {0}".format(numberFormat.maskIt(fatorMultiplicadorNumber.toString()));
                }

                tw.local.termoNadp.referencia = spaceFormat.format(tw.local.calcularSaidaDemonstrativoDetalhado.referencia.trim().toLowerCase());
            }

            // if (tw.local.autoInfracao.demonstrativo != null
            // 	&& tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal != null) {
            // 	if (tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.fatorMultiplicador != null
            // 		&& tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.fatorMultiplicador > 1) {
            // 		var fatorMultiplicadorNumber = Math.trunc(tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.fatorMultiplicador);

            // 		tw.local.termoNadp.fatorMultiplicador = spaceFormat.format(numberFormat.maskIt(fatorMultiplicadorNumber.toString()));

            // 		if (tw.local.calcularSaidaDemonstrativoDetalhado.referencia != null) {
            // 			tw.local.termoNadp.referencia = tw.local.calcularSaidaDemonstrativoDetalhado.referencia.trim().onlyAlphabet() == "" ? "" : spaceFormat.format(tw.local.calcularSaidaDemonstrativoDetalhado.referencia.trim().toLowerCase());
            // 		}
            // 	}
            // }

            /**
             * Demonstrativo
             */
            tw.local.termoNadp.itemCalculo = [];
            var index = tw.local.termoNadp.itemCalculo.length;

            tw.local.termoNadp.itemCalculo[index] = {};
            tw.local.termoNadp.itemCalculo[index].numeroItem = (index + 1);
            tw.local.termoNadp.itemCalculo[index].valorOriginalBaseCalculoMulta = "0".currencyFormat();
            tw.local.termoNadp.itemCalculo[index].valorOriginalIcms = "0".currencyFormat();
            tw.local.termoNadp.itemCalculo[index].correcaoBaseCalculo = "0".currencyFormat();
            tw.local.termoNadp.itemCalculo[index].dataBaseJuros = null;
            tw.local.termoNadp.itemCalculo[index].dataFinalMulta = null;
            tw.local.termoNadp.itemCalculo[index].dataInicialIcms = null;
            tw.local.termoNadp.itemCalculo[index].dataInicialMulta = null;
            tw.local.termoNadp.itemCalculo[index].indiceCorrecaoBaseCalculo = "0".decimalPlaces(4);
            tw.local.termoNadp.itemCalculo[index].indiceJuros = "0".decimalPlaces(4);
            tw.local.termoNadp.itemCalculo[index].jurosIcms = "0".currencyFormat();
            tw.local.termoNadp.itemCalculo[index].fcaFinal = "0".decimalPlaces(4);
            tw.local.termoNadp.itemCalculo[index].fcaInicial = "0".decimalPlaces(4);
            tw.local.termoNadp.itemCalculo[index].valorMulta = tw.local.calcularSaidaDemonstrativoDetalhado.valorMulta == null ? "0".currencyFormat() : tw.local.calcularSaidaDemonstrativoDetalhado.valorMulta.currencyFormat();

            /**
             * Tabela de multas
             */
            var fatorMultiplicadorFormat = "Quantidade: {0}";
            tw.local.termoNadp.referenciaDaMulta = "Por sujeito passivo ou notificado";
            tw.local.termoNadp.fatorMultiplicadorDaMulta = null;

            if (tw.local.calcularSaidaDemonstrativoDetalhado.referencia != null
                 && tw.local.calcularSaidaDemonstrativoDetalhado.referencia.trim().onlyAlphabet() != "") {

                var fatorMultiplicadorNumber = 0;
                if (tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.fatorMultiplicador != null) {
                    fatorMultiplicadorNumber = tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.fatorMultiplicador.trunc();
                }
                // var fatorMultiplicadorNumber = Math.trunc(tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.fatorMultiplicador);

                tw.local.termoNadp.fatorMultiplicadorDaMulta = fatorMultiplicadorFormat.format(numberFormat.maskIt(fatorMultiplicadorNumber.toString()));

                tw.local.termoNadp.referenciaDaMulta = tw.local.calcularSaidaDemonstrativoDetalhado.referencia.trim().capitalizeFisrtLetter();
            }

            // if (tw.local.autoInfracao.demonstrativo != null
            // 	&& tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal != null) {
            // 	if (tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.fatorMultiplicador != null
            // 		&& tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.fatorMultiplicador > 1) {
            // 		var fatorMultiplicadorNumber = Math.trunc(tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.fatorMultiplicador);

            // 		tw.local.termoNadp.fatorMultiplicadorDaMulta = fatorMultiplicadorFormat.format(numberFormat.maskIt(fatorMultiplicadorNumber.toString()));

            // 		if (tw.local.calcularSaidaDemonstrativoDetalhado.referencia != null) {
            // 			tw.local.termoNadp.referenciaDaMulta = tw.local.calcularSaidaDemonstrativoDetalhado.referencia.trim().onlyAlphabet() == "" ? "" : tw.local.calcularSaidaDemonstrativoDetalhado.referencia.trim().capitalizeFisrtLetter();
            // 		}
            // 	}
            // }
        }
    }
    tw.local.flgSucesso = true;
} catch (err) {
    tw.local.termoNadp = null;
    tw.local.idDocumento = null;
    tw.local.flgSucesso = false;
    //tw.system.coachValidation.addValidationError("tw.local.msgAlertaDocumentos", "Ocorreu um erro ao gerar o termo.");
    //tw.local.
    console.log("script: Gerar variável termo. erro: " + err);
}
