export type _Tuples = [_Tuple];

export type _SearchTuple = {
  [key: string]: any;
};

export type _Tuple = {
  id: string;
  time: number;
  from?: string;
  [key: string]: any;
};
