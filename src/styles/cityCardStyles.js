

import { styled } from "@mui/system";
import { Grid } from '@mui/material';


export const StyledGridCard = styled(Grid)(({theme}) => ({
    background: '#fff',
    borderRadius: '8px',
    paddingLeft: '16px !important',
    paddingRight: '16px',
    boxShadow: '0 2px 9px 0 #5294ff',
    [theme.breakpoints.up('xs')]: {
        marginBottom: '15px',
        marginLeft: '20px !important',
        width: '100%',
        paddingTop: '18px !important',
    },
    "&:hover": {
        cursor: 'pointer',
    },
    minWidth: 150,
    maxWidth: 220,
    width: '100%',
    marginRight: '20px',
    marginLeft: '20px !important',
    }
))