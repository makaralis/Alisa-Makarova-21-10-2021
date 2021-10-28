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

export const ItemsContainer = styled('div')(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}))
