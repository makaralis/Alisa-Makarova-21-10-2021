import "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";

const useTheme = () => {
    const db = useFirestore();

    const modeRefTheme = db.collection("Common").doc("theme");
    const modeRefThemeData = useFirestoreDocData(modeRefTheme).data; 
    const modeStatus = useFirestoreDocData(modeRefTheme).status;


    const changeTheme = () => {
        db.collection("Common").doc("theme").update({
          themeMode: modeRefThemeData?.themeMode === 'light' ? 'dark' : 'light'
        })
    };

    return {onChange: changeTheme, themeData: modeRefThemeData?.themeMode, modeStatus: modeStatus} ;
};

export default useTheme;
