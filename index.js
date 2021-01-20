const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 5000;

const BASE_URL = "https://mechgroupbuys.com/gb-data";

const errorPage = require("./public/404.json"); 
const indexPage = require("./public/index.json");

function parseDate(date) {
	var month=0
		day=0
		year=0;
	if (date.split("/").length-1==1) [month,year] = date.split["/"]
	else [month,day,year] = date.split("/");
	month = parseInt(month)-1;
	if (parseInt(year)<2000){year = parseInt(year)+2000;}
	var dateObj = new Date(year, month, day);
	return dateObj;
}

function routerFunc (req, res) {
	res.set("Cache-Control","public, max-age=3600, s-maxage=4000");

	const route = req.path.slice(1);
	const status = req.query.status;
	const validStatus = ["live","upcoming","ic","ended"];
	
	//invalid status code error
	if (validStatus.indexOf(status)==-1 || status===undefined) {res.json({"error":{"invalid_status":`${status} is not a valid status, must be one ["live","upcoming","ic","ended"]`}}); return};
	axios.get(BASE_URL)
		.then((response) => {
			const today = new Date();
			
			const items = response.data.filter(item => item.type===route);
			
			
			const upcoming = items.filter(item=>parseDate(item.startDate)>today);
			const ic = items.filter(item=>item.startDate==="" && item.endDate==="");
			const ended = items.filter(item=>parseDate(item.endDate)<today);
			const live = items.filter(item=>parseDate(item.startDate)<today && ended.indexOf(item)==-1);

			switch(status) {
				case "live":res.json(live);break;
				case "upcoming":res.json(upcoming);break;
				case "ic":res.json(ic);break;
				case "ended":res.json(ended);break;
				default: return;
			}
		})
		.catch(err => console.log(err));
}	

app.get("/keyboards", (req, res) => routerFunc(req, res));
app.get("/keycaps", (req, res) => routerFunc(req, res));
app.get("/switches", (req, res) => routerFunc(req, res));

app.get("/", (req, res) => {res.json(indexPage);})

app.get("/404", (req, res) => {res.json(errorPage);})

app.use((req,res,next) => {
	res.status(404);
	res.redirect("/404");
})

app.listen(PORT);