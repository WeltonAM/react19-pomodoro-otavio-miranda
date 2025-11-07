import styles from './styles.module.css';
import { useEffect, useRef } from 'react';
import { SaveIcon } from 'lucide-react';
import { useTask } from '../../data/hooks/useTask.hook';
import { showMessage } from '../../adapter/showMessage';
import Page from '../../components/template/Page';
import { Heading } from '../../components/shared/Heading';
import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';

export function Settings() {
  const { task, changeSettings } = useTask();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'Settings - Chronos Pomodoro';
  }, []);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    const formErrors = [];

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push('Only numbers are allowed');
    }

    if (workTime < 1 || workTime > 99) {
      formErrors.push('Value must be between 1 and 99');
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push('Value must be between 1 and 30');
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push('Value must be between 1 and 60');
    }

    if (formErrors.length > 0) {
      formErrors.forEach(error => {
        showMessage.error(error);
      });
      return;
    }

    changeSettings({
      workTime,
      shortBreakTime,
      longBreakTime,
    });
    showMessage.success('Settings saved');
  }

  return (
    <Page>
      <Heading>Settings</Heading>

      <p className={styles.description}>
        Configure your pomodoro settings
      </p>

      <form
        onSubmit={handleSaveSettings}
        action=''
        className='form'
      >
        <div className='formRow'>
          <Input
            id='workTime'
            label='Focus'
            ref={workTimeInput}
            defaultValue={task.config.workTime}
            type='number'
          />

          <Input
            id='shortBreakTime'
            label='Short break'
            ref={shortBreakTimeInput}
            defaultValue={task.config.shortBreakTime}
            type='number'
          />

          <Input
            id='longBreakTime'
            label='Long break'
            ref={longBreakTimeInput}
            defaultValue={task.config.longBreakTime}
            type='number'
          />

          <Button
            icon={<SaveIcon />}
            aria-label='Settings saved'
            title='Settings saved'
          />
        </div>
      </form>
    </Page>
  );
}