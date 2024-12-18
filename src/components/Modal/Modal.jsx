import { CreateRoomForm } from "../Form/Form";
import { ClsBttn, MdlCntinr, MdlCntnt, Ovrly } from "./ModalStyled";

export const Modal = (props) => {
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