const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');




const updateUI = (data) => {
	console.log(data);


// updateUI

const {cityDet, weather} = data;

 // update template
 details.innerHTML = `
 <h5 class="my-3">${cityDet.EnglishName}</h5>
 <div class="my-3">${weather.WeatherText}</div>
 <div class="display-4 my-4">
 	<span>${weather.Temperature.Metric.Value}</span>
 	<span>&deg;C</span>
 </div>
 `;



// update icons




let timeSrc;
if(weather.IsDayTime){

	timeSrc = 'img/day.jpg';
}else{
	timeSrc = 'img/night.jpg';
};

time.setAttribute('src', timeSrc); 

};

// update city

const updateCity = async (city) => {

	const cityDet = await getCity(city);
	const weather = await getWeather(cityDet.Key);

	return {
		cityDet: cityDet,
		weather: weather
	};

}; 

// get city input

cityForm.addEventListener('submit', e => {

	e.preventDefault();

	const city = cityForm.city.value.trim();
	cityForm.reset();

 //update city

 updateCity(city)
  .then(data => updateUI(data))
  .catch(err => console.log(err));


});