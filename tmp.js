(function () {
    'use strict'

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
        }
        else {
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
        }
        else {
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
     * "123".maskIt("##-##")                => 12-3
     * "123".maskIt("##-##", "left", "0")   => 01-23
     * "123".maskIt("##-##", "l", "0")      => 01-23
     * "123".maskIt("##-##", "right", "0")  => 12-30
     * "123".maskIt("##-##", "r", "0")      => 12-30
     * "abc".maskIt("##-##", "l", "x")      => xa-bc
     * "abc".maskIt("##-##", "l", "xy")     => xya-bc
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

})();
if (tw.local.autoInfracaoWS != null) {
    tw.local.autoInfracao = {};

    /* ==== ABA DE DADOS INICIAIS ==== */
    //DADOS BASICOS DO CADASTRO INICIAL
    tw.local.autoInfracao.dadosBasicosAutuacao = {};
    tw.local.autoInfracao.dadosBasicosAutuacao.codCadastroInicial = tw.local.codCadastroInicial;
    if (tw.local.autoInfracaoWS.cadastroInicial != null) {
        tw.local.autoInfracao.dadosBasicosAutuacao.tipoAutuacao = {};
        tw.local.autoInfracao.dadosBasicosAutuacao.tipoAutuacao.value = "" + tw.local.autoInfracaoWS.cadastroInicial.codigoTipoAuto;
        tw.local.autoInfracao.dadosBasicosAutuacao.numAutoInfracaoFormulario = isNaN(tw.local.autoInfracaoWS.cadastroInicial.numeroFormularioAI) == true ? null : Number(tw.local.autoInfracaoWS.cadastroInicial.numeroFormularioAI);
        tw.local.autoInfracao.dadosBasicosAutuacao.numControle = "" + tw.local.autoInfracaoWS.cadastroInicial.numeroInstanciaCI;
        tw.local.autoInfracao.dadosBasicosAutuacao.flgTranscricaoAuto = tw.local.autoInfracaoWS.cadastroInicial.indicativoTranscricao == 1 ? true : false;
        tw.local.autoInfracao.dadosBasicosAutuacao.flgTermoDevolucao = tw.local.autoInfracaoWS.cadastroInicial.indTermoDevolucaoEmitido == 1 ? true : false;
        tw.local.autoInfracao.dadosBasicosAutuacao.codProtocoloInicial = tw.local.autoInfracaoWS.cadastroInicial.numeroControleInicial;
        tw.local.autoInfracao.dadosBasicosAutuacao.numProtocoloInicial = "" + tw.local.autoInfracaoWS.cadastroInicial.numeroControleInicial;
        tw.local.autoInfracao.dadosBasicosAutuacao.numProtocoloInicial = tw.local.autoInfracao.dadosBasicosAutuacao.numProtocoloInicial.maskIt("##.#######-#");
        tw.local.autoInfracao.dadosBasicosAutuacao.vlrUPF = tw.local.autoInfracaoWS.cadastroInicial.valorUpf;
        tw.local.autoInfracao.dadosBasicosAutuacao.numDeclaracaoITCMD = tw.local.autoInfracaoWS.cadastroInicial.numeroDeclaracaoITCMD;
        tw.local.autoInfracao.dadosBasicosAutuacao.observacao = tw.local.autoInfracaoWS.cadastroInicial.observacao;
        tw.local.autoInfracao.dadosBasicosAutuacao.dtaInicio = tw.local.autoInfracaoWS.cadastroInicial.dataInicioCI;
        tw.local.autoInfracao.dadosBasicosAutuacao.dtaFim = tw.local.autoInfracaoWS.cadastroInicial.dataFimCI;
        tw.local.autoInfracao.dadosBasicosAutuacao.descParecerAnalise = tw.local.autoInfracaoWS.cadastroInicial.descricaoParecerAnalise;
        tw.local.autoInfracao.dadosBasicosAutuacao.dtaEncerramentoProcesso = tw.local.autoInfracaoWS.cadastroInicial.dataEncerramento;
        tw.local.autoInfracao.dadosBasicosAutuacao.codCadastroInicial = tw.local.autoInfracaoWS.cadastroInicial.codigoCadastroInicial;
        tw.local.autoInfracao.dadosBasicosAutuacao.vlrUPF = tw.local.autoInfracaoWS.cadastroInicial.valorUpf;
        tw.local.autoInfracao.dadosBasicosAutuacao.qntMaxLinhasDemonstrativo = tw.local.autoInfracaoWS.cadastroInicial.quantidadeLinhasDemonstrativo;
        tw.local.autoInfracao.dadosBasicosAutuacao.pathECM = tw.local.autoInfracaoWS.cadastroInicial.caminhoECM;
        tw.local.autoInfracao.dadosBasicosAutuacao.vlrMaxCredTributario = tw.local.autoInfracaoWS.cadastroInicial.valorMaxCreditoTributario;
        tw.local.autoInfracao.dadosBasicosAutuacao.flgFecop = tw.local.autoInfracaoWS.cadastroInicial.indicativoFecop == 1 ? true : false;
        tw.local.autoInfracao.dadosBasicosAutuacao.flgSobrestado = tw.local.autoInfracaoWS.cadastroInicial.indicativoSobrestado == 1 ? true : false;
        tw.local.autoInfracao.dadosBasicosAutuacao.flgApreensao = tw.local.autoInfracaoWS.cadastroInicial.indicativoApreensao == 1 ? true : false;
        tw.local.autoInfracao.dadosBasicosAutuacao.flgSuspensaoAdministrativa = tw.local.autoInfracaoWS.cadastroInicial.indSuspensaoAdministrativa == 1 ? true : false;
        tw.local.autoInfracao.dadosBasicosAutuacao.flgSuspensaoJudicial = tw.local.autoInfracaoWS.cadastroInicial.indicativoSuspensaoJudicial == 1 ? true : false;
        tw.local.autoInfracao.dadosBasicosAutuacao.flgSuspensaoPeticao = tw.local.autoInfracaoWS.cadastroInicial.indicativoSuspensaoPorPeticao == 1 ? true : false;
        tw.local.autoInfracao.penalidade = {};
        tw.local.autoInfracao.penalidade.flgNotificacaoDefesaPrevia = tw.local.autoInfracaoWS.cadastroInicial.indicativoNecessidadeNadp == 1 ? true : false;
        tw.local.autoInfracao.penalidade.descJustificativaRejeicaoNADP = tw.local.autoInfracaoWS.cadastroInicial.descricaoJustNegacaoNadp;
        tw.local.autoInfracao.dadosBasicosAutuacao.flgAcaoJudicial = tw.local.autoInfracaoWS.cadastroInicial.indicativoAcaoJudicial == 1 ? true : false;
        tw.local.autoInfracao.dadosBasicosAutuacao.flgDescumprimento = tw.local.autoInfracaoWS.cadastroInicial.indicativoDescumprimento == 1 ? true : false;
        tw.local.autoInfracao.dadosBasicosAutuacao.flgOutraSituacao = tw.local.autoInfracaoWS.cadastroInicial.indicativoOutraSituacao == 1 ? true : false;
        tw.local.autoInfracao.dadosBasicosAutuacao.flgRiscoDecadencia = tw.local.autoInfracaoWS.cadastroInicial.indicativoRiscoDecadencia == 1 ? true : false;
    }

    //CONTEUDO DA INFRACAO
    tw.local.autoInfracao.dadosBasicosAutuacao.conteudoAutoInfracao = [];
    if (tw.local.autoInfracaoWS.conteudoInfracao != null && tw.local.autoInfracaoWS.conteudoInfracao.listLength > 0) {
        for (var i = 0; i < tw.local.autoInfracaoWS.conteudoInfracao.listLength; i++) {
            if (tw.local.autoInfracaoWS.conteudoInfracao[i].indicativoAtivo == 1) {
                tw.local.autoInfracao.dadosBasicosAutuacao.conteudoAutoInfracao[tw.local.autoInfracao.dadosBasicosAutuacao.conteudoAutoInfracao.listLength] = {};
                tw.local.autoInfracao.dadosBasicosAutuacao.conteudoAutoInfracao[tw.local.autoInfracao.dadosBasicosAutuacao.conteudoAutoInfracao.listLength - 1].codConteudoInfracao = tw.local.autoInfracaoWS.conteudoInfracao[i].codigoConteudoInfracao;
                tw.local.autoInfracao.dadosBasicosAutuacao.conteudoAutoInfracao[tw.local.autoInfracao.dadosBasicosAutuacao.conteudoAutoInfracao.listLength - 1].value = "" + tw.local.autoInfracaoWS.conteudoInfracao[i].tipoConteudoInfracao;
            }
        }
    }

    //ORDEM DE SERVICO
    if (tw.local.autoInfracaoWS.ordemServico != null) {
        tw.local.autoInfracao.dadosBasicosAutuacao.codDRR = {};
        tw.local.autoInfracao.dadosBasicosAutuacao.codDRR.value = "" + tw.local.autoInfracaoWS.ordemServico.codigoDRR;
        tw.local.autoInfracao.dadosBasicosAutuacao.codOrdemServico = tw.local.autoInfracaoWS.ordemServico.codigoOrdemServico;
        tw.local.autoInfracao.dadosBasicosAutuacao.codTarefa = {};
        tw.local.autoInfracao.dadosBasicosAutuacao.codTarefa.name = tw.local.autoInfracaoWS.ordemServico.descricaoTarefa;
        tw.local.autoInfracao.dadosBasicosAutuacao.codTarefa.value = "" + tw.local.autoInfracaoWS.ordemServico.codigoTarefa;
        tw.local.autoInfracao.dadosBasicosAutuacao.localLavratura = {};
        tw.local.autoInfracao.dadosBasicosAutuacao.localLavratura.name = tw.local.autoInfracaoWS.ordemServico.descricaoLocal;
        tw.local.autoInfracao.dadosBasicosAutuacao.localLavratura.value = "" + tw.local.autoInfracaoWS.ordemServico.codigoLocal;
        tw.local.autoInfracao.dadosBasicosAutuacao.localFiscalizacaoVolante = tw.local.autoInfracaoWS.ordemServico.descricaoLocalFiscalizacao;
        tw.local.autoInfracao.dadosBasicosAutuacao.ordemServico = {};
        tw.local.autoInfracao.dadosBasicosAutuacao.ordemServico.value = "" + tw.local.autoInfracaoWS.ordemServico.numeroOrdemServico;
        tw.local.autoInfracao.dadosBasicosAutuacao.ordemServico.name = "" + tw.local.autoInfracaoWS.ordemServico.numeroOrdemServico;
        tw.local.autoInfracao.dadosBasicosAutuacao.ordemServico.name = tw.local.autoInfracao.dadosBasicosAutuacao.ordemServico.name.maskIt("##/####/######", "l", "0");
    }

    //AUTUANTE PRINCIPAL
    if (tw.local.autoInfracaoWS.autuantePrincipal != null) {
        tw.local.autoInfracao.autuantePrincipal = {};
        tw.local.autoInfracao.autuantePrincipal.codAutuante = tw.local.autoInfracaoWS.autuantePrincipal.codigoAutuante;
        tw.local.autoInfracao.autuantePrincipal.cargo = tw.local.autoInfracaoWS.autuantePrincipal.cargo;
        tw.local.autoInfracao.autuantePrincipal.cpf = tw.local.autoInfracaoWS.autuantePrincipal.cpf;
        tw.local.autoInfracao.autuantePrincipal.login = tw.local.autoInfracaoWS.autuantePrincipal.cpf;
        tw.local.autoInfracao.autuantePrincipal.nomeCompleto = tw.local.autoInfracaoWS.autuantePrincipal.nomeAutuante;
        tw.local.autoInfracao.autuantePrincipal.rg = tw.local.autoInfracaoWS.autuantePrincipal.rg;
        tw.local.autoInfracao.autuantePrincipal.indPrincipal = tw.local.autoInfracaoWS.autuantePrincipal.indicativoPrincipal;
        tw.local.autoInfracao.autuantePrincipal.flgPrincipal = tw.local.autoInfracaoWS.autuantePrincipal.indicativoPrincipal == 1 ? true : false;
        tw.local.autoInfracao.autuantePrincipal.lotacao = tw.local.autoInfracaoWS.autuantePrincipal.lotacao;
        //tw.local.autoInfracao.autuantePrincipal.situacao = tw.local.autoInfracaoWS.autuantePrincipal.situacao != null ? tw.local.autoInfracaoWS.autuantePrincipal.situacao : "";

        if (tw.local.autoInfracaoWS.autuantePrincipal.situacao != null && tw.local.autoInfracaoWS.autuantePrincipal.situacao != "") {
            tw.local.autoInfracao.autuantePrincipal.situacao = tw.local.autoInfracaoWS.autuantePrincipal.situacao;
        } else {
            if (tw.local.autoInfracaoWS.autuantePrincipal.descricaoSituacao != null && tw.local.autoInfracaoWS.autuantePrincipal.descricaoSituacao != "") {
                tw.local.autoInfracao.autuantePrincipal.situacao = tw.local.autoInfracaoWS.autuantePrincipal.descricaoSituacao;
            } else {
                tw.local.autoInfracao.autuantePrincipal.situacao = "";
            }
        }
    }

    //AUTUANTES
    if (tw.local.autoInfracaoWS.autuantes != null && tw.local.autoInfracaoWS.autuantes.listLength > 0) {
        tw.local.autoInfracao.autuantes = [];
        for (var i = 0; i < tw.local.autoInfracaoWS.autuantes.listLength; i++) {
            if (tw.local.autoInfracaoWS.autuantes[i].indicativoAtivo == 1) {
                var index = tw.local.autoInfracao.autuantes.listLength;
                tw.local.autoInfracao.autuantes[index] = {};
                tw.local.autoInfracao.autuantes[index].codAutuante = tw.local.autoInfracaoWS.autuantes[i].codigoAutuante;
                tw.local.autoInfracao.autuantes[index].cargo = tw.local.autoInfracaoWS.autuantes[i].cargo;
                tw.local.autoInfracao.autuantes[index].cpf = tw.local.autoInfracaoWS.autuantes[i].cpf;
                tw.local.autoInfracao.autuantes[index].login = tw.local.autoInfracaoWS.autuantes[i].cpf;
                tw.local.autoInfracao.autuantes[index].nomeCompleto = tw.local.autoInfracaoWS.autuantes[i].nomeAutuante;
                tw.local.autoInfracao.autuantes[index].rg = tw.local.autoInfracaoWS.autuantes[i].rg;
                tw.local.autoInfracao.autuantes[index].indPrincipal = tw.local.autoInfracaoWS.autuantes[i].indicativoPrincipal;
                tw.local.autoInfracao.autuantes[index].flgPrincipal = tw.local.autoInfracaoWS.autuantes[i].indicativoPrincipal == 1 ? true : false;
                tw.local.autoInfracao.autuantes[index].lotacao = tw.local.autoInfracaoWS.autuantes[i].lotacao;
                //tw.local.autoInfracao.autuantes[index].situacao = tw.local.autoInfracaoWS.autuantes[i].situacao != null ? tw.local.autoInfracaoWS.autuantes[i].situacao : "";

                if (tw.local.autoInfracaoWS.autuantes[i].situacao != null && tw.local.autoInfracaoWS.autuantes[i].situacao != "") {
                    tw.local.autoInfracao.autuantes[index].situacao = tw.local.autoInfracaoWS.autuantes[i].situacao;
                } else {
                    if (tw.local.autoInfracaoWS.autuantes[i].descricaoSituacao != null && tw.local.autoInfracaoWS.autuantes[i].descricaoSituacao != "") {
                        tw.local.autoInfracao.autuantes[index].situacao = tw.local.autoInfracaoWS.autuantes[i].descricaoSituacao;
                    } else {
                        tw.local.autoInfracao.autuantes[index].situacao = "";
                    }
                }
            }
        }
    }

    /* ==== ABA DE SUJEITO PASSIVO ==== */
    tw.local.autoInfracao.sujeitoPassivo = [];
    if (tw.local.autoInfracaoWS.sujeitosPassivos != null && tw.local.autoInfracaoWS.sujeitosPassivos.listLength > 0 && tw.local.indPosDecisaoSingular != null) {
        for (var i = 0; i < tw.local.autoInfracaoWS.sujeitosPassivos.listLength; i++) {
            if (tw.local.indPosDecisaoSingular == 0) { //traz só os sujeitos passivos ativos
                if (tw.local.autoInfracaoWS.sujeitosPassivos[i].indicadorAtivo == 1) {
                    //DADOS SUJEITO PASSIVO
                    var index = tw.local.autoInfracao.sujeitoPassivo.listLength;
                    tw.local.autoInfracao.sujeitoPassivo[index] = {};
                    tw.local.autoInfracao.sujeitoPassivo[index].numOrdem = "" + (index + 1);
                    tw.local.autoInfracao.sujeitoPassivo[index].codAutuado = tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoAutuado;
                    tw.local.autoInfracao.sujeitoPassivo[index].nomeRazaoSocial = tw.local.autoInfracaoWS.sujeitosPassivos[i].nomeAutuado;
                    tw.local.autoInfracao.sujeitoPassivo[index].stsCadastralAtual = {};
                    tw.local.autoInfracao.sujeitoPassivo[index].stsCadastralAtual.name = tw.local.autoInfracaoWS.sujeitosPassivos[i].descricaoSituacaoCadastroAtual != null ? tw.local.autoInfracaoWS.sujeitosPassivos[i].descricaoSituacaoCadastroAtual : "";
                    tw.local.autoInfracao.sujeitoPassivo[index].stsCadastralAtual.value = tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoSituacaoCadastralAtual != null ? tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoSituacaoCadastralAtual + "" : "";
                    tw.local.autoInfracao.sujeitoPassivo[index].regimePagamentoAtual = {};
                    tw.local.autoInfracao.sujeitoPassivo[index].regimePagamentoAtual.value = tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoRegimePagamentoAtual != null ? "" + tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoRegimePagamentoAtual : "";
                    tw.local.autoInfracao.sujeitoPassivo[index].regimePagamentoAtual.name = tw.local.autoInfracaoWS.sujeitosPassivos[i].descricaoRegimePagamentoAtual;
                    tw.local.autoInfracao.sujeitoPassivo[index].flgSimplesFederal = tw.local.autoInfracaoWS.sujeitosPassivos[i].indicadorSimplesFederal == 1 ? true : false;
                    tw.local.autoInfracao.sujeitoPassivo[index].stsSRP = tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoSRP != null ? tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoSRP.replace(/\D/g, "") : "";
                    tw.local.autoInfracao.sujeitoPassivo[index].flgSujeitoPassivoEditado = false;
                    tw.local.autoInfracao.sujeitoPassivo[index].indMantidoLavratura = tw.local.autoInfracaoWS.sujeitosPassivos[i].indicativoMantidoLavratura;
                    tw.local.autoInfracao.sujeitoPassivo[index].email = tw.local.autoInfracaoWS.sujeitosPassivos[i].emailContato;
                    tw.local.autoInfracao.sujeitoPassivo[index].selecionadoRefazerCiencia = "Não";

                    if (tw.local.autoInfracaoWS.sujeitosPassivos[i].quantidadeAutos != null && tw.local.autoInfracaoWS.sujeitosPassivos[i].quantidadeAutos > 0) {
                        tw.local.autoInfracao.sujeitoPassivo[index].msgProcessosEmAndamento = "Este sujeito passivo possui " + tw.local.autoInfracaoWS.sujeitosPassivos[i].quantidadeAutos + " processo(s) em andamento";
                        tw.local.autoInfracao.sujeitoPassivo[index].visibilidadeIconeAtencao = "DEFAULT";
                    } else {
                        tw.local.autoInfracao.sujeitoPassivo[index].msgProcessosEmAndamento = "";
                        tw.local.autoInfracao.sujeitoPassivo[index].visibilidadeIconeAtencao = "NONE";
                    }

                    if (tw.local.autoInfracaoWS.sujeitosPassivos[i].indicativoMantidoLiquidValores == 1) {
                        tw.local.autoInfracao.sujeitoPassivo[index].mantidoLiquidacaoValores = "Sim";
                    } else if (tw.local.autoInfracaoWS.sujeitosPassivos[i].indicativoMantidoLiquidValores == 0) {
                        tw.local.autoInfracao.sujeitoPassivo[index].mantidoLiquidacaoValores = "Não";
                    } else {
                        tw.local.autoInfracao.sujeitoPassivo[index].mantidoLiquidacaoValores = "Não se aplica";
                    }

                    if (tw.local.autoInfracaoWS.sujeitosPassivos[i].indicativoMantidoRito1Inst == 1) {
                        tw.local.autoInfracao.sujeitoPassivo[index].mantidoRito1Instancia = "Sim";
                    } else if (tw.local.autoInfracaoWS.sujeitosPassivos[i].indicativoMantidoRito1Inst == 0) {
                        tw.local.autoInfracao.sujeitoPassivo[index].mantidoRito1Instancia = "Não";
                    } else {
                        tw.local.autoInfracao.sujeitoPassivo[index].mantidoRito1Instancia = "Não se aplica";
                    }

                    if (tw.local.autoInfracaoWS.sujeitosPassivos[i].cnpj != null && tw.local.autoInfracaoWS.sujeitosPassivos[i].cnpj != "") {
                        tw.local.autoInfracao.sujeitoPassivo[index].cnpj = tw.local.autoInfracaoWS.sujeitosPassivos[i].cnpj;
                    } else {
                        tw.local.autoInfracao.sujeitoPassivo[index].cnpj = tw.local.autoInfracaoWS.sujeitosPassivos[i].cpf;
                    }
                    //procurador
                    if (tw.local.autoInfracaoWS.sujeitosPassivos[i].procurador != null && tw.local.autoInfracaoWS.sujeitosPassivos[i].procurador != "") {
                        tw.local.autoInfracao.sujeitoPassivo[index].procurador = tw.local.autoInfracaoWS.sujeitosPassivos[i].procurador;
                    } else {
                        tw.local.autoInfracao.sujeitoPassivo[index].procurador = "";
                    }

                    tw.local.autoInfracao.sujeitoPassivo[index].tipoCiencia = {};
                    tw.local.autoInfracao.sujeitoPassivo[index].tipoCiencia.name = tw.local.autoInfracaoWS.sujeitosPassivos[i].descricaoTipoCiencia != null ? "" + tw.local.autoInfracaoWS.sujeitosPassivos[i].descricaoTipoCiencia : "";
                    tw.local.autoInfracao.sujeitoPassivo[index].tipoCiencia.value = tw.local.autoInfracaoWS.sujeitosPassivos[i].tipoCiencia != null ? "" + tw.local.autoInfracaoWS.sujeitosPassivos[i].tipoCiencia : "";
                    tw.local.autoInfracao.sujeitoPassivo[index].inscricaoEstadual = tw.local.autoInfracaoWS.sujeitosPassivos[i].numeroInscricaoEstadual != null ? "" + tw.local.autoInfracaoWS.sujeitosPassivos[i].numeroInscricaoEstadual : "";

                    if (tw.local.autoInfracao.sujeitoPassivo[index].inscricaoEstadual != "0") {
                        tw.local.autoInfracao.sujeitoPassivo[index].numInscricaoEstadual = tw.local.autoInfracaoWS.sujeitosPassivos[i].numeroInscricaoEstadual != null ? "" + tw.local.autoInfracaoWS.sujeitosPassivos[i].numeroInscricaoEstadual : "";
                        tw.local.autoInfracao.sujeitoPassivo[index].numInscricaoEstadual = tw.local.autoInfracao.sujeitoPassivo[index].numInscricaoEstadual.maskIt("########-##");
                    }
                    else {
                        tw.local.autoInfracao.sujeitoPassivo[index].numInscricaoEstadual = "";
                    }

                    if (tw.local.autoInfracao.sujeitoPassivo[index].stsSRP != null && tw.local.autoInfracao.sujeitoPassivo[index].stsSRP != "") {
                        tw.local.autoInfracao.sujeitoPassivo[index].numStsSRP = tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoSRP != null ? tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoSRP : "";
                        tw.local.autoInfracao.sujeitoPassivo[index].numStsSRP = tw.local.autoInfracao.sujeitoPassivo[index].numStsSRP.maskIt("#.####.###");
                    }
                    else {
                        tw.local.autoInfracao.sujeitoPassivo[index].numStsSRP = "";
                    }


                    // ENDEREÇO
                    tw.local.autoInfracao.sujeitoPassivo[index].endereco = {};
                    tw.local.autoInfracao.sujeitoPassivo[index].endereco.estadoSelecionadoCombo = {};
                    tw.local.autoInfracao.sujeitoPassivo[index].endereco.estadoSelecionadoCombo.name = tw.local.autoInfracaoWS.sujeitosPassivos[i].uf;
                    tw.local.autoInfracao.sujeitoPassivo[index].endereco.estadoSelecionadoCombo.value = tw.local.autoInfracaoWS.sujeitosPassivos[i].uf;
                    tw.local.autoInfracao.sujeitoPassivo[index].endereco.estado = tw.local.autoInfracaoWS.sujeitosPassivos[i].uf;
                    tw.local.autoInfracao.sujeitoPassivo[index].endereco.logradouro = tw.local.autoInfracaoWS.sujeitosPassivos[i].nomeLogradouro;
                    tw.local.autoInfracao.sujeitoPassivo[index].endereco.bairro = tw.local.autoInfracaoWS.sujeitosPassivos[i].bairro;
                    tw.local.autoInfracao.sujeitoPassivo[index].endereco.cidade = tw.local.autoInfracaoWS.sujeitosPassivos[i].cidade;
                    tw.local.autoInfracao.sujeitoPassivo[index].endereco.complemento = tw.local.autoInfracaoWS.sujeitosPassivos[i].complemento;
                    tw.local.autoInfracao.sujeitoPassivo[index].endereco.numero = tw.local.autoInfracaoWS.sujeitosPassivos[i].numeroLogradouro;
                    tw.local.autoInfracao.sujeitoPassivo[index].endereco.cep = tw.local.autoInfracaoWS.sujeitosPassivos[i].cep.maskIt("#####-###");

                    //VEÍCULO
                    tw.local.autoInfracao.sujeitoPassivo[index].veiculo = {};
                    tw.local.autoInfracao.sujeitoPassivo[index].veiculo.placa = tw.local.autoInfracaoWS.sujeitosPassivos[i].placaVeiculo;
                    tw.local.autoInfracao.sujeitoPassivo[index].veiculo.estadoSelecionadoCombo = {};
                    tw.local.autoInfracao.sujeitoPassivo[index].veiculo.estadoSelecionadoCombo.name = tw.local.autoInfracaoWS.sujeitosPassivos[i].ufVeiculo;
                    tw.local.autoInfracao.sujeitoPassivo[index].veiculo.estadoSelecionadoCombo.value = tw.local.autoInfracaoWS.sujeitosPassivos[i].ufVeiculo;
                    tw.local.autoInfracao.sujeitoPassivo[index].veiculo.modelo = tw.local.autoInfracaoWS.sujeitosPassivos[i].modeloVeiculo;
                    tw.local.autoInfracao.sujeitoPassivo[index].veiculo.cidade = tw.local.autoInfracaoWS.sujeitosPassivos[i].cidadeVeiculo;
                    tw.local.autoInfracao.sujeitoPassivo[index].veiculo.marca = tw.local.autoInfracaoWS.sujeitosPassivos[i].marcaVeiculo;
                }
            } else {//traz todos os sujeitos passivos
                //DADOS SUJEITO PASSIVO
                var index = tw.local.autoInfracao.sujeitoPassivo.listLength;
                tw.local.autoInfracao.sujeitoPassivo[index] = {};
                tw.local.autoInfracao.sujeitoPassivo[index].numOrdem = "" + (index + 1);
                tw.local.autoInfracao.sujeitoPassivo[index].codAutuado = tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoAutuado;
                tw.local.autoInfracao.sujeitoPassivo[index].nomeRazaoSocial = tw.local.autoInfracaoWS.sujeitosPassivos[i].nomeAutuado;
                tw.local.autoInfracao.sujeitoPassivo[index].stsCadastralAtual = {};
                tw.local.autoInfracao.sujeitoPassivo[index].stsCadastralAtual.name = tw.local.autoInfracaoWS.sujeitosPassivos[i].descricaoSituacaoCadastroAtual != null ? tw.local.autoInfracaoWS.sujeitosPassivos[i].descricaoSituacaoCadastroAtual : "";
                tw.local.autoInfracao.sujeitoPassivo[index].stsCadastralAtual.value = tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoSituacaoCadastralAtual != null ? tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoSituacaoCadastralAtual + "" : "";
                tw.local.autoInfracao.sujeitoPassivo[index].regimePagamentoAtual = {};
                tw.local.autoInfracao.sujeitoPassivo[index].regimePagamentoAtual.value = tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoRegimePagamentoAtual != null ? "" + tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoRegimePagamentoAtual : "";
                tw.local.autoInfracao.sujeitoPassivo[index].regimePagamentoAtual.name = tw.local.autoInfracaoWS.sujeitosPassivos[i].descricaoRegimePagamentoAtual;
                tw.local.autoInfracao.sujeitoPassivo[index].flgSimplesFederal = tw.local.autoInfracaoWS.sujeitosPassivos[i].indicadorSimplesFederal == 1 ? true : false;
                tw.local.autoInfracao.sujeitoPassivo[index].stsSRP = tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoSRP != null ? tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoSRP.replace(/\D/g, "") : "";
                tw.local.autoInfracao.sujeitoPassivo[index].flgSujeitoPassivoEditado = false;
                tw.local.autoInfracao.sujeitoPassivo[index].indMantidoLavratura = tw.local.autoInfracaoWS.sujeitosPassivos[i].indicativoMantidoLavratura;
                tw.local.autoInfracao.sujeitoPassivo[index].email = tw.local.autoInfracaoWS.sujeitosPassivos[i].emailContato;
                tw.local.autoInfracao.sujeitoPassivo[index].selecionadoRefazerCiencia = "Não";

                if (tw.local.autoInfracaoWS.sujeitosPassivos[i].quantidadeAutos != null && tw.local.autoInfracaoWS.sujeitosPassivos[i].quantidadeAutos > 0) {
                    tw.local.autoInfracao.sujeitoPassivo[index].msgProcessosEmAndamento = "Este sujeito passivo possui " + tw.local.autoInfracaoWS.sujeitosPassivos[i].quantidadeAutos + " processo(s) em andamento";
                    tw.local.autoInfracao.sujeitoPassivo[index].visibilidadeIconeAtencao = "DEFAULT";
                } else {
                    tw.local.autoInfracao.sujeitoPassivo[index].msgProcessosEmAndamento = "";
                    tw.local.autoInfracao.sujeitoPassivo[index].visibilidadeIconeAtencao = "NONE";
                }

                if (tw.local.autoInfracaoWS.sujeitosPassivos[i].indicativoMantidoLiquidValores == 1) {
                    tw.local.autoInfracao.sujeitoPassivo[index].mantidoLiquidacaoValores = "Sim";
                } else if (tw.local.autoInfracaoWS.sujeitosPassivos[i].indicativoMantidoLiquidValores == 0) {
                    tw.local.autoInfracao.sujeitoPassivo[index].mantidoLiquidacaoValores = "Não";
                } else {
                    tw.local.autoInfracao.sujeitoPassivo[index].mantidoLiquidacaoValores = "Não se aplica";
                }

                if (tw.local.autoInfracaoWS.sujeitosPassivos[i].indicativoMantidoRito1Inst == 1) {
                    tw.local.autoInfracao.sujeitoPassivo[index].mantidoRito1Instancia = "Sim";
                } else if (tw.local.autoInfracaoWS.sujeitosPassivos[i].indicativoMantidoRito1Inst == 0) {
                    tw.local.autoInfracao.sujeitoPassivo[index].mantidoRito1Instancia = "Não";
                } else {
                    tw.local.autoInfracao.sujeitoPassivo[index].mantidoRito1Instancia = "Não se aplica";
                }

                if (tw.local.autoInfracaoWS.sujeitosPassivos[i].cnpj != null && tw.local.autoInfracaoWS.sujeitosPassivos[i].cnpj != "") {
                    tw.local.autoInfracao.sujeitoPassivo[index].cnpj = tw.local.autoInfracaoWS.sujeitosPassivos[i].cnpj;
                } else {
                    tw.local.autoInfracao.sujeitoPassivo[index].cnpj = tw.local.autoInfracaoWS.sujeitosPassivos[i].cpf;
                }
                //procurador
                if (tw.local.autoInfracaoWS.sujeitosPassivos[i].procurador != null && tw.local.autoInfracaoWS.sujeitosPassivos[i].procurador != "") {
                    tw.local.autoInfracao.sujeitoPassivo[index].procurador = tw.local.autoInfracaoWS.sujeitosPassivos[i].procurador;
                } else {
                    tw.local.autoInfracao.sujeitoPassivo[index].procurador = "";
                }

                tw.local.autoInfracao.sujeitoPassivo[index].tipoCiencia = {};
                tw.local.autoInfracao.sujeitoPassivo[index].tipoCiencia.name = tw.local.autoInfracaoWS.sujeitosPassivos[i].descricaoTipoCiencia != null ? "" + tw.local.autoInfracaoWS.sujeitosPassivos[i].descricaoTipoCiencia : "";
                tw.local.autoInfracao.sujeitoPassivo[index].tipoCiencia.value = tw.local.autoInfracaoWS.sujeitosPassivos[i].tipoCiencia != null ? "" + tw.local.autoInfracaoWS.sujeitosPassivos[i].tipoCiencia : "";
                tw.local.autoInfracao.sujeitoPassivo[index].inscricaoEstadual = tw.local.autoInfracaoWS.sujeitosPassivos[i].numeroInscricaoEstadual != null ? "" + tw.local.autoInfracaoWS.sujeitosPassivos[i].numeroInscricaoEstadual : "";

                if (tw.local.autoInfracao.sujeitoPassivo[index].inscricaoEstadual != "0") {
                    tw.local.autoInfracao.sujeitoPassivo[index].numInscricaoEstadual = tw.local.autoInfracaoWS.sujeitosPassivos[i].numeroInscricaoEstadual != null ? "" + tw.local.autoInfracaoWS.sujeitosPassivos[i].numeroInscricaoEstadual : "";
                    tw.local.autoInfracao.sujeitoPassivo[index].numInscricaoEstadual = tw.local.autoInfracao.sujeitoPassivo[index].numInscricaoEstadual.maskIt("########-##");
                }
                else {
                    tw.local.autoInfracao.sujeitoPassivo[index].numInscricaoEstadual = "";
                }

                if (tw.local.autoInfracao.sujeitoPassivo[index].stsSRP != null && tw.local.autoInfracao.sujeitoPassivo[index].stsSRP != "") {
                    tw.local.autoInfracao.sujeitoPassivo[index].numStsSRP = tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoSRP != null ? tw.local.autoInfracaoWS.sujeitosPassivos[i].codigoSRP : "";
                    tw.local.autoInfracao.sujeitoPassivo[index].numStsSRP = tw.local.autoInfracao.sujeitoPassivo[index].numStsSRP.maskIt("#.####.###");
                }
                else {
                    tw.local.autoInfracao.sujeitoPassivo[index].numStsSRP = "";
                }


                // ENDEREÇO
                tw.local.autoInfracao.sujeitoPassivo[index].endereco = {};
                tw.local.autoInfracao.sujeitoPassivo[index].endereco.estadoSelecionadoCombo = {};
                tw.local.autoInfracao.sujeitoPassivo[index].endereco.estadoSelecionadoCombo.name = tw.local.autoInfracaoWS.sujeitosPassivos[i].uf;
                tw.local.autoInfracao.sujeitoPassivo[index].endereco.estadoSelecionadoCombo.value = tw.local.autoInfracaoWS.sujeitosPassivos[i].uf;
                tw.local.autoInfracao.sujeitoPassivo[index].endereco.estado = tw.local.autoInfracaoWS.sujeitosPassivos[i].uf;
                tw.local.autoInfracao.sujeitoPassivo[index].endereco.logradouro = tw.local.autoInfracaoWS.sujeitosPassivos[i].nomeLogradouro;
                tw.local.autoInfracao.sujeitoPassivo[index].endereco.bairro = tw.local.autoInfracaoWS.sujeitosPassivos[i].bairro;
                tw.local.autoInfracao.sujeitoPassivo[index].endereco.cidade = tw.local.autoInfracaoWS.sujeitosPassivos[i].cidade;
                tw.local.autoInfracao.sujeitoPassivo[index].endereco.complemento = tw.local.autoInfracaoWS.sujeitosPassivos[i].complemento;
                tw.local.autoInfracao.sujeitoPassivo[index].endereco.numero = tw.local.autoInfracaoWS.sujeitosPassivos[i].numeroLogradouro;
                tw.local.autoInfracao.sujeitoPassivo[index].endereco.cep = tw.local.autoInfracaoWS.sujeitosPassivos[i].cep.maskIt("#####-###");

                //VEÍCULO
                tw.local.autoInfracao.sujeitoPassivo[index].veiculo = {};
                tw.local.autoInfracao.sujeitoPassivo[index].veiculo.placa = tw.local.autoInfracaoWS.sujeitosPassivos[i].placaVeiculo;
                tw.local.autoInfracao.sujeitoPassivo[index].veiculo.estadoSelecionadoCombo = {};
                tw.local.autoInfracao.sujeitoPassivo[index].veiculo.estadoSelecionadoCombo.name = tw.local.autoInfracaoWS.sujeitosPassivos[i].ufVeiculo;
                tw.local.autoInfracao.sujeitoPassivo[index].veiculo.estadoSelecionadoCombo.value = tw.local.autoInfracaoWS.sujeitosPassivos[i].ufVeiculo;
                tw.local.autoInfracao.sujeitoPassivo[index].veiculo.modelo = tw.local.autoInfracaoWS.sujeitosPassivos[i].modeloVeiculo;
                tw.local.autoInfracao.sujeitoPassivo[index].veiculo.cidade = tw.local.autoInfracaoWS.sujeitosPassivos[i].cidadeVeiculo;
                tw.local.autoInfracao.sujeitoPassivo[index].veiculo.marca = tw.local.autoInfracaoWS.sujeitosPassivos[i].marcaVeiculo;
            }
        }
    }

    /* ==== ABA PENALIDADE ==== */
    //PENALIDADE
    if (tw.local.autoInfracaoWS.penalidade != null) {
        if (tw.local.autoInfracao.penalidade == null) {
            tw.local.autoInfracao.penalidade = {};
        }
        tw.local.autoInfracao.penalidade.textoUnicidade = {};
        tw.local.autoInfracao.penalidade.textoUnicidade.codTextoUnicidade = tw.local.autoInfracaoWS.penalidade.codigoTextoUnicidade;
        tw.local.autoInfracao.penalidade.textoUnicidade.descricaoTextoUnicidade = tw.local.autoInfracaoWS.penalidade.descricaoTextoUnicidade;
        tw.local.autoInfracao.penalidade.cdPenalidadeDominio = tw.local.autoInfracaoWS.penalidade.codigoPenalidade;
        tw.local.autoInfracao.penalidade.descInfracao = tw.local.autoInfracaoWS.penalidade.descricaoInfracao;
        tw.local.autoInfracao.penalidade.complementoInfringencia = tw.local.autoInfracaoWS.penalidade.descricaoInfringencia;
        tw.local.autoInfracao.penalidade.cdPenalidadeProcesso = tw.local.autoInfracaoWS.penalidade.codigoPenalidadeProcesso;
        if (tw.local.autoInfracaoWS.penalidade.codigoLiquidacaoValores != null && tw.local.autoInfracaoWS.penalidade.codigoLiquidacaoValores > 0) {
            tw.local.autoInfracao.penalidade.codLiquidacaoValores = tw.local.autoInfracaoWS.penalidade.codigoLiquidacaoValores;
        } else {
            tw.local.autoInfracao.penalidade.codLiquidacaoValores = null;
        }

        tw.local.autoInfracao.penalidade.indAtivo = tw.local.autoInfracaoWS.penalidade.indicativoAtivo;
        tw.local.autoInfracao.penalidade.descPenalidadeDominio = tw.local.autoInfracaoWS.penalidade.descricaoPenalidade;
        tw.local.autoInfracao.penalidade.lei = {};
        if (tw.local.autoInfracaoWS.penalidade.codigoLei != null && tw.local.autoInfracaoWS.penalidade.codigoLei > 0) {
            tw.local.autoInfracao.penalidade.lei.name = tw.local.autoInfracaoWS.penalidade.descricaoLei;
            tw.local.autoInfracao.penalidade.lei.value = tw.local.autoInfracaoWS.penalidade.codigoLei + "";
        }
        tw.local.autoInfracao.penalidade.artigo = {};
        if (tw.local.autoInfracaoWS.penalidade.codigoArtigo != null && tw.local.autoInfracaoWS.penalidade.codigoArtigo > 0) {
            tw.local.autoInfracao.penalidade.artigo.name = tw.local.autoInfracaoWS.penalidade.descricaoArtigo;
            tw.local.autoInfracao.penalidade.artigo.value = tw.local.autoInfracaoWS.penalidade.codigoArtigo + "";
        }
        tw.local.autoInfracao.penalidade.paragrafo = {};
        if (tw.local.autoInfracaoWS.penalidade.codigoParagrafo != null && tw.local.autoInfracaoWS.penalidade.codigoParagrafo > 0) {
            tw.local.autoInfracao.penalidade.paragrafo.name = tw.local.autoInfracaoWS.penalidade.descricaoParagrafo;
            tw.local.autoInfracao.penalidade.paragrafo.value = tw.local.autoInfracaoWS.penalidade.codigoParagrafo + "";
        }
        tw.local.autoInfracao.penalidade.inciso = {};
        if (tw.local.autoInfracaoWS.penalidade.codigoInciso != null && tw.local.autoInfracaoWS.penalidade.codigoInciso > 0) {
            tw.local.autoInfracao.penalidade.inciso.name = tw.local.autoInfracaoWS.penalidade.descricaoInciso;
            tw.local.autoInfracao.penalidade.inciso.value = tw.local.autoInfracaoWS.penalidade.codigoInciso + "";
        }
        tw.local.autoInfracao.penalidade.alinea = {};
        if (tw.local.autoInfracaoWS.penalidade.codigoAlinea != null && tw.local.autoInfracaoWS.penalidade.codigoAlinea > 0) {
            tw.local.autoInfracao.penalidade.alinea.name = tw.local.autoInfracaoWS.penalidade.descricaoAlinea;
            tw.local.autoInfracao.penalidade.alinea.value = tw.local.autoInfracaoWS.penalidade.codigoAlinea + "";
        }

        //PALAVRAS CHAVE
        tw.local.autoInfracao.penalidade.palavrasChave = {};
        tw.local.autoInfracao.penalidade.palavrasChave.coluna1 = [];
        tw.local.autoInfracao.penalidade.palavrasChave.coluna2 = [];
        tw.local.autoInfracao.penalidade.palavrasChave.coluna3 = [];
        if (tw.local.autoInfracaoWS.palavraChaveProcesso != null && tw.local.autoInfracaoWS.palavraChaveProcesso.listLength > 0) {
            for (var i = 0; i < tw.local.autoInfracaoWS.palavraChaveProcesso.listLength; i++) {
                var indiceColuna = i % 3;
                switch (indiceColuna) {
                    case 0:
                        var indiceColuna1 = tw.local.autoInfracao.penalidade.palavrasChave.coluna1.listLength;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna1[indiceColuna1] = {};
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna1[indiceColuna1].codPalavraChave = tw.local.autoInfracaoWS.palavraChaveProcesso[i].codigoPalavraChave;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna1[indiceColuna1].codPalavraChaveProcesso = tw.local.autoInfracaoWS.palavraChaveProcesso[i].codigoPalavraChaveProcesso;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna1[indiceColuna1].descPalavraChave = tw.local.autoInfracaoWS.palavraChaveProcesso[i].descricaoPalavraChave;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna1[indiceColuna1].listaOpcoes = [];
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna1[indiceColuna1].listaOpcoes[0] = {};
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna1[indiceColuna1].listaOpcoes[0].name = "" + tw.local.autoInfracaoWS.palavraChaveProcesso[i].descricaoOpcaoPalavraChave;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna1[indiceColuna1].listaOpcoes[0].value = "" + tw.local.autoInfracaoWS.palavraChaveProcesso[i].codigoOpcaoPalavraChave;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna1[indiceColuna1].opcaoSelecionada = {};
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna1[indiceColuna1].opcaoSelecionada.value = "" + tw.local.autoInfracaoWS.palavraChaveProcesso[i].codigoOpcaoPalavraChave;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna1[indiceColuna1].opcaoSelecionada.name = tw.local.autoInfracaoWS.palavraChaveProcesso[i].descricaoOpcaoPalavraChave;
                        break;
                    case 1:
                        var indiceColuna2 = tw.local.autoInfracao.penalidade.palavrasChave.coluna2.listLength;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna2[indiceColuna2] = {};
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna2[indiceColuna2].codPalavraChave = tw.local.autoInfracaoWS.palavraChaveProcesso[i].codigoPalavraChave;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna2[indiceColuna2].codPalavraChaveProcesso = tw.local.autoInfracaoWS.palavraChaveProcesso[i].codigoPalavraChaveProcesso;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna2[indiceColuna2].descPalavraChave = tw.local.autoInfracaoWS.palavraChaveProcesso[i].descricaoPalavraChave;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna2[indiceColuna2].listaOpcoes = [];
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna2[indiceColuna2].listaOpcoes[0] = {};
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna2[indiceColuna2].listaOpcoes[0].name = "" + tw.local.autoInfracaoWS.palavraChaveProcesso[i].descricaoOpcaoPalavraChave;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna2[indiceColuna2].listaOpcoes[0].value = "" + tw.local.autoInfracaoWS.palavraChaveProcesso[i].codigoOpcaoPalavraChave;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna2[indiceColuna2].opcaoSelecionada = {};
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna2[indiceColuna2].opcaoSelecionada.value = "" + tw.local.autoInfracaoWS.palavraChaveProcesso[i].codigoOpcaoPalavraChave;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna2[indiceColuna2].opcaoSelecionada.name = tw.local.autoInfracaoWS.palavraChaveProcesso[i].descricaoOpcaoPalavraChave;
                        break;
                    case 2:
                        var indiceColuna3 = tw.local.autoInfracao.penalidade.palavrasChave.coluna3.listLength;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna3[indiceColuna3] = {};
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna3[indiceColuna3].codPalavraChave = tw.local.autoInfracaoWS.palavraChaveProcesso[i].codigoPalavraChave;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna3[indiceColuna3].codPalavraChaveProcesso = tw.local.autoInfracaoWS.palavraChaveProcesso[i].codigoPalavraChaveProcesso;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna3[indiceColuna3].descPalavraChave = tw.local.autoInfracaoWS.palavraChaveProcesso[i].descricaoPalavraChave;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna3[indiceColuna3].listaOpcoes = [];
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna3[indiceColuna3].listaOpcoes[0] = {};
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna3[indiceColuna3].listaOpcoes[0].name = "" + tw.local.autoInfracaoWS.palavraChaveProcesso[i].descricaoOpcaoPalavraChave;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna3[indiceColuna3].listaOpcoes[0].value = "" + tw.local.autoInfracaoWS.palavraChaveProcesso[i].codigoOpcaoPalavraChave;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna3[indiceColuna3].opcaoSelecionada = {};
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna3[indiceColuna3].opcaoSelecionada.value = "" + tw.local.autoInfracaoWS.palavraChaveProcesso[i].codigoOpcaoPalavraChave;
                        tw.local.autoInfracao.penalidade.palavrasChave.coluna3[indiceColuna3].opcaoSelecionada.name = tw.local.autoInfracaoWS.palavraChaveProcesso[i].descricaoOpcaoPalavraChave;
                        break;
                }
            }
        }
    }

    /* === ABA DEMONSTRATIVO === */
    if (tw.local.autoInfracaoWS.demonstrativo != null && tw.local.autoInfracaoWS.demonstrativo.listLength > 0) {
        tw.local.autoInfracao.demonstrativo = {};
        tw.local.autoInfracao.historicoDemonstrativoPrincipal = [];
        tw.local.autoInfracao.historicoDemonstrativoApoio = [];
        tw.local.autoInfracao.historicoDemonstrativoParcial = [];
        for (var i = 0; i < tw.local.autoInfracaoWS.demonstrativo.listLength; i++) {
            //var count = 0;	
            if (tw.local.autoInfracaoWS.demonstrativo.listLength == 1 || tw.local.autoInfracaoWS.demonstrativo[i].indicativoPrincipalAtual == 1) {
                //Valores demonstrativo
                tw.local.autoInfracao.demonstrativo.codDemonstrativo = tw.local.autoInfracaoWS.demonstrativo[i].codigoDemonstrativo;
                tw.local.autoInfracao.demonstrativo.descJustificativa = tw.local.autoInfracaoWS.demonstrativo[i].descricaoMotivo;
                tw.local.autoInfracao.demonstrativo.dtaFimDia = tw.local.autoInfracaoWS.demonstrativo[i].dataFimDia;
                tw.local.autoInfracao.demonstrativo.dtaInicioDia = tw.local.autoInfracaoWS.demonstrativo[i].dataInicioDia;
                tw.local.autoInfracao.demonstrativo.fatoGeradorAntigo = tw.local.autoInfracaoWS.demonstrativo[i].dataFatoGeradorAntigo;
                tw.local.autoInfracao.demonstrativo.fatoGeradorRecente = tw.local.autoInfracaoWS.demonstrativo[i].dataFatoGeradorRecente;
                tw.local.autoInfracao.demonstrativo.codRegraCalculo = tw.local.autoInfracaoWS.demonstrativo[i].codigoRegraCalculo;
                tw.local.autoInfracao.demonstrativo.codTarefaDiligencia = tw.local.autoInfracaoWS.demonstrativo[i].codigoTarefaEncaminhamento;
                tw.local.autoInfracao.demonstrativo.numDemonstrativo = tw.local.autoInfracaoWS.demonstrativo[i].numeroDemonstrativo;
                tw.local.autoInfracao.demonstrativo.tipoCalculo = tw.local.autoInfracaoWS.demonstrativo[i].indCalculoMultaMontanteImposto == 0 ? false : true;
                tw.local.autoInfracao.demonstrativo.tipoDemonstrativo = {};
                tw.local.autoInfracao.demonstrativo.tipoDemonstrativo.value = "" + tw.local.autoInfracaoWS.demonstrativo[i].tipoDemonstrativo;
                tw.local.autoInfracao.demonstrativo.codPenalidadeProcesso = tw.local.autoInfracaoWS.demonstrativo[i].codigoPenalidadeProcesso;
                tw.local.autoInfracao.demonstrativo.origem = tw.local.autoInfracaoWS.demonstrativo[i].descricaoSituacao;
                tw.local.autoInfracao.demonstrativo.IndDemonstrativoZerado = tw.local.autoInfracaoWS.demonstrativo[i].indicativoDemonstrativoZerado;

                //DEMONSTRATIVO POR DATA
                tw.local.autoInfracao.demonstrativo.demonstrativoData = [];
                if (tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoData != null && tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoData.listLength > 0) {
                    var vlrTotalImposto = 0;
                    var vlrTotalMulta = 0;
                    for (var x = 0; x < tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoData.listLength; x++) {
                        tw.local.autoInfracao.demonstrativo.demonstrativoData[x] = {};
                        var numLinha = x + 1;
                        tw.local.autoInfracao.demonstrativo.demonstrativoData[x].numLinha = numLinha;
                        tw.local.autoInfracao.demonstrativo.demonstrativoData[x].codDemData = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoData[x].codigoDemonstrativoData;
                        tw.local.autoInfracao.demonstrativo.demonstrativoData[x].dtaCorrecao = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoData[x].dataCorrecaoBaseMulta;
                        tw.local.autoInfracao.demonstrativo.demonstrativoData[x].dtaDeterminacao = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoData[x].dataValorImposto;
                        tw.local.autoInfracao.demonstrativo.demonstrativoData[x].vlrCorrecao = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoData[x].valorCorrecaoBaseMulta;
                        tw.local.autoInfracao.demonstrativo.demonstrativoData[x].vlrDeterminacao = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoData[x].valorOriginalImposto;
                        tw.local.autoInfracao.demonstrativo.demonstrativoData[x].visValorMulta = "DEFAULT";
                        vlrTotalImposto += tw.local.autoInfracao.demonstrativo.demonstrativoData[x].vlrDeterminacao;
                        vlrTotalMulta += tw.local.autoInfracao.demonstrativo.demonstrativoData[x].vlrCorrecao;
                    }
                    tw.local.autoInfracao.demonstrativo.vlrTotalMulta = vlrTotalMulta;
                    tw.local.autoInfracao.demonstrativo.vlrTotalImposto = vlrTotalImposto;
                    tw.local.autoInfracao.demonstrativo.vlrTotal = tw.local.autoInfracao.demonstrativo.vlrTotalMulta + tw.local.autoInfracao.demonstrativo.vlrTotalImposto;
                }
                //DEMONSTRATIVO MULTA FORMAL
                else if (tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoMultaFormal != null && tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoMultaFormal.listLength > 0) {
                    tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal = {};
                    tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.codDemMultaFormal = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoMultaFormal[0].codigoDemonstrativoMultaFormal;
                    tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.vlrUmUPF = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoMultaFormal[0].valorUpf;
                    tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.imposto = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoMultaFormal[0].valorImposto;
                    tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.juros = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoMultaFormal[0].valorJuros;
                    tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.multa = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoMultaFormal[0].valorMulta;
                    tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.qtde = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoMultaFormal[0].quantidadeMultaFormal;
                    tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.total = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoMultaFormal[0].valorTotal;
                    tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.fatorMultiplicador = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoMultaFormal[0].fatorMultiplicador;
                    tw.local.autoInfracao.demonstrativo.demonstrativoMultaFormal.baseMultaUPF = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoMultaFormal[0].valorBaseMultaUPF;
                    tw.local.autoInfracao.demonstrativo.vlrTotal = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoMultaFormal[0].valorTotal;
                    tw.local.autoInfracao.demonstrativo.vlrTotalMulta = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoMultaFormal[0].valorTotal;
                    tw.local.autoInfracao.demonstrativo.vlrTotalImposto = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoMultaFormal[0].valorImposto;
                }
                //DEMONSTRATIVO PERIODO
                else if (tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoPeriodo != null && tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoPeriodo.listLength > 0) {
                    tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo = {};
                    tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.codDemPeriodo = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoPeriodo[0].codigoDemonstrativoPeriodo;
                    tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaFimCorrecao = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoPeriodo[0].dataFimCorrecaoBaseMulta;
                    tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaFimDeterminacao = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoPeriodo[0].dataFimValorImposto;
                    tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaInicioCorrecao = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoPeriodo[0].dataInicioCorrecaoBaseMulta;
                    tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.dtaInicioDeterminacao = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoPeriodo[0].dataInicioValorImposto;
                    tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.vlrCorrecao = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoPeriodo[0].valorCorrecaoBaseMulta;
                    tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.vlrDeterminacao = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoPeriodo[0].valorImposto;
                    tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.visValorMulta = "DEFAULT";
                    tw.local.autoInfracao.demonstrativo.vlrTotalMulta = tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.vlrCorrecao;
                    tw.local.autoInfracao.demonstrativo.vlrTotalImposto = tw.local.autoInfracao.demonstrativo.demonstrativoPeriodo.vlrDeterminacao;
                    tw.local.autoInfracao.demonstrativo.vlrTotal = tw.local.autoInfracao.demonstrativo.vlrTotalMulta + tw.local.autoInfracao.demonstrativo.vlrTotalImposto;
                }
                //DEMONSTRATIVO POR DOCUMENTO
                if (tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoDoc != null) {
                    tw.local.autoInfracao.demonstrativo.demonstrativoDoc = {};
                    tw.local.autoInfracao.demonstrativo.demonstrativoDoc.codDemDocumento = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoDoc.codigoDemonstrativoDocumento;
                    tw.local.autoInfracao.demonstrativo.demonstrativoDoc.codDocumentoECM = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoDoc.codigoDocumentoEcm;
                    tw.local.autoInfracao.demonstrativo.demonstrativoDoc.dtaInclusao = tw.local.autoInfracaoWS.demonstrativo[i].demonstrativoDoc.dataInclusao;
                    tw.local.autoInfracao.demonstrativo.flgAddArquivoDemonstrativo = true;
                } else {
                    tw.local.autoInfracao.demonstrativo.flgAddArquivoDemonstrativo = false;
                }
            }

            //HISTORICO DE DEMONSTRATIVO
            var historicoDemonstrativo = new tw.object.HistoricoDemonstrativoONEPAF();
            historicoDemonstrativo.codDemonstrativo = tw.local.autoInfracaoWS.demonstrativo[i].codigoDemonstrativo;
            historicoDemonstrativo.data = tw.local.autoInfracaoWS.demonstrativo[i].dataDemonstrativo;
            historicoDemonstrativo.origem = tw.local.autoInfracaoWS.demonstrativo[i].descricaoSituacao;
            historicoDemonstrativo.responsavel = {};
            historicoDemonstrativo.responsavel.name = tw.local.autoInfracaoWS.demonstrativo[i].nomeResponsavel;
            historicoDemonstrativo.responsavel.value = tw.local.autoInfracaoWS.demonstrativo[i].cpfUsuarioInclusao;
            historicoDemonstrativo.numDemonstrativo = tw.local.autoInfracaoWS.demonstrativo[i].numeroDemonstrativo;
            historicoDemonstrativo.principalAtual = {};
            historicoDemonstrativo.principalAtual.value = tw.local.autoInfracaoWS.demonstrativo[i].indicativoPrincipalAtual + "";
            if (historicoDemonstrativo.principalAtual.value == 1) {
                historicoDemonstrativo.principalAtual.name = "Sim";
            } else {
                historicoDemonstrativo.principalAtual.name = "Não";
            }
            historicoDemonstrativo.baseCalculo = {};
            historicoDemonstrativo.baseCalculo.value = tw.local.autoInfracaoWS.demonstrativo[i].indicativoBaseCalculo + "";
            if (historicoDemonstrativo.baseCalculo.value == 1) {
                historicoDemonstrativo.baseCalculo.name = "Sim";
            } else {
                historicoDemonstrativo.baseCalculo.name = "Não";
            }
            historicoDemonstrativo.tipoParcial = {};
            historicoDemonstrativo.tipoParcial.value = tw.local.autoInfracaoWS.demonstrativo[i].indicativoTipoParcial + "";
            if (historicoDemonstrativo.tipoParcial.value == 0) {
                historicoDemonstrativo.tipoParcial.name = "Pagamento específico";
            } else if (historicoDemonstrativo.tipoParcial.value == 1) {
                historicoDemonstrativo.tipoParcial.name = "Resíduo pendente";
            } else {
                historicoDemonstrativo.tipoParcial.name = "";
            }
            historicoDemonstrativo.statusParcial = {};
            historicoDemonstrativo.statusParcial.value = tw.local.autoInfracaoWS.demonstrativo[i].statusDemonstrativoEspecifico + "";
            if (historicoDemonstrativo.statusParcial.value == 0) {
                historicoDemonstrativo.statusParcial.name = "Aguardando pagamento";
            } else if (historicoDemonstrativo.statusParcial.value == 1) {
                if (historicoDemonstrativo.tipoParcial.value == 0) {
                    historicoDemonstrativo.statusParcial.name = "Pago";
                } else {
                    historicoDemonstrativo.statusParcial.name = "Efetivado";
                }
            } else if (historicoDemonstrativo.statusParcial.value == 2) {
                if (historicoDemonstrativo.tipoParcial.value == 1) {
                    historicoDemonstrativo.statusParcial.name = "Efetivado";
                } else {
                    historicoDemonstrativo.statusParcial.name = "Parcelado";
                }
            } else if (historicoDemonstrativo.statusParcial.value == 3) {
                historicoDemonstrativo.statusParcial.name = "Cancelado";
            } else {
                historicoDemonstrativo.statusParcial.name = "";
            }
            //Demonstrativo Principal
            if (tw.local.autoInfracaoWS.demonstrativo[i].indTipoResponsavel == 0) {
                tw.local.autoInfracao.historicoDemonstrativoPrincipal[tw.local.autoInfracao.historicoDemonstrativoPrincipal.listLength] = historicoDemonstrativo;
            }
            //Demonstrativo Parcial
            else if (tw.local.autoInfracaoWS.demonstrativo[i].indTipoResponsavel == 2) {
                tw.local.autoInfracao.historicoDemonstrativoParcial[tw.local.autoInfracao.historicoDemonstrativoParcial.listLength] = historicoDemonstrativo;
            }
            //Demonstrativo Apoio
            else {
                tw.local.autoInfracao.historicoDemonstrativoApoio[tw.local.autoInfracao.historicoDemonstrativoApoio.listLength] = historicoDemonstrativo;
            }
        }
        //INICIALIZA DEMONSTRATIVO HISTORICO
        tw.local.autoInfracao.demonstrativoHistoricoSelecionado = {};
        tw.local.autoInfracao.demonstrativoHistoricoSelecionado.demonstrativoSelecionado = tw.local.autoInfracao.demonstrativo;
        if (tw.local.autoInfracao.penalidade != null) {
            tw.local.autoInfracao.demonstrativoHistoricoSelecionado.codPenalidadeDominioDemonstrativo = tw.local.autoInfracao.penalidade.cdPenalidadeDominio;
            tw.local.autoInfracao.demonstrativoHistoricoSelecionado.leiPenalidadeDominioDemonstrativo = tw.local.autoInfracao.penalidade.lei;
            tw.local.autoInfracao.demonstrativoHistoricoSelecionado.artigoPenalidadeDominioDemonstrativo = tw.local.autoInfracao.penalidade.artigo;
            tw.local.autoInfracao.demonstrativoHistoricoSelecionado.paragrafoPenalidadeDominioDemonstrativo = tw.local.autoInfracao.penalidade.paragrafo;
            tw.local.autoInfracao.demonstrativoHistoricoSelecionado.incisoPenalidadeDominioDemonstrativo = tw.local.autoInfracao.penalidade.inciso;
            tw.local.autoInfracao.demonstrativoHistoricoSelecionado.alineaPenalidadeDominioDemonstrativo = tw.local.autoInfracao.penalidade.alinea;
            tw.local.autoInfracao.demonstrativoHistoricoSelecionado.descPenalidadeDominioDemonstrativo = tw.local.autoInfracao.penalidade.descPenalidadeDominio;
        }
        tw.local.autoInfracao.demonstrativoHistoricoSelecionado.codDemonstrativoSelecionado = tw.local.autoInfracao.demonstrativo.codDemonstrativo;
        tw.local.autoInfracao.demonstrativoHistoricoSelecionado.flgDemonstrativoPrincipalSelecionado = false;
        tw.local.autoInfracao.demonstrativoHistoricoSelecionado.flgDemonstrativoParcialSelecionado = false;
        tw.local.autoInfracao.demonstrativoHistoricoSelecionado.flgDemonstrativoApoioSelecionado = false;
    }



    /* === ABA CREDITO TRIBUTARIO === */
    //Dados de credito tributário e saldo devedor
    tw.local.autoInfracao.creditoTributario = {};
    tw.local.autoInfracao.creditoTributario.descDemonstrativoBaseCalculo = "Clique no botão para obter os dados atualizados";
    tw.local.autoInfracao.creditoTributario.descDemonstrativoPrincipalAtual = "Clique no botão para obter os dados atualizados";
    tw.local.autoInfracao.creditoTributario.dtaInicio = new Date();
    tw.local.autoInfracao.creditoTributario.pagamentosRealizados = [];
    tw.local.autoInfracao.creditoTributario.parcelamentosRealizados = [];
    tw.local.autoInfracao.creditoTributario.baseCalcAtualMulta = (0).toFixed(2);
    tw.local.autoInfracao.creditoTributario.vlrOriginal = (0).toFixed(2);
    tw.local.autoInfracao.creditoTributario.jurosImposto = (0).toFixed(2);
    tw.local.autoInfracao.creditoTributario.jurosMulta = (0).toFixed(2);
    tw.local.autoInfracao.creditoTributario.multa = (0).toFixed(2);
    tw.local.autoInfracao.creditoTributario.total = (0).toFixed(2);
    tw.local.autoInfracao.creditoTributario.saldoDevedor = (0).toFixed(2);
    tw.local.autoInfracao.creditoTributario.suspensao = [];
    tw.local.autoInfracao.creditoTributario.debitosRemanescentesSemReducao = {};
    tw.local.autoInfracao.creditoTributario.debitosRemanescentesComReducao = {};

    //Dados de pagamento realizado
    tw.local.autoInfracao.creditoTributario.pagamentosRealizados = [];
    if (tw.local.autoInfracaoWS.pagamento != null && tw.local.autoInfracaoWS.pagamento.listLength > 0) {
        for (var i = 0; i < tw.local.autoInfracaoWS.pagamento.listLength; i++) {
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i] = {};
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].codPagamentoRealizado = tw.local.autoInfracaoWS.pagamento[i].cdPagamentoRealizado;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].codigoCadastroInicial = tw.local.autoInfracaoWS.pagamento[i].codigoCadastroInicial;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].codigoSolicitacaoCalculo = tw.local.autoInfracaoWS.pagamento[i].cdSolicitacaoCalculoPagamento;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].dataPagamento = tw.local.autoInfracaoWS.pagamento[i].dataPagamento;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].valor = tw.local.autoInfracaoWS.pagamento[i].valor;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numeroAuto = tw.local.autoInfracaoWS.pagamento[i].numeroAuto;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numAuto = "" + tw.local.autoInfracaoWS.pagamento[i].numeroAuto;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numAuto = tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numAuto.maskIt("#######-#");
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].identificadorSujeitoPassivo = tw.local.autoInfracaoWS.pagamento[i].identificadorSujeitoPassivo;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].indicativoTipoPagamento = tw.local.autoInfracaoWS.pagamento[i].indicativoTipoPagamento;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numeroInstanciaPagamento = tw.local.autoInfracaoWS.pagamento[i].numeroInstanciaPagamento;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].indicativoSituacao = tw.local.autoInfracaoWS.pagamento[i].indicativoSituacao;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].indicativoOrigem = tw.local.autoInfracaoWS.pagamento[i].indicativoOrigem;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].indicativoSiscredInvalido = tw.local.autoInfracaoWS.pagamento[i].indicativoSiscredInvalido;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].parecerVerificacaoSiscred = tw.local.autoInfracaoWS.pagamento[i].parecerVerificacaoSiscred;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numeroGRPR = tw.local.autoInfracaoWS.pagamento[i].numeroGRPR;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numCertificadoSISCRED = tw.local.autoInfracaoWS.pagamento[i].numeroCertificadoSiscred;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].codRefis = tw.local.autoInfracaoWS.pagamento[i].codigoRefis;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].percReducaoCreditoMulta = tw.local.autoInfracaoWS.pagamento[i].percReducaoCreditoMulta;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].percReducaoCreditoJurosMulta = tw.local.autoInfracaoWS.pagamento[i].percReducaoCreditoJurosMulta;
            tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].percReducaoCreditoJurosImposto = tw.local.autoInfracaoWS.pagamento[i].percReducaoCreditoJurosImposto;
            if (tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].indicativoOrigem == 0) {//SISCRED
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].descOrigem = "SISCRED";
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].descTipoIdentificador = "Número do certificado";
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numeroIdentificador = tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numCertificadoSISCRED;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numIdentificador = "" + tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numCertificadoSISCRED;
            } else if (tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].indicativoOrigem == 1) { //SGR
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].descOrigem = "SGR";
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].descTipoIdentificador = "Número SEFA da guia";
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numeroIdentificador = tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numeroGRPR;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numIdentificador = "" + tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numeroGRPR;
            } else { //REGISTRO INVALIDO
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].descOrigem = "ERRO, origem inválida";
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].descTipoIdentificador = "ERRO, desconhecido";
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].numeroIdentificador = null;
            }
            if (tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].indicativoSituacao == 0) {
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].descSituacao = "Ativo";
            } else {
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].descSituacao = "Cancelado";
            }
            if (tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].indicativoTipoPagamento == 0) {
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].descTipoPagamento = "Total";
            } else if (tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].indicativoTipoPagamento == 1) {
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].descTipoPagamento = "Especifico";
            } else if (tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].indicativoTipoPagamento == 2) {
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].descTipoPagamento = "Genérico";
            } else {
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].descTipoPagamento = "ERRO, desconhecido";
            }
            if (tw.local.autoInfracaoWS.pagamento[i].codigoPagamentoSGR != null && tw.local.autoInfracaoWS.pagamento[i].codigoPagamentoSGR > 0) {
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR = {};
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.codPagamentoSGR = tw.local.autoInfracaoWS.pagamento[i].codigoPagamentoSGR;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.codigoBanco = tw.local.autoInfracaoWS.pagamento[i].codigoBanco;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.nomeBanco = tw.local.autoInfracaoWS.pagamento[i].nomeBanco;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.numeroEPAF = tw.local.autoInfracaoWS.pagamento[i].numeroEPAF;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.dataArrecadacao = tw.local.autoInfracaoWS.pagamento[i].dataArrecadacao;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.valorReceita = tw.local.autoInfracaoWS.pagamento[i].valorReceita;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.valorMulta = tw.local.autoInfracaoWS.pagamento[i].valorMulta;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.valorJuros = tw.local.autoInfracaoWS.pagamento[i].valorJuros;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.valorAcrescimoFinanceiro = tw.local.autoInfracaoWS.pagamento[i].valorAcrescimoFinanceiro;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.numeroIndiceReferencial = tw.local.autoInfracaoWS.pagamento[i].numeroIndiceReferencial;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.infAutenticacaoBancaria = tw.local.autoInfracaoWS.pagamento[i].infAutenticacaoBancaria;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.numeroSefa = tw.local.autoInfracaoWS.pagamento[i].numeroSefa;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.numeroChaveBanco = tw.local.autoInfracaoWS.pagamento[i].numeroChaveBanco;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.dataInclusao = tw.local.autoInfracaoWS.pagamento[i].DataInclusao;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.indicativoValidade = tw.local.autoInfracaoWS.pagamento[i].indicativoValidade;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.valorTotal = tw.local.autoInfracaoWS.pagamento[i].valorTotal;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.numeroInscricao = tw.local.autoInfracaoWS.pagamento[i].numeroInscricao;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.indicativoInscricao = tw.local.autoInfracaoWS.pagamento[i].indicativoInscricao;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.codigoRegistro = tw.local.autoInfracaoWS.pagamento[i].codigoRegistro;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.codigoReceita = tw.local.autoInfracaoWS.pagamento[i].codigoReceita;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.cadICMS = tw.local.autoInfracaoWS.pagamento[i].cadICMS;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.tipoDocumento = tw.local.autoInfracaoWS.pagamento[i].tipoDocumento;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.numeroSequenciaRegistro = tw.local.autoInfracaoWS.pagamento[i].numeroSequenciaRegistro;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.indTentativasConsolidada = tw.local.autoInfracaoWS.pagamento[i].indTentativasConsolidada;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.indGuiaConsolidada = tw.local.autoInfracaoWS.pagamento[i].indicativoGuiaConsolidada;
                tw.local.autoInfracao.creditoTributario.pagamentosRealizados[i].pagamentoSGR.indLimiteAtingido = tw.local.autoInfracaoWS.pagamento[i].indicativoLimiteAtingido;
            }
        }
    }

    //Dados de parcelamento realizado
    tw.local.autoInfracao.creditoTributario.parcelamentosRealizados = [];
    if (tw.local.autoInfracaoWS.parcelamento != null && tw.local.autoInfracaoWS.parcelamento.listLength > 0) {
        for (var i = 0; i < tw.local.autoInfracaoWS.parcelamento.listLength; i++) {
            if (tw.local.autoInfracaoWS.parcelamento[i] != null) {
                var index = tw.local.autoInfracao.creditoTributario.parcelamentosRealizados.listLength;
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index] = {};

                //Codigos
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].codigoParcelamentoRealizado = tw.local.autoInfracaoWS.parcelamento[i].cdParcelamentoRealizado;
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].codigoCadastroInicial = tw.local.autoInfracaoWS.parcelamento[i].codigoCadastroInicial;
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].codigoAutuado = tw.local.autoInfracaoWS.parcelamento[i].codigoAutuado;

                //Datas
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].dataOperacao = tw.local.autoInfracaoWS.parcelamento[i].dataOperacao;
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].dataParcelamento = tw.local.autoInfracaoWS.parcelamento[i].dataParcelamento;

                //Indicadores
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].indicativoAnuenciaTodos = tw.local.autoInfracaoWS.parcelamento[i].indicativoAnuenciaTodos;
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].indicativoOperacao = tw.local.autoInfracaoWS.parcelamento[i].indicativoOperacao;
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].indicativoParcelamento = tw.local.autoInfracaoWS.parcelamento[i].indicativoParcelamento;
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].indicativoSituacao = tw.local.autoInfracaoWS.parcelamento[i].indicativoSituacao;

                //Outros
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].cadICMS = tw.local.autoInfracaoWS.parcelamento[i].cadICMS + "";
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].cnpj = tw.local.autoInfracaoWS.parcelamento[i].cnpj;
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].cpf = tw.local.autoInfracaoWS.parcelamento[i].cpf;
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].numeroInstancia = tw.local.autoInfracaoWS.parcelamento[i].numeroInstancia;
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].numeroTap = tw.local.autoInfracaoWS.parcelamento[i].numeroTap;
                if (tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].numeroTap != null && tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].numeroTap > 0) {
                    tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].numTapTxt = "" + tw.local.autoInfracaoWS.parcelamento[i].numeroTap;
                    tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].numTapTxt = tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].numTapTxt.maskIt("##.#####-#", "l", "0");
                }
                tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].valor = tw.local.autoInfracaoWS.parcelamento[i].valor;
                if (tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].indicativoSituacao == 0) {
                    tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].descSituacao = "Ativo";
                } else {
                    tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].descSituacao = "Cancelado";
                }
                if (tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].indicativoAnuenciaTodos == 0) {
                    tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].descAnuenciaDeTodos = "Parcial";
                } else {
                    tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].descAnuenciaDeTodos = "Total";
                }
                if (tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].indicativoParcelamento == 0) {
                    tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].descTipo = "AI";
                } else {
                    tw.local.autoInfracao.creditoTributario.parcelamentosRealizados[index].descTipo = "AIPE";
                }

            }
        }
    }

    //Dados suspensao
    tw.local.autoInfracao.creditoTributario.suspensao = [];
    if (tw.local.autoInfracaoWS.suspensao != null && tw.local.autoInfracaoWS.suspensao.listLength > 0) {
        for (var i = 0; i < tw.local.autoInfracaoWS.suspensao.listLength; i++) {
            tw.local.autoInfracao.creditoTributario.suspensao[i] = {};
            tw.local.autoInfracao.creditoTributario.suspensao[i].codigoSuspensao = tw.local.autoInfracaoWS.suspensao[i].codigoSuspensao;
            tw.local.autoInfracao.creditoTributario.suspensao[i].codigoCadastroInicial = tw.local.autoInfracaoWS.suspensao[i].codigoCadastroInicial;
            tw.local.autoInfracao.creditoTributario.suspensao[i].codigoDemonstrativo = tw.local.autoInfracaoWS.suspensao[i].codigoDemonstrativo;
            tw.local.autoInfracao.creditoTributario.suspensao[i].codigoCreditoTributario = tw.local.autoInfracaoWS.suspensao[i].codigoCreditoTributario;
            tw.local.autoInfracao.creditoTributario.suspensao[i].codigoAcaoJudicial = tw.local.autoInfracaoWS.suspensao[i].codigoAcaoJudicial;
            tw.local.autoInfracao.creditoTributario.suspensao[i].indicativoAcao = tw.local.autoInfracaoWS.suspensao[i].indicativoAcao;
            tw.local.autoInfracao.creditoTributario.suspensao[i].descricaoParecerOficio = tw.local.autoInfracaoWS.suspensao[i].descricaoParecerOficio;
            if (tw.local.autoInfracao.creditoTributario.suspensao[i].descricaoParecerOficio != null
                && tw.local.autoInfracao.creditoTributario.suspensao[i].descricaoParecerOficio != ""
                && tw.local.autoInfracao.creditoTributario.suspensao[i].descricaoParecerOficio == "Ativo") {
                tw.local.autoInfracao.creditoTributario.suspensao[i].descricaoParecerOficio = "Petição (sem subclassificação)";
            }
            tw.local.autoInfracao.creditoTributario.suspensao[i].descricaoParecerElab = tw.local.autoInfracaoWS.suspensao[i].descricaoParecerElab;
            tw.local.autoInfracao.creditoTributario.suspensao[i].numeroInstancia = tw.local.autoInfracaoWS.suspensao[i].numeroInstancia;
            tw.local.autoInfracao.creditoTributario.suspensao[i].cpfUsuarioInclusao = tw.local.autoInfracaoWS.suspensao[i].cpfUsuarioInclusao;
            tw.local.autoInfracao.creditoTributario.suspensao[i].dataInicio = tw.local.autoInfracaoWS.suspensao[i].dataInicio;
            tw.local.autoInfracao.creditoTributario.suspensao[i].dataFim = tw.local.autoInfracaoWS.suspensao[i].dataFim;
            tw.local.autoInfracao.creditoTributario.suspensao[i].tipoSuspensao = tw.local.autoInfracaoWS.suspensao[i].tipoSuspensao;
            tw.local.autoInfracao.creditoTributario.suspensao[i].nomeUsuarioInclusao = tw.local.autoInfracaoWS.suspensao[i].nomeUsuarioInclusao;
            if (tw.local.autoInfracao.creditoTributario.suspensao[i].tipoSuspensao != null) {
                if (tw.local.autoInfracao.creditoTributario.suspensao[i].tipoSuspensao == 0) {
                    tw.local.autoInfracao.creditoTributario.suspensao[i].descricaoTipoSuspensao = "Judicial";
                } else if (tw.local.autoInfracao.creditoTributario.suspensao[i].tipoSuspensao == 1) {
                    tw.local.autoInfracao.creditoTributario.suspensao[i].descricaoTipoSuspensao = "Administrativa";
                }
            }
            tw.local.autoInfracao.creditoTributario.suspensao[i].identificadorAcaoJudicial = tw.local.autoInfracaoWS.suspensao[i].identificadorAcaoJudicial;
            tw.local.autoInfracao.creditoTributario.suspensao[i].descricaoTipoOficio = tw.local.autoInfracaoWS.suspensao[i].descricaoTipoOficio;
        }
    }

    /* === ABA HISTORICO AUTUACAO === */
    tw.local.autoInfracao.historicoAutuacao = [];
    /*
    if (tw.local.autoInfracaoWS.historicoProcesso != null && tw.local.autoInfracaoWS.historicoProcesso.listLength > 0) {
        for (var i = 0; i < tw.local.autoInfracaoWS.historicoProcesso.listLength; i++) {
            if (tw.local.autoInfracaoWS.historicoProcesso[i] != null) {
                var index = tw.local.autoInfracao.historicoAutuacao.listLength;
                tw.local.autoInfracao.historicoAutuacao[index] = {};
                tw.local.autoInfracao.historicoAutuacao[index].descParecer = tw.local.autoInfracaoWS.historicoProcesso[i].descricaoParecer;
                tw.local.autoInfracao.historicoAutuacao[index].descRespTituloParecer = tw.local.autoInfracaoWS.historicoProcesso[i].descricaoRespostaTituloParecer;
                tw.local.autoInfracao.historicoAutuacao[index].descTituloParecer = tw.local.autoInfracaoWS.historicoProcesso[i].descricaoTituloParecer;
                tw.local.autoInfracao.historicoAutuacao[index].dtaInclusao = tw.local.autoInfracaoWS.historicoProcesso[i].dataInclusao;
                tw.local.autoInfracao.historicoAutuacao[index].evento = tw.local.autoInfracaoWS.historicoProcesso[i].evento;
                tw.local.autoInfracao.historicoAutuacao[index].movimentadoPor = tw.local.autoInfracaoWS.historicoProcesso[i].movimentadoPor;
                tw.local.autoInfracao.historicoAutuacao[index].numSequencial = tw.local.autoInfracaoWS.historicoProcesso[i].numeroSequencial;
                tw.local.autoInfracao.historicoAutuacao[index].tipoEvento = tw.local.autoInfracaoWS.historicoProcesso[i].tipoEvento;
                tw.local.autoInfracao.historicoAutuacao[index].indicativoObjetoAdicional = tw.local.autoInfracaoWS.historicoProcesso[i].indicativoObjetoAdicional;
                tw.local.autoInfracao.historicoAutuacao[index].descricaoObjetoAdicional = tw.local.autoInfracaoWS.historicoProcesso[i].descricaoObjetoAdicional;
                tw.local.autoInfracao.historicoAutuacao[index].numeroControleManifestacao = tw.local.autoInfracaoWS.historicoProcesso[i].numeroControleManifestacao;
                tw.local.autoInfracao.historicoAutuacao[index].indicativoSituacaoCadastro = tw.local.autoInfracaoWS.historicoProcesso[i].indicativoSituacaoCadastro;
            	
                if (tw.local.autoInfracaoWS.historicoProcesso[i].listaDocumentos != null && tw.local.autoInfracaoWS.historicoProcesso[i].listaDocumentos.listLength > 0) {
                    tw.local.autoInfracao.historicoAutuacao[index].lstDocumentos = [];
                    for (var j = 0; j < tw.local.autoInfracaoWS.historicoProcesso[i].listaDocumentos.listLength; j++) {
                        if (tw.local.autoInfracaoWS.historicoProcesso[i].listaDocumentos[j] != null) {
                            var index2 = tw.local.autoInfracao.historicoAutuacao[index].lstDocumentos.listLength;
                            tw.local.autoInfracao.historicoAutuacao[index].lstDocumentos[index2] = {};
                            tw.local.autoInfracao.historicoAutuacao[index].lstDocumentos[index2].nomeArquivo = tw.local.autoInfracaoWS.historicoProcesso[i].listaDocumentos[j].nomeArquivo;
                            tw.local.autoInfracao.historicoAutuacao[index].lstDocumentos[index2].nomeDocumento = tw.local.autoInfracaoWS.historicoProcesso[i].listaDocumentos[j].nomeDocumento;
                            tw.local.autoInfracao.historicoAutuacao[index].lstDocumentos[index2].dtaInclusao = tw.local.autoInfracaoWS.historicoProcesso[i].listaDocumentos[j].dataInclusao;
                            tw.local.autoInfracao.historicoAutuacao[index].lstDocumentos[index2].idDocumento = tw.local.autoInfracaoWS.historicoProcesso[i].listaDocumentos[j].idDocumento;
                            tw.local.autoInfracao.historicoAutuacao[index].lstDocumentos[index2].redator = tw.local.autoInfracaoWS.historicoProcesso[i].listaDocumentos[j].redator;
                            tw.local.autoInfracao.historicoAutuacao[index].lstDocumentos[index2].urlDocumento = tw.local.autoInfracaoWS.historicoProcesso[i].listaDocumentos[j].URLDocumento;
                                        tw.local.autoInfracao.historicoAutuacao[index].lstDocumentos[index2].visibilidade = tw.local.autoInfracaoWS.historicoProcesso[i].listaDocumentos[j].visibilidade;
                                        tw.local.autoInfracao.historicoAutuacao[index].lstDocumentos[index2].tamanhoArquivo = tw.local.autoInfracaoWS.historicoProcesso[i].listaDocumentos[j].tamanhoArquivo;
                        }
                    }
                }
            	
                if (tw.local.autoInfracaoWS.historicoProcesso[i].valoresCampo  != null && tw.local.autoInfracaoWS.historicoProcesso[i].valoresCampo.listLength > 0) {
                        tw.local.autoInfracao.historicoAutuacao[index].lstNameValuePair = [];
                        for (var j = 0; j < tw.local.autoInfracaoWS.historicoProcesso[i].valoresCampo.listLength; j++) {
                            if (tw.local.autoInfracaoWS.historicoProcesso[i].valoresCampo[j] != null) {
                                var index2 = tw.local.autoInfracao.historicoAutuacao[index].lstNameValuePair.listLength;
                                tw.local.autoInfracao.historicoAutuacao[index].lstNameValuePair[index2] = {};
                                tw.local.autoInfracao.historicoAutuacao[index].lstNameValuePair[index2].name = tw.local.autoInfracaoWS.historicoProcesso[i].valoresCampo[j].nomeCampo;
                                tw.local.autoInfracao.historicoAutuacao[index].lstNameValuePair[index2].value = tw.local.autoInfracaoWS.historicoProcesso[i].valoresCampo[j].valorCampo;
                            }
                        }
                    }
            }
        }
    }
    */
    /* === DADOS NADP === */
    if (tw.local.autoInfracaoWS.defesaPrevia != null) {
        tw.local.autoInfracao.defesaPrevia = {};
        tw.local.autoInfracao.defesaPrevia.codDefesaPrevia = tw.local.autoInfracaoWS.defesaPrevia.codigoDefesaPrevia;
        tw.local.autoInfracao.defesaPrevia.descNotificacaoDefesaPrevia = tw.local.autoInfracaoWS.defesaPrevia.descNotificacaoDefesaPrevia;
        tw.local.autoInfracao.defesaPrevia.descJustificativaNaoAprovacao = tw.local.autoInfracaoWS.defesaPrevia.descJustificativaNaoAprovado;
        tw.local.autoInfracao.defesaPrevia.descParecerAnaliseRecusa = tw.local.autoInfracaoWS.defesaPrevia.descParecerAnalisePrevia;
        tw.local.autoInfracao.defesaPrevia.descJustificativaConcordaDefesa = tw.local.autoInfracaoWS.defesaPrevia.descJustConcordaDefesaPrevia;
        tw.local.autoInfracao.defesaPrevia.descJustificativaNovaNotificacao = tw.local.autoInfracaoWS.defesaPrevia.desJustNovaNotificacao;
        tw.local.autoInfracao.defesaPrevia.dtaInicio = tw.local.autoInfracaoWS.defesaPrevia.dataInicio;
        tw.local.autoInfracao.defesaPrevia.dtaFim = tw.local.autoInfracaoWS.defesaPrevia.dataFim;
        tw.local.autoInfracao.defesaPrevia.flgAprovado = tw.local.autoInfracaoWS.defesaPrevia.indicaAprovado == 1 ? true : false;
        tw.local.autoInfracao.defesaPrevia.flgConcordaDefesaPrevia = tw.local.autoInfracaoWS.defesaPrevia.indicaConcordaDefesaPrevia == 1 ? true : false;
        tw.local.autoInfracao.defesaPrevia.flgEncaminhaOutroFiscal = tw.local.autoInfracaoWS.defesaPrevia.indicaEncaminhaOutroFiscal == 1 ? true : false;
        tw.local.autoInfracao.defesaPrevia.flgNecessitaNovaDefesa = tw.local.autoInfracaoWS.defesaPrevia.indNecessidadeNovaNotificacao == 1 ? true : false;
        tw.local.autoInfracao.defesaPrevia.nomeOutroFiscal = tw.local.autoInfracaoWS.defesaPrevia.nomeOutroFiscal;
        tw.local.autoInfracao.defesaPrevia.cpfOutroFiscal = tw.local.autoInfracaoWS.defesaPrevia.cpfOutroFiscal;
        tw.local.autoInfracao.defesaPrevia.numInstancia = "" + tw.local.autoInfracaoWS.defesaPrevia.numeroInstancia;
        tw.local.autoInfracao.defesaPrevia.flgRevisional = tw.local.autoInfracaoWS.defesaPrevia.indicaRevisional == 1 ? true : false;
        tw.local.autoInfracao.defesaPrevia.dtaInicioDefesa = tw.local.autoInfracaoWS.defesaPrevia.dataInicioAguardarDefesa;
        tw.local.autoInfracao.defesaPrevia.dtaFimDefesa = tw.local.autoInfracaoWS.defesaPrevia.dataFimAguardarDefesa;
        tw.local.autoInfracao.defesaPrevia.codProtocoloNadp = tw.local.autoInfracaoWS.defesaPrevia.numeroControleNADP;
        tw.local.autoInfracao.defesaPrevia.numRevisional = tw.local.autoInfracaoWS.defesaPrevia.numeroRevisional;
        tw.local.autoInfracao.defesaPrevia.dtaGeracao = tw.local.autoInfracaoWS.defesaPrevia.dataGeracao;
    }

    /* === DADOS LAVRATURA === */
    if (tw.local.autoInfracaoWS.lavratura != null) {
        tw.local.autoInfracao.lavratura = {};
        tw.local.autoInfracao.lavratura.codAutoInfracao = tw.local.autoInfracaoWS.lavratura.codigoAutoInfracao;
        if (tw.local.autoInfracaoWS.lavratura.codigoAutoInfracao != null &&
            tw.local.autoInfracaoWS.lavratura.codigoAutoInfracao != 0) {
            tw.local.autoInfracao.lavratura.numAutoInfracao = "" + tw.local.autoInfracaoWS.lavratura.codigoAutoInfracao;
            tw.local.autoInfracao.lavratura.numAutoInfracao = tw.local.autoInfracao.lavratura.numAutoInfracao.maskIt("#######-#");
        }
        tw.local.autoInfracao.lavratura.codLavratura = tw.local.autoInfracaoWS.lavratura.codigoLavratura;
        tw.local.autoInfracao.lavratura.descJustificativa = tw.local.autoInfracaoWS.lavratura.justificativa;
        tw.local.autoInfracao.lavratura.dtaLavratura = tw.local.autoInfracaoWS.lavratura.dataLavratura;
        tw.local.autoInfracao.lavratura.dtaUltimaCiencia = tw.local.autoInfracaoWS.lavratura.dataUltimaCiencia;
        tw.local.autoInfracao.lavratura.flgIncluirSujeitoPassivo = tw.local.autoInfracaoWS.lavratura.indIncluirSujeitoPassivo == 1 ? true : false;
        tw.local.autoInfracao.lavratura.flgRefazerDefesaPrevia = tw.local.autoInfracaoWS.lavratura.indicativoRefazerDefesaPrevia == 1 ? true : false;
        tw.local.autoInfracao.lavratura.flgRetencaoMercadoria = tw.local.autoInfracaoWS.lavratura.indicativoRetencaoMercadoria == 1 ? true : false;
        tw.local.autoInfracao.lavratura.numInstancia = "" + tw.local.autoInfracaoWS.lavratura.numeroInstancia;
        tw.local.autoInfracao.lavratura.vlrUPF = tw.local.autoInfracaoWS.lavratura.valorUpf;
        tw.local.autoInfracao.lavratura.numProtocolo = tw.local.autoInfracaoWS.lavratura.numeroControle;
        tw.local.autoInfracao.lavratura.numRevisional = tw.local.autoInfracaoWS.lavratura.numeroRevisional;
    }

    /* === DADOS RITO 1 INSTANCIA === */
    if (tw.local.autoInfracaoWS.ritoPrimeiraInstancia != null) {
        tw.local.autoInfracao.codRitoPrimeiraInstancia = tw.local.autoInfracaoWS.ritoPrimeiraInstancia.codigoRito1Instancia;
        tw.local.autoInfracao.codDiligencia = tw.local.autoInfracaoWS.ritoPrimeiraInstancia.codigoDiligencia;
        tw.local.autoInfracao.codParecerPrimeiraInstancia = tw.local.autoInfracaoWS.ritoPrimeiraInstancia.codigoParecer;
    }

    /* === ABA ANOTAÇÕES === */
    tw.local.autoInfracao.anotacoes = [];
    tw.local.autoInfracao.msgAlertaAnotacao = "";

    /* === Atividades Pendentes Histórico === */
    tw.local.autoInfracao.atividadesPendentes = [];

}