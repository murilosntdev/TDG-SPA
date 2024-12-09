import { Footer } from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import * as S from "./HomeStyled"

const Home = () => {
    return (
        <S.HomePage id="home-page">
            <Navbar />
            <S.Main>

            </S.Main>
            <Footer />
        </S.HomePage>
    );
};

export default Home;