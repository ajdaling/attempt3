var dataReturned = "";
var countryData = ""
var InstitutionValues = "";
var ResearcherNames = "";
var ResearcherValues = "";
var docNames = "";
var docValues = "";
var yearNames;
var yearValues;
var yearNamesOne;
var yearValuesOne;
var momNames;
var momValues;
var momNamesOne ;
var momValuesOne;
var oTable;
//Kaeli
var my_rate_text = "";
var my_rate0_text = "";
var my_rate1_text = "";
var my_rate2_text = "";
var my_rate3_text = "";
var my_rate4_text = "";
var my_rate5_text = "";
var my_accel_text = "";
var my_vol_text = "";
var my_bullseye_text = "";
var my_table_text = "";

var sessionData = JSON.parse(localStorage.getItem("sessionData"));
console.log("first session data");
console.log(sessionData);
if(!sessionData.repData){
	sessionData.repData = {};
	sessionData.repData.annot = {};
	sessionData.repData.annot.my_rate_text = "All Documents vs Year";
	for(var i = 0; i < 9; i++){
		sessionData.repData.annot["my_rate"+String(i)+"_text"] = "Documents vs Year in Topic: " + sessionData["label" + String(i+1)];
	}
	sessionData.repData.annot.my_accel_text = "Acceleration";
	sessionData.repData.annot.my_vol_text = "Volume";
	sessionData.repData.annot.my_bullseye_text = "Bullseye";
	sessionData.repData.annot.my_table_text = "Table";
	updateSessionData(sessionData);
}

var selectedCountry = "";

var this_qry = sessionData.mainQuery;
var main_qry = sessionData.mainQuery;
var instName = sessionData.intitution;
var resName = sessionData.researcher;
var thisCompName = sessionData.compName;
var docType = sessionData.docType;
var yearMin = sessionData.start_year;
var yearMax = sessionData.end_year;
var selectedCountry = sessionData.selectedCountry;
var topic1 = sessionData.topic1;
var topic2 = sessionData.topic2;
var topic3 = sessionData.topic3;
var topic4 = sessionData.topic4;
var topic5 = sessionData.topic5;
var topic6 = sessionData.topic6;
var topic7 = sessionData.topic7;
var topic8 = sessionData.topic8;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function capitalize(tstring) {
    return tstring.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};


var dataSet = [];

var allBubbleData = [];
var bubbleData = [];
var bullseyeData = [];
var InstitutionNames = [];
var accelVals = [];
var accelVals_t0 = [];
var accelVals_t1 = [];
var accelVals_t2 = [];
var accelVals_t3 = [];
var accelVals_t4 = [];
var accelVals_t5 = [];
var volVals = [];
var volVals_t0 = [];
var volVals_t1 = [];
var volVals_t2 = [];
var volVals_t3 = [];
var volVals_t4 = [];
var volVals_t5 = [];
var allRates = [];
var allRates_t0 = [];
var allRates_t1 = [];
var allRates_t2 = [];
var allRates_t3 = [];
var allRates_t4 = [];
var allRates_t5 = [];
//
// Code for plotting charts
$.ajax({
	url: "http://"+config.host+":"+config.port+"/report/reportPage.sjs",
//			text: 'Document Types ' + '<a href="vizDemo2.html?this_qry='+this_qry+'&main_qry='+main_qry+'&instName='+instName+'&resName='+resName+'&docType=&yearMin='+yearMin+'&yearMax='+yearMax+'&selectedCountry='+selectedCountry+topic_url+'">Reset</a>'
//   url: "http://localhost:8931/reportPage.sjs?this_qry=(neurology%20OR%20neurosurgery)&main_qry=(neurology%20OR%20neurosurgery)&topic1=cell%20OR%20immun*&topic2=tissue&topic3=gene&topic4=acellular%20OR%20molecular&instName=mayo;harvard&resName=&docType=&yearMin=2000&yearMax=2017&selectedCountry=&topN=10",	type: "GET",
	dataType: 'json',
	xhrFields: { withCredentials: true },
	crossDomain: true,
	data: JSON.stringify(sessionData),
	success: function(retdata){		   
		console.log("complete");
		//console.log(retdata);
		dataSet = retdata.dataRows;
//		console.log(dataSet);
		var id = 0;
		for (i=0; i<dataSet.length; i++) {
			thisRow = dataSet[i];
			console.log("dataset ",thisRow);
			console.log(thisRow[12]);
//
// All docs
			allBubble = {};
			allBubble.id = id;
			allBubble.name = capitalize(thisRow[0]);
			allBubble.sel = thisRow[1];
			allBubble.iq = thisRow[2];
			allBubble.peakYear = thisRow[3];
			allBubble.number = thisRow[4]+thisRow[5]+thisRow[6]+thisRow[7]+thisRow[8];
			allBubble.nameID = thisRow[10];
			allBubble.accel = thisRow[11];
			allBubble.dtype = 0;
			var nameFound = false;
			var nameInd = -1;
			for (iname=0; iname<InstitutionNames.length; iname++) {
				if (allBubble.name == InstitutionNames[iname]) {
					nameFound = true;
					nameInd = iname;
				}
			}
			if (!nameFound) nameInd = InstitutionNames.length;
			var thisName = "ALL";
			if (allBubble.iq > 0) {
				thisName = allBubble.iq;
			}

			if (allBubble.iq == 0) {
				dataPacket = [];
				thisData = thisRow[12]
				for (year in thisData) {
					dataPacket.push([+year,thisData[year]]);
				}
				allRates.push({
         		 name:allBubble.name ,
         		 data: dataPacket,
					 color: Highcharts.Color(Highcharts.getOptions().colors[nameInd]).setOpacity(0.5).get('rgba')
         	})
			} else if (allBubble.iq == 1) {
				dataPacket = [];
				thisData = thisRow[12]
				for (year in thisData) {
					dataPacket.push([+year,thisData[year]]);
				}
				allRates_t0.push({
         		 name:allBubble.name ,
         		 data: dataPacket,
					 color: Highcharts.Color(Highcharts.getOptions().colors[nameInd]).setOpacity(0.5).get('rgba')

         	})
			} else if (allBubble.iq == 2) {
				dataPacket = [];
				thisData = thisRow[12]
				for (year in thisData) {
					dataPacket.push([+year,thisData[year]]);
				}
				allRates_t1.push({
         		 name:allBubble.name ,
         		 data: dataPacket,
					 color: Highcharts.Color(Highcharts.getOptions().colors[nameInd]).setOpacity(0.5).get('rgba')

         	})
			} else if (allBubble.iq == 3) {
				dataPacket = [];
				thisData = thisRow[12]
				for (year in thisData) {
					dataPacket.push([+year,thisData[year]]);
				}
				allRates_t2.push({
         		 name:allBubble.name ,
         		 data: dataPacket,
					 color: Highcharts.Color(Highcharts.getOptions().colors[nameInd]).setOpacity(0.5).get('rgba')

         	})
			} else if (allBubble.iq == 4) {
				dataPacket = [];
				thisData = thisRow[12]
				for (year in thisData) {
					dataPacket.push([+year,thisData[year]]);
				}
				allRates_t3.push({
         		 name:allBubble.name ,
         		 data: dataPacket,
					 color: Highcharts.Color(Highcharts.getOptions().colors[nameInd]).setOpacity(0.5).get('rgba')

         	})
			} else if (allBubble.iq == 5) {
				dataPacket = [];
				thisData = thisRow[12]
				for (year in thisData) {
					dataPacket.push([+year,thisData[year]]);
				}
				allRates_t4.push({
         		 name:allBubble.name ,
         		 data: dataPacket,
					 color: Highcharts.Color(Highcharts.getOptions().colors[nameInd]).setOpacity(0.5).get('rgba')

         	})
			} else if (allBubble.iq == 6) {
				dataPacket = [];
				thisData = thisRow[12]
				for (year in thisData) {
					dataPacket.push([+year,thisData[year]]);
				}
				allRates_t5.push({
         		 name:allBubble.name ,
         		 data: dataPacket,
					 color: Highcharts.Color(Highcharts.getOptions().colors[nameInd]).setOpacity(0.5).get('rgba')

         	})
			}


			if (nameFound) {
				if (allBubble.iq == 0) {
					accelVals.push({x:nameInd,y:allBubble.accel,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 1) {
					accelVals_t0.push({x:nameInd,y:allBubble.accel,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 2) {
					accelVals_t1.push({x:nameInd,y:allBubble.accel,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 3) {
					accelVals_t2.push({x:nameInd,y:allBubble.accel,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 4) {
					accelVals_t3.push({x:nameInd,y:allBubble.accel,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 5) {
					accelVals_t4.push({x:nameInd,y:allBubble.accel,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 6) {
					accelVals_t5.push({x:nameInd,y:allBubble.accel,z:allBubble.number,name:thisName});
				}
				if (allBubble.iq == 0) {
					volVals.push({x:nameInd,y:allBubble.number,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 1) {
					volVals_t0.push({x:nameInd,y:allBubble.number,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 2) {
					volVals_t1.push({x:nameInd,y:allBubble.number,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 3) {
					volVals_t2.push({x:nameInd,y:allBubble.number,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 4) {
					volVals_t3.push({x:nameInd,y:allBubble.number,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 5) {
					volVals_t4.push({x:nameInd,y:allBubble.number,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 6) {
					volVals_t5.push({x:nameInd,y:allBubble.number,z:allBubble.number,name:thisName});
				}
			} else {
				if (allBubble.iq == 0) {
					accelVals.push({x:InstitutionNames.length,y:allBubble.accel,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 1) {
					accelVals_t0.push({x:InstitutionNames.length,y:allBubble.accel,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 2) {
					accelVals_t1.push({x:InstitutionNames.length,y:allBubble.accel,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 3) {
					accelVals_t2.push({x:InstitutionNames.length,y:allBubble.accel,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 4) {
					accelVals_t3.push({x:InstitutionNames.length,y:allBubble.accel,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 5) {
					accelVals_t4.push({x:InstitutionNames.length,y:allBubble.accel,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 6) {
					accelVals_t5.push({x:InstitutionNames.length,y:allBubble.accel,z:allBubble.number,name:thisName});
				}
				if (allBubble.iq == 0) {
					volVals.push({x:InstitutionNames.length,y:allBubble.number,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 1) {
					volVals_t0.push({x:InstitutionNames.length,y:allBubble.number,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 2) {
					volVals_t1.push({x:InstitutionNames.length,y:allBubble.number,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 3) {
					volVals_t2.push({x:InstitutionNames.length,y:allBubble.number,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 4) {
					volVals_t3.push({x:InstitutionNames.length,y:allBubble.number,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 5) {
					volVals_t4.push({x:InstitutionNames.length,y:allBubble.number,z:allBubble.number,name:thisName});
				} else if (allBubble.iq == 6) {
					volVals_t5.push({x:InstitutionNames.length,y:allBubble.number,z:allBubble.number,name:thisName});
				}
				InstitutionNames.push(allBubble.name);
			}
			allBubbleData.push(allBubble);
//
			if (thisRow[4]>0) {
				thisBubble = {};
				thisBubble.id = id;
				thisBubble.name = capitalize(thisRow[0]);
				thisBubble.sel = thisRow[1];
				thisBubble.iq = thisRow[2];
				thisBubble.peakYear = thisRow[3];
				thisBubble.number = thisRow[4];
				thisBubble.nameID = thisRow[10];
				thisBubble.accel = thisRow[11];
				thisBubble.dtype = 0;
				bubbleData.push(thisBubble);
				if (thisBubble.iq > 0) {
				thisBullseye = [];
				thisBullseye.push(thisBubble.iq-1);
				thisBullseye.push('Pubmed');
				thisBullseye.push(thisBubble.name);
				thisBullseye.push(thisBubble.number);
				thisBullseye.push(thisBubble.nameID);
 				bullseyeData.push(thisBullseye);
				}
				id += 1;
			}

			if (thisRow[5]>0) {
			thisBubble = {};
				thisBubble.id = id;
				thisBubble.name = capitalize(thisRow[0]);
				thisBubble.sel = thisRow[1];
				thisBubble.iq = thisRow[2];
				thisBubble.peakYear = thisRow[3];
				thisBubble.number = thisRow[5];
				thisBubble.nameID = thisRow[10];
				thisBubble.accel = thisRow[11];
				thisBubble.dtype = 1;
				bubbleData.push(thisBubble);
				if (thisBubble.iq > 0) {
				thisBullseye = [];
				thisBullseye.push(thisBubble.iq-1);
				thisBullseye.push('Patents');
				thisBullseye.push(thisBubble.name);
				thisBullseye.push(thisBubble.number);
				thisBullseye.push(thisBubble.nameID);
 				bullseyeData.push(thisBullseye);
				}
				id += 1;
			}

			if (thisRow[7]>0) {
			thisBubble = {};
				thisBubble.id = id;
				thisBubble.name = capitalize(thisRow[0]);
				thisBubble.sel = thisRow[1];
				thisBubble.iq = thisRow[2];
				thisBubble.peakYear = thisRow[3];
				thisBubble.number = thisRow[7];
				thisBubble.nameID = thisRow[10];
				thisBubble.accel = thisRow[11];
				thisBubble.dtype = 2;
				bubbleData.push(thisBubble);
				if (thisBubble.iq > 0) {
				thisBullseye = [];
				thisBullseye.push(thisBubble.iq-1);
				thisBullseye.push('Clinical Trials');
				thisBullseye.push(thisBubble.name);
				thisBullseye.push(thisBubble.number);
				thisBullseye.push(thisBubble.nameID);
 				bullseyeData.push(thisBullseye);
				}
				id += 1;
			}

			if (thisRow[8]>0) {
			thisBubble = {};
				thisBubble.id = id;
				thisBubble.name = capitalize(thisRow[0]);
				thisBubble.sel = thisRow[1];
				thisBubble.iq = thisRow[2];
				thisBubble.peakYear = thisRow[3];
				thisBubble.number = thisRow[8];
				thisBubble.nameID = thisRow[10];
				thisBubble.accel = thisRow[11];
				thisBubble.dtype = 3;
				bubbleData.push(thisBubble);
				if (thisBubble.iq > 0) {
				thisBullseye = [];
				thisBullseye.push(thisBubble.iq-1);
				thisBullseye.push('Grants');
				thisBullseye.push(thisBubble.name);
				thisBullseye.push(thisBubble.number);
				thisBullseye.push(thisBubble.nameID);
 				bullseyeData.push(thisBullseye);
				}
				id += 1;
			}
			
		}
		my_rate();
		my_rate_t0();
		my_rate_t1();
		my_rate_t2();
		my_rate_t3();
		my_rate_t4();
		my_rate_t5();
		my_chartAccel();
		my_chartVol();
		myBullsEye(bullseyeData);
		myTable();

	}				
// error: function() {
//	console.log("session data");
	//console.log(sessionData);
//	 alert("error");
// }
})
.fail(
function() {
	console.log("session data");
	console.log(sessionData);
//	 alert("error");
 }
)
;


function myTable() {

	$(document).ready(function() {
		console.log("HERE");
		console.log(dataSet);
   	 $('#resultsTable').DataTable( {
      	  data: dataSet,
      	  columns: [
            	{ title: "Name" },
            	{ title: "Type" },
            	{ title: "Topic" },
            	{ title: "Peak Year" },
            	{ title: "Pubs" },
            	{ title: "Patents" },
            	{ title: "VC" },
            	{ title: "CTrials" },
            	{ title: "Grants" },
            	{ title: "Grant$" }
      	  ],
   			'iDisplayLength': 200
		     	 } );
	} );
}
function my_rate() {
	console.log("my_rate");
	console.log(allRates);
	$('#my_rate').highcharts({
		title: {
			text: 'All Documents Vs Year'
		},
		chart:{
      	 type:'scatter'
   	},
   	plotOptions:{
      	 scatter:{
         	  lineWidth:2
      	 }
   	},
   	series: allRates,
		legend: {
		   	width: 180,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'bottom',
            x: 0,
            y: -40,
				title: {text: 'Institutions'},
            floating: true,
				draggable: true,
				zIndex: 20,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
	});
}

function my_rate_t0() {
	console.log("my_rate0");
	console.log(allRates_t0);
	$('#my_rate0').highcharts({
		legend: {
        enabled: false
    	},
		title: {
			text: 'Documents Vs Year, Topic:' + topic1
		},
   	chart:{
			 width: 300,
      	 type:'scatter'
   	},
   	plotOptions:{
      	 scatter:{
         	  lineWidth:2
      	 }
   	},
   	series: allRates_t0
	});
}

function my_rate_t1() {
	console.log("my_rate0");
	console.log(allRates_t1);
	$('#my_rate1').highcharts({
		legend: {
        enabled: false
    	},
		title: {
			text: 'Documents Vs Year, Topic:' + topic2
		},
   	chart:{
			 width: 300,
      	 type:'scatter'
   	},
   	plotOptions:{
      	 scatter:{
         	  lineWidth:2
      	 }
   	},
   	series: allRates_t1
	});
}

function my_rate_t2() {
	console.log("my_rate0");
	console.log(allRates_t2);
	$('#my_rate2').highcharts({
		title: {
			text: 'Documents Vs Year, Topic:' + topic3
		},
   	chart:{
      	 type:'scatter',
			 width: 500,
			 marginRight: 200
   	},
   	plotOptions:{
			scatter:{
			  lineWidth:2
			},
			series: {
   			events: {
      			 legendItemClick: function () {
         			  var visibility = this.visible ? 'visible' : 'hidden';
         			  var series0 = $('#my_rate0').highcharts().series[this.index];
         			  var series1 = $('#my_rate1').highcharts().series[this.index];
         			  var series3 = $('#my_rate3').highcharts().series[this.index];
         			  var series4 = $('#my_rate4').highcharts().series[this.index];
        			     var series5 = $('#my_rate5').highcharts().series[this.index];
         			  if (this.visible) {
						   	series0.hide();
								series1.hide();
								series3.hide();
								series4.hide();
								series5.hide();
         			  } else {
						   	series0.show();
						   	series1.show();
						   	series3.show();
						   	series4.show();
						   	series5.show();
						  }
         			  return true;
      			 }
   			}
			}
   	},
        legend: {
		   	width: 180,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'bottom',
            x: 0,
            y: -20,
				title: {text: 'Institutions'},
            floating: true,
				draggable: true,
				zIndex: 20,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
		     	series: allRates_t2
	});
}

function my_rate_t3() {
	console.log("my_rate0");
	console.log(allRates_t3);
	$('#my_rate3').highcharts({
		title: {
			text: 'Documents Vs Year, Topic:' + topic4
		},
		legend: {
        enabled: false
    	},
   	chart:{
			 width: 300,
      	 type:'scatter'
   	},
   	plotOptions:{
      	 scatter:{
         	  lineWidth:2
      	 }
   	},
   	series: allRates_t3
	});
}

function my_rate_t4() {
	console.log("my_rate0");
	console.log(allRates_t4);
	$('#my_rate4').highcharts({
		title: {
			text: 'Documents Vs Year, Topic:' + topic5
		},
		legend: {
        enabled: false
    	},
   	chart:{
			 width: 300,
      	 type:'scatter'
   	},
   	plotOptions:{
      	 scatter:{
         	  lineWidth:2
      	 }
   	},
   	series: allRates_t4
	});
}

function my_rate_t5() {
	console.log("my_rate5");
	console.log(allRates_t5);
	$('#my_rate5').highcharts({
		title: {
			text: 'Documents Vs Year, Topic:' + topic6
		},
   	chart:{
      	 type:'scatter',
			 width: 500,
			 marginRight: 200
   	},
   	plotOptions:{
      	 scatter:{
         	  lineWidth:2
      	 },
			series: {
   			events: {
      			 legendItemClick: function () {
         			  var visibility = this.visible ? 'visible' : 'hidden';
         			  var series0 = $('#my_rate0').highcharts().series[this.index];
         			  var series1 = $('#my_rate1').highcharts().series[this.index];
         			  var series2 = $('#my_rate2').highcharts().series[this.index];
         			  var series3 = $('#my_rate3').highcharts().series[this.index];
         			  var series4 = $('#my_rate4').highcharts().series[this.index];
         			  if (this.visible) {
						   	series0.hide();
								series1.hide();
								series2.hide();
								series3.hide();
								series4.hide();
         			  } else {
						   	series0.show();
						   	series1.show();
						   	series2.show();
						   	series3.show();
						   	series4.show();
						  }
         			  return true;
      			 }
   			}
			}

   	},
        legend: {
		   	width: 180,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'bottom',
            x: 0,
            y: -40,
				title: {text: 'Institutions'},
            floating: true,
				draggable: true,
				zIndex: 20,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
   	series: allRates_t5
	});
}

function my_chartAccel() {
	console.log("my_chart");
    $('#accel').highcharts({
		chart: {
			height: 600,
			type: 'bubble',
			plotBorderWidth: 1,
			zoomType: 'xy'
		},
		title: {
			useHTML: true,
			text: 'Acceleration'
		},
		xAxis: {
            categories: InstitutionNames
        },
    yAxis: {
        startOnTick: false,
        endOnTick: false
    },
		plotOptions: {
   		  series: {
         		cursor: 'pointer',
         		point: {
            		 events: {
               		  click: function (ev) {
               			  sessionData.vizData.researcher = ev.point.category;
               			  updateSessionData(sessionData);
               			  location.href = 'vizDemo2.html';
               		  }
            		 }
         		}
   		  }
		 },
		series: [
			{
				name: 'All Topics',
				data: accelVals,
				grouping: false,
				pointPadding: 0,
				groupPadding: 0,
				dataLabels: {
                enabled: true,
                x:40,
                formatter:function() {
                    return this.point.name;
                },
                style:{color:"black"}
            },       
				marker: {
            	fillColor: {
               	 radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
               	 stops: [
                  	  [0, 'rgba(255,255,255,0.5)'],
                  	  [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
               	 ]
            	}
      	  }		
			
			},
			{
				name: "0: "+topic1,
				data: accelVals_t0,
				grouping: false,
				pointPadding: 0,
				groupPadding: 0,
				dataLabels: {
                enabled: true,
                x:40,
                formatter:function() {
                    return this.point.name;
                },
                style:{color:"black"}
            },       
				marker: {
            	fillColor: {
               	 radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
               	 stops: [
                  	  [0, 'rgba(255,255,255,0.5)'],
                  	  [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
               	 ]
            	}
      	  }		
			},
			{
				name: "1: "+topic2,
				data: accelVals_t1,
				grouping: false,
				pointPadding: 0,
				groupPadding: 0,
				dataLabels: {
                enabled: true,
                x:40,
                formatter:function() {
                    return this.point.name;
                },
                style:{color:"black"}
            },       
				marker: {
            	fillColor: {
               	 radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
               	 stops: [
                  	  [0, 'rgba(255,255,255,0.5)'],
                  	  [1, Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.5).get('rgba')]
               	 ]
            	}
      	  }		
			},			
			{
				name: "2: "+topic3,
				data: accelVals_t2,
				grouping: false,
				pointPadding: 0,
				groupPadding: 0,
				dataLabels: {
                enabled: true,
                x:40,
                formatter:function() {
                    return this.point.name;
                },
                style:{color:"black"}
            },       
				marker: {
            	fillColor: {
               	 radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
               	 stops: [
                  	  [0, 'rgba(255,255,255,0.5)'],
                  	  [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.5).get('rgba')]
               	 ]
            	}
      	  }		
			},			
			{
				name: "3: "+topic4,
				data: accelVals_t3,
				grouping: false,
				pointPadding: 0,
				groupPadding: 0,
				dataLabels: {
                enabled: true,
                x:40,
                formatter:function() {
                    return this.point.name;
                },
                style:{color:"black"}
            },       
				marker: {
            	fillColor: {
               	 radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
               	 stops: [
                  	  [0, 'rgba(255,255,255,0.5)'],
                  	  [1, Highcharts.Color(Highcharts.getOptions().colors[4]).setOpacity(0.5).get('rgba')]
               	 ]
            	}
      	  }		
			},		
			{
				name: "4: "+topic5,
				data: accelVals_t4,
				grouping: false,
				pointPadding: 0,
				groupPadding: 0,
				dataLabels: {
                enabled: true,
                x:40,
                formatter:function() {
                    return this.point.name;
                },
                style:{color:"black"}
            },       
				marker: {
            	fillColor: {
               	 radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
               	 stops: [
                  	  [0, 'rgba(255,255,255,0.5)'],
                  	  [1, Highcharts.Color(Highcharts.getOptions().colors[5]).setOpacity(0.5).get('rgba')]
               	 ]
            	}
      	  }		
			},			
			{
				name: "5: "+topic6,
				data: accelVals_t5,
				grouping: false,
				pointPadding: 0,
				groupPadding: 0,
				dataLabels: {
                enabled: true,
                x:40,
                formatter:function() {
                    return this.point.name;
                },
                style:{color:"black"}
            },       
				marker: {
            	fillColor: {
               	 radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
               	 stops: [
                  	  [0, 'rgba(255,255,255,0.5)'],
                  	  [1, Highcharts.Color(Highcharts.getOptions().colors[6]).setOpacity(0.5).get('rgba')]
               	 ]
            	}
      	  }		
			}			
		]
	});
}



function my_chartVol() {
	console.log("my_chart");
    $('#vol').highcharts({
		chart: {
			height: 600,
			type: 'bubble',
			plotBorderWidth: 1,
			zoomType: 'xy'
		},
		title: {
			useHTML: true,
			text: 'Total Volume'
		},
		xAxis: {
            categories: InstitutionNames
        },
    yAxis: {
        startOnTick: false,
        endOnTick: false
    },
		plotOptions: {
   		  series: {
         		cursor: 'pointer',
         		point: {
            		 events: {
               		  click: function (ev) {
               			  sessionData.vizData.researcher = ev.point.category;
               			  updateSessionData(sessionData);
               			  location.href = 'vizDemo2.html';
               		  }
            		 }
         		}
   		  }
		 },
		series: [
			{
				name: 'All Topics',
				data: volVals,
				grouping: false,
				pointPadding: 0,
				groupPadding: 0,
				dataLabels: {
                enabled: true,
                x:40,
                formatter:function() {
                    return this.point.name;
                },
                style:{color:"black"}
            },       
				marker: {
            	fillColor: {
               	 radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
               	 stops: [
                  	  [0, 'rgba(255,255,255,0.5)'],
                  	  [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
               	 ]
            	}
      	  }		
			
			},
			{
				name: "0: "+topic1,
				data: volVals_t0,
				grouping: false,
				pointPadding: 0,
				groupPadding: 0,
				dataLabels: {
                enabled: true,
                x:40,
                formatter:function() {
                    return this.point.name;
                },
                style:{color:"black"}
            },       
				marker: {
            	fillColor: {
               	 radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
               	 stops: [
                  	  [0, 'rgba(255,255,255,0.5)'],
                  	  [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
               	 ]
            	}
      	  }		
			},
			{
				name: "1: "+topic2,
				data: volVals_t1,
				grouping: false,
				pointPadding: 0,
				groupPadding: 0,
				dataLabels: {
                enabled: true,
                x:40,
                formatter:function() {
                    return this.point.name;
                },
                style:{color:"black"}
            },       
				marker: {
            	fillColor: {
               	 radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
               	 stops: [
                  	  [0, 'rgba(255,255,255,0.5)'],
                  	  [1, Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.5).get('rgba')]
               	 ]
            	}
      	  }		
			},			
			{
				name: "2: "+topic3,
				data: volVals_t2,
				grouping: false,
				pointPadding: 0,
				groupPadding: 0,
				dataLabels: {
                enabled: true,
                x:40,
                formatter:function() {
                    return this.point.name;
                },
                style:{color:"black"}
            },       
				marker: {
            	fillColor: {
               	 radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
               	 stops: [
                  	  [0, 'rgba(255,255,255,0.5)'],
                  	  [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.5).get('rgba')]
               	 ]
            	}
      	  }		
			},			
			{
				name: "3: "+topic4,
				data: volVals_t3,
				grouping: false,
				pointPadding: 0,
				groupPadding: 0,
				dataLabels: {
                enabled: true,
                x:40,
                formatter:function() {
                    return this.point.name;
                },
                style:{color:"black"}
            },       
				marker: {
            	fillColor: {
               	 radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
               	 stops: [
                  	  [0, 'rgba(255,255,255,0.5)'],
                  	  [1, Highcharts.Color(Highcharts.getOptions().colors[4]).setOpacity(0.5).get('rgba')]
               	 ]
            	}
      	  }		
			},		
			{
				name: "4: "+topic5,
				data: volVals_t4,
				grouping: false,
				pointPadding: 0,
				groupPadding: 0,
				dataLabels: {
                enabled: true,
                x:40,
                formatter:function() {
                    return this.point.name;
                },
                style:{color:"black"}
            },       
				marker: {
            	fillColor: {
               	 radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
               	 stops: [
                  	  [0, 'rgba(255,255,255,0.5)'],
                  	  [1, Highcharts.Color(Highcharts.getOptions().colors[5]).setOpacity(0.5).get('rgba')]
               	 ]
            	}
      	  }		
			},			
			{
				name: "5: "+topic6,
				data: volVals_t5,
				grouping: false,
				pointPadding: 0,
				groupPadding: 0,
				dataLabels: {
                enabled: true,
                x:40,
                formatter:function() {
                    return this.point.name;
                },
                style:{color:"black"}
            },       
				marker: {
            	fillColor: {
               	 radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
               	 stops: [
                  	  [0, 'rgba(255,255,255,0.5)'],
                  	  [1, Highcharts.Color(Highcharts.getOptions().colors[6]).setOpacity(0.5).get('rgba')]
               	 ]
            	}
      	  }		
			}			
		]
	});
}


/*
 * Below is the initialization code as well as some helper functions
 * to create a new bubble chart instance, load the data, and display it.
 */


/*
 * Function called once data is loaded from CSV.
 * Calls bubble chart function to display inside #vis div.
 */
//function display(error, data) {
//  if (error) {
//    console.log(error);
//  }
function displayBubbles(data) {
  myBubbleChart('#vis', data);
}

/*
 * Sets up the layout buttons to allow for toggling between view modes.
 */
function setupButtons() {
  d3.select('#toolbar')
    .selectAll('.button')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.button').classed('active', false);
      // Find the button just clicked
      var button = d3.select(this);

      // Set it as the active button
      button.classed('active', true);

      // Get the id of the button
      var buttonId = button.attr('id');
		console.log("buttonId "+buttonId);

      // Toggle the bubble chart based on
      // the currently clicked button.
      myBubbleChart.toggleDisplay(buttonId);
    });
}

/*
 * Helper function to convert a number into a string
 * and add commas to it to improve presentation.
 */
function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}


// Load the data.
//d3.csv('data/gates_money.csv', display);

// setup the buttons.
setupButtons();




function myBullsEye(data) {
    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function showData(point) {
        var data = point.data;
        var elem = document.getElementById('output');
        var html = '<table class=datatable>'
                   + '<tr><th colspan=2>Data</th></tr>'
                   + '<tr><td class=field>Institution: </td><td class=value>' + data[2] + '</td></tr>'
                   + '<tr><td class=field>Topic: </td><td class=value>' + slices[data[0]] + '</td></tr>'
                   + '<tr><td class=field>Doc  Type: </td><td class=value>' + data[1] + '</td></tr>'
                   + '<tr><td class=field>Documents: </td><td class=value>' + data[3] + '</td></tr>'
                   + '<tr><td class=field>Name ID" </td><td class=value>' + data[4] + '</td></tr>'
                   + '</table>';


        elem.innerHTML = html;
    }

//    var slices = ['Cell-based Therapies', 'Tissue-based Engineering', 'Gene-based Therapies', 'Acellular Therapies'];
    var slices = [topic1,topic2,topic3,topic4,topic5,topic6];
//     var theaters = {
//        1: 'Cell-based Therapies',
//        2: 'Tissue-based Engineering',
//        3: 'Gene-based Therapies',
//        4: 'Acellular Therapies'
//    };
    var theaters = {
        1: topic1,
        2: topic2,
        3: topic3,
        4: topic4,
        5: topic5,
        6: topic6
    };
    var bullseye = Raphael('canvas', 640, 600).bullseye({
        'slices': slices,
        'rings' : ['Clinical Trials','Patents','Pubs','Grants'],
        'startDegree': 0,
        'allowDrag': false,
        'onMouseOver': showData,
        'onPointClick': showData,
        'onSliceClick': function(sliceIdx) {
            alert("You've clicked on " + slices[sliceIdx]);
        }

    });
    var baseYear = 1940;
    //http://history1900s.about.com/od/worldwarii/a/wwiibattles.htm
    var olddata = [
        [0, 'Phase 1', 	'Mayo', 20, 'axis'],
        [1, 'Pubs', 	'Mayo', 3,  'axis'],
        [2, 'Patents', 'Mayo', 10, 'axis'],
        [3, 'Phase 2', 	'Mayo', 20, 'axis'],
        [0, 'Phase 1', 	'University of Pennsylvania', 20, 'axis'],
        [1, 'Pubs', 	'University of Pennsylvania', 3,  'axis'],
        [2, 'Patents', 'University of Pennsylvania', 10, 'axis'],
        [3, 'Phase 2', 	'University of Pennsylvania', 20, 'axis'],
        [0, 'Phase 1', 	'MD Anderson', 20, 'axis'],
        [1, 'Pubs', 	'MD Anderson', 3,  'axis'],
        [2, 'Patents', 'MD Anderson', 10, 'axis'],
        [3, 'Phase 2', 	'MD Anderson', 20, 'axis'],
        [0, 'Phase 1', 	'Harvard', 20, 'axis'],
        [1, 'Pubs', 	'Harvard', 3,  'axis'],
        [2, 'Patents', 'Harvard', 10, 'axis'],
        [3, 'Phase 2', 	'Harvard', 20, 'axis']
    ];


    var angle;
    var upper_bound, lower_bound;
	 var ring;
    for (var i = 0; i < data.length; i++) {
        switch(data[i][0]) {
            case 0:
                lower_bound = 5;
                upper_bound = 60;
                break;
            case 1:
                lower_bound = 60;
                upper_bound = 120;
                break;
            case 2:
                lower_bound = 120;
                upper_bound = 180;
                break;
            case 3:
                lower_bound = 180;
                upper_bound = 240;
                break;
            case 4:
                lower_bound = 240;
                upper_bound = 300;
                break;
            case 5:
                lower_bound = 300;
                upper_bound = 355;
                break;
        }
        switch(data[i][1]) {
            case 'Clinical Trials':
                ring = 0;
                break;
            case 'Patents':
                ring = 1;
                break;
            case 'Grants':
                ring = 2;
                break;
            case 'Pubmed':
                ring = 3;
                break;
        }

        angle = rand(lower_bound, upper_bound);

        // show positive angle when you hover over a point
        if (angle < 0) angle += 360;

		  size = data[i][3];


  // Nice looking colors - no reason to buck the trend
  var fillColor2 = d3.scale.linear()
    .domain([0,3,6,9,12,15,18,21,24])
    .range([
"#b2182b",
"#d6604d",
"#f4a582",
"#fddbc7",
"#f7f7f7",
"#d1e5f0",
"#92c5de",
"#4393c3",
"#2166ac"
]);

  // Sizes bubbles based on their area instead of raw radius
  var radiusScale = d3.scale.pow()
    .exponent(0.5)
    .range([2,5]);
		
        var point = bullseye.addPoint({
            label: " ",
            ring: ring,
            angle: angle * Math.PI / 180,
            pointFill: fillColor2(data[i][4]),
            pointSize: radiusScale(size/10),
            distance: .5
        });

        point.data = data[i];
    }
        
}


//Kaeli
var time = 2;

function asd()
{
    console.log(time);
    if(time==1) {
		document.getElementById("my_rate_desc").style.display="none";
		document.getElementById("my_rate0_desc").style.display="none";
		document.getElementById("my_rate1_desc").style.display="none";
		document.getElementById("my_rate2_desc").style.display="none";
		document.getElementById("my_rate3_desc").style.display="none";
		document.getElementById("my_rate4_desc").style.display="none";
		document.getElementById("my_rate5_desc").style.display="none";
		document.getElementById("my_accel_desc").style.display="none";
		document.getElementById("my_vol_desc").style.display="none";
		document.getElementById("my_bullseye_desc").style.display="none";
		document.getElementById("my_table_desc").style.display="none";
		time=2;
    }
    else {
		document.getElementById("my_rate_desc").style.display="block";
		$("#my_rate_text").val(sessionData.repData.annot.my_rate_text);
		document.getElementById("my_rate0_desc").style.display="block";
		$("#my_rate0_text").val(sessionData.repData.annot.my_rate0_text);
		document.getElementById("my_rate1_desc").style.display="block";
		$("#my_rate1_text").val(sessionData.repData.annot.my_rate1_text);
		document.getElementById("my_rate2_desc").style.display="block";
		$("#my_rate2_text").val(sessionData.repData.annot.my_rate2_text);
		document.getElementById("my_rate3_desc").style.display="block";
		$("#my_rate3_text").val(sessionData.repData.annot.my_rate3_text);
		document.getElementById("my_rate4_desc").style.display="block";
		$("#my_rate4_text").val(sessionData.repData.annot.my_rate4_text);
		document.getElementById("my_rate5_desc").style.display="block";
		$("#my_rate5_text").val(sessionData.repData.annot.my_rate5_text);
		document.getElementById("my_accel_desc").style.display="block";
		$("#my_accel_text").val(sessionData.repData.annot.my_accel_text);
		document.getElementById("my_vol_desc").style.display="block";
		$("#my_vol_text").val(sessionData.repData.annot.my_vol_text);
		document.getElementById("my_bullseye_desc").style.display="block";
		$("#my_bullseye_text").val(sessionData.repData.annot.my_bullseye_text);
		document.getElementById("my_table_desc").style.display="block";
		$("#my_table_text").val(sessionData.repData.annot.my_table_text);
		time=1;
    }
}




function my_rate_save (form) {
  sessionData.repData.my_rate_text = form.my_rate_text.value;
  updateSessionData(sessionData);
//  alert ("You typed: " + my_rate_text);
}
function my_rate0_save (form) {
	sessionData.repData.my_rate0_text = form.my_rate0_text.value;
	updateSessionData(sessionData);
//  alert ("You typed: " + my_rate0_text);
}
function my_rate1_save (form) {
	sessionData.repData.my_rate1_text = form.my_rate1_text.value;
	updateSessionData(sessionData);
//  alert ("You typed: " + my_rate1_text);
}
function my_rate2_save (form) {
	sessionData.repData.my_rate2_text = form.my_rate2_text.value;
	updateSessionData(sessionData);
//  alert ("You typed: " + my_rate2_text);
}
function my_rate3_save (form) {
	sessionData.repData.my_rate3_text = form.my_rate3_text.value;
	updateSessionData(sessionData);
//  alert ("You typed: " + my_rate3_text);
}
function my_rate4_save (form) {
	sessionData.repData.my_rate4_text = form.my_rate4_text.value;
	updateSessionData(sessionData);
//  alert ("You typed: " + my_rate4_text);
}

function my_rate5_save (form) {
	sessionData.repData.my_rate5_text = form.my_rate5_text.value;
	updateSessionData(sessionData);
//  alert ("You typed: " + my_rate5_text);
}

function my_accel_save (form) {
	sessionData.repData.my_accel_text = form.my_accel_text.value;
	updateSessionData(sessionData);
//  alert ("You typed: " + my_accel_text);
}

function my_vol_save (form) {
	sessionData.repData.my_vol_text = form.my_vol_text.value;
	updateSessionData(sessionData);
//  alert ("You typed: " + my_vol_text);
}

function my_bullseye_save (form) {
	sessionData.repData.my_bullseye_text = form.my_bullseye_text.value;
	updateSessionData(sessionData);
//  alert ("You typed: " + my_bullseye_text);
}

function my_table_save (form) {
	sessionData.repData.my_table_text = form.my_table_text.value;
	updateSessionData(sessionData);
//  alert ("You typed: " + my_table_text);
}