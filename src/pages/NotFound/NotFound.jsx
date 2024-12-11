import * as S from "./NotFoundStyled.js";

const NotFound = () => {
    return (
        <S.NotFoundPage>
            <S.Main>
                <S.H1>404</S.H1>
                <S.H2>Página não encontrada</S.H2>
                <S.P>Não foi possível encontrar o recurso solicitado.</S.P>
                <S.A href="/">Retornar para a página inicial</S.A>
            </S.Main>
        </S.NotFoundPage>
    );
};

export default NotFound;