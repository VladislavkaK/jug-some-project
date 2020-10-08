export type Report = {
  lang: 'ru' | 'en';
  type: 'intermediate' | 'advanced' | 'hardcore' | 'hot' | 'academic';
  author: string;
  description: string;
}

export type TypeReport = {
  key: string;
  type: 'intermediate' | 'advanced' | 'hardcore' | 'hot' | 'academic';
  company: string;
  selected: boolean;
};