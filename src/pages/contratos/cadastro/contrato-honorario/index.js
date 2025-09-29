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
import Imagem01 from "../../../../assets/png/imagem-documento.png";

import html2pdf from "html2pdf.js";

const ContratoHonorario = ({ onConteudoChange, cliente, advogado }) => {
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
<div>
<img src="${Imagem01}" style="display: block;  width: 100%;" />
</div>
    <div style="font-size: 16px; font-family: 'Arial';  text-decoration: underline; text-align: center; font-weight: bold; margin-bottom: 20px; text-transform: uppercase;">
CONTRATO DE HONORÁRIOS DE SERVIÇOS ADVOCATÍCIOS
  </div>
  
 
  <div style="font-family: 'Arial'; font-size: 16px;  text-align: justify; margin-bottom: 16px; text-indent: 100px;">
    Pelo presente instrumento particular de prestação de serviços advocatícios, de um lado como <strong style="text-transform:uppercase">CONTRATANTE:  ${cliente?.nome}</strong>, brasileiro, ensino superior incompleto, ${cliente?.profissao}, portador do documento de identidade RG ${cliente?.rg} e CPF ${cliente?.cpf}, com endereço à Rua ${cliente?.rua} nº ${cliente?.numero}, Bairro ${cliente?.bairro}, CEP ${cliente?.cep}, ${cliente?.cidade}/${cliente?.estado}, telefone ${cliente?.telefone}, e de outro lado como <strong style="text-transform:uppercase">CONTRATADO: ${advogado?.nome}</strong>, inscrito na OAB ${advogado?.oab}, com escritório profissional localizado na Rua  ${advogado?.rua}, nº  ${advogado?.numero},  ${advogado?.bairro}, 2º Andar, Sala 22, CEP  ${advogado?.cep},  ${advogado?.cidade}/${advogado?.estado}, tem entre si justo e contratado o seguinte:
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-align: justify; margin-bottom: 16px; text-indent: 100px;">
    1)   Por este instrumento e mediante outorga do mandato respectivo, o CONTRATANTE autoriza o CONTRATADO a realizar a defesa nos autos do Processo de Investigação criminal por embriaguez nº (MP Nº 08.2025.00145223-3), comprometendo a pagar honorários aos CONTRATADOS no valor de R$ 3.000,00 (três mil reais), em 06 (quatro) parcelas mensais e consecutivas, sendo a primeira no valor de R$ 800,00 (oitocentos reais), com vencimento dia 10/09/2023, e as demais, no valor de R$ 440,00 (quatrocentos e quarenta reais)
  </div>
  <div style="font-family: 'Arial'; font-size: 16px; text-align: justify; margin-bottom: 16px; text-indent: 100px;">
    <i>Parágrafo 1º</i>: Em caso de haver Acordo de Não Persecução Penal, o contratante pagará apenas a primeira parcela, no valor de R$ 800,00 (oitocentos reais), vencível no dia 10/09/2025.
  </div>
  <div style="font-family: 'Arial'; font-size: 16px; text-align: justify; margin-bottom: 16px; text-indent: 100px;">
    <i>Parágrafo 2º</i>: Em caso de descumprimento do acordo e havendo necessidade de prosseguir na defesa do CONTRATANTE, retorna a obrigação de pagamento do valor estipulado no caput da presente cláusula.
  </div>




  
    <div style="font-family: 'Arial'; font-size: 16px; text-align: justify; margin-bottom: 16px; text-indent: 100px;">
    2)  O CONTRATANTE tem ciência que arcará com as despesas e custas judiciais, ainda que haja insucesso da demanda;
  </div>
    
<div style="font-family: 'Times new roman'; font-size: 10px;  text-align: center; margin-top:100px; ">
   Rua Joaquim Teixeira Alves nº 1540, 2º Andar, Sala 22, Centro Dourados MS 

  </div>
    <div style="font-family: 'Times new roman'; font-size: 10px;  text-align: center; margin-bottom: 100px; "> Celulares (67) – 99631-6376 e 9642.8032.

  </div>
    <div style="font-family: 'CG Times'; font-weight:700; font-size: 12px;  text-align: center; margin-top:120px; margin-bottom: 50px">
  <i>Capilé Palhano & Sotolani – Advocacia e Consultoria</i>
  </div>

      <div style="font-family: 'Arial'; font-size: 16px; text-align: justify; margin-bottom: 16px; text-indent: 100px;">
    3)   O CONTRATANTE se compromete a fornecer todos os documentos e informações que o CONTRATADO lhe solicitar, no prazo que for estabelecido, para que possa desenvolver seu trabalho com a maior brevidade possível;
    </div>
          <div style="font-family: 'Arial'; font-size: 16px; text-align: justify; margin-bottom: 16px; text-indent: 100px;">
    4)  Será considerado rescindido o presente contrato, sem prejuízos dos honorários combinados na cláusula primeira deste instrumento, se o CONTRATANTE ou o CONTRATADO não cumprirem com as cláusulas estabelecidas neste instrumento, sendo que não será devolvido qualquer valor a título de ressarcimento.
    </div>

       <div style="font-family: 'Arial'; font-size: 16px; text-align: justify; margin-bottom: 16px; text-indent: 100px;">
   Por estarem justos e contratados, firmam o presente contrato, na presença de duas testemunhas, para que produza seus jurídicos e legais efeitos.

    </div>
          <div style="font-family: 'Arial'; font-size: 16px; text-align: justify; margin-bottom: 16px; text-indent: 100px;">
  As partes elegem o foro da comarca de Dourados/MS para dirimir as eventuais dúvidas oriundas do presente contrato.
    </div>
              <div style="font-family: 'Arial'; font-size: 16px; text-align: justify; margin-bottom: 16px; text-indent: 100px;">
    Dourados-MS, 01 de Setembro de 2025.
    </div>

   <div style="font-family: 'Arial'; display:flex; margin-top: 100px; align-items:center;  margin-bottom: 16px; width:100%; justify-content: center;">
        <div style="font-family: 'Arial'; font-size: 14px; display:flex; flex-direction: column; gap:10px; width:45%; justify-content: center; align-items:center;">
        <p style:"text-align: center; display:flex; width:100%">________________________________</p>
         <p style:"text-align: center; display:flex; width:100%">${cliente?.nome} </p>
  </div >
    <div style="font-family: 'Arial'; font-size: 14px; display:flex;   flex-direction: column; gap:10px; width:45%; justify-content: center; align-items:center;">
         <label style:"text-align: center; display:flex;   align-items: center; justify-conter:center; width:100%">_______________________________</label>
          <label style:"text-align: center; display:flex;   align-items: center; justify-conter:center; width:100%">  ${advogado?.nome} </label>
    </div>
    </div>

                  <div style="font-family: 'Arial'; font-size: 16px; text-align: justify; margin-bottom: 16px; margin-top: 100px;">
    Testemunhas
    </div>
   <div style="font-family: 'Arial'; display:flex; align-items:start;  margin-bottom: 16px; width:100%; justify-content: start;">
        <div style="font-family: 'Arial'; font-size: 14px; display:flex; flex-direction: column; gap:10px; width:45%; justify-content: start; align-items:start;">
        <p style:"text-align: center; display:flex; width:100%">Nome:</p>
         <p style:"text-align: center; display:flex; width:100%"> CPF: </p>
  </div >
    <div style="font-family: 'Arial'; font-size: 14px; display:flex;   flex-direction: column; gap:10px; width:45%; justify-content: start; align-items:start;">
            <p style:"text-align: center; display:flex; width:100%">Nome:</p>
         <p style:"text-align: center; display:flex; width:100%"> CPF: </p>
    </div>
</div>
`;
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
    }
  }, []);

  const handleDownload = () => {
    const element = editorRef.current.cloneNode(true);

    element.querySelectorAll("*").forEach((el) => {
      const style = window.getComputedStyle(el);
      const marginLeft = parseInt(style.marginLeft);
      const marginRight = parseInt(style.marginRight);

      if (marginLeft > 100) el.style.marginLeft = "40px";
      if (marginRight > 100) el.style.marginRight = "40px";

      if (parseInt(style.marginTop) > 50) el.style.marginTop = "20px";
      if (parseInt(style.marginBottom) > 50) el.style.marginBottom = "20px";
    });

    if (element.firstChild && element.firstChild.style) {
      element.firstChild.style.marginLeft = "40px";
      element.firstChild.style.marginRight = "40px";
    }

    const options = {
      margin: 10,
      filename: "documento-defesa.pdf",
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
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
          <FormControl size="small" sx={{ mr: 1 }}>
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
            overflow: "auto",
          }}
        />
      </Paper>
    </Box>
  );
};

export default ContratoHonorario;
