// What is JSX?
// JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.
// It is used to create React components.


import './styles/theme.css';
import './styles/global.css';
import { TaskProvider } from './data/contexts/task.context';
import { Message } from './components/shared/Message';
import { MainRouter } from './router/MainRouter';

export default function App() {
  return (
    <TaskProvider>
      <Message>
        <MainRouter />
      </Message>
    </TaskProvider>
  );
}