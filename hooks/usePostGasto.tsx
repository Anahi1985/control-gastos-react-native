import { useState } from 'react';
import { API_URL } from '../constants/api';

interface NuevoGasto {
  lugar: string;
  categoria: string;
  monto: number;
  fecha: string;
}

export const usePostGasto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postGasto = async (gasto: NuevoGasto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gasto),
      });

      if (!response.ok) {
        throw new Error('No se pudo registrar el gasto en el servidor.');
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message || 'Error de conexión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postGasto, loading, error };
};