import React, {useState} from 'react';
import UserContext from './UserContext';
import JoblyApi from "../backend/api/api";
const UserProvider = ({children}) =>{
    const [user, setUser] = useState(null);

    
    
    return (
        <UserContext.Provider value={{user}}>
            
            
        </UserContext.Provider>
    )
}
export default UserProvider;