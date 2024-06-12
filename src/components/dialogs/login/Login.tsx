import React, { type PropsWithChildren } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { type TransitionProps } from "@mui/material/transitions";
import LoginContent from "./LoginContent";
import { colors } from "../../../util/theme";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Login = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={handleClickOpen}>{children}</div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: `${colors.white}`,
            maxWidth: "95%",
            width: "550px",
            padding: "26px 16px",
            borderRadius: "30px",
          },
        }}
      >
        <LoginContent handleClose={handleClose} />
      </Dialog>
    </>
  );
};

export default Login;
