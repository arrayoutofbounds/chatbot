$(function(){
	// DOM is loaded

	// chat bot will introduce itself
	get_username();

	$("#textbox").keypress(function(event){

		// if enter is pressed
		if(event.which == 13){

			if( $("#enter").prop("checked") ){ // checks if the property checked is true or not for textbox

				// if check boxed is checked and enter is pressed. It will first clear the text area
				$("#send").click();
				// prevent newline when enter is pressed
				event.preventDefault();
			}

		}

	});

	// if the send button is clicked it will clear the text area
	$("#send").click(function(){

		var username = "<span class='username'>You: </span>";

		var newMessage = $("#textbox").val();

		// empties the text box
		$("#textbox").val("");

		// append new message to old 
		var prevMessage = $("#container").html();

		// if container showing the chat is empty then dont add the breakline
		if(prevMessage.length > 3){
			prevMessage = prevMessage + "<br>";
		}

		// adds the word "you" to every message
		$("#container").html(prevMessage + username +  newMessage);

		// put the scroll bar at the bottom of the height of the container
		$("#container").scrollTop($("#container").prop("scrollHeight"));

		// message sent to chat bot so it knows how to respond
		ai(newMessage);
	});
});

var username = "";

// appends chatbot to start of message and then appends messages
function send_message(message){

		// append new message to old 
		var prevMessage = $("#container").html();

		// if container showing the chat is empty then dont add the breakline
		if(prevMessage.length > 3){
			prevMessage = prevMessage + "<br>";
		}

		// adds the word "you" to every message and displays it on the div
		$("#container").html(prevMessage + "<span class='current_message'>" + "<span class='bot'>Chatbot: </span>" +  message + "</span>");

		// hide the current message that is returned from the chatbot
		$(".current_message").hide();
		// after a 500 msec delay it fade ins the message to make it look more natural.
		$(".current_message").delay(500).fadeIn();

		// after displaying current message, get rid of current message class as the message is no longer current as it is already been shown.
		$(".current_message").removeClass("current_message");

}

// get name of the person 
function get_username(){
		send_message("Hello, what is your name?")
}

// reply to user with some intelligence
function ai(message){
	if(username.length<3){
		username = message;
		send_message("Nice to meet you " + username +  ", how are you doing?");
	}

	// checks that how are you is in the message
	if(message.indexOf("how are you") >= 0){
		send_message("Thanks, I am good!");
	}

	// gives the current time
	if(message.indexOf("time") >= 0){
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		send_message("Current time is " + hours + ":" + minutes);
	}

	if(message.indexOf("date") >= 0){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 

		today = mm+'/'+dd+'/'+yyyy;
		send_message("Current date is " + today);
	}

	if(message.indexOf("weather") >= 0){
	$.simpleWeather({
      zipcode: '78750',
      unit: 'f',
      success: function(weather) {
          html = '<h2>'+weather.city+', '+weather.region+'</h2>';
          html += '<img style="float:left;" width="125px" src="'+weather.image+'">';
          html += '<p>'+weather.temp+'&deg; '+weather.units.temp+'<br /><span>'+weather.currently+'</span></p>';
          html += '<a href="'+weather.link+'">View Forecast &raquo;</a>';
          html += "<br>";
  
          $("#container").append(html);
      },
      error: function(error) {
          $("#container").append('<p>'+error+'</p>');
      }
  });


	}

}


(function(e){"use strict";e.extend({simpleWeather:function(t){t=e.extend({zipcode:"",woeid:"2357536",location:"",unit:"f",success:function(e){},error:function(e){}},t);var n=new Date;var r="http://query.yahooapis.com/v1/public/yql?format=json&rnd="+n.getFullYear()+n.getMonth()+n.getDay()+n.getHours()+"&diagnostics=true&callback=?&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=";if(t.location!==""){r+='select * from weather.forecast where location in (select id from weather.search where query="'+t.location+'") and u="'+t.unit+'"'}else if(t.zipcode!==""){r+='select * from weather.forecast where location in ("'+t.zipcode+'") and u="'+t.unit+'"'}else if(t.woeid!==""){r+="select * from weather.forecast where woeid="+t.woeid+' and u="'+t.unit+'"'}else{t.error("Could not retrieve weather due to an invalid WOEID or location.");return false}e.getJSON(r,function(n){if(n!==null&&n.query.results!==null&&n.query.results.channel.description!=="Yahoo! Weather Error"){e.each(n.query.results,function(e,n){if(n.constructor.toString().indexOf("Array")!==-1){n=n[0]}var r=new Date;var i=new Date(r.toDateString()+" "+n.astronomy.sunrise);var s=new Date(r.toDateString()+" "+n.astronomy.sunset);if(r>i&&r<s){var o="d"}else{var o="n"}var u=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];var a=u[Math.round(n.wind.direction/22.5)];if(n.item.condition.temp<80&&n.atmosphere.humidity<40){var f=-42.379+2.04901523*n.item.condition.temp+10.14333127*n.atmosphere.humidity-.22475541*n.item.condition.temp*n.atmosphere.humidity-6.83783*Math.pow(10,-3)*Math.pow(n.item.condition.temp,2)-5.481717*Math.pow(10,-2)*Math.pow(n.atmosphere.humidity,2)+1.22874*Math.pow(10,-3)*Math.pow(n.item.condition.temp,2)*n.atmosphere.humidity+8.5282*Math.pow(10,-4)*n.item.condition.temp*Math.pow(n.atmosphere.humidity,2)-1.99*Math.pow(10,-6)*Math.pow(n.item.condition.temp,2)*Math.pow(n.atmosphere.humidity,2)}else{var f=n.item.condition.temp}if(t.unit==="f"){var l="c";var c=Math.round(5/9*(n.item.condition.temp-32));var h=Math.round(5/9*(n.item.forecast[0].high-32));var p=Math.round(5/9*(n.item.forecast[0].low-32));var d=Math.round(5/9*(n.item.forecast[1].high-32));var v=Math.round(5/9*(n.item.forecast[1].low-32))}else{var l="f";var c=Math.round(9/5*n.item.condition.temp+32);var h=Math.round(9/5*n.item.forecast[0].high+32);var p=Math.round(9/5*n.item.forecast[0].low+32);var d=Math.round(5/9*(n.item.forecast[1].high+32));var v=Math.round(5/9*(n.item.forecast[1].low+32))}var m={title:n.item.title,temp:n.item.condition.temp,tempAlt:c,code:n.item.condition.code,todayCode:n.item.forecast[0].code,timeOfDay:o,units:{temp:n.units.temperature,distance:n.units.distance,pressure:n.units.pressure,speed:n.units.speed,tempAlt:l},currently:n.item.condition.text,high:n.item.forecast[0].high,highAlt:h,low:n.item.forecast[0].low,lowAlt:p,forecast:n.item.forecast[0].text,wind:{chill:n.wind.chill,direction:a,speed:n.wind.speed},humidity:n.atmosphere.humidity,heatindex:f,pressure:n.atmosphere.pressure,rising:n.atmosphere.rising,visibility:n.atmosphere.visibility,sunrise:n.astronomy.sunrise,sunset:n.astronomy.sunset,description:n.item.description,thumbnail:"http://l.yimg.com/a/i/us/nws/weather/gr/"+n.item.condition.code+o+"s.png",image:"http://l.yimg.com/a/i/us/nws/weather/gr/"+n.item.condition.code+o+".png",tomorrow:{high:n.item.forecast[1].high,highAlt:d,low:n.item.forecast[1].low,lowAlt:v,forecast:n.item.forecast[1].text,code:n.item.forecast[1].code,date:n.item.forecast[1].date,day:n.item.forecast[1].day,image:"http://l.yimg.com/a/i/us/nws/weather/gr/"+n.item.forecast[1].code+"d.png"},city:n.location.city,country:n.location.country,region:n.location.region,updated:n.item.pubDate,link:n.item.link};t.success(m)})}else{if(n.query.results===null){t.error("An invalid WOEID or location was provided.")}else{t.error("There was an error retrieving the latest weather information. Please try again.")}}});return this}})})(jQuery);
