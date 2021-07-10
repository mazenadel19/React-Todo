import React, { useEffect, useState } from 'react'

import Tasks from './components/Tasks/Tasks'
import NewTask from './components/NewTask/NewTask'
import useHttp from './hooks/use-http'

const reqConfig = {
	url: 'https://react-dummy-movies-bf735-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
}

function App() {
	const [tasks, setTasks] = useState([])

	const transformedData = tasksObj => {
		const loadedTasks = []

		for (const taskKey in tasksObj) {
			loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text })
		}

		setTasks(loadedTasks)
	}

	const {
		isLoading,
		error,
		sendReqest: fetchTasks,
	} = useHttp(reqConfig, transformedData)

	useEffect(() => {
		fetchTasks()
	}, [])

	const taskAddHandler = task => {
		setTasks(prevTasks => prevTasks.concat(task))
	}

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	)
}

export default App
