import React, { useEffect, useState, useRef } from "react";
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
} from "@mui/icons-material";
import { InputAdornment, TextField, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotesIcon from "@mui/icons-material/Notes";
import { Password } from "@mui/icons-material";
import { motion } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TableLoading from "../../../components/loading/loading-table/loading";
import TableComponent from "../../../components/table";
import { usuarioCadastrados } from "../../../entities/header/cadastro/usuario";
import { cadastrosUsuarios } from "../../../entities/class/cadastro/usuario";
import MaskedFieldCpf from "../../../utils/mascaras/cpf";
import { criarUsuario } from "../../../services/post/usuario";
import MaskedFieldCep from "../../../utils/mascaras/cep";
import { buscarUsuarios } from "../../../services/get/usuario";
import MaskedFieldOAB from "../../../utils/mascaras/oab";
import { editarUsuario } from "../../../services/put/usuario";
import { deletarUsuario } from "../../../services/delete/usuario";
import MaskedFieldPhone from "../../../utils/mascaras/telefone";

const Usuario = () => {
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cadastroUsuario, setCadastroUsuario] = useState(false);
  const [permissao, setPermissao] = useState("");
  const [username, setUsername] = useState("");
  const [telefone, setTelefone] = useState("");
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [pesquisar, setPesquisar] = useState("");

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [oab, setOab] = useState("");
  const [profissao, setProfissao] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [rg, setRg] = useState("");
  const [bairro, setBairro] = useState("");

  const [usuariosCadastrados, setUsuariosCadastrados] = useState([]);

  // Refs para os campos de input
  const inputRefs = useRef([]);

  // Função para focar no próximo campo
  const focusNextInput = (currentIndex) => {
    const nextIndex = currentIndex + 1;
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus();
    }
  };

  // Função para lidar com a tecla Enter
  const handleKeyDown = (index) => (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      focusNextInput(index);
    }
  };

  // Registrar input no array de refs
  const registerInput = (index, element) => {
    inputRefs.current[index] = element;
  };

  const usuariosFiltrados = usuariosCadastrados.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(pesquisar.toLowerCase()) ||
      usuario.email.toLowerCase().includes(pesquisar.toLowerCase()) ||
      (usuario.cpf &&
        usuario.cpf.toLowerCase().includes(pesquisar.toLowerCase()))
  );

  const validarCamposCadastro = () => {
    return (
      nomeCompleto.trim() !== "" &&
      senha.trim() !== "" &&
      email.trim() !== "" &&
      oab.trim() !== "" &&
      profissao.trim() !== "" &&
      cpf.trim() !== "" &&
      cep.trim() !== "" &&
      cidade.trim() !== "" &&
      estado.trim() !== "" &&
      rua.trim() !== "" &&
      numero.trim() !== "" &&
      bairro.trim() !== "" &&
      telefone.trim() !== "" &&
      permissao !== null
    );
  };

  const validarCamposEdicao = () => {
    return (
      nomeCompleto.trim() !== "" &&
      email.trim() !== "" &&
      oab.trim() !== "" &&
      profissao.trim() !== "" &&
      cpf.trim() !== "" &&
      cep.trim() !== "" &&
      cidade.trim() !== "" &&
      estado.trim() !== "" &&
      rua.trim() !== "" &&
      numero.trim() !== "" &&
      bairro.trim() !== "" &&
      telefone.trim() !== "" &&
      permissao !== null
    );
  };

  const FecharCadastroUsuario = () => {
    setCadastroUsuario(false);
    setUsuarioEditando(null);
    setNomeCompleto("");
    setEmail("");
    setSenha("");
    setUsername("");
    setTelefone("");
    setPermissao("");
    setOab("");
    setProfissao("");
    setCpf("");
    setCep("");
    setCidade("");
    setEstado("");
    setRua("");
    setNumero("");
    setRg("");
    setBairro("");
    // Limpar refs
    inputRefs.current = [];
  };

  const EditarOpcao = (usuario) => {
    setUsuarioEditando(usuario);
    setNomeCompleto(usuario.nome);
    setEmail(usuario.email);
    setPermissao(usuario.permissao.toString());
    setOab(usuario.oab || "");
    setProfissao(usuario.profissao || "");
    setCpf(usuario.cpf || "");
    setCep(usuario.cep || "");
    setCidade(usuario.cidade || "");
    setEstado(usuario.estado || "");
    setRua(usuario.rua || "");
    setNumero(usuario.numero || "");
    setRg(usuario.rg || "");
    setTelefone(usuario.telefone || "");
    setBairro(usuario.bairro || "");
    setEditando(true);
  };

  const handleCloseEdicao = () => {
    setEditando(false);
    setUsuarioEditando(null);
    setNomeCompleto("");
    setEmail("");
    setSenha("");
    setUsername("");
    setTelefone("");
    setPermissao("");
    setOab("");
    setProfissao("");
    setCpf("");
    setCep("");
    setCidade("");
    setEstado("");
    setRua("");
    setNumero("");
    setRg("");
    setBairro("");
    // Limpar refs
    inputRefs.current = [];
  };

  const handleCadastrarUsuario = async () => {
    setLoading(true);
    try {
      const cepSemFormatacao = cep.replace(/\D/g, "");
      const telefoneSemFormatacao = telefone.replace(/\D/g, "");

      const response = await criarUsuario(
        nomeCompleto,
        senha,
        email,
        parseInt(permissao),
        oab,
        profissao,
        cpf.replace(/\D/g, ""),
        cepSemFormatacao,
        cidade,
        estado,
        rua,
        numero,
        rg,
        telefoneSemFormatacao,
        bairro
      );

      // Atualizar a lista de usuários após o cadastro
      const usuariosAtualizados = await buscarUsuarios();
      setUsuariosCadastrados(usuariosAtualizados.data || []);

      FecharCadastroUsuario();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSalvarEdicao = async () => {
    setLoading(true);

    try {
      const cepSemFormatacao = cep.replace(/\D/g, "");
      const cpfSemFormatacao = cpf.replace(/\D/g, "");
      const telefoneSemFormatacao = telefone.replace(/\D/g, "");

      await editarUsuario(
        nomeCompleto,
        senha,
        email,
        parseInt(permissao),
        oab,
        profissao,
        cpfSemFormatacao,
        cepSemFormatacao,
        cidade,
        estado,
        rua,
        numero,
        usuarioEditando.id,
        rg,
        telefoneSemFormatacao,
        bairro
      );

      const usuariosAtualizados = usuariosCadastrados.map((usuario) =>
        usuario.id === usuarioEditando.id
          ? {
              ...usuario,
              nome: nomeCompleto,
              email: email,
              permissao: parseInt(permissao),
              oab: oab,
              profissao: profissao,
              cpf: cpfSemFormatacao,
              cep: cepSemFormatacao,
              cidade: cidade,
              estado: estado,
              rua: rua,
              numero: numero,
              rg: rg,
              telefone: telefoneSemFormatacao,
              bairro: bairro,
            }
          : usuario
      );

      setUsuariosCadastrados(usuariosAtualizados);
      handleCloseEdicao();
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const buscarUsuariosCadastradas = async () => {
    try {
      setLoading(true);
      const response = await buscarUsuarios();
      setUsuariosCadastrados(response.data || []);
    } catch (error) {
      const errorMessage = error.response?.data?.errors?.nome;
    } finally {
      setLoading(false);
    }
  };

  const handleDeletarUsuario = async (usuario) => {
    setLoading(true);
    try {
      await deletarUsuario(usuario.id);

      setUsuariosCadastrados((prev) => prev.filter((u) => u.id !== usuario.id));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  // Focar no primeiro campo quando abrir os modais
  useEffect(() => {
    if (cadastroUsuario && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [cadastroUsuario]);

  useEffect(() => {
    if (editando && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [editando]);

  useEffect(() => {
    buscarUsuariosCadastradas();
  }, []);

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
          <HeaderPerfil pageTitle="Usuário" />
          <div className="w-[12%]">
            <label className="text-primary font-bold text-xl flex gap-2 items-center w-full justify-center">
              <AccountCircleIcon />
              Usuário
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
                  label="Buscar usuário"
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
                ) : usuariosFiltrados.length > 0 ? (
                  <TableComponent
                    headers={usuarioCadastrados}
                    rows={cadastrosUsuarios(usuariosFiltrados)}
                    actionsLabel={"Ações"}
                    actionCalls={{
                      edit: (usuario) => EditarOpcao(usuario),
                      delete: (usuario) => handleDeletarUsuario(usuario),
                    }}
                  />
                ) : (
                  <div className="text-center flex items-center w-full mt-28 justify-center gap-5 flex-col text-primary">
                    <TableLoading />
                    <label className="text-sm">
                      {pesquisar
                        ? "Nenhum usuário encontrado para sua pesquisa!"
                        : "Nenhum usuário encontrado!"}
                    </label>
                  </div>
                )}
              </div>

              <CentralModal
                tamanhoTitulo={"81%"}
                maxHeight={"90vh"}
                top={"20%"}
                left={"28%"}
                width={"450px"}
                icon={<AddCircleOutlineIcon fontSize="small" />}
                open={cadastroUsuario}
                onClose={FecharCadastroUsuario}
                title="Cadastrar Usuário"
              >
                <div className="overflow-y-auto overflow-x-hidden max-h-[300px]">
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
                        width: { xs: "100%", sm: "50%", md: "40%", lg: "100%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      inputRef={(el) => registerInput(1, el)}
                      onKeyDown={handleKeyDown(1)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Email"
                      name="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                      sx={{
                        width: { xs: "48%", sm: "43%", md: "45%", lg: "100%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <NotesIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      inputRef={(el) => registerInput(2, el)}
                      onKeyDown={handleKeyDown(2)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      type="password"
                      label="Senha"
                      name="senha"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      autoComplete="off"
                      sx={{
                        width: { xs: "48%", sm: "40%", md: "40%", lg: "47%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Password />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      inputRef={(el) => registerInput(3, el)}
                      onKeyDown={handleKeyDown(3)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Permissão"
                      name="Permissão"
                      value={permissao}
                      onChange={(e) => setPermissao(e.target.value)}
                      select
                      autoComplete="off"
                      sx={{
                        width: { xs: "47%", sm: "50%", md: "40%", lg: "49%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <MenuItem value={1}>Administrador</MenuItem>
                      <MenuItem value={2}>Usuário Padrão</MenuItem>
                      <MenuItem value={3}>Visualizador</MenuItem>
                    </TextField>
                    <MaskedFieldOAB
                      inputRef={(el) => registerInput(4, el)}
                      onKeyDown={handleKeyDown(4)}
                      iconSize={18}
                      value={oab}
                      onChange={(e) => setOab(e.target.value)}
                      labelSize="medium"
                      width="46%"
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
                        width: { xs: "47%", sm: "50%", md: "40%", lg: "50%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Work />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <MaskedFieldCpf
                      inputRef={(el) => registerInput(6, el)}
                      onKeyDown={handleKeyDown(6)}
                      type="cpf"
                      label="CPF"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      icon={<ArticleOutlined />}
                      iconSize={24}
                      labelSize="small"
                      width="46%"
                      autoComplete="off"
                    />
                    <TextField
                      inputRef={(el) => registerInput(9, el)}
                      onKeyDown={handleKeyDown(9)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="RG"
                      name="RG"
                      value={rg}
                      onChange={(e) => setRg(e.target.value)}
                      autoComplete="off"
                      sx={{
                        width: { xs: "47%", sm: "50%", md: "40%", lg: "49%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ArticleOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <MaskedFieldCep
                      inputRef={(el) => registerInput(8, el)}
                      onKeyDown={handleKeyDown(8)}
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      icon={<LocationCity />}
                      iconSize={24}
                      labelSize="small"
                      width="46%"
                    />

                    <TextField
                      inputRef={(el) => registerInput(9, el)}
                      onKeyDown={handleKeyDown(9)}
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
                      inputRef={(el) => registerInput(10, el)}
                      onKeyDown={handleKeyDown(10)}
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
                        width: { xs: "47%", sm: "50%", md: "40%", lg: "46%" },
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
                      label="Bairro"
                      name="Bairro"
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                      autoComplete="off"
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "100%",
                          md: "100%",
                          lg: "50%",
                        },
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
                      inputRef={(el) => registerInput(12, el)}
                      onKeyDown={handleKeyDown(12)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Número"
                      name="Número"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      type="number"
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
                      inputRef={(el) => registerInput(13, el)}
                      onKeyDown={handleKeyDown(13)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Rua"
                      name="Rua"
                      value={rua}
                      onChange={(e) => setRua(e.target.value)}
                      autoComplete="off"
                      sx={{
                        width: { xs: "47%", sm: "50%", md: "40%", lg: "71%" },
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
                      inputRef={(el) => registerInput(14, el)}
                      onKeyDown={handleKeyDown(14)}
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      icon={<Phone />}
                      iconSize={24}
                      labelSize="small"
                      width="49%"
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex w-[100%] items-end justify-end mt-2 ">
                    <ButtonComponent
                      startIcon={<AddCircleOutlineIcon fontSize="small" />}
                      title={"Cadastrar"}
                      disabled={!validarCamposCadastro() || loading}
                      subtitle={"Cadastrar"}
                      buttonSize="large"
                      onClick={handleCadastrarUsuario}
                    />
                  </div>
                </div>
              </CentralModal>

              <ModalLateral
                open={editando}
                handleClose={handleCloseEdicao}
                tituloModal="Editar Usuário"
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
                      <TextField
                        inputRef={(el) => registerInput(1, el)}
                        onKeyDown={handleKeyDown(1)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Email"
                        name="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        sx={{
                          width: {
                            xs: "48%",
                            sm: "43%",
                            md: "45%",
                            lg: "100%",
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <NotesIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        inputRef={(el) => registerInput(2, el)}
                        onKeyDown={handleKeyDown(2)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="password"
                        label="Senha"
                        name="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        autoComplete="off"
                        sx={{
                          width: { xs: "48%", sm: "40%", md: "40%", lg: "47%" },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Password />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        inputRef={(el) => registerInput(3, el)}
                        onKeyDown={handleKeyDown(3)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Permissão"
                        name="Permissão"
                        value={permissao}
                        onChange={(e) => setPermissao(e.target.value)}
                        select
                        autoComplete="off"
                        sx={{
                          width: { xs: "47%", sm: "50%", md: "40%", lg: "49%" },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          ),
                        }}
                      >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Usuário Padrão</MenuItem>
                        <MenuItem value={3}>Visualizador</MenuItem>
                      </TextField>
                      <MaskedFieldOAB
                        inputRef={(el) => registerInput(4, el)}
                        onKeyDown={handleKeyDown(4)}
                        iconSize={18}
                        value={oab}
                        onChange={(e) => setOab(e.target.value)}
                        labelSize="medium"
                        width="47%"
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
                          width: { xs: "47%", sm: "50%", md: "40%", lg: "49%" },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Work />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <MaskedFieldCpf
                        inputRef={(el) => registerInput(6, el)}
                        onKeyDown={handleKeyDown(6)}
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
                      <MaskedFieldCep
                        inputRef={(el) => registerInput(7, el)}
                        onKeyDown={handleKeyDown(7)}
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        icon={<LocationCity />}
                        iconSize={24}
                        labelSize="small"
                        width="49%"
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
                        label="RG"
                        name="RG"
                        value={rg}
                        onChange={(e) => setRg(e.target.value)}
                        autoComplete="off"
                        sx={{
                          width: { xs: "47%", sm: "50%", md: "40%", lg: "49%" },
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
                        inputRef={(el) => registerInput(11, el)}
                        onKeyDown={handleKeyDown(11)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Bairro"
                        name="Bairro"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        autoComplete="off"
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "100%",
                            md: "100%",
                            lg: "47%",
                          },
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
                        inputRef={(el) => registerInput(12, el)}
                        onKeyDown={handleKeyDown(12)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Rua"
                        name="Rua"
                        value={rua}
                        onChange={(e) => setRua(e.target.value)}
                        autoComplete="off"
                        sx={{
                          width: {
                            xs: "47%",
                            sm: "50%",
                            md: "40%",
                            lg: "100%",
                          },
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
                        inputRef={(el) => registerInput(13, el)}
                        onKeyDown={handleKeyDown(13)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Número"
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

                      <MaskedFieldPhone
                        inputRef={(el) => registerInput(14, el)}
                        onKeyDown={handleKeyDown(14)}
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        icon={<Phone />}
                        iconSize={24}
                        labelSize="small"
                        width="49%"
                        autoComplete="off"
                      />
                    </div>

                    <div className="flex w-[100%] items-end justify-end mt-2 ">
                      <ButtonComponent
                        startIcon={<AddCircleOutlineIcon fontSize="small" />}
                        title={"Salvar"}
                        subtitle={"Salvar"}
                        disabled={!validarCamposEdicao() || loading}
                        buttonSize="large"
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

export default Usuario;
