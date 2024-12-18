import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import * as S from "./DashboardStyles"
import { api, authFetch } from "../../services/api";
import { useCallback, useEffect, useState } from "react";
import { connectSocket, createRoom, disconnectSocket } from "../../services/ws";
import { SecondaryButton } from "../../components/Button/Button";
import { Modal } from "../../components/Modal/Modal";
import { Popup } from "../../components/Popup/Popup";
import translateInputName from "../../services/inputNameTranslator";

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

    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
    const [createRoomFormData, setCreateRoomFormData] = useState({});
    const [createRoomFormInputsErrors, setCreateRoomFormInputsErrors] = useState({
        roomName: { active: false, message: '' }
    });
    const [createRoomFormLoading, setCreateRoomFormLoading] = useState(false);
    const [popupStatus, setPopupStatus] = useState(false);
    const [popupInfos, setPopupInfos] = useState({
        type: '',
        content: ''
    });

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

    function handleCreateRoomFormInputChange(event) {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setCreateRoomFormData({ ...createRoomFormData, [inputName]: inputValue });
    };

    async function handleCreateRoomFormSubmit(event) {
        event.preventDefault();

        setCreateRoomFormInputsErrors({
            roomName: { active: false, message: '' }
        });

        const { roomName } = createRoomFormData;

        const data = {
            room_name: roomName
        };

        setCreateRoomFormLoading(true);

        try {
            await createRoom(data).then((response) => {
                const roomName = response.details.room_info.name;

                setPopupInfos({ type: "success", content: `Sala "${roomName}" criada com sucesso!` });
                togglePopup(true);
                closeCreateRoomModal();
            });
        } catch (error) {
            const message = error.message;
            const details = error.details;

            setCreateRoomFormLoading(false);

            switch (message) {
                case ("Erro de input"): {
                    showCreateRoomInputErrors(details);
                    break;
                }
                default: {
                    setPopupInfos({ type: "danger", content: "Não foi possível criar a sala. Por favor, tente novemente mais tarde." });
                    togglePopup(true);
                    closeCreateRoomModal();
                    break;
                };
            };
        };
    };

    function closeCreateRoomModal() {
        setShowCreateRoomModal(false);
        setCreateRoomFormData({});
        setCreateRoomFormLoading(false);
    };

    function togglePopup(newState) {
        setPopupStatus(newState);

        const timeout = setTimeout(() => {
            setPopupStatus(false);
        }, 5000);

        return () => clearTimeout(timeout);
    };

    function showCreateRoomInputErrors(details) {
        const updatedInputsErrors = {
            roomName: { active: false, message: '' },
        };

        details.forEach(detail => {
            Object.entries(detail).forEach(([key, value]) => {
                if (key === "room_name") {
                    updatedInputsErrors["roomName"] = { ...updatedInputsErrors["roomName"], active: true, message: translateInputName(value, 'room_name', 'nome da sala') };
                };
            });
        });

        setCreateRoomFormInputsErrors(updatedInputsErrors);
    };

    return (
        <S.DashboardPage>
            <Navbar
                action="logout"
                onClick={handleLogout}
            />
            <Popup
                $status={popupStatus}
                $infos={popupInfos}
            />
            <Modal
                show={showCreateRoomModal}
                close={closeCreateRoomModal}
                onChange={handleCreateRoomFormInputChange}
                onSubmit={handleCreateRoomFormSubmit}
                values={createRoomFormData}
                inputError={createRoomFormInputsErrors}
                loading={createRoomFormLoading}
            />
            <S.Main>
                <SecondaryButton onClick={() => setShowCreateRoomModal(true)}>Criar Sala</SecondaryButton>
            </S.Main>
            <Footer />
        </S.DashboardPage>
    );
};

export default Dashboard