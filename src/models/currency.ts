interface Currency {
  loading?: boolean;
  error?: string;
  conversionResult?: {
    from: string;
    to: string;
    amount: number;
    result: number;
  };
  symbols: {
    [key: string]: string;
  };
}

export default Currency;
