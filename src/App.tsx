// O que é JSX?
// É uma sintaxe de marcação para criar elementos de interface do usuário em JavaScript.
// Ele é usado para criar componentes React.
// import Heading from './components/shared/Heading';

import './styles/theme.css';
import './styles/global.css';
import Container from './components/shared/Container';
import Heading from './components/shared/Heading';

export default function App() {
  return (
    <div>
      <Container>
        <Heading>Logo</Heading>
      </Container>
    </div>
  );
}