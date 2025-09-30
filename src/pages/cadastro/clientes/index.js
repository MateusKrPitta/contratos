import React, { useState, useEffect } from "react";
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
import { InputAdornment, TextField } from "@mui/material";
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

const Cliente = () => {
  const [editando, setEditando] = useState(false);
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
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [clientesCadastrados, setClientesCadastrados] = useState([]);

  const clientesFiltratos = clientesCadastrados.filter(
    (usuario) =>
      (usuario.nome || "").toLowerCase().includes(pesquisar.toLowerCase()) ||
      (usuario.email || "").toLowerCase().includes(pesquisar.toLowerCase()) ||
      (usuario.username || "").toLowerCase().includes(pesquisar.toLowerCase())
  );
  const FecharCadastro = () => {
    setCadastroUsuario(false);
    setClienteEditando(null);
    setNomeCompleto("");
    setEmail("");
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
  };

  const EditarOpcao = (usuario) => {
    setClienteEditando(usuario);
    setNomeCompleto(usuario.nome || "");
    setEmail(usuario.email || "");
    setUsername(usuario.username || "");
    setTelefone(usuario.telefone || "");
    setPermissao(usuario.permissao || null);
    setCpf(usuario.cpf || "");
    setCep(usuario.cep || "");
    setCidade(usuario.cidade || "");
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
    setEmail("");
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
  };

  const handleCadastrarUsuario = async () => {
    if (validarCamposCadastro()) {
      setLoading(true);
      try {
        const response = await criarCliente(
          nomeCompleto,
          email,
          telefone,
          rg,
          cnh,
          profissao,
          cpf,
          cep,
          cidade,
          estado,
          rua,
          numero,
          bairro
        );

        const novoUsuario = {
          id: clientesCadastrados.length + 1,
          nome: nomeCompleto,
          email: email,
          telefone: telefone,
          username: username,
          permissao: permissao,
        };

        setClientesCadastrados([...clientesCadastrados, novoUsuario]);

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
        const response = await atualizarCliente(
          clienteEditando.id, // ID como PRIMEIRO parâmetro
          nomeCompleto,
          "", // senha (vazia se não for alterar)
          email,
          "", // permissao (vazia se não for usar)
          "", // oab (vazia se não for usar)
          profissao,
          cpf,
          cep,
          cidade,
          estado,
          rua,
          numero
        );
        const usuariosAtualizados = clientesCadastrados.map((usuario) =>
          usuario.id === clienteEditando.id
            ? {
                ...usuario,
                nome: nomeCompleto,
                email: email,
                telefone: telefone,
                rg: rg,
                cnh: cnh,
                profissao: profissao,
                cpf: cpf,
                cep: cep,
                cidade: cidade,
                estado: estado,
                rua: rua,
                numero: numero,
                bairro: bairro,
              }
            : usuario
        );

        setClientesCadastrados(usuariosAtualizados);
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

      setClientesCadastrados((prev) => prev.filter((u) => u.id !== cliente.id));
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    } finally {
      setLoading(false);
    }
  };
  const validarCamposCadastro = () => {
    return (
      nomeCompleto.trim() !== "" &&
      email.trim() !== "" &&
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
      email.trim() !== "" &&
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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const buscarClienteCadastrados = async () => {
    try {
      setLoading(true);
      const response = await buscarClientes();
      setClientesCadastrados(response.data || []);
    } catch (error) {
      const errorMessage = error.response?.data?.errors?.nome;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarClienteCadastrados();
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
                ) : clientesFiltratos.length > 0 ? (
                  <TableComponent
                    headers={clientesCadastradosNovos}
                    rows={cadastrosCliente(clientesFiltratos)}
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
                width={"500px"}
                icon={<AddCircleOutlineIcon fontSize="small" />}
                open={cadastroUsuario}
                onClose={FecharCadastro}
                title="Cadastrar Cliente"
              >
                <div className="overflow-y-auto overflow-x-hidden max-h-[300px]">
                  <div className="mt-4 flex gap-3 flex-wrap">
                    <TextField
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
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Email"
                      name="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                      sx={{
                        width: { xs: "48%", sm: "43%", md: "45%", lg: "47%" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <NotesIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <MaskedFieldPhone
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      icon={<Phone />}
                      iconSize={24}
                      labelSize="small"
                      width="49%"
                      autoComplete="off"
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="RG"
                      name="RG"
                      value={rg}
                      type="number"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,7}$/.test(value)) {
                          setRg(value);
                        }
                      }}
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

                    <MaskedFieldCep
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      icon={<LocationCity />}
                      iconSize={24}
                      labelSize="small"
                      width="49%"
                    />

                    <TextField
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
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Email"
                        name="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        sx={{
                          width: { xs: "48%", sm: "43%", md: "45%", lg: "47%" },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <NotesIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <MaskedFieldPhone
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        icon={<Phone />}
                        iconSize={24}
                        labelSize="small"
                        width="49%"
                        autoComplete="off"
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="RG"
                        name="RG"
                        value={rg}
                        type="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d{0,7}$/.test(value)) {
                            setRg(value);
                          }
                        }}
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

                      <MaskedFieldCep
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        icon={<LocationCity />}
                        iconSize={24}
                        labelSize="small"
                        width="49%"
                      />

                      <TextField
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
