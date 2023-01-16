import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import './style.css'
import { Context } from '../../App';
import { Grid } from '@mui/material';
import { IContext, SelectedCity, WeatherData } from '../../types';

interface ICityCardProps {
    cityData: {
        currentCity: SelectedCity,
        weatherData: WeatherData
    },
    setSelectedCity: (args: any) => void
}

const CityCard = ({ cityData, setSelectedCity }: ICityCardProps) => {

    const names: string[] = cityData?.currentCity?.name?.split(",") ?? []
    const { favouriteCity, setFavouriteCity } = useContext<IContext>(Context)

    const handleAddToFavorites = () => {
        if (favouriteCity && cityData && favouriteCity[`${cityData.currentCity.value.lat},${cityData.currentCity.value.lon}`]) {
            delete favouriteCity[`${cityData.currentCity.value.lat},${cityData.currentCity.value.lon}`]
            setFavouriteCity({ ...favouriteCity })
        }
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 300 }} className="city-card"
                onClick={() => {
                    setSelectedCity(cityData?.currentCity)
                }}
            >
                <CardContent>
                    <div className='city-header'>
                        <Typography variant="h5" component="div">
                            {names[0]}
                        </Typography>
                        <IconButton aria-label="add to favorites"
                            onClick={handleAddToFavorites}
                        >
                            <Favorite color='info'
                                className='favorite-city'
                            />
                        </IconButton>
                    </div>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {names[1]}
                    </Typography>
                    <div className='temp'>
                        {(cityData?.weatherData?.main?.temp - 273.15).toFixed(2)}°
                    </div>
                    <div className="description">{cityData?.weatherData?.weather?.map((desc: any) => desc?.description)?.join(", ")}</div>
                    <div className="min-max-temp">Min temp. {(cityData?.weatherData?.main?.temp_min - 273.15).toFixed(2)}°</div>
                    <div className="min-max-temp">Max temp. {(cityData?.weatherData?.main?.temp_max - 273.15).toFixed(2)}°</div>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default CityCard