import gradient from '../../assets/example.png';

export const SetItem: React.FC<{
  name: string,
  author: string,
  truthCount: number,
  dareCount: number
}> = ({ name, author, truthCount, dareCount }) => {
  return (
    <div className="flex mb-5">
      <img src={gradient} className="object-cover w-24 h-24 mr-2" />
      <div className="flex flex-col justify-around">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-500 mb-3">by {author}</p>
        <div className="flex items-baseline">
          {/* Truth Count */}
          <small className="text-yellow-400 text-opacity-50 border-2 border-yellow-400 border-opacity-25 mr-2 px-1.5">W</small>
          <p className="text-gray-500 mr-3">{truthCount}</p>
          {/* Dare Count */}
          <small className="text-green-400 text-opacity-50 border-2 border-green-400 border-opacity-25 mr-2 px-1.5">P</small>
          <p className="text-gray-500">{dareCount}</p>
        </div>
      </div>
    </div>
  )
}
