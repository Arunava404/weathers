document.addEventListener('DOMContentLoaded',()=>{
    const container=document.querySelector('.container');
    const searchButton=document.querySelector('.search-box button')
    const searchInput= document.querySelector('.search-box input')
    const weatherBox= document.querySelector('.weather-box')
    const weatherDetails= document.querySelector('.weather-details')
    const loadIndiactor=document.querySelector('.load')
    const weatherImage= document.querySelector('.weather-box img')
    
    searchButton.addEventListener('click',()=>{
         loadIndiactor.style.display='block'
        const APIKey= '9dd382b1e24bff2a6246ba5b90a9e8a9'
        const location=searchInput.value.trim();
         
        if (location==='')return;
         
        weatherImage.src='';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`)
        .then(response=>response.json())
        .then(data=>handleWeatherData(data))
        .catch(error=>{
              console.log('Error fetching weather data',error);
              //showError404();
        })
        .finally(()=>loadIndiactor.style.display='none' );
     });

    function handleWeatherData(data){
        if(data.cod==='404'){
            console.log('404');
        }{
            updateWeatherUI(data);
        }
    }

    function  updateWeatherUI(data){
        const temperature=document.querySelector('.weather-box .temperature')
        const description= document.querySelector('.weather-box .description')
        const humidity =document.querySelector('.weather-details .humidity span')
        const wind=document.querySelector('.weather-details .wind span')


        switch(data.weather[0].main){
            case 'Clear':
                weatherImage.src='images/suns.png';
                break;
            case 'Rain':
                weatherImage.src='images/rains.png';
                break;    
            case 'Clouds':
                weatherImage.src='clouds.png';
                break; 
            case 'Snow':
                weatherImage.src='images/snows.png';
                break;     
            case 'Haze':
                weatherImage.src='images/mist.png';
                break;
            case 'Storm':
                weatherImage.src ='images/storms.png';
                break;
            case 'Smoke':
                weatherImage.src =  'images/smoks.png';
                brreak;
             default:
                weatherImage='';             
        }
         
        console.log(data.weather[0].main)
        console.log(data.main.temp)
        console.log(data.weather[0].description)
        console.log(data.main.humidity)
      

        
        temperature.innerHTML=`${parseInt(data.main.temp)}<span>°C</span>`;
        description.innerHTML=`${data.weather[0].description}`;
        humidity.innerHTML=`${data.main.humidity}%`;
        wind.innerHTML=`${parseInt(data.wind.speed)}Km/h`;
        

        weatherBox.style.display='block';
        weatherDetails.style.display='block';
        
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height='590px';
    }

});
