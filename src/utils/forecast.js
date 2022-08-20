const request = require('request')

const forecast = (latitude, longitude, callback)=>{
	const url = 'http://api.weatherstack.com/current?access_key=49cebb35973ef0e05f61db22c280cdf3&query='+ latitude +',' + longitude + '&units=f'

	request({url: url, json:true}, (error, response)=>{
		if(error){
			callback('Unable to connect to weather service', undefined)
		}
		else if(response.body.error){
			callback('Unable to find location.', undefined)
		}
		else{
			callback(undefined,  response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
		}
	})	
}

module.exports = forecast