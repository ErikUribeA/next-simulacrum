'use client'
import Link from "next/link";
import { LoginButton } from "../button/LoginButton";
import styled from "styled-components";
import SelectLanguage from "../inputs/selectLanguege";
import { useTranslations } from "next-intl";
import Image from "next/image"
import { useSession } from "next-auth/react";
import ShoppingCartModal from "../modals/modalOverlay";

const NavbarContainer = styled.nav`
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 0px;

  @media screen and (max-width: 600px ) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
      };
`;

const UL = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 40%;
  align-items: center;

  @media screen and (max-width: 600px ) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
      };
`;

const NavItem = styled.li`
  margin: 0 10px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ffdd00;
  }
`;

const MainNavBar: React.FC = () => {
  const translate = useTranslations('');
  const { data: session } = useSession();
  return (
    <NavbarContainer>
      <UL>
        {session && session.user && (
          <Image
            className="rounded-full"
            width={50}
            height={50}
            src={session?.user?.image ?? "/default-avatar.png"} // Usa una imagen por defecto si `image` es `null` o `undefined`
            alt="Perfil"
          />
        )}
        <NavItem>
          <StyledLink href="/">{translate("Home")}</StyledLink>
        </NavItem>
        <NavItem>
          <SelectLanguage />
        </NavItem>
      </UL>
      <LoginButton />
      <ShoppingCartModal />
    </NavbarContainer>
  );
};

export default MainNavBar;
