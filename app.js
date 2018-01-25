const express = require('express');
const request = require('request');
require('dotenv').config();

var app = express();
app.get('/:search/:offset', (req, res)=>{
	var searchTerm = req.params['search'] || '';
	var offset = req.params['offset'] || '';
	request.get('https://api.imgur.com/3/gallery/search/time/' + offset + '?q=' + searchTerm, { json: true }, (err, response, body) => {
  		if (err) { return console.log(err); }
  		var data = response.body.data;
  		data = data.map((el)=>{
  			return {page_url: el.link, title: el.title, description: el.description};
  		})
  		res.json(data);
	}).auth(null, null, true, process.env.ACCESS_TOKEN);
})
app.listen(3000);