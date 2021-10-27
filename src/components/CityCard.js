import { List, ListItem, Typography,  Divider } from '@mui/material';
import { StyledGridCard } from '../styles/globalStyles';



const CityCard = ({name, temp, forecast}) => {

  return (
    <StyledGridCard item xs={12} sm={6} md={3} lg={2} xl={2}>
    <Typography variant="h4" color="textPrimary">
      TITLE
    </Typography>

    <Divider />
    <List>
        <ListItem>{name}</ListItem>
        <ListItem>{temp}</ListItem>
        <ListItem>{forecast}</ListItem>
    </List>
 
</StyledGridCard>
  );
};



export default CityCard;
