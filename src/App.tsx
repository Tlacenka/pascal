import React from 'react';
import { Input } from './Input';
import { Rules } from './Rules';

export const App: React.FC = () => {
  return (
    <div>
      <h1>Zkontroluj si sílu hesla</h1> 
      <Input />
      <Rules />
     
    </div>
    
  )
}

export default App
