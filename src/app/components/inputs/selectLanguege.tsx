import Cookies from "js-cookie";
import { useRouter } from "next/navigation"
import { ChangeEvent } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";


const DivSelect = styled.div`
    display: flex;
    width: 50%;
    justify-content: space-evenly;
`

const Select = styled.select`
    padding: 8px;
    border-radius: 10px;
    
`

export default function SelectLanguage() {
    const router = useRouter()
    const translate = useTranslations("language")

    const handleLanguage = (e : ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = e.target.value
        Cookies.set("locale", selectedLanguage)
        router.refresh()
    };

    return (
        <DivSelect>
        <Select onChange={handleLanguage} defaultValue="">
            <option value="" disabled>{translate("select")}</option>
            <option value="es"> {translate("OptionEs")} </option>
            <option value="en"> {translate("OptionEn")} </option>
        </Select>
        </DivSelect>
    )
}