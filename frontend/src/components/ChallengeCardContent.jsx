import { Typography, Stack, Card, CardMedia, CardContent } from "@mui/material";
import ImagesCardContent from "./ImagesCardContent";

export default function ChallengeCardContent() {
  return (
    <Stack spacing={3} alignItems={"center"}>
      <ImagesCardContent
        image={"tela_inicial.png"}
        caption="Tela inicial do sistema"
      />
      <ImagesCardContent
        image={"exemplo1.png"}
        caption="Exemplo 1: Operação básica do sistema"
      />
      <ImagesCardContent
        image={"exemplo2.png"}
        caption="Exemplo 2: Operação com multilinhas e diferentes formas escritas no input"
      />
      <ImagesCardContent
        image={"exemplo2.1.png"}
        caption="Exemplo 2.1: Operação com multilinhas e diferentes formas escritas no input"
      />
      <ImagesCardContent
        image={"exemplo3.png"}
        caption='Exemplo 3: Operação clicando em "Enviar" com input vazio ou formato inválido'
      />
      <ImagesCardContent
        image={"exemplo3.1.png"}
        caption='Exemplo 3.1: Operação clicando em "Enviar" com input vazio ou formato inválido'
      />
      <ImagesCardContent
        image={"exemplo4.png"}
        caption="Exemplo 4: Outra operação com multilinhas e diferentes formas escritas no input"
      />
      <ImagesCardContent
        image={"exemplo4.1.png"}
        caption="Exemplo 4.1: Outra operação com multilinhas e diferentes formas escritas no input"
      />
    </Stack>
  );
}
