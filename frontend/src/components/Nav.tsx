const Nav = () => {
    return (
        <div className="max-h-1/6 sticky top-0 z-50 flex w-screen flex-row justify-center py-6 px-20 backdrop-blur-sm">
            <div className="flex h-full flex-row">
                <ul className="flex flex-row items-center justify-center space-x-16 font-normal">
                    <li className="cursor-pointer transition duration-500 ease-in-out font-bold hover:text-blue-700">Home</li>
                    <li className="cursor-pointer transition duration-500 ease-in-out font-bold hover:text-blue-700">Graph</li>
                </ul>
            </div>
        </div>
    )
}

export default Nav