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
  Description,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
} from "@mui/icons-material";
import html2pdf from "html2pdf.js";

const PeticaoDocumentoEditar = ({
  onConteudoChange,
  cliente,
  advogado,
  conteudoInicial,
}) => {
  const editorRef = useRef(null);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(14);
  const [alignment, setAlignment] = useState("left");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [conteudo, setConteudo] = useState("");
  const [conteudoCarregado, setConteudoCarregado] = useState(false);

  const gerarTemplatePadrao = (cliente, advogado) => {
    return `
<div style="line-height: 1.5; margin-left: 40px; margin-right:40px;">
  <div style="font-size: 16px; font-family: 'Arial'; text-align: center; font-weight: bold; margin-bottom: 20px; text-transform: uppercase;">
    ILUSTRÍSSIMO SENHOR DIRETOR PRESIDENTE DO DETRAN/MS
  </div>
  
  <div style="font-size: 16px; font-family: 'Arial'; text-align: center; font-weight: bold; margin-bottom: 20px; text-transform: uppercase;">
    CAMPO GRANDE MS.
  </div>
  
  <table style="width: 100%; font-family: 'Times New Roman, sans-serif !important'; border-collapse: collapse; margin-bottom: 20px; border: 1px solid black;">
    <tr>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px; font-weight: bold;">NOME:</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px;">${
        cliente?.nome || "NOME DO CLIENTE"
      }</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px; font-weight: bold;">CPF</td>
      <td style="border: 1px solid black; font-size: 12px; padding: 5px;">${
        cliente?.cpf || "CPF DO CLIENTE"
      }</td>
    </tr>
  </table>
  
  <div style="font-family: 'Arial'; font-size: 16px; text-align: center; margin-bottom: 16px;">
    PP. ${advogado?.nome || "NOME DO ADVOGADO"}
  </div>
  <div style="font-family: 'Arial'; font-size: 16px; text-align: center; margin-bottom: 16px;">
    OAB/MS ${advogado?.oab || "NÚMERO OAB"}
  </div>
</div>`;
  };

  useEffect(() => {
    if (editorRef.current && !conteudoCarregado) {
      let conteudoParaCarregar = conteudoInicial;

      if (!conteudoInicial || conteudoInicial.trim() === "") {
        conteudoParaCarregar = gerarTemplatePadrao(cliente, advogado);
      }

      editorRef.current.innerHTML = conteudoParaCarregar;
      setConteudo(conteudoParaCarregar);

      if (onConteudoChange) {
        onConteudoChange(conteudoParaCarregar);
      }

      setConteudoCarregado(true);
    }
  }, [conteudoInicial, cliente, advogado, onConteudoChange, conteudoCarregado]);

  const handleDownloadPDF = () => {
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

  const handleDownloadWord = () => {
    const element = editorRef.current.cloneNode(true);

    const conteudoHTML = `
<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <meta charset="UTF-8">
    <title>Documento de Defesa</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0;
            padding: 20px;
            line-height: 1.5;
        }
        .documento-container {
            margin-left: 40px;
            margin-right: 40px;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px;
        }
        td {
            border: 1px solid black;
            padding: 5px;
            font-size: 12px;
        }
        /* Mantém todos os estilos inline do conteúdo */
        * {
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    ${element.innerHTML}
</body>
</html>`;

    const blob = new Blob([conteudoHTML], {
      type: "application/msword",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "documento-defesa.doc";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

    if (editorRef.current) {
      const novoConteudo = editorRef.current.innerHTML;
      setConteudo(novoConteudo);

      if (onConteudoChange) {
        onConteudoChange(novoConteudo);
      }
    }
  };

  const toggleFormat = (format) => {
    document.execCommand(format, false, null);
    editorRef.current.focus();

    if (format === "bold") setIsBold(!isBold);
    if (format === "italic") setIsItalic(!isItalic);
    if (format === "underline") setIsUnderlined(!isUnderlined);

    handleInput();
  };

  const setAlign = (align) => {
    document.execCommand("formatBlock", false, "<div>");
    document.execCommand("justify" + align, false, null);
    setAlignment(align);
    editorRef.current.focus();

    handleInput();
  };

  const changeFontFamily = (font) => {
    document.execCommand("fontName", false, font);
    setFontFamily(font);
    editorRef.current.focus();

    handleInput();
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
              <MenuItem value="Courier New">Courier New</MenuItem>
              <MenuItem value="Georgia">Georgia</MenuItem>
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
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

          <IconButton onClick={handleDownloadWord} title="Download Word">
            <Description />
          </IconButton>

          <IconButton onClick={handleDownloadPDF} title="Download PDF">
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

export default PeticaoDocumentoEditar;
