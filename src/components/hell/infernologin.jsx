
			{/* <button onClick={() => window.location.href = '/inferno' }
        className="
          font-doHyeon text-4xl text-red-950 px-10 py-6
          rounded-lg shadow-lg text-red-950
          hover:border-red-700 over:bg-red-700 hover:text-red-700
          hover:from-black hover:via-red-900 hover:to-red-600
          hover:text-red-700
          transition-colors duration-200">
            hand
        </button> */}

export function setAccess(playAni) {
  document.cookie = "archiveAccess=true; path=/; max-age=86400";
  window.location.href = "/inferno/home";
}

// login system: press button, animate, gain access cookie
// go to /inferno/home, check for cookie (in inferno layout) 
// if not present, redirect to /inferno/login

export default function Inferno_Login() {

  return (
    <>
      <div className="flex flex-row gap-6 justify-center items-center">

        <button onClick={() => setAccess('/inferno') }
          className="ui-button rounded-lg border-2 text-4xl">
            hand
        </button>

        <button onClick={() => setAccess('/inferno') }
          className="ui-button text-4xl">
            fingerprint
        </button>

        <button onClick={() => setAccess('/inferno') }
          className="ui-button text-4xl border">
            blood
        </button>

        <button onClick={() => setAccess('/inferno') }
          className="ui-button text-4xl">
            iris
        </button>


		</div>
    </>
  );
}