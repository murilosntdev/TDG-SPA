import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import * as S from "./DashboardStyles"
import { api, authFetch } from "../../services/api";
import { useCallback, useEffect } from "react";
import { connectSocket, disconnectSocket } from "../../services/ws";

const Dashboard = () => {
    const navigate = useNavigate();
    const handleLogout = useCallback(async () => {
        try {
            await api.post('/session/logout', {}, { withCredentials: true });
            sessionStorage.clear();
            disconnectSocket();
            navigate("/");
        } catch (error) {
            sessionStorage.clear();
            disconnectSocket();
            navigate("/");
        };
    }, [navigate]);

    useEffect(() => {
        const getAccountInfo = async () => {
            const path = window.location.pathname;
            const extractedUsername = path.split("/")[2];
            const params = {
                username: extractedUsername
            };

            const result = await authFetch("/account/infos", { params, navigate });

            if (result.status === 200) {
                const accountInfos = result.details.account_info;

                sessionStorage.setItem("accountInfos", JSON.stringify(accountInfos));

                await estabilishConnection();
            } else {
                handleLogout();
                navigate("/");
            };
        };

        const estabilishConnection = async () => {
            try {
                await connectSocket();
            } catch (error) {
                handleLogout();
                navigate("/");
            };
        };

        getAccountInfo();
    }, [navigate, handleLogout]);

    return (
        <S.DashboardPage>
            <Navbar
                action="logout"
                onClick={handleLogout}
            />
            <S.Main>
            </S.Main>
            <Footer />
        </S.DashboardPage>
    );
};

export default Dashboard