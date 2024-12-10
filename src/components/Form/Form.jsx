import { SecondaryButton } from "../Button/Button";
import { FormInput, InputLabel, InputSpan } from "../Input/Input";
import { PasswordTooltip } from "../Tooltip/Tooltip";
import { Fldst, FldWthTlTp, FrmFld, Lgnd, NwAccntFrm, TlTpIcn } from "./FormStyled";

export const NewAccountForm = (props) => {
    return (
        <NwAccntFrm id="new-account-form" onSubmit={props.onSubmit}>
            <Lgnd id="new-account-form-legend">{props.title}</Lgnd>
            <Fldst id="new-account-form-fieldset">
                <FormField
                    id="new-account-form-username"
                    name="username"
                    lText="Nome de Usuário"
                    type="text"
                    spellCheck="false"
                    required
                    {...props}
                />
                <FormField
                    id="new-account-form-email"
                    name="email"
                    lText="Email"
                    type="email"
                    placeholder="exemplo@email.com"
                    required
                    {...props}
                />
                <FormFieldWithTooltip
                    id="new-account-form-password"
                    name="password"
                    lText="Senha"
                    type="password"
                    required
                    {...props}
                />
                <FormField
                    id="new-company-form-confirmPassword"
                    name="confirmPassword"
                    lText="Confirme a senha"
                    type="password"
                    required
                    {...props}
                />
            </Fldst>
            <SecondaryButton>Criar Conta</SecondaryButton>
        </NwAccntFrm>
    );
};

export const FormField = (props) => {
    return (
        <FrmFld id={props.id + "-field"}>
            <InputLabel {...props} />
            <FormInput {...props} />
            <InputSpan {...props} />
        </FrmFld>
    );
};

export const FormFieldWithTooltip = (props) => {
    return (
        <FrmFld id={props.id + "-field"}>
            <FldWthTlTp id={props.id + "-with-tooltip"}>
                <InputLabel {...props} />
                <TlTpIcn id="info">
                    🛈
                    <PasswordTooltip {...props} />
                </TlTpIcn>
            </FldWthTlTp>
            <FormInput {...props} />
            <InputSpan {...props} />
        </FrmFld>
    );
};