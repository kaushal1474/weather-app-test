import React, { useEffect, useState, useContext } from 'react'
import { IconButton, Paper } from '@mui/material'
import { Thermostat, Air, Compress, Visibility, Opacity, Cloud, Favorite } from '@mui/icons-material';
import { Context } from '../../App';
import { IContext, SelectedCity, WeatherData } from '../../types';
// import FavoriteIcon from '@mui/icons-material/Favorite';


const baseUrl = process.env.REACT_APP_URI
const secretKey = process.env.REACT_APP_API_KEY

const WeatherInfo = ({ cordsInfo }: { cordsInfo: SelectedCity }) => {

    const [currentCity, setCurrentCity] = useState<SelectedCity>()
    const [weatherData, setWeatherData] = useState<WeatherData>()
    const { favouriteCity, setFavouriteCity } = useContext<IContext>(Context)

    useEffect(() => {
        function showPosition(position: any) {
            fetch(`${baseUrl}/geo/1.0/reverse?lat=${position.coords.latitude.toFixed(4)}&lon=${position.coords.longitude.toFixed(4)}&limit=5&appid=${secretKey}`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(result => {
                    setCurrentCity({
                        name: `${result[0].name}, ${result[0]?.state ?? ''} (${result[0].country ?? ''})`,
                        value: { lat: result[0].lat, lon: result[0].lon }
                    })
                })
                .catch(error => {
                    console.error('Error:', error);
                })

        }

        if (cordsInfo?.name) {           
            const name = cordsInfo.name.split(",")
            setCurrentCity({
                name: `${name[0]}, ${name[1]}`,
                value: cordsInfo.value
            })
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            }
        }
    }, [cordsInfo])

    useEffect(() => {
        if (currentCity?.name) {
            fetch(`${baseUrl}/data/2.5/weather?lat=${currentCity.value.lat}&lon=${currentCity.value.lon}&limit=5&appid=${secretKey}`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(result => {
                    setWeatherData(result)
                })
                .catch(error => {
                    console.error('Error:', error);
                })
        }
    }, [currentCity])

    const handleAddToFavorites = () => {
        if (favouriteCity && favouriteCity[`${currentCity?.value?.lat},${currentCity?.value?.lon}`]) {
            delete favouriteCity[`${currentCity?.value?.lat},${currentCity?.value?.lon}`]
            setFavouriteCity({ ...favouriteCity })
        } else {
            setFavouriteCity({
                ...favouriteCity,
                [`${currentCity?.value?.lat},${currentCity?.value?.lon}`]: {
                    currentCity,
                    weatherData
                }
            })
        }
    }

    if (currentCity) {        
        return (
            <div className='weather-info'>
                <Paper className="weather-card">
                    <div className='card-header'>
                        <span><b>{currentCity?.name}</b> As of {new Date().getHours() > 11 ? new Date().getHours() - 12 : new Date().getHours()}:{new Date().getMinutes().toString().length == 2 ? new Date().getMinutes() : "0" + new Date().getMinutes()} {new Date().getHours() > 11 ? 'pm' : 'am'}</span>

                        <div className='favo-wrapper'>
                            <span>Add to Favorites</span> {" "}
                            <IconButton aria-label="add to favorites"
                                onClick={handleAddToFavorites}
                            >
                                <Favorite color='info'
                                    className={favouriteCity?.[`${currentCity.value.lat},${currentCity.value.lon}`] ? 'favorite-city' : ""}
                                />
                            </IconButton>
                        </div>
                    </div>
                    <div className='card-content'>
                        <div>
                            <div className='img-container'>
                                <div className='temp'>{((weatherData?.main?.temp || 0) - 273.15).toFixed(2)}°</div>
                                <img src={`${baseUrl}/img/w/${weatherData?.weather?.[0]?.icon}.png`} alt="current weather" />
                            </div>
                            <div className="description">{weatherData?.weather?.map((desc: any) => desc?.description)?.join(", ")}</div>
                            <div className="min-max-temp">Min temp. of Day: {((weatherData?.main?.temp_min || 0) - 273.15).toFixed(2)}° • Max temp. : {((weatherData?.main?.temp_max || 0) - 273.15).toFixed(2)}°</div>
                        </div>
                    </div>
                </Paper>
                <Paper className='addt-info-paper'>
                    <div>Weather Today in {currentCity?.name}</div>
                    <div className='temp'>{((weatherData?.main?.feels_like || 0) - 273.15).toFixed(2)}°</div>
                    <div>Feels Like</div>

                    <div className='addt-info'>
                        <div className='info-container'>
                            <div className='extra-info'>
                                <span><Thermostat />{" "}High / Low</span>
                                <span>{((weatherData?.main?.temp_max || 0) - 273.15).toFixed(2)}° / {((weatherData?.main?.temp_min || 0) - 273.15).toFixed(2)}°</span>
                            </div>
                            <div className='extra-info'>
                                <span><Opacity />{" "}Humidity</span>
                                <span>{weatherData?.main?.humidity ?? 0}%</span>
                            </div>
                            <div className='extra-info'>
                                <span><Compress />{" "}Pressure</span>
                                <span>{weatherData?.main?.pressure ?? 0} hPa</span>
                            </div>
                        </div>
                        <div className='info-container'>
                            <div className='extra-info'>
                                <span><Visibility />{" "}Visibility</span>
                                <span>{weatherData?.visibility} meter</span>
                            </div>
                            <div className='extra-info'>
                                <span><Air />{" "}Wind</span>
                                <span>{weatherData?.wind?.speed} m/s</span>
                            </div>
                            <div className='extra-info'>
                                <span><Cloud />{" "}Clouds</span>
                                <span>{weatherData?.clouds?.all ?? 0}%</span>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    } else {
        return (
            <div className='weather-info'>
                <p className='no-data'>No data available</p>
            </div>
        )

    }
}

export default WeatherInfo