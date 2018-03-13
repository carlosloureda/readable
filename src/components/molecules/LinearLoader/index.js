import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function LinearLoader(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress />
      <br />
      <LinearProgress color="secondary" />
    </div>
  );
}

LinearLoader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearLoader);