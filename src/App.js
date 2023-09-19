import { ErrorBoundary } from "./ErrorBoundary";
import TodoPage from "./components/pages/includes/Todo";
import { TodoContextProvider } from "./store/provider/TodoContextProvider.js";
import Header from '../src/components/UI/Header/Header'

function App() {
  return (
    <ErrorBoundary>
      <TodoContextProvider>
        <Header />
        <TodoPage />
      </TodoContextProvider>
    </ErrorBoundary>
  );
}

export default App;