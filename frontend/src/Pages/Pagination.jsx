import React from 'react'

const Pagination = ({ totalSnippets, setPage,page }) => {
    const pages = [];
    for (let i = 1; i <= (totalSnippets + 4) / 5; i++)
        pages.push(i);
    return (
        <div className="flex gap-2 items-center justify-center mt-4">
            {pages.map((ele, ind) => (
                <button
                    key={ind}
                    onClick={() => setPage(ele)}
                    className={`px-4 py-2 rounded-lg font-medium shadow-sm transition-colors duration-200 active:scale-95
                            ${page === ele? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600'}`}
                >
                    {ele}
                </button>
            ))}
        </div>

    )
}

export default Pagination