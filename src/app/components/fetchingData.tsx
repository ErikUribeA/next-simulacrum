import { GetApiInfo } from "@/utils/apiFetch"

export const FetchingData = async() => {
    const {title, description, price} = await GetApiInfo(1)
    return(
        <div>
            Titulo: {title}
            Descrption: {description}
            Price: {price}
        </div>
    )
}