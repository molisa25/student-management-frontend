import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import {type TransitionProps} from "@mui/material/transitions";
import MyModuleContent from "./myModuleContent";
import {colors} from "../../../util/theme";
import {ModalContext} from "../../../context/ModalContext";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const MyModule = () => {
    const {isMyModuleOpen, setIsMyModuleOpen} = React.useContext(ModalContext);

    const handleClose = () => {
        setIsMyModuleOpen(false);
    };

    return (
        <Dialog
            open={isMyModuleOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            PaperProps={{
                style: {
                    backgroundColor: `${colors.white}`,
                    maxWidth: "95%",
                    maxHeight: "70%",
                    width: "550px",
                    padding: "26px 16px",
                    borderRadius: "30px",
                },
            }}
        >
            <MyModuleContent/>
        </Dialog>
    );
};

export default MyModule;
