import React  from "react";
class Step1 extends React.Component {
  render() {
    if (this.props.currentStep !== 1) { // Prop: The current step
      return null
    }
    // The markup for the Step 1 UI
    return (
      <div className="form-group">
        <label>Doctor: </label>
        <select
          className="form-control"
          value={this.props.doctor}
          onChange={this.props.handleChange}
        >
          <option value="Dr.S">Dr.S</option>
          <option value="Dr.V">Dr.V</option>
        </select>
      </div>
    )
  }
}
export default Step1