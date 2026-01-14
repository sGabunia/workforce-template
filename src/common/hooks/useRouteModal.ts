import { useEffect, useRef, useState } from 'react';

interface UseRouteModalOptions {
  closeDuration?: number;
  openDelay?: number;
  onClose: () => void;
}

export function useRouteModal({
  onClose,
  closeDuration = 100,
  openDelay = 10
}: UseRouteModalOptions) {
  const [opened, setOpened] = useState(false);
  const onOpenTimerRef = useRef<number | null>(null);

  // Trigger animation on mount
  useEffect(() => {
    onOpenTimerRef.current = window.setTimeout(() => {
      setOpened(true);
    }, openDelay);

    return () => {
      if (onOpenTimerRef.current !== null) {
        clearTimeout(onOpenTimerRef.current);
      }
    };
  }, [openDelay]);

  const handleClose = () => {
    setOpened(false);

    window.setTimeout(() => {
      onClose();
    }, closeDuration);
  };

  return {
    opened,
    handleClose
  };
}
