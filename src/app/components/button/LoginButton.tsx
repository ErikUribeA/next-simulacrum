'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { FcGoogle } from "react-icons/fc";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


const ButtonBase = styled.button`
  padding: 12px 24px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const ButtonIn = styled(ButtonBase)`
  background-color: #4285f4; /* Azul Google */
  color: white;
  border: none;

  &:hover {
    background-color: #357ae8;
  }
`;

const ButtonOut = styled(ButtonBase)`
  background-color: #4a4a4a; /* Gris oscuro suave */
  color: white;
  border: none;

  &:hover {
    background-color: #3a3a3a;
  }
`;

const Dashboard = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const P = styled.p`
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
`;

export function LoginButton() {
  const { data: session } = useSession();
  const translate = useTranslations('');


  if (session && session.user) {
    return (
      <Dashboard>
        <P>
          <IoMdCheckmarkCircleOutline className="text-green-300" />
          {translate("session")} {session.user.email ?? 'Usuario'}
        </P>
        <ButtonOut onClick={() => signOut()}>
          {translate("logout")}
        </ButtonOut>
      </Dashboard>
    );
  }


  return (
    <ButtonIn  onClick={() => signIn('google')}>
      <FcGoogle className="text-[1.5em]" />
      {translate("login")}
    </ButtonIn>
  );
}
