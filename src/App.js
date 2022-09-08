
import { useState } from 'react';
import './App.css';


function App() {
  const [globalStats,setGlobalStats] = useState([{}]);

const apikey = 'f0db858dbd6e764380750a2e7faddc35';
const [city,setCity] = useState("");

const getWeather = (event) =>{
  if(event.key==="Enter"){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}`).then((response)=> response.json()).then((data)=>{
         console.log(data);
        setGlobalStats(data);
        setCity("")
      })
  }
}
  return (
    <div className="App">
<div className='bac'>
  <input type="text" placeholder='enter city' onChange={e=>setCity(e.target.value)}
  value={city}
  onKeyPress={getWeather}
  />
   {typeof globalStats.main ==='undefined'?(
    <>
    <h1>welcome to the weather app</h1>
    <p>Enter a city to get a weather of that city</p>
    </>
   ):
   
   <>
   <h1> {globalStats.name} </h1>
    <h2>Temperature</h2>
   <p>{Math.round(globalStats.main.temp)} <sup>o</sup>F</p>
   {/* <p>{globalStats.weather[0].main}</p> */}
   <h2>Description</h2>
   <p>{globalStats.weather[0].description}</p>
 
   
   <div className='row'>

   <div className='col'>
   <h2>Feels like</h2>
   <p>{Math.round(globalStats.main.feels_like)} <sup>o</sup>F</p>

   </div>
   <div className='col'>

   <h2>Humidity</h2>
   <p>{Math.round(globalStats.main.humidity)}%</p>
   </div>
   <div className='col'>

   <h2>Wind</h2>
   <p>{globalStats.wind.speed} km/h</p>
   </div>
   </div>

   </>
   
   }
    </div>
    </div>
  );
}

export default App;
