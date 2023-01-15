import React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './style.css'

const CityCard = () => {
    return (
        <Card sx={{ maxWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                    be nev o lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default CityCard