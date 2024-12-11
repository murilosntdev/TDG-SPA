import { useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { NewAccountForm } from "../../components/Form/Form";
import Navbar from "../../components/Navbar/Navbar";
import * as S from "./HomeStyled";
import api from "../../services/api";
import { Popup } from "../../components/Popup/Popup";
import translateInputName from "../../services/inputNameTranslator"

const Home = () => {
    const [newAccountFormData, setNewAccountFormData] = useState({});
    const [newAccountFormInputsErrors, setNewAccountFormInputsErrors] = useState({
        username: { active: false, message: '' },
        email: { active: false, message: '' },
        password: { active: false, message: '' },
        confirmPassword: { active: false, message: '' }
    });
    const [newAccountButtonLoading, setNewAccontButtonLoading] = useState(false);
    const [popupStatus, setPopupStatus] = useState(false);
    const [popupInfos, setPopupInfos] = useState({
        type: '',
        content: ''
    });

    function handleNewAccountFormInputChange(event) {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setNewAccountFormData({ ...newAccountFormData, [inputName]: inputValue });
    };

    async function handleNewAccountFormSubmit(event) {
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

        const data = {
            username,
            email,
            password
        };

        setNewAccontButtonLoading(true);

        try {
            await api.post('account/new', data);
        } catch (error) {
            const status = error.response.data.error.status;
            const details = error.response.data.error.details;

            setNewAccontButtonLoading(false);

            switch (status) {
                case 422: {
                    showInputErrors(details);
                    break;
                };
                default: {
                    setPopupInfos({ type: "danger", content: "Não foi possível concluir o cadastro de sua conta. Por favor, tente novemente mais tarde." });
                    togglePopup(true);
                    break;
                };
            };
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

    function togglePopup(newState) {
        setPopupStatus(newState);

        const timeout = setTimeout(() => {
            setPopupStatus(false);
        }, 5000);

        return () => clearTimeout(timeout);
    };

    function showInputErrors(details) {
        const updatedInputsErrors = {
            username: { active: false, message: '' },
            email: { active: false, message: '' },
            password: { active: false, message: '' },
            confirmPassword: { active: false, message: '' }
        };

        details.forEach(detail => {
            Object.entries(detail).forEach(([key, value]) => {
                if (key === "username") {
                    updatedInputsErrors[key] = { ...updatedInputsErrors[key], active: true, message: translateInputName(value, 'username', 'nome de usuário') };
                };
                if (key === "email") {
                    updatedInputsErrors[key] = { ...updatedInputsErrors[key], active: true, message: value };
                };
                if (key === "password") {
                    updatedInputsErrors[key] = { ...updatedInputsErrors[key], active: true, message: translateInputName(value, 'password', 'senha') };
                };

                setNewAccountFormInputsErrors(updatedInputsErrors);
            });
        });
    };

    return (
        <S.HomePage id="home-page">
            <Navbar />
            <Popup
                $status={popupStatus}
                $infos={popupInfos}
            />
            <S.Main id="main">
                <S.Text id="presentation-text">
                    Bem-vindo ao Truco da Galera! Preparado para começar o jogo?<br />Cadastre-se agora ou faça login para entrar na diversão!
                </S.Text>
                <S.Section id="home-page-forms">
                    <NewAccountForm
                        title="Crie sua conta"
                        onChange={handleNewAccountFormInputChange}
                        onSubmit={handleNewAccountFormSubmit}
                        $inputsErrors={newAccountFormInputsErrors}
                        $loading={newAccountButtonLoading}
                    />
                </S.Section>
            </S.Main>
            <Footer />
        </S.HomePage>
    );
};

export default Home;