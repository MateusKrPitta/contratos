import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../../components/navbars/header";
import HeaderPerfil from "../../../components/navbars/perfil";
import ButtonComponent from "../../../components/button";
import HeaderCadastro from "../../../components/navbars/cadastro";
import CentralModal from "../../../components/modal-central";
import MenuMobile from "../../../components/menu-mobile";
import ModalLateral from "../../../components/modal-lateral";
import {
  ArticleOutlined,
  Edit,
  LocationCity,
  LocationOnOutlined,
  Numbers,
  Phone,
  Work,
  CheckBox,
  CheckBoxOutlineBlank,
  Add,
  Close,
  Label,
} from "@mui/icons-material";
import {
  InputAdornment,
  TextField,
  FormControlLabel,
  Checkbox,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotesIcon from "@mui/icons-material/Notes";
import { motion } from "framer-motion";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TableLoading from "../../../components/loading/loading-table/loading";
import TableComponent from "../../../components/table";
import MaskedFieldCpf from "../../../utils/mascaras/cpf";
import { clientesCadastradosNovos } from "../../../entities/header/cadastro/clientes";
import { cadastrosCliente } from "../../../entities/class/cadastro/cliente";
import MaskedFieldCep from "../../../utils/mascaras/cep";
import MaskedFieldPhone from "../../../utils/mascaras/telefone";
import { criarCliente } from "../../../services/post/cliente";
import { buscarClientes } from "../../../services/get/cliente";
import { atualizarCliente } from "../../../services/put/cliente";
import { deletarCliente } from "../../../services/delete/cliente";
import { buscarEnderecoPorCep } from "../../../services/get/cep";

const Cliente = () => {
  const [editando, setEditando] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cadastroUsuario, setCadastroUsuario] = useState(false);
  const [permissao, setPermissao] = useState(null);
  const [username, setUsername] = useState("");
  const [telefone, setTelefone] = useState("");
  const [clienteEditando, setClienteEditando] = useState(null);
  const [pesquisar, setPesquisar] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [rg, setRg] = useState("");
  const [cnh, setCnh] = useState("");
  const [profissao, setProfissao] = useState("");
  const [bairro, setBairro] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [senha, setSenha] = useState("");
  const [numero_contrato, setNumeroContrato] = useState("");
  const [pagina, setPagina] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [totalItens, setTotalItens] = useState(0);
  const [ultimaBusca, setUltimaBusca] = useState("");

  // Novos estados
  const [contrato, setContrato] = useState(false);
  const [titulos, setTitulos] = useState([]);
  const [tituloInput, setTituloInput] = useState("");

  const [clientesCadastrados, setClientesCadastrados] = useState([]);

  const inputRefs = useRef([]);

  const focusNextInput = (currentIndex) => {
    const nextIndex = currentIndex + 1;
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus();
    }
  };

  const handleKeyDown = (index) => (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      focusNextInput(index);
    }
  };
  const registerInput = (index, element) => {
    inputRefs.current[index] = element;
  };

  const FecharCadastro = () => {
    setCadastroUsuario(false);
    setClienteEditando(null);
    setNomeCompleto("");
    setSenha("");
    setNumeroContrato("");
    setUsername("");
    setTelefone("");
    setPermissao(null);
    setCpf("");
    setCep("");
    setCidade("");
    setEstado("");
    setRua("");
    setNumero("");
    setRg("");
    setCnh("");
    setProfissao("");
    setBairro("");
    setContrato(false);
    setTitulos([]);
    setTituloInput("");
    inputRefs.current = [];
  };

  const EditarOpcao = (usuario) => {
    setClienteEditando(usuario);
    setNomeCompleto(usuario.nome || "");
    setUsername(usuario.username || "");
    setTelefone(usuario.telefone || "");
    setPermissao(usuario.permissao || null);
    setCpf(usuario.cpf || "");
    setCep(usuario.cep || "");
    setCidade(usuario.cidade || "");
    setNumeroContrato(usuario.numeroContrato || "");
    setContrato(usuario.contrato || false);

    const titulosArray = Array.isArray(usuario.titulosArray)
      ? usuario.titulosArray
      : [];

    setTitulos(titulosArray);

    setEstado(usuario.estado || "");
    setRua(usuario.rua || "");
    setNumero(usuario.numero || "");
    setRg(usuario.rg || "");
    setCnh(usuario.cnh || "");
    setProfissao(usuario.profissao || "");
    setBairro(usuario.bairro || "");
    setEditando(true);
  };

  const handleCloseEdicao = () => {
    setEditando(false);
    setClienteEditando(null);
    setNomeCompleto("");
    setSenha("");
    setUsername("");
    setTelefone("");
    setPermissao(null);
    setCpf("");
    setCep("");
    setCidade("");
    setEstado("");
    setRua("");
    setNumero("");
    setRg("");
    setCnh("");
    setProfissao("");
    setBairro("");
    setContrato(false);
    setTitulos([]);
    setTituloInput("");
    inputRefs.current = [];
  };

  // Funções para gerenciar títulos
  const handleAdicionarTitulo = () => {
    if (tituloInput.trim() !== "") {
      setTitulos([...titulos, tituloInput.trim()]);
      setTituloInput("");
    }
  };

  const handleRemoverTitulo = (indexToRemove) => {
    setTitulos(titulos.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDownTitulo = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAdicionarTitulo();
    }
  };

  const handleCadastrarUsuario = async () => {
    if (validarCamposCadastro()) {
      setLoading(true);
      try {
        const response = await criarCliente(
          nomeCompleto, // 1º - nome
          telefone, // 2º - telefone
          rg, // 3º - rg
          cnh, // 4º - cnh
          profissao, // 5º - profissao
          cpf, // 6º - cpf
          cep, // 7º - cep
          cidade, // 8º - cidade
          estado, // 9º - estado
          rua, // 10º - rua
          numero, // 11º - numero
          bairro, // 12º - bairro
          numero_contrato, // 13º - numero_contrato (AGORA NA POSIÇÃO CORRETA)
          titulos, // 14º - titulos
        );

        await buscarClienteCadastrados(pagina, pesquisar);
        FecharCadastro();
      } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleSalvarEdicao = async () => {
    if (validarCamposEdicao() && clienteEditando) {
      setLoading(true);
      try {
        const telefoneValue = telefone.trim() !== "" ? telefone : null;
        const rgValue = rg.trim() !== "" ? rg : null;
        const cnhValue = cnh.trim() !== "" ? cnh : null;

        const response = await atualizarCliente(
          clienteEditando.id,
          nomeCompleto,
          telefoneValue, // Envia null se estiver vazio
          rgValue, // Envia null se estiver vazio
          cnhValue, // Envia null se estiver vazio
          profissao,
          cpf,
          cep,
          cidade,
          estado,
          rua,
          numero,
          bairro,
          numero_contrato,
          titulos,
        );

        await buscarClienteCadastrados(pagina, pesquisar);
        handleCloseEdicao();
      } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeletarCliente = async (cliente) => {
    setLoading(true);
    try {
      await deletarCliente(cliente.id);

      await buscarClienteCadastrados(pagina, pesquisar);
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    } finally {
      setLoading(false);
    }
  };

  const validarCamposCadastro = () => {
    return (
      nomeCompleto.trim() !== "" &&
      telefone.trim() !== "" &&
      cpf.trim() !== "" &&
      cep.trim() !== "" &&
      cidade.trim() !== "" &&
      estado.trim() !== "" &&
      rua.trim() !== "" &&
      numero.trim() !== "" &&
      bairro.trim() !== ""
    );
  };

  const validarCamposEdicao = () => {
    return (
      nomeCompleto.trim() !== "" &&
      telefone.trim() !== "" && // TELEFONE OBRIGATÓRIO
      rg.trim() !== "" && // RG OBRIGATÓRIO
      cnh.trim() !== "" && // CNH OBRIGATÓRIA
      cpf.trim() !== "" &&
      cep.trim() !== "" &&
      cidade.trim() !== "" &&
      estado.trim() !== "" &&
      rua.trim() !== "" &&
      numero.trim() !== "" &&
      bairro.trim() !== ""
    );
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleCepChange = (novoCep) => {
    setCep(novoCep);

    if (novoCep.replace(/\D/g, "").length === 8) {
      handleBuscarCep(novoCep);
    }
  };

  const handleBuscarCep = async (cep) => {
    if (cep.replace(/\D/g, "").length === 8) {
      setLoadingCep(true);
      try {
        const endereco = await buscarEnderecoPorCep(cep);

        setRua(endereco.logradouro);
        setBairro(endereco.bairro);
        setCidade(endereco.localidade);
        setEstado(endereco.uf);

        setTimeout(() => {
          if (inputRefs.current[11]) {
            inputRefs.current[11].focus();
          }
        }, 100);
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);

        setRua("");
        setBairro("");
        setCidade("");
        setEstado("");
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const buscarClienteCadastrados = async (page = 1, search = "") => {
    try {
      setLoading(true);
      setUltimaBusca(search);
      const response = await buscarClientes(page, itensPorPagina, search);

      if (response.data && response.data.data) {
        setClientesCadastrados(response.data.data);
        setTotalItens(response.data.meta.total);
      } else {
        setClientesCadastrados(response.data || []);
        setTotalItens(response.data?.length || 0);
      }
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMudarPagina = (novaPagina, novoLimite = itensPorPagina) => {
    setPagina(novaPagina);
    if (novoLimite !== itensPorPagina) {
      setItensPorPagina(novoLimite);
    }
    buscarClienteCadastrados(novaPagina, pesquisar);
  };

  useEffect(() => {
    buscarClienteCadastrados(pagina, pesquisar);
  }, [pagina, itensPorPagina]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPagina(1); // Volta para primeira página ao pesquisar
      buscarClienteCadastrados(1, pesquisar);
    }, 500); // Aguarda 500ms após digitar

    return () => clearTimeout(timer);
  }, [pesquisar]);

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
              <AssignmentIcon />
              Cliente
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
                  label="Buscar cliente"
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
                  onClick={() => setCadastroUsuario(true)}
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
                ) : clientesCadastrados.length > 0 ? (
                  <TableComponent
                    showPagination={true}
                    paginacao={{
                      paginaAtual: pagina,
                      itensPorPagina: itensPorPagina,
                      totalItens: totalItens,
                      onMudarPagina: handleMudarPagina,
                    }}
                    headers={clientesCadastradosNovos}
                    rows={cadastrosCliente(clientesCadastrados)}
                    actionsLabel={"Ações"}
                    actionCalls={{
                      edit: (usuario) => EditarOpcao(usuario),
                      delete: (cliente) => handleDeletarCliente(cliente),
                    }}
                  />
                ) : (
                  <div className="text-center flex items-center w-full mt-28 justify-center gap-5 flex-col text-primary">
                    <TableLoading />
                    <label className="text-sm">
                      {pesquisar
                        ? "Nenhum cliente encontrado para sua pesquisa!"
                        : "Nenhum cliente encontrado!"}
                    </label>
                  </div>
                )}
              </div>

              <CentralModal
                tamanhoTitulo={"81%"}
                maxHeight={"90vh"}
                top={"20%"}
                left={"28%"}
                width={"600px"}
                icon={<AddCircleOutlineIcon fontSize="small" />}
                open={cadastroUsuario}
                onClose={FecharCadastro}
                title="Cadastrar Cliente"
              >
                <div className="overflow-y-auto overflow-x-hidden max-h-[500px]">
                  <div className="mt-4 flex gap-3 flex-wrap">
                    <TextField
                      inputRef={(el) => registerInput(0, el)}
                      onKeyDown={handleKeyDown(0)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Nome Completo"
                      name="nome"
                      value={nomeCompleto}
                      onChange={(e) => setNomeCompleto(e.target.value)}
                      autoComplete="off"
                      sx={{
                        width: { xs: "100%", sm: "50%", md: "40%", lg: "50%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <MaskedFieldCpf
                      inputRef={(el) => registerInput(4, el)}
                      onKeyDown={handleKeyDown(4)}
                      type="cpf"
                      label="CPF"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      icon={<ArticleOutlined />}
                      iconSize={24}
                      labelSize="small"
                      width="47%"
                      autoComplete="off"
                    />

                    <TextField
                      inputRef={(el) => registerInput(6, el)}
                      onKeyDown={handleKeyDown(6)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="CNH"
                      name="CNH"
                      value={cnh}
                      onChange={(e) => setCnh(e.target.value)}
                      autoComplete="off"
                      sx={{
                        width: { xs: "47%", sm: "50%", md: "40%", lg: "50%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Numbers />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      inputRef={(el) => registerInput(3, el)}
                      onKeyDown={handleKeyDown(3)}
                      size="small"
                      label="RG"
                      name="RG"
                      value={rg}
                      onChange={(e) => setRg(e.target.value)}
                      sx={{
                        width: { xs: "47%", sm: "50%", md: "40%", lg: "47%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ArticleOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      inputRef={(el) => registerInput(10, el)}
                      onKeyDown={handleKeyDown(10)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Rua"
                      name="Rua"
                      value={rua}
                      onChange={(e) => setRua(e.target.value)}
                      autoComplete="off"
                      sx={{
                        width: { xs: "47%", sm: "50%", md: "40%", lg: "50%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      inputRef={(el) => registerInput(11, el)}
                      onKeyDown={handleKeyDown(11)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Número"
                      type="number"
                      name="Número"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      autoComplete="off"
                      sx={{
                        width: { xs: "47%", sm: "50%", md: "40%", lg: "47%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Numbers />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      inputRef={(el) => registerInput(12, el)}
                      onKeyDown={handleKeyDown(12)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Bairro"
                      name="Bairro"
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                      autoComplete="off"
                      sx={{
                        width: { xs: "47%", sm: "50%", md: "40%", lg: "50%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <MaskedFieldCep
                      inputRef={(el) => registerInput(7, el)}
                      onKeyDown={handleKeyDown(7)}
                      value={cep}
                      onChange={(e) => handleCepChange(e.target.value)}
                      icon={<LocationCity />}
                      iconSize={24}
                      labelSize="small"
                      width="47%"
                      disabled={loadingCep}
                    />
                    <TextField
                      inputRef={(el) => registerInput(8, el)}
                      onKeyDown={handleKeyDown(8)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Cidade"
                      name="Cidade"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      autoComplete="off"
                      sx={{
                        width: { xs: "47%", sm: "50%", md: "40%", lg: "50%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      inputRef={(el) => registerInput(9, el)}
                      onKeyDown={handleKeyDown(9)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Estado"
                      name="Estado"
                      inputProps={{ maxLength: 3 }}
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                      autoComplete="off"
                      sx={{
                        width: { xs: "47%", sm: "50%", md: "40%", lg: "47%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <MaskedFieldPhone
                      inputRef={(el) => registerInput(2, el)}
                      onKeyDown={handleKeyDown(2)}
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      icon={<Phone />}
                      iconSize={24}
                      labelSize="small"
                      width="50%"
                      autoComplete="off"
                    />

                    <TextField
                      inputRef={(el) => registerInput(5, el)}
                      onKeyDown={handleKeyDown(5)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Profissão"
                      name="Profissão"
                      value={profissao}
                      onChange={(e) => setProfissao(e.target.value)}
                      autoComplete="off"
                      sx={{
                        width: { xs: "47%", sm: "50%", md: "40%", lg: "47%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Work />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      inputRef={(el) => registerInput(13, el)}
                      onKeyDown={handleKeyDown(13)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Número do Contrato"
                      name="numero_contrato"
                      value={numero_contrato}
                      onChange={(e) => setNumeroContrato(e.target.value)}
                      placeholder="Ex: CT-2024-001"
                      autoComplete="off"
                      sx={{
                        width: { xs: "47%", sm: "50%", md: "40%", lg: "50%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AssignmentIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                    {/* NOVO: Campo Títulos com sistema de adicionar/remover */}
                    <Box sx={{ width: "100%", mb: 2 }}>
                      <label className="text-sm text-gray-600 mb-1 block">
                        Títulos do Cliente
                      </label>
                      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          placeholder="Digite um título"
                          value={tituloInput}
                          onChange={(e) => setTituloInput(e.target.value)}
                          onKeyDown={handleKeyDownTitulo}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Label />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <ButtonComponent
                          startIcon={<Add fontSize="small" />}
                          title={"Adicionar"}
                          subtitle={"Adicionar"}
                          buttonSize="medium"
                          onClick={handleAdicionarTitulo}
                          disabled={!tituloInput.trim()}
                        />
                      </Box>

                      <label className="text-xs w-full text-primary">
                        Titulos Adicionados:
                      </label>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mt: 1,
                        }}
                      >
                        {titulos.map((titulo, index) => (
                          <Chip
                            key={index}
                            label={titulo}
                            onDelete={() => handleRemoverTitulo(index)}
                            deleteIcon={<Close />}
                            color="primary"
                            variant="outlined"
                            size="small"
                          />
                        ))}
                      </Box>
                    </Box>
                  </div>

                  <div className="flex w-[100%] items-end justify-end mt-2 ">
                    <ButtonComponent
                      startIcon={<AddCircleOutlineIcon fontSize="small" />}
                      title={"Cadastrar"}
                      subtitle={"Cadastrar"}
                      buttonSize="large"
                      disabled={!validarCamposCadastro() || loading}
                      onClick={handleCadastrarUsuario}
                    />
                  </div>
                </div>
              </CentralModal>

              <ModalLateral
                open={editando}
                handleClose={handleCloseEdicao}
                tituloModal="Editar Cliente"
                icon={<Edit />}
                tamanhoTitulo="75%"
                conteudo={
                  <div className="">
                    <div className="mt-4 flex gap-3 flex-wrap">
                      <TextField
                        inputRef={(el) => registerInput(0, el)}
                        onKeyDown={handleKeyDown(0)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Nome Completo"
                        name="nome"
                        value={nomeCompleto}
                        onChange={(e) => setNomeCompleto(e.target.value)}
                        autoComplete="off"
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "50%",
                            md: "40%",
                            lg: "100%",
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <MaskedFieldPhone
                        inputRef={(el) => registerInput(2, el)}
                        onKeyDown={handleKeyDown(2)}
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        icon={<Phone />}
                        iconSize={24}
                        labelSize="small"
                        width="49%"
                        autoComplete="off"
                      />

                      <TextField
                        inputRef={(el) => registerInput(3, el)}
                        onKeyDown={handleKeyDown(3)}
                        size="small"
                        label="RG"
                        name="RG"
                        value={rg}
                        onChange={(e) => setRg(e.target.value)}
                        autoComplete="off"
                        sx={{
                          width: { xs: "47%", sm: "50%", md: "40%", lg: "47%" },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ArticleOutlined />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <MaskedFieldCpf
                        inputRef={(el) => registerInput(4, el)}
                        onKeyDown={handleKeyDown(4)}
                        type="cpf"
                        label="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        icon={<ArticleOutlined />}
                        iconSize={24}
                        labelSize="small"
                        width="49%"
                        autoComplete="off"
                      />

                      <TextField
                        inputRef={(el) => registerInput(5, el)}
                        onKeyDown={handleKeyDown(5)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Profissão"
                        name="Profissão"
                        value={profissao}
                        onChange={(e) => setProfissao(e.target.value)}
                        autoComplete="off"
                        sx={{
                          width: { xs: "47%", sm: "50%", md: "40%", lg: "47%" },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Work />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        inputRef={(el) => registerInput(6, el)}
                        onKeyDown={handleKeyDown(6)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="CNH"
                        name="CNH"
                        value={cnh}
                        onChange={(e) => setCnh(e.target.value)}
                        autoComplete="off"
                        sx={{
                          width: { xs: "47%", sm: "50%", md: "40%", lg: "49%" },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Numbers />
                            </InputAdornment>
                          ),
                        }}
                      />

                      {/* NÚMERO DO CONTRATO - UMA ÚNICA VEZ */}
                      <TextField
                        inputRef={(el) => registerInput(13, el)}
                        onKeyDown={handleKeyDown(13)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Número do Contrato"
                        name="numero_contrato"
                        value={numero_contrato}
                        onChange={(e) => setNumeroContrato(e.target.value)}
                        placeholder="Ex: CT-2024-001"
                        autoComplete="off"
                        sx={{
                          width: { xs: "47%", sm: "50%", md: "40%", lg: "49%" },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AssignmentIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <MaskedFieldCep
                        inputRef={(el) => registerInput(7, el)}
                        onKeyDown={handleKeyDown(7)}
                        value={cep}
                        onChange={(e) => handleCepChange(e.target.value)}
                        icon={<LocationCity />}
                        iconSize={24}
                        labelSize="small"
                        width="47%"
                        disabled={loadingCep}
                      />

                      <TextField
                        inputRef={(el) => registerInput(8, el)}
                        onKeyDown={handleKeyDown(8)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Cidade"
                        name="Cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        autoComplete="off"
                        sx={{
                          width: { xs: "47%", sm: "50%", md: "40%", lg: "47%" },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnOutlined />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        inputRef={(el) => registerInput(9, el)}
                        onKeyDown={handleKeyDown(9)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Estado"
                        name="Estado"
                        inputProps={{ maxLength: 3 }}
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        autoComplete="off"
                        sx={{
                          width: { xs: "47%", sm: "50%", md: "40%", lg: "49%" },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnOutlined />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        inputRef={(el) => registerInput(10, el)}
                        onKeyDown={handleKeyDown(10)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Rua"
                        name="Rua"
                        value={rua}
                        onChange={(e) => setRua(e.target.value)}
                        autoComplete="off"
                        sx={{
                          width: { xs: "47%", sm: "50%", md: "40%", lg: "47%" },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnOutlined />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        inputRef={(el) => registerInput(11, el)}
                        onKeyDown={handleKeyDown(11)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Número"
                        type="number"
                        name="Número"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        autoComplete="off"
                        sx={{
                          width: { xs: "47%", sm: "50%", md: "40%", lg: "25%" },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Numbers />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        inputRef={(el) => registerInput(12, el)}
                        onKeyDown={handleKeyDown(12)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Bairro"
                        name="Bairro"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        autoComplete="off"
                        sx={{
                          width: { xs: "47%", sm: "50%", md: "40%", lg: "49%" },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnOutlined />
                            </InputAdornment>
                          ),
                        }}
                      />

                      {/* SEÇÃO DE TÍTULOS - Única e Correta */}
                      {/* SEÇÃO DE TÍTULOS - Corrigida */}
                      <Box sx={{ width: "100%", mb: 2 }}>
                        <label className="text-sm text-gray-600 mb-1 block">
                          Títulos do Cliente
                        </label>

                        {/* Campo para adicionar novo título */}
                        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Digite um título"
                            value={tituloInput}
                            onChange={(e) => setTituloInput(e.target.value)}
                            onKeyDown={handleKeyDownTitulo}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Label />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <ButtonComponent
                            startIcon={<Add fontSize="small" />}
                            title={"Adicionar"}
                            subtitle={"Adicionar"}
                            buttonSize="medium"
                            onClick={handleAdicionarTitulo}
                            disabled={!tituloInput.trim()}
                          />
                        </Box>

                        {/* Container dos chips com scroll horizontal se necessário */}
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            minHeight: "40px",
                            p: 1,
                            border: "1px solid #e0e0e0",
                            borderRadius: 1,
                            bgcolor: "#f5f5f5",
                            maxWidth: "100%",
                          }}
                        >
                          {titulos && titulos.length > 0 ? (
                            titulos.map((titulo, index) => (
                              <Chip
                                key={`${titulo}-${index}`}
                                label={titulo}
                                onDelete={() => {
                                  handleRemoverTitulo(index);
                                }}
                                deleteIcon={<Close />}
                                color="primary"
                                variant="outlined"
                                size="small"
                                sx={{
                                  "& .MuiChip-deleteIcon": {
                                    color: "#ef5350",
                                    "&:hover": {
                                      color: "#d32f2f",
                                    },
                                  },
                                }}
                              />
                            ))
                          ) : (
                            <span className="text-gray-400 text-sm w-full text-center py-1">
                              Nenhum título adicionado
                            </span>
                          )}
                        </Box>

                        {/* Contador de títulos */}
                        {titulos && titulos.length > 0 && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: 1,
                            }}
                          >
                            <label className="text-xs text-primary">
                              {titulos.length} título(s) adicionado(s)
                            </label>
                          </Box>
                        )}
                      </Box>
                    </div>

                    <div className="flex w-[100%] items-end justify-end mt-2 ">
                      <ButtonComponent
                        startIcon={<AddCircleOutlineIcon fontSize="small" />}
                        title={"Salvar"}
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

export default Cliente;
