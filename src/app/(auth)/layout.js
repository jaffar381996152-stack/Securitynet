import Header from "@/components/header/Header";

export default function AuthLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
