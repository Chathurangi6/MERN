import React from 'react'

class LabView extends React.Component {
    constructor(props){
        super(props);
       this.state = {
           pane:'loading'
       }


    }
    componentDidMount(){
        const welcome = <div>
            Welcome
        </div>
        this.setState({
            pane:welcome
        })
    }
    setPane(pane){
        
        this.setState({
            pane:pane
        })
    }


    render(){
        const labstyles={
            container:{
                padding:'0'
            },
            side:{
                // backgroundColor:'red',
                height:'100vh',
                margin:'0'
            },
            content:{
                // backgroundColor:'blue'
            }
        }

        const newTest = <div>
            <form>
                <h4>New Medical Report</h4>
                <div className="form-group">
                      <label>Patient Name:  </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.fname}
                        onChange={this.onChangeFName}
                        />
                  </div>
                
            </form>
        </div>


        return(
            <div style={labstyles.container} className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div style={labstyles.side} className = "col-md-2" >
                       Laboratory Options
                       <ul>
                           <li>
                             <a href="#" onClick={(e)=>this.setPane(newTest)} >New Test</a>
                           </li>
                           <li>
                            Test Reports
                           </li>
                       </ul>
                    </div>

                    {/* Contents */}
                    <div style={labstyles.content} className="col-md-10">
                     {this.state.pane}
                    </div>

                </div>






            </div>
        )
    }
}
export default LabView;