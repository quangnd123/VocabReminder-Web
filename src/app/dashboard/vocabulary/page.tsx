import { auth } from "@/auth";
import PageWrapper from "./page-wrapper";
import { getPhrases } from "@/lib/requests";

export default async function VocabularyPage() {
  const session = await auth();
  if(!session?.user) return null;

  const getPhrasesResponse = await getPhrases({user_id: session.user.id!}); 
  if (getPhrasesResponse.status === "error"){
    return (
        <div className="text-center my-2">
            <p className={`text-sm px-3 py-1 rounded-md text-red-700 bg-red-100`}>
            {`Server Error: ${getPhrasesResponse.error}`}
            </p>
        </div>
    )
  }
  return (
    <PageWrapper initialData={getPhrasesResponse.data!}/>
  );
}