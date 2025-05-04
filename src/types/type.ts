export type LanguageData = {
  "code": string, 
  "name": string
}

// Generic base response type
export type BaseResponse<T> = {
  status: "success" | "error";
  error?: string;
  data?: T;
};
  
  // Request for updating a user
  export type UpdateUserRequest = {
    id: string;
    name: string | null;
    reading_languages: string[];
    learning_languages: string[];
    llm_response_language: string | null;
    unallowed_urls: string[];
  };
  
  // User model
  export type User = {
    id: string;
    name: string | null;
    email: string | null;
    reading_languages: string[];
    learning_languages: string[];
    llm_response_language: string | null;
    unallowed_urls: string[];
  };
  
export type UpdateUserResponse = BaseResponse<User>;


// phrase
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
  phrase_idx?: number
  sentence?: string
  language?: string
}

export type CreatePhraseResponse = BaseResponse<PhraseData>

export type DeletePhrasesRequest = {
  phrase_ids: string[]
}

export type DeletePhrasesResponse = BaseResponse<null>

//auth
export type AuthResponse = BaseResponse<User>