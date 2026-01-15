/* eslint-disable no-lone-blocks */
import { useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { LoginForm, NewAccountForm } from "../../components/Form/Form";
import Navbar from "../../components/Navbar/Navbar";
import * as S from "./HomeStyled";
import { api } from "../../services/api";
import { Popup } from "../../components/Popup/Popup";
import translateInputName from "../../services/inputNameTranslator"
import { useNavigate } from "react-router-dom";
import { SendResetPasswordModal } from "../../components/Modal/Modal";

const Home = () => {
    const navigate = useNavigate();

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
    const [showSendResetPasswordModal, setShowSendResetPasswordModal] = useState(false);
    const [sendResetPasswordFormData, setSendResetPasswordFormData] = useState({});
    const [sendResetPasswordFormInputsErrors, setSendResetPasswordFormInputsErrors] = useState({
        email: { active: false, message: '' }
    });
    const [sendResetPasswordButtonLoading, setSendResetPasswordButtonLoading] = useState(false);
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

    async function handleSendPasswordResetFormInputChange(event) {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setSendResetPasswordFormData({ ...sendResetPasswordFormData, [inputName]: inputValue });
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
            await api.post('auth/login', data, { withCredentials: true }).then(response => {
                setLoginButtonLoading(false);

                setLoginFormData({
                    username: '',
                    password: ''
                });

                navigate(`/u/${response.data.details.account_info.username}`);
            });
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

    async function handleSendPasswordResetFormSubmit(event) {
        event.preventDefault();

        setSendResetPasswordFormInputsErrors({
            email: { active: false, message: '' }
        });

        const { email } = sendResetPasswordFormData;

        const data = {
            email
        };

        setSendResetPasswordButtonLoading(true);

        try {
            await api.post('auth/password-reset', data).then(response => {
                setSendResetPasswordButtonLoading(false);
                closeResetPasswordModal();

                setPopupInfos({ type: "success", content: "O link de recuperação de senha foi enviado para seu email com sucesso." });
                togglePopup(true);

                setSendResetPasswordFormData({
                    email: ''
                });
            });
        } catch (error) {
            const status = error.response.data.error.status;
            const details = error.response.data.error.details;

            setSendResetPasswordButtonLoading(false);

            switch (status) {
                case 400: {
                    setPopupInfos({ type: "danger", content: "Já existe um link de redefinição de senha ativo. Por favor, confira seu email." });
                    togglePopup(true);
                    closeResetPasswordModal();
                    break;
                };
                case 404: {
                    setPopupInfos({ type: "danger", content: "Não foi possível encontrar uma conta associada a esse email." });
                    togglePopup(true);
                    closeResetPasswordModal();
                    break;
                };
                case 422: {
                    showSendPasswordResetFormInputErrors(details);
                    break;
                };
                default: {
                    setPopupInfos({ type: "danger", content: "Não foi possível solicitar a recuperação de senha. Por favor, tente novemente mais tarde." });
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

    function showSendPasswordResetFormInputErrors(details) {
        const updatedInputsErrors = {
            email: { active: false, message: '' }
        };

        details.forEach(detail => {
            Object.entries(detail).forEach(([key, value]) => {
                if (key === "email") {
                    updatedInputsErrors[key] = { ...updatedInputsErrors[key], active: true, message: value };
                };
            });
        });

        setSendResetPasswordFormInputsErrors(updatedInputsErrors);
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

    function closeResetPasswordModal() {
        setShowSendResetPasswordModal(false);
        setSendResetPasswordFormData({});
        setSendResetPasswordButtonLoading(false);
    };

    return (
        <S.HomePage id="home-page">
            <Navbar />
            <Popup
                $status={popupStatus}
                $infos={popupInfos}
            />
            <SendResetPasswordModal
                show={showSendResetPasswordModal}
                close={closeResetPasswordModal}
                onChange={handleSendPasswordResetFormInputChange}
                onSubmit={handleSendPasswordResetFormSubmit}
                values={sendResetPasswordFormData}
                inputError={sendResetPasswordFormInputsErrors}
                loading={sendResetPasswordButtonLoading}
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
                        $onSendPasswordResetLinkClick={() => setShowSendResetPasswordModal(true)}
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