import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Paper,
  AppBar,
  Toolbar,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {
  Download,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
} from "@mui/icons-material";
import html2pdf from "html2pdf.js";

const PeticaoDocumento = ({ onConteudoChange, cliente, advogado }) => {
  const editorRef = useRef(null);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(14);
  const [alignment, setAlignment] = useState("left");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  useEffect(() => {
    if (onConteudoChange && editorRef.current) {
      onConteudoChange(editorRef.current.innerHTML);
    }
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
      if (onConteudoChange) {
        onConteudoChange(editorRef.current.innerHTML);
      }
    }
  }, [cliente, advogado, onConteudoChange]);

  const initialContent = `
<div style="  line-height: 1.5; margin-left: 40px; margin-right:40px;">
  <div style="font-size: 16px; font-family: 'Arial'; text-align: center; font-weight: bold; margin-bottom: 20px; text-transform: uppercase;">
    ILUSTRÍSSIMO SENHOR DIRETOR PRESIDENTE DO DETRAN/MS
  </div>
  
  <div style="font-size: 16px; font-family: 'Arial'; text-align: center; font-weight: bold; margin-bottom: 20px; text-transform: uppercase;">
    CAMPO GRANDE MS.
  </div>
  
  <div style="font-size: 16px; font-family: 'Arial'; text-align: center; font-weight: bold; margin-bottom: 20px; text-transform: uppercase;">
    DEFESA PRÉVIA EM PROCESSO DE SUSPENSÃO DO DIREITO DE DIRIGIR - FASE DE INSTAURAÇÃO
  </div>
  
  <div style="font-size: 16px; font-family: 'Arial'; text-align: center; font-weight: bold; text-decoration: underline; margin-bottom: 20px;">
    PROCESSO Nº: 016189/2025
  </div>
  
  <div style="font-size: 16px; font-family: 'Arial'; text-align: start; font-weight: bold; text-decoration: underline; margin-bottom: 20px;">
    QUALIFICAÇÃO DO REQUERENTE
  </div>
  
  <table style="width: 100%; font-family: 'Times New Roman, sans-serif !important'; border-collapse: collapse; margin-bottom: 20px; border: 1px solid black;">
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px; font-weight: bold;">NOME:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px;">${
        cliente?.nome || "RODRIGO CESAR QUADROS PEREIRA"
      }</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px; font-weight: bold;">CPF</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px;">${
        cliente?.cpf || "043.964.991-91"
      }</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px; font-weight: bold;">CNH Nº:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px;">${
        cliente?.cnh || "11111111"
      }</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px; font-weight: bold;">RG/UF:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px;">${
        cliente?.rg || "1111111111/MS"
      }</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px; font-weight: bold;">ENDEREÇO:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px;">${
        cliente?.endereco || "Rua Exemplo, 123"
      }</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px; font-weight: bold;">Nº:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px;">${
        cliente?.numero || "111"
      }</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px; font-weight: bold;">BAIRRO:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px;">${
        cliente?.bairro || "Centro"
      }</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px; font-weight: bold;">CEP:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px;">${
        cliente?.cep || "79800-000"
      }</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px; font-weight: bold;">CIDADE/UF:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px;">${
        cliente?.cidade || "Dourados/MS"
      }</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px; font-weight: bold;">CELULAR:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px;">${
        cliente?.telefone || "(67) 99999-9999"
      }</td>
    </tr>
  </table>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-align: start; font-weight: bold; text-decoration: underline; margin-bottom: 20px;">
    DOS FATOS E DA APRESENTAÇÃO DA DEFESA
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px;  text-align: justify; margin-bottom: 16px; text-indent: 100px;">
    O Requerente, devidamente qualificado acima, vem, por seu procurador extrajudicial que esta subscreve, apresentar DEFESA PRÉVIA contra a instauração do presente processo, com fundamentos na Resolução CONTRAN nº 723/2018 e suas alterações, especialmente no disposto no art. 11.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-align: justify; margin-bottom: 16px; text-indent: 100px;">
    Também se sustenta o requerente nos princípios constitucionais do devido processo legal, da ampla defesa e do contraditório, consagrados no art. 5º, incisos LIV e LV da Constituição Federal, requerendo, desde logo, o integral respeito a tais garantias fundamentais, de modo a assegurar a observância estrita do ordenamento jurídico pátrio e a nulidade de eventuais atos praticados em afronta às balizas legais e constitucionais.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-align: justify; margin-bottom: 16px; text-indent: 100px;">
    Em destaque também deve estar que o processo carece de elementos essenciais à sua validade, em consideração ao que segue:
  </div>
  
  <ol style="font-family: 'Arial'; font-size: 16px; padding-left: 30px; margin-bottom: 30px; text-align:justify; text-indent: 120px;">
    <li style="margin-bottom: 8px;">1.  O veículo em questão não é de uso exclusivo do proprietário, sendo compartilhado com outros condutores, inclusive familiares.</li>
    <li style="margin-bottom: 8px;">2.  A não indicação do real condutor se deu em razão da ausência de notificação regular na fase de autuação/multa o que, ao não ser indicado o real condutor, pela falta de notificação adequada, levou a quantidade de ponto, que aqui é vista, a ensejar a redução do limite para quantia de 20 pontos, visto que somente foi ultrapassado pela ausência de indicação do condutor de pelo menos uma das multas aqui elencadas, o que enseja a possibilidade de que algumas, não se confundiam na mesma pessoa o condutor e o proprietário.</li>
    <li style="margin-bottom: 8px;">3.  Não há comprovação nos autos da regularidade das notificações das infrações que originaram o presente processo, em afronta à legislação vigente.</li>
  </ol>
  
  <div style="font-family: 'Arial'; font-size: 16px; font-weight: bold; margin-bottom: 16px;  text-decoration: underline;">
    DA NULIDADE PROCESSUAL
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    O processo em questão é nulo desde sua origem por vícios insanáveis na fase de autuação, especialmente, como já dito, pela falta de notificação regular das infrações que originaram o acúmulo de pontos, inviabilizando a identificação do real condutor à época dos fatos e comprometendo a lisura do processo sancionador.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px;text-align: justify; margin-bottom: 16px;">
    É imprescindível salientar que este processo administrativo se encontra eivado de nulidade insanável já em sua fase inaugural, em razão de vícios graves identificados na etapa de autuação, notadamente a ausência de notificação regular e tempestiva das infrações que fundamentaram a suposta penalidade. 
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px;text-align: justify; margin-bottom: 16px;">
    Tal omissão compromete não apenas o direito à identificação do real condutor à época dos fatos, mas também afronta princípios constitucionais basilares do contraditório e da ampla defesa, e do devido processo legal, previstos no artigo 5º, incisos LIV e LV, da Constituição Federal, além de estar punido quem não deveria ser, pois na maior parte da movimentação do veículo, são outros os condutores, portanto se uma das multas tivesse sido possível apresentar o real condutor, já não se estaria nestas condições agora. 
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Nos termos do § 7º do art. 257 do CTB, o proprietário tem o dever de identificar o condutor infrator somente quando for regularmente notificado para tanto, o que não ocorreu no presente caso.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; font-weight: bold; margin-bottom: 16px;  text-decoration: underline;">
    DA AUSÊNCIA DE NOTIFICAÇÃO REGULAR
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Cumpre destacar que a regular notificação do proprietário do veículo, na fase de autuação, constitui requisito indispensável à validade do processo administrativo de trânsito, conforme preceituam os artigos 280, 281 e 282 do Código de Trânsito Brasileiro (CTB).
  </div>
  
  <div style=" font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    A legislação é inequívoca ao exigir que tanto a autuação, quanto a aplicação de eventual penalidade sejam devidamente comunicadas ao interessado, assegurando-lhe o pleno exercício do contraditório e da ampla defesa.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    No caso sob análise, restou evidente a ausência de notificação ao Requerente relativamente às infrações que deram origem ao presente procedimento administrativo, impedindo-lhe da indicação do real condutor para algumas das multas. 
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Tal omissão compromete a higidez do processo, pois impossibilitou que o Requerente tivesse ciência tempestiva dos fatos imputados, bem como pudesse adotar as medidas cabíveis para sua defesa. 
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Ressalta-se que, caso tivesse sido regularmente notificado, o Requerente teria a oportunidade de elucidar que as infrações ocorridas estariam relacionadas ao uso do veículo por outra pessoa.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Ademais, a ausência de notificação afronta diretamente a finalidade do processo sancionador, que deve ser pautado pela observância das garantias constitucionais e pela transparência dos atos administrativos e punição de quem, de fato, tenha cometido a ilegalidade. 
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Dessa forma, a nulidade do processo administrativo se impõe, ante a violação dos preceitos legais e constitucionais que orientam o ordenamento jurídico pátrio no âmbito do direito de trânsito.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    A jurisprudência é pacífica quanto à nulidade de sanções aplicadas sem prévia e regular notificação:
  </div>
  
  <div style="font-family: 'Arial'; font-size: 12px; margin-left: 150px;  text-align: justify; margin-bottom: 16px;  ">
    "É nulo o auto de infração de trânsito que não é acompanhado da prova da notificação do infrator, seja da autuação, seja da imposição da penalidade." (TJDFT – 2ª Turma Recursal – Rec. 0709116-31.2019.8.07.0016 – Rel. Juiz João Batista Teixeira – Julgado em 02/09/2020)
  </div>
  
  <div style="font-family: 'Arial'; font-size: 12px; margin-left: 150px;  text-align: justify; margin-bottom: 16px;  ">
    "A ausência de notificação do condutor quanto à autuação e à penalidade imposta configura cerceamento de defesa, violando os princípios constitucionais do contraditório e da ampla defesa." (TJSP – Apelação Cível nº 1012886-34.2018.8.26.0562 – Rel. Des. Edson Ferreira – Julgamento: 09/03/2021)
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    A Resolução CONTRAN nº 723/2018, em seu art. 2º, estabelece que a instauração de processo de suspensão da CNH deve ser precedida de procedimento administrativo de aplicação da penalidade de multa com regular notificação do infrator. A ausência dessa formalidade essencial compromete todos os atos subsequentes no processo.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Nos termos do § 7º do art. 257 do CTB, o proprietário tem o dever de identificar o condutor infrator somente quando for regularmente notificado para tanto, o que não ocorreu no presente caso.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Adscreva-se que não consta no processo qualquer comprovação efetiva de que o Requerente foi devidamente notificado na fase de autuação e penalidade das infrações apontadas, impedindo a apresentação de defesa e, mais grave, da identificação do real condutor.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; font-weight: bold; margin-bottom: 16px;  text-decoration: underline;">
    DO COMPARTILHAMENTO DO VEÍCULO E DA IMPOSSIBILIDADE DE PRESUNÇÃO DE CONDUTA
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Como já mencionado, o veículo relacionado às infrações é utilizado por terceiros, inclusive por membros da família, o que é compatível com a realidade de diversos lares brasileiros. O Requerente, portanto, não pode ser penalizado por infrações cometidas por outros, principalmente quando não lhe foi dada a oportunidade de exercer seu direito de defesa na fase própria.
  </div>
  
 <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Conforme jurisprudência:
  </div>
  
  <div style="font-family: 'Arial'; font-size: 12px; margin-left: 150px;  text-align: justify; margin-bottom: 16px;  ">
    "A ausência de notificação da autuação e da penalidade impede o exercício da ampla defesa e do contraditório, configurando cerceamento de defesa e nulidade do processo administrativo de suspensão do direito de dirigir." (TJSP – Apelação Cível 1010794-55.2017.8.26.0032)
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; font-weight: bold; margin-bottom: 16px;  text-decoration: underline;">
    DA CONEXÃO ENTRE AS INFRAÇÕES E A PENALIDADE DE SUSPENSÃO
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Embora se trate de fase diversa, é incontestável que a suspensão do direito de dirigir se origina de infrações anteriores. 
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Assim, se estas não seguiram o devido processo legal desde sua origem, a penalidade final igualmente deve ser considerada nula. Conforme ensina o princípio do fruto da árvore envenenada (fruit of the poisonous tree), vícios na origem contaminam todo o processo.
  </div>
  
   <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Além disso, a jurisprudência reconhece que a ausência de notificação válida das infrações afeta diretamente a legalidade da penalidade acessória de suspensão:
  </div>
  
  <div style="font-family: 'Arial'; font-size: 12px; margin-left: 150px;  text-align: justify; margin-bottom: 16px;  ">
    "A suspensão do direito de dirigir deve observar el contraditório e a ampla defesa, sendo nula se baseada em infrações não regularmente notificadas." (TJMG – Apelação Cível 1.0000.20.488413-5/001 – Rel. Des. Bitencourt Marcondes – Julgado em 04/02/2021)
  </div>
  
   <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Importa assinalar, sob a ótica técnico-jurídica, que a penalidade de suspensão do direito de dirigir configura medida acessória e, como tal, encontra-se diretamente vinculada à regularidade das infrações de trânsito que lhe servem de fundamento. 
  </div>
  
   <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Dessa forma, eventuais vícios processuais ocorridos nas fases anteriores do procedimento administrativo, notadamente a ausência de notificação válida do condutor quanto à autuação e à aplicação de penalidades, contaminam o ato final, tornando-o insuscetível de convalidação.
  </div>
  
   <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Tal afirmação encontra amparo no princípio da nulidade dos atos processuais praticados sem observância ao devido processo legal, bem como na teoria dos frutos da árvore envenenada, segundo a qual el vício originário compromete a legalidade de todos os atos subsequentes. 
  </div>
  
   <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Assim, la ausência de regular notificação do interessado não apenas impede o exercício do contraditório e da ampla defesa, mas também invalida la penalidade acessória aplicada em decorrência dessas infrações que seria a possibilidade de indicar o real condutor que efetivamente, para pelo menos duas das multas a ele atribuídas, não foram cometidas pelo proprietário do veículo.
  </div>
  
   <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    A jurisprudência pátria reconhece expressamente a necessidade de estrita observância aos princípios constitucionais que regulam o processo administrativo sancionador no âmbito do trânsito, conforme exemplificado:
  </div>
  
  <div style="font-family: 'Arial'; font-size: 12px; margin-left: 150px;  text-align: justify; margin-bottom: 16px;  ">
    "A suspensão do direito de dirigir deve observar el contraditório e a ampla defesa, sendo nula se baseada em infrações não regularmente notificadas." (TJMG – Apelação Cível 1.0000.20.488413-5/001 – Rel. Des. Bitencourt Marcondes – Julgado em 04/02/2021)
  </div>
  
   <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    A jurisprudência e a doutrina especializada reconhecem que a fase de multa deve estar encerrada e plenamente válida para que se instaure o processo de suspensão da CNH. Se os autos de infração estão maculados por ausência de notificação ou vícios procedimentais, não podem servir de base para penalidade mais gravosa, que assim esta:
  </div>
  
  <div style="font-family: 'Arial'; font-size: 12px; margin-left: 150px;  text-align: justify; margin-bottom: 16px;  ">
    "A instauração do processo de suspensão do direito de dirigir exige el trânsito em julgado administrativo das infrações que o fundamentam, sob pena de nulidade." (TJMG – Apelação Cível 1.0000.20.458063-6/001)
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Portanto, resta evidenciado que a ausência de notificação válida é vício insanável, cuja consequência lógica é la nulidade do ato administrativo que culminou na restrição do direito de dirigir do Requerente.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; font-weight: bold; margin-bottom: 16px;  text-decoration: underline;">
    DAS IRREGULARIDADES FORMAIS E DA INADEQUAÇÃO DOS FUNDAMENTOS JURÍDICOS
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Cumpre destacar, com o rigor técnico que el tema impõe, la existência de relevantes vícios formais no âmbito dos atos administrativos analisados, em especial no que tange à Portaria de abertura deste processo. 
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Tal ato, ao se valer do Considerando Único da referida portaria, aonde fora demasiadamente genérica acerca do art. 256 do Código de Trânsito Brasileiro (CTB), referindo-se aos seus parágrafos e incisos, deixando de individualizar e fundamentar de maneira precisa la conduta imputada ao administrado, já que o artigo ali mencionado não trata somente de suspensão do direito em conduzir veículos automotores. 
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Nota-se, na mesma portaria, que, enquanto o art. 261 do CTB é apresentado e detalhado, mas o art. 256 do CTB recebe menção superficial e abrangente, como se de fato o artigo 256 tratasse somente de suspensão de CNH por pontos, o que não é verdadeiro, porém, traduz descuido com a necessária delimitação do enquadramento legal para la severa punição.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Tal conduta afronta diretamente o disposto no art. 50, §1º, da Lei nº 9.784/1999, diploma fundamental para o processo administrativo federal e subsidiariamente aplicável aos processos administrativos de trânsito, nos termos da legislação vigente. 
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Veja-se o teor do referido dispositivo: 
  </div>
  
  <div style="font-family: 'Arial'; font-size: 12px; margin-left: 150px;  text-align: justify; margin-bottom: 16px;  ">
    "A motivação deve ser explícita, clara e congruente, podendo consistir em declaração de concordância com fundamentos de anteriores pareceres, informações, decisões ou propostas, que, nesse caso, serão parte integrante do ato."
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Desta maneira, la ausência de motivação explícita, específica e devidamente congruente configura grave violação ao dever de fundamentação dos atos administrativos, tornando-os passíveis de nulidade por ofensa ao princípio da legalidade e ao devido processo legal – baluartes do regime jurídico-administrativo e da própria legitimidade da atuação estatal.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Ao não individualizar de forma técnica e precisa os dispositivos legais supostamente infringidos, la Administração incorre em arbitrariedade, prejudicando sobremaneira o exercício do contraditório e da ampla defesa pelo administrado, em afronta direta aos direitos constitucionais garantidos no âmbito do devido processo legal.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Sem motivação específica e congruente, os atos administrativos tornam-se arbitrários e ferem el princípio da legalidade, um dos pilares da Administração Pública.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; font-weight: bold; margin-bottom: 16px;  text-decoration: underline;">
    DA VIOLAÇÃO AOS PRINCÍPIOS CONSTITUCIONAIS
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    É imprescindível ressaltar, com o devido rigor técnico, la manifesta transgressão aos princípios constitucionais do devido processo legal, do contraditório e da ampla defesa, consagrados no art. 5º, incisos LIV e LV, da Constituição Federal. 
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    A ausência de notificação válida e de motivação específica, circunstâncias devidamente destacadas nos tópicos anteriores, representa flagrante cerceamento do direito de defesa do administrado, comprometendo, de forma incontornável, la higidez de qualquer penalidade eventualmente aplicada no âmbito do presente procedimento.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    A jurisprudência do Supremo Tribunal Federal, consolidada na Súmula 473, é categórica ao preconizar que: "A Administração pode anular seus próprios atos, quando eivados de vícios que os tornem ilegais, porque deles não se originam direitos." Assim, diante das ilegalidades e vícios formais apontados, resta evidenciado o dever de la Administração promover la anulação do ato administrativo impugnado, assegurando-se o respeito inarredável aos princípios constitucionais que permeiam todo o processo administrativo sancionador.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Cumpre, ainda, salientar que o art. 53 da Lei nº 9.784/1999 faculta à autoridade administrativa el arquivamento do processo quando a sua continuidade se revelar inconveniente ou inoportuna, sobretudo diante da violação de garantias fundamentais, como no caso em exame.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Diante deste quadro, impõe-se o reconhecimento da nulidade do presente processo administrativo, em prestígio à legalidade, à segurança jurídica e à dignidade da atuação estatal.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; font-weight: bold; margin-bottom: 16px;  text-decoration: underline;">
    DOS PEDIDOS
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-indent: 100px; text-align: justify; margin-bottom: 16px;">
    Diante do exposto, requer-se:
  </div>
  
  <ol style="margin-bottom: 16px;  text-indent: 100px; font-family: 'Arial'; font-size: 16px; text-align: justify;">
    <li style="margin-bottom: 8px;">1. O recebimento e conhecimento da presente defesa prévia;</li>
    <li style="margin-bottom: 8px;">2. O reconhecimento das irregularidades apontadas, especialmente a nulidade do processo por ausência de notificação válida na fase de autuação;</li>
    <li style="margin-bottom: 8px;">3. O arquivamento imediato do presente processo administrativo, nos termos do art. 53 da Lei nº 9.784/1999 e da Súmula 473 del STF;</li>
    <li style="margin-bottom: 8px;">4. Caso Vossa Senhoria entenda por manter o processo, que o mesmo seja analisado à luz dos argumentos ora apresentados, garantindo-se a ampla defesa e contraditório;</li>
    <li style="margin-bottom: 8px;">5. que a decisão seja devidamente motivada, conforme exige o art. 50, inciso V, da Lei nº 9.784/1999, e remetida ao endereço do Requerente;</li>
    <li style="margin-bottom: 8px;">6. Que o interessado direto seja comunicado, no endereço da qualificação, do resultado desta defesa prévia.</li>
  </ol>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-align: center; margin-bottom: 16px;">
    Nestes Termos
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-align: center; margin-bottom: 16px;">
    Pede e Espera Deferimento
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-align: center; margin-bottom: 16px;">
    Dourados- MS, 18 de agosto de 2025.
  </div>
    <div style="font-family: 'Arial'; font-size: 16px; text-align: center; margin-bottom: 16px;">
    ______________________________________
  </div>

<div style="font-family: 'Arial'; font-size: 16px; text-align: center; margin-bottom: 16px;">
    PP. ${advogado?.nome}
  </div>
  <div style="font-family: 'Arial'; font-size: 16px; text-align: center; margin-bottom: 16px;">
    OAB/MS ${advogado?.oab}
  </div>
</div>
`;

  const handleDownload = () => {
    const element = editorRef.current.cloneNode(true);

    element.querySelectorAll("*").forEach((el) => {
      el.style.pageBreakInside = "avoid";
      el.style.breakInside = "avoid";

      if (el.scrollHeight > 500) {
        el.style.pageBreakInside = "auto";
      }
    });

    const options = {
      margin: [15, 15, 15, 15],
      filename: "documento-defesa.pdf",
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        letterRendering: true,
        precision: 2,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
        hotfixes: ["px_scaling"],
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
      },
    };

    html2pdf().set(options).from(element).save();
  };
  const handleInput = () => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const parentElement =
          selection.getRangeAt(0).commonAncestorContainer.parentElement;

        if (editorRef.current.contains(parentElement)) {
          setIsBold(document.queryCommandState("bold"));
          setIsItalic(document.queryCommandState("italic"));
          setIsUnderlined(document.queryCommandState("underline"));

          const align = parentElement.style.textAlign || "left";
          setAlignment(align);
        }
      }
    }

    if (onConteudoChange && editorRef.current) {
      onConteudoChange(editorRef.current.innerHTML);
    }
  };

  const toggleFormat = (format) => {
    document.execCommand(format, false, null);
    editorRef.current.focus();

    if (format === "bold") setIsBold(!isBold);
    if (format === "italic") setIsItalic(!isItalic);
    if (format === "underline") setIsUnderlined(!isUnderlined);
  };

  const setAlign = (align) => {
    document.execCommand("formatBlock", false, "<div>");
    document.execCommand("justify" + align, false, null);
    setAlignment(align);
    editorRef.current.focus();
  };

  const changeFontFamily = (font) => {
    document.execCommand("fontName", false, font);
    setFontFamily(font);
    editorRef.current.focus();
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="static" color="default" elevation={1} sx={{ mb: 1 }}>
        <Toolbar variant="dense">
          <FormControl size="small" sx={{ minWidth: 120, mr: 1 }}>
            <InputLabel>Fonte</InputLabel>
            <Select
              value={fontFamily}
              label="Fonte"
              onChange={(e) => changeFontFamily(e.target.value)}
            >
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Courier New">Courier New</MenuItem>
              <MenuItem value="Georgia">Georgia</MenuItem>
            </Select>
          </FormControl>

          <IconButton
            onClick={() => toggleFormat("bold")}
            color={isBold ? "primary" : "default"}
          >
            <FormatBold />
          </IconButton>
          <IconButton
            onClick={() => toggleFormat("italic")}
            color={isItalic ? "primary" : "default"}
          >
            <FormatItalic />
          </IconButton>
          <IconButton
            onClick={() => toggleFormat("underline")}
            color={isUnderlined ? "primary" : "default"}
          >
            <FormatUnderlined />
          </IconButton>

          <IconButton
            onClick={() => setAlign("Left")}
            color={alignment === "left" ? "primary" : "default"}
          >
            <FormatAlignLeft />
          </IconButton>
          <IconButton
            onClick={() => setAlign("Center")}
            color={alignment === "center" ? "primary" : "default"}
          >
            <FormatAlignCenter />
          </IconButton>
          <IconButton
            onClick={() => setAlign("Right")}
            color={alignment === "right" ? "primary" : "default"}
          >
            <FormatAlignRight />
          </IconButton>
          <IconButton
            onClick={() => setAlign("Full")}
            color={alignment === "justify" ? "primary" : "default"}
          >
            <FormatAlignJustify />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton onClick={handleDownload}>
            <Download />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Paper
        elevation={2}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          style={{
            flexGrow: 1,
            outline: "none",
            padding: "16px",
            fontFamily: fontFamily,
            fontSize: `${fontSize}px`,
            margin: 0,
            overflow: "auto",
          }}
        />
      </Paper>
    </Box>
  );
};

export default PeticaoDocumento;
