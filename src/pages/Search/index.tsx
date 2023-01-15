import React, { useState, useEffect } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import WeatherInfo from '../../component/InfoPaper';

const debounce = (cb: (arg: any[]) => void, d: number) => {

  let timer: any;

  return function (...args: any[]) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      console.log("is called", d);
      // @ts-ignore
      cb(...args)
    }, d)
  }
}

const baseUrl = process.env.REACT_APP_URI
const secretKey = process.env.REACT_APP_API_KEY

const SearchPage = () => {

  const [latLong, setLatLong] = useState<any>([{ name: '', value: '' }])
  const [searchCity, setSearchCity] = useState("")
  const [selectedCity, setSelectedCity] = useState<any>({ name: '', value: { lat: 0, lon: 0 } })

  useEffect(() => {
    if (searchCity) {
      fetch(`${baseUrl}//geo/1.0/direct?q=${searchCity}&limit=5&appid=${secretKey}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(result => {
          const res = result.map((item: any) => {
            
            const arr = []
            item?.name && arr.push(item?.name)
            item?.state && arr.push(item?.state)
            item?.country && arr.push(item?.country)

            return {
              name: arr.join(", "),
              value: { lat: item.lat, lon: item.lon }
            }
          })
          setLatLong(res)
        })
        .catch(error => {
          console.error('Error:', error);
        })
    }
  }, [searchCity])

  const handleChange = (e: any, newInputValue: string) => {
    debounce(() => {
      setSearchCity(e.target.value)
    }, 800)()
  }

  return (
    <div className='container'>
      <h2 className='page-header'>Search City</h2>
      <Autocomplete
        className='search-city-input'
        options={latLong ?? []}
        sx={{ width: 300 }}
        getOptionLabel={(option: any) => option?.name}
        onInputChange={handleChange}
        onChange={(e: any, data: any) => { setSelectedCity(data) }}
        renderInput={(params) => <TextField {...params} label="Search City" />}
      />

      <WeatherInfo cordsInfo={selectedCity} />
      {/* <Card /> */}
    </div>
  )
}

export default SearchPage