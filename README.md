
# Code Store

 a web application that facilitates the submission and display of code snippets
 
<img width="948" alt="Screenshot 2024-03-20 205855" src="https://github.com/Tarun222999/tuf_task/assets/111749548/98869bc1-17e0-4775-b1b3-eec219373eb9">
![Screenshot (229)](https://github.com/Tarun222999/tuf_task/assets/111749548/b79df0e9-d4ce-4a40-a36a-8c77408203ce)
implemented Redis
<img width="260" alt="Screenshot 2024-03-20 230626" src="https://github.com/Tarun222999/tuf_task/assets/111749548/4cb07db0-41ce-4e70-9ab8-2a96230979d5">


## Features

- A form to gather the following fields: username, preferred code language (C++, Java, JavaScript, Python), standard input (stdin), and the source code.
- A table showcase the username, code language, stdin, and the timestamp of submission
- Submit the Code to get  Result used judge 0 API
- Implemented redis cache to minimize db requests

## Tech Stack

**Client:** React,TailwindCSS

**Server:** Node, Express

**Database:** Mysql,Redis

**API:** Judge0




## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd frontend
```
Go to the project directory

```bash
  cd backend
```

Install dependencies in frontend and backend

```bash
  npm install
```

Start the server in backend folder

```bash
  npm run start
```

Start react in frontend folder

```bash
  npm run dev
```


