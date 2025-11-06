import React from "react";
import { saveAs } from "file-saver";

const generateWordDocument = (cliente, advogado) => {
  const content = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' 
      xmlns:w='urn:schemas-microsoft-com:office:word' 
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>Contrato de Honorários</title>
  <style>
    @page {
      size: 21cm 29.7cm;
      margin: 2cm 1.5cm 2cm 1.5cm;
      mso-header-margin: 1.0cm;
      mso-footer-margin: 1.0cm;
      mso-paper-source: 0;
    }
    body {
      font-family: Arial, sans-serif;
      line-height: 1.5;
      margin: 0;
      padding: 0;
    }
    .page {
      margin-left: 30px;
      margin-right: 30px;
    }
    .title {
      font-size: 16pt;
      font-family: Arial;
      text-decoration: underline;
      text-align: center;
      font-weight: bold;
      margin-bottom: 20px;
      text-transform: uppercase;
    }
    .paragraph {
      font-family: Arial;
      font-size: 12pt;
      text-align: justify;
      margin-bottom: 12pt;
      text-indent: 100px;
    }
    .italic {
      font-style: italic;
    }
    .bold {
      font-weight: bold;
    }
    .uppercase {
      text-transform: uppercase;
    }
    .center {
      text-align: center;
    }
    .footer {
      font-family: 'Times New Roman';
      font-size: 10pt;
      text-align: center;
      margin-top: 100px;
    }
    .signature-section {
      font-family: Arial;
      display: flex;
      margin-top: 100px;
      align-items: center;
      margin-bottom: 16px;
      width: 100%;
      justify-content: center;
    }
    .signature-box {
      font-family: Arial;
      font-size: 11pt;
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 45%;
      justify-content: center;
      align-items: center;
    }
    .signature-line {
      border-top: 1px solid black;
      width: 100%;
      text-align: center;
      padding-top: 30px;
    }
    .witness-section {
      font-family: Arial;
      font-size: 12pt;
      text-align: justify;
      margin-bottom: 16px;
      margin-top: 100px;
    }
    .witness-container {
      font-family: Arial;
      display: flex;
      align-items: start;
      margin-bottom: 16px;
      width: 100%;
      justify-content: start;
    }
    .witness-box {
      font-family: Arial;
      font-size: 11pt;
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 45%;
      justify-content: start;
      align-items: start;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="title">
      CONTRATO DE HONORÁRIOS DE SERVIÇOS ADVOCATÍCIOS
    </div>
    
    <div class="paragraph">
      Pelo presente instrumento particular de prestação de serviços advocatícios, de um lado como <span class="bold uppercase">CONTRATANTE: ${
        cliente?.nome || ""
      }</span>, brasileiro, ensino superior incompleto, ${
    cliente?.profissao || ""
  }, portador do documento de identidade RG ${cliente?.rg || ""} e CPF ${
    cliente?.cpf || ""
  }, com endereço à Rua ${cliente?.rua || ""} nº ${
    cliente?.numero || ""
  }, Bairro ${cliente?.bairro || ""}, CEP ${cliente?.cep || ""}, ${
    cliente?.cidade || ""
  }/${cliente?.estado || ""}, telefone ${
    cliente?.telefone || ""
  }, e de outro lado como <span class="bold uppercase">CONTRATADO: ${
    advogado?.nome || ""
  }</span>, inscrito na OAB ${
    advogado?.oab || ""
  }, com escritório profissional localizado na Rua ${advogado?.rua || ""}, nº ${
    advogado?.numero || ""
  }, ${advogado?.bairro || ""}, 2º Andar, Sala 22, CEP ${
    advogado?.cep || ""
  }, ${advogado?.cidade || ""}/${
    advogado?.estado || ""
  }, tem entre si justo e contratado o seguinte:
    </div>
    
    <div class="paragraph">
      1) Por este instrumento e mediante outorga do mandato respectivo, o CONTRATANTE autoriza o CONTRATADO a realizar a defesa nos autos do Processo de Investigação criminal por embriaguez nº (MP Nº 08.2025.00145223-3), comprometendo a pagar honorários aos CONTRATADOS no valor de R$ 3.000,00 (três mil reais), em 06 (quatro) parcelas mensais e consecutivas, sendo a primeira no valor de R$ 800,00 (oitocentos reais), com vencimento dia 10/09/2023, e as demais, no valor de R$ 440,00 (quatrocentos e quarenta reais)
    </div>
    
    <div class="paragraph">
      <span class="italic">Parágrafo 1º</span>: Em caso de haver Acordo de Não Persecução Penal, o contratante pagará apenas a primeira parcela, no valor de R$ 800,00 (oitocentos reais), vencível no dia 10/09/2025.
    </div>
    
    <div class="paragraph">
      <span class="italic">Parágrafo 2º</span>: Em caso de descumprimento do acordo e havendo necessidade de prosseguir na defesa do CONTRATANTE, retorna a obrigação de pagamento do valor estipulado no caput da presente cláusula.
    </div>
    
    <div class="paragraph">
      2) O CONTRATANTE tem ciência que arcará com as despesas e custas judiciais, ainda que haja insucesso da demanda;
    </div>
    
    <div class="footer">
      Rua Joaquim Teixeira Alves nº 1540, 2º Andar, Sala 22, Centro Dourados MS
    </div>
    
    <div class="footer" style="margin-bottom: 100px;">
      Celulares (67) – 99631-6376 e 9642.8032.
    </div>
    
    <div style="font-family: 'CG Times'; font-weight:700; font-size: 12pt; text-align: center; margin-top:120px; margin-bottom: 50px">
      <span class="italic">Capilé Palhano & Sotolani – Advocacia e Consultoria</span>
    </div>
    
    <div class="paragraph">
      3) O CONTRATANTE se compromete a fornecer todos os documentos e informações que o CONTRATADO lhe solicitar, no prazo que for estabelecido, para que possa desenvolver seu trabalho com a maior brevidade possível;
    </div>
    
    <div class="paragraph">
      4) Será considerado rescindido o presente contrato, sem prejuízos dos honorários combinados na cláusula primeira deste instrumento, se o CONTRATANTE ou o CONTRATADO não cumprirem com as cláusulas estabelecidas neste instrumento, sendo que não será devolvido qualquer valor a título de ressarcimento.
    </div>
    
    <div class="paragraph">
      Por estarem justos e contratados, firmam o presente contrato, na presença de duas testemunhas, para que produza seus jurídicos e legais efeitos.
    </div>
    
    <div class="paragraph">
      As partes elegem o foro da comarca de Dourados/MS para dirimir as eventuais dúvidas oriundas do presente contrato.
    </div>
    
    <div class="paragraph">
      Dourados-MS, 01 de Setembro de 2025.
    </div>
    
    <div class="signature-section">
      <div class="signature-box">
        <div class="signature-line"></div>
        <div>${cliente?.nome || ""}</div>
      </div>
      <div class="signature-box">
        <div class="signature-line"></div>
        <div>${advogado?.nome || ""}</div>
      </div>
    </div>
    
    <div class="witness-section">
      Testemunhas
    </div>
    
    <div class="witness-container">
      <div class="witness-box">
        <div>Nome:</div>
        <div>CPF:</div>
      </div>
      <div class="witness-box">
        <div>Nome:</div>
        <div>CPF:</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const blob = new Blob([content], {
    type: "application/msword;charset=utf-8",
  });

  saveAs(blob, "Contrato_Honorarios.doc");
};

const WordExportButton = ({ cliente, advogado }) => {
  return (
    <button
      onClick={() => generateWordDocument(cliente, advogado)}
      style={{
        padding: "8px 16px",
        backgroundColor: "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginLeft: "10px",
      }}
    >
      Exportar Word
    </button>
  );
};

export default WordExportButton;
