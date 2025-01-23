import { TransactionTicket } from '@/types/transaction.types';

interface EncodeUrlProps {
  url: string;
  paymentDetails: {
    creditorName?: string;
    logoUrl?: string;
    amount?: string;
    originalAmount?: string;
    reference?: string;
    externalId?: string;
    source?: string;
    creditorEmail?: string;
  };
  isP2P?: boolean;
  paymentTicket?: string;
  flizKey?: string;
}

export const encodeUrl = ({ url, paymentDetails, paymentTicket, flizKey, isP2P }: EncodeUrlProps) => {
  const token = Buffer.from(
    `p_d=${JSON.stringify(paymentDetails)}|p_t=${paymentTicket || ''}|f=${flizKey || ''}|p2p=${isP2P || ''}`
  ).toString('base64');

  return `${url}?token=${token}`;
};

interface DecodeUrlProps {
  token: string;
}

export const decodeUrl = ({ token }: DecodeUrlProps) => {
  const params = atob(token).split('|');

  const decodedParams: { p_d: string; p_t: string; f: string; p2p: string } = params.reduce(
    (acc, param) => {
      const [key, value] = param.split('=');

      if (key === 'p_d') acc.p_d = value;
      if (key === 'p_t') acc.p_t = value;
      if (key === 'p2p') acc.p2p = value;
      if (key === 'f') acc.f = value;

      return acc;
    },
    { p_d: '', p_t: '', f: '', p2p: '' }
  );

  return {
    flizKey: decodedParams.f,
    isP2P: decodedParams.p2p === 'true',
    paymentTicket: decodedParams.p_t,
    paymentDetails: JSON.parse(decodedParams.p_d) as TransactionTicket['paymentDetails'] & { creditorEmail?: string }
  };
};
