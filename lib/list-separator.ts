const LIST_SEPARATOR = ', ';
const LAST_LIST_SEPARATOR = ' ir ';

type ListSeparatorOptions = {
  index: number;
  count: number;
};

export const getListSeparator = ({ index, count }: ListSeparatorOptions): string => {
  if (index === 0) {
    return '';
  }

  return index === count - 1 ? LAST_LIST_SEPARATOR : LIST_SEPARATOR;
};
