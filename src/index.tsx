import React from 'react';
import ReactDOM from 'react-dom';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import IndexPage from './pages/Index';
import { useStores } from './store';
import { configLocale } from './locale';
import GlobalStyle from './global/styles';
import * as serviceWorker from './serviceWorker';

const engine = new Styletron();

const App = () => {
  const { reportStore } = useStores();
  
  configLocale(reportStore.lang);

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <GlobalStyle />
        <IndexPage />
      </BaseProvider>
    </StyletronProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
