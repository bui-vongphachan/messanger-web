export const moveCurrentChatToTopOfList = (props: {
  items: any[];
  index: number;
  targetItem: any;
}) => {
  const newList = props.items.filter((_, _index) => _index !== props.index);

  newList.unshift(props.targetItem);

  return newList;
};
