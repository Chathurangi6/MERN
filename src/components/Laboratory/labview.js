import React from 'react';
import axios from 'axios';
import tests from './test'

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
        backgroundColor:'white'
    },
    table:{
        backgroundColor:'beige',
        
        marginTop:'15px'
    }

}

class LabView extends React.Component {
    constructor(props){
        super(props);
       this.state = {
           pane:1,
           pname:'',
           paddr:'',
           pemail:'',
           results:[{name:'Shehan Kulathilake'}]
       }
       this.resultsSubmit = this.resultsSubmit.bind(this)       
       this.changeNewReport = this.changeNewReport.bind(this)
    }
    componentDidMount(){
        fetch('http://localhost:4000/api/report/get')
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            this.setState({
                results:res
            })
        });
      
    }
    setPane(pane){
        
        this.setState({
            pane:pane
        })
    }

    submitNewReport(e){
        e.preventDefault()
        const payload = {
            pname:this.state.pname,
            pemail:this.state.pemail,
            paddr:this.state.paddr,
            cbc: this.state.cbc, 
            lpd: this.state.lpd, 
            ura: this.state.ura, 
            fbs: this.state.fbs,
            ucl:this.state.ucl,


        }
   
        axios.post('http://localhost:4000/api/report/add',payload)
        .then(res=>console.log(res.status))
        .then(()=>{
           window.location.reload()
        })
    }

    resultsSubmit(e,_id){
        e.preventDefault();
        const payload = {}
        var curTest = null
        var curIndex = -1
        payload['_id'] = _id
        payload['state']="completed"
        const formData = new FormData(e.target);
       
        for(var pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
            if(pair[0].split('[')[0]===curTest){
             
                payload[curTest].push(pair[1]) 
            }
            else{
                curTest = pair[0].split('[')[0];
                console.log(curTest)
                payload[curTest]= [pair[1]]
                curIndex ++
            }
            
            console.log(JSON.stringify(payload))
         }



        axios.post('http://localhost:4000/api/report/results',payload)
        .then((res)=>{
           
        })
        .then(
            window.location.reload()
        )
        
    }

    populateResults(query){
        return this.state.results.map((report,key)=>{

            return   <li>
            <b>{key+1}</b> - {report.pname} - {report.timestamp}

            <button 
            type="submit"
            style={{float:'right'}}
            class="waves-effect waves-light btn"
            data-toggle="collapse" 
            data-target={"#results"+key+1} 
            aria-expanded="false" 
            aria-controls={"results"+key+1}
            >
        Test Results  
        </button>
        <div id={"results"+key+1} className="collapse" style={labstyles.table}>
            <br></br>
                    <form id={"resultform"+key+1} onSubmit={(e)=>this.resultsSubmit(e,report._id)}>
            <table class="table table-striped">
                <thead className="thead-dark">
                    <tr>

                    <th scope="col">
                        Component
                    </th>
                    <th scope="col">
                        Result
                    </th>
                    <th scope="col">
                        Standard Range
                    </th>
                    <th scope="col">
                        Units
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(tests).map(
                        test =>{
                            if(report[test]!=null&&report[test]!="false" ){
                                return (
                                    <>
                                    <tr>
                                        <td colSpan="4">
                                        	<h5><b>{tests[test].title}</b></h5>   
                                        </td>
                                    </tr>

                                    {this.testdata(test,key)}
                                    </>
                                ) 
                            }
                        }
                    )}
                </tbody>
            </table>
                    <button
                    type="submit"
                    class="waves-effect waves-light btn"
                    >
                        Save and Send
                    </button>
                    </form>
        </div>
        <hr></hr> 
    </li>
    })
    }

    testdata(test,key){
        console.log(tests[test].title)
        return tests[test].comp.map((comp,key)=>{
	        return  (
	        	<tr>
	                <td >
	                    {comp.name}
	                </td>
	                <td>
	                    <input style={{height:'14px',marginTop:'10px'}}name={test+"["+key + "]"} type="text"/>
	                </td>
	                <td>
	                    {comp.std}
	                </td>
	                <td>
	                    {comp.unit}
	                </td>
	            </tr>
	        )
        })       
    }

    changeNewReport(e){
        var key = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({
            [key]: value,
            
        },function(){console.log(this.state)})
    }

  

    render(){
       
        const newTest = 
        <div>
            <h4>New Medical Report</h4>
            <form onSubmit={this.submitNewReport.bind(this)}>
                <h5>Patient Information</h5>
                <div className="form-group">
                      <label>Patient Name:  </label>
                      <input 
                        type="text" 
                        id="pname"
                        name="pname"
                        className="form-control" 
                        value={this.state.pname} 
                        onChange={this.changeNewReport}
                        />
                  </div>
                
                <div className="form-group">
                <label>Patient Address:</label>
                <textarea
                type="text"
                name="paddr"
                className="form-control"
                value={this.state.paddr}
                onChange={this.changeNewReport}
                />
                </div>

                <div className="form-group" >
                    <label>Ema4</label>
                    <input
                        type="text"
                        name="pemail"
                        value={this.state.pemail}
                        onChange={this.changeNewReport}
                    />
                </div>

                <h5>Required Tests</h5>
            
        
				<div class="col-md-4">
					<div class="checkbox">
						<label >
							<input type="checkbox" name="cbc" id="checkboxes-0" value="1"
							onChange={this.changeNewReport}
							/>
							<span>Complete Blood Count (CBC)</span>
						</label>
					</div>
					<div class="checkbox">
						<label for="checkboxes-1">
							<input type="checkbox" name="fbs" id="checkboxes-1" value="2"
							onChange={this.changeNewReport}
							/>
							<span>Fasting Blood Sugar</span>
						</label>
					</div>
					<div class="checkbox">
						<label for="checkboxes-2">
							<input type="checkbox" name="lpd" id="checkboxes-2" value="3"
							onChange={this.changeNewReport}
							/>
							<span>Lipid Profile</span>
						</label>
					</div>
					<div class="checkbox">
						<label for="checkboxes-3">
							<input type="checkbox" name="ura" id="checkboxes-3" value="4"
							onChange={this.changeNewReport}
							/>
							<span>Urinalysis</span>
						</label>
					</div>
					<div class="checkbox">
						<label for="checkboxes-4">
							<input type="checkbox" name="ucl" id="checkboxes-4" value="5"
							onChange={this.changeNewReport}
							/>
							<span>Urine Culture</span>
						</label>
					</div>
				</div>
			    <button 
				    type="submit"
				    style={{float:'right'}}
				    class="waves-effect waves-light btn" > Add to Queue  
			    </button>
	        </form>
    	</div>

        const viewTest =
        <div>
            <h4>Pending Reports</h4>
            <p>Search Bar Goes here</p>

            <div id="results">
	            <ul>
	                {this.populateResults()}
	            </ul>
            </div>
        </div>
        let panes =[newTest,viewTest]
        return(
            <div style={labstyles.container} className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div style={labstyles.side} className = "col-md-2 col-sm-2" >
                       Laboratory Options
                        <ul>
                            <li>
                            	<a href="#" onClick={(e)=>this.setPane(0)} >New Report</a>
                            </li>
                            <li>
                            	<a href="#" onClick={(e)=>this.setPane(1)} >Pending Reports</a>
                            </li>
                           <li> </li>
                        </ul>
                    </div>

                    {/* Contents */}
                    <div style={labstyles.content} className="col-md-10 col-sm-10">
                     {/* {this.state.pane} */}
                        {panes[this.state.pane]}
                    </div>
                </div>
            </div>
        )
    }
}
export default LabView;