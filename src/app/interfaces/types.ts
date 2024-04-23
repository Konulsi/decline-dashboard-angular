export interface IColumnList {
  key: string;
  label: string;
  display: boolean;
}

export interface IDeclineList {
  number: number;
  type: string;
  count: number;
  key: number;
}

export interface IDeclineDetails {
  id: number;
  transactionId: string;
  operationTime: string;
  expiredDate: string;
  pseudoPan: string;
  amount: number;
  currency: number;
  merchantName: string;
  prodType: string;
  result: string;
  resultText: string;
  declineReason: string;
  acquirerId: number;
  dpan: string;
  dpanWalletRid: number;
  tds: string;
  fullName: string;
  mobilePhone: string;
  finCode: string;
  cardStatus: null;
  aznEquivalent: null;
  creditLimit: null;
  entryMode: null;
  availableBalance: null;
}
