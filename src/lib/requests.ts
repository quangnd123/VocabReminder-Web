import { GetPhrasesRequest, GetPhrasesResponse, CreatePhraseRequest, CreatePhraseResponse, DeletePhrasesRequest, DeletePhrasesResponse } from "@/src/types/type";
import {UpdateUserRequest, UpdateUserResponse} from  "@/src/types/type";
import { GetFreeLLMsResponse } from "@/src/types/type";

async function postRequest<TRequest, TResponse>(
    path: string,
    body: TRequest
  ): Promise<TResponse> {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      return await res.json();
    } catch (error) {
      return {
        status: "error",
        error: (error as Error).message ?? "Unknown error occurred",
        data: null,
      } as TResponse;
    }
}

async function getRequest<TResponse>(path: string): Promise<TResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${path}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        status: "error",
        error: errorData?.error || `HTTP error! status: ${res.status}`,
        data: null,
      } as TResponse;
    }

    return await res.json();
  } catch (error) {
    return {
      status: "error",
      error: (error as Error).message ?? "Unknown error occurred",
      data: null,
    } as TResponse;
  }
}

export function getPhrases(req: GetPhrasesRequest): Promise<GetPhrasesResponse> {
return postRequest<GetPhrasesRequest, GetPhrasesResponse>("get_phrases", req);
}

export function createPhrase(req: CreatePhraseRequest): Promise<CreatePhraseResponse> {
return postRequest<CreatePhraseRequest, CreatePhraseResponse>("create_phrase", req);
}

export function deletePhrases(req: DeletePhrasesRequest): Promise<DeletePhrasesResponse> {
return postRequest<DeletePhrasesRequest, DeletePhrasesResponse>("delete_phrases", req);
}
  
export function updateUser(req: UpdateUserRequest): Promise<UpdateUserResponse> {
  return postRequest<UpdateUserRequest, UpdateUserResponse>("update_user", req);
}

export function getFreeLLMs(): Promise<GetFreeLLMsResponse> {
  return getRequest<GetFreeLLMsResponse>("get_free_LLMs");
}
