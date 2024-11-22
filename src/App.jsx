import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./store";
import Header from "./components/Header/Header";
import Board from "./components/Board/Board";

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col h-screen">
        <Toaster position="top-right" />
        <header>
          <Header />
        </header>
        <main className="flex-1 bg-mainBg overflow-hidden">
          <Board />
        </main>
      </div>
    </Provider>
  );
}

export default App;
