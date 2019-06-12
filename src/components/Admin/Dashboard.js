import React, {Component} from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default class Content extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
          doctor:"",
          recep:"",
          patient:""
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
            axios.get('http://localhost:4000/patient/count')
            .then(response => {
                this.setState({ patient: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render(){
        const { open } = this.state;
        return (
            <div className="">
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box ">
                            <div class="row">

                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 grow tc">
                                            <Card className=" shadow-5 br3">

                                                <CardContent>
                                                    <h5 class="text-muted">Doctors</h5>
                                                    <div class="metric-value d-inline-block">
                                                        <h1 class="mb-1">{this.state.doctor}</h1>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 grow tc">
                                            <Card className=" shadow-5 br3" >
                               <CardContent>
                                                    <h5 class="text-muted">Receptionists</h5>
                                                    <div class="metric-value d-inline-block">
                                                        <h1 class="mb-1">{this.state.recep}</h1>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 grow tc">
                                            <Card className=" shadow-5 br3">

                                                <CardContent>
                                                    <h5 class="text-muted">Patients</h5>
                                                    <div class="metric-value d-inline-block">
                                                        <h1 class="mb-1">{this.state.patient}</h1>
                                                    </div>
                                                </CardContent>
                                            </Card>
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