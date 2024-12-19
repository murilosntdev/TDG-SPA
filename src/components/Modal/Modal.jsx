import { SecondaryButton } from "../Button/Button";
import { CreateRoomForm } from "../Form/Form";
import { ClsBttn, Lgnd, MdlCntinr, MdlCntnt, Ovrly, RmId, RmNm, RmPlyrs, RmsLst } from "./ModalStyled";

export const CreateRoomModal = (props) => {
    if (!props.show) return null;

    return (
        <Ovrly>
            <MdlCntinr>
                <ClsBttn onClick={props.close}>&times;</ClsBttn>
                <MdlCntnt>
                    <CreateRoomForm
                        title="Informe o nome da sala"
                        onChange={props.onChange}
                        onSubmit={props.onSubmit}
                        $values={props.values}
                        $inputsErrors={props.inputError}
                        $loading={props.loading}
                    />
                </MdlCntnt>
            </MdlCntinr>
        </Ovrly>
    );
};

export const FindRoomsModal = (props) => {
    if (!props.show) return null;

    const renderRooms = () => {
        return props.rooms.map((room) => (
            <SecondaryButton key={room.id} id={room.id} onClick={props.onClick}>
                <RmNm>{room.name}</RmNm>
                <RmId>{room.id}</RmId>
                <RmPlyrs>{room.players}/8</RmPlyrs>
            </SecondaryButton>
        ));
    };

    return (
        <Ovrly>
            <MdlCntinr>
                <ClsBttn onClick={props.close}>&times;</ClsBttn>
                <MdlCntnt>
                    <Lgnd>Selecione uma sala</Lgnd>
                    <RmsLst>
                        {props.rooms && props.rooms.length > 0 ? (
                            renderRooms()
                        ) : (
                            <p>Nenhuma sala encontrada</p>
                        )}
                    </RmsLst>
                </MdlCntnt>
            </MdlCntinr>
        </Ovrly>
    );
};