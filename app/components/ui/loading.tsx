type LoadingProps = {
  show: boolean;
};

export default function Loading({ show }: LoadingProps) {
  if (!show) {
    return null;
  }

  return (
    <>
      <div className="absolute bg-white bg-opacity-60  z-[1000] h-full w-full flex items-center justify-center">
        <div className="flex items-center">
          <span className="i-lucide-loader animate-spin text-8xl text-sky-300  " />
        </div>
      </div>
    </>
  );
}
