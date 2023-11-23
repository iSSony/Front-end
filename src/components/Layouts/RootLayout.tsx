// Imports
import Header from "../ui/Header";
import Footer from "../ui/Footer";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </>
  );
};

export default RootLayout;
