// Request/response types for chatbot

export interface ChatbotItem {
  id: string
  name: string
  avatar: string
  next: string
}

export interface ChatbotListResponse {
  result: boolean
  data: ChatbotItem[]
}
