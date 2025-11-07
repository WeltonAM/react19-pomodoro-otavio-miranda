import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

import styles from './styles.module.css';
import type { ToastContentProps } from 'react-toastify';
import Button from '../Button';

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <div className={styles.container}>
      <p>{data}</p>

      <div className={styles.buttonsContainer}>
        <Button
          onClick={() => closeToast(true)}
          icon={<ThumbsUpIcon />}
          aria-label='Confirm action and close'
          title='Confirm action and close'
        />

        <Button
          onClick={() => closeToast(false)}
          icon={<ThumbsDownIcon />}
          styleColor='error'
          aria-label='Cancle action and close'
          title='Cancle action and close'
        />
      </div>
    </div>
  );
}