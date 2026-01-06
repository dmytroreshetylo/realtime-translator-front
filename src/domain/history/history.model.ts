export interface HistoryModel {
  id: number;
  originalText: string;
  translatedText: string;
  originalLanguage: string;
  translatedLanguage: string;
  date: Date;
}