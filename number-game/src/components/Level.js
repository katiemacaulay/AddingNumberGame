import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class Levels extends React.Component {
  state = {
    level: '3',
  };

  handleChange = event => {
    this.setState({ level: event.target.value });
    this.props.informParent(event.target.value)
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Difficulty</FormLabel>
          <RadioGroup
            aria-label="level"
            name="level"
            className={classes.group}
            value={this.state.level}
            onChange={this.handleChange}
            style={{flexDirection: 'row'}}
          >
            <FormControlLabel
              value="3"
              control={<Radio color="primary" />}
              label="Easy"
              labelPlacement="end"
            />
            <FormControlLabel
              value="2"
              control={<Radio color="primary" />}
              label="Normal"
              labelPlacement="end"
            />
            <FormControlLabel
              value="1"
              control={<Radio color="primary" />}
              label="Hard"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

Levels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Levels);