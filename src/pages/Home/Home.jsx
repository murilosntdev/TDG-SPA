import { Footer } from "../../components/Footer/Footer";
import { NewAccountForm } from "../../components/Form/Form";
import Navbar from "../../components/Navbar/Navbar";
import * as S from "./HomeStyled"

const Home = () => {
    return (
        <S.HomePage id="home-page">
            <Navbar />
            <S.Main id="main">
                <S.Text id="presentation-text">
                    Bem-vindo ao Truco da Galera! Preparado para começar o jogo?<br />Cadastre-se agora ou faça login para entrar na diversão!
                </S.Text>
                <S.Section id="home-page-forms">
                    <NewAccountForm
                        title="Crie sua conta"
                    />
                </S.Section>
            </S.Main>
            <Footer />
        </S.HomePage>
    );
};

export default Home;