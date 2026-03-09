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

const PeticaoDocumento = ({
  onConteudoChange,
  cliente,
  advogado,
  tituloSelecionado,
  numeroContrato,
}) => {
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
      const content = generateContent();
      editorRef.current.innerHTML = content;
      if (onConteudoChange) {
        onConteudoChange(content);
      }
    }
  }, [cliente, advogado, tituloSelecionado, numeroContrato]);

  const generateContent = () => {
    return `
<div style="line-height: 1.5; margin-left: 40px; margin-right:40px;">
  <div style="font-size: 16px; font-family: 'Arial'; text-align: start; font-weight: bold; margin-bottom: 20px; text-transform: uppercase;">
    ILUSTRÍSSIMO SENHOR DIRETOR PRESIDENTE DO DETRAN/MS
  </div>
  
  <div style="font-size: 16px; font-family: 'Arial'; text-align: start; font-weight: bold; margin-bottom: 20px; text-transform: uppercase;">
    CAMPO GRANDE MS.
  </div>
  
  <div style="font-size: 16px; font-family: 'Arial'; text-align: center; font-weight: bold; margin-bottom: 20px; text-transform: uppercase;">
    ${tituloSelecionado || "DEFESA PRÉVIA EM PROCESSO DE SUSPENSÃO DO DIREITO DE DIRIGIR - FASE DE INSTAURAÇÃO"}
  </div>
  
  <div style="font-size: 16px; font-family: 'Arial'; text-align: center; font-weight: bold; text-decoration: underline; margin-bottom: 20px;">
    PROCESSO Nº: ${numeroContrato || "016189/2025"}
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
        cliente?.rua || "Rua Exemplo, 123"
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
  
  <div style="font-family: 'Arial'; font-size: 16px; text-align: justify; margin-bottom: 16px; text-indent: 100px;">
    O Requerente, devidamente qualificado acima, vem, por seu procurador extrajudicial que esta subscreve, apresentar DEFESA PRÉVIA contra a instauração do presente processo, com fundamentos na Resolução CONTRAN nº 723/2018 e suas alterações, especialmente no disposto no art. 11.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-align: justify; margin-bottom: 16px; text-indent: 100px;">
    Também se sustenta o requerente nos princípios constitucionais do devido processo legal, da ampla defesa e do contraditório, consagrados no art. 5º, incisos LIV e LV da Constituição Federal, requerendo, desde logo, o integral respeito a tais garantias fundamentais, de modo a assegurar a observância estrita do ordenamento jurídico pátrio e a nulidade de eventuais atos praticados em afronta às balizas legais e constitucionais.
  </div>
  
  <!-- Restante do conteúdo da petição continua igual -->
  
  <div style="font-family: 'Arial'; font-size: 16px; text-align: center; margin-bottom: 16px;">
    Dourados- MS, ${new Date().toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}.
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-align: center; margin-bottom: 16px; margin-top:50px">
    ______________________________________
  </div>

  <div style="font-family: 'Arial'; font-size: 16px; text-align: center; margin-bottom: 16px;">
    PP. ${advogado?.nome || "Advogado"}
  </div>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-align: center; margin-bottom: 16px;">
    OAB/MS ${advogado?.oab || "000.000"}
  </div>
</div>
`;
  };

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
