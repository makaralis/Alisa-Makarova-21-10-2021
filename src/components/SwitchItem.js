import { ThemeSwitch, TemperatureSwitch } from "../styles/switchStyles";


const SwitchItem = ({switchType, ...props}) => {
  return switchType === 'themeMode' ? <ThemeSwitch {...props} /> : <TemperatureSwitch {...props} />;
};

export default SwitchItem;
