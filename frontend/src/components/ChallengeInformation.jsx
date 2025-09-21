import { Typography, Paper } from "@mui/material";
import ChallengeCardContent from "./ChallengeCardContent";

export default function ChallengeInformation() {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: "left" }}>
      <Typography variant="body1" component="p">
        <b>Descrição do Desafio</b><br />
        Vamos lá! Você foi contratado como Desenvolvedor (e o salário é bom, hehe 😎) para dar suporte e manutenção em um sistema de Logística de uma Transportadora.
        O sistema da empresa possui diversos bugs que não atendem às expectativas. Sua missão é corrigir esses problemas para garantir a usabilidade da ferramenta.<br />

        <br /><b>Detalhes técnicos da usabilidade esperada</b><br />
        - O sistema é uma interface web com 1 input (entrada) e 1 output (saída).<br />
        - O input deve ser escrito no formato "pesokg item" (podendo ser aceito formatos como "peso KG item", "pesoKG item", "peso kg item", "pesoKg item", conforme prints de exemplo).<br />
        - Cada linha representa um item. Não diferencia maiúsculas de minúsculas.<br />
        - O sistema deve distribuir automaticamente os itens entre 4 veículos, otimizando a eficiência e exibindo informações extras no output.<br />

        <br /><b>Sua tarefa</b><br />
        1. Corrigir todos os bugs atuais da ferramenta.<br />
        2. Identificar e aplicar melhorias (se possível) no código, tornando-o mais legível e eficiente.<br />
        
        <br /><b>⚠️ Regras importantes</b><br />
        - O padrão de entrada e saída deve ser mantido conforme os exemplos abaixo.<br />
        - Apenas o arquivo main.js pode ser modificado.<br />

        <br /><b>Capacidades dos Veículos</b><br />
        - Moto: 45kg<br />
        - Van: 3.000kg<br />
        - Kombi: 5.000kg<br />
        - Caminhão: 12.000kg<br />
        
        <br /><b>Recursos Extras</b><br />
        - O botão "Limpar" apaga o campo de input, evitando precisar dar refresh na página (certifique-se de que ele esteja funcionando também).<br />
        - Abaixo você verá prints com os resultados esperados, para entender como o sistema deve funcionar.<br />
        - No final da página, estarão os botões para baixar o código-fonte e iniciar o desafio.<br />
      </Typography>
      <br />
      <ChallengeCardContent></ChallengeCardContent>
    </Paper>
  );
}
