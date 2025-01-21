import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className="text-md flex h-16 w-80 justify-around gap-x-5 gap-y-3 rounded-l-full rounded-r-full bg-white font-bold text-black">
            <button onClick={() => navigate('/')}>Submission Form</button>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        </div>
    )
}

export default Navbar