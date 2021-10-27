import "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";

const useTempUnit = (title) => {
    const db = useFirestore();

    const modeRefTemp = db.collection("Common").doc("temperature");
    const modeRefTempData = useFirestoreDocData(modeRefTemp).data;
    const modeStatus = useFirestoreDocData(modeRefTemp).status;


    const changeTemperatureUnit = () => {
        db.collection("Common").doc("temperature").update({
          tempUnit: modeRefTempData?.tempUnit === 'celcius' ? 'farenheit' : 'celcius'
    });
    };

    return   {onChange: changeTemperatureUnit, tempData: modeRefTempData?.tempUnit, modeStatus: modeStatus} ;
    ;
};

export default useTempUnit;
