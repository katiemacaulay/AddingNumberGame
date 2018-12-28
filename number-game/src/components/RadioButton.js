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
    flexDirection: 'row'
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class RadioButtonsGroup extends React.Component {
  state = {
    difficulty: '18',
  };

  handleChange = event => {
    this.setState({ difficulty: event.target.value });
    this.props.informParent(event.target.value)
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Number of Tiles</FormLabel>
          <RadioGroup
            aria-label="Number of Tiles"
            name="Number of Tiles"
            className={classes.group}
            value={this.state.difficulty}
            onChange={this.handleChange}
            style={{flexDirection: 'row'}}
          >
            <FormControlLabel
              value="16"
              label="16 Tiles"
              control={<Radio color="primary" />}
              labelPlacement="end"
            />
            <FormControlLabel
              value="12"
              label="12 Tiles"
              control={<Radio color="primary" />}
              labelPlacement="end"
            />
            <FormControlLabel
              value="6"
              label="6 Tiles"
              control={<Radio color="primary" />}
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);