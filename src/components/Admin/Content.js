import React, {Component} from 'react';
import axios from 'axios';

export default class Content extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
          doctor:"",
          recep:""
        };
      }
      componentDidMount() {
        axios.get('http://localhost:4000/api/doctor/count')
            .then(response => {
                this.setState({ doctor: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
            axios.get('http://localhost:4000/api/receptionist/count')
            .then(response => {
                this.setState({ recep: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render(){
        const { open } = this.state;
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Monthly Recap Report</h3>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <p className="text-center">
                                                <strong>This is text</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <div className="row">                                    
                                        <div className="col-sm-3 col-xs-6">
                                            <div className="description-block border-right">
                                                <span className="description-percentage text-green"><i className="fa fa-caret-up"></i> {this.state.doctor}</span>
                                                <span className="description-percentage text-green"><i className="fa fa-caret-up"></i> {this.state.recep}</span>
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}