import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { database } from "../config/config";
import { firebaseAuth } from "../config/config";
import { firebaseP } from "../config/config";

export default class FormDialog extends React.Component {
    constructor() {
        super();
        this.databaseRef = database.ref("Admin");
        this.state = {
          open: false,
          isSignedIn: false,
          isAuthenticating: true
        };
    }

    passDataToParent = isSignedIn => {
        this.props.callbackFromParent(isSignedIn);
    }

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebaseAuth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
            
        }
    }

    getAdminMail = () => {
        this.databaseRef.once("value").then(snapshot => { 
            return snapshot.val().mail;
        }).catch((err) => {
            console.log(err);
        });
    }
    

    componentDidMount = () => {
        const admin_email = process.env.REACT_APP_ADMIN_EMAIL;//this.getAdminMail()
        firebaseP.onAuthStateChanged(user => {
            if (user && user.email === admin_email || this.state.isSignedIn) {
                this.setState({ isSignedIn: !!user })
                this.passDataToParent(this.state.isSignedIn);
            }
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
          <div>
            {this.state.isSignedIn ? (
              <Button
                variant="outlined"
                color="inherit"
                style={{ color: "white" }}
                onClick={() => firebaseP.signOut()}
              >
                Log Out!
              </Button>
            ) : (
              <div>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={this.handleClickOpen}
                  style={{ color: "white" }}
                >
                  Admin
                </Button>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Ingresa unicamente con la cuenta del administrador</DialogContentText>
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebaseP}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancelar</Button>
                    </DialogActions>
                </Dialog>
              </div>
            )}
            {/* <Button
              variant="outlined"
              color="default"
              onClick={this.handleClickOpen}
            >
              Admin o Log Out
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
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebaseAuth}
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
            </Dialog> */}
          </div>
        );
    }
}
