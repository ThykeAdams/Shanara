export default function Footer() {
  return (
    <nav className="w-screen  py-3 px-2 mt-48 bg-lighter text-white flex">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <img className="w-1/3" src="https://cdn.trit.wtf/assets/logos/tritum.png" />
        <h1 className="text-xl">Powered by <a href="https://tritum.dev" className="text-gray-400 font-extrabold">Tritum Systems</a></h1>
        <p>Insipre, Improve, Innovate</p>
      </div>

    </nav>
  )
}