import React, { Component } from "react";
import '../../css/dateAndTime.css';


class DateAndTime extends Component {
	constructor(props){
		super(props)
		this.state = {
			currentdate : "",
			cTime : "",
			cDay : "",
			cDate : "",
			cYear : ""
		}
	}
	

	componentDidMount() {
		const{currentdate, cDay, cTime, cMonth, cDate, cYear} = this.state

		//this will automatically recall the function after every second.
		this.myInterval = setInterval(() => {
			
			//storing the current time, day and month seperately in below variables
			let currentdate = this.renderTime()[0]
			let cDay = this.renderTime()[1]
			let cTime = this.renderTime()[2]
			let cMonth = this.renderTime()[3]
			let cDate = this.renderTime()[4]
			let cYear = this.renderTime()[5]

			this.setState( () => ({
				currentdate: currentdate,
				cDay : cDay,		//updating current Day
				cTime : cTime,		//updating current Time
				cMonth : cMonth,	//updating current Month
				cDate : cDate, 		//updating current Date
				cYear : cYear		//updating current year
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
		let tt = "";

		if(h<12){
			tt = "am";
		}else{
			tt = "pm";
		}

		if(h == 24){
			h = 0;
		} else if (h>12){
			h = h - 12;
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
		let myClock = "" + dayarray[day] + " " + daym + " " + montharray[month] + " " + year + " | " + h + ":" + m + ":" + s + " " + tt;
		let currentDay = dayarray[day];
		let time = h + ":" + m + " " + tt ;
		let cMonth = montharray[month];
		let cDate = daym;
		let cYear = year;

		//return the above variables by adding it to a array. So it will be easy to access those variables in other functions 
		return(
			[myClock, currentDay, time, cMonth, cDate, cYear]
		);
	}


	render() {

		//destructuring
		const{currentdate , cDay, cTime, cMonth, cDate, cYear} = this.state
		return(
			<div>

				<div className="topHeader1 br3 shadow-2 grow bg-transparent " > 
					<div className="time tc"> 
						
						{cTime} 

					</div>
				</div>

				<div className="maindiv shadow-2 bg-transparent br3 grow pa1 tc" >
					<div className="day">
						{cMonth} {cDate} - {cDay}
					</div>
				</div>

			</div>
		);
	}
}


export default DateAndTime;