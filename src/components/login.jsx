import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Button variant="outlined" color="success" onClick={this.handleClickOpen}>
                   Admin
        </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Ingresa el usuario administrador
            </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            //className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancelar
            </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Login
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
