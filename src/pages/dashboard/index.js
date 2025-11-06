import MenuMobile from "../../components/menu-mobile";
import HeaderPerfil from "../../components/navbars/perfil";
import { motion } from "framer-motion";
import Navbar from "../../components/navbars/header";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { buscarClientes } from "../../services/get/cliente";
import { useEffect, useState } from "react";
import { numeroContratos } from "../../services/get/numero-contratos";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [clientesCadastrados, setClientesCadastrados] = useState([]);
  const [numeroContratosCriados, setNumeroContratosCriados] = useState(0);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const buscarClienteCadastrados = async () => {
    try {
      const response = await buscarClientes();
      setClientesCadastrados(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const buscarNumeroContratos = async () => {
    try {
      const response = await numeroContratos();
      setNumeroContratosCriados(response.data?.total || 0);
    } catch (error) {
      console.error("Erro ao buscar contratos:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([buscarNumeroContratos(), buscarClienteCadastrados()]);
      setLoading(false);
    };

    loadData();
  }, []);

  const contratosMultiplicados = numeroContratosCriados * 3;
  const contratosPorCliente =
    clientesCadastrados.length > 0
      ? (contratosMultiplicados / clientesCadastrados.length).toFixed(1)
      : 0;

  const estadosCount = clientesCadastrados.reduce((acc, cliente) => {
    acc[cliente.estado] = (acc[cliente.estado] || 0) + 1;
    return acc;
  }, {});

  const estadoMaisComum =
    Object.keys(estadosCount).length > 0
      ? Object.keys(estadosCount).reduce((a, b) =>
          estadosCount[a] > estadosCount[b] ? a : b
        )
      : "N/A";

  if (loading) {
    return (
      <div className="w-full flex">
        <Navbar />
        <div className="flex flex-col gap-0 lg:gap-2 w-full ml-[0px] lg:ml-[20px]">
          <MenuMobile />
          <HeaderPerfil />
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex">
      <Navbar />
      <div
        className="flex flex-col gap-0 lg:gap-2 w-full ml-[0px] lg:ml-[10px]"
        style={{
          transition: "margin-left 0.3s",
        }}
      >
        <MenuMobile />
        <HeaderPerfil />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 -mt-2">
            <label className="text-primary font-bold text-2xl flex gap-2 items-center">
              <DashboardIcon fontSize="medium" />
              Dashboard Geral
            </label>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Total de Clientes
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {clientesCadastrados.length}
                  </p>
                  <p className="text-green-500 text-xs mt-1 flex items-center">
                    <TrendingUpIcon fontSize="small" />
                    <span className="ml-1">Cadastrados</span>
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <PeopleIcon className="text-blue-500" />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Total de Contratos
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {contratosMultiplicados}{" "}
                  </p>
                  <p className="text-green-500 text-xs mt-1 flex items-center">
                    <TrendingUpIcon fontSize="small" />
                    <span className="ml-1">Ativos</span>
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DescriptionIcon className="text-green-500" />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Média por Cliente
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {contratosPorCliente}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    contratos/cliente
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <TrendingUpIcon className="text-purple-500" />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Estado Mais Comum
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">
                    {estadoMaisComum}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {estadosCount[estadoMaisComum] || 0} clientes
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <PeopleIcon className="text-orange-500" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                <PeopleIcon className="mr-2 text-primary" />
                Clientes Recentes
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {clientesCadastrados.slice(0, 5).map((cliente, index) => (
                  <motion.div
                    key={cliente.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center">
                        <span className="font-bold text-gray-600 text-sm">
                          {cliente.nome.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-800">
                          {cliente.nome}
                        </p>
                        <p className="text-xs text-gray-500">{cliente.email}</p>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {cliente.estado}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                <TrendingUpIcon className="mr-2 text-primary" />
                Distribuição por Estado
              </h3>
              <div className="space-y-4">
                {Object.entries(estadosCount).map(([estado, count]) => {
                  const percentage = (count / clientesCadastrados.length) * 100;
                  return (
                    <div key={estado} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">
                          {estado}
                        </span>
                        <span className="text-gray-500">
                          {count} clientes ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
