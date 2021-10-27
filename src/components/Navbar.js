import React from 'react';
import {  ListItem, List } from '@mui/material';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { StyledNav, StyledLink } from '../styles/navbarStyles';
import useTempUnit from '../hooks/useTempUnit';
import useTheme from "../hooks/useTheme";
import SwitchItem from './SwitchItem';
import { ItemsContainer } from '../styles/navbarStyles';


const Navbar = () =>  {
    const theme = useTheme();
    const temp = useTempUnit();
    

    return (
        <StyledNav background={theme?.themeData ==='light' ? '#c0d3ff' : '#414550'}>
            <ItemsContainer>
                <CloudQueueIcon sx={{paddingInlineStart: '20px', paddingInlineEnd: '20px'}}/>
                <SwitchItem
                switchType='themeMode'
                theme={theme?.themeData}
                onChange={(e, val) => {
                    theme.onChange();
                }}
                checked={theme?.themeData === 'light' ? false : true}
                />
                <SwitchItem
                switchType='temperatureMode'
                theme={theme?.themeData}
                onChange={(e, val) => {
                    temp.onChange();
                }}
                checked={temp?.tempData === 'celcius' ?  false : true}
                /> 
            </ItemsContainer>
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