import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const LinearLoader = ( { classes : { root } }) => (
  <div className={root}>
    <LinearProgress />
    <br />
    <LinearProgress color="secondary" />
  </div>
)

LinearLoader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearLoader);
