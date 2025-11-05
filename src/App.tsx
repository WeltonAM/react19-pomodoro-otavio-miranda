// O que é JSX?
// É uma sintaxe de marcação para criar elementos de interface do usuário em JavaScript.
// Ele é usado para criar componentes React.

import './styles/theme.css';
import './styles/global.css';
import Counter from './pages/Counter';

export default function App() {
  return (
    <Counter />
  );
}