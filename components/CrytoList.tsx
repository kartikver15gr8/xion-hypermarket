"use client";

import { useState, useEffect } from "react";

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  priceUsd: string;
}

interface Props {
  coinIds: string[];
}

export default function CryptoList({ coinIds }: Props) {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      setIsLoading(true);
      try {
        const ids = coinIds.join(",");
        const response = await fetch(`/api/crypto?ids=${ids}`);
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setCryptos(data);
      } catch (err) {
        setError("An error occurred while fetching the data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptos();
  }, [coinIds]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {coinIds.map((coinId) => {
        const crypto = cryptos.find((c) => c.id === coinId);
        return (
          <li key={coinId}>
            {crypto
              ? `${crypto.name} (${crypto.symbol}): $${parseFloat(
                  crypto.priceUsd
                ).toFixed(2)}`
              : `${coinId}: Not found`}
          </li>
        );
      })}
    </ul>
  );
}
