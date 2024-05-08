export const DECLINE_LIST_DATA = [
  {
    number: 1,
    type: 'Unibank',
    count: 8,
  },
  {
    number: 2,
    type: 'APPLE.COM/BILL',
    count: 8,
  },
  {
    number: 3,
    type: 'Azercell',
    count: 3,
  },
  {
    number: 4,
    type: 'ATM ELMLAR METRO',
    count: 2,
  },
  {
    number: 5,
    type: 'TIKINTI MAT.MAG',
    count: 2,
  },
  {
    number: 6,
    type: 'GOOGLE *Royal Match',
    count: 2,
  },
  {
    number: 7,
    type: 'Google Getcontact',
    count: 2,
  },
  {
    number: 8,
    type: 'KAPS',
    count: 2,
  },
  {
    number: 9,
    type: 'ATM UNIPLAZA',
    count: 1,
  },
  {
    number: 10,
    type: 'ATM ICHERI SHEHER BRANCH',
    count: 1,
  },
];

export const COLUMNS = [
  {
    key: 'id',
    label: 'Id',
    display: false,
    checked: false,
  },
  {
    key: 'transactionId',
    label: 'Transaction Id',
    display: true,
    checked: false,
  },
  {
    key: 'operationTime',
    label: 'Operation Time',
    display: false,
    checked: false,
  },
  {
    key: 'expiredDate',
    label: 'Expired Date',
    display: false,
    checked: false,
  },
  {
    key: 'pseudoPan',
    label: 'Pseudo Pan',
    display: false,
    checked: false,
  },
  {
    key: 'amount',
    label: 'Amount',
    display: true,
    checked: false,
  },
  {
    key: 'currency',
    label: 'Currency',
    display: false,
    checked: false,
  },
  {
    key: 'merchantName',
    label: 'Merchant Name',
    display: false,
    checked: false,
  },
  {
    key: 'prodType',
    label: 'Prod Type',
    display: false,
    checked: false,
  },
  {
    key: 'result',
    label: 'Result',
    display: false,
    checked: false,
  },
  {
    key: 'resultText',
    label: 'Result Text',
    display: false,
    checked: false,
  },
  {
    key: 'declineReason',
    label: 'Decline Reason',
    display: false,
    checked: false,
  },
  {
    key: 'acquirerId',
    label: 'Acquirer Id',
    display: false,
    checked: false,
  },
  {
    key: 'dpan',
    label: 'Dpan',
    display: false,
    checked: false,
  },
  {
    key: 'dpanWalletRid',
    label: 'Dpan Wallet Rid',
    display: false,
    checked: false,
  },
  {
    key: 'tds',
    label: 'Tds',
    display: false,
    checked: false,
  },
  {
    key: 'fullName',
    label: 'Full Name',
    display: true,
    checked: false,
  },
  {
    key: 'mobilePhone',
    label: 'Mobile Phone',
    display: false,
    checked: false,
  },
  {
    key: 'finCode',
    label: 'Fin Code',
    display: false,
  },
  {
    key: 'cardStatus',
    label: 'Card Status',
    display: false,
    checked: false,
  },
  {
    key: 'aznEquivalent',
    label: 'Azn Equivalent',
    display: false,
    checked: false,
  },
  {
    key: 'creditLimit',
    label: 'Credit Limit',
    display: false,
    checked: false,
  },
  {
    key: 'entryMode',
    label: 'Entry Mode',
    display: false,
    checked: false,
  },
  {
    key: 'availableBalance',
    label: 'Available Balance',
    display: false,
    checked: false,
  },
];

export const DECLINE_COLUMNS = [
  {
    key: 'number',
    label: 'Number',
    display: true,
  },
  {
    key: 'type',
    label: 'Type',
    display: true,
  },
  {
    key: 'count',
    label: 'Count',
    display: true,
  },
];

export const FILTERS = [
  {
    value: '0',
    label: 'Merchant Name',
    checked: false,
    display: false,
  },
  {
    value: '1',
    label: 'PAN',
    checked: false,
    display: false,
  },
  {
    value: '2',
    label: 'Decline result',
    checked: false,
    display: false,
  },
];
