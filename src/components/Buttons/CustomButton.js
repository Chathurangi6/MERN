import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class CustomButton extends Component{
    render(){
        return(
            <Button variant={this.props.type} size='lg' style={{marginRight: '5px'}}>
                {this.props.text}
            </Button>
        )
    }
}

export default CustomButton;