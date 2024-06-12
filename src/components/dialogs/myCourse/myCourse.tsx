import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import {type TransitionProps} from "@mui/material/transitions";
import MyCourseContent from "./myCourseContent";
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

const MyCourse = () => {
    const {isMyCourseOpen, setIsMyCourseOpen} = React.useContext(ModalContext);

    const handleClose = () => {
        setIsMyCourseOpen(false);
    };

    return (
        <Dialog
            open={isMyCourseOpen}
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
            <MyCourseContent/>
        </Dialog>
    );
};

export default MyCourse;
