import { SecondaryButton } from "../Button/Button";
import { FormBasicInput, FormInput, InputLabel, InputSpan } from "../Input/Input";
import { PasswordTooltip } from "../Tooltip/Tooltip";
import { CrtRmFrm, Fldst, FldWthTlTp, FrmFld, HndsPrdctnFrm, Lgnd, LgnFrm, NwAccntFrm, TlTpIcn } from "./FormStyled";

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
            <SecondaryButton id="create-account-button" {...props}>Criar Conta</SecondaryButton>
        </NwAccntFrm>
    );
};

export const LoginForm = (props) => {
    return (
        <LgnFrm id="login-form" onSubmit={props.onSubmit}>
            <Lgnd id="login-form-legend">{props.title}</Lgnd>
            <Fldst id="login-form-fieldset">
                <FormField
                    id="login-form-username"
                    name="username"
                    lText="Nome de Usuário"
                    type="text"
                    spellCheck="false"
                    required
                    {...props}
                />
                <FormField
                    id="login-form-password"
                    name="password"
                    lText="Senha"
                    type="password"
                    required
                    {...props}
                />
            </Fldst>
            <SecondaryButton id="login-button" {...props}>Entrar</SecondaryButton>
        </LgnFrm>
    );
};

export const CreateRoomForm = (props) => {
    return (
        <CrtRmFrm id="create-room-form" onSubmit={props.onSubmit}>
            <Lgnd id="create-room-form-legend">{props.title}</Lgnd>
            <Fldst id="create-room-form-fieldset">
                <FormField
                    id="create-room-form-roomName"
                    name="roomName"
                    lText="Nome da Sala"
                    type="text"
                    spellCheck="false"
                    required
                    {...props}
                />
            </Fldst>
            <SecondaryButton id="create-room-button" {...props}>Criar Sala</SecondaryButton>
        </CrtRmFrm>
    );
};

export const HandPredictionForm = (props) => {
    return (
        <HndsPrdctnFrm onSubmit={props.onSubmitPredictions}>
            <FormBasicInput
                name="handPrediction"
                type="number"
                placeholder="quantidade de mãos"
                min="0"
                max="20"
                {...props}
            />
            <SecondaryButton>Confirmar</SecondaryButton>
        </HndsPrdctnFrm>
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