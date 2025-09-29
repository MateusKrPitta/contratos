import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Box,
  Checkbox,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import { maskCPF } from "../../utils/mascaras/formatCPF";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { SwapHoriz } from "@mui/icons-material";
import { motion } from "framer-motion";

const TableComponent = ({
  rows,
  headers,
  actionCalls = {},
  actionsLabel,
  maxHeight,
  selectable = false,
  onSelectionChange,
  paginacao = null,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [selected, setSelected] = useState([]);
  const hasActions = Object.keys(actionCalls).length > 0;
  const actionTypes = Object.keys(actionCalls);
  const usandoPaginacaoAPI = paginacao !== null;
  const paginaAtual = usandoPaginacaoAPI ? paginacao.paginaAtual - 1 : 0;
  const itensPorPagina = usandoPaginacaoAPI
    ? paginacao.itensPorPagina
    : rows.length;
  const totalItens = usandoPaginacaoAPI ? paginacao.totalItens : rows.length;
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  let headersList = [...headers];
  if (selectable) {
    headersList = [
      {
        key: "selection",
        label: "Selecionar",
        sort: true,
      },
      ...headers,
    ];
  }

  if (hasActions) {
    headersList = headersList.concat([
      {
        key: "actions",
        label: actionsLabel,
      },
    ]);
  }

  const handleChangePage = (event, newPage) => {
    if (usandoPaginacaoAPI) {
      paginacao.onMudarPagina(newPage + 1, itensPorPagina);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const novosItensPorPagina = parseInt(event.target.value, 10);
    if (usandoPaginacaoAPI) {
      paginacao.onMudarPagina(1, novosItensPorPagina);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id);
      setSelected(newSelected);
      if (onSelectionChange) {
        onSelectionChange(newSelected);
      }
      return;
    }
    setSelected([]);
    if (onSelectionChange) {
      onSelectionChange([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const numSelectedOnPage = rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .filter((row) => selected.includes(row.id)).length;

  const numSelected = selected.length;

  const allSelectedOnPage =
    numSelectedOnPage ===
    Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const renderActions = (row) => {
    let actions = {
      confirm: row.status !== "Cadastrado" && (
        <IconButton
          onClick={() => actionCalls.confirm(row)}
          title="Confirmar Registro"
          className="confirm-button"
          sx={{
            color: "#2C5282",
            border: "1px solid #2C5282",
            "&:hover": {
              color: "#fff",
              backgroundColor: "#2C5282",
              border: "1px solid #005a2a",
            },
          }}
        >
          <CheckCircleOutlineIcon fontSize={"small"} />
        </IconButton>
      ),
      view: (
        <IconButton
          onClick={() => actionCalls.view(row)}
          title="Visualizar Dados"
          className="view-button"
          id={`view-button-${row.id}`}
          sx={{
            color: "#2C5282",
            border: "1px solid #2C5282",
            "&:hover": {
              color: "#fff",
              backgroundColor: "#2C5282",
              border: "1px solid #005a2a",
            },
          }}
        >
          <VisibilityOutlinedIcon fontSize={"small"} />
        </IconButton>
      ),
      edit: (
        <IconButton
          id={`edit-button-${row.id}`}
          onClick={() => actionCalls.edit(row)}
          title="Editar Dados"
          className="view-button"
          sx={{
            color: "#2C5282",
            border: "1px solid #2C5282",
            "&:hover": {
              color: "#fff",
              backgroundColor: "#2C5282",
              border: "1px solid #005a2a",
            },
          }}
        >
          <EditIcon fontSize={"small"} />
        </IconButton>
      ),
      delete: row.status !== "Pagamento Realizado" && (
        <IconButton
          id={`delete-button-${row.id}`}
          onClick={() => actionCalls.delete(row)}
          title="Excluir Registro"
          className="delete-button"
          sx={{
            color: "#9a0000",
            border: "1px solid #9a0000",
            "&:hover": {
              color: "#fff",
              backgroundColor: "#9a0000",
              border: "1px solid #b22222",
            },
          }}
        >
          <DeleteOutlineIcon fontSize={"small"} />
        </IconButton>
      ),
      toggleStatus: (
        <IconButton
          id={`inative-button-${row.id}`}
          onClick={() => actionCalls.toggleStatus(row)}
          title={row.inativado ? "Ativar Registro" : "Inativar Registro"}
          className="toggle-status-button"
          sx={{
            color: row.inativado ? "#2C5282" : "#ff9800",
            border: `1px solid ${row.inativado ? "#2C5282" : "#ff9800"}`,
            "&:hover": {
              color: "#fff",
              backgroundColor: row.inativado ? "#2C5282" : "#ff9800",
              border: `1px solid ${row.inativado ? "#005a2a" : "#e68a00"}`,
            },
          }}
        >
          {row.inativado ? (
            <CheckCircleOutlineIcon fontSize={"small"} />
          ) : (
            <BlockOutlinedIcon fontSize={"small"} />
          )}
        </IconButton>
      ),
      option: (
        <IconButton
          onClick={() => actionCalls.option(row)}
          title="Iniciar Novo Contrato"
          className="view-button"
          sx={{
            color: "#2C5282",
            border: "1px solid #2C5282",
            "&:hover": {
              color: "#fff",
              backgroundColor: "#2C5282",
              border: "1px solid #005a2a",
            },
          }}
        >
          <AddCircleOutlineIcon fontSize={"small"} />
        </IconButton>
      ),
      transferir: (
        <IconButton
          onClick={() => actionCalls.transferir(row)}
          title="Transferir"
          className="view-button"
          sx={{
            color: "#2C5282",
            border: "1px solid #2C5282",
            "&:hover": {
              color: "#fff",
              backgroundColor: "#2C5282",
              border: "1px solid #005a2a",
            },
          }}
        >
          <SwapHoriz fontSize={"small"} />
        </IconButton>
      ),
    };

    return actionTypes.map((action) => {
      const ActionButton = actions[action];
      return ActionButton ? <span key={action}>{ActionButton}</span> : null;
    });
  };

  return (
    <Box>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.9 }}
        className="w-full"
      >
        {selectable && numSelected > 0 && (
          <Box
            sx={{ p: 1, backgroundColor: "#e3f2fd", borderRadius: 1, mb: 1 }}
          >
            <Typography variant="body2">
              {numSelected} item(s) selecionado(s)
            </Typography>
          </Box>
        )}
      </motion.div>

      <TableContainer
        component={Paper}
        style={{
          maxHeight: maxHeight || "330px",
          overflowY: "auto",
          overflowX: "none",
        }}
        className="scrollbar"
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headersList.map(
                ({ key, label, sort }) =>
                  sort !== false && (
                    <TableCell
                      key={key}
                      style={{
                        fontWeight: "bold",
                        textAlign:
                          key === "actions" || key === "selection"
                            ? "center"
                            : "left",
                        width: key === "selection" ? "60px" : "auto",
                      }}
                    >
                      {key === "selection" && selectable ? (
                        <Checkbox
                          indeterminate={numSelected > 0 && !allSelectedOnPage}
                          checked={allSelectedOnPage}
                          onChange={handleSelectAllClick}
                          color="primary"
                        />
                      ) : (
                        label
                      )}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${rowIndex}`;

                return (
                  <TableRow
                    key={rowIndex}
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                  >
                    {headersList.map(
                      ({ key, sort }) =>
                        sort !== false &&
                        (key === "selection" && selectable ? (
                          <TableCell
                            key={key}
                            padding="checkbox"
                            align="center"
                          >
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                              onClick={(event) => handleClick(event, row.id)}
                              color="primary"
                            />
                          </TableCell>
                        ) : key === "Tipo" ? (
                          <TableCell
                            key={key}
                            style={{
                              backgroundColor:
                                row.Tipo === "Entrada"
                                  ? "#2C5282"
                                  : row.Tipo === "Saída"
                                  ? "#ed4949"
                                  : "transparent",
                              color: "white",
                              fontSize: "12px",
                            }}
                          >
                            {row[key] || "-"}
                          </TableCell>
                        ) : key === "actions" && hasActions ? (
                          <TableCell
                            key={key}
                            style={{
                              display: "flex",
                              gap: 5,
                              justifyContent: "center",
                            }}
                          >
                            {renderActions(row)}
                          </TableCell>
                        ) : key === "cpf" ? (
                          <TableCell style={{ fontSize: "12px" }} key={key}>
                            {maskCPF(row[key])}
                          </TableCell>
                        ) : (
                          <TableCell style={{ fontSize: "12px" }} key={key}>
                            {row[key] || "-"}
                          </TableCell>
                        ))
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50]}
        component="div"
        count={totalItens}
        rowsPerPage={itensPorPagina}
        page={paginaAtual}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Itens por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
      />
    </Box>
  );
};

export default TableComponent;
