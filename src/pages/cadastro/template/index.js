import React, { useState, useRef } from "react";
import Navbar from "../../../components/navbars/header";
import HeaderPerfil from "../../../components/navbars/perfil";
import ButtonComponent from "../../../components/button";
import HeaderCadastro from "../../../components/navbars/cadastro";
import CentralModal from "../../../components/modal-central";
import MenuMobile from "../../../components/menu-mobile";
import ModalLateral from "../../../components/modal-lateral";
import {
  Article,
  Edit,
  Save,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  Undo,
  Redo,
  Code,
  TableChart,
} from "@mui/icons-material";
import {
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { motion } from "framer-motion";
import TableLoading from "../../../components/loading/loading-table/loading";
import TableComponent from "../../../components/table";
import { templateCadastrados } from "../../../entities/header/cadastro/template";
import { cadastrosTemplate } from "../../../entities/class/cadastro/template";

const Template = () => {
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cadastroTemplate, setCadastroTemplate] = useState(false);
  const [pesquisar, setPesquisar] = useState("");
  const [nomeTemplate, setNomeTemplate] = useState("");
  const [conteudoTemplate, setConteudoTemplate] = useState("");
  const [templateEditando, setTemplateEditando] = useState(null);
  const [formato, setFormato] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [ponteiroHistorico, setPonteiroHistorico] = useState(-1);
  const [anchorEl, setAnchorEl] = useState(null);
  const editorRef = useRef(null);
  const editorEditRef = useRef(null);

  const [templatesCadastrados, setTemplatesCadastrados] = useState([
    {
      id: 1,
      nome: "Contrato Petição",
      conteudo: "Este é um modelo de contrato padrão para petições iniciais...",
    },
    {
      id: 2,
      nome: "Contrato Formulado",
      conteudo: "Modelo de contrato formulado para acordos comerciais...",
    },
  ]);

  const templatesFiltrados = templatesCadastrados.filter(
    (template) =>
      template.nome.toLowerCase().includes(pesquisar.toLowerCase()) ||
      template.conteudo.toLowerCase().includes(pesquisar.toLowerCase())
  );

  const FecharCadastroTemplate = () => {
    setCadastroTemplate(false);
    setTemplateEditando(null);
    setNomeTemplate("");
    setConteudoTemplate("");
    setFormato([]);
    setHistorico([]);
    setPonteiroHistorico(-1);
  };

  const EditarOpcao = (template) => {
    setTemplateEditando(template);
    setNomeTemplate(template.nome);
    setConteudoTemplate(template.conteudo);
    setEditando(true);
    setHistorico([template.conteudo]);
    setPonteiroHistorico(0);

    setTimeout(() => {
      if (editorEditRef.current) {
        editorEditRef.current.innerHTML = template.conteudo;
      }
    }, 100);
  };

  const AlternarAtivacaoTemplate = (template) => {
    const templatesAtualizados = templatesCadastrados.map((t) =>
      t.id === template.id ? { ...t, inativado: !t.inativado } : t
    );
    setTemplatesCadastrados(templatesAtualizados);
  };

  const handleCloseEdicao = () => {
    setEditando(false);
    setTemplateEditando(null);
    setNomeTemplate("");
    setConteudoTemplate("");
    setFormato([]);
    setHistorico([]);
    setPonteiroHistorico(-1);
  };

  const aplicarFormato = (comando, valor = null) => {
    const editor = editando ? editorEditRef.current : editorRef.current;
    if (editor) {
      editor.focus();
      document.execCommand(comando, false, valor);
      atualizarConteudo();
      atualizarBotoesFormato();
    }
  };

  const atualizarConteudo = () => {
    const editor = editando ? editorEditRef.current : editorRef.current;
    if (editor) {
      const conteudo = editor.innerHTML;
      setConteudoTemplate(conteudo);
      adicionarAoHistorico(conteudo);
    }
  };

  const atualizarBotoesFormato = () => {
    const formatosAtivos = [];
    if (document.queryCommandState("bold")) formatosAtivos.push("bold");
    if (document.queryCommandState("italic")) formatosAtivos.push("italic");
    if (document.queryCommandState("underline"))
      formatosAtivos.push("underline");
    setFormato(formatosAtivos);
  };

  const adicionarLista = (tipo) => {
    aplicarFormato(
      tipo === "bulleted" ? "insertUnorderedList" : "insertOrderedList"
    );
  };

  const adicionarTabela = (linhas, colunas) => {
    const editor = editando ? editorEditRef.current : editorRef.current;
    if (editor) {
      editor.focus();

      let tabelaHTML =
        '<table border="1" style="border-collapse: collapse; width: 100%;">';

      tabelaHTML += "<thead><tr>";
      for (let i = 0; i < colunas; i++) {
        tabelaHTML += `<th style="border: 1px solid #000; padding: 8px; text-align: left;">Cabeçalho ${
          i + 1
        }</th>`;
      }
      tabelaHTML += "</tr></thead>";

      tabelaHTML += "<tbody>";
      for (let i = 0; i < linhas; i++) {
        tabelaHTML += "<tr>";
        for (let j = 0; j < colunas; j++) {
          tabelaHTML += `<td style="border: 1px solid #000; padding: 8px;">Célula ${
            i + 1
          }-${j + 1}</td>`;
        }
        tabelaHTML += "</tr>";
      }
      tabelaHTML += "</tbody></table>";

      document.execCommand("insertHTML", false, tabelaHTML);
      atualizarConteudo();
      setAnchorEl(null);
    }
  };

  const adicionarAoHistorico = (texto) => {
    const novoHistorico = historico.slice(0, ponteiroHistorico + 1);
    novoHistorico.push(texto);
    setHistorico(novoHistorico);
    setPonteiroHistorico(novoHistorico.length - 1);
  };

  const desfazer = () => {
    if (ponteiroHistorico > 0) {
      setPonteiroHistorico(ponteiroHistorico - 1);
      const conteudoAnterior = historico[ponteiroHistorico - 1];
      setConteudoTemplate(conteudoAnterior);

      const editor = editando ? editorEditRef.current : editorRef.current;
      if (editor) {
        editor.innerHTML = conteudoAnterior;
      }
    }
  };

  const refazer = () => {
    if (ponteiroHistorico < historico.length - 1) {
      setPonteiroHistorico(ponteiroHistorico + 1);
      const conteudoPosterior = historico[ponteiroHistorico + 1];
      setConteudoTemplate(conteudoPosterior);

      const editor = editando ? editorEditRef.current : editorRef.current;
      if (editor) {
        editor.innerHTML = conteudoPosterior;
      }
    }
  };

  const handleCadastrarTemplate = () => {
    if (validarCamposCadastro()) {
      setLoading(true);
      setTimeout(() => {
        const novoTemplate = {
          id: templatesCadastrados.length + 1,
          nome: nomeTemplate,
          conteudo: conteudoTemplate,
        };

        setTemplatesCadastrados([...templatesCadastrados, novoTemplate]);
        setLoading(false);
        FecharCadastroTemplate();
      }, 1000);
    }
  };

  const handleSalvarEdicao = () => {
    if (validarCamposEdicao() && templateEditando) {
      setLoading(true);
      setTimeout(() => {
        const templatesAtualizados = templatesCadastrados.map((template) =>
          template.id === templateEditando.id
            ? {
                ...template,
                nome: nomeTemplate,
                conteudo: conteudoTemplate,
              }
            : template
        );

        setTemplatesCadastrados(templatesAtualizados);
        setLoading(false);
        handleCloseEdicao();
      }, 1000);
    }
  };

  const validarCamposCadastro = () => {
    return nomeTemplate.trim() !== "" && conteudoTemplate.trim() !== "";
  };

  const validarCamposEdicao = () => {
    return nomeTemplate.trim() !== "" && conteudoTemplate.trim() !== "";
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="flex w-full ">
      <Navbar />
      <div className="flex ml-0 flex-col gap-3 w-full items-end md:ml-0 ">
        <MenuMobile />
        <motion.div
          style={{ width: "100%" }}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.9 }}
        >
          <HeaderPerfil />
          <div className="w-[12%]">
            <label className="text-primary font-bold text-xl flex gap-2 items-center w-full ml-2 justify-start">
              <Article />
              Template
            </label>
          </div>
          <div className=" items-center justify-center lg:justify-start w-full flex mt-[65px] gap-2 flex-wrap md:items-start pl-2">
            <div className="hidden md:block md:w-[60%] lg:w-[14%]">
              <HeaderCadastro />
            </div>
            <div className="w-[100%] itens-center mt-2 ml-2 sm:mt-0 md:flex md:justify-start flex-col lg:w-[80%]">
              <div className="flex gap-2 flex-wrap w-full justify-center md:justify-start">
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Buscar template"
                  autoComplete="off"
                  value={pesquisar}
                  onChange={(e) => setPesquisar(e.target.value)}
                  sx={{ width: { xs: "72%", sm: "50%", md: "40%", lg: "40%" } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <ButtonComponent
                  startIcon={<AddCircleOutlineIcon fontSize="small" />}
                  title={"Cadastrar"}
                  subtitle={"Cadastrar"}
                  buttonSize="large"
                  onClick={() => setCadastroTemplate(true)}
                />
              </div>
              <div className="w-full ">
                {loading ? (
                  <div className="w-full flex items-center h-[300px] flex-col gap-3 justify-center">
                    <TableLoading />
                    <label className="text-xs text-primary">
                      Carregando Informações !
                    </label>
                  </div>
                ) : templatesFiltrados.length > 0 ? (
                  <TableComponent
                    headers={templateCadastrados}
                    rows={cadastrosTemplate(templatesFiltrados)}
                    actionsLabel={"Ações"}
                    actionCalls={{
                      edit: (template) => EditarOpcao(template),
                      inactivate: (template) =>
                        AlternarAtivacaoTemplate(template),
                    }}
                  />
                ) : (
                  <div className="text-center flex items-center w-full mt-28 justify-center gap-5 flex-col text-primary">
                    <TableLoading />
                    <label className="text-sm">
                      {pesquisar
                        ? "Nenhum template encontrado para sua pesquisa!"
                        : "Nenhum template encontrado!"}
                    </label>
                  </div>
                )}
              </div>

              <CentralModal
                tamanhoTitulo={"81%"}
                maxHeight={"90vh"}
                top={"5%"}
                left={"28%"}
                width={"900px"}
                icon={<AddCircleOutlineIcon fontSize="small" />}
                open={cadastroTemplate}
                onClose={FecharCadastroTemplate}
                title="Cadastrar Template"
              >
                <div className="overflow-y-auto overflow-x-hidden max-h-[70vh]">
                  <div className="mt-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Nome do Template"
                      value={nomeTemplate}
                      onChange={(e) => setNomeTemplate(e.target.value)}
                      autoComplete="off"
                      sx={{ marginBottom: "16px" }}
                    />

                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        p: 1,
                        mb: 1,
                      }}
                    >
                      <ToggleButtonGroup
                        value={formato}
                        aria-label="formatação de texto"
                        size="small"
                        sx={{ mb: 1 }}
                      >
                        <ToggleButton
                          value="bold"
                          aria-label="negrito"
                          onClick={() => aplicarFormato("bold")}
                          selected={formato.includes("bold")}
                        >
                          <FormatBold />
                        </ToggleButton>
                        <ToggleButton
                          value="italic"
                          aria-label="itálico"
                          onClick={() => aplicarFormato("italic")}
                          selected={formato.includes("italic")}
                        >
                          <FormatItalic />
                        </ToggleButton>
                        <ToggleButton
                          value="underline"
                          aria-label="sublinhado"
                          onClick={() => aplicarFormato("underline")}
                          selected={formato.includes("underline")}
                        >
                          <FormatUnderlined />
                        </ToggleButton>
                        <ToggleButton
                          value="bulleted"
                          aria-label="lista não ordenada"
                          onClick={() => adicionarLista("bulleted")}
                        >
                          <FormatListBulleted />
                        </ToggleButton>
                        <ToggleButton
                          value="numbered"
                          aria-label="lista ordenada"
                          onClick={() => adicionarLista("numbered")}
                        >
                          <FormatListNumbered />
                        </ToggleButton>
                        <ToggleButton
                          value="code"
                          aria-label="código"
                          onClick={() => aplicarFormato("code")}
                        >
                          <Code />
                        </ToggleButton>
                        <ToggleButton
                          value="table"
                          aria-label="tabela"
                          onClick={(e) => setAnchorEl(e.currentTarget)}
                        >
                          <TableChart />
                        </ToggleButton>

                        <IconButton
                          onClick={desfazer}
                          size="small"
                          disabled={ponteiroHistorico <= 0}
                        >
                          <Undo />
                        </IconButton>
                        <IconButton
                          onClick={refazer}
                          size="small"
                          disabled={ponteiroHistorico >= historico.length - 1}
                        >
                          <Redo />
                        </IconButton>
                      </ToggleButtonGroup>

                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                      >
                        <MenuItem onClick={() => adicionarTabela(2, 2)}>
                          2x2
                        </MenuItem>
                        <MenuItem onClick={() => adicionarTabela(3, 3)}>
                          3x3
                        </MenuItem>
                        <MenuItem onClick={() => adicionarTabela(4, 4)}>
                          4x4
                        </MenuItem>
                        <MenuItem onClick={() => adicionarTabela(5, 5)}>
                          5x5
                        </MenuItem>
                        <MenuItem onClick={() => adicionarTabela(3, 2)}>
                          3x2
                        </MenuItem>
                        <MenuItem onClick={() => adicionarTabela(4, 3)}>
                          4x3
                        </MenuItem>
                      </Menu>

                      <div
                        ref={editorRef}
                        contentEditable
                        className="min-h-[200px] max-h-[300px] p-2 border border-gray-300 rounded overflow-y-auto"
                        style={{
                          outline: "none",
                          fontFamily: "inherit",
                          fontSize: "14px",
                        }}
                        onInput={atualizarConteudo}
                        onKeyUp={atualizarBotoesFormato}
                        onMouseUp={atualizarBotoesFormato}
                      ></div>
                    </Box>
                  </div>

                  <div className="flex w-[100%] items-end justify-end mt-2 ">
                    <ButtonComponent
                      startIcon={<Save fontSize="small" />}
                      title={"Salvar Template"}
                      subtitle={"Salvar"}
                      buttonSize="large"
                      disabled={!validarCamposCadastro() || loading}
                      onClick={handleCadastrarTemplate}
                    />
                  </div>
                </div>
              </CentralModal>

              <ModalLateral
                open={editando}
                handleClose={handleCloseEdicao}
                tituloModal="Editar Template"
                icon={<Edit />}
                tamanhoTitulo="75%"
                width="800px"
                conteudo={
                  <div className="overflow-y-auto overflow-x-hidden max-h-[70vh]">
                    <div className="mt-4">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Nome do Template"
                        value={nomeTemplate}
                        onChange={(e) => setNomeTemplate(e.target.value)}
                        autoComplete="off"
                        sx={{ marginBottom: "16px" }}
                      />

                      <Box
                        sx={{
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          p: 1,
                          mb: 1,
                        }}
                      >
                        <ToggleButtonGroup
                          value={formato}
                          aria-label="formatação de texto"
                          size="small"
                          sx={{ mb: 1 }}
                        >
                          <ToggleButton
                            value="bold"
                            aria-label="negrito"
                            onClick={() => aplicarFormato("bold")}
                            selected={formato.includes("bold")}
                          >
                            <FormatBold />
                          </ToggleButton>
                          <ToggleButton
                            value="italic"
                            aria-label="itálico"
                            onClick={() => aplicarFormato("italic")}
                            selected={formato.includes("italic")}
                          >
                            <FormatItalic />
                          </ToggleButton>
                          <ToggleButton
                            value="underline"
                            aria-label="sublinhado"
                            onClick={() => aplicarFormato("underline")}
                            selected={formato.includes("underline")}
                          >
                            <FormatUnderlined />
                          </ToggleButton>
                          <ToggleButton
                            value="bulleted"
                            aria-label="lista não ordenada"
                            onClick={() => adicionarLista("bulleted")}
                          >
                            <FormatListBulleted />
                          </ToggleButton>
                          <ToggleButton
                            value="numbered"
                            aria-label="lista ordenada"
                            onClick={() => adicionarLista("numbered")}
                          >
                            <FormatListNumbered />
                          </ToggleButton>
                          <ToggleButton
                            value="code"
                            aria-label="código"
                            onClick={() => aplicarFormato("code")}
                          >
                            <Code />
                          </ToggleButton>
                          <ToggleButton
                            value="table"
                            aria-label="tabela"
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                          >
                            <TableChart />
                          </ToggleButton>

                          <IconButton
                            onClick={desfazer}
                            size="small"
                            disabled={ponteiroHistorico <= 0}
                          >
                            <Undo />
                          </IconButton>
                          <IconButton
                            onClick={refazer}
                            size="small"
                            disabled={ponteiroHistorico >= historico.length - 1}
                          >
                            <Redo />
                          </IconButton>
                        </ToggleButtonGroup>

                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={() => setAnchorEl(null)}
                        >
                          <MenuItem onClick={() => adicionarTabela(2, 2)}>
                            2x2
                          </MenuItem>
                          <MenuItem onClick={() => adicionarTabela(3, 3)}>
                            3x3
                          </MenuItem>
                          <MenuItem onClick={() => adicionarTabela(4, 4)}>
                            4x4
                          </MenuItem>
                          <MenuItem onClick={() => adicionarTabela(5, 5)}>
                            5x5
                          </MenuItem>
                          <MenuItem onClick={() => adicionarTabela(3, 2)}>
                            3x2
                          </MenuItem>
                          <MenuItem onClick={() => adicionarTabela(4, 3)}>
                            4x3
                          </MenuItem>
                        </Menu>

                        <div
                          ref={editorEditRef}
                          contentEditable
                          className="min-h-[300px] max-h-[400px] p-2 border border-gray-300 rounded overflow-y-auto"
                          style={{
                            outline: "none",
                            fontFamily: "inherit",
                            fontSize: "14px",
                          }}
                          onInput={atualizarConteudo}
                          onKeyUp={atualizarBotoesFormato}
                          onMouseUp={atualizarBotoesFormato}
                        ></div>
                      </Box>
                    </div>

                    <div className="flex w-[100%] items-end justify-end mt-2 ">
                      <ButtonComponent
                        startIcon={<Save fontSize="small" />}
                        title={"Salvar Alterações"}
                        subtitle={"Salvar"}
                        buttonSize="large"
                        disabled={!validarCamposEdicao() || loading}
                        onClick={handleSalvarEdicao}
                      />
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Template;
