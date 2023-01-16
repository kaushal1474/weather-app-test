import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'

import './style.css'

const Layout = ({ children }: { children: React.ReactElement }) => {

    const activeClassName = "underline";
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='transparent'>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="logo"
                        onClick={() => {
                            navigate("/")
                        }}
                    >
                        Weather App
                    </Typography>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive ? activeClassName : undefined
                                    }
                                >
                                    Search
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="favourites"
                                    className={({ isActive }) =>
                                        isActive ? activeClassName : undefined
                                    }
                                >
                                    Favorite
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </Toolbar>
            </AppBar>
            {children}
        </Box>
    )
}

export default Layout