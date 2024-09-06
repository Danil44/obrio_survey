'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
  show?: boolean;
  onClose?: () => void;
  selector: string;
};

export function Portal({ children, selector, show }: Props) {
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);
  
  return show && ref.current ? createPortal(children, ref.current) : null;
}
