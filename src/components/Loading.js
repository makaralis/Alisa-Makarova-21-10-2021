
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { styled, keyframes } from "@mui/system";

const spin = keyframes`

        to {
                transform: rotate(360deg);
        }

`;

const RotatedBox = styled("div")({
  width: 120,
  height: 120,
  animation: `${spin} 1s infinite ease`
});




const Loading = () => {
    return <RotatedBox><Brightness7Icon/></RotatedBox>
}

export default Loading;