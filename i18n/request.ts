import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async()=> {
    const cookieStore = cookies()
    const locale = cookieStore.get('locale')?.value || 'es'
    return {
        locale,
        messages: (await import (`../language/${locale}.json`)).default
    }
})