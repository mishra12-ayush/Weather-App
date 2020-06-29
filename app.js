window.addEventListener('load',() => {
    let long;
    let lat;
    let temperatureDescription= document.querySelector(".temperature-description");
    let temperatureDegree= document.querySelector(".temperature-degree");
    let locationTimezone= document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    let temperatureSpan = document.querySelector(".degree-section span");

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const proxy = "https://cors-anywhere.herokuapp.com/"; // we use this proxy as darksky api dosen't work with localhost server, So this proxy makes it usable
        const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`; // Api name= darksky

        fetch(api)
          .then(response => { return response.json(); })
          .then(data => {
            console.log(data);
            const temperature =data.currently.temperature; // Extracting temp in farenh. from darksky's json object
            const description =data.currently.summary;
            const timezone = data.timezone;
            const icon = data.currently.icon;

            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = description;
            locationTimezone.textContent= "TimeZone:" + timezone;

            let celsius = (temperature - 32)* (5/9);

            setIcons(icon, document.querySelector(".icon"));

            temperatureSection.addEventListener("click", () => {
                if(temperatureSpan.textContent === "F"){ temperatureSpan.textContent = "C";  temperatureDegree.textContent= Math.floor(celsius); }
                else{ temperatureSpan.textContent = "F"; temperatureDegree.textContent = temperature; }
            })
          })
      })

    }
    else{
      h1.textContent = "Your Browser does not support your Location"
    }

    function setIcons(icon, iconID){                       // Downloaded Skycon github js file as skycons icon names are same as Darksky icon name (only difference is of - and _)
      const skycons = new Skycons({color: "white"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase()        //replaces - with _ eg. partly-cloudy --> partly_cloudy
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
    }
});
