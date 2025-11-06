// What is JSX?
// JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.
// It is used to create React components.


import './styles/theme.css';
import './styles/global.css';
import Counter from './pages/Counter';
import { TaskProvider } from './data/contexts/task.context';
import { Message } from './components/shared/Message';

export default function App() {
  return (
    <TaskProvider>
      <Message>
        <Counter />
      </Message>
    </TaskProvider>
  );
}