# API

#### change-status/:task_id/:status_id
изменить статус task_id на указанный status_id

````js
{
  status: 200,
  result: %task%,
}
````

#### get-all-statuses
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

#### get-available-statuses/:task_id/:status_id
получить доступные статусы

````js
{
  status: 200,
  result: [status_id, status_id, status_id, ...]
}
````

#### get-tasks-queue/:user_id
получить все таски юзера, в порядке выполнения

````js
{
  status: 200,
  result: [%task%, %task%, %task%, ...]
}
````
