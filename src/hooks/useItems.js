import { useEffect } from 'react';

const useItems = (db, col, callback, items) => {
    useEffect(() => {
      const fetchData = async () => {
        await db
          .collection(col)
          .onSnapshot((snapshot) => {
            let listItems = [];

            listItems = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            callback(listItems);
          });
      };
      fetchData();
    }, [db, col, callback]);
    
    return items;
  };

  export default useItems;