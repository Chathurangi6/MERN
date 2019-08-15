import React from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import tests from './test';
import SearchInput, {createFilter} from 'react-search-input'
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import nodemailer from 'nodemailer';



const KEYS_TO_FILTERS =[]
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
        backgroundColor:'white',
      //  backgroundImage:url('../../')
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
           old:{},
           results:[{name:'Shehan Kulathilake'}]
       }
       this.resultsSubmit = this.resultsSubmit.bind(this)
       this.changeNewReport = this.changeNewReport.bind(this)
       this.searchUpdated = this.searchUpdated.bind(this)
       this.fetchData = this.fetchData.bind(this)
    }
    componentDidMount(){
        this.fetchData();

    }
    componentDidUpdate = () => {
        this.fetchData()
      }
    fetchData(){
        fetch('http://localhost:4000/api/report/get')
        .then(res=>res.json())
        .then(res=>{

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

        this.setState({
            old1: payload
        })

        axios.post('http://localhost:4000/api/report/add',payload)
        .then(res=>console.log(res.status))
        .then(()=>{
           //window.location.reload()
            Swal.fire('New report added successfully!!!')
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
        console.log(payload)
        this.getpdf(payload)
        axios.post('http://localhost:4000/api/report/results',payload)

        .then((res)=>{

        })
        .then(
            //window.location.reload()

        )

    }

    //Save file to a pdf - npm install jspdf --save
    getpdf(payload){
        if(this.state.old1.cbc){
            const pdf = new jsPDF()
            let text="Complete Blood Report - Nawodaya\n_____________________________\n\n1. Patient Name          : "+this.state.old1.pname+"\n\n2. Patient E-mail         : "+this.state.old1.pemail+"\n\n3. Patient Address      : "+this.state.old1.paddr+"\n\n4. WBC                       : "+payload.cbc[0]+" mm3\n\n5. RBC                        : "+payload.cbc[1]+" mil/mm3\n\n6. Hemoglobin            : "+payload.cbc[2]+" g/dl"
            pdf.text(text,10,10)
            pdf.save("report.pdf")

            let receiver=this.state.old1.pemail
            const sendingData={}
            sendingData[0]=receiver
            sendingData[1]=text
            console.log(sendingData)
            axios.post('http://localhost:4000/api/report/sendReport',sendingData)         

        }
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
        //console.log(tests[test].title)
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
    searchUpdated (term) {
        this.setState({searchTerm: term})
      }

    changeNewReport(e){
        var key = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({
            [key]: value,

        },function(){
            console.log(this.state)
            console.log(this.state.old)
        })
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
                    <label>Email</label>
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
        class="waves-effect waves-light btn" >
          Add to Queue
        </button>
            </form>
        </div>


        const viewTest =
        <div>
            <h4>Pending Reports</h4>
            <SearchInput onChange={this.searchUpdated} />

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
                     <aside className="main-sidebar" style={{paddingLeft:"20px"}}>
                         <section className="sidebar" >

                        <ul  className="sidebar-menu">
                         <li className="header">Laboratory Options</li>
                            <li>
                            	<a href="#" onClick={(e)=>this.setPane(0)} >New Report</a>
                            </li>
                            <li>
                            	<a href="#" onClick={(e)=>this.setPane(1)} >Pending Reports</a>
                            </li>
                           <li> </li>
                        </ul>
                        </section></aside>
                    </div>

                    {/* Contents */}
                    <div style={labstyles.content} className="col-md-10 col-sm-10" >
                         <header className="main-header">

              <nav className="navbar navbar-static-top">
                <Toolbar>
                  <IconButton  color="inherit" aria-label="Menu">
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" color="inherit" >

                  </Typography>
                  <Button color="inherit" className="top-right" onClick={this.onLogoutClick}>Logout</Button>
                </Toolbar>
              </nav>
            </header>
                        <div className="container" style={{border:"2px",borderRadius:"5px",backgroundColor:"white",padding:'10px',marginTop:'20px', width:"900px"}}>

                     {/* {this.state.pane} */}</div>
                        {panes[this.state.pane]}
                    </div>
                </div>
            </div>
        )
    }
}
export default LabView;
