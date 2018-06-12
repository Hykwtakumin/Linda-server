export type _Tuples = [_Tuple];

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
  isMuched: boolean;
  res: _Tuple | null;
  index?: number;
};

type _EmptyTuple = {
  content: null;
};
