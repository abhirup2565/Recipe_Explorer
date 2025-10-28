export default function Button({text,onClick=()=>{}}){
    return(
    <button 
        className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
        onClick={onClick}
    >
        {text}
    </button>)
}