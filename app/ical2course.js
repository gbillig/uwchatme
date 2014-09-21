module.exports = function(iCal, timestamp) {
	var fs = require('fs');
	var ical2json = require("ical2json");

	function addDays(theDate, days) {
	    return new Date(theDate.getTime() + days*24*60*60*1000);
	}

	var output = ical2json.convert(iCal);
	fs.writeFile('iCalJson.js', JSON.stringify(output), function(err) {});

	output = output.VCALENDAR[0].VEVENT;
	var newCal = [];



	output.forEach(function(element, index, array) {
		if (!element.RRULE) {
			newCal.push(element);
		} else {

			var startDate = new Date();
			var endDate = new Date();
			var startDateOffset = new Date();
			var endDayOffset = new Date();
			var finalEndDate = new Date();
			var classDays = {
				"strings": [],
				"numbers": []
			};
			var rruleParams = [];

			startDate = new Date(element.DTSTART);
			endDate = new Date(element.DTEND);
			rruleParams = element.RRULE.split(";");
			finalEndDate = new Date(rruleParams[1].slice(6));
			classDays.strings = rruleParams[3].split(",");
			classDays.strings[0] = classDays.strings[0].slice(6);

			for(var i = 0; i<classDays.strings.length; i++) {
				switch (classDays.strings[i]) {
				  case "MO":
				  	classDays.numbers.push(1);
				    break;
				  case "TU":
				  	classDays.numbers.push(2);
				    break;
				  case "WE":
				  	classDays.numbers.push(3);
				    break;
				  case "TH":
				  	classDays.numbers.push(4);
				    break;
				  case "FR":
				  	classDays.numbers.push(5);
				    break;  
				}
			}

			console.log("Course Days:" + classDays.numbers);

			var courseStartDay = startDate.getDay();

			for(var i = 0; i<classDays.numbers.length; i++) {

				var dayOffset = classDays.numbers[i] - courseStartDay;
				if (dayOffset < 0) {
					dayOffset = dayOffset + 7;
				}
				startDateOffset = addDays(startDate, dayOffset);
				endDateOffset = addDays(endDate, dayOffset);


				while(endDateOffset.getTime() < finalEndDate.getTime()) {	
					var tempEvent = {
			            "DTSTART": startDateOffset.toISOString(),
			            "DTEND": endDateOffset.toISOString(),
			            "SUMMARY": element.SUMMARY,
			            "LOCATION": element.LOCATION,
			            "DESCRIPTION": element.DESCRIPTION
        			};

        			newCal.push(tempEvent);

					startDateOffset = addDays(startDate, 7);
					endDateOffset = addDays(endDate, 7);
				};
			}

		}
	});

	var iCal = {
		"VEVENT": newCal
	};

	fs.writeFile('newiCalJson.js', JSON.stringify(iCal), function(err) {});


}