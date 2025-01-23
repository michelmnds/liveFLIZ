import type { Credentials } from 'routex-client';

export type Bank = {
  _id: string;
  name: string;
  logoUrl: string;
  yaxiId: string;
  yaxiName?: string;
  tag?: string;
  group?: string;
  isTop?: boolean;
};

export type BankFields = {
  total: number;
  userField1: string;
  userField2: string;
  userField3: string;
  password: string;
};

export type BankSchemaType = {
  _id: {
    $oid: string;
  };
  name: string;
  logoUrl: string;
  yaxiId: string;
  yaxiName?: string;
  tag?: string | undefined;
  group?: string | undefined;
  isTop?: boolean | undefined;
};

export type BankFieldsSchemaType = {
  [index: string]: string | undefined | number | { $oid: string };
  _id: {
    $oid: string;
  };
  total: number;
  userField1_en?: string | undefined;
  userField1_de?: string | undefined;
  userField2_en?: string | undefined;
  userField2_de?: string | undefined;
  userField3_en?: string | undefined;
  userField3_de?: string | undefined;
  userField4_en?: string | undefined;
  userField4_de?: string | undefined;
  bankId: {
    $oid: string;
  };
  password_de?: string | undefined;
  password_en?: string | undefined;
};

export type BankCredentials = {
  iban?: string;
  credentials: Pick<Credentials, 'userId' | 'password'>;
};
