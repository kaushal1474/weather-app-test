import React, { useContext, useState } from 'react'
import { Grid } from '@mui/material'
import { Context } from '../../App'
import CityCard from '../../component/Card'
import WeatherInfo from '../../component/InfoPaper'
import { IContext, SelectedCity, WeatherData } from '../../types'

const FavouritePage = () => {

  const [selectedCity, setSelectedCity] = useState<SelectedCity>({ name: '', value: { lat: 0, lon: 0 } })
  const { favouriteCity } = useContext<IContext>(Context)

  return (
    <div className='container'>
      <h2 className='page-header'>Favourite Cities</h2>
      <Grid container spacing={1}>
        {selectedCity && selectedCity?.name ? <WeatherInfo cordsInfo={selectedCity} />
          :
          (Object.values(favouriteCity ?? {}).length ?
            Object.values(favouriteCity ?? {}).map((city: {
              currentCity: SelectedCity,
              weatherData: WeatherData
            }, index: number) =>
              <CityCard cityData={city} setSelectedCity={setSelectedCity} key={index} />
            ) :
            <p className='no-data'>No Favourite cities available.</p>
          )}
      </Grid>
    </div>
  )
}

export default FavouritePage