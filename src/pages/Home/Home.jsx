import { useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { NewAccountForm } from "../../components/Form/Form";
import Navbar from "../../components/Navbar/Navbar";
import * as S from "./HomeStyled"

const Home = () => {
    const [newAccountFormData, setNewAccountFormData] = useState({});
    const [newAccountFormInputsErrors, setNewAccountFormInputsErrors] = useState({
        username: { active: false, message: '' },
        email: { active: false, message: '' },
        password: { active: false, message: '' },
        confirmPassword: { active: false, message: '' }
    });

    function handleNewAccountFormInputChange(event) {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setNewAccountFormData({ ...newAccountFormData, [inputName]: inputValue });
    };

    function handleNewAccountFormSubmit(event) {
        event.preventDefault();

        setNewAccountFormInputsErrors({
            username: { active: false, message: '' },
            email: { active: false, message: '' },
            password: { active: false, message: '' },
            confirmPassword: { active: false, message: '' }
        });

        const { username, email, password, confirmPassword } = newAccountFormData;

        if (password !== confirmPassword) {
            showDiffetentPasswordsError();
            return;
        };
    };

    function showDiffetentPasswordsError() {
        const updatedInputsErrors = {
            username: { active: false, message: '' },
            email: { active: false, message: '' },
            password: { active: true, message: '' },
            confirmPassword: { active: true, message: 'As senhas devem ser iguais' }
        };

        setNewAccountFormInputsErrors(updatedInputsErrors);
    };

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
                        onChange={handleNewAccountFormInputChange}
                        onSubmit={handleNewAccountFormSubmit}
                        inputsErrors={newAccountFormInputsErrors}
                    />
                </S.Section>
            </S.Main>
            <Footer />
        </S.HomePage>
    );
};

export default Home;