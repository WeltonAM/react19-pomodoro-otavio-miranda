import styles from "./styles.module.css";
import Container from "../../shared/Container";
import Footer from "../../shared/Footer";
import Logo from "../../shared/Logo";
import Menu from "../../shared/Menu";

export interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <Container>
      <Logo />
      <Menu />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </Container>
  );
}