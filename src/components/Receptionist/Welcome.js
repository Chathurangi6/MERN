import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Welcome extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {

        const { user } = this.props.auth;
        console.log(user);
        return(
            <div>
                <p>{user.email}</p>
            </div>
        )
}
}
export default Welcome;