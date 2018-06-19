export type _Tuples = [_Tuple];

export type _TupleSpace = {
  tuples: _Tuples;
};

export type _Memory = {
  [key: string]: _Tuples;
};

export type _SearchTuple = {
  [key: string]: any;
};

export type _Tuple = {
  id: string;
  time: number;
  from?: string;
  [key: string]: number | string | boolean;
};

export type _ResponseTuple = {
  _isMuched: boolean;
  id: string;
  time: number;
  from?: string;
  [key: string]: number | string | boolean;
};

export type _NFTuple = {
  _isMuched: false;
  mes: string;
};

export type _IsMuchResponse = {
  isMuched: boolean;
  res: _Tuple | null;
};
