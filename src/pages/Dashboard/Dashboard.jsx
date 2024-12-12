import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import * as S from "./DashboardStyles"
import { api, authFetch } from "../../services/api";
import { useEffect } from "react";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const getAccountInfo = async () => {
            authFetch("/account/infos", { navigate }).then(data => {
                if (data.status === 200) {
                    const accountInfos = data.details.account_info;

                    sessionStorage.setItem("accountInfos", JSON.stringify(accountInfos));
                };
            });
        };

        getAccountInfo();
    }, [navigate]);

    async function handleLogout() {
        try {
            await api.post('/session/logout', {}, { withCredentials: true });
            sessionStorage.clear();
            navigate("/");
        } catch (error) {
            sessionStorage.clear();
            navigate("/");
        }
    };

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