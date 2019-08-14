<div className='col-md-10'>
            <div className='row'>
              <header className="main-header" style={{width:'100%'}}> {/*className="main-header*/}
              {/*<DateAndTime />*/}
                <nav className="navbar navbar-static-top logoutnav" style={{ width: "100%" }} >
                  <div className='logoutdiv tc' style={{ marginLeft: "auto" }} >
                    <Button className="logoutbutton grow shadow-5" color='danger' onClick={this.onLogoutClick} >Logout</Button>
                  </div>
                </nav>
              </header>
            </div>
            <div className='row'>
              <div className="container" style={{ border: "2px", borderRadius: "5px", backgroundColor: "rgba(255,255,255,0.2)", padding: '10px', marginTop: '20px', width: "900px" }}>
                <h3 align="center">Appointment List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.appointDetail.map(user =>
                      <tr key={user._id}>
                        <td>
                          {user.p_fname}
                        </td>
                        <td>
                          {user.p_lname}
                        </td>
                        <td>
                          {user.phn_number}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>  
          </div>