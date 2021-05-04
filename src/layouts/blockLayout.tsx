import { ReactNode } from 'react';

export default function BlockLayout(props: {children: ReactNode}) {
  return (
    <div id="block">
      {
        props.children
      }
    </div>
  );
}
