import { styled } from "@mui/system";
import { Grid } from '@mui/material';

export const Container = styled('div')(({theme}) => `
    background: ${theme === 'light' ? '#f2f2f3' : '#7c7575'};
    height: 100%;
    position: fixed;
    width: 100%;
    overflow-y: scroll;
`,)

 export const SwitchContainer = styled('div')(({theme}) => `
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    margin-inline-start: 10px;
`,)

export const StyledGridCard = styled(Grid)(({theme}) => ({
    background: '#fff',
    borderRadius: '8px',
    paddingLeft: '16px !important',
    paddingRight: '16px',
    boxShadow: '0 2px 9px 0 #5294ff',
    [theme.breakpoints.up('xs')]: {
        marginBottom: '15px',
        width: '100%',
        paddingTop: '18px !important',
    },
    minWidth: 150,
    maxWidth: 220,
      width: '100%',
    marginLeft: '20px',
    marginRight: '20px',
    }
))

