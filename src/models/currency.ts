interface Currency {
  loading?: boolean;
  error?: string;
  conversionResult?: {
    from: string;
    to: string;
    amount: number | string;
    result: number;
  };
  conversionResults?: {
    from: string;
    to: string;
    amount: number | string;
    result: number;
  }[];
  symbols: {
    [key: string]: string;
  };
}

export default Currency;
