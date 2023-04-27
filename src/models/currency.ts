interface Currency {
  loading?: boolean;
  error?: string;
  symbols: {
    [key: string]: string;
  };
}

export default Currency;
