import Header from './Header';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}