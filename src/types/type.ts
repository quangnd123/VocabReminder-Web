export type LanguageData = {
  "code": string, 
  "name": string
}

// Generic base response type
export type BaseResponse<T> = {
    status: "success" | "error";
    error: string | null;
    data: T | null;
  };
  
  // Request for updating a user
  export type UpdateUserRequest = {
    id: string;
    name: string | null;
    reading_languages: string[];
    learning_languages: string[];
    reminding_language: string | null;
  };
  
  // User model
  export type User = {
    id: string;
    name: string | null;
    email: string | null;
    reading_languages: string[];
    learning_languages: string[];
    reminding_language: string | null;
  };
  
  // Response for updating user
  export type UpdateUserResponse = BaseResponse<User>;




export type PhraseData = {
  id: string
  phrase: string
  phrase_idx: number
  sentence: string
  language: string
}

export type GetPhrasesRequest = {
  user_id: string
}

export type GetPhrasesResponse = BaseResponse<PhraseData[]>;

export type CreatePhraseRequest = {
  user_id: string
  phrase: string
  phrase_idx: number
  sentence: string
  language?: string
}

export type CreatePhraseResponse = BaseResponse<PhraseData>

export type DeletePhrasesRequest = {
  phrase_ids: string[]
}

export type DeletePhrasesResponse = BaseResponse<null>