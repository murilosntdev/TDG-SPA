import { useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { LoginForm, NewAccountForm } from "../../components/Form/Form";
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
    const [loginFormData, setLoginFormData] = useState({});
    const [loginFormInputsErrors, setLoginFormInputsErrors] = useState({
        username: { active: false, message: '' },
        password: { active: false, message: '' }
    });
    const [loginButtonLoading, setLoginButtonLoading] = useState(false);
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

    function handleLoginFormInputChange(event) {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setLoginFormData({ ...loginFormData, [inputName]: inputValue });
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
            await api.post('account/new', data).then(response => {
                setNewAccontButtonLoading(false);

                setPopupInfos({ type: "success", content: "Conta criada com sucesso. Faça login para continuar." });
                togglePopup(true);

                setNewAccountFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            });
        } catch (error) {
            const status = error.response.data.error.status;
            const details = error.response.data.error.details;

            setNewAccontButtonLoading(false);

            switch (status) {
                case 409: {
                    show409Error(details);
                    break;
                };
                case 422: {
                    showNewAccountFormInputErrors(details);
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

    async function loginFormSubmit(event) {
        event.preventDefault();

        setLoginFormInputsErrors({
            username: { active: false, message: '' },
            password: { active: false, message: '' }
        });

        const { username, password } = loginFormData;

        const data = {
            username,
            password
        };

        setLoginButtonLoading(true);

        try {
            await api.post('session/login', data);
        } catch (error) {
            const status = error.response.data.error.status;
            const details = error.response.data.error.details;

            setLoginButtonLoading(false);

            switch (status) {
                case 401: {
                    show401Error(details);
                    break;
                };
                case 422: {
                    showLoginFormInputErrors(details);
                    break;
                };
                default: {
                    setPopupInfos({ type: "danger", content: "Não foi possível realizar o login. Por favor, tente novemente mais tarde." });
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

    function showNewAccountFormInputErrors(details) {
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

            });
        });

        setNewAccountFormInputsErrors(updatedInputsErrors);
    };

    function showLoginFormInputErrors(details) {
        const updatedInputsErrors = {
            username: { active: false, message: '' },
            password: { active: false, message: '' }
        };

        details.forEach(detail => {
            Object.entries(detail).forEach(([key, value]) => {
                if (key === "username") {
                    updatedInputsErrors[key] = { ...updatedInputsErrors[key], active: true, message: translateInputName(value, 'username', 'nome de usuário') };
                };
                if (key === "password") {
                    updatedInputsErrors[key] = { ...updatedInputsErrors[key], active: true, message: translateInputName(value, 'password', 'senha') };
                };

            });
        });

        setLoginFormInputsErrors(updatedInputsErrors);
    };

    function show401Error(detail) {
        const updatedInputError = {
            username: { active: false, message: '' },
            password: { active: false, message: '' }
        }

        updatedInputError['username'] = { ...updatedInputError['username'], active: true, message: '' };
        updatedInputError['password'] = { ...updatedInputError['password'], active: true, message: detail };

        setLoginFormInputsErrors(updatedInputError);
    };

    function show409Error(details) {
        const updatedInputsErrors = {
            username: { active: false, message: '' },
            email: { active: false, message: '' },
            password: { active: false, message: '' },
            confirmPassword: { active: false, message: '' }
        };

        if (details.includes("username")) {
            updatedInputsErrors["username"] = { ...updatedInputsErrors["username"], active: true, message: details };
        };
        if (details.includes("email")) {
            updatedInputsErrors["email"] = { ...updatedInputsErrors["email"], active: true, message: details };
        };

        setNewAccountFormInputsErrors(updatedInputsErrors);
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
                        $values={newAccountFormData}
                        $inputsErrors={newAccountFormInputsErrors}
                        $loading={newAccountButtonLoading}
                    />
                    <LoginForm
                        title="Acesse sua conta"
                        onChange={handleLoginFormInputChange}
                        onSubmit={loginFormSubmit}
                        $values={loginFormData}
                        $inputsErrors={loginFormInputsErrors}
                        $loading={loginButtonLoading}
                    />
                </S.Section>
            </S.Main>
            <Footer />
        </S.HomePage>
    );
};

export default Home;