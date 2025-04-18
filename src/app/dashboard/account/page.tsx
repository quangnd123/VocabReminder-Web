import ProfilePageCLient from "./page-wrapper";
import { getFreeLLMs } from "@/src/lib/requests";

export default async function ProfilePage(){
    const freeLLMsReponse = await getFreeLLMs();
    if(freeLLMsReponse.status === "error"){
        return (
            <div className="text-center my-2">
                <p className={`text-sm px-3 py-1 rounded-md text-red-700 bg-red-100`}>
                {`Server Error: ${freeLLMsReponse.error}`}
                </p>
            </div>
        )
    }
    return(
        <ProfilePageCLient freeLLMs={freeLLMsReponse.data!}/>
    )
}