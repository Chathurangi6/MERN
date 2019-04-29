import React, { Component } from "react";


class DateAndTime extends Component {
	constructor(props){
		super(props)
		this.state = {
			currentdate : "",
			cTime : "",
			cDay : ""
		}
	}
	

	componentDidMount() {
		const{currentdate} = this.state

		//this will automatically recall the function after every second.
		this.myInterval = setInterval(() => {
			
			//storing the current time, day and month seperately in below variables
			let currentdate = this.renderTime()[0]
			let cDay = this.renderTime()[1]
			let cTime = this.renderTime()[2]
			let cMonth = this.renderTime()[3]

			this.setState( () => ({
				currentdate: currentdate,
				cDay : cDay,		//current Day
				cTime : cTime,		//current Time
				cMonth : cMonth		//current Month
			}) )
		}, 1000)
	}


	renderTime = () => {

		//getting the current date
		let mydate = new Date();
		let year = mydate.getYear();
			if(year < 1000){
				year += 1900;
			}
		let day = mydate.getDay();
		let month = mydate.getMonth();
		let daym = mydate.getDate();
		const dayarray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
		const montharray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December");

		//getting the current time
		let currentTime = new Date();
		let h = currentTime.getHours();
		let m = currentTime.getMinutes();
		let s = currentTime.getSeconds();

		if(h == 24){
			h = 0;
		} else if (h>12){
			h = h - 0;
		}

		if( h<10 ){
			h = "0" + h;
		}

		if( m<10 ){
			m = "0" + m;
		}

		if( s<10 ){
			s = "0" + s;
		}
		
		//storing date, time and month in seperate variables to return
		let myClock = "" + dayarray[day] + " " + daym + " " + montharray[month] + " " + year + " | " + h + ":" + m + ":" + s;
		let currentDay = dayarray[day];
		let time = h + ":" + m + ":" + s;
		let cMonth = montharray[month];

		//return the above variables by adding it to a array. So those variables will be easy to address in other functions 
		return(
			[myClock, currentDay, time, cMonth]
		);
	}


	render() {

		//destructuring
		const{currentdate , cDay} = this.state
		return(
			<div> 
				{currentdate}
			</div>
		);
	}
}


export default DateAndTime;