window.addEventListener('load', ()=>{
    let long ;
    let lat ;
    let tempDescription =  document.querySelector(".temp-description") ;
    let tempDegree = document.querySelector(".temp-degree") ;
    let locationTimezone = document.querySelector(".location-timezone") ;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=`+ lat + `&lon=` + long + `&appid=d429509e586abac67f8d231677fdc168` ;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    //Set DOM Elements from the API
                    tempDegree.textContent = data.main.temp ;
                    tempDescription.textContent = data.weather[0].description ;
                    locationTimezone.textContent = data.name;

                });

        })

    }


}) ;