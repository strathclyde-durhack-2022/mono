import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className="max-h-1/6 sticky top-0 z-50 flex w-screen flex-row justify-center py-6 px-20 backdrop-blur-sm">
            <div className="flex h-full flex-row">
                <ul className="flex flex-row items-center justify-center space-x-16 font-normal">
                    <li><Link to="/" className="cursor-pointer transition font-bold duration-500 ease-in-out hover:text-blue-700">Home</Link></li>
                    <li><Link to="/game" className="cursor-pointer transition font-bold duration-500 ease-in-out hover:text-blue-700">Graph</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Nav