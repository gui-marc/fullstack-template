import { useProgressStore } from '@/store/progressStore';

export default function ProgressBar() {
  const { progress, show } = useProgressStore();

  return (
    <div
      style={{ width: `${progress}%`, top: show ? '0' : '-100%' }}
      className="fixed top-0 left-0 h-1 transition-all duration-500 ease-out bg-primary-500"
    />
  );
}
