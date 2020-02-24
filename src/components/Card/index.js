import React, { useRef, useContext } from 'react';
import BoardContext from '../Board/context';
import { useDrag, useDrop } from 'react-dnd';

import { Container, Label } from './styles';

export default function Card({ data, index, listIndex }) {

  const ref = useRef();
  
  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex, id: data.id, content: data.content },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {

      console.log(item.id);
      console.log(data.id);
      console.log('item index', item.index);
      console.log('index', index);

      const draggedListIndex = item.listIndex;

      const targetListIndex = listIndex;

      const draggedIndex = item.index;

      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      console.log(targetSize);
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      console.log(draggedOffset);
      const draggedTop = draggedOffset.y - targetSize.top;
      console.log(draggedTop, targetCenter);

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {


      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex,draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="avatar" />}
    </Container>
  );
}
