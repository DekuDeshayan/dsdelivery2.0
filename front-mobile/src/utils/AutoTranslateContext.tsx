import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your actual Anthropic API key
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_KEY || 'your_anthropic_key_here';

type Language = 'pt' | 'en' | 'ja' | 'es' | 'fr' | 'de' | 'zh' | 'ko' | 'ru' | 'ar';

type TranslateContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: string) => string;
  isTranslating: boolean;
};

const TranslateContext = createContext<TranslateContextType | undefined>(undefined);

const translationCache: { [key: string]: string } = {};

const languageNames: { [key: string]: string } = {
  pt: 'Portuguese',
  en: 'English',
  ja: 'Japanese',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  zh: 'Chinese',
  ko: 'Korean',
  ru: 'Russian',
  ar: 'Arabic'
};

const translateText = async (text: string, targetLang: string): Promise<string> => {
  if (targetLang === 'pt') return text;
  
  const cacheKey = `${text}_${targetLang}`;
  
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `Translate the following text from Portuguese to ${languageNames[targetLang]}. Return ONLY the translated text with no explanations or additional text:\n\n${text}`
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', response.status, errorData);
      return text;
    }

    const data = await response.json();
    
    if (data.content && data.content[0] && data.content[0].text) {
      const translatedText = data.content[0].text.trim();
      
      // Store in cache
      translationCache[cacheKey] = translatedText;
      
      return translatedText;
    }
    
    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};

export const AutoTranslateProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('pt');
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLang = await AsyncStorage.getItem('@app_language');
      if (savedLang) {
        setLanguageState(savedLang as Language);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    setIsTranslating(true);
    try {
      await AsyncStorage.setItem('@app_language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
    setTimeout(() => setIsTranslating(false), 500);
  };

  const t = (text: string): string => {
    if (language === 'pt') return text;

    const cacheKey = `${text}_${language}`;

    if (translations[cacheKey]) {
      return translations[cacheKey];
    }

    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    translateText(text, language).then(result => {
      setTranslations(prev => ({ ...prev, [cacheKey]: result }));
    });

    return text;
  };

  return (
    <TranslateContext.Provider value={{ language, setLanguage, t, isTranslating }}>
      {children}
    </TranslateContext.Provider>
  );
};

export const useAutoTranslate = () => {
  const context = useContext(TranslateContext);
  if (!context) {
    throw new Error('useAutoTranslate must be used within AutoTranslateProvider');
  }
  return context;
};