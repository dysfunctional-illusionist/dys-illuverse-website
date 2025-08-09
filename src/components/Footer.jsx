export default function Footer( ) {
// ✦
  const spacer = " ✦ ";

  console.log(spacer);

  return (
    <footer className="bg-gray-900/40 text-gray-300 py-6 px-6 p-4 rounded-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          dys_illu 
          <span>{spacer}</span>
          stuff licensed under
          <a href="https://creativecommons.org/licenses/by-nc/4.0/deed.en"> CC BY-NC 4.0</a>
          <span>{spacer}</span>
          {new Date().getFullYear()} 
        </p>


        <nav aria-label="Footer Navigation" class="mt-4 md:mt-0">
          <ul className="flex space-x-6 text-sm">
            <li>
              <a
                href="/about"
                className="hover:text-white transition-colors duration-200">
                About
              </a>
            </li>
            <li>
              <a
                href="https://github.com/dysfunctional-illusionist"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
