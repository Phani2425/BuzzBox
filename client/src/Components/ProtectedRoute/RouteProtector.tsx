
import { useSelector } from 'react-redux';
import {RootState} from '../../main'
import { Navigate } from 'react-router-dom';


interface props {

    children:React.ReactNode;
    redirect:string
}

const RouteProtector:React.FC<props> = ({children,redirect}) => {

    const {user} = useSelector((state:RootState) => state.auth)

    if (!user) {
        return <Navigate to={redirect} />;
    }

    return children;
     
}

export default RouteProtector