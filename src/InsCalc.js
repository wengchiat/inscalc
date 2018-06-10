import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid, Paper } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import calcInput from './config/calcInput';
import One from './Steps/One';
import Two from './Steps/Two';
import Three from './Steps/Three';

// We can inject some CSS into the DOM.
const styles = theme => ({
  root: {
    maxWidth: '760px',
    margin: '0px auto',
  },
  paper: {
    padding: '16px',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
});

// steps
/**
 * Adds two numbers together.
 * @param {int} num1 The first number.
 * @param {int} num2 The second number.
 * @returns {int} The sum of the two numbers.
 */
function getSteps() {
  return ['Calculate Insurance', 'Hospitalization Costs', 'Recovery Costs'];
}

/**
  * Adds two numbers together.
  * @param {int} name The first number.
  * @param {int} step The first number.
  * @param {int} e The second number.
  * @param {int} v The second number.
  * @returns {int} The sum of the two numbers.
*/
class InsCalc extends Component {
  /**
    * Constructor
    * @param {int} props the property
    * @param {int} num2 The second number.
    * @returns {int} The sum of the two numbers.
    */
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      // Step 1: Current Income, Expenses and Coverage
      income: 60000,
      mortage: 0,
      otherExp: 10000,
      savings: 0,
      ciInsurance: 10000,
      currInsurance: 0,
      epf: 10000,
      // Step 2: Hospitalization costs
      healthcareExpenses: 25000,
      otherExpenses: 10000,
      // Step 3: Recovery costs
      spousalIncome: 0,
      desiredIncome: 1399,
      recoveryMonthly: 1000,
      recoveryTime: 12,
      // others
      data: [],
    };
  }
  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <One
            calcInput={calcInput}
            {...this.props}
            {...this.state}
            handleChange={this.handleChange}
            handleTextChange={this.handleTextChange}
          />
        );
      case 1:
        return (
          <Two
            calcInput={calcInput}
            {...this.props}
            {...this.state}
            handleChange={this.handleChange}
            handleTextChange={this.handleTextChange}
          />
        );
      case 2:
        return (
          <Three
            calcInput={calcInput}
            {...this.props}
            {...this.state}
            handleChange={this.handleChange}
            handleTextChange={this.handleTextChange}
          />
        );
      default:
        return 'Unknown step';
    }
  }
  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  }
  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  }
  handleReset = () => {
    this.setState({ activeStep: 0 });
  }
  handleChange = (e, v) => {
    const newState = this.state;
    newState[e] = v;
    this.setState(newState);
  }
  handleTextChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }
  render = () => {
    const { classes } = this.props;
    const { activeStep } = this.state;
    const steps = getSteps();

    return (
      <Grid container spacing={16} className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Stepper activeStep={activeStep}>
              {
                steps.map((label) => {
                  const props = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...props}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })
              }
            </Stepper>
            <div>
              {
                activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed - you&quot;re finished
                    </Typography>
                    <Button onClick={this.handleReset} className={classes.button}>
                      Reset
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Typography className={classes.instructions}>
                      {this.getStepContent(activeStep)}
                    </Typography>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button variant="raised" color="primary" onClick={this.handleNext} className={classes.button}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                )
              }
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

InsCalc.propTypes = {
  medInflation: PropTypes.number,
  inflation: PropTypes.number,
};

InsCalc.defaultProps = {
  medInflation: 0.04,
  inflation: 0.02,
};

export default withStyles(styles)(InsCalc);
