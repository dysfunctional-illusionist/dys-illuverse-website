
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

export default function Inferno_Login() {
  return (
    <>
      <div className="flex flex-row gap-6 justify-center items-center">

        <button onClick={() => window.location.href = '/inferno' }
          className="ui-button rounded-lg border-2 text-4xl">
            hand
        </button>

        <button onClick={() => window.location.href = '/inferno' }
          className="ui-button text-4xl">
            fingerprint
        </button>

        <button onClick={() => window.location.href = '/inferno' }
          className="ui-button text-4xl border">
            blood
        </button>

        <button onClick={() => window.location.href = '/inferno' }
          className="ui-button text-4xl">
            iris
        </button>


		</div>
    </>
  );
}