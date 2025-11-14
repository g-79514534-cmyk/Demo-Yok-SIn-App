
import { useState, useEffect, useCallback } from 'react';
import type { SeatingRecord } from '../types';

const STORAGE_KEY = 'seatingData';

export const useSeatingData = () => {
  const [seatingData, setSeatingData] = useState<SeatingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setSeatingData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Failed to load seating data from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSeatingData = useCallback((data: SeatingRecord[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSeatingData(data);
    } catch (error) {
      console.error("Failed to save seating data to localStorage", error);
    }
  }, []);

  const clearSeatingData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSeatingData([]);
    } catch (error) {
      console.error("Failed to clear seating data from localStorage", error);
    }
  }, []);

  return { seatingData, saveSeatingData, clearSeatingData, isLoading };
};
