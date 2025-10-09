import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbars/header";
import HeaderPerfil from "../../components/navbars/perfil";
import ButtonComponent from "../../components/button";
import CentralModal from "../../components/modal-central";
import MenuMobile from "../../components/menu-mobile";
import {
  Article,
  ChevronLeft,
  ChevronRight,
  Search,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { motion } from "framer-motion";
import TableLoading from "../../components/loading/loading-table/loading";
import TableComponent from "../../components/table";
import { contratoCadastrados } from "../../entities/header/contrato";
import { cadastrosContratos } from "../../entities/class/contrato";
import { buscarClientes } from "../../services/get/cliente";
import { buscarUsuarios } from "../../services/get/usuario";
import ContratoHonorario from "./cadastro/contrato-honorario";
import ProcuracaoExtrajudicial from "./cadastro/procuracao-extrajucial";
import PeticaoDocumento from "./cadastro/procuracao";
import CustomToast from "../../components/toast";
import { criarContrato } from "../../services/post/contratos";
import { buscarContratos } from "../../services/get/contrato";
import PeticaoDocumentoEditar from "./editar/procuracao";
import ContratoHonorarioEditar from "./editar/contrato-honorario";
import ProcuracaoExtrajudicialEditar from "./editar/procuracao-extrajucial";
import { atualizarContrato } from "../../services/put/contrato";
import { pesquisaContratos } from "../../services/get/pesquisa-contratos";
import { deletarContrato } from "../../services/delete/contrato";

const Contratos = () => {
  const [loading, setLoading] = useState(false);
  const [cadastroContrato, setCadastroContrato] = useState(false);
  const [EditarContrato, setEditarContrato] = useState(false);
  const [pesquisar, setPesquisar] = useState("");
  const [pesquisando, setPesquisando] = useState(false);
  const [etapaAtiva, setEtapaAtiva] = useState(0);
  const [etapaAtivaEdicao, setEtapaAtivaEdicao] = useState(0);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [advogadoSelecionado, setAdvogadoSelecionado] = useState("");
  const [tituloContrato, setTituloContrato] = useState("");
  const [peticao, setPeticao] = useState("");
  const [procuracao, setProcuracao] = useState("");
  const [peticaoHtml, setPeticaoHtml] = useState("");
  const [contratoHtml, setContratoHtml] = useState("");
  const [procuracaoHtml, setProcuracaoHtml] = useState("");
  const [clientesCadastrados, setClientesCadastrados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [contratosCadastrados, setContratosCadastrados] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [contratoSelecionado, setContratoSelecionado] = useState(null);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(5);
  const [totalItens, setTotalItens] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (pesquisar.trim() !== "") {
        handlePesquisaContratos(pesquisar);
      } else {
        buscarContratosClientes(paginaAtual, itensPorPagina);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [pesquisar]);

  useEffect(() => {
    buscarClienteCadastrados();
    buscarUsuariosCadastradas();
    buscarContratosClientes(paginaAtual, itensPorPagina);
  }, [paginaAtual, itensPorPagina]);

  const handlePesquisaContratos = async (termo) => {
    try {
      setPesquisando(true);
      setLoading(true);

      const response = await pesquisaContratos(termo);

      const dados = response?.data?.data || response?.data || response || [];

      const clientesResponse = await buscarClientes();
      const usuariosResponse = await buscarUsuarios();

      const clientes = clientesResponse?.data || [];
      const usuariosList = usuariosResponse?.data || [];

      const contratosFormatados = Array.isArray(dados)
        ? dados.map((contrato) => {
            const cliente = clientes.find((c) => c.id === contrato.clienteId);
            const advogado = usuariosList.find((u) => u.id === contrato.userId);

            return {
              id: contrato.id,
              clienteId: contrato.clienteId,
              clienteNome: cliente?.nome || "Cliente não encontrado",
              clienteInfo: cliente || {},
              advogadoId: contrato.userId,
              advogadoNome: advogado?.nome || "Advogado não encontrado",
              advogadoInfo: advogado || {},
              titulo: contrato.titulo,
              peticaoHtml: contrato.peticaoHtml,
              procuracaoHtml: contrato.procuracaoHtml,
              honorarioHtml: contrato.honorarioHtml,
              dataCriacao: contrato.createdAt,
              status: contrato.status === "concluido" ? "Ativo" : "Inativo",
              numeroContrato: contrato.numeroContrato,
              hash: contrato.hash,
            };
          })
        : [];

      setContratosCadastrados(contratosFormatados);

      setTotalItens(contratosFormatados.length);
      setTotalPaginas(1);
      setPaginaAtual(1);
    } catch (error) {
      console.error("Erro ao pesquisar contratos:", error);
      CustomToast({
        type: "error",
        message: "Erro ao pesquisar contratos. Tente novamente.",
      });
      buscarContratosClientes(paginaAtual, itensPorPagina);
    } finally {
      setLoading(false);
      setPesquisando(false);
    }
  };
  const handleExcluirContrato = async (contrato) => {
    setLoading(true);
    try {
      await deletarContrato(contrato.id);

      const contratosAtualizados = contratosCadastrados.filter(
        (c) => c.id !== contrato.id
      );

      setContratosCadastrados(contratosAtualizados);

      setTotalItens(totalItens - 1);
    } catch (error) {
      console.error("Erro ao excluir contrato:", error);
    } finally {
      setLoading(false);
    }
  };
  const dadosParaTabela = contratosCadastrados;

  const handleMudarPagina = (novaPagina, novosItensPorPagina) => {
    if (novosItensPorPagina && novosItensPorPagina !== itensPorPagina) {
      setItensPorPagina(novosItensPorPagina);
      setPaginaAtual(1);
    } else {
      setPaginaAtual(novaPagina);
    }
  };

  const handleAtualizarContrato = async () => {
    setLoading(true);
    try {
      await atualizarContrato(
        contratoSelecionado.id,
        clienteSelecionado,
        advogadoSelecionado,
        tituloContrato || contratoSelecionado.titulo,
        contratoSelecionado.numeroContrato || `CTR-${Date.now()}`,
        procuracaoHtml,
        contratoHtml,
        peticaoHtml
      );

      const contratosAtualizados = contratosCadastrados.map((contrato) =>
        contrato.id === contratoSelecionado.id
          ? {
              ...contrato,
              clienteId: clienteSelecionado,
              user_id: advogadoSelecionado,
              titulo: tituloContrato || contrato.titulo,
              procuracaoHtml: procuracaoHtml,
              honorarioHtml: contratoHtml,
              peticaoHtml: peticaoHtml,
              clienteNome:
                clientesCadastrados.find((c) => c.id === clienteSelecionado)
                  ?.nome || contrato.clienteNome,
              advogadoNome:
                usuarios.find((u) => u.id === advogadoSelecionado)?.nome ||
                contrato.advogadoNome,
            }
          : contrato
      );

      setContratosCadastrados(contratosAtualizados);

      CustomToast({
        type: "success",
        message: "Contrato atualizado com sucesso!",
      });

      FecharEditarContrato();
    } catch (error) {
      console.error("Erro ao atualizar contrato:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditarContrato = (contrato) => {
    setContratoSelecionado(contrato);
    setEditarContrato(true);

    setClienteSelecionado(contrato.clienteId || contrato.clienteInfo?.id || "");
    setAdvogadoSelecionado(
      contrato.advogadoId || contrato.advogadoInfo?.id || ""
    );
    setTituloContrato(contrato.titulo || "");

    setPeticaoHtml(contrato.peticaoHtml || "");
    setContratoHtml(contrato.honorarioHtml || "");
    setProcuracaoHtml(contrato.procuracaoHtml || "");

    setEtapaAtivaEdicao(0);
  };

  const FecharCadastroContrato = () => {
    setCadastroContrato(false);
    setEtapaAtiva(0);
    setClienteSelecionado("");
    setAdvogadoSelecionado("");
    setTituloContrato("");
    setPeticao("");
    setProcuracao("");
  };

  const FecharEditarContrato = () => {
    setEditarContrato(false);
    setContratoSelecionado(null);
    setEtapaAtivaEdicao(0);
    setClienteSelecionado("");
    setAdvogadoSelecionado("");
    setTituloContrato("");
    setPeticaoHtml("");
    setContratoHtml("");
    setProcuracaoHtml("");
  };

  const buscarContratosClientes = async (page = 1, perPage = 5) => {
    try {
      setLoading(true);
      const response = await buscarContratos(page, perPage);

      const dados = response?.data?.data || [];
      const meta = response?.data?.meta || {};

      const clientesResponse = await buscarClientes();
      const usuariosResponse = await buscarUsuarios();

      const clientes = clientesResponse?.data || [];
      const usuariosList = usuariosResponse?.data || [];

      const contratosFormatados = dados.map((contrato) => {
        const cliente = clientes.find((c) => c.id === contrato.clienteId);
        const advogado = usuariosList.find((u) => u.id === contrato.userId);

        return {
          id: contrato.id,
          clienteId: contrato.clienteId,
          clienteNome: cliente?.nome || "Cliente não encontrado",
          clienteInfo: cliente || {},
          advogadoId: contrato.userId,
          advogadoNome: advogado?.nome || "Advogado não encontrado",
          advogadoInfo: advogado || {},
          titulo: contrato.titulo,
          peticaoHtml: contrato.peticaoHtml,
          procuracaoHtml: contrato.procuracaoHtml,
          honorarioHtml: contrato.honorarioHtml,
          dataCriacao: contrato.createdAt,
          status: contrato.status === "concluido" ? "Ativo" : "Inativo",
          numeroContrato: contrato.numeroContrato,
          hash: contrato.hash,
        };
      });

      setContratosCadastrados(contratosFormatados);

      setTotalItens(meta.total || 0);
      setTotalPaginas(meta.lastPage || 1);
      setPaginaAtual(meta.currentPage || 1);
      setItensPorPagina(meta.perPage || 5);
    } catch (error) {
      console.error("Erro ao buscar contratos:", error);
      setContratosCadastrados([]);
      setTotalItens(0);
      setTotalPaginas(1);
    } finally {
      setLoading(false);
    }
  };

  const AvancarEtapa = () => {
    if (etapaAtiva < 3) {
      setEtapaAtiva(etapaAtiva + 1);
    }
  };

  const VoltarEtapa = () => {
    if (etapaAtiva > 0) {
      setEtapaAtiva(etapaAtiva - 1);
    }
  };

  const AvancarEtapaEdicao = () => {
    if (etapaAtivaEdicao < 3) {
      setEtapaAtivaEdicao(etapaAtivaEdicao + 1);
    }
  };

  const VoltarEtapaEdicao = () => {
    if (etapaAtivaEdicao > 0) {
      setEtapaAtivaEdicao(etapaAtivaEdicao - 1);
    }
  };

  const buscarClienteCadastrados = async () => {
    try {
      setLoading(true);
      const response = await buscarClientes();
      setClientesCadastrados(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  const buscarUsuariosCadastradas = async () => {
    try {
      setLoading(true);
      const response = await buscarUsuarios();
      setUsuarios(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCadastrarContrato = async () => {
    setLoading(true);

    try {
      const clienteSelecionadoObj = clientesCadastrados.find(
        (c) => c.id === clienteSelecionado
      );
      const advogadoSelecionadoObj = usuarios.find(
        (a) => a.id === advogadoSelecionado
      );

      const dadosContrato = {
        cliente_id: clienteSelecionado,
        user_id: advogadoSelecionado,
        titulo:
          tituloContrato ||
          `Contrato ${clienteSelecionadoObj?.nome} - ${advogadoSelecionadoObj?.nome}`,
        numero_contrato: `CTR-${Date.now()}`,
        procuracao_html: procuracaoHtml,
        honorario_html: contratoHtml,
        peticao_html: peticaoHtml,
      };

      const response = await criarContrato(
        dadosContrato.cliente_id,
        dadosContrato.user_id,
        dadosContrato.titulo,
        dadosContrato.numero_contrato,
        dadosContrato.procuracao_html,
        dadosContrato.honorario_html,
        dadosContrato.peticao_html
      );

      const novoContrato = {
        id: Date.now(),
        clienteId: clienteSelecionado,
        clienteNome: clienteSelecionadoObj?.nome || "",
        clienteInfo: clienteSelecionadoObj || {},
        advogadoId: advogadoSelecionado,
        advogadoNome: advogadoSelecionadoObj?.nome || "",
        advogadoInfo: advogadoSelecionadoObj || {},
        titulo: dadosContrato.titulo,
        peticao: peticaoHtml,
        procuracao: procuracaoHtml,
        contrato: contratoHtml,
        dataCriacao: new Date().toISOString(),
        status: "Ativo",
        apiId: response.id || null,
      };

      const novosContratos = [...contratosCadastrados, novoContrato];
      setContratosCadastrados(novosContratos);

      CustomToast({
        type: "success",
        message: "Contrato cadastrado com sucesso!",
      });
      buscarContratosClientes();
    } catch (error) {
      console.error("Erro ao cadastrar contrato:", error);
      CustomToast({
        type: "error",
        message: "Erro ao cadastrar contrato. Tente novamente.",
      });
    } finally {
      setLoading(false);
      FecharCadastroContrato();
    }
  };

  const podeAvancar = (modoEdicao = false) => {
    if (etapaAtiva === 0) {
      if (modoEdicao) {
        return true;
      }
      return (
        clienteSelecionado !== "" &&
        advogadoSelecionado !== "" &&
        tituloContrato !== ""
      );
    }
    return true;
  };

  const renderizarConteudoEtapa = () => {
    switch (etapaAtiva) {
      case 0:
        return (
          <div className="mt-4 flex gap-3 flex-wrap">
            <Autocomplete
              fullWidth
              size="small"
              options={clientesCadastrados}
              value={
                clientesCadastrados.find((c) => c.id === clienteSelecionado) ||
                null
              }
              onChange={(event, newValue) => {
                setClienteSelecionado(newValue ? newValue.id : "");
              }}
              getOptionLabel={(option) =>
                `${option.nome} - ${option.cpf || option.email || ""}`
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Cliente"
                  placeholder="Digite o nome do cliente..."
                />
              )}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Advogado</InputLabel>
              <Select
                value={advogadoSelecionado}
                label="Advogado"
                onChange={(e) => setAdvogadoSelecionado(e.target.value)}
              >
                {usuarios.map((usuario) => (
                  <MenuItem key={usuario.id} value={usuario.id}>
                    {usuario.nome} -{" "}
                    {usuario.oab ? `OAB: ${usuario.oab}` : "Sem OAB"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              size="small"
              label="Título do Contrato"
              value={tituloContrato}
              onChange={(e) => setTituloContrato(e.target.value)}
              placeholder="Ex: Contrato de Prestação de Serviços Jurídicos"
              sx={{ mb: 2 }}
            />

            {clienteSelecionado && (
              <div className="w-full p-3 bg-gray-50 rounded-md mt-2">
                <h4 className="font-bold text-primary mb-2">
                  Informações do Cliente:
                </h4>
                {clientesCadastrados
                  .filter((c) => c.id === clienteSelecionado)
                  .map((cliente) => (
                    <div key={cliente.id} className="text-sm">
                      <p>
                        <strong>Nome:</strong> {cliente.nome}
                      </p>
                      <p>
                        <strong>CPF:</strong> {cliente.cpf || "Não informado"}
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        {cliente.email || "Não informado"}
                      </p>
                      <p>
                        <strong>Telefone:</strong>{" "}
                        {cliente.telefone || "Não informado"}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        );
      case 1:
        return (
          <div className="mt-4">
            <PeticaoDocumento
              onConteudoChange={setPeticaoHtml}
              cliente={clientesCadastrados.find(
                (c) => c.id === clienteSelecionado
              )}
              advogado={usuarios.find((a) => a.id === advogadoSelecionado)}
            />
          </div>
        );
      case 2:
        const clienteObj = clientesCadastrados.find(
          (c) => c.id === clienteSelecionado
        );
        const advogadoObj = usuarios.find((a) => a.id === advogadoSelecionado);

        return (
          <div className="mt-4">
            <ContratoHonorario
              onConteudoChange={setContratoHtml}
              cliente={clienteObj}
              advogado={advogadoObj}
              editavel={true}
            />
          </div>
        );

      case 3:
        const clienteSelecionadoObj = clientesCadastrados.find(
          (c) => c.id === clienteSelecionado
        );
        const advogadoSelecionadoObj = usuarios.find(
          (a) => a.id === advogadoSelecionado
        );

        return (
          <div className="mt-4">
            <ProcuracaoExtrajudicial
              onConteudoChange={setProcuracaoHtml}
              cliente={clienteSelecionadoObj}
              advogado={advogadoSelecionadoObj}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const renderizarConteudoEtapaEdicao = (modoEdicao = false) => {
    const contratoAtual = contratoSelecionado
      ? contratosCadastrados.find((c) => c.id === contratoSelecionado.id)
      : null;

    switch (etapaAtivaEdicao) {
      case 0:
        return (
          <div className="mt-4 flex gap-3 flex-wrap">
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={clienteSelecionado}
                label="Cliente"
                onChange={(e) => setClienteSelecionado(e.target.value)}
                disabled={modoEdicao}
              >
                {clientesCadastrados.map((cliente) => (
                  <MenuItem key={cliente.id} value={cliente.id}>
                    {cliente.nome} - {cliente.cpf || cliente.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Advogado</InputLabel>
              <Select
                value={advogadoSelecionado}
                label="Advogado"
                onChange={(e) => setAdvogadoSelecionado(e.target.value)}
                disabled={modoEdicao}
              >
                {usuarios.map((usuario) => (
                  <MenuItem key={usuario.id} value={usuario.id}>
                    {usuario.nome} -{" "}
                    {usuario.oab ? `OAB: ${usuario.oab}` : "Sem OAB"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              size="small"
              label="Título do Contrato"
              value={tituloContrato}
              onChange={(e) => setTituloContrato(e.target.value)}
              placeholder="Ex: Contrato de Prestação de Serviços Jurídicos"
              sx={{ mb: 2 }}
            />

            {clienteSelecionado && (
              <div className="w-full p-3 bg-gray-50 rounded-md mt-2">
                <h4 className="font-bold text-primary mb-2">
                  Informações do Cliente:
                </h4>
                {clientesCadastrados
                  .filter((c) => c.id === clienteSelecionado)
                  .map((cliente) => (
                    <div key={cliente.id} className="text-sm">
                      <p>
                        <strong>Nome:</strong> {cliente.nome}
                      </p>
                      <p>
                        <strong>CPF:</strong> {cliente.cpf || "Não informado"}
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        {cliente.email || "Não informado"}
                      </p>
                      <p>
                        <strong>Telefone:</strong>{" "}
                        {cliente.telefone || "Não informado"}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="mt-4">
            <PeticaoDocumentoEditar
              onConteudoChange={setPeticaoHtml}
              cliente={clientesCadastrados.find(
                (c) => c.id === clienteSelecionado
              )}
              advogado={usuarios.find((a) => a.id === advogadoSelecionado)}
              conteudoInicial={contratoSelecionado?.peticaoHtml || ""}
            />
          </div>
        );

      case 2:
        const clienteParaEdicao = clientesCadastrados.find(
          (c) => c.id === clienteSelecionado
        );
        const advogadoParaEdicao = usuarios.find(
          (a) => a.id === advogadoSelecionado
        );

        const contratoHonorarioHtml = contratoSelecionado?.honorarioHtml || "";

        return (
          <div className="mt-4">
            <ContratoHonorarioEditar
              onConteudoChange={setContratoHtml}
              cliente={clienteParaEdicao}
              advogado={advogadoParaEdicao}
              conteudoInicial={contratoHonorarioHtml}
            />
          </div>
        );

      case 3:
        return (
          <div className="mt-4">
            <div className="mt-4">
              <ProcuracaoExtrajudicialEditar
                onConteudoChange={setProcuracaoHtml}
                cliente={clientesCadastrados.find(
                  (c) => c.id === clienteSelecionado
                )}
                advogado={usuarios.find((a) => a.id === advogadoSelecionado)}
                conteudoInicial={
                  modoEdicao
                    ? contratoAtual?.procuracaoHtml || procuracaoHtml
                    : ""
                }
                editavel={true}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
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
              Contratos
            </label>
          </div>

          <div className="items-center justify-center lg:justify-start w-full flex mt-[65px] gap-2 flex-wrap md:items-start pl-2">
            <div className="w-[100%] items-start mt-2 ml-2 sm:mt-0 md:flex md:justify-start flex-col lg:w-[95%]">
              <div className="flex gap-2 flex-wrap w-full justify-center md:justify-start mb-4">
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Buscar Contrato (cliente, advogado ou título )"
                  autoComplete="off"
                  value={pesquisar}
                  onChange={(e) => setPesquisar(e.target.value)}
                  sx={{ width: { xs: "72%", sm: "50%", md: "40%", lg: "40%" } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    endAdornment: pesquisando ? (
                      <InputAdornment position="end">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      </InputAdornment>
                    ) : null,
                  }}
                />

                <ButtonComponent
                  startIcon={<AddCircleOutlineIcon fontSize="small" />}
                  title={"Novo Contrato"}
                  subtitle={"Cadastrar"}
                  buttonSize="large"
                  onClick={() => setCadastroContrato(true)}
                />
              </div>

              {loading ? (
                <div className="w-full flex items-center h-[300px] flex-col gap-3 justify-center">
                  <TableLoading />
                  <label className="text-xs text-primary">
                    {pesquisando ? "Pesquisando..." : "Carregando Informações!"}
                  </label>
                </div>
              ) : dadosParaTabela.length > 0 ? (
                <TableComponent
                  headers={contratoCadastrados}
                  rows={cadastrosContratos(dadosParaTabela)}
                  actionsLabel={"Ações"}
                  actionCalls={{
                    edit: (row) => handleEditarContrato(row),
                    delete: (row) => handleExcluirContrato(row),
                  }}
                  paginacao={
                    pesquisar
                      ? {
                          paginaAtual: 1,
                          itensPorPagina: dadosParaTabela.length,
                          totalItens: dadosParaTabela.length,
                          totalPaginas: 1,
                          onMudarPagina: () => {},
                        }
                      : {
                          paginaAtual: paginaAtual,
                          itensPorPagina: itensPorPagina,
                          totalItens: totalItens,
                          totalPaginas: totalPaginas,
                          onMudarPagina: handleMudarPagina,
                        }
                  }
                />
              ) : (
                <div className="text-center flex items-center w-full mt-28 justify-center gap-5 flex-col text-primary">
                  <TableLoading />
                  <label className="text-sm">
                    {pesquisar
                      ? "Nenhum contrato encontrado para sua pesquisa!"
                      : "Nenhum contrato cadastrado!"}
                  </label>
                </div>
              )}

              <CentralModal
                tamanhoTitulo={"81%"}
                top={"5%"}
                left={"10%"}
                width={"90%"}
                height={"100%"}
                maxWidth="1000px"
                icon={<AddCircleOutlineIcon fontSize="small" />}
                open={cadastroContrato}
                onClose={FecharCadastroContrato}
                title="Cadastrar Novo Contrato"
              >
                <div className="overflow-y-auto overflow-x-hidden h-full">
                  <Box sx={{ width: "100%", mb: 2 }}>
                    <Stepper activeStep={etapaAtiva}>
                      <Step>
                        <StepLabel>Seleção</StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>Petição</StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>Contrato</StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>Procuração </StepLabel>
                      </Step>
                    </Stepper>
                  </Box>

                  {renderizarConteudoEtapa()}

                  <div className="flex w-[100%] items-end justify-between mt-4">
                    <ButtonComponent
                      startIcon={<ChevronLeft fontSize="small" />}
                      title={"Voltar"}
                      subtitle={"Voltar"}
                      buttonSize="medium"
                      disabled={etapaAtiva === 0}
                      onClick={VoltarEtapa}
                    />

                    {etapaAtiva < 3 ? (
                      <ButtonComponent
                        endIcon={<ChevronRight fontSize="small" />}
                        title={"Avançar"}
                        subtitle={"Avançar"}
                        buttonSize="medium"
                        disabled={!podeAvancar()}
                        onClick={AvancarEtapa}
                      />
                    ) : (
                      <ButtonComponent
                        startIcon={<AddCircleOutlineIcon fontSize="small" />}
                        title={"Finalizar Contrato"}
                        subtitle={"Finalizar"}
                        buttonSize="medium"
                        onClick={handleCadastrarContrato}
                      />
                    )}
                  </div>
                </div>
              </CentralModal>

              <CentralModal
                tamanhoTitulo={"81%"}
                top={"5%"}
                left={"10%"}
                width={"90%"}
                height={"100%"}
                maxWidth="1000px"
                maxHeight="600px"
                icon={<AddCircleOutlineIcon fontSize="small" />}
                open={EditarContrato}
                onClose={FecharEditarContrato}
                title={`Editar Contrato - ${contratoSelecionado?.titulo || ""}`}
              >
                <div className="overflow-y-auto overflow-x-hidden h-full">
                  <Box sx={{ width: "100%", mb: 2 }}>
                    <Stepper activeStep={etapaAtivaEdicao}>
                      <Step>
                        <StepLabel>Seleção</StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>Petição</StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>Contrato</StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>Procuração</StepLabel>
                      </Step>
                    </Stepper>
                  </Box>
                  {renderizarConteudoEtapaEdicao(true)}
                  <div className="flex w-[100%] items-end justify-between mt-4">
                    <ButtonComponent
                      startIcon={<ChevronLeft fontSize="small" />}
                      title={"Voltar"}
                      subtitle={"Voltar"}
                      buttonSize="medium"
                      disabled={etapaAtivaEdicao === 0}
                      onClick={VoltarEtapaEdicao}
                    />

                    {etapaAtivaEdicao < 3 ? (
                      <ButtonComponent
                        endIcon={<ChevronRight fontSize="small" />}
                        title={"Avançar"}
                        subtitle={"Avançar"}
                        buttonSize="medium"
                        disabled={!podeAvancar(true)}
                        onClick={AvancarEtapaEdicao}
                      />
                    ) : (
                      <ButtonComponent
                        startIcon={<AddCircleOutlineIcon fontSize="small" />}
                        title={"Atualizar Contrato"}
                        subtitle={"Atualizar"}
                        buttonSize="medium"
                        onClick={handleAtualizarContrato}
                      />
                    )}
                  </div>
                </div>
              </CentralModal>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contratos;
