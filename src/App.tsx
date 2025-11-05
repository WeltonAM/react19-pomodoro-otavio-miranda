// O que é JSX?
// É uma sintaxe de marcação para criar elementos de interface do usuário em JavaScript.
// Ele é usado para criar componentes React.

import './styles/theme.css';
import './styles/global.css';
import Container from './components/shared/Container';
import Logo from './components/shared/Logo';
import Menu from './components/shared/Menu';
import CountDown from './components/counter/CountDown';
import Form from './components/counter/Form';
import Footer from './components/shared/Footer';

export default function App() {
  return (
    <div>
      <Container>
        <Logo />
        <Menu />
        <CountDown />
        <Form />
        <Footer />
      </Container>
    </div>
  );
}