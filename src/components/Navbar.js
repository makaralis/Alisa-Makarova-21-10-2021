import React from 'react';
import {  ListItem, List } from '@mui/material';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { StyledNav, StyledLink } from '../styles/navbarStyles';

const Navbar = ({theme}) =>  {

    return (
        <StyledNav background={theme ==='light' ? '#c0d3ff' : '#414550'}>
            <CloudQueueIcon sx={{paddingInlineStart: '20px'}}/>
            <List sx={{display: 'flex'}}>
                <StyledLink to='/'>
                    <ListItem>Weather</ListItem>
                </StyledLink>
                <StyledLink to='/favorite-cities'>
                    <ListItem>Favorites</ListItem>
                </StyledLink>
            </List>
        </StyledNav>
    );
}

export default Navbar;