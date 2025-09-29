import React from "react";
import { Modal, Box, Typography, Grow } from "@mui/material";
import Lines from "../lines";
import Label from "../label";
import ButtonClose from "../buttons/button-close";

const CentralModal = ({
  open,
  onClose,
  title,
  children,
  icon,
  width,
  top,
  height,
  maxHeight,
  tamanhoTitulo,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
      aria-labelledby="central-modal-title"
      aria-describedby="central-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: "10px", sm: "20px" },
      }}
    >
      <Grow in={open}>
        <Box
          sx={{
            width: { xs: "95%", sm: width || "450px" },
            maxWidth: "95vw",
            height: height,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            overflowY: "auto",
            margin: "auto",
          }}
        >
          <Typography
            id="central-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            <Lines
              gap={"5px"}
              conteudo={
                <>
                  <Lines
                    width={"5%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    padding={"5px"}
                    backgroundColor={"#2C5282"}
                    borderRadius={"5px"}
                    color={"#ffff"}
                    conteudo={<>{icon}</>}
                  />
                  <Label
                    fontWeight={700}
                    width={tamanhoTitulo || "75%"}
                    fontSize={"15px"}
                    conteudo={<>{title}</>}
                  />
                  <ButtonClose
                    width={"10%"}
                    display={"flex"}
                    alignItems={"end"}
                    justifyContent={"end"}
                    funcao={onClose}
                  />
                </>
              }
            ></Lines>
          </Typography>
          <Typography id="central-modal-description" sx={{ mb: 2 }}>
            {children}
          </Typography>
        </Box>
      </Grow>
    </Modal>
  );
};

export default CentralModal;
