import Button from './Button'

const Header = ({ title, onAdd, isAddTaskFormOpen }) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button text={isAddTaskFormOpen ? 'Close' : 'Add'} color={isAddTaskFormOpen ? 'rgb(179, 0, 0)' : 'green'} onClick={onAdd} />
        </header>
    )
}

export default Header
