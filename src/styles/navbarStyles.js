import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

export const StyledNav = styled('nav')(({theme, background}) => `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: 10vh;
    background: ${background};
    `,
)

export const StyledLink = styled(Link)(({theme}) => `
    color: white;
    text-decoration: none;
    `,
)