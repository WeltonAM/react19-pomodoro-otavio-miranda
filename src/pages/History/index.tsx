import { TrashIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useTask } from '../../data/hooks/useTask.hook';
import { useEffect, useState } from 'react';
import { showMessage } from '../../adapter/showMessage';
import Page from '../../components/template/Page';
import Button from '../../components/shared/Button';
import { formatDate } from '../../utils/formatDate';
import type { SortTasksOptions } from '../../data/contexts/task.context';
import { Heading } from '../../components/shared/Heading';

export function History() {
  const { task, resetTask, getTaskStatus, sortTasks } = useTask();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const hasTasks = task.tasks.length > 0;

  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: task.tasks }),
        field: 'startDate',
        direction: 'desc',
      };
    },
  );

  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: task.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [task.tasks, sortTasks]);

  useEffect(() => {
    document.title = 'History - Chronos Pomodoro';
  }, []);

  useEffect(() => {
    if (!confirmClearHistory) return;

    setConfirmClearHistory(false);

    resetTask();
  }, [confirmClearHistory, resetTask]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory() {
    showMessage.dismiss();
    showMessage.confirm('Are you sure?', confirmation => {
      setConfirmClearHistory(confirmation);
    });
  }

  return (
    <Page>
      <Heading>
        <span>History</span>
        {hasTasks && (
          <span className={styles.buttonContainer}>
            <Button
              icon={<TrashIcon />}
              color='error'
              aria-label='Clear history'
              title='Clear history'
              onClick={handleResetHistory}
            />
          </span>
        )}
      </Heading>

      {hasTasks && (
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th
                  onClick={() => handleSortTasks({ field: 'name' })}
                  className={styles.thSort}
                >
                  Task ↕
                </th>
                <th
                  onClick={() => handleSortTasks({ field: 'duration' })}
                  className={styles.thSort}
                >
                  Duration ↕
                </th>
                <th
                  onClick={() => handleSortTasks({ field: 'startDate' })}
                  className={styles.thSort}
                >
                  Date ↕
                </th>
                <th>Status</th>
                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              {sortTasksOptions.tasks.map(t => {
                const taskTypeDictionary = {
                  workTime: 'Focus',
                  shortBreakTime: 'Short break',
                  longBreakTime: 'Long break',
                };

                return (
                  <tr key={t.id}>
                    <td data-label="Task">{t.name}</td>
                    <td data-label="Duration">{t.duration}min</td>
                    <td data-label="Date">{formatDate(t.startDate)}</td>
                    <td data-label="Status">{getTaskStatus(t, task.activeTask)}</td>
                    <td data-label="Type">{taskTypeDictionary[t.type]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!hasTasks && (
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
          There are no tasks created yet.
        </p>
      )}
    </Page>
  );
}