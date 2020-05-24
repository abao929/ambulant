// get latitude and longitude of user
var latitude;
var longitude;
  
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;

      status.textContent = '';
      // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
      return [latitude, longitude];
    }
    
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }

    success = (position) => {
        var apiCall ="https://api.openweathermap.org/data/2.5/onecall?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&exclude=minutely,current,daily&appid=5723983d148b242b37d4afedd3f763f6";
        // console.log(apiCall);
        function get_value(id,value){
          document.getElementById(id).innerHTML = value;
        }
        
        $.getJSON(apiCall, function(a){
          
          $('#timezone').html(a.timezone + "beef");
          get_value('beef', a.hourly[0].weather[0].description);
          
          var wIcon = a.hourly[0].weather[0].icon;
          var url = "http://openweathermap.org/img/wn/" + wIcon + "@2x.png"
        
          var goodWeather = ['clear sky', 'few clouds', 'scattered clouds', 'broken clouds', 'mist'];
          var badWeather = ['shower rain', 'rain', 'thunderstorm', 'snow'];
        
          var wDesc = a.hourly[0].weather[0].description;
         
          var ideal_temp = getCookie("temp");
          var current_temp = (9/5)*(a.hourly[0]["temp"] - 273) + 32;
          if((goodWeather.indexOf(wDesc) > -1)&& (Math.abs(parseInt(ideal_temp) - current_temp) <= 5)){
            const walk = document.getElementById("gluten");
            walk.innerHTML = "Now is a good time for a walk";
          }else{
            const walk = document.getElementById("gluten");
            walk.innerHTML = "Now is not a good time for a walk";         
          }
        
          document.getElementById("pictura").src = url;
        });
        
    }
  
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }



