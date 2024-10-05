import { useState, useCallback } from "react";
import { franc } from "franc";
import impatientResponsesEn from "@/data/impatientResponses.json";
import impatientResponsesFr from "@/data/impatientResponsesFrench.json";

type Language = "en" | "fr";

export function useImpatientBot() {
  const [responseCount, setResponseCount] = useState(0);
  const [usedResponses, setUsedResponses] = useState<Set<number>>(new Set());
  const [language, setLanguage] = useState<Language>("en");
  const [isLoading, setIsLoading] = useState(false);

  const getResponse = useCallback(
    (userInput: string) => {
      return new Promise<string>((resolve) => {
        setIsLoading(true);

        // Simulate a delay
        setTimeout(() => {
          setResponseCount((prev) => prev + 1);

          const detectedLang = franc(userInput);
          const newLanguage = detectedLang === "fra" ? "fr" : "en";
          setLanguage(newLanguage);

          const responses =
            newLanguage === "en"
              ? impatientResponsesEn.responses
              : impatientResponsesFr.responses;

          let response: string;
          if (responseCount === 0) {
            response =
              newLanguage === "en"
                ? "Learn to ask questions properly and fix your grammar. This is your first and only warning."
                : "Apprenez à poser des questions correctement et corrigez votre grammaire. C'est votre premier et unique avertissement.";
          } else if (responseCount < 4) {
            let randomIndex;
            do {
              randomIndex = Math.floor(Math.random() * responses.length);
            } while (usedResponses.has(randomIndex));

            setUsedResponses((prev) => new Set(prev).add(randomIndex));

            if (usedResponses.size === responses.length - 1) {
              setUsedResponses(new Set());
            }

            response = responses[randomIndex];
          } else {
            response =
              newLanguage === "en"
                ? "It's none of my business. Stop bothering me."
                : "Ce ne sont pas mes affaires. Arrêtez de m'embêter.";
          }

          setIsLoading(false);
          resolve(response);
        }, 500); // 500ms delay
      });
    },
    [responseCount, usedResponses]
  );

  return { getResponse, language, isLoading };
}
