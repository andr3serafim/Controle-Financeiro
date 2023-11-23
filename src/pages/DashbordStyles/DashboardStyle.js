import DashboardStyle from 'styled-components';

export const ContainerPrincipal = DashboardStyle.div`
  width: 100vw;
  height: 100vh;
  padding: 10px 100px;
  background-color: #2f3132;  // Tons escuros.
  color: #000;             // Texto em branco.
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Um leve box-shadow para dar um toque.
`;

export const ReceitaSection = DashboardStyle.section`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: #fff;  // Tons ligeiramente diferentes para se destacar.
  border-radius: 8px;
  margin-bottom: 20px;  // Espaçamento entre as seções.
  height: 180px;
`;

export const DespesaSection = DashboardStyle(ReceitaSection)`  
display: flex;
justify-content: space-around;
padding: 20px;
background-color: #fff;  // Tons ligeiramente diferentes para se destacar.
border-radius: 8px;
margin-bottom: 20px;  // Espaçamento entre as seções.
`;
export const EmprestimoSection = DashboardStyle(ReceitaSection)`  
display: flex;
justify-content: space-around;
padding: 20px;
background-color: #fff;  // Tons ligeiramente diferentes para se destacar.
border-radius: 8px;
margin-bottom: 20px;  // Espaçamento entre as seções.
`;

export const MenuSection = DashboardStyle.nav`
  display: flex;
  justify-content: center;
  padding: 5px 20px;
  background-color: #fff;  // Outro tom escuro.
  border-radius: 8px;
  margin-bottom: 20px;
  // Adicione estilos adicionais para o menu aqui.
`;