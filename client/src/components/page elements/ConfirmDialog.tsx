import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
    title: string;
    open: boolean;
    content: string;
    onClose: (res: boolean) => void
}
const ConfirmationDialog: React.FC<Props> = (props: Props) => {
    return (

        <Dialog
            open={props.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onClose(true)} color="primary" autoFocus>
                    Yes
                </Button>
                <Button onClick={() => props.onClose(false)} color="primary">
                    No
                </Button>
            </DialogActions>
        </Dialog>

    );
}
export default ConfirmationDialog;
