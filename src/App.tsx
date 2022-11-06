import "styles/index.css";
import Router from "./router";
import AuthModal from "components/modals/AuthModal";
import { useAppDispatch, useAppSelector } from "store";
import { useEffect } from "react";
import { reloginUser } from "store/reducers/userReducer";
import loadingSvg from "assets/loading.svg";
import { useLocation } from "react-router-dom";

function App() {
    const { loading } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        accessToken && location.pathname !== '/profile' && dispatch(reloginUser());
    }, []);

    return (
        <>
            <>
                <Router />
                <AuthModal />
                {loading && (
                    <div className="absolute top-0 left-0 w-full flex items-center justify-center h-screen bg-slate-400/50">
                        <img width={32} height={32} src={loadingSvg} alt="" />
                    </div>
                )}
            </>
        </>
    );
}

export default App;
