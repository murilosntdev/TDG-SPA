import { Tltp } from "./TooltipStyled"

export const PasswordTooltip = (props) => {
    return (
        <Tltp id={props.id}>
            A senha deve conter:
            <ul id="list">
                <li>De 8 a 15 caracteres</li>
                <li>Uma letra maiúscula</li>
                <li>Uma letra minúscula</li>
                <li>Um número</li>
            </ul>
        </Tltp>
    )
}