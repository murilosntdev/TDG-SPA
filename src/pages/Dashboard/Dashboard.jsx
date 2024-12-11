import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import * as S from "./DashboardStyles"
import api from "../../services/api";

const Dashboard = () => {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await api.post('/session/logout', {}, { withCredentials: true });
            navigate("/");
        } catch (error) {
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