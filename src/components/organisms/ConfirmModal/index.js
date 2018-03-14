import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ConfirmModal extends React.Component {

  constructor(props) {
      super(props)
      console.log("props: ", props);
      this.state = {
        open: false,
      };
  }

  handleClickOpen = (e) => {
    e.stopPropagation();
    this.setState({ open: true });
  };

  handleCloseWithAction = (e) => {
    //callback for closing the modal
    //TODO: deleting ...
    e.stopPropagation();
    this.props.onPrimaryAction(() => {
      //TODO: if we use the open false inside here we have
      // an error
    });
    this.setState({ open: false });
  }

  handleClose = (e) => {
    console.log("OEOEOE");
    e.stopPropagation();
    this.setState({ open: false });
  };

  render() {
    const {layout} = this.props;
    return (
      <span>
        {layout && layout == 'MINIMAL_BUTTONS' &&
          <IconButton
            onClick={this.handleClickOpen}
            aria-label="Delete" color="secondary"
            >
            <DeleteIcon />
          </IconButton>
        }
        {!layout &&
          <Button
            onClick={this.handleClickOpen}
            variant="raised" color="secondary" className={null}>
            Delete
          </Button>
        }

        <Dialog
          open={this.state.open}
          transition={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.props.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {this.props.body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {this.props.secondaryButtonText}
            </Button>
            <Button onClick={this.handleCloseWithAction} variant="raised" color="secondary">
              {this.props.primaryButtonText}
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
}

export default ConfirmModal;