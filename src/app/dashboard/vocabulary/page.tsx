import { PhraseData } from "@/src/types/type";
import { auth } from "@/src/auth";
import PageWrapper from "./page-wrapper";
import { getPhrases } from "@/src/lib/requests";

const mockVocabData: PhraseData[] = [
  {
    id: "1",
    phrase: "ephemeral",
    sentence: "Beauty is ephemeral, fading with time.",
    phrase_idx: 17,
    language: "English",
  },
  {
    id: "2",
    phrase: "fugaz",
    sentence: "La fama es fugaz en el mundo del espectáculo.",
    phrase_idx: 10,
    language: "Spanish",
  },
  {
    id: "3",
    phrase: "瞬間的な",
    sentence: "彼の成功は瞬間的なものだった。",
    phrase_idx: 5,
    language: "Japanese",
  },
  {
    id: "4",
    phrase: "ngắn ngủi",
    sentence: "Tuổi trẻ là khoảng thời gian ngắn ngủi.",
    phrase_idx: 14,
    language: "Vietnamese",
  },
  {
    id: "5",
    phrase: "transitory",
    sentence: "Their happiness proved transitory.",
    phrase_idx: 24,
    language: "English",
  },
  {
    id: "6",
    phrase: "efímero",
    sentence: "El amor de verano fue efímero.",
    phrase_idx: 20,
    language: "Spanish",
  },
  {
    id: "7",
    phrase: "儚い",
    sentence: "儚い夢を見ていた。",
    phrase_idx: 2,
    language: "Japanese",
  },
  {
    id: "8",
    phrase: "tạm bợ",
    sentence: "Cuộc sống nơi đây rất tạm bợ.",
    phrase_idx: 22,
    language: "Vietnamese",
  },
  {
    id: "9",
    phrase: "fleeting",
    sentence: "Fleeting moments are often the most precious.",
    phrase_idx: 0,
    language: "English",
  },
  {
    id: "10",
    phrase: "pasajero",
    sentence: "El dolor fue solo pasajero.",
    phrase_idx: 14,
    language: "Spanish",
  },
  {
    id: "11",
    phrase: "一瞬",
    sentence: "一瞬の輝きを放った。",
    phrase_idx: 3,
    language: "Japanese",
  },
  {
    id: "12",
    phrase: "chóng qua",
    sentence: "Niềm vui đó chóng qua.",
    phrase_idx: 13,
    language: "Vietnamese",
  },
  {
    id: "13",
    phrase: "temporary",
    sentence: "This is only a temporary solution.",
    phrase_idx: 17,
    language: "English",
  },
  {
    id: "14",
    phrase: "transitorio",
    sentence: "Todo en la vida es transitorio.",
    phrase_idx: 9,
    language: "Spanish",
  },
  {
    id: "15",
    phrase: "一時的な",
    sentence: "それは一時的な対応だった。",
    phrase_idx: 5,
    language: "Japanese",
  },
  {
    id: "16",
    phrase: "tạm thời",
    sentence: "Giải pháp này chỉ mang tính tạm thời.",
    phrase_idx: 30,
    language: "Vietnamese",
  },
  {
    id: "17",
    phrase: "short-lived",
    sentence: "Their rebellion was short-lived.",
    phrase_idx: 27,
    language: "English",
  },
  {
    id: "18",
    phrase: "breve",
    sentence: "Una visita breve pero significativa.",
    phrase_idx: 9,
    language: "Spanish",
  },
  {
    id: "19",
    phrase: "刹那的",
    sentence: "彼の決断は刹那的だった。",
    phrase_idx: 6,
    language: "Japanese",
  },
  {
    id: "20",
    phrase: "thoáng qua",
    sentence: "Ký ức đó chỉ là thoáng qua.",
    phrase_idx: 18,
    language: "Vietnamese",
  },
]


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