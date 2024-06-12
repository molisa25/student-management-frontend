import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import {type TransitionProps} from "@mui/material/transitions";
import MyDepartmentContent from "./myDepartmentContent";
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

const MyDepartment = () => {
    const {isMyDocumentOpen, setIsMyDocumentOpen} = React.useContext(ModalContext);

    const handleClose = () => {
        setIsMyDocumentOpen(false);
    };

    return (
        <Dialog
            open={isMyDocumentOpen}
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
            <MyDepartmentContent/>
        </Dialog>
    );
};

export default MyDepartment;
