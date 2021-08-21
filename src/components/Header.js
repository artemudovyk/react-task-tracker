import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, isAddTaskFormOpen }) => {
    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && <Button
                text={isAddTaskFormOpen ? 'Close' : 'Add'}
                color={isAddTaskFormOpen ? 'rgb(179, 0, 0)' : 'green'}
                onClick={onAdd}
            />}
        </header>
    )
}

export default Header
