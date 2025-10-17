import MainLayout from "@/core/components/layouts/MainLayout";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
