import React, {FC} from "react";
import {Alert} from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";

type Props = {
    openSnackBar: boolean,
    handleCloseSnackBarMessage: (event?: React.SyntheticEvent, reason?: string) => void,
    severity: "success" | "info" | "warning" | "error" | undefined,
    message: string,
    autoHide: number,
}

const SnackBarMessage: FC<Props> = (props: Props) => {
    return <Snackbar open={props.openSnackBar} autoHideDuration={props.autoHide}
                     onClose={props.handleCloseSnackBarMessage}>
        <Alert onClose={props.handleCloseSnackBarMessage} severity={props.severity}>
            {props.message}
        </Alert>
    </Snackbar>
}
export default SnackBarMessage;


