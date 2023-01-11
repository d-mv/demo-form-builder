import { PropsWithChildren, StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { App } from './app';
import './shared/theme/basic.css';
import 'react-form-builder2/dist/app.css';
import './shared/theme/formOverloadStyle.css';

import reportWebVitals from './reportWebVitals';

const GlobalDndContext = ({ children }: PropsWithChildren) => {
  return (
    <DndProvider backend={HTML5Backend} key={1}>
      {children}
    </DndProvider>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <RecoilRoot>
      <GlobalDndContext>
        <App />
      </GlobalDndContext>
    </RecoilRoot>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
