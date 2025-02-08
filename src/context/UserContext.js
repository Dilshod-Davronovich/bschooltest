import { createContext } from "react";

const UserContext = createContext({
    foundUser: { name: '', ball: 0 },
    setFoundUser: () => {},
});

export default UserContext;