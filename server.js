  
const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const app = express();
app.set('view engine', ejs);

app.get('/', (req, res) => {
    let url = 'https://api.thevirustracker.com/free-api?countryTimeline=EE';

    axios.get(url).
    then((response)=> {

        let countryData = response.data.countrytimelinedata[0].info;
        //get the very first day
        let firstDayObject = response.data.timelineitems[0];
       
        let firstDayDate = Object.keys(firstDayObject)[0]; //get the key (the first day date)
        let firstDayData = firstDayObject[firstDayDate]; //get the first day data
        //console.log(firstDayDate);   //display the data by the key
     
        //console.log(firstDayObject[firstDayDate]);
       
         //get the latest date available
        let latestDayObject = response.data.timelineitems[0];
        //console.log(latestDayObject);
        let latestDayDate = Object.keys(latestDayObject)[Object.keys(latestDayObject).length-2];//get the latest date
        let latestDayData = latestDayObject[latestDayDate]; //get the latest data
        console.log(latestDayDate);
        console.log(latestDayObject[latestDayDate]);

        console.log(countryData.title);
        res.render('index.ejs', {data: countryData, 
            firstDay: firstDayDate, 
            latestDay: latestDayDate,
            firstDayData: firstDayData,
            latestDayData: latestDayData
         });
    })
    .catch((error)=> {
        console.log(error);
    });

});

app.listen(3000, () => {
    console.log('Server is running on Port 3000.');
});