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
  Save,
  Print,
  Download,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  TableChart,
  Title,
} from "@mui/icons-material";
import html2pdf from "html2pdf.js";

const ProcuracaoExtrajudicial = ({ onConteudoChange, cliente, advogado }) => {
  const editorRef = useRef(null);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(14);
  const [alignment, setAlignment] = useState("left");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [tableDialogOpen, setTableDialogOpen] = useState(false);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(2);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = getInitialContent();
      if (onConteudoChange) {
        onConteudoChange(editorRef.current.innerHTML);
      }
    }
  }, [cliente, advogado, onConteudoChange]);

  const getInitialContent = () => {
    return `
<div style="line-height: 1.5; margin-left: 40px; margin-right:40px">
  <div style="font-size: 16px; font-family: 'Arial'; text-align: center; font-weight: bold; margin-bottom: 20px; text-transform: uppercase;">
    PROCURAÇÃO EXTRAJUDICIAL
  </div>
  
  <div style="font-size: 16px; font-family: 'Arial'; text-align: center; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; text-decoration: underline;">
    ESPECÍFICA PARA TRAMITAÇÃO E CONSULTAS A DOCUMENTOS NOS ÓRGÃOS DO SISTEMA NACIONAL DE TRÂNSITO.
  </div>
  
  <div style="font-size: 16px; font-family: 'Arial'; text-align: start; font-weight: bold; margin-bottom: 20px;">
    OUTORGANTE: 
  </div>
  
  <table style="width: 100%; font-family: 'Times New Roman, sans-serif !important'; border-collapse: collapse; margin-bottom: 20px; border: 1px solid black;">
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">NOME:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        cliente?.nome || "NÃO INFORMADO"
      }</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">CPF</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        cliente?.cpf || "NÃO INFORMADO"
      }</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">CNH Nº:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        cliente?.cnh || "NÃO INFORMADO"
      }</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">RG/UF:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        cliente?.rg || "NÃO INFORMADO"
      }</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">ENDEREÇO:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        cliente?.rua
      }</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">Nº:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        cliente?.numero
      }</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">BAIRRO:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        cliente?.bairro
      }</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">CEP:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        cliente?.cep
      }</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">CIDADE/UF:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        cliente?.cidade
      }/${cliente?.estado}</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">CELULAR:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        cliente?.telefone || cliente?.celular || "NÃO INFORMADO"
      }</td>
    </tr>
  </table>
  
  <div style="font-size: 16px; font-family: 'Arial'; text-align: start; font-weight: bold; margin-bottom: 20px;">
    OUTORGADOS:  
  </div>
  
  <table style="width: 100%; font-family: 'Times New Roman, sans-serif !important'; border-collapse: collapse; margin-bottom: 20px; border: 1px solid black;">
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">NOME:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        advogado?.nome || "NÃO INFORMADO"
      }</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">CPF</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        advogado?.cpf || "NÃO INFORMADO"
      }</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">OAB Nº:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        advogado?.oab || "NÃO INFORMADO"
      }</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">RG/UF:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        advogado?.rg
      }</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">ENDEREÇO:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        advogado?.rua
      }</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">Nº:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        advogado?.numero
      }</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">BAIRRO:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        advogado?.bairro
      }</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">CEP:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        advogado?.cep
      }</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">CIDADE/UF:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        advogado?.cidade
      }/${advogado?.estado}</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px; font-weight: bold;">CELULAR:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 8px;">${
        advogado?.telefone || advogado?.celular || "NÃO INFORMADO"
      }</td>
    </tr>
  </table>

    <div style="font-size: 14px; font-family: 'Arial'; text-align: justify;  margin-bottom: 20px; text-decoration: underline;">
    <strong>PODERES:</strong> Amplos e ilimitados poderes para representar o Outorgante perante todo e qualquer órgão do <strong style="text-decoration: underline">SISTEMA NACIONAL DE TRÂNSITO</strong>, em defesas, recursos, contestação e pedido de reconsideração, em 1ª e 2ª instâncias, em autuações e/ou penalidades relativas à infrações de trânsito e/ou restrição a direitos, registradas nos órgãos acima mencionados, para tanto podendo: pedir e receber cópias de documentos, inclusive de Autos de Infrações Originais e Processos Administrativos; proceder verificações e contestar registro de autos infração de trânsito e penalidades, existentes contra veículos de propriedade ou conduzido pelo(a) Outorgante, protocolizar e providenciar registros para protocolos, verificar e conhecer de fatos e de registros de interesse sobre veículos e condução destes quando se relacione com os interesses do(a) Outorgante, consoante ao  <strong style="text-decoration: underline">TRÂNSITO LOCAL, ESTADUAL OU NACIONAL</strong>, podendo este mandato ser substabelecida com ou sem resenva de poderes.<strong style="text-decoration: underline"> Por tais atos o Outorgante, desde já, os tem como firmes e valiosos na forma da Lei.</strong>
  </div>
  <div style="font-size: 14px; font-family: 'Arial'; text-align: justify;  margin-bottom: 20px; ">
    <strong>DOURADOS MS:</strong>
  </div>
  <div style="font-size: 14px; font-family: 'Arial'; text-align: justify;  margin-bottom: 20px; ">
    <strong>NOME:</strong>
  </div>
  <div style="font-size: 14px; font-family: 'Arial'; text-align: justify;  margin-bottom: 20px; ">
    <strong>CPF:</strong>
  </div>
</div>
`;
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = getInitialContent();
    }
  }, [cliente, advogado]);

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
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
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

export default ProcuracaoExtrajudicial;
