interface HistoricalRate {
  loading?: boolean;
  error?: string;
  data?: {
    date: string;
    [key: string]: number | string;
  }[];
}

export default HistoricalRate;
