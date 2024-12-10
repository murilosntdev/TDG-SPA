import { Inpt, InptLbl, InptSpn } from "./InputStyled";

export const FormInput = (props) => {
    return (
        <Inpt
            type={props.type}
            name={props.id + "-input"}
            id={props.id + "-input"}
            spellCheck={props.spellCheck}
            placeholder={props.placeholder}
            required={props.required}
        />
    );
};

export const InputLabel = (props) => {
    return (
        <InptLbl id={props.id + "-label"} htmlFor={props.id + "-input"}>{props.lText}</InptLbl>
    );
};

export const InputSpan = (props) => {
    return (
        <InptSpn id={props.id + "-span"}>{props.errorText}</InptSpn>
    );
};