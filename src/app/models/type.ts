// import { ColumnsType } from "antd/lib/table";

export interface RESPONSE<T> {
  data: T;
}

export interface DATA<T> extends Pagination {
  content: T[];
  pageable: Pageable;
}

export interface DeclineList {
  number: number;
  merchantName: string;
  count: number;
}

export interface DeclineData extends DeclineList {
  key: number;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pagination {
  last: boolean;
  totalPages: number;
  totalElements: number;
  number: number;
  sort: Sort;
  size: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ObjectType {
  id: number;
  name: string;
}

export interface Params {
  page: number | undefined;
  size: number | undefined;
  date: string | undefined;
  last?: number | null;
  type?: number;
  typeName?: string;
  count?: number;
}

export interface ExcelParams extends Params {
  typeName?: string;
}

// export interface TableProps {
//   date?: string;
//   time?: number;
//   source: string;
//   cols:
//     | ColumnsType<DeclineData>
//     | ColumnsType<IDeclineDetails>
//     | Column[]
//     | any[];
// }

export interface FuncType {
  onChangeDate: (value: string) => void;
  onChangeSelect: (value: number) => void;
}

export type HandleFunc<T> = (event: T) => void;

export interface Options {
  value: number;
  text: string;
}

export interface IDeclineDetails {
  id: number;
  key?: number;
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
}

export interface LocationState {
  state: { initialize?: boolean };
}

export type Navigation = (arg0: { pathname: string; search: string }) => void;

export interface Column {
  title: string;
  dataIndex: string;
  width?: 100;
  className?: string;
  selected?: boolean;
  immutable?: boolean;
}
