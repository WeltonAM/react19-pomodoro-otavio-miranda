import { Bounce, ToastContainer } from 'react-toastify';

type MessageProps = {
  children: React.ReactNode;
};

export function Message({ children }: MessageProps) {
  return (
    <>
      {children}

      <ToastContainer
        position='bottom-right'
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </>
  );
}