import _ from 'lodash';

import {
  CHANGE_STATUS,
  GET_AVAILABLE_STATUSES
} from '../constants/Widget';

import * as status from '../constants/Statuses_ids';

const initialState = {
  tasksQueue: [
    //first task = current task
    {
      id: 412,
      status: 2,
      name: 'Fix another bug',
      desc: 'this is bug waits for fix'
    },
    {
      id: 25124,
      status: 4,
      name: 'Database error',
      desc: 'fix last query'
    },
    {
      id: 6481,
      status: 3,
      name: 'Buy the milk',
      desc: '10 packs enough'
    }
  ]
};

export default function widget(state = initialState, action) {

  switch (action.type) {
    case CHANGE_STATUS:
      let task = action.task;
      task.status = action.status_id;

      let nextTaskQueue = state.tasksQueue;

      /*if (task.id !== nextTaskQueue[0].id) {
        _.remove(nextTaskQueue,{id: task.id});
        task.status = action.status_id;
        nextTaskQueue.unshift(task);
      } else {
        nextTaskQueue[0].status = action.status_id;
      }*/



      //текущий таск = tasksQueue[0]
      //Task остается текущим, если нет никакого другого таска в статусе in_progress

      let taskInProgress = _.remove(nextTaskQueue, (item) =>{
        return item.status === status.IN_PROGRESS;
      });

      //если текущий task находится в in_progress, и таску из очереди присваивается in_progress,
      //то текущий таск автоматически переводится в suspend, и перемещается в верх очереди.
      //для запроса реальной очереди задач (по приоритету и прочему) - необходимо "обновить очередь"
      if (taskInProgress.length > 1) {
        taskInProgress[0].status = status.SUSPEND;
        nextTaskQueue.unshift(taskInProgress[0]);
        nextTaskQueue.unshift(taskInProgress[1]);
      } else if (taskInProgress.length === 1) {
        nextTaskQueue.unshift(taskInProgress[0]);
      }

      return {...state, tasksQueue: nextTaskQueue};

    default:
      return state;
    }
}
