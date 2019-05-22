# Database Schema

## `users`
| column name       | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `id`              | integer   | not null, primary key     |
| `username`        | string    | not null, indexed, unique |
| `email`           | string    | not null, indexed, unique |         
| `password_digest` | string    | not null                  |
| `session_token`   | string    | not null, indexed, unique |
| `created_at`      | datetime  | not null                  |
| `updated_at`      | datetime  | not null                  |

+ index on `username, unique: true`
+ index on `email, unique: true`
+ index on `session_token, unique: true`
  
## `watchlists`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `stock_id`           | string    | not null, indexed, foreign key |
| `creater_id`         | integer   | not null, indexed, foreign key |
| `created_at`         | datetime  | not null                       |
| `updated_at`         | datetime  | not null                       |

+ `creater_id` references `users`
+ `stock_id` references `stocks`
+ index on `creater_id`
  
## `stocks`
| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, primary key          |
| `ticker`          | string    | not null, indexed, unique      |
| `date`            | date      | not null, indexed              |             
| `time`            | datetime  | not null, indexed              |             
| `start_price`     | float     | not null,                      |             
| `end_price`       | float     | not null,                      |             
| `high_price`      | float     | not null,                      |             
| `low_price`       | float     | not null,                      |             
| `traded_volumn`   | integer   | not null,                      |             
| `created_at`      | datetime  | not null                       |
| `updated_at`      | datetime  | not null                       |

+ index on `[:date, :time]`
+ index on `ticker, unique: true`

