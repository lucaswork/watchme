import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import { MovieProvider } from './context/MovieContext';


export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MovieProvider>
        <SideBar />
        <Content />
      </MovieProvider>
    </div>
  )
}