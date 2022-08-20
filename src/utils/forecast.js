const request = require('request')

const forecast = (latitude, longitude, callback)=>{
	const url = 'http://api.weatherstack.com/current?access_key=49cebb35973ef0e05f61db22c280cdf3&query='+ latitude +',' + longitude + '&units=f'

	request({url, json:true}, (error, {body})=>{
		if(error){
			callback('Unable to connect to weather service', undefined)
		}
		else if(body.error){
			callback('Unable to find location.', undefined)
		}
		else{
			callback(undefined,  body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
		}
	})	
}

module.exports = forecast