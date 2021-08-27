import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PrincipalRoutes } from './routes/principalRoutes';
import { useGlobal } from './hooks/global';

const App:React.FC = () => {
  const { ClickOnApp } = useGlobal()

  return (
    <BrowserRouter>
      <div style={{cursor:"default"}} onClick={ClickOnApp}>
        <PrincipalRoutes/>
      </div>
    </BrowserRouter>
  );
}

export default App;
