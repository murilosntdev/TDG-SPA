/* eslint-disable no-lone-blocks */
import { useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { ResetPasswordForm } from "../../components/Form/Form";
import Navbar from "../../components/Navbar/Navbar";
import * as S from "./PasswordResetStyled";
import { api } from "../../services/api";
import translateInputName from "../../services/inputNameTranslator";
import { Popup } from "../../components/Popup/Popup";

const PasswordReset = () => {
    const [passwordResetFormData, setPasswordResetFormData] = useState({});
    const [passwordResetFormInputsErrors, setPasswordResetFormInputsErrors] = useState({
        password: { active: false, message: '' },
        confirmPassword: { active: false, message: '' }
    });
    const [passwordResetButtonLoading, setPasswordResetButtonLoading] = useState(false);
    const [popupStatus, setPopupStatus] = useState(false);
    const [popupInfos, setPopupInfos] = useState({
        type: '',
        content: ''
    });

    function handlePasswordResetFormInputChange(event) {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setPasswordResetFormData({ ...passwordResetFormData, [inputName]: inputValue });
    };

    async function handlePasswordResetFormSubmit(event) {
        event.preventDefault();

        setPasswordResetFormInputsErrors({
            password: { active: false, message: '' },
            confirmPassword: { active: false, message: '' }
        });

        const { password, confirmPassword } = passwordResetFormData;

        if (password !== confirmPassword) {
            showDiffetentPasswordsError();
            return;
        };

        const data = {
            new_password: password
        };

        const authToken = new URLSearchParams(window.location.search).get('token');

        const headers = {
            authToken
        };

        setPasswordResetButtonLoading(true);

        try {
            await api.patch('auth/password-reset', data, { headers }).then(response => {
                setPasswordResetButtonLoading(false);

                setPopupInfos({ type: "success", content: "Sua senha foi redefinida com sucesso. Faça login para continuar." });
                togglePopup(true);

                setPasswordResetFormInputsErrors({
                    password: { active: false, message: '' },
                    confirmPassword: { active: false, message: '' }
                });
            });
        } catch (error) {
            const status = error.response.data.error.status;
            const details = error.response.data.error.details;

            setPasswordResetButtonLoading(false);

            switch (status) {
                case 401: {
                    setPopupInfos({ type: "danger", content: "Token inválido ou expirado. Solicite uma nova redefinição de senha." });
                    togglePopup(true);
                    break;
                };
                case 422: {
                    showPasswordResetFormInputErrors(details);
                    break;
                };
                default: {
                    setPopupInfos({ type: "danger", content: "Não foi possível redefinir a senha. Tente novamente mais tarde." });
                    togglePopup(true);
                    break;
                };
            };
        };
    };

    function showDiffetentPasswordsError() {
        const updatedInputsErrors = {
            password: { active: true, message: '' },
            confirmPassword: { active: true, message: 'As senhas devem ser iguais' }
        };

        setPasswordResetFormInputsErrors(updatedInputsErrors);
    };

    function togglePopup(newState) {
        setPopupStatus(newState);

        const timeout = setTimeout(() => {
            setPopupStatus(false);
        }, 5000);

        return () => clearTimeout(timeout);
    };

    function showPasswordResetFormInputErrors(details) {
        const updatedInputsErrors = {
            password: { active: false, message: '' },
            confirmPassword: { active: false, message: '' }
        };

        details.forEach(detail => {
            Object.entries(detail).forEach(([key, value]) => {
                if (key === "new_password") {
                    updatedInputsErrors["password"] = { ...updatedInputsErrors["password"], active: true, message: translateInputName(value, 'new_password', 'senha') };
                };
            });
        });

        setPasswordResetFormInputsErrors(updatedInputsErrors);
    };

    return (
        <S.PasswordResetPage id="password-reset-page">
            <Navbar />
            <Popup
                $status={popupStatus}
                $infos={popupInfos}
            />
            <S.Main>
                <S.Section>
                    <ResetPasswordForm
                        title="Redefinina sua senha"
                        onChange={handlePasswordResetFormInputChange}
                        onSubmit={handlePasswordResetFormSubmit}
                        $values={passwordResetFormData}
                        $inputsErrors={passwordResetFormInputsErrors}
                        $loading={passwordResetButtonLoading}
                    />
                </S.Section>
            </S.Main>
            <Footer />
        </S.PasswordResetPage>
    );
};

export default PasswordReset;