import React,{useRef} from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Container, Label } from './styles';

export default function Card({ data, index }) {

  const ref = useRef();

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD',index, id: data.id, content: data.content },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor){
      console.log(item.id);
      console.log(data.id);
      console.log('item index', item.index);
      console.log('index', index)
    }
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref}  isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="avatar" />}
    </Container>
  );
}
