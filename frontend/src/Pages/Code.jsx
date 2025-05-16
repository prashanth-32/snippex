import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid';

const Code = ({ ele }) => {
  const format = (s) => {
    let [date,time] = s.split('T');
    let [y,m,d] = date.split('-');
    let a = "AM";
    let [hr,mn,se] = time.split(':');
    if(hr >= 13)
    {
        hr = hr % 12;
        a = "PM";
    }
    return `${d}-${m}-${y} at ${hr}:${mn} ${a}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-2xl shadow-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 transition">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <div className='flex flex-col gap-2'>
          <h2 className="text-xl font-bold text-gray-800">{ele.name}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Author : <span className="text-indigo-600 font-bold">{ele.author}</span>
          </p>
        </div>
        <div className="flex flex-col gap-3 bg-white p-4 rounded-xl shadow-md w-fit">
          <p className="inline-block px-4 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full shadow-sm text-center">
            Language : {ele.language}
          </p>
          <p className="text-gray-600 text-sm font-medium">
            Created at: <span className="text-black">{format(ele.createdAt)}</span>
          </p>
        </div>
        {/* Vote Buttons */}
        <div className="flex gap-6 text-base">
          <div className="flex items-center gap-2 text-green-600 hover:text-green-700 cursor-pointer transition">
            <HandThumbUpIcon className="w-5 h-5" />
            <span className="font-semibold">{ele.upvote}</span>
          </div>
          <div className="flex items-center gap-2 text-red-500 hover:text-red-600 cursor-pointer transition">
            <HandThumbDownIcon className="w-5 h-5" />
            <span className="font-semibold">{ele.downvote}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Code;
