
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
