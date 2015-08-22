# API

#### changeStatus(task_id, status_id)
изменить статус task_id на указанный status_id

````js
{
  status: 200,
  result: %task%,
}
````

#### getAllStatuses()
получить все статусы

````js
{
  status: 200,
  result: {
    status_id: status_name,
    status_id: status_name,
    ...
  }
}
````

#### getAvailableStatuses(task_id, status_id)
получить доступные статусы

````js
{
  status: 200,
  result: [status_id, status_id, status_id, ...]
}
````

#### getAllTasks(user_id)
получить все таски юзера, которые нуждаются в его участии, причем первым в массиве результатов, должен стоять таск, над которым он работал в последний раз (по timestamp?)

````js
{
  status: 200,
  result: [%task%, %task%, %task%, ...]
}
````
